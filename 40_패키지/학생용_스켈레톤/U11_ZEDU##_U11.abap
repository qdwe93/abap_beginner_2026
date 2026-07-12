REPORT zedu##_u11.

DATA: gs_prod  TYPE zedu_prod,
      gt_prod  TYPE TABLE OF zedu_prod,
      gs_order TYPE zedu##_order,
      gt_order TYPE TABLE OF zedu##_order.

* TODO 1: P0000001을 SELECT SINGLE하고 sy-subrc를 처리하세요.
* TODO 2: 단가 100000 이상 제품을 INTO TABLE로 조회·출력하세요.
* TODO 3: 내 N 주문을 INTO TABLE로 조회·출력하세요.
