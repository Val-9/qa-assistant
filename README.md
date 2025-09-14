# QA Assistant (MVP)

Конвейер: требования (YAML) → генерация артефактов → прогон Postman и Playwright → отчёты → авто-баг в Jira при падениях.

## Локально
```bash
python -m pip install -r generators/requirements.txt
python generators/cli.py generate --input requirements/auth.yaml --out .

npm i -g newman newman-reporter-htmlextra
newman run postman/collection.json -e postman/env.stage.json -r cli,htmlextra --reporter-htmlextra-export postman/report.html

cd ui-tests
npm ci
npx playwright install --with-deps
npx playwright test --reporter=html
```
## CI
Добавь Secrets: `STAGE_BASE_URL`, `STAGE_CLIENT_IP`, `JIRA_BASE_URL`, `JIRA_PROJECT_KEY`, `JIRA_TOKEN`, `JIRA_EMAIL`.
