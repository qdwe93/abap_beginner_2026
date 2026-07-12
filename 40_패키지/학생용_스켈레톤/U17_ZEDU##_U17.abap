REPORT zedu##_u17.

DATA gs_order TYPE zedu##_order.

START-OF-SELECTION.
* TODO 1: 연습 주문 9000000001을 INSERT하고 COMMIT하세요.
* TODO 2: SELECT SINGLE(sy-subrc 확인) 후 수량을 99로 UPDATE하세요.
* TODO 3: UPDATE SET으로 상태를 C로 바꾸세요.
* TODO 4: 9000000002를 MODIFY로 넣고, UPDATE 후 ROLLBACK WORK로 되돌리세요.
* TODO 5: 9000000001을 DELETE하세요.
* 각 단계의 sy-subrc/sy-dbcnt를 출력하고 SE16N으로 확인하세요.
