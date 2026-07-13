/* SLIDES_Day3.pptx — SAP ABAP 기초교육 Day 3 (62장)
 * 원본: 12_교재_Day3.md / 30_강사가이드.md / 20_퀴즈집.md / 96_슬라이드_기획안.md
 * 헬퍼·팔레트·마스터는 day1/day2_slides.js와 동일(일관성 유지). 유닛 데이터만 교체. */
const pptxgen = require("pptxgenjs");

const OUT = "C:\\Workspaces\\abap_beginner_2026\\50_슬라이드\\SLIDES_Day3.pptx";

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
pres.title = "SAP ABAP 기초교육 — Day 3";

pres.defineSlideMaster({
  title: "LIGHT",
  background: { color: "FFFFFF" },
  objects: [
    { text: { text: "SAP ABAP 기초교육 · Day 3 — FM · CRUD · 이벤트 · Toy Project", options: { x: 0.55, y: 7.14, w: 7.5, h: 0.26, fontFace: F, fontSize: 8.5, color: "9AA3B5", margin: 0 } } },
  ],
  slideNumber: { x: 12.65, y: 7.12, w: 0.5, h: 0.3, fontFace: F, fontSize: 9, color: "9AA3B5" },
});
pres.defineSlideMaster({
  title: "DARK",
  background: { color: DEEP },
  slideNumber: { x: 12.65, y: 7.12, w: 0.5, h: 0.3, fontFace: F, fontSize: 9, color: "7E89B8" },
});

// ---- helpers ---------------------------------------------------------------
function sourceFor(chip) {
  const tag = String(chip || "");
  const section = tag.match(/^(U\d{2}|TP-\d)/);
  if (section) return `12_교재_Day3.md > ${section[1]}; 20_퀴즈집.md > ${section[1]}; 30_강사가이드.md > ${section[1]}`;
  if (tag === "복습") return "12_교재_Day3.md > 복습 퀴즈 R3; 30_강사가이드.md > 복습 퀴즈 R3";
  if (tag === "랩업") return "12_교재_Day3.md > 수료 랩업; 30_강사가이드.md > 수료 랩업";
  if (tag === "Toy Project") return "12_교재_Day3.md > Toy Project; 30_강사가이드.md > Toy Project";
  return "12_교재_Day3.md; 01_커리큘럼.md; 30_강사가이드.md; 96_슬라이드_기획안.md";
}

function slideWithSourcedNotes(masterName) {
  const s = pres.addSlide({ masterName });
  const addNotes = s.addNotes.bind(s);
  s.addNotes = (text) => {
    const body = String(text || "");
    const prefix = /출처\s*:/.test(body) ? "" : `출처: ${sourceFor(s._sourceChip)}.\n`;
    return addNotes(prefix + body);
  };
  return s;
}

function light() { return slideWithSourcedNotes("LIGHT"); }
function dark() { return slideWithSourcedNotes("DARK"); }

// content-slide header: unit chip + title (+kind tag right)
function header(s, chip, title, kind) {
  s._sourceChip = chip;
  s.addShape("roundRect", { x: 0.55, y: 0.42, w: 1.05, h: 0.46, fill: { color: NAVY }, rectRadius: 0.09 });
  s.addText(chip, { x: 0.55, y: 0.42, w: 1.05, h: 0.46, align: "center", valign: "middle", fontFace: F, fontSize: 15, bold: true, color: "FFFFFF", margin: 0 });
  s.addText(title, { x: 1.8, y: 0.36, w: 9.0, h: 0.6, fontFace: F, fontSize: 23, bold: true, color: INK, margin: 0, valign: "middle" });
  if (kind) s.addText(kind, { x: 10.9, y: 0.47, w: 1.9, h: 0.4, align: "right", fontFace: F, fontSize: 12, bold: true, color: MUTED, margin: 0, valign: "middle" });
}

