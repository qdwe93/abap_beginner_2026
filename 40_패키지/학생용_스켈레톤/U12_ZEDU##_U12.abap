REPORT zedu##_u12.

TYPES: BEGIN OF ty_list,
         order_id  TYPE zedu##_ordid,
         cust_name TYPE zedu_custname,
         prod_name TYPE zedu_prodname,
         quantity  TYPE zedu_qty,
         price     TYPE zedu_price,
       END OF ty_list.
TYPES: BEGIN OF ty_stat,
         status TYPE zedu##_status,
         cnt    TYPE i,
       END OF ty_stat.

DATA: gt_list TYPE TABLE OF ty_list,
      gs_list TYPE ty_list,
      gt_stat TYPE TABLE OF ty_stat,
      gs_stat TYPE ty_stat,
      gv_cnt  TYPE i.

* TODO 1: 주문+고객+제품을 JOIN하여 N 주문을 조회하세요.
* TODO 2: 전체 주문 COUNT(*)를 출력하세요.
* TODO 3: 상태별 COUNT(*)를 GROUP BY하여 출력하세요.
