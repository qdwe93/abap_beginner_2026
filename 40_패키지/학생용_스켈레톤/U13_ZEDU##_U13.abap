REPORT zedu##_u13.

DATA: gs_order TYPE zedu##_order,
      gt_order TYPE TABLE OF zedu##_order,
      gv_cnt   TYPE i.

SELECT-OPTIONS: s_ordid FOR gs_order-order_id,
                s_date  FOR gs_order-order_date.
PARAMETERS p_stat TYPE zedu##_status.

START-OF-SELECTION.
* TODO 1: 주문번호·주문일 조건으로 주문을 조회하세요.
* TODO 2: p_stat이 입력되면 해당 상태만 남기세요.
* TODO 3: 건수와 목록을 출력하세요.
