"""Generate the public, fictional two-page SSD Blueprint sample.

Requires reportlab and pypdf. This script does not contain client data.
Run from any directory; output is written into the repository's public folder.
"""

from pathlib import Path
import os

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph
from pypdf import PdfReader


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "SSD-Illustrative-AI-Blueprint.pdf"
FONT_CANDIDATES = [
    Path(os.environ.get("CODEX_PRIMARY_RUNTIME_NODE_MODULES", "/opt/codex/runtimes/codex-primary-runtime/dependencies/node/node_modules")) / "pdfjs-dist" / "standard_fonts",
    Path("/usr/share/fonts/truetype/liberation2"),
    Path("/usr/share/fonts/truetype/liberation"),
]
FONT_ROOT = next(p for p in FONT_CANDIDATES if (p / "LiberationSans-Regular.ttf").exists())
pdfmetrics.registerFont(TTFont("SSD", str(FONT_ROOT / "LiberationSans-Regular.ttf")))
pdfmetrics.registerFont(TTFont("SSD-Bold", str(FONT_ROOT / "LiberationSans-Bold.ttf")))
pdfmetrics.registerFontFamily("SSD", normal="SSD", bold="SSD-Bold")

W, H = A4
M = 38
CW = W - 2 * M
IVORY = "#F8F7F2"
NAVY = "#102B48"
COBALT = "#2059E8"
INK = "#344B60"
PALE = "#E7EEFF"
RULE = "#D6DDE5"
WHITE = "#FFFFFF"
C = canvas.Canvas(str(OUT), pagesize=A4, pageCompression=1)
C.setTitle("Swift Sense Digital | Illustrative AI Transformation Blueprint")
C.setAuthor("Swift Sense Digital")
C.setSubject("Fictional example: opportunity priorities, phased roadmap and reporting pilot brief. Not a client case study or fixed implementation scope.")


def box(x, top, width, height, color):
    C.setFillColor(HexColor(color))
    C.rect(x, H - top - height, width, height, stroke=0, fill=1)


def rule(top, x=M, width=CW, color=RULE):
    C.setStrokeColor(HexColor(color))
    C.setLineWidth(0.65)
    C.line(x, H - top, x + width, H - top)


def text(value, x, top, size=11, bold=False, color=INK):
    C.setFont("SSD-Bold" if bold else "SSD", size)
    C.setFillColor(HexColor(color))
    C.drawString(x, H - top - size, value)


def para(value, x, top, width, size=11, leading=15, color=INK, bold=False, max_height=None):
    p = Paragraph(value, ParagraphStyle("body", fontName="SSD-Bold" if bold else "SSD", fontSize=size, leading=leading, textColor=HexColor(color)))
    _, height = p.wrap(width, 1200)
    if max_height is not None:
        assert height <= max_height, (value, height, max_height)
    p.drawOn(C, x, H - top - height)
    return height


def page_start(number):
    box(0, 0, W, H, IVORY)
    box(M, 34, 4, 30, COBALT)
    text("Swift Sense Digital", M + 13, 32, 18, True, NAVY)
    text("Business First. AI Enabled. Results Driven.", M + 13, 55, 9.5)
    box(W - M - 126, 36, 126, 21, PALE)
    text("ILLUSTRATIVE SAMPLE", W - M - 118, 42, 8.8, True, COBALT)
    rule(79)
    rule(775)
    text("AI Transformation Blueprint", M, 787, 9, True, NAVY)
    text(f"SAMPLE / {number} OF 2", W - M - 77, 787, 8.5, True, COBALT)
    text("Blueprint from S$8,000 one-off | Typically four weeks for assessment and planning.", M, 804, 8.6)
    text("Implementation quoted separately | Optional partnership from S$2,000/month.", M, 817, 8.6)


page_start(1)
text("Make the next AI decision clearer.", M, 101, 25, True, NAVY)
para("A sample of how business needs become priorities, dependencies and an actionable roadmap.", M, 137, CW, 12, 16, max_height=32)

box(M, 184, CW, 59, PALE)
para("<b>Fictional scenario:</b> a service SME prepares weekly management reports manually, keeps SOPs across shared files and answers recurring customer enquiries. This is an example, not an actual client project, measured result or fixed scope.", M + 13, 193, CW - 26, 10.5, 13.5, max_height=40.5)

text("01 / PRIORITISED OPPORTUNITIES", M, 254, 10, True, COBALT)
text("Qualitative estimates for this fictional scenario; validate during discovery.", M, 272, 9.5)

table_top = 294
col = [M, M + 37, M + 235, M + 349, M + CW]
box(M, table_top, CW, 29, NAVY)
for label, x in [("#", col[0] + 10), ("Opportunity", col[1] + 9), ("Value / effort", col[2] + 9), ("Readiness condition", col[3] + 9)]:
    text(label, x, table_top + 8, 9.5, True, WHITE)
rows = [
    ("P1", "Weekly management-report draft", "Reporting / administration", "Medium value<br/>Low-medium effort", "Reliable, consistent input data; an agreed reporting format and reviewer."),
    ("P2", "Internal knowledge assistant", "Finding policies and SOPs", "High value<br/>Medium effort", "Clean, current SOPs and defined access permissions before testing."),
    ("P3", "Enquiry triage", "Customer response / handoff", "Medium value<br/>Medium effort", "Approved FAQs, clear escalation rules and a person responsible for handoff."),
]
for i, (rank, title, category, sizing, ready) in enumerate(rows):
    top = table_top + 29 + i * 72
    box(M, top, CW, 72, WHITE if i % 2 == 0 else "#F0F3F7")
    text(rank, col[0] + 8, top + 12, 11, True, COBALT)
    para(title, col[1] + 9, top + 10, 180, 11, 14, NAVY, True, 28)
    para(category, col[1] + 9, top + 43, 180, 9.4, 12, max_height=24)
    para(sizing, col[2] + 9, top + 12, 96, 10, 14, max_height=42)
    para(ready, col[3] + 9, top + 10, CW - 349 - 18, 10, 13.5, max_height=54)
    rule(top + 72)

