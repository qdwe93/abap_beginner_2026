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

* TODO 1: 주문 3건을 CLEAR/APPEND로 넣으세요.
*   1/P0000003/10/N, 2/P0000001/2/C, 3/P0000004/30/X
* TODO 2: 전체 목록과 N 상태만 각각 LOOP로 출력하세요.
* TODO 3: DESCRIBE TABLE로 건수를 출력하세요.
