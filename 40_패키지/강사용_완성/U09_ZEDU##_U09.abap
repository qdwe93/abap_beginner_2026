REPORT zedu##_u09.

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

LOOP AT gt_order INTO gs_order.
  WRITE: / sy-tabix, gs_order-order_id, gs_order-prod_id,
           gs_order-quantity, gs_order-status.
ENDLOOP.

WRITE / '--- 신규(N)만 ---'.
LOOP AT gt_order INTO gs_order WHERE status = 'N'.
  WRITE: / gs_order-order_id, gs_order-prod_id.
ENDLOOP.

DESCRIBE TABLE gt_order LINES gv_lines.
WRITE: / '총', gv_lines, '건'.
