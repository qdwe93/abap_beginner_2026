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

SELECT a~order_id b~cust_name c~prod_name a~quantity c~price
  FROM zedu##_order AS a
  INNER JOIN zedu_cust AS b ON a~cust_id = b~cust_id
  INNER JOIN zedu_prod AS c ON a~prod_id = c~prod_id
  INTO CORRESPONDING FIELDS OF TABLE gt_list
  WHERE a~status = 'N'.
LOOP AT gt_list INTO gs_list.
  WRITE: / gs_list-order_id, gs_list-cust_name, gs_list-prod_name,
           gs_list-quantity, gs_list-price.
ENDLOOP.

SELECT COUNT( * ) FROM zedu##_order INTO gv_cnt.
WRITE: / '전체 주문:', gv_cnt.

SELECT status COUNT( * ) FROM zedu##_order
  INTO TABLE gt_stat
  GROUP BY status.
LOOP AT gt_stat INTO gs_stat.
  WRITE: / gs_stat-status, gs_stat-cnt.
ENDLOOP.
