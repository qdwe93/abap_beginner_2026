/* SLIDES_Day2.pptx — SAP ABAP 기초교육 Day 2 (61장)
 * 원본: 11_교재_Day2.md / 30_강사가이드.md / 20_퀴즈집.md / 96_슬라이드_기획안.md
 * 헬퍼·팔레트·마스터는 day1_slides.js와 동일(일관성 유지). 유닛 데이터만 교체. */
const pptxgen = require("pptxgenjs");

const OUT = "C:\\workspace\\abap_beginner_2026\\50_슬라이드\\SLIDES_Day2.pptx";

// ---- palette / fonts ------------------------------------------------------
const NAVY = "1E2761";      // primary
const DEEP = "161D4A";      // dark slide bg
const ICE = "CADCFC";       // secondary on dark
const TINT = "EEF3FB";      // light card bg
const INK = "1B2340";       // body text
const MUTED = "5B6478";
const ACCENT = "E8A33D";    // amber: TODO / timer / highlight
const RED = "C4443C";
const GREEN = "3E7C4F";
const CODEBG = "151B33";
const CODEFG = "E8EEFF";
const CODEDIM = "8A96C2";
const LINEC = "D5DCEA";
const F = "Malgun Gothic";
const FC = "Courier New";

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.33 x 7.5
pres.author = "ABAP 기초교육";
pres.title = "SAP ABAP 기초교육 — Day 2";

pres.defineSlideMaster({
  title: "LIGHT",
  background: { color: "FFFFFF" },
  objects: [
    { text: { text: "SAP ABAP 기초교육 · Day 2 — 내부 테이블 · Open SQL · 리포트 구조", options: { x: 0.55, y: 7.14, w: 7.5, h: 0.26, fontFace: F, fontSize: 8.5, color: "9AA3B5", margin: 0 } } },
  ],
  slideNumber: { x: 12.65, y: 7.12, w: 0.5, h: 0.3, fontFace: F, fontSize: 9, color: "9AA3B5" },
});
pres.defineSlideMaster({
  title: "DARK",
  background: { color: DEEP },
  slideNumber: { x: 12.65, y: 7.12, w: 0.5, h: 0.3, fontFace: F, fontSize: 9, color: "7E89B8" },
});

// ---- helpers ---------------------------------------------------------------
function light() { return pres.addSlide({ masterName: "LIGHT" }); }
function dark() { return pres.addSlide({ masterName: "DARK" }); }

// content-slide header: unit chip + title (+kind tag right)
function header(s, chip, title, kind) {
  s.addShape("roundRect", { x: 0.55, y: 0.42, w: 1.05, h: 0.46, fill: { color: NAVY }, rectRadius: 0.09 });
  s.addText(chip, { x: 0.55, y: 0.42, w: 1.05, h: 0.46, align: "center", valign: "middle", fontFace: F, fontSize: 15, bold: true, color: "FFFFFF", margin: 0 });
  s.addText(title, { x: 1.8, y: 0.36, w: 9.0, h: 0.6, fontFace: F, fontSize: 23, bold: true, color: INK, margin: 0, valign: "middle" });
  if (kind) s.addText(kind, { x: 10.9, y: 0.47, w: 1.9, h: 0.4, align: "right", fontFace: F, fontSize: 12, bold: true, color: MUTED, margin: 0, valign: "middle" });
}

// dark unit-title slide
function unitTitle(chip, time, title, goals, prog, noteTxt) {
  const s = dark();
  s.addText(chip, { x: 0.9, y: 1.15, w: 4.0, h: 0.7, fontFace: F, fontSize: 30, bold: true, color: ACCENT, margin: 0 });
  s.addText(time, { x: 0.9, y: 1.82, w: 6.5, h: 0.42, fontFace: F, fontSize: 15, color: ICE, margin: 0 });
  s.addText(title, { x: 0.9, y: 2.45, w: 11.5, h: 1.15, fontFace: F, fontSize: 36, bold: true, color: "FFFFFF", margin: 0 });
  const runs = [];
  goals.forEach((g, i) => runs.push({ text: g, options: { bullet: { code: "25AA", indent: 14 }, color: ICE, breakLine: i < goals.length - 1, paraSpaceAfter: 8 } }));
  s.addText(runs, { x: 0.95, y: 3.9, w: 8.6, h: 1.6, fontFace: F, fontSize: 16, margin: 0, valign: "top" });
  s.addText([{ text: "이 시간이 끝나면 할 수 있는 것", options: {} }], { x: 0.95, y: 3.5, w: 6, h: 0.35, fontFace: F, fontSize: 11.5, bold: true, color: "8FA2D9", margin: 0 });
  if (prog) {
    s.addShape("roundRect", { x: 0.9, y: 5.85, w: 5.3, h: 0.62, fill: { color: "232C63" }, rectRadius: 0.09 });
    s.addText([{ text: "오늘 만드는 프로그램  ", options: { color: "8FA2D9", fontSize: 11.5 } }, { text: prog, options: { color: "FFFFFF", fontSize: 14, bold: true, fontFace: FC } }],
      { x: 1.15, y: 5.85, w: 5.0, h: 0.62, fontFace: F, margin: 0, valign: "middle" });
  }
  if (noteTxt) s.addNotes(noteTxt);
  return s;
}

// code block (dark card). code = array of lines; inline `"` comments dimmed
function codeBlock(s, o) {
  const { x, y, w, h, code, title } = o;
  const fs = o.fontSize || 11.5;
  s.addShape("roundRect", { x, y, w, h, fill: { color: CODEBG }, rectRadius: 0.07 });
  let ty = y + 0.14;
  if (title) {
    s.addText(title, { x: x + 0.26, y: ty, w: w - 0.5, h: 0.3, fontFace: F, fontSize: 10, bold: true, color: CODEDIM, margin: 0 });
    ty += 0.34;
  }
  const runs = [];
  code.forEach((ln, i) => {
    const last = i === code.length - 1;
    if (ln.trim() === "") { runs.push({ text: " ", options: { color: CODEFG, breakLine: !last } }); return; }
    const t = ln.trimStart();
    if (t.startsWith("*") || t.startsWith('"')) { runs.push({ text: ln, options: { color: CODEDIM, breakLine: !last } }); return; }
    const qi = ln.indexOf('"');
    if (qi >= 0) {
      runs.push({ text: ln.slice(0, qi), options: { color: CODEFG, breakLine: false } });
      runs.push({ text: ln.slice(qi), options: { color: CODEDIM, breakLine: !last } });
    } else {
      runs.push({ text: ln, options: { color: CODEFG, breakLine: !last } });
    }
  });
  s.addText(runs, { x: x + 0.26, y: ty, w: w - 0.5, h: h - (ty - y) - 0.12, fontFace: FC, fontSize: fs, margin: 0, valign: "top", lineSpacingMultiple: 1.04 });
}

// screenshot placeholder
function shot(s, o) {
  const { x, y, w, h, id, cap } = o;
  s.addShape("roundRect", { x, y, w, h, fill: { color: "F3F6FB" }, line: { color: "9FB0D0", width: 1, dashType: "dash" }, rectRadius: 0.08 });
  s.addText([{ text: "📷 " + id, options: { fontSize: 13, bold: true, color: NAVY, breakLine: true } },
             { text: cap, options: { fontSize: 11, color: MUTED, breakLine: true } },
             { text: " ", options: { fontSize: 4, breakLine: true } },
             { text: "캡처 전 자리표시자 · 50_슬라이드/스크린샷_캡처목록.md", options: { fontSize: 8.5, color: "9AA3B5" } }],
    { x: x + 0.2, y: y, w: w - 0.4, h: h, align: "center", valign: "middle", fontFace: F, margin: 0 });
}

// bullet list. items: {t, b(old), sub, gap}
function bullets(s, items, o) {
  const runs = [];
  items.forEach((it, i) => {
    const last = i === items.length - 1;
    if (it.sub) runs.push({ text: it.t, options: { bullet: { code: "2013", indent: 12 }, indentLevel: 1, color: MUTED, fontSize: (o.fontSize || 15) - 1.5, breakLine: !last, paraSpaceAfter: it.gap != null ? it.gap : 5 } });
    else runs.push({ text: it.t, options: { bullet: { code: "25AA", indent: 14 }, color: it.color || INK, bold: !!it.b, breakLine: !last, paraSpaceAfter: it.gap != null ? it.gap : 8 } });
  });
  s.addText(runs, { x: o.x, y: o.y, w: o.w, h: o.h, fontFace: F, fontSize: o.fontSize || 15, margin: 0, valign: "top" });
}

// standard table
function tbl(s, rows, o) {
  const trows = rows.map((r, ri) => r.map(c => {
    const base = typeof c === "object" ? c : { text: String(c) };
    const opt = Object.assign({ fontFace: F, fontSize: o.fontSize || 12, color: ri === 0 ? "FFFFFF" : INK, bold: ri === 0 || !!base.b, fill: { color: ri === 0 ? NAVY : (base.fill || (ri % 2 === 0 ? "F7F9FD" : "FFFFFF")) }, valign: "middle", align: base.align || "left" }, base.opts || {});
    return { text: base.text, options: opt };
  }));
  s.addTable(trows, { x: o.x, y: o.y, w: o.w, colW: o.colW, rowH: o.rowH || 0.32, border: { pt: 0.5, color: LINEC }, margin: 0.06 });
}

// amber info/timer banner (chip, not full-width stripe)
function banner(s, x, y, w, txt, opts) {
  const color = (opts && opts.color) || ACCENT;
  const tcolor = (opts && opts.tcolor) || "3A2B08";
  s.addShape("roundRect", { x, y, w, h: 0.5, fill: { color }, rectRadius: 0.1 });
  s.addText(txt, { x: x + 0.22, y, w: w - 0.44, h: 0.5, fontFace: F, fontSize: 12.5, bold: true, color: tcolor, margin: 0, valign: "middle" });
}

// simple card
function card(s, x, y, w, h, title, body, o) {
  o = o || {};
  s.addShape("roundRect", { x, y, w, h, fill: { color: o.fill || TINT }, rectRadius: 0.09 });
  s.addText(title, { x: x + 0.24, y: y + 0.14, w: w - 0.48, h: 0.36, fontFace: F, fontSize: o.tSize || 13.5, bold: true, color: o.tColor || NAVY, margin: 0 });
  if (body) s.addText(body, { x: x + 0.24, y: y + 0.52, w: w - 0.48, h: h - 0.64, fontFace: F, fontSize: o.bSize || 11.5, color: o.bColor || INK, margin: 0, valign: "top", lineSpacingMultiple: 1.08 });
}

// ❌→✅ contrast pair (used for risk-pattern slides)
function badGood(s, badTitle, badCode, badFoot, goodTitle, goodCode, goodFoot) {
  s.addShape("roundRect", { x: 0.55, y: 1.35, w: 6.0, h: 2.75, fill: { color: "FBEBE9" }, rectRadius: 0.09 });
  s.addText(badTitle, { x: 0.85, y: 1.52, w: 5.4, h: 0.4, fontFace: F, fontSize: 14, bold: true, color: RED, margin: 0 });
  s.addText(badCode, { x: 0.85, y: 2.02, w: 5.5, h: 1.5, fontFace: FC, fontSize: 11.5, color: INK, margin: 0, valign: "top", lineSpacingMultiple: 1.05 });
  s.addText(badFoot, { x: 0.85, y: 3.62, w: 5.4, h: 0.4, fontFace: F, fontSize: 11.5, color: RED, margin: 0 });
  s.addShape("roundRect", { x: 6.85, y: 1.35, w: 6.0, h: 2.75, fill: { color: "EAF3EC" }, rectRadius: 0.09 });
  s.addText(goodTitle, { x: 7.15, y: 1.52, w: 5.4, h: 0.4, fontFace: F, fontSize: 14, bold: true, color: GREEN, margin: 0 });
  s.addText(goodCode, { x: 7.15, y: 2.02, w: 5.5, h: 1.5, fontFace: FC, fontSize: 11.5, color: INK, margin: 0, valign: "top", lineSpacingMultiple: 1.05 });
  s.addText(goodFoot, { x: 7.15, y: 3.62, w: 5.4, h: 0.4, fontFace: F, fontSize: 11.5, color: GREEN, margin: 0 });
}

let s;

