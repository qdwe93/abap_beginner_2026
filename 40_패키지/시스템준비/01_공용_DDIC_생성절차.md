# 공용 DDIC 생성 절차

> 대상: 강의 전 강사 또는 시스템 준비 담당자
>
> 생성 범위: 공용 데이터 엘리먼트 9종 + 공용 테이블 2종

## 1. 공용 데이터 엘리먼트 9종

SE11 → Data Type → Create → Data Element에서 생성한다. 교육 단순화를 위해 Predefined Type을 사용한다. Field Label은 Short/Medium/Long/Heading에 같은 한국어 라벨을 넣는다.

| 순서 | Data Element | Predefined Type | Length/Decimals | 라벨 |
|------|--------------|-----------------|-----------------|------|
| 1 | ZEDU_CUSTID | CHAR | 6 | 고객 ID |
| 2 | ZEDU_PRODID | CHAR | 8 | 제품 ID |
| 3 | ZEDU_CUSTNAME | CHAR | 30 | 고객명 |
| 4 | ZEDU_PRODNAME | CHAR | 30 | 제품명 |
| 5 | ZEDU_PRICE | DEC | 11/2 | 단가 |
| 6 | ZEDU_AMOUNT | DEC | 15/2 | 금액 |
| 7 | ZEDU_QTY | INT4 | — | 수량 |
| 8 | ZEDU_ORDDATE | DATS | 8 | 주문일 |
| 9 | ZEDU_REMARK | CHAR | 40 | 비고 |

각 객체를 저장·활성화한 뒤 다음 객체로 이동한다.

## 2. 고객 테이블 `ZEDU_CUST`

SE11 → Database Table → Create.

- Short Description: 교육용 고객 마스터
- Delivery Class: A
- Data Browser/Table View Editing: Display/Maintenance Allowed

| 순서 | Field | Key | Data Element / Type |
|------|-------|:---:|---------------------|
| 1 | MANDT | X | MANDT |
| 2 | CUST_ID | X | ZEDU_CUSTID |
| 3 | CUST_NAME | | ZEDU_CUSTNAME |
| 4 | CITY | | CHAR 20 (Predefined Type) |
| 5 | PHONE | | CHAR 20 (Predefined Type) |

- Technical Settings: Data Class APPL0, Size Category 0
- Enhancement Category: Cannot Be Enhanced
- 저장·활성화

## 3. 제품 테이블 `ZEDU_PROD`

- Short Description: 교육용 제품 마스터
- Delivery Class: A
- Data Browser/Table View Editing: Display/Maintenance Allowed

| 순서 | Field | Key | Data Element / Type |
|------|-------|:---:|---------------------|
| 1 | MANDT | X | MANDT |
| 2 | PROD_ID | X | ZEDU_PRODID |
| 3 | PROD_NAME | | ZEDU_PRODNAME |
| 4 | PRICE | | ZEDU_PRICE |

- Technical Settings: Data Class APPL0, Size Category 0
- Enhancement Category: Cannot Be Enhanced
- 저장·활성화

## 4. 마스터 데이터 투입

`ZEDU_MASTER_LOAD.abap`을 `ZEDU_MASTER_LOAD`로 생성·활성화하고 실행한다. 프로그램은 공용 Z테이블만 초기화하고 고객 5건·제품 8건을 넣는다.

### 고객 기대값

| CUST_ID | CUST_NAME | CITY | PHONE |
|---------|-----------|------|-------|
| C00001 | 한빛상사 | 서울 | 02-1234-5678 |
| C00002 | 대한물산 | 부산 | 051-987-6543 |
| C00003 | 미래유통 | 대전 | 042-333-2222 |
| C00004 | 청담기획 | 서울 | 02-555-7777 |
| C00005 | 동해상회 | 강릉 | 033-111-2222 |

### 제품 기대값

| PROD_ID | PROD_NAME | PRICE |
|---------|-----------|------:|
| P0000001 | 노트북 15인치 | 1200000.00 |
| P0000002 | 모니터 27인치 | 350000.00 |
| P0000003 | 기계식 키보드 | 45000.00 |
| P0000004 | 무선 마우스 | 25000.00 |
| P0000005 | USB-C 도킹스테이션 | 180000.00 |
| P0000006 | 웹캠 FHD | 60000.00 |
| P0000007 | 사무용 의자 | 250000.00 |
| P0000008 | 화이트보드 | 90000.00 |

## 5. 검증

- [ ] DE 9종 활성
- [ ] ZEDU_CUST 활성, SE16N 5건
- [ ] ZEDU_PROD 활성, SE16N 8건
- [ ] 각 DE의 Field Label 표시
- [ ] P0000001 단가 1,200,000.00
- [ ] P0000003 단가 45,000.00
