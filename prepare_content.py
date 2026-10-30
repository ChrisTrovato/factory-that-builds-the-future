"""Build the public website content from the finished, approved reader edition.

No third-party packages are required. Run from any working directory with
``python path/to/prepare_content.py``. The script never copies the private
editable-source archive, attachments, research scratch files, or production logs.
"""

from __future__ import annotations

import hashlib
import html
from html.parser import HTMLParser
import json
import math
from pathlib import Path
import re
import shutil
import unicodedata


SITE = Path(__file__).resolve().parent
WORKSPACE = SITE.parent.parent
OUTPUTS = WORKSPACE / "outputs"
PUBLIC = SITE / "public"
CHAPTERS = WORKSPACE / "work" / "chapters"
PUBLIC_EDITION = SITE / "public-edition"
if not (PUBLIC_EDITION / "outputs" / "Factory_That_Builds_the_Future_Reader.html").exists():
    raise RuntimeError("Public edition missing. Run build_public_edition.py first; the website builder will not publish private originals.")
OUTPUTS = PUBLIC_EDITION / "outputs"
CHAPTERS = PUBLIC_EDITION / "work" / "chapters"
READER = OUTPUTS / "Factory_That_Builds_the_Future_Reader.html"

DESCRIPTIONS = {
    0: "Begin with a stubborn mechanism on a workbench, then follow its connections to robotic shipyards, lunar industry, and your own engineering education.",
    1: "Discover the feedback loop through which useful machines help build more capability. Meet MERIDIAN, the fictional inspection carrier that makes the book's industrial questions tangible.",
    2: "Trace the accumulated ability to repeat a result, from reference surfaces and interchangeable parts to numerical control and robotics. See why each advance depends on the infrastructure around it.",
    3: "Follow an idea through requirements, interfaces, models, manufacturing, and acceptance. Learn what evidence turns a convincing design into hardware someone can trust.",
    4: "Read a machine through motion, constraints, force, stiffness, and contact. A small removable plate reveals how geometry can make assembly and repair easier.",
    5: "Explore the references, uncertainty, and decision rules behind a trustworthy measurement. Work through clearance and thermal expansion to see why more digits do not guarantee better knowledge.",
    6: "Look inside the industrial supply chains hidden in bearings, seals, chips, and ordinary metal stock. Understand why local raw material is only the beginning of manufacturing independence.",
    7: "Compare machining, forming, casting, printing, purchased stock, and repair through the requirements of the actual part. Follow the tradeoffs in quality, tooling, inspection, and repeated production.",
    8: "Choose robot forms by their work, environment, and support needs. Compare fixed arms, gantries, mobile platforms, crawlers, underwater vehicles, and humanoids without assuming one universal winner.",
    9: "Connect plans to physical feedback through sensing, coordinate frames, control, and recovery. Learn why uncertainty and contact change what a robot must know before it moves.",
    10: "Follow a failure from observation and diagnosis to repair, replacement, and a tested return to service. See how service interfaces and maintenance shape the economics of a working factory.",
    11: "Distinguish energy from power, then follow heat through a factory, the ocean, and space. Simple calculations expose the infrastructure that productive machines need around them.",
    12: "Find the bottleneck that determines useful output. Explore availability, yield, queues, and growth to understand when another robot helps—and when it changes nothing.",
    13: "Examine what AI, simulation, and digital twins can contribute to physical work. Build an evidence chain that keeps persuasive software behavior connected to measured results.",
    14: "Enter the terrestrial shipyard, where large structures, changing geometry, and difficult access shape automation. Follow the connection between welding, measurement, fixtures, and industrial scale.",
    15: "Explore resident underwater robots and the infrastructure that lets them inspect and work far from a workshop. Pressure, communication, energy, fouling, and retrieval become parts of the same design.",
    16: "Design an orbital assembly campaign with no floor to push against. Follow prepared interfaces, momentum, metrology, and recovery through the fictional MERIDIAN-O yard.",
    17: "Ask who needs an orbital yard and what problem it solves better than alternatives. Separate a valuable demonstration from a sustained service with customers, logistics, and an economic case.",
    18: "Land a deliberately limited lunar industrial seed. Trace deployment, power, dust, material processing, and verification without assuming a hidden supply chain has arrived with it.",
    19: "Follow a lunar repair episode from symptom to a verified return to work. Discover why spare parts, independent support, access, and diagnosis must be designed before the failure occurs.",
    20: "Explore how distance and communication delay reshape a Mars workshop. Autonomous operation becomes a question of bounded decisions, durable infrastructure, inventories, and recovery.",
    21: "Examine increasingly demanding claims about industrial independence and self-replication. Map what a factory can reproduce, what it must import, and what remains an open research problem.",
    22: "Connect algebra, geometry, calculus, probability, and computation to things a builder can see and measure. Use physical questions to give mathematical ideas a purpose.",
    23: "Build an aerospace education around mechanisms, manufacturing, robotics, and hands-on work. Use published program examples and a practical transfer checklist to investigate a route that fits your preparation.",
    24: "Choose from twelve projects that grow through evidence rather than spectacle. Each project offers a manageable question, useful artifacts, and a reason to attempt the next level.",
    25: "Meet the engineering roles that make capability repeatable, from design and manufacturing to test, controls, and operations. Connect responsibilities to the evidence a strong portfolio can show.",
    26: "Explore graduate questions in robotics, dynamics, contact, perception, and control. Learn how a narrow failure or uncertainty can become a serious research direction.",
    27: "Explore graduate work in manufacturing, materials, metrology, and systems engineering. Follow the research questions that connect making a part to knowing whether it can be trusted.",
    28: "Choose further study by the work you want to become capable of doing. Compare degrees, methods, laboratories, and career timing through purpose rather than prestige.",
    29: "Return to the carrier on the workbench with a richer understanding of industry. Consider a future built through reliable interfaces, accumulated evidence, and the ability to restore useful work.",
    30: "Keep the book's engineering vocabulary within reach. Find concise explanations of the concepts that connect machines, factories, evidence, and industrial independence.",
}

