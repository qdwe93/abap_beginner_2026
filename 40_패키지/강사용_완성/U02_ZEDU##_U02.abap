REPORT zedu##_u02.

DATA: gv_prod_name TYPE c LENGTH 30,
      gv_qty       TYPE i,
      gv_price     TYPE p LENGTH 8 DECIMALS 2,
      gv_amount    TYPE p LENGTH 10 DECIMALS 2,
      gv_today     TYPE d.

CONSTANTS gc_vat_rate TYPE p LENGTH 3 DECIMALS 2 VALUE '0.10'.

gv_prod_name = '기계식 키보드'.
gv_qty       = 3.
gv_price     = '45000.00'.
gv_today     = sy-datum.
gv_amount    = gv_qty * gv_price.

WRITE: / '제품명:', gv_prod_name,
       / '수량  :', gv_qty,
       / '단가  :', gv_price,
       / '금액  :', gv_amount,
       / '오늘  :', gv_today.