/* ===========================================================================
 * 1. 표지
 * ======================================================================== */
s = dark();
s.addText("SAP ABAP 3일 기초교육", { x: 0.9, y: 2.0, w: 8, h: 0.5, fontFace: F, fontSize: 18, bold: true, color: ACCENT, margin: 0 });
s.addText("Day 2", { x: 0.9, y: 2.55, w: 8, h: 1.0, fontFace: F, fontSize: 60, bold: true, color: "FFFFFF", margin: 0 });
s.addText("내부 테이블 · Open SQL · 리포트 프로그램의 구조", { x: 0.9, y: 3.75, w: 11.4, h: 0.7, fontFace: F, fontSize: 27, color: ICE, margin: 0 });
s.addText("내부테이블 · READ/SORT · SELECT · JOIN · 선택화면 · 이벤트 · ALV", { x: 0.9, y: 4.55, w: 11.4, h: 0.45, fontFace: F, fontSize: 14, color: "8FA2D9", margin: 0 });
s.addText("일시 ____________     강사 ____________", { x: 0.9, y: 6.3, w: 8, h: 0.4, fontFace: F, fontSize: 12, color: "7E89B8", margin: 0 });
s.addNotes("Day 2 표지. 준비물: 어제 만든 ZEDU##_ORDER(주문 20건), ZEDU##_S_LIST. 오늘의 결승선: 선택화면+JOIN+금액+ALV를 갖춘 ZEDU##_LIST 완성 — 내일 toy project의 몸통.");

/* 2. Day 2 로드맵 */
s = light();
header(s, "인트로", "오늘의 지도 · 오늘의 결승선", "안내");
tbl(s, [
  ["시간", "유닛", "내용"],
  ["09:00~09:15", "R2", "복습 퀴즈 + Day 1 객체 점검"],
  ["09:15~11:10", "U09·U10", "내부 테이블 ①② (APPEND·LOOP·READ·SORT)"],
  ["11:20~13:20", "U11", "Open SQL ① SELECT (퀴즈는 점심 후)"],
  ["13:20~15:10", "U12·U13", "JOIN·집계 / 선택화면"],
  ["15:25~16:05", "U14", "리포트 이벤트 흐름"],
  ["16:15~17:15", "U15", "ALV 출력"],
  ["17:15~18:00", "종합실습②", "ZEDU##_LIST 완성"],
], { x: 0.55, y: 1.2, w: 7.2, colW: [1.6, 1.5, 4.1], fontSize: 11, rowH: 0.36 });
card(s, 8.1, 1.2, 4.7, 2.7, "오늘의 결승선", "ZEDU##_LIST\n선택화면 + JOIN + 금액 계산 + ALV를\n한 프로그램에 조립합니다.\n\n이 프로그램이 그대로\n내일 toy project의 몸통이 됩니다.", { fill: "FDF3E3", tColor: "9A6A12", bSize: 13 });
banner(s, 8.1, 4.15, 4.7, "준비물: ZEDU##_ORDER(20건)·S_LIST", { color: "DDE7F8", tcolor: NAVY });
bullets(s, [
  { t: "어제의 20건을 내부 테이블·Open SQL·ALV로 조회 화면까지 끌고 갑니다", b: true },
  { t: "sy-subrc 확인 습관은 오늘부터 몸에 새깁니다", color: MUTED },
], { x: 0.55, y: 5.2, w: 12.2, h: 1.2, fontSize: 13.5 });
s.addNotes("R2는 지각자 버퍼 겸용. 준비물(주문 20건·S_LIST)이 없는 학생은 R2 시간에 즉시 복구. 오늘 결승선(ZEDU##_LIST)을 먼저 각인시킨다.");

/* 3. 복습 퀴즈 R2 */
s = light();
header(s, "복습", "복습 퀴즈 R2 — 어제를 확인", "✍️ 퀴즈");
bullets(s, [
  { t: "1)  어제 프로그램을 수정하고 저장만 했다. 실행하면 반영될까?", b: true },
  { t: "2)  도메인과 데이터 엘리먼트의 역할 차이를 한 줄로?", b: true },
  { t: "3)  다음 출력은?  DO 3 TIMES. WRITE / sy-index. ENDDO.", b: true },
  { t: "4)  (실기) SE16N으로 내 주문 테이블의 상태 'N' 건수를 세기", b: true },
], { x: 0.55, y: 1.35, w: 8.0, h: 2.8, fontSize: 15 });
card(s, 8.35, 1.35, 4.45, 2.55, "정답은 부록 A", "정답 발표보다 \"왜\"를 말하게 합니다.\n\n10분 풀이 → 5분은\nDay 1 객체 확인에 사용.", { bSize: 13 });
banner(s, 0.55, 4.6, 12.25, "주문 20건 또는 ZEDU##_S_LIST가 없는 학생은 지금 즉시 복구합니다 (오늘 전체의 전제)", {});
s.addNotes("R2 출처: 30_강사가이드 Day2. 이유를 말하게 한다. 미복구 학생(주문 20건·S_LIST 없음)은 이 시간에 반드시 복구 — Day 2 실습의 전제.");

/* ===========================================================================
 * U09 (4~10)
 * ======================================================================== */
unitTitle("U09", "09:15 ~ 10:05", "내부 테이블 ① 선언·APPEND·LOOP",
  ["라인 타입 / 워크에어리어 / 내부 테이블의 관계를 이해한다", "APPEND로 행을 쌓고 LOOP로 꺼낼 수 있다"],
  "ZEDU##_U09",
  "출처: 11_교재_Day2 > U09. 진행 팁: 종이에 '라인 타입 → 내부 테이블 → 워크에어리어' 세 층을 그린다. APPEND는 워크에어리어의 현재 값을 복사. CLEAR를 일부러 한 번 빼고 잔여값을 관찰.");

/* 5. 개념 1 — 내부 테이블 vs DB 테이블 (핵심) */
s = light();
header(s, "U09", "내부 테이블 vs DB 테이블", "개념");
card(s, 0.55, 1.3, 6.0, 2.55, "내부 테이블  (gt_)", "프로그램 메모리 안의 엑셀 시트.\n프로그램이 끝나면 사라집니다.\n\nSELECT의 그릇 · 가공의 작업대.", { bSize: 13.5 });
card(s, 6.8, 1.3, 6.0, 2.55, "DB 테이블", "데이터베이스에 영구 저장.\n어제 만든 ZEDU##_ORDER가 이것.\n\n프로그램이 끝나도 남습니다.", { fill: "FDF3E3", tColor: "9A6A12", bSize: 13.5 });
banner(s, 0.55, 4.2, 12.25, "ABAP 프로그래밍의 90% = \"DB에서 읽어와 → 내부 테이블에서 가공 → 출력\"", {});
bullets(s, [
  { t: "오늘은 손으로 채운 내부 테이블로 연습 → U11부터 DB에서 읽어 채웁니다", b: true },
], { x: 0.55, y: 5.05, w: 12.2, h: 0.9, fontSize: 13.5 });
s.addNotes("예상 질문 — Q. 내부 테이블과 DB 테이블 차이? A. 내부 테이블은 실행 중 메모리에만, DB 테이블은 데이터베이스에 지속 저장. 헤더라인은 혼란스러워 이 과정은 명시적으로 분리한다.");

/* 6. 개념 2 — 세 층 + APPEND/LOOP */
s = light();
header(s, "U09", "세 층: 라인타입 · 워크에어리어 · 내부테이블", "개념");
tbl(s, [
  ["선언", "정체", "접두어"],
  [{ text: "TYPES ty_order", opts: { fontFace: FC } }, "행의 설계도 (라인 타입)", "ty_"],
  [{ text: "DATA  gs_order", opts: { fontFace: FC } }, "행 1개짜리 변수 (워크에어리어)", "gs_"],
  [{ text: "DATA  gt_order", opts: { fontFace: FC } }, "행 여러 개 (내부 테이블)", "gt_"],
], { x: 0.55, y: 1.3, w: 7.4, colW: [2.6, 3.6, 1.2], fontSize: 12.5, rowH: 0.5 });
codeBlock(s, { x: 0.55, y: 3.25, w: 7.4, h: 2.2, title: "행을 쌓고 꺼내기", code: [
  "APPEND gs_order TO gt_order.        \" 맨 뒤에 복사",
  "",
  "LOOP AT gt_order INTO gs_order.     \" 한 행씩 꺼냄",
  "  WRITE: / sy-tabix, gs_order-order_id.",
  "ENDLOOP.",
] });
card(s, 8.2, 1.3, 4.6, 4.15, "기억할 것", "APPEND = 워크에어리어의\n현재 값을 복사\n\nLOOP 중 sy-tabix\n= 현재 행 번호(순번)\n주문번호가 아닙니다!\n\nWHERE로 조건도 걸 수\n있습니다:\nLOOP AT gt INTO gs\n  WHERE status = 'N'.", { bSize: 12.5 });
s.addNotes("APPEND는 워크에어리어의 '현재 값'을 복사한다는 점을 강조. sy-tabix를 데이터의 주문번호로 오해하는 것이 자주 막힘.");

/* 7. 따라치기 */
s = light();
header(s, "U09", "따라치기 — ZEDU##_U09", "💻 시연");
codeBlock(s, { x: 0.55, y: 1.25, w: 8.0, h: 4.55, title: "행 채우기 → APPEND → LOOP", code: [
  "gs_order-order_id = 1.",
  "gs_order-prod_id  = 'P0000003'.",
  "gs_order-quantity = 10.",
  "gs_order-status   = 'N'.",
  "APPEND gs_order TO gt_order.",
  "CLEAR gs_order.                 \" ★ APPEND 전 CLEAR 습관!",
  "",
  "LOOP AT gt_order INTO gs_order WHERE status = 'N'.",
  "  WRITE: / gs_order-order_id, gs_order-prod_id.",
  "ENDLOOP.",
  "DESCRIBE TABLE gt_order LINES gv_lines.",
] });
card(s, 8.75, 1.25, 4.05, 2.35, "교재 U09 💻 절", "TYPES → 내부 테이블/WA →\nAPPEND(3건) → 전체 LOOP →\n조건 LOOP → DESCRIBE 건수\n\n한 덩어리 입력 → 활성화 리듬", { bSize: 12.5 });
banner(s, 8.75, 3.8, 4.05, "완료: 3건 출력 + 신규 1건", { color: "DDE7F8", tcolor: NAVY });
s.addNotes("각 덩어리 입력 후 바로 활성화. CLEAR 하나를 일부러 지워 잔여값이 섞이는 것을 관찰(💡 교재). 자주 막힘: TYPE TABLE OF를 워크에어리어에 사용, APPEND 방향 반대.");

/* 8. 흔한 에러 */
s = light();
header(s, "U09", "여기서 자주 막힙니다", "⚠️ 점검");
banner(s, 0.55, 1.25, 12.25, "💡 CLEAR gs_order를 하나 지우고 실행 → 이전 행 값이 남아 섞입니다 (실무 최다 버그)", {});
tbl(s, [
  ["증상", "확인 / 해결"],
  ["TYPE TABLE OF 를 워크에어리어에 사용", "워크에어리어는 라인 타입(ty_order)으로 선언"],
  ["APPEND 방향이 반대", "APPEND gs_order TO gt_order (워크 → 테이블)"],
  ["sy-tabix가 주문번호와 다르다", "sy-tabix는 LOOP의 행 순번일 뿐"],
  ["LOOP 안에서 잘못된 구조명 사용", "INTO 대상 워크에어리어 이름 확인"],
], { x: 0.55, y: 2.05, w: 12.25, colW: [5.0, 7.25], fontSize: 12.5, rowH: 0.55 });
s.addNotes("표의 4가지는 강사가이드 U09 '자주 막힘'. 순회 시 이 순서로 본다.");

