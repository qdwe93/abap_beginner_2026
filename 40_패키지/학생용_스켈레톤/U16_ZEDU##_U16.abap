REPORT zedu##_u16.

PARAMETERS: p_cust TYPE zedu_custid DEFAULT 'C00001',
            p_prod TYPE zedu_prodid DEFAULT 'P0000003',
            p_qty  TYPE zedu_qty    DEFAULT 3.

DATA: gv_price  TYPE zedu_price,
      gv_amount TYPE zedu_amount.

START-OF-SELECTION.
* TODO: ZEDU##_ORDER_CHECK를 호출하고 CASE sy-subrc로
*       성공(단가·예상 금액 계산)과 예외별 메시지를 출력하세요.
*       (에디터 [Pattern] 버튼으로 호출 골격을 생성할 수 있습니다)
