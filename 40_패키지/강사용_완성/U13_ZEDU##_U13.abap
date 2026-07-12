REPORT zedu##_u13.

DATA: gs_order TYPE zedu##_order,
      gt_order TYPE TABLE OF zedu##_order,
      gv_cnt   TYPE i.

SELECT-OPTIONS: s_ordid FOR gs_order-order_id,
                s_date  FOR gs_order-order_date.
PARAMETERS p_stat TYPE zedu##_status.

START-OF-SELECTION.
  SELECT * FROM zedu##_order INTO TABLE gt_order
    WHERE order_id   IN s_ordid
      AND order_date IN s_date.
  IF p_stat IS NOT INITIAL.
    DELETE gt_order WHERE status <> p_stat.
  ENDIF.
  DESCRIBE TABLE gt_order LINES gv_cnt.
  WRITE: / '조회 건수:', gv_cnt.
  LOOP AT gt_order INTO gs_order.
    WRITE: / gs_order-order_id, gs_order-cust_id, gs_order-prod_id,
             gs_order-quantity, gs_order-status, gs_order-order_date.
  ENDLOOP.