/* 9. 모던 ABAP */
s = light();
header(s, "U09", "모던 ABAP으로는 이렇게", "✨ 참고");
codeBlock(s, { x: 0.55, y: 1.35, w: 8.4, h: 3.5, title: "VALUE #( ) + 인라인 선언", code: [
  "DATA(lt_order) = VALUE ty_order_tab(",
  "  ( order_id = 1  prod_id = 'P0000003'  quantity = 10  status = 'N' )",
  "  ( order_id = 2  prod_id = 'P0000001'  quantity = 2   status = 'C' ) ).",
  "",
  "LOOP AT lt_order INTO DATA(ls_order).   \" 워크에어리어 인라인 선언",
  "  WRITE: / ls_order-order_id.",
  "ENDLOOP.",
], fontSize: 10.5 });
bullets(s, [
  { t: "VALUE #( ... )로 선언과 데이터 구성이 한 문장으로 끝납니다", b: true },
  { t: "오늘 실습 본문은 classic(APPEND). ✨는 \"실무 신규 코드의 모습\" 소개용", color: MUTED },
], { x: 0.6, y: 5.15, w: 12.1, h: 1.1, fontSize: 14 });
s.addNotes("시간이 밀리면 이 슬라이드는 건너뛴다(교재에 있음). 신문법 질문이 길어지면 '보조·확장 영역'임을 안내.");

/* 10. 퀴즈 Q09 */
s = light();
header(s, "U09", "퀴즈 Q09 — 재고 목록 만들기", "✍️ 퀴즈");
s.addText([{ text: "ZEDU##_U09Q", options: { fontFace: FC, bold: true, color: NAVY } }, { text: "  (스켈레톤 제공 — TODO만 작성)", options: {} }],
  { x: 0.55, y: 1.2, w: 12.2, h: 0.45, fontFace: F, fontSize: 14, color: INK, margin: 0 });
codeBlock(s, { x: 0.55, y: 1.8, w: 7.9, h: 3.0, title: "TODO 2개", code: [
  "* TODO 1: 아래 5건을 APPEND 하세요.",
  "*   P0000001/3, P0000002/15, P0000003/8,",
  "*   P0000004/25, P0000005/12",
  "",
  "* TODO 2: LOOP로 수량이 10 이상인 행만 출력하세요.",
  "*         (LOOP ... WHERE 또는 LOOP + IF)",
] });
s.addShape("roundRect", { x: 8.75, y: 1.8, w: 4.05, h: 1.5, fill: { color: "F4F6F4" }, line: { color: "BCC8BC", width: 0.75 }, rectRadius: 0.07 });
s.addText([{ text: "[기대 결과]", options: { fontSize: 10.5, bold: true, color: GREEN, breakLine: true } },
           { text: "P0000002 15\nP0000004 25\nP0000005 12", options: { fontSize: 12, color: INK, fontFace: FC } }],
  { x: 8.95, y: 1.95, w: 3.6, h: 1.3, fontFace: F, margin: 0, valign: "top" });
card(s, 8.75, 3.5, 4.05, 1.3, "다 풀었다면", "퀴즈집 U09-D\n(어려웠다면 U09-E) · 정답은 부록 A", { fill: "FDF3E3", tColor: "9A6A12", bSize: 12 });
banner(s, 0.55, 5.1, 12.25, "APPEND 전 CLEAR 습관 유지 — 잔여값이 섞이면 결과가 달라집니다", {});
s.addNotes("순회하며 CLEAR·APPEND 방향만 봐 준다. 정답은 부록 A(비노출). 빠른 학생은 D09(총수량 누적).");

/* ===========================================================================
 * U10 (11~18)
 * ======================================================================== */
unitTitle("U10", "10:20 ~ 11:10", "내부 테이블 ② READ·SORT·MODIFY·DELETE",
  ["READ TABLE로 행을 찾고 sy-subrc / sy-tabix를 해석할 수 있다", "SORT / MODIFY / DELETE / CLEAR로 내부 테이블을 조작할 수 있다"],
  "ZEDU##_U10",
  "출처: 11_교재_Day2 > U10. READ 직후 sy-subrc와 sy-tabix를 칠판에 표시. 다른 문장을 한 줄 실행해 시스템 필드가 덮이는 모습을 보여준다. 내부 테이블 DELETE와 DB DELETE를 색으로 구분.");

/* 12. 개념 — 조작 문장 표 */
s = light();
header(s, "U10", "내부 테이블 조작 문장", "개념");
tbl(s, [
  ["문장", "역할"],
  [{ text: "READ TABLE gt INTO gs WITH KEY f = 값.", opts: { fontFace: FC } }, "조건으로 한 행 찾기 (첫 매칭)"],
  [{ text: "READ TABLE gt INTO gs INDEX n.", opts: { fontFace: FC } }, "n번째 행 읽기"],
  [{ text: "SORT gt BY f1 [DESCENDING] f2.", opts: { fontFace: FC } }, "정렬"],
  [{ text: "MODIFY gt FROM gs INDEX n.", opts: { fontFace: FC } }, "n번째 행을 gs 내용으로 교체"],
  [{ text: "DELETE gt WHERE 조건.", opts: { fontFace: FC } }, "행 삭제 (조건 / INDEX)"],
  [{ text: "CLEAR gt.", opts: { fontFace: FC } }, "전부 비우기 (옛 REFRESH gt.)"],
], { x: 0.55, y: 1.3, w: 8.4, colW: [4.9, 3.5], fontSize: 11.5, rowH: 0.44 });
card(s, 9.2, 1.3, 3.6, 4.0, "sy-subrc", "= \"직전 명령이 성공했나?\"\n0 이면 성공.\n\nREAD·SELECT 등 수많은\n명령이 결과를 여기 남깁니다.\n\nREAD 후에는 반드시\nsy-subrc 확인 —\n오늘부터 몸에 새길 습관!", { fill: "FDF3E3", tColor: "9A6A12", bSize: 12.5 });
s.addNotes("예상 질문 — Q. READ TABLE은 왜 SELECT가 아닌가? A. 이미 메모리에 있는 내부 테이블을 읽기 때문. DB 접근은 Open SQL SELECT. Q. sy-subrc는 항상 0/4? A. 명령마다 의미·값이 다르다.");

/* 13. READ 직후 시점 (핵심) */
s = light();
header(s, "U10", "READ 직후 — sy-subrc · sy-tabix 시점", "핵심 규칙");
codeBlock(s, { x: 0.55, y: 1.3, w: 7.6, h: 3.15, title: "성공했을 때만 sy-tabix가 의미 있다", code: [
  "READ TABLE gt_order INTO gs_order WITH KEY order_id = 2.",
  "IF sy-subrc = 0.",
  "  WRITE: / '찾음! 행번호:', sy-tabix, '/ 제품:', gs_order-prod_id.",
  "ELSE.",
  "  WRITE / '해당 주문 없음'.",
  "ENDIF.",
] });
card(s, 8.4, 1.3, 4.4, 3.15, "왜 중요한가", "READ가 실패했는데\nsy-tabix를 쓰면\n엉뚱한 행을 건드립니다.\n\nDay 3 CRUD에서\n이 습관이 사고를 막습니다.", { bSize: 13 });
banner(s, 0.55, 4.7, 12.25, "⚠️ READ 직후 다른 명령을 실행하면 sy-tabix / sy-subrc가 덮어써집니다 — 바로 쓰거나 변수에 보관", {});
s.addNotes("READ 직후 sy-subrc/sy-tabix를 칠판에 표시. 다른 문장을 한 줄 실행해 시스템 필드가 덮이는 모습을 보여준다.");

/* 14. 따라치기 */
s = light();
header(s, "U10", "따라치기 — SORT · MODIFY · DELETE", "💻 시연");
codeBlock(s, { x: 0.55, y: 1.25, w: 8.1, h: 4.5, title: "READ가 남긴 행번호를 MODIFY에 재사용", code: [
  "SORT gt_order BY quantity DESCENDING.",
  "",
  "READ TABLE gt_order INTO gs_order WITH KEY order_id = 2.",
  "IF sy-subrc = 0.",
  "  gs_order-quantity = 99.",
  "  MODIFY gt_order FROM gs_order INDEX sy-tabix.",
  "ENDIF.",
  "",
  "DELETE gt_order WHERE status = 'X'.",
  "CLEAR gt_order.        \" 전부 비우기",
] });
card(s, 8.85, 1.25, 3.95, 4.5, "(1)~(3) 데이터", "TYPES~APPEND 부분은\nZEDU##_U09에서 복사해\n옵니다 (gv_lines 선언 포함).\n\nSORT 후에는\n행 인덱스가 바뀝니다 —\nMODIFY는 READ가 막\n찾은 sy-tabix로.", { bSize: 12.5 });
s.addNotes("MODIFY 전에 워크에어리어 값을 바꾸지 않는 실수가 잦다. SORT 후 인덱스가 바뀐다는 점을 놓치는 것도. 내부 테이블 DELETE는 DB를 바꾸지 않음(색 구분).");

/* 15. 위험 패턴 D10 — WRITE에 수식 금지 */
s = light();
header(s, "U10", "WRITE 목록에 수식을 쓸 수 없다", "⚠️ 위험 패턴");
badGood(s,
  "❌ 활성화 실패",
  "DESCRIBE TABLE gt_order\n  LINES gv_before.\nDELETE gt_order\n  WHERE status = 'X'.\nDESCRIBE ... LINES gv_after.\nWRITE: / '삭제 건수:',\n         gv_before - gv_after.",
  "출력 목록에는 데이터 객체(변수)만!",
  "✅ 변수에 먼저 계산",
  "gv_deleted =\n  gv_before - gv_after.\nWRITE: / '삭제 건수:',\n         gv_deleted.",
  "계산 → 변수 → 출력. 항상 이 순서!");
banner(s, 0.55, 4.4, 12.25, "삭제 건수도 gv_deleted에 먼저 계산 — U02의 \"WRITE엔 변수만\" 규칙이 D10에서 다시 등장합니다", {});
s.addNotes("93 검토에서 확정된 교육 포인트(퀴즈집 D10). 삭제 건수는 sy-tabix가 아니라 명시 변수(gv_deleted)에 받아 출력. WRITE에 gv_before - gv_after 같은 수식 직접 사용 금지.");

/* 16. 흔한 에러 */
s = light();
header(s, "U10", "여기서 자주 막힙니다", "⚠️ 점검");
tbl(s, [
  ["증상", "확인 / 해결"],
  ["READ 실패 후에도 sy-tabix 사용", "IF sy-subrc = 0 안에서만 sy-tabix 사용"],
  ["MODIFY 전에 워크에어리어 값을 안 바꿈", "gs의 필드를 바꾼 뒤 MODIFY"],
  ["SORT 후 행 인덱스가 바뀐 걸 놓침", "정렬 뒤의 INDEX는 새 순서 기준"],
  ["CLEAR gt_order 와 CLEAR gs_order 혼동", "gt=테이블 전체 / gs=워크에어리어 한 행"],
], { x: 0.55, y: 1.4, w: 12.25, colW: [5.4, 6.85], fontSize: 12.5, rowH: 0.6 });
banner(s, 0.55, 4.35, 12.25, "READ → sy-subrc 확인 → (성공 시) sy-tabix 사용 — 이 순서를 3일 내내", {});
s.addNotes("표 4가지는 강사가이드 U10 '자주 막힘'.");

/* 17. 모던 ABAP */
s = light();
header(s, "U10", "모던 ABAP으로는 이렇게", "✨ 참고");
codeBlock(s, { x: 0.55, y: 1.35, w: 8.4, h: 2.5, title: "테이블 표현식 + line_exists", code: [
  "IF line_exists( gt_order[ order_id = 2 ] ).   \" 존재 확인",
  "  DATA(ls_found) = gt_order[ order_id = 2 ].   \" 행 읽기",
  "  WRITE / lines( gt_order ).                    \" 건수",
  "ENDIF.",
] });
bullets(s, [
  { t: "gt[ ... ]는 없는 행이면 예외(덤프) — 그래서 line_exists( )와 짝으로 씁니다", b: true },
  { t: "classic READ + sy-subrc 확인과 정확히 같은 방어를 문법으로 표현한 것", color: MUTED },
], { x: 0.6, y: 4.15, w: 12.1, h: 1.2, fontSize: 14 });
s.addNotes("gt[...]가 없는 행이면 덤프라는 점을 강조 — line_exists와 짝. 오늘 실습은 classic.");

/* 18. 퀴즈 Q10 */
s = light();
header(s, "U10", "퀴즈 Q10 — 주문 정리하기", "✍️ 퀴즈");
s.addText([{ text: "ZEDU##_U10Q", options: { fontFace: FC, bold: true, color: NAVY } }, { text: "  (주문 5건 APPEND까지 완성 상태로 제공)", options: {} }],
  { x: 0.55, y: 1.2, w: 12.2, h: 0.45, fontFace: F, fontSize: 14, color: INK, margin: 0 });
