REPORT zedu##_u11.

DATA: gs_prod  TYPE zedu_prod,
      gt_prod  TYPE TABLE OF zedu_prod,
      gs_order TYPE zedu##_order,
      gt_order TYPE TABLE OF zedu##_order.

SELECT SINGLE * FROM zedu_prod INTO gs_prod
  WHERE prod_id = 'P0000001'.
IF sy-subrc = 0.
  WRITE: / gs_prod-prod_id, gs_prod-prod_name, gs_prod-price.
ELSE.
  WRITE / '제품 없음'.
ENDIF.

SELECT * FROM zedu_prod INTO TABLE gt_prod
  WHERE price >= 100000.
LOOP AT gt_prod INTO gs_prod.
  WRITE: / gs_prod-prod_id, gs_prod-prod_name, gs_prod-price.
ENDLOOP.

SELECT * FROM zedu##_order INTO TABLE gt_order
  WHERE status = 'N'.
LOOP AT gt_order INTO gs_order.
  WRITE: / gs_order-order_id, gs_order-prod_id, gs_order-quantity.
ENDLOOP.
