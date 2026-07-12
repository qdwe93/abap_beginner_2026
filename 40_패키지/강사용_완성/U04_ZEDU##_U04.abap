REPORT zedu##_u04.

DATA gv_sum TYPE i.

DO 10 TIMES.
  gv_sum = gv_sum + sy-index.
  CHECK sy-index MOD 2 = 0.
  WRITE: / '짝수:', sy-index.
ENDDO.

WRITE: / '합계:', gv_sum.