codeBlock(s, { x: 0.55, y: 1.8, w: 8.1, h: 3.0, title: "TODO 3개", code: [
  "* TODO 1: 수량 내림차순으로 정렬 후 전체 출력",
  "",
  "* TODO 2: order_id = 4 인 행을 READ해서 수량을 50으로 변경",
  "*         (sy-subrc 확인 포함)",
  "",
  "* TODO 3: 상태 'X' 행을 삭제하고, 삭제 전/후 건수를 출력",
] });
card(s, 8.85, 1.8, 3.95, 3.0, "다 풀었다면", "퀴즈집 U10-D (정렬 후 취소 제거)\n어려웠다면 U10-E\n\n정답은 부록 A —\n지금은 보지 않기!", { fill: "FDF3E3", tColor: "9A6A12", bSize: 12.5 });
banner(s, 0.55, 5.1, 12.25, "TODO 3의 건수 출력 — 방금 배운 규칙(WRITE엔 수식 금지)을 그대로 적용", {});
s.addNotes("정답 비노출. TODO 3은 D10 규칙 확인 지점. 빠른 학생은 D10.");

/* ===========================================================================
 * U11 (19~25)
 * ======================================================================== */
unitTitle("U11", "11:20 ~ 12:00  /  13:00 ~ 13:20 (퀴즈)", "Open SQL ① SELECT 기초",
  ["SELECT SINGLE / SELECT ... INTO TABLE로 DB를 조회할 수 있다", "WHERE로 조건을 걸고 sy-subrc / sy-dbcnt를 확인할 수 있다"],
  "ZEDU##_U11",
  "출처: 11_교재_Day2 > U11. 점심 전: DB↔내부테이블 연결/SELECT SINGLE/INTO TABLE·WHERE/sy-subrc·sy-dbcnt. 점심 후: Q11 스켈레톤을 바로 실행하게 하고 TODO부터. 오전 개념을 다시 강의하지 않는다.");

/* 20. 개념 */
s = light();
header(s, "U11", "Open SQL — DB에서 읽어오기", "개념");
s.addText("Open SQL = ABAP 안에서 쓰는 SQL. DB 종류(HANA·Oracle...)와 무관하게 동일하게 동작합니다.",
  { x: 0.55, y: 1.18, w: 12.2, h: 0.45, fontFace: F, fontSize: 13.5, color: INK, margin: 0 });
codeBlock(s, { x: 0.55, y: 1.75, w: 8.2, h: 1.85, title: "두 가지 형태", code: [
  "SELECT SINGLE * FROM 테이블 INTO wa    WHERE 키 = 값.   \" 딱 1건",
  "",
  "SELECT *        FROM 테이블 INTO TABLE itab WHERE 조건. \" 여러 건",
], fontSize: 10.5 });
card(s, 9.0, 1.75, 3.8, 1.85, "결과 확인", "sy-subrc\n0 성공 / 4 결과 없음\n\nsy-dbcnt\n= 읽은 건수", { bSize: 12.5 });
bullets(s, [
  { t: "어제 배운 내부 테이블이 바로 SELECT의 그릇이 됩니다", b: true },
  { t: "SELECT SINGLE은 키 전체를 지정해 1건을 특정할 때 쓰는 것이 정석", b: true },
  { t: "여러 행은 INTO TABLE로 받고 LOOP로 처리합니다" },
], { x: 0.55, y: 3.95, w: 12.2, h: 1.9, fontSize: 14 });
s.addNotes("예상 질문 — Q. SELECT SINGLE에 키가 아닌 조건? A. 문법 오류는 아닐 수 있으나 어떤 한 건이 선택될지 불명확. 고유 키 조건을 우선. INTO 대상 타입 불일치가 자주 막힘.");

/* 21. 따라치기 */
s = light();
header(s, "U11", "따라치기 — SELECT SINGLE · INTO TABLE", "💻 시연");
codeBlock(s, { x: 0.55, y: 1.25, w: 8.3, h: 4.5, title: "ZEDU##_U11", code: [
  "SELECT SINGLE * FROM zedu_prod INTO gs_prod",
  "  WHERE prod_id = 'P0000001'.",
  "IF sy-subrc = 0.",
  "  WRITE: / gs_prod-prod_id, gs_prod-prod_name, gs_prod-price.",
  "ELSE.",
  "  WRITE / '제품이 없습니다.'.",
  "ENDIF.",
  "",
  "SELECT * FROM zedu##_order INTO TABLE gt_order",
  "  WHERE status = 'N'.",
  "WRITE: / '내 신규 주문:', sy-dbcnt, '건'.",
] });
card(s, 9.05, 1.25, 3.75, 4.5, "관찰 포인트", "SELECT SINGLE은\nsy-subrc로 존재 확인.\n\nINTO TABLE 다음엔\nsy-dbcnt로 건수.\n\n문자열 ID의 길이·0 개수\n오타를 조심 —\n'P0000001'", { bSize: 12.5 });
s.addNotes("자주 막힘: 문자열 ID의 길이·0 개수 오타. SELECT 후 다른 문장을 실행한 뒤 sy-subrc 확인.");

/* 22. 옛 코드 + 흔한 에러 */
s = light();
header(s, "U11", "옛 코드 ENDSELECT · 자주 막힘", "개념");
card(s, 0.55, 1.3, 6.0, 2.5, "📦 옛 코드에서 만나게 될 것", "SELECT * FROM ... .\n  ...\nENDSELECT.\n\n행 단위 처리라 집합 처리보다 불리하고 코드도 장황. 신규는 INTO TABLE + LOOP를 우선 (읽을 줄만 알면 됩니다).", { fill: "FDF3E3", tColor: "9A6A12", bSize: 12.5 });
tbl(s, [
  ["증상", "확인 / 해결"],
  ["INTO 대상 타입 불일치", "결과를 받을 구조/테이블 타입 확인"],
  ["다른 문장 뒤 sy-subrc 확인", "SELECT 직후 바로 확인"],
  ["문자열 ID 길이·0 개수 오타", "'P0000001' 자릿수 확인"],
], { x: 6.8, y: 1.3, w: 6.0, colW: [2.9, 3.1], fontSize: 11.5, rowH: 0.55 });
banner(s, 0.55, 4.15, 12.25, "SELECT ... ENDSELECT는 \"읽을 수 있으면 충분\" — 신규 코드는 집합 조회(INTO TABLE)", {});
s.addNotes("ENDSELECT는 읽기용. 강조: 신규 코드는 집합 조회 우선.");

/* 23. New Open SQL */
s = light();
header(s, "U11", "모던 ABAP — New Open SQL", "✨ 참고");
codeBlock(s, { x: 0.55, y: 1.35, w: 8.6, h: 2.6, title: "콤마 · @호스트변수 · 인라인 선언", code: [
  "SELECT prod_id, prod_name, price       \" ① 필드는 콤마로 구분",
  "  FROM zedu_prod",
  "  WHERE price >= @gv_min_price          \" ② ABAP 변수 앞에 @",
  "  INTO TABLE @DATA(lt_prod).            \" ③ 인라인 선언 + INTO 맨 뒤",
], fontSize: 10.5 });
bullets(s, [
  { t: "콤마 · @ · 인라인 선언이 new Open SQL의 3대 표식", b: true },
  { t: "S/4 표준 코드를 읽을 때 반드시 만나게 됩니다 — 오늘 실습 본문은 classic", color: MUTED },
], { x: 0.6, y: 4.25, w: 12.1, h: 1.2, fontSize: 14 });
s.addNotes("콤마/@/인라인 3대 표식. classic과 결과는 같다.");

/* 24. 점심 브릿지 */
s = dark();
s.addText("점심시간", { x: 0.9, y: 1.6, w: 8, h: 0.8, fontFace: F, fontSize: 34, bold: true, color: ACCENT, margin: 0 });
s.addText("12:00 ~ 13:00", { x: 0.9, y: 2.4, w: 5, h: 0.4, fontFace: F, fontSize: 16, color: ICE, margin: 0 });
s.addText("오후 첫 순서 — Q11부터", { x: 0.9, y: 3.1, w: 11.5, h: 0.8, fontFace: F, fontSize: 30, bold: true, color: "FFFFFF", margin: 0 });
s.addText([{ text: "점심 후에는 오전 개념을 다시 강의하지 않습니다.", options: { fontSize: 16, color: "FFD9A0", breakLine: true, paraSpaceAfter: 10 } },
           { text: "Q11 스켈레톤을 바로 실행하고 TODO 1부터 → 이어서 U12 JOIN·집계.", options: { fontSize: 14, color: ICE } }],
  { x: 0.9, y: 4.15, w: 11.4, h: 1.4, fontFace: F, margin: 0 });
s.addNotes("점심 후 Q11 스켈레톤을 바로 실행하게 하고 TODO 1부터 해결. 오전 개념 재강의 없음(강사가이드).");

/* 25. 퀴즈 Q11 */
s = light();
header(s, "U11", "퀴즈 Q11 — SELECT 연습 (점심 후)", "✍️ 퀴즈");
banner(s, 0.55, 1.15, 12.25, "13:00 ~ 13:20 · 오전 개념 재강의 없음 — 스켈레톤을 바로 실행합니다", { color: "DDE7F8", tcolor: NAVY });
codeBlock(s, { x: 0.55, y: 1.85, w: 8.1, h: 3.0, title: "ZEDU##_U11Q — TODO 2개", code: [
  "* TODO 1: 내 주문 중 수량 5 이상을 INTO TABLE로 조회해",
  "*         건수와 목록(주문번호/제품ID/수량)을 출력",
  "",
  "* TODO 2: SELECT SINGLE로 고객 C00003의 고객명을 조회·출력",
  "*         C99999로 바꾸면 \"고객 없음\"이 나오게 sy-subrc 처리",
] });
card(s, 8.85, 1.85, 3.95, 3.0, "다 풀었다면", "퀴즈집 U11-D\n(어려웠다면 U11-E)\n\n정답은 부록 A", { fill: "FDF3E3", tColor: "9A6A12", bSize: 12.5 });
banner(s, 0.55, 5.15, 12.25, "TODO 2 — 없는 고객(C99999)은 sy-subrc <> 0으로 분기해 메시지 처리", {});
s.addNotes("정답 비노출. sy-subrc 분기가 핵심. 빠른 학생은 D11.");

/* ===========================================================================
 * U12 (26~33)
 * ======================================================================== */
unitTitle("U12", "13:20 ~ 14:10", "Open SQL ② JOIN과 집계",
  ["INNER JOIN으로 여러 테이블을 한 번에 조회할 수 있다", "COUNT/SUM, GROUP BY, ORDER BY, UP TO n ROWS를 쓸 수 있다"],
  "ZEDU##_U12",
  "출처: 11_교재_Day2 > U12. JOIN 전에 '주문에는 이름이 없다'는 문제를 먼저 제시. 별칭 a~/b~/c~를 표의 색과 맞춘다. FOR ALL ENTRIES는 빈 원본 테이블의 위험만 소개하고 실습하지 않는다.");

/* 27. 개념 JOIN (핵심) */
s = light();
header(s, "U12", "INNER JOIN — 주문엔 이름이 없다", "개념");
bullets(s, [
  { t: "주문 테이블에는 고객 \"ID\"만 있습니다. 고객 \"이름\"은 ZEDU_CUST에 있죠", b: true },
  { t: "두 테이블을 붙여서 한 번에 가져오는 것이 JOIN" },
], { x: 0.55, y: 1.25, w: 12.2, h: 1.1, fontSize: 14.5 });
codeBlock(s, { x: 0.55, y: 2.5, w: 8.4, h: 1.55, title: "별칭~필드", code: [
  "FROM zedu##_order AS a",
  "INNER JOIN zedu_cust AS b ON a~cust_id = b~cust_id   \" a~ : 별칭~필드",
], fontSize: 10.5 });
card(s, 9.15, 2.5, 3.65, 1.55, "INNER JOIN", "양쪽 다 있는 것만\n결과에 나옴", { bSize: 13 });
banner(s, 0.55, 4.4, 12.25, "한쪽만 있어도 결과에 넣으려면 LEFT OUTER JOIN (소개만) · 마스터가 없으면 그 주문은 빠집니다", {});
s.addNotes("예상 질문 — Q. INNER JOIN에서 마스터가 없으면 주문이 나오나? A. 나오지 않음. 한쪽이 없어도 보여야 하면 LEFT OUTER JOIN 검토. JOIN 결과 행 수가 줄면 마스터 누락 가능성.");