PARTS = (
    (3, "The idea"),
    (7, "The physical grammar"),
    (10, "The working machine"),
    (14, "The industrial system"),
    (21, "Beyond easy reach"),
    (25, "Your route into the work"),
    (30, "Purposeful depth"),
)


def normalize(value: str) -> str:
    return re.sub(r"\s+", " ", value).strip()


class PositionedParser(HTMLParser):
    """HTMLParser with offsets into the original, unmodified HTML string."""

    def __init__(self, source: str):
        super().__init__(convert_charrefs=True)
        self.source = source
        self.line_offsets = [0]
        self.line_offsets.extend(m.end() for m in re.finditer("\n", source))

    def absolute_offset(self) -> int:
        line, column = self.getpos()
        return self.line_offsets[line - 1] + column


class ChapterRegions(PositionedParser):
    def __init__(self, source: str):
        super().__init__(source)
        self.chapters: dict[str, str] = {}
        self.current: tuple[str, int] | None = None

    def handle_starttag(self, tag, attrs):
        if tag != "section":
            return
        section_id = dict(attrs).get("id", "")
        if re.fullmatch(r"ch-\d{2}", section_id):
            assert self.current is None, "Unexpected nested chapter section"
            self.current = (section_id[-2:], self.absolute_offset() + len(self.get_starttag_text()))

    def handle_endtag(self, tag):
        if tag == "section" and self.current:
            chapter_id, start = self.current
            assert chapter_id not in self.chapters, f"Duplicate chapter {chapter_id}"
            self.chapters[chapter_id] = self.source[start:self.absolute_offset()]
            self.current = None


