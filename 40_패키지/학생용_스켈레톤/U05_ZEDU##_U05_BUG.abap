REPORT zedu##_u05_bug.

DATA gv_sum TYPE i.

* TODO: 디버거로 결과가 10이 되는 원인을 찾고 수정하세요.
DO 10 TIMES.
  gv_sum = 0.                       " BUG: 디버거로 찾으세요.
  gv_sum = gv_sum + sy-index.
ENDDO.

WRITE: / '1~10 합:', gv_sum.
