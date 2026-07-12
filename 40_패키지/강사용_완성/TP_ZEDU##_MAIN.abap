REPORT zedu##_main.

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
  SELECT a~order_id a~cust_id b~cust_name
         a~prod_id c~prod_name c~price
         a~quantity a~status a~order_date a~remark a~ernam
    FROM zedu##_order AS a
    INNER JOIN zedu_cust AS b ON a~cust_id = b~cust_id
    INNER JOIN zedu_prod AS c ON a~prod_id = c~prod_id
    INTO CORRESPONDING FIELDS OF TABLE gt_list
    WHERE a~order_id IN s_ordid
      AND a~cust_id IN s_cust
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
    MESSAGE 'ALV 호출 중 오류가 발생했습니다.' TYPE 'S' DISPLAY LIKE 'E'.
    RETURN.
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
    WHEN OTHERS. RETURN.
  ENDCASE.
  PERFORM get_data.
  ps_selfield-refresh = 'X'.
ENDFORM.

FORM create_order.
  DATA: lt_fields TYPE TABLE OF sval,
        ls_field TYPE sval,
        lv_rc TYPE c LENGTH 1,
        lv_cust_id TYPE zedu_custid,
        lv_prod_id TYPE zedu_prodid,
        lv_qty TYPE zedu_qty,
        lv_price TYPE zedu_price,
        lv_remark TYPE zedu_remark,
        lv_order_id TYPE zedu##_ordid,
        ls_order TYPE zedu##_order.

  CLEAR ls_field.
  ls_field-tabname = 'ZEDU##_ORDER'. ls_field-fieldname = 'CUST_ID'.
  ls_field-fieldtext = '고객 ID'. ls_field-field_obl = 'X'.
  APPEND ls_field TO lt_fields.
  CLEAR ls_field.
  ls_field-tabname = 'ZEDU##_ORDER'. ls_field-fieldname = 'PROD_ID'.
  ls_field-fieldtext = '제품 ID'. ls_field-field_obl = 'X'.
  APPEND ls_field TO lt_fields.
  CLEAR ls_field.
  ls_field-tabname = 'ZEDU##_ORDER'. ls_field-fieldname = 'QUANTITY'.
  ls_field-fieldtext = '수량'. ls_field-field_obl = 'X'.
  APPEND ls_field TO lt_fields.
  CLEAR ls_field.
  ls_field-tabname = 'ZEDU##_ORDER'. ls_field-fieldname = 'REMARK'.
  ls_field-fieldtext = '비고'. APPEND ls_field TO lt_fields.

  CALL FUNCTION 'POPUP_GET_VALUES'
    EXPORTING popup_title = '주문 등록'
    IMPORTING returncode = lv_rc
    TABLES fields = lt_fields
    EXCEPTIONS error_in_fields = 1 OTHERS = 2.
  IF sy-subrc <> 0 OR lv_rc = 'A'. RETURN. ENDIF.

  READ TABLE lt_fields INTO ls_field INDEX 1. lv_cust_id = ls_field-value.
  READ TABLE lt_fields INTO ls_field INDEX 2. lv_prod_id = ls_field-value.
  READ TABLE lt_fields INTO ls_field INDEX 3. lv_qty = ls_field-value.
  READ TABLE lt_fields INTO ls_field INDEX 4. lv_remark = ls_field-value.

  CALL FUNCTION 'ZEDU##_ORDER_CHECK'
    EXPORTING iv_cust_id = lv_cust_id iv_prod_id = lv_prod_id iv_quantity = lv_qty
    IMPORTING ev_price = lv_price
    EXCEPTIONS invalid_cust = 1 invalid_prod = 2 invalid_qty = 3 OTHERS = 4.
  CASE sy-subrc.
    WHEN 0.
    WHEN 1.
      MESSAGE s010(zedu##_msg) WITH lv_cust_id DISPLAY LIKE 'E'. RETURN.
    WHEN 2.
      MESSAGE s011(zedu##_msg) WITH lv_prod_id DISPLAY LIKE 'E'. RETURN.
    WHEN 3.
      MESSAGE s012(zedu##_msg) DISPLAY LIKE 'E'. RETURN.
    WHEN OTHERS.
      MESSAGE '검증 중 오류가 발생했습니다.' TYPE 'S' DISPLAY LIKE 'E'. RETURN.
  ENDCASE.

  SELECT MAX( order_id ) FROM zedu##_order INTO lv_order_id.
  lv_order_id = lv_order_id + 1.
  CLEAR ls_order.
  ls_order-order_id = lv_order_id. ls_order-cust_id = lv_cust_id.
  ls_order-prod_id = lv_prod_id. ls_order-quantity = lv_qty.
  ls_order-status = 'N'. ls_order-order_date = sy-datum.
  ls_order-remark = lv_remark. ls_order-ernam = sy-uname.
  INSERT zedu##_order FROM ls_order.
  IF sy-subrc = 0.
    COMMIT WORK. MESSAGE s001(zedu##_msg) WITH lv_order_id.
  ELSE.
    ROLLBACK WORK. MESSAGE '등록에 실패했습니다.' TYPE 'S' DISPLAY LIKE 'E'.
  ENDIF.
ENDFORM.

FORM change_order USING pv_index TYPE sytabix.
  DATA: lt_fields TYPE TABLE OF sval,
        ls_field TYPE sval,
        lv_rc TYPE c LENGTH 1,
        lv_qty TYPE zedu_qty,
        lv_status TYPE zedu##_status.
  IF pv_index = 0.
    MESSAGE i022(zedu##_msg). RETURN.
  ENDIF.
  READ TABLE gt_list INTO gs_list INDEX pv_index.
  IF sy-subrc <> 0.
    MESSAGE i022(zedu##_msg). RETURN.
  ENDIF.
  IF gs_list-status = 'C'.
    MESSAGE s020(zedu##_msg) DISPLAY LIKE 'E'. RETURN.
  ENDIF.
  IF gs_list-status = 'X'.
    MESSAGE '취소된 주문은 수정할 수 없습니다.' TYPE 'S' DISPLAY LIKE 'E'. RETURN.
  ENDIF.

  CLEAR ls_field.
  ls_field-tabname = 'ZEDU##_ORDER'. ls_field-fieldname = 'QUANTITY'.
  ls_field-fieldtext = '수량'. ls_field-value = gs_list-quantity.
  CONDENSE ls_field-value. APPEND ls_field TO lt_fields.
  CLEAR ls_field.
  ls_field-tabname = 'ZEDU##_ORDER'. ls_field-fieldname = 'STATUS'.
  ls_field-fieldtext = '상태(N/C)'. ls_field-value = gs_list-status.
  APPEND ls_field TO lt_fields.

  CALL FUNCTION 'POPUP_GET_VALUES'
    EXPORTING popup_title = '주문 수정'
    IMPORTING returncode = lv_rc
    TABLES fields = lt_fields
    EXCEPTIONS OTHERS = 2.
  IF sy-subrc <> 0 OR lv_rc = 'A'. RETURN. ENDIF.
  READ TABLE lt_fields INTO ls_field INDEX 1. lv_qty = ls_field-value.
  READ TABLE lt_fields INTO ls_field INDEX 2. lv_status = ls_field-value.
  IF lv_qty <= 0.
    MESSAGE s012(zedu##_msg) DISPLAY LIKE 'E'. RETURN.
  ENDIF.
  IF lv_status <> 'N' AND lv_status <> 'C'.
    MESSAGE s013(zedu##_msg) WITH lv_status DISPLAY LIKE 'E'. RETURN.
  ENDIF.
  UPDATE zedu##_order SET quantity = lv_qty status = lv_status
    WHERE order_id = gs_list-order_id.
  IF sy-subrc = 0.
    COMMIT WORK. MESSAGE s002(zedu##_msg) WITH gs_list-order_id.
  ELSE.
    ROLLBACK WORK. MESSAGE '수정에 실패했습니다.' TYPE 'S' DISPLAY LIKE 'E'.
  ENDIF.
ENDFORM.

FORM delete_order USING pv_index TYPE sytabix.
  DATA: lv_answer TYPE c LENGTH 1,
        lv_text TYPE c LENGTH 80.
  IF pv_index = 0.
    MESSAGE i022(zedu##_msg). RETURN.
  ENDIF.
  READ TABLE gt_list INTO gs_list INDEX pv_index.
  IF sy-subrc <> 0.
    MESSAGE i022(zedu##_msg). RETURN.
  ENDIF.
  IF gs_list-status <> 'N'.
    MESSAGE s021(zedu##_msg) DISPLAY LIKE 'E'. RETURN.
  ENDIF.
  CONCATENATE '주문' gs_list-order_id '을(를) 삭제하시겠습니까?'
    INTO lv_text SEPARATED BY space.
  CALL FUNCTION 'POPUP_TO_CONFIRM'
    EXPORTING titlebar = '삭제 확인' text_question = lv_text
              text_button_1 = '예' text_button_2 = '아니오'
              default_button = '2' display_cancel_button = ' '
    IMPORTING answer = lv_answer
    EXCEPTIONS OTHERS = 2.
  IF sy-subrc <> 0.
    MESSAGE '삭제 확인 팝업 호출 중 오류가 발생했습니다.' TYPE 'S' DISPLAY LIKE 'E'. RETURN.
  ENDIF.
  IF lv_answer <> '1'. RETURN. ENDIF.
  DELETE FROM zedu##_order WHERE order_id = gs_list-order_id.
  IF sy-subrc = 0.
    COMMIT WORK. MESSAGE s003(zedu##_msg) WITH gs_list-order_id.
  ELSE.
    ROLLBACK WORK. MESSAGE '삭제에 실패했습니다.' TYPE 'S' DISPLAY LIKE 'E'.
  ENDIF.
ENDFORM.