class FragmentInfo(PositionedParser):
    def __init__(self, source: str):
        super().__init__(source)
        self.text_parts: list[str] = []
        self.heading: dict | None = None
        self.headings: list[dict] = []
        self.tags: dict[str, int] = {}
        self.links: list[str] = []
        self.ids: list[str] = []

    def handle_starttag(self, tag, attrs):
        attributes = dict(attrs)
        self.tags[tag] = self.tags.get(tag, 0) + 1
        if attributes.get("id"):
            self.ids.append(attributes["id"])
        if tag == "a":
            self.links.append(attributes.get("href", ""))
        if tag in {"h1", "h2", "h3"}:
            assert self.heading is None, "Nested heading"
            self.heading = {
                "tag": tag,
                "start": self.absolute_offset(),
                "start_tag": self.get_starttag_text(),
                "parts": [],
            }
        if tag in {"h1", "h2", "h3", "p", "li", "tr", "td", "th", "pre", "figure", "figcaption", "text", "title", "desc", "br"}:
            self.text_parts.append("\n")

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        self.handle_endtag(tag)

    def handle_data(self, data):
        self.text_parts.append(data)
        if self.heading is not None:
            self.heading["parts"].append(data)

    def handle_endtag(self, tag):
        if self.heading is not None and tag == self.heading["tag"]:
            self.heading["title"] = normalize("".join(self.heading.pop("parts")))
            self.headings.append(self.heading)
            self.heading = None
        if tag in {"h1", "h2", "h3", "p", "li", "tr", "td", "th", "pre", "figure", "figcaption", "text", "title", "desc"}:
            self.text_parts.append("\n")

    @property
    def text(self) -> str:
        return "\n".join(normalize(line) for line in "".join(self.text_parts).splitlines() if normalize(line))


def inspect(fragment: str) -> FragmentInfo:
    parser = FragmentInfo(fragment)
    parser.feed(fragment)
    parser.close()
    return parser


def slug(value: str) -> str:
    value = unicodedata.normalize("NFKD", value).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-") or "section"


def add_attribute(tag: str, name: str, value: str) -> str:
    encoded = html.escape(value, quote=True)
    pattern = rf"\b{re.escape(name)}\s*=\s*(['\"]).*?\1"
    if re.search(pattern, tag, re.I | re.S):
        return re.sub(pattern, lambda _: f'{name}="{encoded}"', tag, count=1, flags=re.I | re.S)
    return re.sub(r"(/?>)$", lambda match: f' {name}="{encoded}"' + match.group(1), tag)


