REPORT zedu##_u14.

DATA: gs_order TYPE zedu##_order,
      gv_check TYPE zedu_custid.

PARAMETERS p_cust TYPE zedu_custid.
SELECT-OPTIONS s_date FOR gs_order-order_date.

INITIALIZATION.
  CLEAR s_date.
  s_date-sign = 'I'. s_date-option = 'BT'.
  s_date-low = sy-datum - 90. s_date-high = sy-datum.
  APPEND s_date.

AT SELECTION-SCREEN.
  IF p_cust IS NOT INITIAL.
    SELECT SINGLE cust_id FROM zedu_cust INTO gv_check
      WHERE cust_id = p_cust.
    IF sy-subrc <> 0.
      MESSAGE '존재하지 않는 고객입니다' TYPE 'E'.
    ENDIF.
  ENDIF.

START-OF-SELECTION.
  WRITE / 'START-OF-SELECTION 도달'.
