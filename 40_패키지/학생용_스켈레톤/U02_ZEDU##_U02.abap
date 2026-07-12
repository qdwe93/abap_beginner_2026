REPORT zedu##_u02.

DATA: gv_prod_name TYPE c LENGTH 30,
      gv_qty       TYPE i,
      gv_price     TYPE p LENGTH 8 DECIMALS 2,
      gv_amount    TYPE p LENGTH 10 DECIMALS 2,
      gv_today     TYPE d.

" Q03 빠른 학생 확장용(부가세 10% 줄 추가)에 쓰는 상수 — 기본 TODO와 완성본에서는 사용하지 않음
CONSTANTS gc_vat_rate TYPE p LENGTH 3 DECIMALS 2 VALUE '0.10'.

gv_prod_name = '기계식 키보드'.
gv_qty       = 3.
gv_price     = '45000.00'.
gv_today     = sy-datum.

* TODO 1: 금액을 계산하세요.
* TODO 2: 제품명/수량/단가/금액/오늘 날짜를 출력하세요.
