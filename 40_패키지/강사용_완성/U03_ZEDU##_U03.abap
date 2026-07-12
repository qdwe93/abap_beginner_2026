REPORT zedu##_u03.

DATA: gv_status TYPE c LENGTH 1 VALUE 'N',
      gv_text   TYPE c LENGTH 10,
      gv_qty    TYPE i VALUE 5,
      gv_stock  TYPE i VALUE 3.

CASE gv_status.
  WHEN 'N'. gv_text = '신규'.
  WHEN 'C'. gv_text = '완료'.
  WHEN 'X'. gv_text = '취소'.
  WHEN OTHERS. gv_text = '알수없음'.
ENDCASE.

IF gv_qty <= 0.
  WRITE / '오류: 수량은 1 이상이어야 합니다.'.
ELSEIF gv_qty > gv_stock.
  WRITE: / '재고 부족:', gv_qty, '/', gv_stock.
ELSE.
  WRITE / '주문 가능합니다.'.
ENDIF.

WRITE: / '상태:', gv_status, gv_text.
