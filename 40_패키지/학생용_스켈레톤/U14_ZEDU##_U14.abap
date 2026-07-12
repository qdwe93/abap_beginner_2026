REPORT zedu##_u14.

DATA: gs_order TYPE zedu##_order,
      gv_check TYPE zedu_custid.

PARAMETERS p_cust TYPE zedu_custid.
SELECT-OPTIONS s_date FOR gs_order-order_date.

* TODO 1: INITIALIZATION에서 최근 90일 BT 기본값을 만드세요.
* TODO 2: AT SELECTION-SCREEN에서 고객 존재 여부를 검증하세요.
* TODO 3: START-OF-SELECTION에서 이벤트 도달 메시지를 출력하세요.
