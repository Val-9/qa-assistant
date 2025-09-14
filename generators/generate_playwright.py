import shutil
from pathlib import Path

def scaffold_playwright(dsl: dict, ui_dir: Path):
    template_root = Path(__file__).resolve().parents[1] / "templates" / "ui-tests"
    if ui_dir.exists():
        shutil.rmtree(ui_dir)
    shutil.copytree(template_root, ui_dir)