/* 28. 따라치기 ① JOIN */
s = light();
header(s, "U12", "따라치기 ① — 3-테이블 INNER JOIN", "💻 시연");
codeBlock(s, { x: 0.55, y: 1.3, w: 8.3, h: 3.5, title: "주문 + 고객명 + 제품명/단가", code: [
  "SELECT a~order_id b~cust_name c~prod_name a~quantity c~price",
  "  FROM zedu##_order AS a",
  "  INNER JOIN zedu_cust AS b ON a~cust_id = b~cust_id",
  "  INNER JOIN zedu_prod AS c ON a~prod_id = c~prod_id",
  "  INTO CORRESPONDING FIELDS OF TABLE gt_list",
  "  WHERE a~status = 'N'.",
], fontSize: 10.5 });
card(s, 9.05, 1.3, 3.75, 3.5, "💡 CORRESPONDING", "INTO CORRESPONDING\nFIELDS OF TABLE\n= 필드 이름이 같은\n곳에 넣기.\n\n이름만 맞으면 순서가\n달라도 안전.\n이름이 다르면 그 필드는\n비어 있게 됨 (오타 주의).", { bSize: 12 });
banner(s, 0.55, 4.95, 12.25, "별칭 a~/b~/c~로 어느 테이블 필드인지 명시 — 같은 필드명을 별칭 없이 쓰면 오류", {});
s.addNotes("별칭을 표의 색과 맞춘다. 같은 필드명을 별칭 없이 쓰는 것, CORRESPONDING인데 결과 구조 필드명이 다른 것이 자주 막힘.");

/* 29. 따라치기 ② 집계 */
s = light();
header(s, "U12", "따라치기 ② — COUNT · GROUP BY · TOP N", "💻 시연");
codeBlock(s, { x: 0.55, y: 1.3, w: 8.3, h: 4.35, title: "집계 · 그룹 · 정렬+상위 N", code: [
  "SELECT COUNT( * ) FROM zedu##_order INTO gv_cnt.",
  "",
  "SELECT status COUNT( * )",
  "  FROM zedu##_order",
  "  INTO TABLE gt_stat",
  "  GROUP BY status.",
  "",
  "SELECT * FROM zedu##_order INTO TABLE gt_top",
  "  UP TO 3 ROWS",
  "  ORDER BY quantity DESCENDING.",
] });
card(s, 9.05, 1.3, 3.75, 4.35, "규칙", "GROUP BY 하지 않은\n일반 필드는 SELECT\n목록에 둘 수 없습니다.\n\nUP TO n ROWS +\nORDER BY로\n\"상위 N건\".", { bSize: 12.5 });
s.addNotes("집계하지 않은 필드를 GROUP BY에 빠뜨리는 것, UP TO와 ORDER BY 위치 오타가 자주 막힘.");

/* 30. 위험 패턴 — ORDER BY 집계함수 */
s = light();
header(s, "U12", "ORDER BY에 집계함수를 직접 쓸 수 없다", "⚠️ 위험 패턴");
badGood(s,
  "❌ 집계함수를 직접 정렬",
  "SELECT a~cust_id\n       COUNT( * )\n  ...\n  GROUP BY a~cust_id\n  ORDER BY COUNT( * )\n           DESCENDING.",
  "classic에서 집계함수 정렬은 막힘",
  "✅ 별칭(AS) 후 별칭으로 정렬",
  "SELECT a~cust_id\n       COUNT( * ) AS order_cnt\n  ...\n  GROUP BY a~cust_id\n  ORDER BY order_cnt\n           DESCENDING.",
  "SELECT 목록에서 AS 별칭 → 그 별칭으로");
banner(s, 0.55, 4.4, 12.25, "D12 패턴 — COUNT( * ) AS order_cnt 로 별칭을 붙이고 ORDER BY order_cnt. 동률 순서가 중요하면 보조 정렬 추가", {});
s.addNotes("퀴즈집 D12 확정 패턴. ORDER BY에 집계함수를 직접 쓰지 않고 SELECT 목록의 AS 별칭으로 정렬. 동률의 표시 순서는 DB에 따라 달라질 수 있어 보조 정렬 기준을 추가.");

/* 31. 흔한 에러 + FOR ALL ENTRIES */
s = light();
header(s, "U12", "자주 막힘 · FOR ALL ENTRIES 함정", "⚠️ 점검");
tbl(s, [
  ["증상", "확인 / 해결"],
  ["같은 필드명을 별칭 없이 작성", "a~ / b~ / c~ 별칭을 붙임"],
  ["CORRESPONDING인데 결과 필드명이 다름", "라인 타입 필드명을 SELECT와 일치"],
  ["집계하지 않은 필드를 GROUP BY에서 누락", "SELECT 목록의 비집계 필드는 모두 GROUP BY"],
  ["UP TO · ORDER BY 위치 오타", "INTO TABLE → UP TO → ORDER BY 순서"],
], { x: 0.55, y: 1.35, w: 7.7, colW: [4.0, 3.7], fontSize: 11, rowH: 0.5 });
card(s, 8.5, 1.35, 4.3, 3.3, "📦 FOR ALL ENTRIES", "\"내부 테이블과 조인\" 패턴.\n실무에서 JOIN만큼 자주 봅니다.\n\n원본 테이블이 비어 있으면\n전체 조회가 터지는\n유명한 함정 —\n실행 전 IS NOT INITIAL\n확인이 필수.\n(소개만, 실습 안 함)", { fill: "FBEBE9", tColor: RED, bSize: 11.5 });
s.addNotes("FOR ALL ENTRIES는 빈 원본 테이블의 위험만 소개하고 실습하지 않는다. 신문법 세계에서는 JOIN/CDS로 대체 추세.");

/* 32. 모던 ABAP JOIN */
s = light();
header(s, "U12", "모던 ABAP으로는 이렇게", "✨ 참고");
codeBlock(s, { x: 0.55, y: 1.35, w: 9.0, h: 3.1, title: "JOIN 구문은 같고 콤마 · @ · 인라인만", code: [
  "SELECT a~order_id, b~cust_name, c~prod_name, a~quantity, c~price",
  "  FROM zedu##_order AS a",
  "  INNER JOIN zedu_cust AS b ON a~cust_id = b~cust_id",
  "  INNER JOIN zedu_prod AS c ON a~prod_id = c~prod_id",
  "  WHERE a~status = 'N'",
  "  INTO TABLE @DATA(lt_list).",
], fontSize: 10.5 });
bullets(s, [
  { t: "JOIN 구문 자체는 동일 — 콤마 / @ / 인라인 선언만 얹으면 new Open SQL", b: true },
], { x: 0.6, y: 4.7, w: 12.1, h: 0.9, fontSize: 14 });
s.addNotes("classic JOIN과 결과 동일. 표식만 다르다.");

/* 33. 퀴즈 Q12 */
s = light();
header(s, "U12", "퀴즈 Q12 — 주문 통계", "✍️ 퀴즈");
codeBlock(s, { x: 0.55, y: 1.3, w: 8.1, h: 3.1, title: "ZEDU##_U12Q — TODO 2개", code: [
  "* TODO 1: 고객별 주문 건수를 GROUP BY로 조회해",
  "*         cust_id와 건수를 출력하세요.",
  "",
  "* TODO 2: 주문+제품 JOIN으로 수량 TOP 5를 조회해",
  "*         주문번호/제품명/수량을 출력 (ORDER BY + UP TO)",
] });
card(s, 8.85, 1.3, 3.95, 3.1, "다 풀었다면", "퀴즈집 U12-D\n(고객명 포함 건수 TOP —\n별칭 정렬 응용)\n어려웠다면 U12-E\n\n정답은 부록 A", { fill: "FDF3E3", tColor: "9A6A12", bSize: 12 });
banner(s, 0.55, 4.7, 12.25, "TOP N은 UP TO + ORDER BY — 정렬 기준이 집계값이면 별칭(AS)으로!", {});
s.addNotes("정답 비노출. D12는 방금 배운 별칭 정렬을 응용.");

/* ===========================================================================
 * U13 (34~40)
 * ======================================================================== */
unitTitle("U13", "14:20 ~ 15:10", "선택화면 PARAMETERS / SELECT-OPTIONS",
  ["PARAMETERS와 SELECT-OPTIONS로 선택화면을 만들 수 있다", "IN 연산자로 범위 조건을 SELECT에 반영할 수 있다"],
  "ZEDU##_U13",
  "출처: 11_교재_Day2 > U13. SELECT-OPTIONS를 화면 요소이자 내부 테이블로 동시에 설명. 복수선택 창에서 포함/제외 탭을 직접 연다. 선택 텍스트를 붙이기 전·후를 비교.");

/* 35. 개념 1 — PARAMETERS vs SELECT-OPTIONS */
s = light();
header(s, "U13", "조건을 사용자가 입력하게", "개념");
s.addText("지금까지 조건은 코드에 박혀 있었습니다(WHERE status = 'N'). 실행할 때 사용자가 입력하게 만드는 것이 선택화면.",
  { x: 0.55, y: 1.18, w: 12.2, h: 0.45, fontFace: F, fontSize: 13.5, color: INK, margin: 0 });
tbl(s, [
  ["문장", "화면 모습", "용도"],
  [{ text: "PARAMETERS p_x TYPE 타입.", opts: { fontFace: FC } }, "입력칸 1개", "단일 값"],
  [{ text: "SELECT-OPTIONS s_x FOR 참조필드.", opts: { fontFace: FC } }, "입력칸 2개(From~To) + 복수선택", "범위·복수 값"],
], { x: 0.55, y: 1.75, w: 12.25, colW: [5.2, 4.05, 3.0], fontSize: 12, rowH: 0.5 });
card(s, 0.55, 3.5, 12.25, 1.5, "SELECT-OPTIONS의 정체", "SIGN / OPTION / LOW / HIGH 4개 필드를 가진 작은 내부 테이블입니다. WHERE 필드 IN s_x 가 그걸 해석합니다. — 그래서 코드에서 s_x[] 로 테이블 전체에 접근할 수 있습니다.", { bSize: 13 });
s.addNotes("SELECT-OPTIONS를 화면 요소이자 내부 테이블로 동시에 설명. 예상 질문 — Q. SELECT-OPTIONS가 비면 왜 전체? A. 제한 조건이 없는 것으로 해석. PARAMETERS 초기값과 동작이 다르다.");

/* 36. 따라치기 */
s = light();
header(s, "U13", "따라치기 — 선택화면과 IN", "💻 시연");
codeBlock(s, { x: 0.55, y: 1.3, w: 8.3, h: 3.5, title: "선택화면 선언 + WHERE ... IN", code: [
  "PARAMETERS: p_stat TYPE zedu##_status.",
  "SELECT-OPTIONS: s_ordid FOR gs_order-order_id,",
  "                s_date  FOR gs_order-order_date.",
  "",
  "START-OF-SELECTION.",
  "  SELECT * FROM zedu##_order INTO TABLE gt_order",
  "    WHERE order_id   IN s_ordid",
  "      AND order_date IN s_date.",
] });
card(s, 9.05, 1.3, 3.75, 3.5, "PARAMETERS는 IN 불가", "SELECT-OPTIONS는\nWHERE ... IN.\n\nPARAMETERS는 IN을\n못 쓰므로, 입력된\n경우에만 필터:\nIF p_stat IS NOT\nINITIAL. → DELETE", { bSize: 12 });
s.addNotes("FOR 뒤에 타입명을 직접 쓰는 실수(참조 필드가 필요). SELECT-OPTIONS에 = 사용(IN을 써야). 빈 PARAMETERS를 WHERE에 바로 넣어 0건 조회.");

