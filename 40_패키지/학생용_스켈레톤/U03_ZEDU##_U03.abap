REPORT zedu##_u03.

DATA: gv_status TYPE c LENGTH 1 VALUE 'N',
      gv_text   TYPE c LENGTH 10,
      gv_qty    TYPE i VALUE 5,
      gv_stock  TYPE i VALUE 3.

* TODO 1: CASE로 N/C/X 상태명을 gv_text에 넣으세요.
* TODO 2: IF로 수량 오류/재고 부족/주문 가능을 출력하세요.

WRITE: / '상태:', gv_status, gv_text.
