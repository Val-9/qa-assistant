import argparse, yaml
from pathlib import Path
from generate_postman import generate_postman
from generate_playwright import scaffold_playwright

def main():
    p = argparse.ArgumentParser()
    p.add_argument("command", choices=["generate"])
    p.add_argument("--input", required=True)
    p.add_argument("--out", default=".")
    args = p.parse_args()

    with open(args.input, "r", encoding="utf-8") as f:
        dsl = yaml.safe_load(f) or {}

    out_root = Path(args.out)
    generate_postman(dsl, out_root / "postman")
    scaffold_playwright(dsl, out_root / "ui-tests")
    print("✅ Generated Postman and Playwright artefacts.")

if __name__ == "__main__":
    main()