/* 37. 선택 텍스트 + 관찰 */
s = light();
header(s, "U13", "선택 텍스트 붙이기 · 실행 관찰", "💻 시연");
bullets(s, [
  { t: "라벨 = 텍스트 심볼. Goto → Text Elements → Selection Texts", b: true },
  { t: "P_STAT 상태 / S_DATE 주문일 / S_ORDID 주문번호 입력 → 활성화 → 실행", sub: true },
  { t: "조건을 다 비우고 실행 → 20건 전부 (빈 SELECT-OPTIONS = 조건 없음)" },
  { t: "주문번호 From 1 To 5 → 구간 조회 · 화살표 버튼 → 복수/제외 값" },
  { t: "상태 칸에서 F4 → 도메인 고정값(N/C/X) 목록이 공짜! (어제 U06의 보상)", b: true },
], { x: 0.55, y: 1.25, w: 6.9, h: 4.3, fontSize: 13 });
shot(s, { x: 7.65, y: 1.3, w: 5.15, h: 4.4, id: "D2-01", cap: "선택화면 실행 — SELECT-OPTIONS 복수선택 팝업\n(주문번호 화살표 → 포함/제외 탭)" });
s.addNotes("선택 텍스트를 붙이기 전·후를 비교. Selection Texts 저장 후 프로그램 활성화 누락이 자주 막힘. F4 도메인 고정값은 어제 U06 도메인 설계의 보상.");

/* 38. DEFAULT/OBLIGATORY + 흔한 에러 */
s = light();
header(s, "U13", "DEFAULT · OBLIGATORY · 자주 막힘", "⚠️ 점검");
codeBlock(s, { x: 0.55, y: 1.3, w: 7.4, h: 1.15, title: "옵션 — 기본값·필수 입력", code: [
  "PARAMETERS p_stat TYPE zedu##_status DEFAULT 'N' OBLIGATORY.",
], fontSize: 11 });
tbl(s, [
  ["증상", "확인 / 해결"],
  ["FOR 뒤에 타입명을 직접 씀", "SELECT-OPTIONS는 참조 필드가 필요"],
  ["SELECT-OPTIONS에 = 사용", "IN 을 사용"],
  ["빈 PARAMETERS를 WHERE에 바로 넣어 0건", "입력된 경우에만 필터"],
  ["Selection Texts 저장 후 활성화 누락", "저장 뒤 반드시 활성화"],
], { x: 0.55, y: 2.7, w: 12.25, colW: [5.4, 6.85], fontSize: 12, rowH: 0.52 });
s.addNotes("표 4가지는 강사가이드 U13 '자주 막힘'.");

/* 39. 퀴즈 Q13 */
s = light();
header(s, "U13", "퀴즈 Q13 — 고객 조건 추가", "✍️ 퀴즈");
s.addText([{ text: "ZEDU##_U13", options: { fontFace: FC, bold: true, color: NAVY } }, { text: "  에 이어서 작성", options: {} }],
  { x: 0.55, y: 1.2, w: 12.2, h: 0.45, fontFace: F, fontSize: 14, color: INK, margin: 0 });
bullets(s, [
  { t: "TODO 1: 고객ID SELECT-OPTIONS s_cust 를 추가하고 WHERE에 반영", b: true },
  { t: "TODO 2: Selection Text(고객 ID)도 추가", b: true },
  { t: "TODO 3: C00001 과 C00003 두 고객만 조회되도록 복수 값을 입력해 실행", b: true },
  { t: "화살표 버튼으로 Single Value 두 줄 입력 — 코드가 아니라 화면 조작", sub: true },
], { x: 0.55, y: 1.8, w: 8.0, h: 3.0, fontSize: 14.5 });
card(s, 8.35, 1.8, 4.45, 3.0, "다 풀었다면", "퀴즈집 U13-D\n(수량 하한 + 상태 조건)\n어려웠다면 U13-E\n\n정답은 부록 A", { fill: "FDF3E3", tColor: "9A6A12", bSize: 12.5 });
banner(s, 0.55, 5.15, 12.25, "TODO 3은 코드가 아니라 화살표 버튼(복수 선택) 조작 — IN 하나로 단일·범위·복수·제외를 다 처리", {});
s.addNotes("정답 비노출. TODO 3은 화면 조작(복수 선택). 빠른 학생은 D13.");

/* 40. 체크포인트 브릿지 */
s = light();
header(s, "U13", "여기까지 — 조회의 재료가 모였다", "브릿지");
tbl(s, [
  ["배운 것", "다음에 쓰는 곳"],
  ["내부 테이블 (U09·U10)", "SELECT의 그릇 · 가공"],
  ["Open SQL · JOIN · 집계 (U11·U12)", "DB에서 데이터 조회"],
  ["선택화면 · IN (U13)", "사용자 조건 입력"],
  [{ text: "→ 리포트 이벤트 (U14) · ALV (U15)", b: true }, { text: "언제 실행할지 · 어떻게 보여줄지", b: true }],
], { x: 0.55, y: 1.4, w: 12.25, colW: [6.0, 6.25], fontSize: 13, rowH: 0.55 });
banner(s, 0.55, 4.4, 12.25, "지금까지의 재료가 오후 종합실습 ZEDU##_LIST 한 프로그램으로 조립됩니다", { color: "DDE7F8", tcolor: NAVY });
s.addNotes("U09~U13이 종합실습의 재료임을 각인. U14(언제)·U15(어떻게)가 남았다.");

/* ===========================================================================
 * U14 (41~46)
 * ======================================================================== */
unitTitle("U14", "15:25 ~ 16:05", "리포트 이벤트 흐름",
  ["리포트 프로그램의 이벤트 실행 순서를 이해한다", "INITIALIZATION에서 기본값을, AT SELECTION-SCREEN에서 검증을 구현한다"],
  "ZEDU##_U14",
  "출처: 11_교재_Day2 > U14. 화면에 이벤트 순서를 계속 표시한다. INITIALIZATION=기본값, AT SELECTION-SCREEN=입력 검증, START-OF-SELECTION=본 처리. 이벤트 블록을 FORM처럼 호출하려는 실수가 잦다.");

/* 42. 개념 흐름도 (핵심) */
s = light();
header(s, "U14", "이벤트 실행 순서", "핵심");
s.addText("리포트 프로그램은 위에서 아래로 그냥 흐르지 않습니다. 정해진 시점에 정해진 이벤트 블록이 실행됩니다.",
  { x: 0.55, y: 1.15, w: 12.2, h: 0.45, fontFace: F, fontSize: 13.5, color: INK, margin: 0 });
const ev = [
  ["INITIALIZATION", "선택화면 전 1회\n기본값 세팅", NAVY],
  ["[선택화면 표시]", "사용자 입력", "6E7797"],
  ["AT SELECTION-SCREEN", "F8 누를 때마다\n입력값 검증", NAVY],
  ["START-OF-SELECTION", "본 처리\n조회·가공", "2E7D46"],
  ["END-OF-SELECTION", "마무리\n결과 목록", NAVY],
];
ev.forEach((e, i) => {
  const x = 0.55 + i * 2.53;
  s.addShape("roundRect", { x, y: 1.85, w: 2.3, h: 1.5, fill: { color: e[2] }, rectRadius: 0.09 });
  s.addText(e[0], { x: x + 0.12, y: 1.98, w: 2.06, h: 0.7, align: "center", valign: "middle", fontFace: F, fontSize: 11, bold: true, color: "FFFFFF", margin: 0 });
  s.addText(e[1], { x: x + 0.12, y: 2.62, w: 2.06, h: 0.65, align: "center", fontFace: F, fontSize: 9.5, color: "E6ECFA", margin: 0 });
  if (i < 4) s.addText("→", { x: x + 2.19, y: 2.25, w: 0.42, h: 0.6, align: "center", fontFace: F, fontSize: 20, bold: true, color: MUTED, margin: 0 });
});
banner(s, 0.55, 3.75, 12.25, "AT SELECTION-SCREEN에서 검증 실패(MESSAGE E) → 선택화면으로 되돌아갑니다", {});
bullets(s, [
  { t: "이벤트 블록은 코드에 적힌 순서와 무관하게 정해진 시점에 불립니다", b: true },
  { t: "START-OF-SELECTION. 이라고 쓰는 순간부터가 그 이벤트의 코드", color: MUTED },
], { x: 0.55, y: 4.55, w: 12.2, h: 1.2, fontSize: 13.5 });
s.addNotes("화면에 이 순서를 계속 표시. 예상 질문 — Q. 이벤트 순서는 소스에 쓴 순서인가? A. 리포트 런타임 이벤트 순서가 정한다. 읽기 쉽도록 통상 실행 순서대로 배치.");

/* 43. 따라치기 */
s = light();
header(s, "U14", "따라치기 — INITIALIZATION 기본값", "💻 시연");
codeBlock(s, { x: 0.55, y: 1.3, w: 8.3, h: 4.35, title: "선택화면 전 1회: 최근 90일 세팅", code: [
  "INITIALIZATION.",
  "  CLEAR s_date.",
  "  s_date-sign   = 'I'.            \" Include",
  "  s_date-option = 'BT'.           \" BeTween",
  "  s_date-low    = sy-datum - 90.",
  "  s_date-high   = sy-datum.",
  "  APPEND s_date.                  \" SELECT-OPTIONS도 내부 테이블!",
  "",
  "START-OF-SELECTION.",
  "  SELECT COUNT( * ) FROM zedu##_order INTO gv_cnt",
  "    WHERE order_date IN s_date.",
] });
card(s, 9.05, 1.3, 3.75, 4.35, "왜 APPEND?", "s_date는 SIGN/OPTION/\nLOW/HIGH를 가진\n내부 테이블.\n\n행을 채운 뒤 반드시\nAPPEND해야 화면\n기본값이 됩니다.\n\nAPPEND 누락이\n자주 막힘.", { bSize: 12 });
s.addNotes("SELECT-OPTIONS 기본 행을 채우고 APPEND 누락이 자주 막힘. INITIALIZATION은 선택화면 표시 전 1회.");

/* 44. E 메시지 위치별 행동 */
s = light();
header(s, "U14", "AT SELECTION-SCREEN — E 메시지의 위치별 행동", "핵심 규칙");
codeBlock(s, { x: 0.55, y: 1.3, w: 8.3, h: 3.15, title: "실행 누를 때마다: 입력값 검증", code: [
  "AT SELECTION-SCREEN.",
  "  IF p_cust IS NOT INITIAL.",
  "    SELECT SINGLE cust_id FROM zedu_cust INTO gv_check",
  "      WHERE cust_id = p_cust.",
  "    IF sy-subrc <> 0.",
  "      MESSAGE '존재하지 않는 고객입니다' TYPE 'E'.",
  "    ENDIF.",
  "  ENDIF.",
] });
card(s, 9.05, 1.3, 3.75, 3.15, "E의 위치별 행동", "선택화면의 E 메시지\n= 빨간 메시지 +\n선택화면에 그대로\n머무름.\n\nSTART-OF-SELECTION의\nE는 동작이 다릅니다.", { fill: "FBEBE9", tColor: RED, bSize: 12 });
banner(s, 0.55, 4.7, 12.25, "선택화면 E = 화면에 머무름 — Day 3 오후 버튼 로직(수정·삭제 방어)의 밑바탕입니다", {});
s.addNotes("E 메시지를 START-OF-SELECTION에서 쓰고 선택화면 복귀를 기대하는 실수가 잦다. 위치별 행동 차이는 Day 3 U18/버튼 로직의 기초.");

/* 45. 실행 관찰 + 흔한 에러 */
s = light();
header(s, "U14", "실행 관찰 · 자주 막힘", "⚠️ 점검");
bullets(s, [
  { t: "선택화면에 날짜가 이미 채워져 있음 (INITIALIZATION) + 상태바에 S 메시지", b: true },
  { t: "고객에 C99999 입력 → 실행 → 빨간 메시지 + 선택화면에 그대로" },
  { t: "C00001로 바꾸면 통과 → 결과 목록" },
], { x: 0.55, y: 1.3, w: 12.2, h: 1.7, fontSize: 13.5 });
tbl(s, [
  ["자주 막힘", "확인 / 해결"],
  ["이벤트 블록을 FORM처럼 호출하려 함", "이벤트는 시점에 자동 실행 (호출 아님)"],
  ["START-OF-SELECTION의 E로 선택화면 복귀 기대", "선택화면 복귀는 AT SELECTION-SCREEN의 E"],
  ["SELECT-OPTIONS 기본 행을 채우고 APPEND 누락", "행 세팅 후 APPEND 필수"],
], { x: 0.55, y: 3.2, w: 12.25, colW: [6.2, 6.05], fontSize: 12, rowH: 0.55 });
s.addNotes("표 3가지는 강사가이드 U14 '자주 막힘'.");

