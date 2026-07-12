REPORT zedu##_main.

*&---------------------------------------------------------------------*
*& 용도: 이 파일은 새 프로그램 생성용 독립 골격이 아닙니다.
*&   SE38에서 ZEDU##_U19를 ZEDU##_MAIN으로 GUI Status·Text Elements와
*&   함께 복사한 뒤 사용하는 복구/대조용 소스입니다. (교재 Day 3 TP-1)
*& 주의: PF-STATUS 'MAIN'은 이 .abap 텍스트만으로는 생성되지 않으므로
*&   SE38 복사 옵션에서 GUI Status 체크가 필수입니다.
*& 상태: U19 복사 직후의 선택화면·조회·ALV·콜백·PF-STATUS 참조는
*&   완성되어 있고, TP-2~TP-4의 create/change/delete FORM만 TODO입니다.
*&---------------------------------------------------------------------*

TYPE-POOLS: slis.
DATA: gt_list TYPE TABLE OF zedu##_s_list,
      gs_list TYPE zedu##_s_list,
      gs_order TYPE zedu##_order.

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
  CALL FUNCTION 'REUSE_ALV_GRID_DISPLAY'
    EXPORTING
      i_callback_program       = sy-repid
      i_callback_pf_status_set = 'SET_STATUS'
      i_callback_user_command  = 'USER_COMMAND'
      i_structure_name         = 'ZEDU##_S_LIST'
      is_layout                = ls_layout
      i_grid_title             = '주문 목록'
    TABLES
      t_outtab                 = gt_list
    EXCEPTIONS
      program_error            = 1
      OTHERS                   = 2.
  IF sy-subrc <> 0.
    WRITE / 'ALV 호출 오류'.
  ENDIF.
ENDFORM.

FORM set_status USING pt_extab TYPE slis_t_extab.
  SET PF-STATUS 'MAIN' EXCLUDING pt_extab.
ENDFORM.

FORM user_command USING pv_ucomm LIKE sy-ucomm
                        ps_selfield TYPE slis_selfield.
  CASE pv_ucomm.
    WHEN 'FC_ADD'.  PERFORM create_order.
    WHEN 'FC_EDIT'. PERFORM change_order USING ps_selfield-tabindex.
    WHEN 'FC_DEL'.  PERFORM delete_order USING ps_selfield-tabindex.
  ENDCASE.
  PERFORM get_data.
  ps_selfield-refresh = 'X'.
ENDFORM.

FORM create_order.
* TODO TP-2: 팝업 → FM 검증 → MAX+1 → INSERT → 메시지를 작성하세요.
ENDFORM.

FORM change_order USING pv_index TYPE sytabix.
* TODO TP-3: 행 확인 → C/X 차단 → 팝업 → 검증 → UPDATE를 작성하세요.
ENDFORM.

FORM delete_order USING pv_index TYPE sytabix.
* TODO TP-4: 행 확인 → N 검사 → 확인 팝업 → DELETE를 작성하세요.
ENDFORM.