// dark unit-title slide
function unitTitle(chip, time, title, goals, prog, noteTxt) {
  const s = dark();
  s._sourceChip = chip;
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

// horizontal flow boxes (TP 흐름도 등). steps: [title, sub, color?]
function flow(s, steps, y, o) {
  o = o || {};
  const n = steps.length;
  const gap = 0.18;
  const bw = o.bw || ((12.25 - gap * (n - 1)) / n);
  steps.forEach((st, i) => {
    const x = 0.55 + i * (bw + gap);
    s.addShape("roundRect", { x, y, w: bw, h: o.bh || 1.5, fill: { color: st[2] || NAVY }, rectRadius: 0.09 });
    s.addText(st[0], { x: x + 0.08, y: y + 0.12, w: bw - 0.16, h: 0.65, align: "center", valign: "middle", fontFace: F, fontSize: o.tSize || 11.5, bold: true, color: "FFFFFF", margin: 0 });
    s.addText(st[1], { x: x + 0.08, y: y + 0.78, w: bw - 0.16, h: (o.bh || 1.5) - 0.88, align: "center", fontFace: F, fontSize: o.sSize || 9, color: "E6ECFA", margin: 0 });
    if (i < n - 1) s.addText("→", { x: x + bw - 0.06, y: y + ((o.bh || 1.5) - 0.6) / 2, w: gap + 0.12, h: 0.6, align: "center", fontFace: F, fontSize: 15, bold: true, color: MUTED, margin: 0 });
  });
}

let s;

/* ===========================================================================
 * 1. 표지
 * ======================================================================== */
s = dark();
s.addText("SAP ABAP 3일 기초교육", { x: 0.9, y: 2.0, w: 8, h: 0.5, fontFace: F, fontSize: 18, bold: true, color: ACCENT, margin: 0 });
s.addText("Day 3", { x: 0.9, y: 2.55, w: 8, h: 1.0, fontFace: F, fontSize: 60, bold: true, color: "FFFFFF", margin: 0 });
s.addText("모듈화 · DB 변경 · 이벤트 — 그리고 Toy Project 완성", { x: 0.9, y: 3.75, w: 11.4, h: 0.7, fontFace: F, fontSize: 27, color: ICE, margin: 0 });
s.addText("Function Module · CRUD · MESSAGE · PF-STATUS · ZEDU##_MAIN", { x: 0.9, y: 4.55, w: 11.4, h: 0.45, fontFace: F, fontSize: 14, color: "8FA2D9", margin: 0 });
s.addText("일시 ____________     강사 ____________", { x: 0.9, y: 6.3, w: 8, h: 0.4, fontFace: F, fontSize: 12, color: "7E89B8", margin: 0 });
s.addNotes("Day 3 표지. 준비물: 어제의 ZEDU##_LIST(선택화면+ALV 조회). 미완성 학생은 R3 시간에 기준본으로 복구하고 시작. 오늘의 결승선: 조회·등록·수정·삭제가 전부 되는 간이 주문 관리 프로그램 ZEDU##_MAIN 완성.");

/* 2. Day 3 로드맵 */
s = light();
header(s, "인트로", "오늘의 지도 · 오늘 오후에 완성합니다", "안내");
tbl(s, [
  ["시간", "유닛", "내용"],
  ["09:00~09:15", "R3", "복습 퀴즈 + ZEDU##_LIST 점검"],
  ["09:15~10:15", "U16", "Function Module — 검증 함수 만들기"],
  ["10:30~11:30", "U17", "DB CRUD — INSERT·UPDATE·DELETE"],
  ["11:30~12:00", "U18", "MESSAGE와 메시지 클래스"],
  ["13:00~13:50", "U19", "PF-STATUS와 버튼 이벤트"],
  ["14:00~17:30", "TP-0~5", "Toy Project — ZEDU##_MAIN 완성"],
  ["17:30~18:00", "랩업", "최종 점검 · 수료"],
], { x: 0.55, y: 1.2, w: 7.2, colW: [1.6, 1.5, 4.1], fontSize: 11, rowH: 0.36 });
card(s, 8.1, 1.2, 4.7, 2.7, "오늘의 결승선", "ZEDU##_MAIN\n조회 + 등록 + 수정 + 삭제가\n전부 되는 간이 주문 관리 프로그램.\n\n오전 = 부품 만들기 (FM·CRUD·메시지·버튼)\n오후 = 3시간 반 동안 조립!", { fill: "FDF3E3", tColor: "9A6A12", bSize: 12.5 });
banner(s, 8.1, 4.15, 4.7, "준비물: 어제의 ZEDU##_LIST", { color: "DDE7F8", tcolor: NAVY });
bullets(s, [
  { t: "시간 안전장치: U16 30/48분 · U19 25분 · TP-2 15/25/35분 — 해당 슬라이드의 ⏱ 배너", b: true },
  { t: "미달 시 기준본 전환 — 개인 평가가 아니라 전체 흐름을 연결하는 실습입니다", color: MUTED },
], { x: 0.55, y: 5.2, w: 12.2, h: 1.2, fontSize: 13.5 });
s.addNotes("오전 4유닛은 전부 오후 TP의 부품. 강제 체크포인트(강사가이드 2-1): U16 30분 인터페이스·48분 테스트 2개 / U19 25분 상태 복사 / TP-2 15·25·35분 TODO 단계. 기준본 전환 문장(2-2): '지금은 개인 평가가 아니라 전체 흐름을 연결하는 실습입니다. 이 단계의 환경·오타 문제는 기준본으로 넘기고, 다음 단계에서 다시 직접 작성하겠습니다.' 제공 후 학생이 번호 치환→활성화→실행은 직접.");

/* 3. 복습 퀴즈 R3 */
s = light();
header(s, "복습", "복습 퀴즈 R3 — 어제를 확인", "✍️ 퀴즈");
bullets(s, [
  { t: "1)  SELECT ... INTO TABLE 후 조회 결과가 없으면 sy-subrc는?", b: true },
  { t: "2)  리포트 이벤트를 실행 순서대로 나열하면?", b: true },
  { t: "     (INITIALIZATION / START-OF-SELECTION / AT SELECTION-SCREEN)", sub: true },
  { t: "3)  ALV 컬럼 제목이 자동으로 한글로 나온 이유는?", b: true },
  { t: "4)  (실기) ZEDU##_LIST를 실행해 신규(N) 주문만 조회해보세요", b: true },
], { x: 0.55, y: 1.35, w: 8.0, h: 2.9, fontSize: 15 });
card(s, 8.35, 1.35, 4.45, 2.55, "정답은 부록 A", "말로 확인 — \"왜\"를 설명하게 합니다.\n\n10분 풀이 → 5분은\nZEDU##_LIST 동작 점검에 사용.", { bSize: 13 });
banner(s, 0.55, 4.6, 12.25, "ZEDU##_LIST 실행·ALV 표시가 안 되는 학생은 U16 시작 전 기준본으로 복구 (오늘 오후 전체의 전제)", {});
s.addNotes("R3 출처: 12_교재_Day3 / 30_강사가이드 Day3. 네 가지를 말로 확인: 시스템 필드, 이벤트 순서, 한글 컬럼의 출처(DE 라벨), 상태 N 조회 방법. LIST가 안 도는 학생은 U16 전에 기준본으로 복구.");

/* ===========================================================================
 * U16 (4~12)
 * ======================================================================== */
unitTitle("U16", "09:15 ~ 10:15", "Function Module — 나만의 공용 함수",
  ["함수 그룹과 Function Module(FM)을 만들 수 있다", "IMPORT/EXPORT/EXCEPTIONS를 정의하고, 호출 측에서 예외를 처리할 수 있다"],
  "ZEDU##_FG · ZEDU##_U16",
  "출처: 12_교재_Day3 > U16. 시간 안전장치: 30분 함수 그룹·인터페이스·활성 / 48분 단독 테스트 2개. 진행: 그룹은 컨테이너 → 인터페이스 탭 먼저 → 소스 → F8 단독 테스트 → 패턴 호출 → F5로 FM 안에. TABLES/CHANGING은 형태만 소개하고 실습을 늘리지 않는다.");

/* 5. 개념 1 — FM 호출 방향 그림 (핵심) */
s = light();
header(s, "U16", "FM = 시스템 어디서든 호출하는 공용 함수", "개념");
s.addText("어제 쓴 REUSE_ALV_GRID_DISPLAY도, 오늘 쓸 팝업도 전부 누군가 만들어 둔 FM입니다. 오늘은 우리가 만드는 쪽이 됩니다.",
  { x: 0.55, y: 1.15, w: 12.2, h: 0.45, fontFace: F, fontSize: 13.5, color: INK, margin: 0 });
card(s, 0.55, 1.85, 3.3, 0.85, "오늘 오후 — 등록 팝업", null, { tSize: 12 });
card(s, 0.55, 2.85, 3.3, 0.85, "다른 프로그램", null, { tSize: 12 });
card(s, 0.55, 3.85, 3.3, 0.85, "(나중엔) 인터페이스·배치", null, { tSize: 12 });
["1.95", "2.95", "3.95"].forEach(y => s.addText("→", { x: 3.9, y: parseFloat(y), w: 0.6, h: 0.6, align: "center", fontFace: F, fontSize: 20, bold: true, color: MUTED, margin: 0 }));
s.addShape("roundRect", { x: 4.6, y: 1.75, w: 8.2, h: 3.05, fill: { color: "F7F9FD" }, line: { color: "9FB0D0", width: 1 }, rectRadius: 0.1 });
s.addText("함수 그룹 ZEDU##_FG — FM들을 담는 상자 (FM은 반드시 그룹 안에)", { x: 4.9, y: 1.92, w: 7.6, h: 0.35, fontFace: F, fontSize: 11.5, bold: true, color: MUTED, margin: 0 });
s.addShape("roundRect", { x: 5.1, y: 2.4, w: 7.2, h: 1.55, fill: { color: NAVY }, rectRadius: 0.09 });
s.addText([{ text: "FM  ZEDU##_ORDER_CHECK", options: { fontFace: FC, fontSize: 16, bold: true, color: "FFFFFF", breakLine: true, paraSpaceAfter: 6 } },
           { text: "주문 입력값 검증 — 정해진 인터페이스로 어디서든 CALL FUNCTION", options: { fontSize: 11.5, color: ICE } }],
  { x: 5.4, y: 2.6, w: 6.6, h: 1.2, fontFace: F, margin: 0, valign: "top" });
s.addText("REUSE_ALV_GRID_DISPLAY · POPUP_GET_VALUES 도 전부 이런 FM입니다", { x: 5.1, y: 4.1, w: 7.4, h: 0.35, fontFace: F, fontSize: 10.5, color: MUTED, margin: 0 });
banner(s, 0.55, 5.15, 12.25, "왜 FM으로? \"주문 입력값 검증\"은 등록 팝업에서도, 나중엔 인터페이스에서도 씀 → 한 곳에 두고 재사용", {});
s.addNotes("함수 그룹 = FM들을 담는 상자. 예상 질문 — Q. FORM과 FM의 차이? A. FORM은 주로 같은 프로그램 내부 서브루틴, FM은 함수 그룹에 속하며 다른 프로그램에서도 정해진 인터페이스로 호출. Q. 클래스 메서드 대신 왜 FM? A. 표준 API·기존 시스템에서 광범위하게 만나며 인터페이스·예외·호출 개념의 좋은 입문.");

/* 6. 개념 2 — 인터페이스 표 */
s = light();
header(s, "U16", "FM 인터페이스 — 받는 것 · 주는 것 · 실패", "개념");
tbl(s, [
  ["구분", "의미 (FM 입장)", "이번 FM ZEDU##_ORDER_CHECK"],
  [{ text: "IMPORTING", opts: { fontFace: FC } }, "받는 값", "IV_CUST_ID · IV_PROD_ID · IV_QUANTITY (3개)"],
  [{ text: "EXPORTING", opts: { fontFace: FC } }, "주는 값", "EV_PRICE — 검증 통과 시 단가 반환 (1개)"],
  [{ text: "TABLES · CHANGING", opts: { fontFace: FC } }, "(형태만 소개)", "오늘은 쓰지 않습니다"],
  [{ text: "EXCEPTIONS", opts: { fontFace: FC } }, { text: "실패를 알리는 이름들", b: true }, "INVALID_CUST · INVALID_PROD · INVALID_QTY (3개)"],
], { x: 0.55, y: 1.35, w: 12.25, colW: [2.7, 2.7, 6.85], fontSize: 12, rowH: 0.55 });
card(s, 0.55, 4.45, 12.25, 1.15, "예외는 \"번호\"로 도착합니다", "FM이 RAISE로 예외를 올리면, 호출한 쪽에서는 예외가 번호로 떨어짐 → sy-subrc로 분기합니다. (잠시 후 호출부에서 직접 확인)", { bSize: 13 });
s.addNotes("인터페이스 탭을 소스보다 먼저 완성하는 것이 진행 순서(강사가이드). 호출자 시점에서는 EXPORTING/IMPORTING 방향이 반대가 된다는 것을 미리 예고만 해 둔다 — 따라치기 2에서 다룸.");

/* 7. 따라치기 1(1) — SE37 절차 + 인터페이스 입력 */
s = light();
header(s, "U16", "따라치기 ① — SE37에서 그룹·FM 만들기", "💻 시연");
banner(s, 0.55, 1.12, 12.25, "⏱ 시작 30분: 함수 그룹 + FM 인터페이스(예외까지) + 활성 — 미달 시 기준본 전환 후 테스트로 이동", {});
bullets(s, [
  { t: "① SE37 → Goto → Function Groups → Create Group: ZEDU##_FG → Local Object", b: true },
  { t: "② SE37 초기화면: ZEDU##_ORDER_CHECK → [Create] → 그룹 ZEDU##_FG" },
  { t: "③ Import / Export / Exceptions 탭을 오른쪽 표대로 입력", b: true },
  { t: "④ 저장 → 활성화 (그룹과 FM 모두!)" },
], { x: 0.55, y: 1.85, w: 6.5, h: 3.2, fontSize: 13.5 });
tbl(s, [
  ["탭", "이름", "타입 / 설명"],
  ["Import", { text: "IV_CUST_ID", opts: { fontFace: FC } }, { text: "ZEDU_CUSTID", opts: { fontFace: FC } }],
  ["Import", { text: "IV_PROD_ID", opts: { fontFace: FC } }, { text: "ZEDU_PRODID", opts: { fontFace: FC } }],
  ["Import", { text: "IV_QUANTITY", opts: { fontFace: FC } }, { text: "ZEDU_QTY", opts: { fontFace: FC } }],
  ["Export", { text: "EV_PRICE", opts: { fontFace: FC } }, { text: "ZEDU_PRICE", opts: { fontFace: FC } }],
  ["Exceptions", { text: "INVALID_CUST", opts: { fontFace: FC } }, "고객 없음"],
  ["Exceptions", { text: "INVALID_PROD", opts: { fontFace: FC } }, "제품 없음"],
  ["Exceptions", { text: "INVALID_QTY", opts: { fontFace: FC } }, "수량 오류"],
], { x: 7.3, y: 1.85, w: 5.5, colW: [1.3, 2.1, 2.1], fontSize: 10.5, rowH: 0.38 });
banner(s, 0.55, 5.35, 6.5, "어제 쓰던 공용 DE를 그대로 참조 — DDIC 재사용", { color: "DDE7F8", tcolor: NAVY });
s.addNotes("30분 체크포인트(강사가이드 2-1): 함수 그룹·FM 인터페이스 생성, FM 활성. 미달 시 인터페이스 캡처/기준본 제공 후 소스와 단독 테스트로 이동. 기준본 전환 문장은 2-2. 자주 막힘: 함수 그룹을 활성화하지 않음.");

/* 8. 따라치기 1(2) — 소스 입력 */
s = light();
header(s, "U16", "따라치기 ① — 검증 로직: RAISE로 예외 올리기", "💻 시연");
codeBlock(s, { x: 0.55, y: 1.3, w: 8.0, h: 4.3, title: "Source code 탭 — 검증 3단계 (일부)", code: [
  "* 1) 고객 존재 확인",
  "  SELECT SINGLE cust_id FROM zedu_cust INTO lv_cust",
  "    WHERE cust_id = iv_cust_id.",
  "  IF sy-subrc <> 0.",
  "    RAISE invalid_cust.        \" 예외를 발생시키고 즉시 복귀",
  "  ENDIF.",
  "",
  "* 2) 제품 존재 확인 + 단가 반환 (ev_price로 SELECT — 같은 패턴)",
  "",
  "* 3) 수량 검증",
  "  IF iv_quantity <= 0.",
  "    RAISE invalid_qty.",
  "  ENDIF.",
] });
card(s, 8.75, 1.3, 4.05, 4.3, "RAISE의 의미", "예외 이름을 올리고\n그 자리에서 FM 종료.\n\n호출자에게는 번호\n(sy-subrc)로 도착합니다.\n\n입력 후 저장 → 활성화.\n\n2)는 1)과 같은 패턴 —\nzedu_prod에서 price를\nev_price로 SELECT.", { bSize: 12 });
s.addNotes("FM 소스의 자동 생성 주석/인터페이스 영역을 잘못 편집하는 것이 자주 막힘 — FUNCTION ~ ENDFUNCTION 안쪽만 수정. 소스 전문은 교재 U16 따라치기 1.");

/* 9. F8 단독 테스트 (+D3-01) */
s = light();
header(s, "U16", "F8 단독 테스트 — FM의 강력한 장점", "💻 시연");
bullets(s, [
  { t: "프로그램 없이 FM만 바로 실험 — SE37에서 F8", b: true },
], { x: 0.55, y: 1.2, w: 7.0, h: 0.5, fontSize: 14 });
tbl(s, [
  ["입력", "기대 결과"],
  [{ text: "C00001 / P0000003 / 3", opts: { fontFace: FC } }, "EV_PRICE = 45000.00"],
  [{ text: "C99999 / P0000003 / 3", opts: { fontFace: FC } }, { text: "예외 INVALID_CUST", b: true }],
  [{ text: "C00001 / P0000003 / 0", opts: { fontFace: FC } }, { text: "예외 INVALID_QTY", b: true }],
], { x: 0.55, y: 1.8, w: 7.0, colW: [3.6, 3.4], fontSize: 11.5, rowH: 0.48 });
banner(s, 0.55, 4.0, 7.0, "⏱ 시작 48분: 위 3케이스 중 최소 2개 통과", {});
card(s, 0.55, 4.75, 7.0, 1.1, "미달 시", "호출 프로그램 디버깅은 시연 중심으로 축소하고 U17로 — 오후 TP에는 지장 없게.", { bSize: 12 });
shot(s, { x: 7.95, y: 1.3, w: 4.85, h: 4.55, id: "D3-01", cap: "SE37 단독 테스트(F8) —\nC99999 입력 → 예외 INVALID_CUST 화면" });
s.addNotes("48분 체크포인트(강사가이드 2-1): 정상·고객 오류·제품 오류·수량 오류 중 최소 2개 단독 테스트. 자주 막힘: SE37 테스트에서 수량을 문자처럼 입력.");

/* 10. 따라치기 2 — 호출부 (DEFAULT 3종 + 방향) */
s = light();
header(s, "U16", "따라치기 ② — 프로그램에서 호출 (ZEDU##_U16)", "💻 시연");
codeBlock(s, { x: 0.55, y: 1.3, w: 8.0, h: 4.55, title: "[Pattern] 버튼(Ctrl+F6)이 골격을 자동 생성", code: [
  "PARAMETERS: p_cust TYPE zedu_custid DEFAULT 'C00001',",
  "            p_prod TYPE zedu_prodid DEFAULT 'P0000003',",
  "            p_qty  TYPE zedu_qty    DEFAULT 3.",
  "",
  "CALL FUNCTION 'ZEDU##_ORDER_CHECK'",
  "  EXPORTING",
  "    iv_cust_id   = p_cust        \" 내가 '주는' 값",
  "    iv_prod_id   = p_prod",
  "    iv_quantity  = p_qty",
  "  IMPORTING",
  "    ev_price     = gv_price      \" 내가 '받는' 값",
  "  EXCEPTIONS",
  "    invalid_cust = 1             \" 예외 -> 번호 매핑",
  "    invalid_prod = 2",
  "    invalid_qty  = 3",
  "    OTHERS       = 4.",
], fontSize: 10 });
card(s, 8.75, 1.3, 4.05, 2.6, "호출자 시점!", "호출측 EXPORTING /\nIMPORTING은 FM 정의와\n반대 방향.\n\n\"내가 주는 것 EXPORTING,\n내가 받는 것 IMPORTING\"\n— 항상 호출자 시점!", { fill: "FDF3E3", tColor: "9A6A12", bSize: 12 });
card(s, 8.75, 4.1, 4.05, 1.75, "DEFAULT 3종", "실행하면 바로 정상\n케이스가 도는 기본값.\nC99999·수량 0으로 바꿔\n예외도 관찰.", { bSize: 12 });
banner(s, 0.55, 6.05, 12.25, "호출 뒤에는 CASE sy-subrc — WHEN 0 성공 / 1·2·3 예외별 메시지 / OTHERS (교재 U16 따라치기 2)", { color: "DDE7F8", tcolor: NAVY });
s.addNotes("DEFAULT 3종(C00001/P0000003/3)은 확정 설계 — 실행 즉시 정상 케이스. CASE sy-subrc 분기(0/1/2/3/OTHERS)는 교재 코드로 완성. 디버거: CALL FUNCTION 줄 브레이크포인트 → F5는 FM 안으로, F6은 건너뜀 — 직접 확인시키기.");

/* 11. 흔한 에러 U16 */
s = light();
header(s, "U16", "여기서 자주 막힙니다", "⚠️ 점검");
tbl(s, [
  ["증상", "확인 / 해결"],
  ["FM이 활성인데 호출이 안 됨", "함수 그룹도 활성화했는지 확인"],
  ["예외가 OTHERS(4)로만 떨어짐", "예외 이름과 호출부 철자가 같은지 확인"],
  ["활성화 오류 — 소스가 깨짐", "자동 생성 주석·인터페이스 영역을 편집하지 않기"],
  ["F8 테스트에서 수량 오류", "수량을 문자처럼 입력하지 않았는지 확인"],
  ["OTHERS를 수량 오류로 오진", "3(INVALID_QTY)과 4(OTHERS)는 다른 번호"],
], { x: 0.55, y: 1.35, w: 8.0, colW: [3.6, 4.4], fontSize: 11.5, rowH: 0.52 });
card(s, 8.85, 1.35, 3.95, 3.1, "📦 디버거 F5 vs F6", "CALL FUNCTION 줄에\n브레이크포인트를 걸고 —\n\nF5 = FM 안으로 들어감\nF6 = FM을 건너뜀\n\n직접 확인해보세요.", { bSize: 12.5 });
s.addNotes("표는 강사가이드 U16 '자주 막힘' 5가지. F5/F6 차이는 교재 📦 박스 — U05 디버거의 복습 겸.");

/* 12. 퀴즈 Q16 */
s = light();
header(s, "U16", "퀴즈 Q16 — 고객명 조회 FM", "✍️ 퀴즈");
s.addText([{ text: "ZEDU##_GET_CUSTNAME", options: { fontFace: FC, bold: true, color: NAVY } }, { text: "  을 만드세요 (같은 그룹 ZEDU##_FG에)", options: {} }],
  { x: 0.55, y: 1.2, w: 12.2, h: 0.45, fontFace: F, fontSize: 14, color: INK, margin: 0 });
tbl(s, [
  ["인터페이스", "내용"],
  ["IMPORTING", { text: "IV_CUST_ID  TYPE ZEDU_CUSTID", opts: { fontFace: FC } }],
  ["EXPORTING", { text: "EV_CUST_NAME  TYPE ZEDU_CUSTNAME", opts: { fontFace: FC } }],
  ["EXCEPTIONS", { text: "NOT_FOUND", opts: { fontFace: FC } }],
], { x: 0.55, y: 1.8, w: 7.9, colW: [2.2, 5.7], fontSize: 11.5, rowH: 0.45 });
bullets(s, [
  { t: "로직: 고객명을 조회해 반환, 없으면 NOT_FOUND", b: true },
  { t: "SE37 F8로 세 케이스(정상 / 없는 고객 / 빈값) 테스트까지가 과제", b: true },
], { x: 0.55, y: 3.75, w: 7.9, h: 1.2, fontSize: 13.5 });
card(s, 8.85, 1.8, 3.95, 3.1, "다 풀었다면", "퀴즈집 U16-D\n(고객별 주문 건수 FM)\n어려웠다면 U16-E\n\n정답은 부록 A —\n지금은 보지 않기!", { fill: "FDF3E3", tColor: "9A6A12", bSize: 12.5 });
banner(s, 0.55, 5.15, 12.25, "오전에 만든 ORDER_CHECK와 같은 패턴 — SELECT SINGLE + sy-subrc + RAISE", {});
s.addNotes("정답 비노출(부록 A). 빠른 학생은 U16-D(고객별 주문 건수 FM — COUNT 응용).");

/* ===========================================================================
 * U17 (13~21)
 * ======================================================================== */
unitTitle("U17", "10:30 ~ 11:30", "DB CRUD — INSERT·UPDATE·MODIFY·DELETE",
  ["Open SQL로 DB에 쓰고(INSERT), 고치고(UPDATE/MODIFY), 지울(DELETE) 수 있다", "COMMIT/ROLLBACK의 의미를 알고, 변경 후 SE16N으로 확인하는 습관을 들인다"],
  "ZEDU##_U17",
  "출처: 12_교재_Day3 > U17. 진행 팁: 3라운드마다 실행과 SE16N 확인을 끊는다. SQL 문장보다 변경 범위와 트랜잭션을 먼저 읽게 한다. 라운드 2 SELECT 실패 시 안내 후 종료하는 방어 코드를 짚는다.");

/* 14. 개념 1 — CRUD 문장 표 */
s = light();
header(s, "U17", "DB를 바꾸는 다섯 문장", "개념");
tbl(s, [
  ["문장", "동작", "실패 시 (sy-subrc≠0)"],
  [{ text: "INSERT 테이블 FROM 구조.", opts: { fontFace: FC } }, "새 행 추가", "키 중복이면 4"],
  [{ text: "UPDATE 테이블 FROM 구조.", opts: { fontFace: FC } }, "키로 찾아 전체 갱신", "키 없으면 4"],
  [{ text: "UPDATE 테이블 SET 필드=값 WHERE ...", opts: { fontFace: FC } }, "조건 행들의 특정 필드만 갱신", "대상 0건이면 4"],
  [{ text: "MODIFY 테이블 FROM 구조.", opts: { fontFace: FC } }, "있으면 UPDATE, 없으면 INSERT", "—"],
  [{ text: "DELETE FROM 테이블 WHERE ...", opts: { fontFace: FC } }, "조건 행 삭제", "대상 0건이면 4"],
], { x: 0.55, y: 1.35, w: 12.25, colW: [5.3, 4.0, 2.95], fontSize: 11.5, rowH: 0.5 });
card(s, 0.55, 4.6, 5.9, 1.2, "sy-dbcnt", "= 방금 처리된 행 수. UPDATE SET·DELETE의 결과 확인에 사용.", { bSize: 12.5 });
card(s, 6.7, 4.6, 6.1, 1.2, "읽는 순서", "SQL 문장보다 \"어느 범위가 바뀌나(WHERE)\"를 먼저 읽습니다.", { fill: "FDF3E3", tColor: "9A6A12", bSize: 12.5 });
s.addNotes("예상 질문 — Q. MODIFY는 편한데 항상 쓰면 안 되나? A. '있으면 수정, 없으면 등록'이 업무 의도와 맞을 때만. 중복이 오류여야 하는 등록에서는 INSERT가 명확.");

/* 15. 개념 2 — COMMIT/ROLLBACK + 절대 금지 */
s = light();
header(s, "U17", "COMMIT WORK / ROLLBACK WORK", "개념");
flow(s, [
  ["INSERT / UPDATE / DELETE", "변경 실행 — 아직 미확정", "6E7797"],
  ["COMMIT WORK", "지금까지의 변경을 DB에 확정", GREEN],
  ["ROLLBACK WORK", "미확정 변경을 취소", RED],
], 1.4, { bh: 1.4, tSize: 12, sSize: 9.5 });
banner(s, 0.55, 3.1, 12.25, "3일 과정의 규칙 — \"변경했으면 명시적으로 COMMIT\" (암묵적 커밋도 있지만 규칙은 명시!)", {});
card(s, 0.55, 3.95, 12.25, 1.6, "⚠️ 절대 금지 — SAP 표준 테이블에 직접 INSERT/UPDATE/DELETE", "정합성이 깨지고 장애로 이어집니다. 표준 데이터는 표준 함수(BAPI)로만.\n우리는 우리가 만든 Z테이블(ZEDU##_ORDER)만 만집니다.", { fill: "FBEBE9", tColor: RED, bSize: 13 });
s.addNotes("예상 질문 — Q. COMMIT을 매 문장 뒤에 하면 안전한가? A. 아니다. 함께 성공·실패해야 하는 업무 단위(LUW)를 끊을 수 있다. 본 과정은 단순화를 위해 메인에서 명시하지만 실무는 LUW를 설계한다(강사가이드 6-5, 8).");

/* 16. 라운드 1 — INSERT */
s = light();
header(s, "U17", "따라치기 라운드 1 — INSERT", "💻 시연");
codeBlock(s, { x: 0.55, y: 1.3, w: 8.0, h: 4.55, title: "여기까지 입력하고 실행 → SE16N 확인", code: [
  "  CLEAR gs_order.",
  "  gs_order-order_id   = 9000000001.",
  "  gs_order-cust_id    = 'C00002'.",
  "  gs_order-prod_id    = 'P0000005'.",
  "  gs_order-quantity   = 2.",
  "  gs_order-status     = 'N'.",
  "  gs_order-order_date = sy-datum.",
  "  gs_order-ernam      = sy-uname.",
  "",
  "  INSERT zedu##_order FROM gs_order.",
  "  WRITE: / '1) INSERT sy-subrc =', sy-subrc.        \" 0",
  "  COMMIT WORK.",
] });
card(s, 8.75, 1.3, 4.05, 2.5, "왜 9000000001?", "연습용 번호대 —\n샘플 20건과 안 섞입니다.\n\n실행 후 SE16N에서\n9000000001 확인!", { bSize: 12.5 });
card(s, 8.75, 4.0, 4.05, 1.85, "두 번 실행하면?", "라운드 2에서 관찰 —\n키 중복이라 sy-subrc = 4.\n오류가 아니라 정보입니다.", { fill: "FDF3E3", tColor: "9A6A12", bSize: 12 });
s.addNotes("라운드 1 실행 → SE16N으로 9000000001 확인까지가 한 단위. 자주 막힘: 1라운드를 다시 실행해 키 중복 subrc=4 — 이미 있다는 정보라고 해석시키기.");

/* 17. 라운드 2 — UPDATE 두 방법 */
s = light();
header(s, "U17", "따라치기 라운드 2 — UPDATE 두 가지 방법", "💻 시연");
codeBlock(s, { x: 0.55, y: 1.3, w: 8.0, h: 4.55, title: "이어붙여 다시 실행 → SE16N: 수량 99·상태 C", code: [
  "* 2) UPDATE 방법 A: 구조로 (키로 찾아 전체 교체)",
  "  SELECT SINGLE * FROM zedu##_order INTO gs_order",
  "    WHERE order_id = 9000000001.",
  "  gs_order-quantity = 99.",
  "  UPDATE zedu##_order FROM gs_order.",
  "  COMMIT WORK.",
  "",
  "* 3) UPDATE 방법 B: SET ... WHERE (필드만 콕 집어)",
  "  UPDATE zedu##_order SET status = 'C'",
  "    WHERE order_id = 9000000001.",
  "  WRITE: / '3) UPDATE SET 처리 건수 =', sy-dbcnt.",
  "  COMMIT WORK.",
] });
card(s, 8.75, 1.3, 4.05, 2.5, "방어 코드", "SELECT 실패 시\n\"수정할 주문이 없습니다\"\n안내 후 RETURN —\n교재 코드에 포함.\n(DISPLAY LIKE 'E'는\nU18에서 정식으로)", { bSize: 12 });
card(s, 8.75, 4.0, 4.05, 1.85, "관찰", "다시 실행하면 1)의\nsubrc가 이번엔 4\n(이미 있으니까!)", { fill: "FDF3E3", tColor: "9A6A12", bSize: 12 });
s.addNotes("방법 A(구조 전체)와 B(SET 필드만)의 차이를 변경 범위로 설명. 자주 막힘: UPDATE WHERE 조건 누락 — 전체 행이 바뀌는 사고. 방어 코드(SELECT 실패 시 MESSAGE 후 RETURN)를 꼭 짚는다.");

/* 18. 라운드 3 — MODIFY / ROLLBACK / DELETE */
s = light();
header(s, "U17", "따라치기 라운드 3 — MODIFY·ROLLBACK·DELETE", "💻 시연");
codeBlock(s, { x: 0.55, y: 1.3, w: 8.0, h: 4.55, title: "마무리 — 무르기 체험 포함", code: [
  "  MODIFY zedu##_order FROM gs_order.   \" 9000000002: 없으면 INSERT",
  "  COMMIT WORK.",
  "",
  "* 5) ROLLBACK 체험: 갱신했다가 무르기",
  "  UPDATE zedu##_order SET quantity = 777",
  "    WHERE order_id = 9000000002.",
  "  ROLLBACK WORK.                    \" 확정 전이므로 취소됨",
  "  \" -> SE16N: 9000000002의 수량은 여전히 1 !",
  "",
  "* 6) DELETE",
  "  DELETE FROM zedu##_order WHERE order_id = 9000000001.",
  "  WRITE: / '6) DELETE 처리 건수 =', sy-dbcnt.",
  "  COMMIT WORK.",
], fontSize: 10.5 });
card(s, 8.75, 1.3, 4.05, 4.55, "ROLLBACK 관찰", "UPDATE의 sy-subrc가\n0이어도, COMMIT 전이면\nROLLBACK으로\n없던 일이 됩니다.\n\nSE16N으로 777이\n아닌 것을 꼭 확인 —\n\"확정 전 변경은\n취소할 수 있다\"", { bSize: 12.5 });
s.addNotes("자주 막힘: COMMIT 전에 프로그램을 중단하고 결과 혼동. MODIFY는 9000000002 신규 생성(INSERT로 동작) 후 라운드 재실행 시 UPDATE로 동작 — 교재 라운드 3.");

/* 19. SE16N 리듬 */
s = light();
header(s, "U17", "오늘 오후 내내 — 변경 → 확인 리듬", "핵심 습관");
flow(s, [
  ["코드 실행 (F8)", "INSERT / UPDATE / DELETE"],
  ["SE16N 조회", "정말 바뀌었나?"],
  ["값 확인", "수량·상태·건수"],
  ["다음 라운드", "다시 변경", GREEN],
], 1.5, { bh: 1.4, tSize: 12, sSize: 9.5 });
banner(s, 0.55, 3.2, 12.25, "💡 SE16N을 두 번째 세션에 상시 대기 (/o SE16N) — 변경 → 확인 → 변경 → 확인", {});
bullets(s, [
  { t: "내부 테이블 MODIFY(메모리)와 DB MODIFY(테이블)는 다른 문장 — 대상을 항상 확인", b: true },
  { t: "ZEDU## 의 ##이 내 번호인지 확인 — 다른 학생 테이블을 바꾸는 사고 방지", b: true },
], { x: 0.55, y: 4.05, w: 12.2, h: 1.3, fontSize: 13.5 });
s.addNotes("자주 막힘: 내부 테이블 MODIFY와 DB MODIFY 혼동 / 다른 학생 번호의 테이블을 변경. /o SE16N으로 두 번째 모드 상시 대기 — 오후 TP에서도 같은 리듬.");

/* 20. 흔한 에러 U17 */
s = light();
header(s, "U17", "여기서 자주 막힙니다", "⚠️ 점검");
tbl(s, [
  ["증상", "확인 / 해결"],
  ["라운드 1 재실행 → INSERT sy-subrc = 4", "키 중복 — 오류가 아니라 \"이미 있음\" 정보"],
  ["UPDATE의 WHERE 조건 누락", "전체 행 변경 위험 — WHERE부터 확인"],
  ["COMMIT 전에 중단하고 결과 혼동", "확정 전 변경은 사라질 수 있음 — SE16N 재확인"],
  ["내부 테이블 MODIFY와 DB MODIFY 혼동", "대상이 메모리(gt_)냐 DB(테이블명)냐"],
  ["다른 학생 번호의 테이블을 변경", "ZEDU##에서 ## 확인"],
], { x: 0.55, y: 1.35, w: 12.25, colW: [5.6, 6.65], fontSize: 12, rowH: 0.52 });
banner(s, 0.55, 4.6, 12.25, "WHERE 없는 UPDATE/DELETE는 실무 최악 사고 유형 — 실행 전 WHERE를 소리 내어 읽기", {});
s.addNotes("표는 강사가이드 U17 '자주 막힘' 5가지. WHERE 없는 UPDATE/DELETE는 강사가이드 7-4(반드시 조심할 코드 패턴) 연계.");

/* 21. 퀴즈 Q17 */
s = light();
header(s, "U17", "퀴즈 Q17 — 데이터 정리 작전", "✍️ 퀴즈");
s.addText([{ text: "ZEDU##_U17Q", options: { fontFace: FC, bold: true, color: NAVY } }, { text: "  (새 프로그램)", options: {} }],
  { x: 0.55, y: 1.2, w: 12.2, h: 0.45, fontFace: F, fontSize: 14, color: INK, margin: 0 });
codeBlock(s, { x: 0.55, y: 1.8, w: 8.1, h: 3.0, title: "TODO 3개", code: [
  "* TODO 1: 실습 잔재 9000000002를 삭제하고 처리 건수 출력",
  "",
  "* TODO 2: 고객 C00005의 주문을 전부 상태 'C'로 일괄 변경하고",
  "*         몇 건이 바뀌었는지 출력 (UPDATE SET + sy-dbcnt)",
  "",
  "* TODO 3: 실행 후 ZEDU_DATA_LOAD(초기화 옵션)로 데이터 리셋",
] });
card(s, 8.85, 1.8, 3.95, 3.0, "다 풀었다면", "퀴즈집 U17-D\n(조건부 수량 증가)\n어려웠다면 U17-E\n\n정답은 부록 A", { fill: "FDF3E3", tColor: "9A6A12", bSize: 12.5 });
banner(s, 0.55, 5.1, 12.25, "TODO 3 리셋은 필수 — 오후 Toy Project를 깨끗한 20건으로 시작하기 위함입니다", {});
s.addNotes("정답 비노출. TODO 2는 UPDATE SET + sy-dbcnt 조합 확인. TODO 3(ZEDU_DATA_LOAD 초기화)을 건너뛰지 않게 순회 확인 — 오후 TP의 전제.");

/* ===========================================================================
 * U18 (22~27)
 * ======================================================================== */
unitTitle("U18", "11:30 ~ 12:00", "MESSAGE와 메시지 클래스",
  ["메시지 타입(S/I/W/E/A)의 차이를 안다", "SE91 메시지 클래스를 만들어 MESSAGE 문으로 사용할 수 있다"],
  "ZEDU##_MSG · ZEDU##_U18",
  "출처: 12_교재_Day3 > U18. 30분 운영: 8분 S/E/W/I 표시·흐름 / 8분 SE91 / 7분 WITH 자리표시자 / 7분 DISPLAY LIKE + Q18. 강조: 타입은 색깔뿐 아니라 흐름에 영향.");

/* 23. 개념 1 — 타입 표 */
s = light();
header(s, "U18", "메시지 타입 — 색이 아니라 \"흐름\"", "개념");
tbl(s, [
  ["타입", "표시", "흐름"],
  [{ text: "S", b: true }, "하단 상태바 (초록)", "계속 진행"],
  [{ text: "I", b: true }, "팝업", "확인 후 계속"],
  [{ text: "W", b: true }, "상태바 (노랑)", "위치 따라 다름"],
  [{ text: "E", b: true }, "상태바 (빨강)", { text: "그 자리에서 처리 중단 (선택화면에선 화면 유지 — U14에서 체험)", b: true }],
  [{ text: "A", b: true }, "팝업", "프로그램 강제 종료"],
], { x: 0.55, y: 1.35, w: 12.25, colW: [1.2, 3.6, 7.45], fontSize: 12.5, rowH: 0.52 });
banner(s, 0.55, 4.6, 12.25, "메시지 타입은 색깔뿐 아니라 \"흐름\"에 영향을 줍니다 — E는 그 자리에서 멈춥니다", {});
s.addNotes("U14에서 본 '선택화면의 E = 화면 유지'가 표의 E 행. 오후 버튼 콜백 안에서의 E는 흐름을 꼬이게 할 수 있음 — 다음다음 슬라이드의 DISPLAY LIKE로 연결.");

/* 24. 개념 2 — 리터럴 vs 클래스 */
s = light();
header(s, "U18", "두 가지 사용법 — 리터럴과 메시지 클래스", "개념");
codeBlock(s, { x: 0.55, y: 1.3, w: 8.4, h: 1.9, title: "같은 MESSAGE, 두 얼굴", code: [
  "MESSAGE '수량을 확인하세요' TYPE 'E'.          \" ① 리터럴 (임시·테스트용)",
  "MESSAGE e012(zedu##_msg).                      \" ② 메시지 클래스 (실무 표준)",
  "MESSAGE s001(zedu##_msg) WITH lv_order_id.     \"    &1 자리에 값 채우기",
], fontSize: 10.5 });
card(s, 9.15, 1.3, 3.65, 1.9, "왜 클래스로?", "문구 재사용 · 일괄 관리 · 다국어\n번역. \"같은 문구를 두 번 쓰게\n되면 메시지 클래스로\"", { bSize: 12 });
bullets(s, [
  { t: "이 과정은 둘 다 씁니다 — 정식(클래스)과 임시(리터럴)의 차이를 몸으로 익히는 설계", b: true },
  { t: "오후 TP에서 X 수정 차단 메시지는 일부러 리터럴로 둡니다 (새 메시지 번호를 만들지 않음)", color: MUTED },
], { x: 0.55, y: 3.6, w: 12.2, h: 1.3, fontSize: 13.5 });
s.addNotes("확정 설계: X 수정 차단은 리터럴 메시지이며 별도 메시지 클래스 항목을 만들지 않는다. 예상 질문 — Q. 모든 메시지를 클래스에? A. 제품 코드는 클래스가 유리하나, 이 과정은 차이를 보여주기 위해 섞는다.");

/* 25. 위험 패턴 — DISPLAY LIKE 'E' */
s = light();
header(s, "U18", "오후 버튼 로직의 생명줄 — DISPLAY LIKE", "⚠️ 핵심 기술");
badGood(s,
  "❌ 콜백 안에서 E를 그대로",
  "MESSAGE e012(zedu##_msg).\n\n* E = 그 자리에서 처리 중단\n* ALV 콜백 안에서는\n* 흐름이 이상해질 수 있음",
  "중단이 필요한 곳이 아니라면 위험",
  "✅ S로 보내되 E처럼 보이게",
  "MESSAGE s020(zedu##_msg)\n  DISPLAY LIKE 'E'.\n\n* 빨갛게 보이지만(E처럼)\n* 흐름은 계속(S)",
  "현장의 관용구 — 오후 내내 씁니다");
banner(s, 0.55, 4.4, 12.25, "자동 중단이 없으므로 멈춰야 하면 RETURN을 직접! — \"빨간 메시지 + RETURN\" 세트로 기억", {});
s.addNotes("강사가이드 강조: TYPE 'S' DISPLAY LIKE 'E' 뒤에는 자동 중단이 없으므로 필요하면 RETURN. 이 차이가 오후 버튼 로직(수정·삭제 방어)의 생명줄 — ZEDU##_U18로 직접 체험(다음 슬라이드).");

/* 26. 따라치기 — SE91 (+D3-02) */
s = light();
header(s, "U18", "따라치기 — SE91 메시지 클래스 ZEDU##_MSG", "💻 시연");
bullets(s, [
  { t: "① SE91 → Message class: ZEDU##_MSG → [Create]", b: true },
  { t: "② 메시지 입력 — 오후 TP에서 전부 사용합니다 (전문은 교재 U18 표)" },
  { t: "③ ZEDU##_U18로 테스트: 수량 0 실행 → 빨간 메시지 + 아랫줄 실행됨", b: true },
  { t: "    DISPLAY LIKE를 지우고 MESSAGE e012로 바꾸면 → 아랫줄이 실행되지 않음", sub: true },
], { x: 0.55, y: 1.25, w: 7.2, h: 2.3, fontSize: 13 });
tbl(s, [
  ["번호", "용도"],
  ["001~003", "주문 &1이(가) 등록/수정/삭제되었습니다 (성공)"],
  ["010~013", "없는 고객·제품 / 수량 오류 / 상태값 오류 (검증)"],
  ["020~022", "완료 수정 불가 · 신규만 삭제 · 커서를 행에 (규칙)"],
], { x: 0.55, y: 3.75, w: 7.2, colW: [1.5, 5.7], fontSize: 11, rowH: 0.5 });
shot(s, { x: 8.05, y: 1.3, w: 4.75, h: 4.55, id: "D3-02", cap: "SE91 — ZEDU##_MSG\n메시지 10건(001~022) 입력 완료" });
banner(s, 0.55, 5.85, 7.2, "이 10개가 오후 TP의 모든 메시지입니다", { color: "DDE7F8", tcolor: NAVY });
s.addNotes("메시지 전문 10건은 교재 U18 표(001~003 성공, 010~013 검증, 020~022 업무 규칙). ZEDU##_U18에서 s012 DISPLAY LIKE 'E' vs e012의 아랫줄 실행 여부 차이를 직접 관찰 — 오후 버튼 로직의 생명줄.");

/* 27. 퀴즈 Q18 */
s = light();
header(s, "U18", "퀴즈 Q18 — 환영 메시지", "✍️ 퀴즈");
bullets(s, [
  { t: "TODO 1: ZEDU##_MSG에 900 \"테스트: &1 님 환영합니다\" 추가", b: true },
  { t: "TODO 2: MESSAGE s900(zedu##_msg) WITH sy-uname. 으로 출력", b: true },
  { t: "TODO 3: 같은 메시지를 TYPE 'I'(팝업)로도", b: true },
  { t: "    MESSAGE i900(zedu##_msg) WITH sy-uname.", sub: true },
], { x: 0.55, y: 1.35, w: 8.0, h: 2.6, fontSize: 14.5 });
card(s, 8.85, 1.35, 3.95, 2.6, "다 풀었다면", "퀴즈집 U18-D\n(검증 결과별 메시지)\n어려웠다면 U18-E\n\n정답은 부록 A", { fill: "FDF3E3", tColor: "9A6A12", bSize: 12.5 });
banner(s, 0.55, 4.35, 12.25, "s900 → i900 — 타입 한 글자가 표시(상태바/팝업)와 흐름을 바꿉니다", {});
s.addNotes("정답 비노출. WITH의 &1 자리 채움과 타입별 표시 차이 확인이 목적. 빠른 학생은 U18-D.");

/* 28. 점심 브릿지 */
s = dark();
s.addText("점심시간", { x: 0.9, y: 1.6, w: 8, h: 0.8, fontFace: F, fontSize: 34, bold: true, color: ACCENT, margin: 0 });
s.addText("12:00 ~ 13:00", { x: 0.9, y: 2.4, w: 5, h: 0.4, fontFace: F, fontSize: 16, color: ICE, margin: 0 });
s.addText("오후 — 버튼을 달고, 완성합니다", { x: 0.9, y: 3.1, w: 11.5, h: 0.8, fontFace: F, fontSize: 30, bold: true, color: "FFFFFF", margin: 0 });
s.addText([{ text: "13:00 U19 버튼 이벤트 → 14:00부터 3시간 반, Toy Project.", options: { fontSize: 16, color: "FFD9A0", breakLine: true, paraSpaceAfter: 10 } },
           { text: "오전의 부품(FM 검증 · CRUD · 메시지)이 오후에 전부 조립됩니다.", options: { fontSize: 14, color: ICE } }],
  { x: 0.9, y: 4.15, w: 11.4, h: 1.4, fontFace: F, margin: 0 });
s.addNotes("강사 체크(Day 3 오후 시작 전): ZEDU_DATA_LOAD 초기화 상태(20건), 강사용 ZEDU_MAIN_DEMO 동작, 기준본 배포 경로. Q17 TODO 3 리셋을 건너뛴 학생 확인.");

/* ===========================================================================
 * U19 (29~36)
 * ======================================================================== */
unitTitle("U19", "13:00 ~ 13:50", "PF-STATUS와 버튼 이벤트",
  ["ALV 툴바에 커스텀 버튼을 추가할 수 있다 (PF-STATUS)", "버튼 클릭을 USER_COMMAND 콜백에서 받아 처리하고, 커서 행을 읽을 수 있다"],
  "ZEDU##_U19",
  "출처: 12_교재_Day3 > U19. 최고 위험 구간 — 25분에 상태 복사·활성 안 된 학생은 즉시 기준본 전환(권한·시스템 차이를 수업 중 추적하지 않는다). 배분: 5분 PF-STATUS 개념 / 10분 콜백 2줄 / 10분 FORM 2개 / 15분 SE41 복사·버튼 3개 / 10분 선택 행+Q19.");

/* 30. 개념 — 두 조각 (핵심) */
s = light();
header(s, "U19", "버튼을 다는 데 필요한 두 조각", "핵심");
card(s, 0.55, 1.3, 6.0, 2.0, "① PF-STATUS (GUI Status)", "이 화면에 어떤 버튼·메뉴가 있는지 정의.\n각 버튼에는 기능 코드(Function Code)라는\n이름표가 붙습니다.", { bSize: 12.5 });
card(s, 6.8, 1.3, 6.0, 2.0, "② USER_COMMAND 콜백", "버튼이 눌리면 ALV가 호출해주는 FORM.\n어떤 버튼이었는지(기능 코드) + 커서가 어디\n있었는지(tabindex = 행 번호)가 들어옵니다.", { bSize: 12.5 });
codeBlock(s, { x: 0.55, y: 3.55, w: 8.4, h: 1.75, title: "버튼 클릭의 순간", code: [
  "[사용자가 '수정' 클릭] → ALV가 FORM user_command 호출",
  "                          pv_ucomm    = 'FC_EDIT'   (뭘 눌렀나)",
  "                          ps_selfield-tabindex = 7  (커서는 7행)",
], fontSize: 10.5 });
card(s, 9.15, 3.55, 3.65, 1.75, "📦 용어 구분", "고전 리스트의\nAT USER-COMMAND와\nALV의 USER_COMMAND\n콜백은 다른 진입점 —\n오늘은 ALV 콜백 방식.", { bSize: 11 });
banner(s, 0.55, 5.6, 12.25, "기능 코드 = 화면 버튼과 CASE 분기를 연결하는 \"계약\" — 철자가 다르면 아무 일도 안 일어납니다", {});
s.addNotes("기능 코드는 계약(강사가이드 강조). tabindex=0(행 밖 클릭)·READ 실패 처리를 미리 언급 — Q19와 TP에서 반복.");

/* 31. 따라치기 (1)(2) — 복사 + 콜백 2줄 */
s = light();
header(s, "U19", "따라치기 — LIST 복사 → 콜백 2줄", "💻 시연");
bullets(s, [
  { t: "(1) SE38 → ZEDU##_LIST 복사(Ctrl+F5) → ZEDU##_U19 — Text elements 체크!", b: true },
  { t: "     복사 후 활성화·실행 확인 (어제와 동일하게 돌아야 출발)", sub: true },
  { t: "(2) FORM show_alv 안 — ALV 호출에 콜백 2줄 추가:", b: true },
], { x: 0.55, y: 1.25, w: 12.2, h: 1.5, fontSize: 13.5 });
codeBlock(s, { x: 0.55, y: 2.75, w: 8.4, h: 2.9, title: "REUSE_ALV_GRID_DISPLAY — ★ 2줄만 추가", code: [
  "  CALL FUNCTION 'REUSE_ALV_GRID_DISPLAY'",
  "    EXPORTING",
  "      i_callback_program       = sy-repid",
  "      i_callback_pf_status_set = 'SET_STATUS'     \" ★ 추가",
  "      i_callback_user_command  = 'USER_COMMAND'   \" ★ 추가",
  "      i_structure_name         = 'ZEDU##_S_LIST'",
  "      ...이하 동일...",
], fontSize: 10.5 });
card(s, 9.15, 2.75, 3.65, 2.9, "복사 체인 시작", "LIST → U19 → (오후) MAIN\n\n어제의 조회 프로그램이\n그대로 오늘의 몸통.\n\n'SET_STATUS' 등 문자열은\nFORM 이름과 정확히\n일치해야 합니다.", { fill: "FDF3E3", tColor: "9A6A12", bSize: 11.5 });
s.addNotes("Text elements 체크를 빼먹으면 선택 텍스트가 사라짐. 콜백 문자열과 FORM 이름 불일치가 자주 막힘. 이 복사 체인(LIST→U19→MAIN)은 재타이핑·오타를 줄이는 확정 설계.");

/* 32. 따라치기 (3) — FORM 2개 */
s = light();
header(s, "U19", "따라치기 — 콜백 FORM 2개 추가", "💻 시연");
codeBlock(s, { x: 0.55, y: 1.3, w: 8.4, h: 4.55, title: "프로그램 맨 아래에 (전문은 교재 U19)", code: [
  "FORM set_status USING pt_extab TYPE slis_t_extab.",
  "  SET PF-STATUS 'MAIN' EXCLUDING pt_extab.",
  "ENDFORM.",
  "",
  "FORM user_command USING pv_ucomm    LIKE sy-ucomm",
  "                        ps_selfield TYPE slis_selfield.",
  "  CASE pv_ucomm.",
  "    WHEN 'FC_EDIT'.",
  "      READ TABLE gt_list INTO gs_list INDEX ps_selfield-tabindex.",
  "      IF sy-subrc = 0.   \" 커서 행의 주문번호를 I 메시지로",
  "      ELSE.",
  "        MESSAGE i022(zedu##_msg).      \" 행에 커서를 두세요",
  "      ENDIF.",
  "  ENDCASE.",
  "ENDFORM.",
], fontSize: 10 });
card(s, 9.15, 1.3, 3.65, 4.55, "어디서 본 패턴?", "READ TABLE ... INDEX\n+ sy-subrc 확인 —\nU10의 그 패턴이\n버튼 처리의 심장입니다.\n\nFC_ADD / FC_DEL은\n지금은 더미 I 메시지\n(오후에 진짜로 구현!)", { bSize: 12 });
s.addNotes("FC_ADD·FC_DEL은 더미 메시지로 두고 FC_EDIT만 READ 패턴 시연(전문은 교재). 기능 코드는 대문자 — CASE의 WHEN 철자 불일치가 '기능 코드가 처리되지 않음' 경고의 원인.");

/* 33. 따라치기 (4) — SE41 상태 복사 (+D3-03) */
s = light();
header(s, "U19", "따라치기 — SE41에서 PF-STATUS 'MAIN' 만들기", "💻 시연");
banner(s, 0.55, 1.12, 12.25, "⏱ 시작 25분: MAIN 상태 복사·활성 + 버튼 1개 표시 — 미달 시 즉시 기준본 전환 (최고 위험 구간)", {});
bullets(s, [
  { t: "① SE41 → Program SAPLKKBL, Status STANDARD_FULLSCREEN", b: true },
  { t: "② [Copy Status] → To: ZEDU##_U19, Status MAIN" },
  { t: "③ SE41에서 ZEDU##_U19 / MAIN → [Change] → Application Toolbar 펼치기" },
  { t: "④ 빈 자리에 기능 코드 3개 입력 (오른쪽 표)", b: true },
  { t: "⑤ 저장 → 활성화 (상태도 활성화 필요!)", b: true },
], { x: 0.55, y: 1.85, w: 6.6, h: 2.8, fontSize: 13 });
tbl(s, [
  ["기능 코드", "텍스트", "아이콘"],
  [{ text: "FC_ADD", opts: { fontFace: FC } }, "등록", { text: "ICON_CREATE", opts: { fontFace: FC } }],
  [{ text: "FC_EDIT", opts: { fontFace: FC } }, "수정", { text: "ICON_CHANGE", opts: { fontFace: FC } }],
  [{ text: "FC_DEL", opts: { fontFace: FC } }, "삭제", { text: "ICON_DELETE", opts: { fontFace: FC } }],
], { x: 0.55, y: 4.8, w: 6.6, colW: [2.2, 1.6, 2.8], fontSize: 11, rowH: 0.42 });
shot(s, { x: 7.45, y: 1.85, w: 5.35, h: 4.55, id: "D3-03", cap: "Application Toolbar — FC_ADD/FC_EDIT/FC_DEL\n텍스트·아이콘 포함" });
s.addNotes("표준 상태를 복사하는 이유: 뒤로/종료/정렬/필터 등 표준 ALV 기능을 유지한 채 교육용 버튼만 추가. 25분 체크포인트 — 복사 실패자는 MAIN 상태가 포함된 기준 프로그램으로 즉시 전환, 권한·시스템 차이는 수업 중 추적하지 않음(강사가이드).");

/* 34. 실행 관찰 (+D3-04) */
s = light();
header(s, "U19", "실행 — 툴바에 내 버튼 3개 등장 🎉", "💻 시연");
bullets(s, [
  { t: "툴바에 [등록] [수정] [삭제] 등장 — 각각 눌러보기", b: true },
  { t: "행 위에 커서를 두고 [수정] → 그 행의 주문번호가 메시지로" },
  { t: "행 밖에서 [수정] → i022 \"행에 커서를 두세요\" (tabindex = 0)", b: true },
  { t: "이 차이(커서 행 읽기)가 오후 수정·삭제 기능의 핵심 재료입니다", color: MUTED },
], { x: 0.55, y: 1.3, w: 6.9, h: 3.5, fontSize: 13.5 });
shot(s, { x: 7.65, y: 1.3, w: 5.15, h: 4.4, id: "D3-04", cap: "표준 ALV 툴바 + 커스텀 버튼 3개\n[등록] [수정] [삭제]" });
banner(s, 0.55, 5.0, 6.9, "버튼이 안 보이면? → 다음 슬라이드", { color: "DDE7F8", tcolor: NAVY });
s.addNotes("행 위/밖에서 [수정]을 눌러 tabindex 차이를 직접 관찰시키는 것이 포인트 — TP-3·4의 방어 로직으로 이어진다.");

/* 35. 흔한 에러 U19 */
s = light();
header(s, "U19", "여기서 자주 막힙니다", "⚠️ 점검");
tbl(s, [
  ["증상", "확인 / 해결"],
  ["실행해도 버튼이 안 보임", "콜백 2줄 추가 누락 or 상태(MAIN) 미활성화"],
  ["\"기능 코드가 처리되지 않음\" 경고", "CASE의 WHEN 철자 확인 — 기능 코드는 대문자!"],
  ["SAPLKKBL / STANDARD_FULLSCREEN 오류", "철자와 복사 방향(표준 → 내 프로그램) 확인"],
  ["상태를 다른 프로그램에 복사", "To Program = ZEDU##_U19 인지 확인"],
  ["버튼은 눌리는데 커서 행이 0", "tabindex = 0 처리(i022) — 행 위에 커서"],
], { x: 0.55, y: 1.35, w: 12.25, colW: [5.4, 6.85], fontSize: 12, rowH: 0.52 });
banner(s, 0.55, 4.6, 12.25, "25분 안에 해결이 안 되면 기준본 전환 — 권한·시스템 차이를 수업 중 추적하지 않습니다", {});
s.addNotes("표는 교재 ⚠️ + 강사가이드 U19 '자주 막힘'. 기준본 전환 문장(2-2)으로 심리 부담을 낮춘다.");

/* 36. 퀴즈 Q19 */
s = light();
header(s, "U19", "퀴즈 Q19 — [건수] 버튼", "✍️ 퀴즈");
s.addText([{ text: "ZEDU##_U19", options: { fontFace: FC, bold: true, color: NAVY } }, { text: "  에 네 번째 버튼을 추가하세요", options: {} }],
  { x: 0.55, y: 1.2, w: 12.2, h: 0.45, fontFace: F, fontSize: 14, color: INK, margin: 0 });
bullets(s, [
  { t: "SE41: FC_CNT — 텍스트 \"건수\", 아이콘 ICON_SUM", b: true },
  { t: "누르면 상태바에 \"현재 목록: n건\"이 나오게 (MESSAGE ... TYPE 'S')", b: true },
  { t: "힌트: DESCRIBE TABLE로 건수 → CONCATENATE로 문장 조립", b: true },
  { t: "건수(숫자 타입)는 문자 변수로 옮겨 CONDENSE 후 연결 — Day 2의 그 규칙!", sub: true },
], { x: 0.55, y: 1.8, w: 8.0, h: 3.0, fontSize: 14 });
card(s, 8.85, 1.8, 3.95, 3.0, "다 풀었다면", "퀴즈집 U19-D\n(선택 행 금액 표시)\n어려웠다면 U19-E\n([신규만] 버튼)\n\n정답은 부록 A", { fill: "FDF3E3", tColor: "9A6A12", bSize: 12.5 });
banner(s, 0.55, 5.1, 12.25, "SE41 버튼 추가 → CASE에 WHEN 'FC_CNT' — 화면(기능 코드)과 코드(WHEN)의 계약을 직접 체결", {});
s.addNotes("정답 비노출. 숫자→문자 변환(CONDENSE) 후 CONCATENATE는 Day 2 확정 패턴의 재적용. 빠른 학생은 U19-D(선택 행 금액 — 두 값 연결).");

/* ===========================================================================
 * TP (37~59)
 * ======================================================================== */
/* 37. TP 표지 */
s = dark();
s.addText("🏁 Toy Project", { x: 0.9, y: 1.4, w: 8, h: 0.7, fontFace: F, fontSize: 32, bold: true, color: ACCENT, margin: 0 });
s.addText("14:00 ~ 17:30", { x: 0.9, y: 2.1, w: 5, h: 0.4, fontFace: F, fontSize: 15, color: ICE, margin: 0 });
s.addText("간이 주문 관리 프로그램 — ZEDU##_MAIN", { x: 0.9, y: 2.75, w: 11.5, h: 0.9, fontFace: F, fontSize: 34, bold: true, color: "FFFFFF", margin: 0 });
s.addText([{ text: "오전의 부품을 전부 조립합니다 — 3시간 뒤 여러분 화면에서 돌아갑니다.", options: { fontSize: 17, bold: true, color: "FFD9A0", breakLine: true, paraSpaceAfter: 10 } },
           { text: "TP-0 명세 → TP-1 골격 → TP-2 등록 → TP-3 수정 → TP-4 삭제 → TP-5 마무리·확장", options: { fontSize: 14, color: ICE } }],
  { x: 0.9, y: 3.95, w: 11.4, h: 1.4, fontFace: F, margin: 0 });
s.addNotes("TP-0에서 강사 완성본(ZEDU_MAIN_DEMO)으로 정상 흐름만 5분 시연: 기본 조회 20건 → 신규 등록 → 수량 수정·C 전환 → C/X 수정 거부 → N 삭제·확인 팝업. 코드를 설명하지 말고 3시간 뒤 만들 화면과 업무 규칙만 확인(강사가이드 TP-0).");

/* 38. TP-0 — 요구사항 */
s = light();
header(s, "TP-0", "최종 요구사항 — 이게 오늘의 결승선", "14:00~14:10");
tbl(s, [
  ["기능", "요구사항"],
  [{ text: "조회", b: true }, "주문번호/고객/주문일/상태 조건으로 조회 — 고객명·제품명·금액 포함 ALV"],
  [{ text: "등록", b: true }, "[등록] → 팝업 입력 → 검증(FM) → 주문번호 자동 채번 → INSERT → 메시지 → 목록 갱신"],
  [{ text: "수정", b: true }, "커서 행 → 팝업(수량/상태) → UPDATE — 완료(C) 수정 불가 · 상태는 N/C만 입력 가능"],
  [{ text: "삭제", b: true }, "커서 행 → 확인 팝업 → DELETE — 신규(N)만 삭제 가능"],
], { x: 0.55, y: 1.35, w: 12.25, colW: [1.6, 10.65], fontSize: 12, rowH: 0.55 });
card(s, 0.55, 4.3, 7.6, 1.35, "강사 시연 (5분)", "완성본으로 정상 흐름만 봅니다 — 3시간 뒤 여러분 화면에서 이게 돌아갑니다.", { bSize: 13 });
card(s, 8.35, 4.3, 4.45, 1.35, "취소(X) 처리는?", "확장 과제 — 여력 있는 분만\n(TP-5에서 안내)", { fill: "FDF3E3", tColor: "9A6A12", bSize: 12.5 });
s.addNotes("업무 규칙 3개(C 수정 불가·N/C만 입력·N만 삭제)를 시연 중 말로 강조. 취소 기능은 기본 과정에 없음(확정 설계) — 확장 1로만.");

/* 39. TP-1 — 복사 (GUI Status!) */
s = light();
header(s, "TP-1", "골격 조립 — U19를 MAIN으로 복사", "14:10~14:40");
bullets(s, [
  { t: "① SE38 → ZEDU##_U19 복사(Ctrl+F5) → ZEDU##_MAIN", b: true },
  { t: "② 복사 옵션: GUI Status 체크 필수! + Text elements 체크", b: true },
  { t: "③ 활성화 → 실행 → 버튼 3개가 (아직 더미 메시지로) 동작하는지 확인" },
], { x: 0.55, y: 1.3, w: 12.2, h: 1.9, fontSize: 14.5 });
banner(s, 0.55, 3.3, 12.25, "⚠️ GUI Status 체크를 빼먹으면 — 버튼 정의 MAIN이 복사되지 않아 오후 내내 버튼이 없습니다", {});
card(s, 0.55, 4.15, 12.25, 1.45, "복사 체인 완성 — LIST → U19 → MAIN", "문제가 생겨도 복사 체인을 바꾸지 않습니다. 이 구조가 재타이핑과 오타를 줄이는 장치입니다.\n(PF-STATUS 'MAIN'이 새 프로그램에도 있는지 SE41에서 확인 가능)", { fill: "FDF3E3", tColor: "9A6A12", bSize: 12.5 });
s.addNotes("체크포인트(강사가이드 TP-1): 10분 MAIN 실행 / 20분 기본 조회 20건 / 30분 버튼 표시·클릭 메시지. GUI Status 누락이 최다 사고 — 복사 직후 실행해서 버튼 3개부터 확인시키기.");

/* 40. TP-1 — 코드 산책 */
s = light();
header(s, "TP-1", "코드 산책 — 내 프로그램을 설명할 수 있나", "이해 점검");
bullets(s, [
  { t: "다음 3개에 답할 수 있으면 준비 완료 — 짝과 서로 설명해보기:", b: true },
  { t: "Q1.  실행(F8)부터 ALV가 뜨기까지 불리는 이벤트/FORM 순서는?" },
  { t: "Q2.  [수정] 버튼을 누르면 어느 FORM의 어느 WHEN으로 들어가나?" },
  { t: "Q3.  ps_selfield-tabindex가 0이 되는 경우는 언제인가?" },
], { x: 0.55, y: 1.35, w: 8.0, h: 3.0, fontSize: 14.5 });
card(s, 8.85, 1.35, 3.95, 3.0, "정답은 코드 안에", "전부 이미 배운 것 —\n이벤트 순서는 U14,\n콜백과 tabindex는 U19.\n\n설명이 막히는 곳이\n오후에 막힐 곳입니다.", { bSize: 12.5 });
banner(s, 0.55, 4.7, 12.25, "여기서 5분을 아끼지 마세요 — 구조를 말로 설명할 수 있어야 TODO를 채울 수 있습니다", {});
s.addNotes("Q1: INITIALIZATION → 선택화면 → START-OF-SELECTION → get_data → show_alv. Q2: FORM user_command의 WHEN 'FC_EDIT'. Q3: 커서가 데이터 행 밖일 때. — 학생이 말로 답하게 하고 슬라이드에는 답을 띄우지 않는다.");

/* 41. TP-1 — refresh 2줄 */
s = light();
header(s, "TP-1", "버튼 처리 후 목록 자동 갱신 — 2줄", "💻 실습");
codeBlock(s, { x: 0.55, y: 1.3, w: 8.4, h: 3.4, title: "FORM user_command 마지막에 추가", code: [
  "FORM user_command USING pv_ucomm    LIKE sy-ucomm",
  "                        ps_selfield TYPE slis_selfield.",
  "  CASE pv_ucomm.",
  "    ...기존 WHEN들...",
  "  ENDCASE.",
  "",
  "  PERFORM get_data.            \" ★ 추가: 처리 후 재조회",
  "  ps_selfield-refresh = 'X'.   \" ★ 추가: ALV 화면 갱신 지시",
  "ENDFORM.",
], fontSize: 10.5 });
card(s, 9.15, 1.3, 3.65, 3.4, "지금은 티가 안 나지만", "등록/수정/삭제가 붙는\n순간 \"처리 → 목록 즉시\n반영\"이 됩니다.\n\nCASE 밖(공통 후처리)에\n두는 것이 포인트 —\n어느 버튼이든 갱신.", { bSize: 12 });
banner(s, 0.55, 5.0, 12.25, "⏱ 체크포인트: 10분 MAIN 실행 → 20분 기본 조회 20건 → 30분 버튼 클릭 메시지", {});
s.addNotes("공통 후처리(재조회+refresh)를 CASE 밖에 두는 이유를 설명. 이 2줄이 TP-2 완성 판정('목록에 새 주문')의 전제.");

/* 42. TP-2 — 흐름도 */
s = light();
header(s, "TP-2", "등록 기능 — 흐름 먼저", "14:40~15:30");
flow(s, [
  ["[등록] 클릭", "FC_ADD", "6E7797"],
  ["팝업 입력", "POPUP_GET_VALUES"],
  ["FM 검증", "ORDER_CHECK"],
  ["채번", "MAX + 1"],
  ["INSERT", "+ COMMIT", GREEN],
  ["메시지·갱신", "s001 + refresh"],
], 1.45, { bh: 1.5, tSize: 11.5, sSize: 8.5 });
codeBlock(s, { x: 0.55, y: 3.35, w: 6.4, h: 1.35, title: "버튼 연결 — FC_ADD를 교체", code: [
  "    WHEN 'FC_ADD'.",
  "      PERFORM create_order.",
] });
card(s, 7.2, 3.35, 5.6, 1.35, "역할 분담", "팝업·값 꺼내기 = 주어진 코드 (그대로 입력)\n검증·채번·INSERT = ★ TODO (여러분 몫)", { fill: "FDF3E3", tColor: "9A6A12", bSize: 12 });
banner(s, 0.55, 5.05, 12.25, "⏱ 단계 마감: 15분 TODO A(검증) → 25분 TODO B(채번) → 35분 TODO C(INSERT까지 정상 등록)", {});
s.addNotes("고위험 TODO 분할(강사가이드 TP-2): A 15분 / B 25분 / C 35분. 각 마감 미달 시 체크포인트 코드 제공. 35분 이후 남은 15분은 반드시 통합 테스트 4종.");

/* 43. TP-2 — 주어진 코드: 팝업 (+D3-05) */
s = light();
header(s, "TP-2", "주어진 코드 — POPUP_GET_VALUES 입력 팝업", "💻 실습");
codeBlock(s, { x: 0.55, y: 1.3, w: 7.6, h: 4.55, title: "FORM create_order (앞부분) — 그대로 입력", code: [
  "  CLEAR ls_field.",
  "  ls_field-tabname = 'ZEDU##_ORDER'.  ls_field-fieldname = 'CUST_ID'.",
  "  ls_field-fieldtext = '고객 ID'.     ls_field-field_obl = 'X'.",
  "  APPEND ls_field TO lt_fields.",
  "  \" ...PROD_ID / QUANTITY / REMARK 3필드 동일 패턴...",
  "",
  "  CALL FUNCTION 'POPUP_GET_VALUES'",
  "    EXPORTING  popup_title = '주문 등록'",
  "    IMPORTING  returncode  = lv_rc",
  "    TABLES     fields      = lt_fields.",
  "  IF sy-subrc <> 0 OR lv_rc = 'A'.      \" 'A' = 팝업 취소",
  "    RETURN.",
  "  ENDIF.",
  "  READ TABLE lt_fields INTO ls_field INDEX 1.  lv_cust_id = ls_field-value.",
], fontSize: 9.5 });
card(s, 8.35, 1.3, 4.45, 1.95, "테이블 필드를 참조하면", "타입·F4 도움말까지 자동.\n팝업 필드 순서 = READ INDEX 순서\n(1 고객 / 2 제품 / 3 수량 / 4 비고)", { bSize: 11.5 });
shot(s, { x: 8.35, y: 3.45, w: 4.45, h: 2.4, id: "D3-05", cap: "주문 등록 — 고객/제품/수량/비고 4필드\n필수 표시 포함" });
s.addNotes("전문은 교재 TP-2 (2). 팝업 값은 문자 필드(sval-value)라 수량 대입 시 변환 주의(자주 막힘). lv_rc = 'A'는 사용자가 팝업을 취소한 경우.");

/* 44. TP-2 — ★ TODO A */
s = light();
header(s, "TP-2", "★ TODO A — FM 검증 (여러분 몫)", "✍️ 실습");
banner(s, 0.55, 1.12, 12.25, "⏱ 시작 15분: TODO A 활성 — 미달 시 체크포인트 코드 A 제공. 이 단계는 DB 변경 없음!", {});
codeBlock(s, { x: 0.55, y: 1.8, w: 8.4, h: 4.0, title: "요구사항 (스켈레톤 주석 그대로)", code: [
  "* ★ TODO A: 오전에 만든 FM 'ZEDU##_ORDER_CHECK'를 호출해 검증하세요.",
  "*   - EXPORTING: lv_cust_id / lv_prod_id / lv_qty",
  "*   - IMPORTING: lv_price",
  "*   - EXCEPTIONS: invalid_cust=1, invalid_prod=2, invalid_qty=3",
  "*   - CASE sy-subrc로 분기:",
  "*       1 -> MESSAGE s010(zedu##_msg) WITH lv_cust_id",
  "*            DISPLAY LIKE 'E'. RETURN.",
  "*       2 -> s011 + lv_prod_id 로 동일 패턴",
  "*       3 -> s012 로 동일 패턴 (WITH 없음)",
  "*       OTHERS -> '검증 중 오류가 발생했습니다.' 리터럴 후 RETURN",
], fontSize: 10 });
card(s, 9.15, 1.8, 3.65, 4.0, "재료는 전부 오전 것", "호출 골격 = U16 따라치기 ②\n메시지 = U18의 s010~s012\n+ DISPLAY LIKE 'E'\n\n오류 케이스마다\n\"빨간 메시지 + RETURN\"\n세트를 잊지 마세요.", { bSize: 12 });
s.addNotes("자주 막힘: WHEN OTHERS를 s012로 써서 수량 오류로 오진 — OTHERS는 리터럴 '검증 중 오류'. 팝업 입력과 오류 메시지만 시험(아직 INSERT 없음).");

/* 45. TP-2 — ★ TODO B·C */
s = light();
header(s, "TP-2", "★ TODO B·C — 채번과 INSERT", "✍️ 실습");
banner(s, 0.55, 1.12, 12.25, "⏱ 25분: TODO B(채번) → 35분: TODO C(정상 등록까지) — 미달 시 완성 조각을 붙이고 통합 테스트로", {});
codeBlock(s, { x: 0.55, y: 1.8, w: 8.4, h: 3.6, title: "요구사항 (스켈레톤 주석 그대로)", code: [
  "* ★ TODO B: 주문번호 채번 — 현재 최대 번호 + 1",
  "*   SELECT MAX( order_id ) 를 lv_order_id로 조회한 뒤 1을 더하세요.",
  "",
  "* ★ TODO C: ls_order를 채워 INSERT 하세요.",
  "*   - order_id/cust_id/prod_id/quantity/remark: 위 변수들",
  "*   - status = 'N', order_date = sy-datum, ernam = sy-uname",
  "*   - INSERT 성공(sy-subrc=0): COMMIT WORK",
  "*     + MESSAGE s001 WITH lv_order_id",
  "*     실패: ROLLBACK WORK + '등록 실패' 리터럴 메시지",
], fontSize: 10 });
card(s, 9.15, 1.8, 3.65, 3.6, "MAX+1은 교육용", "동시에 두 명이 등록하면\n같은 번호가 나올 수 있는\n방식 — 실무는 Number\nRange 채번을 씁니다.\n(한 줄만 알아두고 진행)", { fill: "FDF3E3", tColor: "9A6A12", bSize: 12 });
s.addNotes("MAX+1 동시성 이야기는 강사가이드 8-1 — 교육 단순화 설계임을 짧게 언급. INSERT 성공/실패의 COMMIT/ROLLBACK 짝은 U17 라운드의 재적용.");

/* 46. TP-2 — 완성 판정 */
s = light();
header(s, "TP-2", "완성 판정 — 등록이 \"된다\"의 기준", "⚠️ 점검");
bullets(s, [
  { t: "[등록] → C00001 / P0000002 / 3 입력 → 성공 메시지 + 목록에 새 주문", b: true },
  { t: "     (TP-1의 refresh 2줄 덕분 — 안 보이면 그쪽부터)", sub: true },
  { t: "없는 고객 C99999 → 빨간 메시지, INSERT 안 됨", b: true },
  { t: "SE16N에서도 새 주문 확인 (ALV와 DB가 일치)", b: true },
], { x: 0.55, y: 1.3, w: 7.0, h: 2.9, fontSize: 13.5 });
tbl(s, [
  ["#", "35분 이후 — 남은 15분 필수 시험"],
  ["1", "정상 등록 1건"],
  ["2", "없는 고객 또는 제품 1건"],
  ["3", "수량 0"],
  ["4", "SE16N과 ALV 목록 일치"],
], { x: 7.75, y: 1.3, w: 5.05, colW: [0.7, 4.35], fontSize: 11.5, rowH: 0.45 });
banner(s, 0.55, 4.5, 12.25, "💡 등록했는데 목록에 안 보인다? 조회 조건(기간)부터 의심 — 새 주문의 주문일은 \"오늘\"입니다", {});
s.addNotes("35분 전환 규칙(강사가이드): 미완료자는 A/B/C 완성 조각을 붙이고, 남은 15분은 반드시 통합 테스트 4종. 정상 등록 1건 + 오류 1건이 '절대 줄이지 않을 구간'.");

/* 47. TP-2 — 자주 막힘 */
s = light();
header(s, "TP-2", "여기서 자주 막힙니다", "⚠️ 점검");
tbl(s, [
  ["증상", "확인 / 해결"],
  ["수량이 이상하게 들어감", "POPUP 값은 문자 필드 — 수량 타입 변수로 받으며 변환 확인"],
  ["FM을 찾을 수 없음", "'ZEDU##_ORDER_CHECK'의 학생 번호 ## 오타"],
  ["수량 오류가 아닌데 s012가 나옴", "WHEN OTHERS를 s012로 쓰지 않았는지 — OTHERS는 리터럴"],
  ["등록 성공했는데 목록에 안 보임", "선택화면 기간 확인 — 새 주문의 주문일은 오늘"],
], { x: 0.55, y: 1.35, w: 12.25, colW: [4.4, 7.85], fontSize: 12, rowH: 0.55 });
banner(s, 0.55, 4.35, 12.25, "여기까지 되면 — 절반 왔습니다. 수정·삭제는 같은 재료의 반복입니다", { color: "DDE7F8", tcolor: NAVY });
s.addNotes("표는 강사가이드 TP-2 '자주 막힘' 4가지. TP-3·4는 TP-2에서 익힌 패턴(커서 행 READ + 규칙 차단 + 팝업 + DB 변경 + 메시지)의 변주임을 예고해 심리 부담을 낮춘다.");

/* 48. TP-3 — 흐름 */
s = light();
header(s, "TP-3", "수정 기능 — 방어부터", "15:45~16:30");
flow(s, [
  ["커서 행 확인", "tabindex + READ", "6E7797"],
  ["C·X면 거부", "업무 규칙", RED],
  ["팝업", "현재 값 표시"],
  ["값 검증", "수량·상태 N/C"],
  ["UPDATE", "+ COMMIT", GREEN],
  ["메시지·갱신", "s002 + refresh"],
], 1.45, { bh: 1.5, tSize: 11.5, sSize: 8.5 });
codeBlock(s, { x: 0.55, y: 3.35, w: 6.4, h: 1.35, title: "버튼 연결", code: [
  "    WHEN 'FC_EDIT'.",
  "      PERFORM change_order USING ps_selfield-tabindex.",
], fontSize: 10.5 });
card(s, 7.2, 3.35, 5.6, 1.35, "순서가 곧 설계", "팝업을 띄우기 전에 행 확인·규칙 차단이 먼저 —\n\"안 되는 것은 빨리 거절\"이 좋은 UI입니다.", { fill: "FDF3E3", tColor: "9A6A12", bSize: 12 });
banner(s, 0.55, 5.05, 12.25, "업무 규칙: 완료(C) 수정 불가 · 취소(X) 수정 불가 · 상태는 N/C만 입력 가능 · 수량은 1 이상", {});
s.addNotes("업무 규칙을 먼저 시험(강사가이드 TP-3): N만 팝업 진입, C는 s020, X는 리터럴, 상태 N/C만, 수량 1 이상. 체크포인트: 10분 커서 행 / 18분 C·X 차단 / 28분 팝업·검증 / 38분 UPDATE / 마지막 7분 시나리오.");

/* 49. TP-3 — ★ TODO A·B */
s = light();
header(s, "TP-3", "★ TODO A·B — 행 확인과 상태 차단", "✍️ 실습");
codeBlock(s, { x: 0.55, y: 1.3, w: 8.4, h: 4.1, title: "요구사항 (스켈레톤 주석 그대로)", code: [
  "* ★ TODO A: 커서 행 확인 — U19에서 배운 패턴",
  "*   - pv_index가 0이면 MESSAGE i022(zedu##_msg) 후 RETURN",
  "*   - READ TABLE gt_list INTO gs_list INDEX pv_index.",
  "*     실패(sy-subrc<>0)해도 i022 + RETURN",
  "",
  "* ★ TODO B: 업무 규칙 — 완료(C)·취소(X) 주문은 수정 금지",
  "*   - gs_list-status = 'C' 이면",
  "*     MESSAGE s020(zedu##_msg) DISPLAY LIKE 'E' 후 RETURN",
  "*   - gs_list-status = 'X' 이면 아래 리터럴 메시지 후 RETURN",
  "*     MESSAGE '취소된 주문은 수정할 수 없습니다.'",
  "*       TYPE 'S' DISPLAY LIKE 'E'.",
], fontSize: 10 });
card(s, 9.15, 1.3, 3.65, 4.1, "X 차단은 일부러 리터럴", "정식 메시지(020)와\n임시 리터럴을 나란히 —\n둘의 차이를 몸으로.\n\n별도 메시지 클래스 항목을\n추가하지 않습니다.\n\n방어가 끝나기 전에는\n팝업이 뜨면 안 됩니다.", { fill: "FDF3E3", tColor: "9A6A12", bSize: 11.5 });
s.addNotes("확정 설계: X 차단은 리터럴이며 별도 메시지 클래스 항목을 만들지 않는다. TODO A는 U19 패턴 재적용 — 여기서 막히면 U19 콜백 FORM을 다시 보게 안내.");

/* 50. TP-3 — 주어진 코드 + ★ TODO C */
s = light();
header(s, "TP-3", "주어진 코드(팝업) + ★ TODO C(검증)", "💻 실습");
codeBlock(s, { x: 0.55, y: 1.3, w: 8.4, h: 4.3, title: "수정 팝업 — 현재 값을 미리 채워서 보여줌", code: [
  "  CLEAR ls_field.",
  "  ls_field-tabname = 'ZEDU##_ORDER'.  ls_field-fieldname = 'QUANTITY'.",
  "  ls_field-fieldtext = '수량'.",
  "  ls_field-value = gs_list-quantity.  CONDENSE ls_field-value.",
  "  APPEND ls_field TO lt_fields.",
  "  \" ...STATUS 필드('상태(N/C)') 동일 패턴 + POPUP_GET_VALUES...",
  "",
  "* ★ TODO C: 입력값 검증",
  "*   - lv_qty <= 0  -> MESSAGE s012(zedu##_msg)",
  "*                     DISPLAY LIKE 'E' + RETURN",
  "*   - lv_status가 'N'도 'C'도 아니면",
  "*     -> s013 WITH lv_status DISPLAY LIKE 'E' + RETURN",
], fontSize: 10 });
card(s, 9.15, 1.3, 3.65, 4.3, "CONDENSE가 왜?", "수량은 숫자 타입 —\n팝업의 문자 필드에\n넣으면 공백이 생겨서\nCONDENSE로 정리.\n\n숫자→문자 변환 패턴이\n여기서도 등장합니다.\n\n상태 'Z' 입력 시\ns013이 막아야 합니다.", { bSize: 11.5 });
s.addNotes("팝업 전문은 교재 TP-3 (2). 현재 값을 미리 채워 보여주는 UX(value 세팅)가 포인트. TODO C의 s013은 WITH lv_status로 잘못 입력값을 보여준다.");

/* 51. TP-3 — ★ TODO D + 완성 판정 */
s = light();
header(s, "TP-3", "★ TODO D(UPDATE) — 완성 판정", "✍️ 실습");
codeBlock(s, { x: 0.55, y: 1.3, w: 7.2, h: 2.5, title: "요구사항 (스켈레톤 주석 그대로)", code: [
  "* ★ TODO D: UPDATE — 해당 주문의 quantity와",
  "*   status를 SET ... WHERE로 갱신",
  "*   - WHERE order_id = gs_list-order_id",
  "*   - 성공: COMMIT WORK + MESSAGE s002 WITH ...",
  "*   - 실패: ROLLBACK WORK + '수정 실패' 리터럴",
], fontSize: 10 });
card(s, 8.05, 1.3, 4.75, 2.5, "U17의 어느 방법?", "방법 B — UPDATE SET ... WHERE.\n두 필드(quantity, status)만\n콕 집어 갱신합니다.", { bSize: 12.5 });
tbl(s, [
  ["완성 판정 — 5가지 전부", ""],
  ["N 주문 수량 변경", "→ 목록 반영"],
  ["상태를 C로 → 그 주문 재수정", "→ 빨간 규칙 메시지(020)"],
  ["X 주문 수정 시도", "→ 리터럴 메시지로 거부"],
  ["상태에 'Z' 입력", "→ s013"],
  ["빈 행에서 [수정]", "→ i022"],
], { x: 0.55, y: 4.05, w: 12.25, colW: [5.0, 7.25], fontSize: 11.5, rowH: 0.42 });
s.addNotes("판정 5가지는 교재 TP-3 완성 판정. 마지막 7분: N 수정 → C 전환 → C 재수정 거부 → X 수정 거부 순서로 통으로 시험(강사가이드).");

/* 52. TP-3 — 체크포인트 */
s = light();
header(s, "TP-3", "권장 체크포인트 — 45분의 지도", "⚠️ 점검");
tbl(s, [
  ["시점", "되어 있어야 하는 것"],
  ["10분", "커서 행 읽기 (TODO A)"],
  ["18분", "C/X 선행 차단 (TODO B)"],
  ["28분", "팝업 값 읽기와 검증 (TODO C)"],
  ["38분", "UPDATE / COMMIT / 메시지 (TODO D)"],
  ["마지막 7분", "N 수정 → C 전환 → C 재수정 거부 → X 수정 거부"],
], { x: 0.55, y: 1.35, w: 12.25, colW: [2.2, 10.05], fontSize: 12, rowH: 0.5 });
banner(s, 0.55, 4.5, 12.25, "지키는 것: X 차단은 리터럴 · 별도 메시지 항목 추가 없음 · 취소 기능은 기본 과정에 추가하지 않음(확장 1)", {});
s.addNotes("강사가이드 TP-3 권장 체크포인트. C/X 수정 거부 경험은 '절대 줄이지 않을 구간'(2-3) — 업무 규칙 검증 경험이 이 과정의 핵심 가치.");

/* 53. TP-4 — 흐름 */
s = light();
header(s, "TP-4", "삭제 기능 — 확인 팝업까지", "16:30~17:10");
flow(s, [
  ["커서 행 확인", "tabindex + READ", "6E7797"],
  ["N만 허용", "아니면 s021", RED],
  ["확인 팝업", "POPUP_TO_CONFIRM"],
  ["응답 '1' 확인", "'1' = [예]"],
  ["DELETE", "+ COMMIT", GREEN],
  ["메시지·갱신", "s003 + refresh"],
], 1.45, { bh: 1.5, tSize: 11.5, sSize: 8.5 });
codeBlock(s, { x: 0.55, y: 3.35, w: 6.4, h: 1.35, title: "버튼 연결", code: [
  "    WHEN 'FC_DEL'.",
  "      PERFORM delete_order USING ps_selfield-tabindex.",
], fontSize: 10.5 });
card(s, 7.2, 3.35, 5.6, 1.35, "지우는 건 되돌릴 수 없다", "그래서 ① 신규(N)만 ② 사용자에게 한 번 더 확인 —\n삭제는 항상 이중 방어입니다.", { fill: "FDF3E3", tColor: "9A6A12", bSize: 12 });
banner(s, 0.55, 5.05, 12.25, "순서 주의 — 상태 검사가 팝업보다 먼저! (팝업부터 띄우는 실수가 최다)", {});
s.addNotes("핵심 순서(강사가이드 TP-4): 행 선택 → N 검사 → 확인 팝업 → 응답 1 확인 → DELETE → COMMIT/ROLLBACK → 메시지 → 갱신. C/X 검사 전에 팝업부터 띄우는 실수가 가장 잦다.");

/* 54. TP-4 — TODO A·B + 주어진 코드 (+D3-06) */
s = light();
header(s, "TP-4", "★ TODO A·B + 주어진 코드(확인 팝업)", "💻 실습");
codeBlock(s, { x: 0.55, y: 1.3, w: 7.6, h: 4.55, title: "FORM delete_order — 방어 2개는 여러분 몫", code: [
  "* ★ TODO A: 커서 행 확인 (TP-3의 TODO A와 동일 패턴",
  "*           — 이제 안 보고도 쓸 수 있죠?)",
  "* ★ TODO B: 신규(N)만 삭제 가능",
  "*   - gs_list-status <> 'N' 이면",
  "*     MESSAGE s021(zedu##_msg) DISPLAY LIKE 'E' + RETURN",
  "",
  "  CALL FUNCTION 'POPUP_TO_CONFIRM'    \" [주어진 코드]",
  "    EXPORTING",
  "      titlebar              = '삭제 확인'",
  "      text_question         = lv_text",
  "      text_button_1         = '예'",
  "      text_button_2         = '아니오'",
  "      default_button        = '2'",
  "      display_cancel_button = ' '",
  "    IMPORTING",
  "      answer                = lv_answer",
  "    EXCEPTIONS",
  "      OTHERS                = 2.",
  "  IF sy-subrc <> 0.",
  "    RETURN.",
  "  ENDIF.",
  "  IF lv_answer <> '1'.                \" '1' = [예]",
  "    RETURN.",
  "  ENDIF.",
], fontSize: 8.8 });
card(s, 8.35, 1.3, 4.45, 1.95, "default_button = '2'", "기본 선택이 [아니오] —\n엔터를 급하게 쳐도 안 지워지는 안전 설계.", { bSize: 11.5 });
shot(s, { x: 8.35, y: 3.45, w: 4.45, h: 2.4, id: "D3-06", cap: "주문번호 질문 + [예] [아니오]\n기본 선택 [아니오]" });
s.addNotes("전문은 교재 TP-4 (2) — display_cancel_button = ' '와 sy-subrc 확인 포함. lv_text는 CONCATENATE로 주문번호를 넣어 조립(주어진 코드).");

/* 55. TP-4 — ★ TODO C + 자주 막힘 */
s = light();
header(s, "TP-4", "★ TODO C(DELETE) — 자주 막힘", "✍️ 실습");
codeBlock(s, { x: 0.55, y: 1.3, w: 12.25, h: 1.55, title: "요구사항 (스켈레톤 주석 그대로)", code: [
  "* ★ TODO C: DELETE FROM ... WHERE order_id = gs_list-order_id",
  "*   - 성공: COMMIT WORK + MESSAGE s003 WITH gs_list-order_id",
  "*   - 실패: ROLLBACK WORK + '삭제 실패' 리터럴",
], fontSize: 10.5 });
tbl(s, [
  ["증상", "확인 / 해결"],
  ["규칙 메시지 없이 팝업부터 뜸", "N 상태 검사가 팝업보다 먼저"],
  ["팝업 호출 자체가 실패했는데 진행", "POPUP_TO_CONFIRM의 sy-subrc 확인"],
  ["[아니오]를 눌렀는데 지워짐", "응답값 해석 반대 — '1'만 [예]"],
  ["여러 건이 지워짐", "DELETE WHERE에 주문번호 조건 누락"],
], { x: 0.55, y: 3.2, w: 12.25, colW: [5.0, 7.25], fontSize: 12, rowH: 0.5 });
banner(s, 0.55, 5.8, 12.25, "DELETE의 WHERE를 한 번 더 소리 내어 읽기 — 조건이 빠지면 전체 삭제!", {});
s.addNotes("표는 강사가이드 TP-4 '자주 막힘' 4가지. WHERE 없는 DELETE 경고는 U17과 수미상관.");

/* 56. TP-4 — 완성 판정 */
s = light();
header(s, "TP-4", "완성 판정 — 삭제가 \"된다\"의 기준", "⚠️ 점검");
tbl(s, [
  ["시험", "기대 결과"],
  ["N 주문 + [예]", "삭제 — 목록에서 사라짐 + SE16N 확인"],
  ["N 주문 + [아니오]", "아무 일 없음 (그대로 유지)"],
  ["C/X 주문 삭제 시도", "팝업이 뜨기 전에 규칙 메시지(s021)"],
  ["빈 행에서 [삭제]", "i022 안내"],
], { x: 0.55, y: 1.35, w: 12.25, colW: [3.6, 8.65], fontSize: 12.5, rowH: 0.55 });
banner(s, 0.55, 4.35, 12.25, "4가지 전부 통과하면 — CRUD가 완성되었습니다. TP-5에서 처음부터 끝까지 통으로 점검!", { color: "DDE7F8", tcolor: NAVY });
s.addNotes("판정(강사가이드 TP-4): N+예 삭제 / N+아니오 유지 / C·X는 팝업 전 규칙 메시지 / 빈 행 022. 여기까지 되면 최종 시나리오로.");

/* 57. TP-5 — 최종 점검 시나리오 */
s = light();
header(s, "TP-5", "최종 점검 시나리오 — 처음부터 끝까지 통으로", "17:10~17:30");
tbl(s, [
  ["#", "하는 일", "확인"],
  ["1", "조회 (상태 N)", "신규 주문만 표시"],
  ["2", "등록 — 정상 1건 + 오류 케이스 2개", "성공 메시지 / 빨간 메시지"],
  ["3", "방금 등록한 주문 수량 수정", "목록 반영"],
  ["4", "상태 C로 변경", "목록 반영"],
  ["5", "그 주문 수정 재시도", "거부됨 (020)"],
  ["6", "다른 N 주문 삭제", "확인 팝업 → 삭제"],
  ["7", "SE16N으로 최종 데이터 확인", "ALV와 DB 일치"],
], { x: 0.55, y: 1.3, w: 12.25, colW: [0.7, 6.5, 5.05], fontSize: 11.5, rowH: 0.42 });
banner(s, 0.55, 5.15, 12.25, "7단계 전부 통과하면 — 완성입니다! (확장 과제는 통과한 사람만)", {});
s.addNotes("기본 통합 시나리오를 통과하지 않은 학생에게 확장 과제를 주지 않는다(강사가이드 TP-5). 먼저 메시지·정렬·선택 텍스트·오류 흐름을 정리.");

/* 58. 완성 축하 (dark) */
s = dark();
s.addText("완성입니다. 축하합니다! 🎉", { x: 0.9, y: 2.1, w: 11.5, h: 0.9, fontFace: F, fontSize: 40, bold: true, color: "FFFFFF", margin: 0 });
s.addText("여러분은 오늘 실무 리포트 개발의 전체 사이클을 한 바퀴 돌았습니다.", { x: 0.9, y: 3.2, w: 11.4, h: 0.55, fontFace: F, fontSize: 19, color: "FFD9A0", margin: 0 });
s.addText("SE11 테이블 설계  →  검증 FM  →  CRUD  →  메시지  →  버튼 이벤트  →  조회·등록·수정·삭제", { x: 0.9, y: 4.05, w: 11.4, h: 0.5, fontFace: F, fontSize: 15, color: ICE, margin: 0 });
s.addText("ZEDU##_MAIN — 여러분의 첫 업무 프로그램", { x: 0.9, y: 4.85, w: 11.4, h: 0.45, fontFace: F, fontSize: 13, color: "8FA2D9", margin: 0 });
s.addNotes("교재 TP-5의 축하 멘트. '3일 동안 문법을 다 배웠다'가 아니라 '업무 프로그램의 전체 연결 구조를 한 번 완주했다'로 정리(강사가이드 랩업).");

/* 59. TP-5 — 확장 과제 6종 */
s = light();
header(s, "TP-5", "확장 과제 6종 — 남은 시간·자습용 (난이도 순)", "심화");
tbl(s, [
  ["#", "과제", "힌트"],
  ["1", "[주문 취소] 버튼 (FC_CANCEL) — 신규(N)를 X로", "오늘 배운 것만으로 가능"],
  ["2", "더블클릭 시 주문 상세를 I 메시지로", { text: "기능 코드 &IC1", opts: { fontFace: FC } }],
  ["3", "금액 합계 행", { text: "필드 카탈로그 do_sum", opts: { fontFace: FC } }],
  ["4", "상태별 행 색상", { text: "layout-info_fieldname", opts: { fontFace: FC } }],
  ["5", "체크박스 다중 선택 삭제", { text: "layout-box_fieldname", opts: { fontFace: FC } }],
  ["6", "get_data를 new Open SQL로 리팩터링", "콤마 · @ · 인라인 선언"],
], { x: 0.55, y: 1.3, w: 12.25, colW: [0.7, 6.8, 4.75], fontSize: 11.5, rowH: 0.46 });
banner(s, 0.55, 4.85, 12.25, "기본 시나리오 7단계 통과자만! — 풀이와 해설은 퀴즈집 \"TP-5 확장 과제\" 절에", {});
s.addNotes("확장 4·5는 출력 스트럭처에 기술 필드를 추가하므로 강사가 기준본에서 먼저 시험한 경우에만 수업 중 권한다(강사가이드 TP-5). 권장 순서 1→6.");

/* ===========================================================================
 * 수료 랩업 (60~62)
 * ======================================================================== */
/* 60. 3일 지나온 길 */
s = light();
header(s, "랩업", "3일 동안 지나온 길", "마무리");
tbl(s, [
  ["", "배운 것", "만든 것"],
  [{ text: "Day 1", b: true }, "문법 기초, 디버거, SE11", "도메인 · DE · 테이블 · 스트럭처"],
  [{ text: "Day 2", b: true }, "내부 테이블, Open SQL, 선택화면, 이벤트, ALV", { text: "조회 프로그램 (ZEDU##_LIST)", b: true }],
  [{ text: "Day 3", b: true }, "FM, CRUD, 메시지, 버튼 이벤트", { text: "주문 관리 프로그램 완성 (ZEDU##_MAIN)", b: true }],
], { x: 0.55, y: 1.35, w: 12.25, colW: [1.4, 5.6, 5.25], fontSize: 12.5, rowH: 0.55 });
card(s, 0.55, 3.9, 12.25, 1.9, "말로 답해보세요 — 마무리 점검 6문항", "① 상태 필드는 어디에서 정의했나?   ② 고객명은 어느 테이블에서 JOIN했나?   ③ 등록 전 검증은 어디에서 했나?\n④ 버튼 클릭은 어느 FORM으로 들어오나?   ⑤ DB 변경을 확정하는 문장은?   ⑥ 표준 업무 데이터를 바꿀 때는 무엇을 써야 하나?", { bSize: 12 });
s.addNotes("6문항은 강사가이드 수료 랩업 — 학생에게 순서대로 던진다. 답: ① SE11 도메인(고정값) ② ZEDU_CUST ③ FM ZEDU##_ORDER_CHECK ④ user_command ⑤ COMMIT WORK ⑥ BAPI(표준 함수). 슬라이드에 답을 띄우지 않는다.");

/* 61. 다음 공부 로드맵 */
s = light();
header(s, "랩업", "다음에 공부할 것 (추천 순서)", "마무리");
tbl(s, [
  ["#", "주제", "왜"],
  ["1", "객체지향 ABAP (클래스/메서드)", "모던 ABAP의 기본 전제"],
  ["2", "CL_GUI_ALV_GRID / SALV", "오늘 쓴 REUSE의 OO 버전"],
  ["3", "Dynpro(화면) 개발", "팝업 FM 대신 진짜 입력 화면"],
  ["4", "BAPI / BADI / Enhancement", "표준을 안전하게 확장하는 법"],
  ["5", "CDS View → RAP", "S/4HANA 세대의 개발 모델"],
  ["6", "트랜스포트(CTS) · 네이밍 · 성능 기초", "실무 투입 전 필수"],
], { x: 0.55, y: 1.3, w: 12.25, colW: [0.7, 5.8, 5.75], fontSize: 12, rowH: 0.48 });
banner(s, 0.55, 4.7, 12.25, "\"문법을 다 배웠다\"가 아니라 — \"업무 프로그램의 전체 연결 구조를 한 번 완주했다\"", { color: "DDE7F8", tcolor: NAVY });
s.addNotes("로드맵은 교재 수료 랩업 + 강사가이드 11-4. 마지막 10분에 OOP → OO ALV/SALV → CDS → RAP 경로를 보여준다.");

/* 62. 마지막 */
s = dark();
s.addText("수료를 축하합니다! 🎉", { x: 0.9, y: 2.0, w: 11.5, h: 0.9, fontFace: F, fontSize: 44, bold: true, color: "FFFFFF", margin: 0 });
s.addText("오늘 완성한 ZEDU##_MAIN을 지우지 마세요.", { x: 0.9, y: 3.3, w: 11.4, h: 0.6, fontFace: F, fontSize: 24, bold: true, color: ACCENT, margin: 0 });
s.addText("여러분의 첫 포트폴리오입니다.", { x: 0.9, y: 4.0, w: 11.4, h: 0.5, fontFace: F, fontSize: 18, color: ICE, margin: 0 });
s.addText("문법 → 데이터 → 화면 — 업무 프로그램의 전체 사이클을 완주했습니다.", { x: 0.9, y: 5.2, w: 11.4, h: 0.45, fontFace: F, fontSize: 13, color: "8FA2D9", margin: 0 });
s.addNotes("교재 마지막 문장: '오늘 완성한 ZEDU##_MAIN을 지우지 마세요. 여러분의 첫 포트폴리오입니다.' 수고 인사와 함께 과정 종료.");

/* --------------------------------------------------------------------------- */
pres.writeFile({ fileName: OUT }).then(() => console.log("OK: " + OUT));
