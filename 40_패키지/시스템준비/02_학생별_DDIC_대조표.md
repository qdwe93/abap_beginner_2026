# 학생별 DDIC 대조표 (U06~U07)

## U06 도메인·데이터 엘리먼트

| 객체 | 이름 | 정의 |
|------|------|------|
| Domain | ZEDU##_ORDID | NUMC 10 |
| Domain | ZEDU##_STATUS | CHAR 1, N 신규/C 완료/X 취소 |
| Data Element | ZEDU##_ORDID | Domain ZEDU##_ORDID, 라벨 주문번호 |
| Data Element | ZEDU##_STATUS | Domain ZEDU##_STATUS, 라벨 주문상태 |

## U07 테이블 `ZEDU##_ORDER`

| 순서 | Field | Key | 타입 |
|------|-------|:---:|------|
| 1 | MANDT | X | MANDT |
| 2 | ORDER_ID | X | ZEDU##_ORDID |
| 3 | CUST_ID | | ZEDU_CUSTID |
| 4 | PROD_ID | | ZEDU_PRODID |
| 5 | QUANTITY | | INT4 |
| 6 | STATUS | | ZEDU##_STATUS |
| 7 | ORDER_DATE | | DATS |
| 8 | REMARK | | CHAR 40 |
| 9 | ERNAM | | ERNAM |

- Delivery Class A
- Display/Maintenance Allowed
- Data Class APPL0 / Size Category 0
- Enhancement Category: Cannot Be Enhanced

## U07 스트럭처 `ZEDU##_S_LIST`

| 순서 | Component | Component Type |
|------|-----------|----------------|
| 1 | ORDER_ID | ZEDU##_ORDID |
| 2 | CUST_ID | ZEDU_CUSTID |
| 3 | CUST_NAME | ZEDU_CUSTNAME |
| 4 | PROD_ID | ZEDU_PRODID |
| 5 | PROD_NAME | ZEDU_PRODNAME |
| 6 | QUANTITY | ZEDU_QTY |
| 7 | PRICE | ZEDU_PRICE |
| 8 | AMOUNT | ZEDU_AMOUNT |
| 9 | STATUS | ZEDU##_STATUS |
| 10 | ORDER_DATE | ZEDU_ORDDATE |
| 11 | REMARK | ZEDU_REMARK |
| 12 | ERNAM | ERNAM |

## 활성화 판정

- [ ] 테이블 9필드·키 2개
- [ ] 기술설정과 Enhancement Category 완료
- [ ] 스트럭처 12필드·순서 일치
- [ ] 모든 객체 활성
- [ ] U08 로더 실행 후 주문 20건
