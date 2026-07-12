REPORT zedu##_u05_fixed.

DATA gv_sum TYPE i.

gv_sum = 0.
DO 10 TIMES.
  gv_sum = gv_sum + sy-index.
ENDDO.

WRITE: / '1~10 합:', gv_sum.        " 55