/* 46. 퀴즈 Q14 */
s = light();
header(s, "U14", "퀴즈 Q14 — 기간 필수 검증", "✍️ 퀴즈");
s.addText([{ text: "ZEDU##_U14", options: { fontFace: FC, bold: true, color: NAVY } }, { text: "  에 추가", options: {} }],
  { x: 0.55, y: 1.2, w: 12.2, h: 0.45, fontFace: F, fontSize: 14, color: INK, margin: 0 });
s.addText("조회 기간(s_date)을 모두 지우고 실행하면 \"조회 기간을 입력하세요\" E 메시지가 나오게 하세요.",
  { x: 0.55, y: 1.75, w: 12.2, h: 0.6, fontFace: F, fontSize: 15, color: INK, margin: 0 });
codeBlock(s, { x: 0.55, y: 2.5, w: 7.6, h: 1.5, title: "힌트", code: [
  "* SELECT-OPTIONS의 테이블 전체는 s_date[] 로 접근",
  "* IF s_date[] IS INITIAL.  →  MESSAGE ... TYPE 'E'.",
] });
card(s, 8.35, 2.5, 4.45, 1.5, "어느 이벤트에?", "선택화면에 머물러야 하니\nAT SELECTION-SCREEN", { bSize: 13 });
card(s, 0.55, 4.3, 12.25, 1.1, "다 풀었다면", "퀴즈집 U14-D (최근 30일 기본 범위) · 어려웠다면 U14-E · 정답은 부록 A — 지금은 보지 않기!", { fill: "FDF3E3", tColor: "9A6A12", bSize: 13 });
s.addNotes("정답 비노출. 검증이 선택화면에 머물러야 하므로 AT SELECTION-SCREEN. 빠른 학생은 D14.");

/* ===========================================================================
 * U15 (47~55)
 * ======================================================================== */
unitTitle("U15", "16:15 ~ 17:15", "ALV 출력",
  ["(준비) 서브루틴 FORM/PERFORM으로 코드를 정리한다", "REUSE_ALV_GRID_DISPLAY로 내부 테이블을 ALV 그리드에 뿌린다"],
  "ZEDU##_U15",
  "출처: 11_교재_Day2 > U15. 시간: 5분 FORM/PERFORM 선행 → 10분 ALV 목적·표준 기능 → 25분 JOIN·금액·ALV 호출 → 10분 정렬/필터/합계/엑셀 체험 → 10분 Q15. i_structure_name이 DDIC 라벨을 필드 카탈로그로 바꿔준다. 본 과정은 의도적으로 REUSE_ALV_GRID_DISPLAY 사용.");

/* 48. 개념 1 — FORM/PERFORM */
s = light();
header(s, "U15", "준비 — FORM / PERFORM 서브루틴 (5분)", "개념");
codeBlock(s, { x: 0.55, y: 1.3, w: 7.0, h: 2.35, title: "로직에 이름을 붙여 상자에 담기", code: [
  "START-OF-SELECTION.",
  "  PERFORM get_data.     \" 호출",
  "",
  "FORM get_data.          \" 정의",
  "  ...",
  "ENDFORM.",
] });
card(s, 7.75, 1.3, 5.05, 2.35, "지금 배우는 이유", "잠시 후 ALV가\n\"이 이름의 FORM을\n호출해 줘\" 방식(콜백)으로\n동작하기 때문입니다.\n\n(USING/CHANGING 파라미터\n전달은 내일 필요할 때)", { bSize: 12.5 });
bullets(s, [
  { t: "코드가 길어지기 시작합니다 — FORM으로 로직에 이름을 붙여 정리", b: true },
  { t: "get_data(조회) / show_alv(출력)로 나누면 읽기 쉽고 재사용됩니다" },
], { x: 0.55, y: 3.95, w: 12.2, h: 1.3, fontSize: 14 });
s.addNotes("ALV가 콜백(FORM 호출) 방식이라 FORM/PERFORM을 먼저 5분. 파라미터 전달은 내일.");

/* 49. 개념 2 — ALV */
s = light();
header(s, "U15", "ALV — 표준 목록 출력 도구", "개념");
s.addText("WRITE 목록은 초라합니다. ALV(ABAP List Viewer) = SAP 표준 목록 출력 도구.",
  { x: 0.55, y: 1.2, w: 12.2, h: 0.45, fontFace: F, fontSize: 14, color: INK, margin: 0 });
card(s, 0.55, 1.8, 6.0, 2.2, "공짜로 따라오는 것", "정렬 ▲▼ · 필터 · 합계(Σ)\n· 엑셀 다운로드\n\n고전 리포트의 사실상 표준 출력.", { fill: "FDF3E3", tColor: "9A6A12", bSize: 13.5 });
card(s, 6.8, 1.8, 6.0, 2.2, "호출 방식", "표준 함수\nREUSE_ALV_GRID_DISPLAY 를\n호출해 씁니다.\n\n함수 호출 문법은 내일 정식으로 —\n오늘은 \"정해진 서식\"으로 따라 치기.", { bSize: 13 });
banner(s, 0.55, 4.35, 12.25, "DDIC에 정의를 쌓으면 화면이 공짜로 따라오는 것 — 이게 SAP 방식입니다", {});
s.addNotes("예상 질문 — Q. REUSE ALV는 오래된 기술 아닌가? A. 클래식 코드에서 여전히 많이 만나며 콜백 구조 학습에 좋다. 신규는 프로젝트 기준에 따라 SALV/OO ALV/Fiori 검토.");

/* 50. 따라치기 ① get_data */
s = light();
header(s, "U15", "따라치기 ① — get_data (JOIN + 금액)", "💻 시연");
codeBlock(s, { x: 0.55, y: 1.3, w: 8.3, h: 4.35, title: "조회 후 계산 필드(amount) 채우기", code: [
  "FORM get_data.",
  "  SELECT a~order_id a~cust_id b~cust_name",
  "         a~prod_id  c~prod_name c~price ...",
  "    ... INTO CORRESPONDING FIELDS OF TABLE gt_list.",
  "",
  "  LOOP AT gt_list INTO gs_list.",
  "    gs_list-amount = gs_list-quantity * gs_list-price.",
  "    MODIFY gt_list FROM gs_list TRANSPORTING amount.",
  "  ENDLOOP.",
  "ENDFORM.",
] });
card(s, 9.05, 1.3, 3.75, 4.35, "계산 필드", "금액 = 수량 × 단가.\nDB에 없는 계산 필드를\n내부 테이블에서 채웁니다.\n\nMODIFY ... TRANSPORTING\namount = amount 필드만\n갱신.\n\n계산 후 MODIFY 누락이\n자주 막힘.", { bSize: 12 });
s.addNotes("금액은 DB에 없는 계산 필드. LOOP + MODIFY TRANSPORTING로 채운다. MODIFY 누락 주의. gt_list는 어제 만든 ZEDU##_S_LIST 스트럭처.");

/* 51. 따라치기 ② show_alv */
s = light();
header(s, "U15", "따라치기 ② — REUSE_ALV_GRID_DISPLAY", "💻 시연");
codeBlock(s, { x: 0.55, y: 1.25, w: 8.5, h: 4.5, title: "표준 함수 호출 (정해진 서식)", code: [
  "CALL FUNCTION 'REUSE_ALV_GRID_DISPLAY'",
  "  EXPORTING",
  "    i_callback_program = sy-repid",
  "    i_structure_name   = 'ZEDU##_S_LIST'   \" ★ 컬럼 자동 구성",
  "    is_layout          = ls_layout",
  "    i_grid_title       = '주문 목록'",
  "  TABLES",
  "    t_outtab           = gt_list",
  "  EXCEPTIONS",
  "    program_error      = 1",
  "    OTHERS             = 2.",
], fontSize: 10.5 });
card(s, 9.25, 1.25, 3.55, 4.5, "TYPE-POOLS: slis.", "ALV 타입 꾸러미\n(관례적 선언).\n\nls_layout-zebra = 'X'.\ncolwidth_optimize = 'X'.\n\n호출 후 sy-subrc를\n확인합니다.", { bSize: 12 });
s.addNotes("TYPE-POOLS: slis. 누락, DDIC 스트럭처 이름의 학생 번호 오타, ALV 호출 오류 sy-subrc 미확인이 자주 막힘.");

/* 52. 파라미터 표 */
s = light();
header(s, "U15", "REUSE_ALV_GRID_DISPLAY 파라미터", "개념");
tbl(s, [
  ["파라미터", "값", "역할"],
  [{ text: "i_callback_program", opts: { fontFace: FC } }, { text: "sy-repid", opts: { fontFace: FC } }, "콜백을 찾을 프로그램(나)"],
  [{ text: "i_structure_name", opts: { fontFace: FC } }, { text: "'ZEDU##_S_LIST'", opts: { fontFace: FC } }, "★ DDIC 스트럭처 → 컬럼 자동 구성"],
  [{ text: "is_layout", opts: { fontFace: FC } }, { text: "ls_layout", opts: { fontFace: FC } }, "zebra · 컬럼폭 최적화"],
  [{ text: "i_grid_title", opts: { fontFace: FC } }, { text: "'주문 목록'", opts: { fontFace: FC } }, "그리드 제목"],
  [{ text: "t_outtab", opts: { fontFace: FC } }, { text: "gt_list", opts: { fontFace: FC } }, "출력할 내부 테이블"],
], { x: 0.55, y: 1.35, w: 12.25, colW: [3.4, 2.8, 6.05], fontSize: 12, rowH: 0.5 });
banner(s, 0.55, 4.55, 12.25, "i_structure_name 이 어제 DE에 넣은 한글 라벨을 필드 카탈로그(컬럼 구성)로 바꿔 줍니다", {});
s.addNotes("i_structure_name이 DDIC 라벨을 필드 카탈로그로 바꿔준다. 필드 카탈로그를 직접 만들지 않는 이유: 첫 과정 분량 보호 + DDIC 재사용 효과. do_sum 같은 확장은 퀴즈집.");

/* 53. 실행 관찰 + shot */
s = light();
header(s, "U15", "실행 후 관찰", "💻 시연");
bullets(s, [
  { t: "컬럼 제목이 저절로 한글로! — 어제 데이터 엘리먼트에 넣은 라벨입니다", b: true },
  { t: "DDIC에 정의를 쌓으면 화면이 공짜로 따라옵니다", sub: true },
  { t: "툴바: 정렬 ▲▼ · 필터 · 합계(Σ)는 AMOUNT 컬럼에 · 엑셀 내보내기" },
  { t: "i_structure_name을 지우고 실행하면? → 오류 (컬럼 구성 정보가 없음)", b: true },
  { t: "수동 구성법 = 필드 카탈로그 (추가 퀴즈집에서)", sub: true },
], { x: 0.55, y: 1.25, w: 6.9, h: 4.4, fontSize: 13 });
shot(s, { x: 7.65, y: 1.3, w: 5.15, h: 4.4, id: "D2-02", cap: "ALV 기본 화면 — 한글 컬럼 제목\n+ AMOUNT 컬럼 합계(Σ) + 툴바" });
s.addNotes("한글 컬럼은 어제 DE 라벨의 결과. 합계는 AMOUNT에. i_structure_name 제거 시 오류를 직접 보여준다.");

/* 54. 모던 SALV */
s = light();
header(s, "U15", "모던 ABAP — 객체지향 ALV (SALV)", "✨ 참고");
codeBlock(s, { x: 0.55, y: 1.35, w: 8.6, h: 2.35, title: "핵심 호출부는 세 줄 · 필드 카탈로그 불필요", code: [
  "DATA lo_alv TYPE REF TO cl_salv_table.",
  "cl_salv_table=>factory( IMPORTING r_salv_table = lo_alv",
  "                        CHANGING  t_table      = gt_list ).",
  "lo_alv->display( ).",
] });
bullets(s, [
  { t: "클래스 기반 SALV — 필드 카탈로그가 필요 없습니다", b: true },
  { t: "실무 완결 예제는 factory 예외를 TRY ... CATCH cx_salv_msg로 감싸 안전하게", color: MUTED },
  { t: "오늘 실습 본문은 의도적으로 REUSE_ALV_GRID_DISPLAY (콜백 구조 학습용)", color: MUTED },
], { x: 0.6, y: 3.95, w: 12.1, h: 1.6, fontSize: 13.5 });
s.addNotes("SALV는 보조 박스이며 TRY/CATCH를 포함해야 안전. OO ABAP을 배우면 첫 실전 상대.");

