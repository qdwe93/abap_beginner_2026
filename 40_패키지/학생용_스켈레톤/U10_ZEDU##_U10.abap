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

" 준비 데이터
gs_order-order_id = 1. gs_order-prod_id = 'P0000003'.
gs_order-quantity = 10. gs_order-status = 'N'. APPEND gs_order TO gt_order.
CLEAR gs_order.
gs_order-order_id = 2. gs_order-prod_id = 'P0000001'.
gs_order-quantity = 2. gs_order-status = 'C'. APPEND gs_order TO gt_order.
CLEAR gs_order.
gs_order-order_id = 3. gs_order-prod_id = 'P0000004'.
gs_order-quantity = 30. gs_order-status = 'X'. APPEND gs_order TO gt_order.

* TODO 1: order_id=2를 READ하고 수량을 99로 MODIFY하세요.
* TODO 2: 수량 내림차순 SORT 후 출력하세요.
* TODO 3: X 상태를 DELETE하고 CLEAR 후 건수를 확인하세요.
