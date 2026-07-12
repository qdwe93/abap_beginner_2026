REPORT zedu##_u15.

TYPE-POOLS: slis.

DATA: gt_list TYPE TABLE OF zedu##_s_list,
      gs_list TYPE zedu##_s_list.

START-OF-SELECTION.
  PERFORM get_data.
  PERFORM show_alv.

FORM get_data.
  SELECT a~order_id a~cust_id b~cust_name
         a~prod_id c~prod_name c~price
         a~quantity a~status a~order_date a~remark a~ernam
    FROM zedu##_order AS a
    INNER JOIN zedu_cust AS b ON a~cust_id = b~cust_id
    INNER JOIN zedu_prod AS c ON a~prod_id = c~prod_id
    INTO CORRESPONDING FIELDS OF TABLE gt_list.
  LOOP AT gt_list INTO gs_list.
    gs_list-amount = gs_list-quantity * gs_list-price.
    MODIFY gt_list FROM gs_list TRANSPORTING amount.
  ENDLOOP.
ENDFORM.

FORM show_alv.
  DATA ls_layout TYPE slis_layout_alv.
  ls_layout-zebra = 'X'.
  ls_layout-colwidth_optimize = 'X'.
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