def prepare_fragment(fragment: str, chapter_id: str) -> tuple[str, list[dict]]:
    original = inspect(fragment)
    heading_list = []
    mutations = []
    used_ids = set()
    for heading in original.headings:
        if heading["tag"] not in {"h2", "h3"}:
            continue
        root_id = f'ch-{chapter_id}-{slug(heading["title"])}'
        heading_id = root_id
        suffix = 2
        while heading_id in used_ids:
            heading_id = f"{root_id}-{suffix}"
            suffix += 1
        used_ids.add(heading_id)
        heading_list.append({"id": heading_id, "title": heading["title"]})
        mutations.append((heading["start"], len(heading["start_tag"]), add_attribute(heading["start_tag"], "id", heading_id)))
    for start, length, replacement in reversed(mutations):
        fragment = fragment[:start] + replacement + fragment[start + length:]

    fragment = re.sub(r'href=([\"\'])#ch-(\d{2})\1', lambda match: f'href="#/read/{match.group(2)}"', fragment)
    fragment = re.sub(r'href=([\"\'])#ref-([A-Z]\d+)\1', lambda match: f'href="#/sources/{match.group(2)}"', fragment)
    fragment = re.sub(r'href=([\"\'])#references\1', 'href="#/sources"', fragment)

    # ReportLab's local alias fonts do not exist on a deployed website. Preserve
    # their weight explicitly and use font names browsers can actually resolve.
    fragment = re.sub(r"font-family:\s*SansB\s*;", "font-family: Calibri, Arial, sans-serif; font-weight: 700;", fragment)
    fragment = re.sub(r"font-family:\s*Sans\s*;", "font-family: Calibri, Arial, sans-serif;", fragment)
    fragment = re.sub(r"font-family:\s*Serif\s*;", "font-family: Georgia, Times New Roman, serif;", fragment)

    figure_index = 0

    def accessible_svg(match):
        nonlocal figure_index
        figure_index += 1
        svg = match.group(0)
        title_match = re.search(r"<title(?:\s[^>]*)?>(.*?)</title>", svg, re.S)
        desc_match = re.search(r"<desc(?:\s[^>]*)?>(.*?)</desc>", svg, re.S)
        assert title_match and normalize(html.unescape(title_match.group(1))), "Every SVG needs a meaningful title"
        prefix = f"ch-{chapter_id}-figure-{figure_index}"
        # Scope internal SVG IDs so figures can coexist in a gallery without
        # their clip-path references pointing into another figure.
        svg_ids = re.findall(r'\bid="([^"]+)"', svg)
        for old_id in svg_ids:
            new_id = f"{prefix}-{old_id}"
            svg = svg.replace(f'id="{old_id}"', f'id="{new_id}"')
            svg = svg.replace(f"url(#{old_id})", f"url(#{new_id})")
            svg = svg.replace(f'href="#{old_id}"', f'href="#{new_id}"')
        svg = re.sub(r"<title(?:\s[^>]*)?>", f'<title id="{prefix}-title">', svg, count=1)
        if desc_match:
            svg = re.sub(r"<desc(?:\s[^>]*)?>", f'<desc id="{prefix}-desc">', svg, count=1)
        opening = re.match(r"<svg\b[^>]*>", svg).group(0)
        revised = add_attribute(opening, "role", "img")
        revised = add_attribute(revised, "aria-labelledby", f"{prefix}-title")
        if desc_match:
            revised = add_attribute(revised, "aria-describedby", f"{prefix}-desc")
        return revised + svg[len(opening):]

    fragment = re.sub(r"<svg\b.*?</svg>", accessible_svg, fragment, flags=re.S)
    result = inspect(fragment)
    assert result.text == original.text, f"Visible text changed in chapter {chapter_id}"
    assert result.tags == original.tags, f"Structural content changed in chapter {chapter_id}"
    assert len(result.ids) == len(set(result.ids)), f"Duplicate IDs in chapter {chapter_id}"
    assert not re.search(r"font-family:\s*(?:SansB?|Serif)\s*;", fragment), "Unresolved SVG font aliases"
    return fragment, heading_list


def verify_source_prose(chapter_id: str, reader_text: str) -> tuple[int, int]:
    """Check all ordinary Markdown prose paragraphs against the final reader.

    Tables, code blocks, figure directives, and headings are separately preserved
    by the HTML structural comparison. Here, inline emphasis and links are
    reduced to their displayed text before checking narrative coverage.
    """
    sources = list(CHAPTERS.glob(f"{chapter_id}_*.md"))
    assert len(sources) == 1, f"Expected one source file for chapter {chapter_id}"
    markdown = sources[0].read_text(encoding="utf-8-sig")
    source_words = len(markdown.split())
    clean = re.sub(r"```.*?```", "", markdown, flags=re.S)
    clean = re.sub(r"\[\[FIG:[^\]]+\]\]", "", clean)
    paragraphs_checked = 0
    haystack = normalize(reader_text)
    for paragraph in re.split(r"\n\s*\n", clean):
        paragraph = paragraph.strip()
        if not paragraph or paragraph.startswith(("#", "|", "- ", "* ", ">", ":::")):
            continue
        if re.match(r"\d+\.\s", paragraph):
            continue
        paragraph = re.sub(r"\[([^\]]+)\]\([^)]*\)", r"\1", paragraph)
        paragraph = paragraph.replace("**", "").replace("`", "")
        if normalize(paragraph) not in haystack:
            raise AssertionError(f"Source prose missing from reader, chapter {chapter_id}: {paragraph[:140]}")
        paragraphs_checked += 1
    return source_words, paragraphs_checked


