REPORT zedu##_u10.

TYPES: BEGIN OF ty_order,
         order_id TYPE zedu##_ordid,
         prod_id  TYPE zedu_prodid,
         quantity TYPE zedu_qty,
         status   TYPE zedu##_status,
       END OF ty_order.

DATA: gt_order TYPE TABLE OF ty_order,
      gs_order TYPE ty_order,
      gv_lines TYPE i.

gs_order-order_id = 1. gs_order-prod_id = 'P0000003'.
gs_order-quantity = 10. gs_order-status = 'N'. APPEND gs_order TO gt_order.
CLEAR gs_order.
gs_order-order_id = 2. gs_order-prod_id = 'P0000001'.
gs_order-quantity = 2. gs_order-status = 'C'. APPEND gs_order TO gt_order.
CLEAR gs_order.
gs_order-order_id = 3. gs_order-prod_id = 'P0000004'.
gs_order-quantity = 30. gs_order-status = 'X'. APPEND gs_order TO gt_order.

READ TABLE gt_order INTO gs_order WITH KEY order_id = 2.
IF sy-subrc = 0.
  gs_order-quantity = 99.
  MODIFY gt_order FROM gs_order INDEX sy-tabix.
ENDIF.

SORT gt_order BY quantity DESCENDING.
LOOP AT gt_order INTO gs_order.
  WRITE: / gs_order-order_id, gs_order-quantity, gs_order-status.
ENDLOOP.

DELETE gt_order WHERE status = 'X'.
CLEAR gt_order.
DESCRIBE TABLE gt_order LINES gv_lines.
WRITE: / 'CLEAR 후 건수:', gv_lines.
