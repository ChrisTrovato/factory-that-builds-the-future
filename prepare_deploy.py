"""Build the explicit static-site payload; never include scratch/QA files."""
from pathlib import Path
import base64
import hashlib
import json

ROOT = Path(__file__).resolve().parent
PUBLIC = ROOT / "public"
PUBLIC_FILES = (
    "index.html", "app.js", "styles.css",
    "flight-deck.js", "flight-deck.css", "sandbox.js", "sandbox.css",
    "arcade.js", "arcade.css", "arcade-models.js",
    "reels.js", "reels.css", "reels-data.js",
    "expeditions.js", "expeditions.css", "expeditions-data.js",
    "experience.js", "experience.css",
    "horizon.js", "horizon.css", "world-data.js",
    "learning-data.js", "journey-curriculum.js", "learning-catalog.js",
    "project-blueprints.js", "practice.js", "practice.css", "practice-data.js",
    "backup.js", "field-notes.js",
    "math-studio.js", "math-studio.css", "lab.js", "lab.css",
    "yard.svg", "favicon.svg", "book.json", "research.json", "book.pdf",
    "research.csv", "vercel.json", "about.html",
    "assets/shipyard-hero.png", "assets/lunar-workshop.png",
    "assets/ocean-resident.png", "assets/earth-workbench.png",
    "assets/mars-outpost.png", "assets/launch-v4.png",
    "official_aero_plan/index.html", "official_aero_plan/styles.css",
    "official_aero_plan/app.mjs", "official_aero_plan/engine.mjs",
    "official_aero_plan/academic-data.mjs", "official_aero_plan/future-data.mjs",
    "official_aero_plan/learning-content.mjs", "official_aero_plan/labs.mjs",
    "official_aero_plan/favicon.svg",
    "official_aero_plan/assets/earth-workbench.webp",
    "official_aero_plan/assets/lunar-workshop.webp",
    "official_aero_plan/assets/ocean-resident.webp",
    "official_aero_plan/assets/orbital-workshop.webp",
)


def main():
    if len(PUBLIC_FILES) != len(set(PUBLIC_FILES)):
        raise ValueError("The public allowlist contains duplicate paths.")
    public_root = PUBLIC.resolve()
    records = []
    for name in PUBLIC_FILES:
        path = (public_root / name).resolve()
        if not path.is_relative_to(public_root):
            raise ValueError(f"Allowlisted path escapes public/: {name}")
        if not path.is_file():
            raise FileNotFoundError(f"Required public asset is missing: {name}")
        data = path.read_bytes()
        records.append({
            "file": name,
            "size": len(data),
            "sha": hashlib.sha1(data).hexdigest(),
            "data": base64.b64encode(data).decode("ascii"),
        })
    (ROOT / "deploy_payload.json").write_text(
        json.dumps(records, separators=(",", ":")), encoding="utf-8"
    )
    manifest = [{key: value for key, value in record.items() if key != "data"} for record in records]
    (ROOT / "deployment_manifest.json").write_text(
        json.dumps(manifest, indent=2) + "\n", encoding="utf-8"
    )
    print(f"{len(records)} allowlisted public files; {sum(record['size'] for record in records):,} bytes. QA harnesses and source-only records excluded.")


if __name__ == "__main__":
    main()