def file_hash(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main():
    PUBLIC.mkdir(parents=True, exist_ok=True)
    reader = READER.read_text(encoding="utf-8-sig")
    regions = ChapterRegions(reader)
    regions.feed(reader)
    regions.close()
    expected_ids = [f"{number:02d}" for number in range(31)]
    assert sorted(regions.chapters) == expected_ids, "The final reader must contain all 31 chapter sections"

    research = json.loads((OUTPUTS / "Factory_Research.json").read_text(encoding="utf-8-sig"))
    reference_ids = {item["id"] for item in research}
    assert len(research) == len(reference_ids) == 97, "The research ledger must contain 97 unique IDs"

    chapters = []
    figures = 0
    total_source_words = 0
    source_paragraphs = 0
    all_ids = set()
    used_references = set()
    for chapter_id in expected_ids:
        number = int(chapter_id)
        original = regions.chapters[chapter_id]
        original_info = inspect(original)
        chapter_headings = [heading for heading in original_info.headings if heading["tag"] == "h1"]
        assert len(chapter_headings) == 1, f"Expected one chapter title in {chapter_id}"
        title = re.sub(r"^(?:\d+\.\s*|Prologue\.\s*|Epilogue\.\s*)", "", chapter_headings[0]["title"])
        content, headings = prepare_fragment(original, chapter_id)
        information = inspect(content)
        words = len(information.text.split())
        source_words, paragraphs = verify_source_prose(chapter_id, original_info.text)
        total_source_words += source_words
        source_paragraphs += paragraphs
        figures += information.tags.get("figure", 0)
        for element_id in information.ids:
            assert element_id not in all_ids, f"ID reused across chapters: {element_id}"
            all_ids.add(element_id)
        for target in information.links:
            if target.startswith("#/read/"):
                assert target.removeprefix("#/read/") in expected_ids, f"Unresolved chapter link {target}"
            elif target.startswith("#/sources/"):
                source_id = target.removeprefix("#/sources/")
                assert source_id in reference_ids, f"Unresolved reference link {target}"
                used_references.add(source_id)
            elif target.startswith("#"):
                assert target == "#/sources", f"Unconverted internal link {target}"
        part_number, part = next((index, name) for index, (upper, name) in enumerate(PARTS, start=1) if number <= upper)
        chapters.append({
            "id": chapter_id,
            "number": number,
            "title": title,
            "part": part,
            "partNumber": part_number,
            "description": DESCRIPTIONS[number],
            "minutes": max(1, math.ceil(words / 220)),
            "words": words,
            "html": content,
            "text": information.text,
            "headings": headings,
        })

    assert figures == 39, f"Expected 39 figures, found {figures}"
    assert used_references == reference_ids, f"Unused ledger entries: {reference_ids - used_references}"
    book = {
        "chapters": chapters,
        "stats": {
            "chapters": len(chapters),
            "words": sum(chapter["words"] for chapter in chapters),
            "sourceWords": total_source_words,
            "figures": figures,
            "references": len(research),
            "readingMinutes": sum(chapter["minutes"] for chapter in chapters),
            "pages": json.loads((PUBLIC_EDITION / "work" / "book_stats.json").read_text(encoding="utf-8"))["pages"],
            "baseline": "2026-10-29",
            "edition": "Public learning edition",
        },
    }
    (PUBLIC / "book.json").write_text(json.dumps(book, ensure_ascii=False, separators=(",", ":")) + "\n", encoding="utf-8")
    (PUBLIC / "research.json").write_text(json.dumps(research, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    for original_name, public_name in (
        ("The_Factory_That_Builds_the_Future.pdf", "book.pdf"),
        ("Factory_Research.csv", "research.csv"),
    ):
        original_path = OUTPUTS / original_name
        destination = PUBLIC / public_name
        shutil.copyfile(original_path, destination)
        assert file_hash(original_path) == file_hash(destination), f"Copy mismatch: {public_name}"

    print(json.dumps({
        "status": "PASS",
        **book["stats"],
        "sourceParagraphsVerified": source_paragraphs,
        "allVisibleTextPreserved": True,
        "allElementCountsPreserved": True,
        "uniqueHeadingIds": sum(len(chapter["headings"]) for chapter in chapters),
        "citationTargetsVerified": len(used_references),
        "downloadsByteIdentical": True,
        "publishedContentFiles": ["book.json", "research.json", "book.pdf", "research.csv"],
    }, indent=2))


if __name__ == "__main__":
    main()