text("02 / PHASED ROADMAP", M, 559, 10, True, COBALT)
gap = 12
card_width = (CW - 2 * gap) / 3
roadmap = [
    ("01", "Validate the baseline", "Confirm current work, owners, input quality and access. Agree what improvement would mean."),
    ("02", "Pilot one report draft", "Test a small reporting workflow. A named reviewer checks every draft before anyone uses it."),
    ("03", "Review before expanding", "Compare quality, effort and staff adoption with the baseline. Decide what to improve or try next."),
]
for i, (num, title, body) in enumerate(roadmap):
    x = M + i * (card_width + gap)
    box(x, 582, card_width, 127, NAVY)
    text(num, x + 12, 594, 11, True, "#ABC5FF")
    para(title, x + 12, 618, card_width - 24, 11, 14, WHITE, True, 28)
    para(body, x + 12, 651, card_width - 24, 10, 13, WHITE, max_height=52)

para("<b>Assumptions to test:</b> the team has repeatable work, usable source information, permission to use it and time for review. Priority order may change after discovery. No tools, budgets, benefits or delivery dates are committed by this sample.", M, 726, CW, 10.3, 14, max_height=42)
C.showPage()

page_start(2)
text("From a priority to a scoped pilot.", M, 101, 25, True, NAVY)
para("Illustrative implementation brief / P1: weekly management-report draft", M, 140, CW, 12, 16, color=COBALT, bold=True, max_height=32)

box(M, 179, CW, 77, NAVY)
text("THE WORK TO TEST", M + 15, 192, 9, True, "#ABC5FF")
para("Create a draft weekly summary from approved operational data, using an agreed template. Keep source references visible and flag missing or conflicting inputs for human review.", M + 15, 212, CW - 30, 11.4, 15.5, WHITE, max_height=31)

left = M
right = M + 271
width = 248

text("INPUTS & BOUNDARIES", left, 277, 10, True, COBALT)
para("Approved weekly data exports, an existing report template and a glossary of agreed definitions. Use only agreed fields and access. Exclude unnecessary personal or confidential data.", left, 299, width, 10.7, 14.5, max_height=72.5)
text("OWNERS TO CONFIRM", right, 277, 10, True, COBALT)
para("<b>Sponsor:</b> business leader<br/><b>Process owner:</b> operations or finance lead<br/><b>Reviewer:</b> nominated manager<br/><b>Access owner:</b> system or data administrator", right, 299, width, 10.7, 14.5, max_height=72.5)

rule(385)
text("HUMAN REVIEW IN THE WORKFLOW", M, 402, 10, True, COBALT)
para("Approved inputs enter a controlled draft workflow. The reviewer checks the numbers, source references and wording, resolves exceptions, then approves the report for sharing. No automatic external sending or business decisions.", M, 424, CW, 11, 15, max_height=45)

text("ACCEPTANCE CHECKS", left, 490, 10, True, COBALT)
para("Figures reconcile to source data. Missing information is flagged. Claims have traceable sources. Access rules hold. The owner can correct, approve or reject a draft. Test thresholds are agreed before the pilot.", left, 512, width, 10.7, 14.5, max_height=72.5)
text("SUCCESS MEASURES", right, 490, 10, True, COBALT)
para("Compare with the agreed baseline: preparation and review time, correction volume, completeness and on-time delivery. Ask staff whether the workflow helps. No improvement is assumed in advance.", right, 512, width, 10.7, 14.5, max_height=72.5)

box(M, 605, CW, 72, PALE)
text("CONTINUE, REWORK OR STOP", M + 13, 617, 10, True, COBALT)
para("Continue only when the agreed quality checks pass and the team can own the workflow. Rework poor inputs or unclear instructions. Pause if reliability, access or review effort makes the pilot unsuitable.", M + 13, 637, CW - 26, 10.7, 14.5, max_height=29)

para("<b>Costs to scope:</b> data preparation, setup and integration, tool subscriptions or usage, training, monitoring and support. Amounts depend on the agreed design and delivery responsibilities.", M, 695, CW, 10.5, 14, max_height=28)
para("<b>Illustrative only.</b> This is a planning example, not a live solution or client result. Any implementation requires its own confirmed scope, acceptance criteria, quote and approval.", M, 737, CW, 10.3, 14, max_height=28)
C.showPage()
C.save()

reader = PdfReader(str(OUT))
assert len(reader.pages) == 2
content = "\n".join(page.extract_text() for page in reader.pages)
for required in ["ILLUSTRATIVE SAMPLE", "Fictional scenario", "not an actual client project", "Medium value", "Low-medium effort", "High value", "Review before expanding", "No improvement is assumed", "Implementation quoted separately", "S$2,000/month", "S$8,000 one-off"]:
    assert required in content, required
for page in reader.pages:
    assert "ILLUSTRATIVE SAMPLE" in page.extract_text()
print(OUT)
print("Validated: two pages, fictional labels on each page, approved commercial boundaries.")
