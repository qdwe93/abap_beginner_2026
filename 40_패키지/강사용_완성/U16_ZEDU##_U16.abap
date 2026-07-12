REPORT zedu##_u16.

PARAMETERS: p_cust TYPE zedu_custid DEFAULT 'C00001',
            p_prod TYPE zedu_prodid DEFAULT 'P0000003',
            p_qty  TYPE zedu_qty    DEFAULT 3.

DATA: gv_price  TYPE zedu_price,
      gv_amount TYPE zedu_amount.

START-OF-SELECTION.
  CALL FUNCTION 'ZEDU##_ORDER_CHECK'
    EXPORTING
      iv_cust_id   = p_cust
      iv_prod_id   = p_prod
      iv_quantity  = p_qty
    IMPORTING
      ev_price     = gv_price
    EXCEPTIONS
      invalid_cust = 1
      invalid_prod = 2
      invalid_qty  = 3
      OTHERS       = 4.
  CASE sy-subrc.
    WHEN 0.
      gv_amount = gv_price * p_qty.
      WRITE: / '검증 통과! 단가:', gv_price, '/ 예상 금액:', gv_amount.
    WHEN 1.
      WRITE: / '오류: 고객이 존재하지 않습니다 ->', p_cust.
    WHEN 2.
      WRITE: / '오류: 제품이 존재하지 않습니다 ->', p_prod.
    WHEN 3.
      WRITE / '오류: 수량은 1 이상이어야 합니다.'.
    WHEN OTHERS.
      WRITE / '알 수 없는 오류'.
  ENDCASE.
