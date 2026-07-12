REPORT zedu##_u19.

TYPE-POOLS: slis.
DATA: gt_list  TYPE TABLE OF zedu##_s_list,
      gs_list  TYPE zedu##_s_list,
      gs_order TYPE zedu##_order.

" ZEDU##_LIST 복사본이므로 선택화면·기본 조회기간을 그대로 가진다
SELECT-OPTIONS: s_ordid FOR gs_order-order_id,
                s_cust  FOR gs_order-cust_id,
                s_date  FOR gs_order-order_date.
PARAMETERS p_stat TYPE zedu##_status.

INITIALIZATION.
  CLEAR s_date.
  s_date-sign = 'I'. s_date-option = 'BT'.
  s_date-low = sy-datum - 90. s_date-high = sy-datum.
  APPEND s_date.

START-OF-SELECTION.
  PERFORM get_data.
  PERFORM show_alv.

FORM get_data.
  SELECT a~order_id a~cust_id b~cust_name a~prod_id c~prod_name
         c~price a~quantity a~status a~order_date a~remark a~ernam
    FROM zedu##_order AS a
    INNER JOIN zedu_cust AS b ON a~cust_id = b~cust_id
    INNER JOIN zedu_prod AS c ON a~prod_id = c~prod_id
    INTO CORRESPONDING FIELDS OF TABLE gt_list
    WHERE a~order_id   IN s_ordid
      AND a~cust_id    IN s_cust
      AND a~order_date IN s_date.
  IF p_stat IS NOT INITIAL.
    DELETE gt_list WHERE status <> p_stat.
  ENDIF.
  LOOP AT gt_list INTO gs_list.
    gs_list-amount = gs_list-quantity * gs_list-price.
    MODIFY gt_list FROM gs_list TRANSPORTING amount.
  ENDLOOP.
  SORT gt_list BY order_id.
ENDFORM.

FORM show_alv.
  DATA ls_layout TYPE slis_layout_alv.
  ls_layout-zebra = 'X'. ls_layout-colwidth_optimize = 'X'.
* TODO 1: 아래 기존 ALV 호출의 EXPORTING에 콜백 두 줄을 추가하세요. (교재 U19 (2))
*         i_callback_pf_status_set = 'SET_STATUS'
*         i_callback_user_command  = 'USER_COMMAND'
  CALL FUNCTION 'REUSE_ALV_GRID_DISPLAY'
    EXPORTING
      i_callback_program = sy-repid
      i_structure_name   = 'ZEDU##_S_LIST'
      is_layout          = ls_layout
      i_grid_title       = '주문 목록'
    TABLES
      t_outtab           = gt_list
    EXCEPTIONS
      program_error      = 1
      OTHERS             = 2.
  IF sy-subrc <> 0.
    WRITE / 'ALV 호출 오류'.
  ENDIF.
ENDFORM.

* TODO 2: FORM set_status를 작성하세요. (SET PF-STATUS 'MAIN' EXCLUDING pt_extab)
* TODO 3: FORM user_command에서 FC_ADD/FC_EDIT/FC_DEL을 처리하세요.
*         (FC_EDIT는 커서 행을 READ해 주문번호를 I 메시지로 표시)
