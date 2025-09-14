import json
from pathlib import Path

def generate_postman(dsl: dict, out_dir: Path):
    tmpl_path = Path(__file__).resolve().parents[1] / "templates" / "postman" / "collection.template.json"
    with open(tmpl_path, "r", encoding="utf-8") as f:
        collection = json.load(f)

    
    try:
        envs = dsl.get("environments", [])
        stage = next((e for e in envs if e.get("name") == "stage"), None)
        if stage and stage.get("base_url"):
            for v in collection.get("variable", []):
                if v.get("key") == "baseUrl":
                    v["value"] = stage["base_url"]
        if stage:
            for var in stage.get("variables", []):
                if var.get("key") == "clientIp":
                    for v in collection.get("variable", []):
                        if v.get("key") == "clientIp":
                            v["value"] = var.get("value")
    except Exception:
        pass

    out_dir.mkdir(parents=True, exist_ok=True)
    (out_dir / "collection.json").write_text(json.dumps(collection, ensure_ascii=False, indent=2), encoding="utf-8")
    env = {
        "id": "stage-env",
        "name": "stage",
        "values": [
            {"key":"baseUrl","value": next((v["value"] for v in collection["variable"] if v["key"]=="baseUrl"), ""), "enabled": True},
            {"key":"clientIp","value": next((v["value"] for v in collection["variable"] if v["key"]=="clientIp"), ""), "enabled": True},
            {"key":"username","value": next((v["value"] for v in collection["variable"] if v["key"]=="username"), ""), "enabled": True},
            {"key":"password","value": next((v["value"] for v in collection["variable"] if v["key"]=="password"), ""), "enabled": True}
        ]
    }
    (out_dir / "env.stage.json").write_text(json.dumps(env, ensure_ascii=False, indent=2), encoding="utf-8")