/* 55. 퀴즈 Q15 */
s = light();
header(s, "U15", "퀴즈 Q15 — ALV 꾸미기", "✍️ 퀴즈");
s.addText([{ text: "ZEDU##_U15", options: { fontFace: FC, bold: true, color: NAVY } }, { text: " 를 복사(", options: {} }, { text: "ZEDU##_U15Q", options: { fontFace: FC, bold: true, color: NAVY } }, { text: ")해서:", options: {} }],
  { x: 0.55, y: 1.2, w: 12.2, h: 0.45, fontFace: F, fontSize: 14, color: INK, margin: 0 });
bullets(s, [
  { t: "TODO 1: 제목을 '## 주문 현황판'으로 변경", b: true },
  { t: "TODO 2: 금액 큰 순서로 정렬된 상태로 표시", b: true },
  { t: "힌트: ALV 호출 전에 내부 테이블을 SORT", sub: true },
  { t: "TODO 3: zebra를 꺼보고 차이 확인 후 다시 켜기", b: true },
], { x: 0.55, y: 1.8, w: 8.0, h: 3.0, fontSize: 14.5 });
card(s, 8.35, 1.8, 4.45, 3.0, "다 풀었다면", "퀴즈집 U15-D\n(합계·소계 do_sum 등)\n어려웠다면 U15-E\n\n정답은 부록 A", { fill: "FDF3E3", tColor: "9A6A12", bSize: 12.5 });
banner(s, 0.55, 5.15, 12.25, "정렬은 ALV 호출 전에 SORT — ALV는 이미 정렬된 내부 테이블을 그대로 그립니다", {});
s.addNotes("정답 비노출. 정렬은 호출 전 SORT. 빠른 학생은 D15(do_sum).");

/* ===========================================================================
 * 종합실습 ② (56~59)
 * ======================================================================== */
s = dark();
s.addText("종합실습 ②", { x: 0.9, y: 1.4, w: 8, h: 0.7, fontFace: F, fontSize: 32, bold: true, color: ACCENT, margin: 0 });
s.addText("17:15 ~ 18:00", { x: 0.9, y: 2.1, w: 5, h: 0.4, fontFace: F, fontSize: 15, color: ICE, margin: 0 });
s.addText("조회 리포트 완성 — ZEDU##_LIST", { x: 0.9, y: 2.75, w: 11.5, h: 0.9, fontFace: F, fontSize: 34, bold: true, color: "FFFFFF", margin: 0 });
s.addText([{ text: "오늘의 결승선 — 선택화면 + 이벤트 + JOIN + ALV를 한 프로그램에 조립!", options: { fontSize: 17, bold: true, color: "FFD9A0", breakLine: true, paraSpaceAfter: 10 } },
           { text: "이 프로그램이 내일 toy project의 몸통이 됩니다 — 반드시 완성하고 퇴근!", options: { fontSize: 14, color: ICE } }],
  { x: 0.9, y: 3.95, w: 11.4, h: 1.4, fontFace: F, margin: 0 });
s.addNotes("오늘의 결승선. 미완료 상태로 퇴실시키지 않는다. 필요시 완성 FORM get_data 조각을 제공하고 학생이 직접 붙여 활성화.");

/* 57. 요구사항·TODO */
s = light();
header(s, "종합실습②", "ZEDU##_LIST — TODO 세 곳", "✍️ 실습");
s.addText("스켈레톤을 입력하고 FORM get_data의 TODO 3개를 완성하세요. (선택화면·INITIALIZATION·show_alv는 스켈레톤에 완성 제공)",
  { x: 0.55, y: 1.18, w: 12.2, h: 0.45, fontFace: F, fontSize: 13, color: INK, margin: 0 });
codeBlock(s, { x: 0.55, y: 1.75, w: 12.25, h: 3.6, title: "FORM get_data — TODO 3개", code: [
  "* TODO 1: 3개 테이블(주문 a, 고객 b, 제품 c)을 INNER JOIN 해서",
  "*         gt_list에 INTO CORRESPONDING FIELDS OF TABLE로 조회",
  "*         WHERE: order_id / cust_id / order_date가 선택화면 조건(IN)을 따르게",
  "",
  "* TODO 2: p_stat이 입력된 경우 해당 상태만 남기세요. (U13에서 했던 방법)",
  "",
  "* TODO 3: gt_list를 LOOP 돌며 amount = quantity * price 를 채우세요.",
  "*         (LOOP + MODIFY ... TRANSPORTING, U15에서 했던 것)",
] });
banner(s, 0.55, 5.55, 12.25, "TODO는 get_data만 — TODO 1=U12 JOIN, TODO 2=U13 필터, TODO 3=U15 금액. 오늘 배운 것의 조립", { color: "DDE7F8", tcolor: NAVY });
s.addNotes("TODO는 get_data 세 곳뿐. 각 TODO가 오늘 배운 유닛과 1:1. 완성 코드는 부록 A(비노출).");

/* 58. 완성 판정 + 체크포인트 타이머 */
s = light();
header(s, "종합실습②", "완성 판정 · 체크포인트", "⚠️ 점검");
bullets(s, [
  { t: "조건 없이 실행 → 20건, 금액 계산되어 있음, 컬럼 제목 한글", b: true },
  { t: "확정 20건이 모두 D-3~D-85라 기본 최근 90일 조건에 포함됨", sub: true },
  { t: "고객 C00001만 → 해당 고객 주문만 · 상태 N → 신규만" },
  { t: "Selection Texts까지 붙이면 금상첨화 (주문번호/고객ID/주문일/상태)" },
], { x: 0.55, y: 1.3, w: 7.0, h: 3.0, fontSize: 13 });
tbl(s, [
  ["시점", "목표"],
  ["시작 후 15분", "JOIN SELECT 활성, 기본 90일에서 20건"],
  ["시작 후 25분", "상태 필터 동작"],
  ["시작 후 35분", "금액 계산 · 정렬 완료"],
  ["종료 5분 전", "ALV 표시 및 ZEDU##_LIST 활성"],
], { x: 7.75, y: 1.3, w: 5.05, colW: [1.7, 3.35], fontSize: 11, rowH: 0.5 });
banner(s, 0.55, 4.55, 12.25, "⏱ 체크포인트: 15분 JOIN·20건 → 25분 상태필터 → 35분 금액·정렬 → 종료 5분 전 ALV+활성", {});
s.addNotes("체크포인트는 강사가이드 종합실습② 표. 종합실습②는 '절대 줄이지 않을 구간'. 시점마다 순회 확인.");

/* 59. Day 3의 뼈대 예고 + 복구 */
s = light();
header(s, "종합실습②", "이 프로그램이 Day 3의 뼈대", "브릿지");
card(s, 0.55, 1.3, 12.25, 1.35, "복사 체인", "ZEDU##_LIST 는 Day 3에 LIST → U19 → MAIN 으로 복사됩니다. 조회 프로그램에 버튼(등록/수정/삭제)을 붙여 완성본이 됩니다. 미완성으로 퇴근하지 마세요!", { fill: "FDF3E3", tColor: "9A6A12", bSize: 13 });
bullets(s, [
  { t: "복구 우선순위: ① 실행되는가 ② gt_list에 20건 ③ 금액 채워짐 ④ ALV 보임 ⑤ 선택 텍스트는 마지막", b: true },
], { x: 0.55, y: 2.9, w: 12.2, h: 0.9, fontSize: 13 });
card(s, 0.55, 3.9, 12.25, 1.5, "빨리 끝났다면 (부록 A 뒤 심화 도전)", "① AT SELECTION-SCREEN에서 존재하지 않는 고객 입력 시 E 메시지 (U14 응용)\n② get_data의 SELECT를 new Open SQL로 리팩터링한 get_data_new를 만들어 비교\n③ 조회 결과가 0건이면 ALV 대신 \"조회 결과가 없습니다\" 메시지 (IF gt_list IS INITIAL)", { bSize: 12 });
s.addNotes("복구 우선순위는 강사가이드. 미완료 학생에겐 완성 FORM get_data 조각 제공 후 직접 붙여 활성화. 이 프로그램은 Day 3에 LIST→U19→MAIN으로 복사.");

/* ===========================================================================
 * Day 2 체크리스트 (60~61)
 * ======================================================================== */
s = light();
header(s, "Day 2", "체크리스트 — 완성했나요", "마무리");
tbl(s, [
  ["구분", "오늘 만든 것 / 익힌 것"],
  ["프로그램", "ZEDU##_U09 ~ U15 (+퀴즈)"],
  [{ text: "종합실습", b: true }, { text: "ZEDU##_LIST — 선택화면+JOIN+금액+ALV 완성", b: true }],
  ["개념", "내부 테이블 vs DB 테이블 / sy-subrc 확인 습관"],
  ["개념", "이벤트 순서(INITIALIZATION→AT SELECTION-SCREEN→START-OF-SELECTION) / IN 연산자"],
], { x: 0.55, y: 1.35, w: 12.25, colW: [2.2, 10.05], fontSize: 12.5, rowH: 0.55 });
banner(s, 0.55, 4.55, 12.25, "ZEDU##_LIST가 미완성인 학생은 내일 09:00 전 기준본으로 복구 — Day 3 복사 체인의 출발점", {});
s.addNotes("체크리스트 미달(특히 ZEDU##_LIST 미완성)은 Day 3 아침 09:00 전 개별 복구. 종합실습②는 Day 3 프로그램 복사 체인의 출발점.");

/* 61. 내일 예고 */
s = light();
header(s, "Day 2", "내일 예고 — 드디어 완성", "마무리");
const d3 = [
  ["함수 (FM)", "검증 로직을 함수로 (U16)"],
  ["DB에 쓰기", "INSERT/UPDATE/DELETE (U17)"],
  ["버튼 달기", "PF-STATUS + USER_COMMAND (U19)"],
  ["완성", "등록/수정/삭제 → ZEDU##_MAIN"],
];
d3.forEach((c, i) => {
  const x = 0.55 + i * 3.12;
  s.addShape("roundRect", { x, y: 1.6, w: 2.85, h: 1.9, fill: { color: i === 3 ? NAVY : TINT }, rectRadius: 0.1 });
  s.addText((i + 1) + "", { x: x + 0.2, y: 1.75, w: 2.5, h: 0.5, fontFace: F, fontSize: 20, bold: true, color: i === 3 ? ACCENT : NAVY, margin: 0 });
  s.addText(c[0], { x: x + 0.2, y: 2.25, w: 2.5, h: 0.4, fontFace: F, fontSize: 14, bold: true, color: i === 3 ? "FFFFFF" : INK, margin: 0 });
  s.addText(c[1], { x: x + 0.2, y: 2.68, w: 2.5, h: 0.7, fontFace: F, fontSize: 10.5, color: i === 3 ? ICE : MUTED, margin: 0 });
  if (i < 3) s.addText("→", { x: x + 2.83, y: 2.15, w: 0.3, h: 0.6, align: "center", fontFace: F, fontSize: 20, bold: true, color: MUTED, margin: 0 });
});
banner(s, 0.55, 3.9, 12.25, "내일 오후, 오늘 만든 ZEDU##_LIST가 버튼 달린 ZEDU##_MAIN으로 완성됩니다", { color: "DDE7F8", tcolor: NAVY });
s.addText("수고하셨습니다! 🎉", { x: 0.55, y: 4.8, w: 6, h: 0.6, fontFace: F, fontSize: 20, bold: true, color: NAVY, margin: 0 });
s.addText("함수(FM) → DB에 쓰기(CRUD) → 버튼 달기 → 완성", { x: 0.55, y: 5.5, w: 12, h: 0.4, fontFace: F, fontSize: 13, color: MUTED, margin: 0 });
s.addNotes("내일 예고: FM → CRUD → 버튼 → 완성. 오늘의 ZEDU##_LIST가 ZEDU##_MAIN의 몸통.");

/* --------------------------------------------------------------------------- */
pres.writeFile({ fileName: OUT }).then(() => console.log("OK: " + OUT));
