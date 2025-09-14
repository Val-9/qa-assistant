gen:
	python generators/cli.py generate --input requirements/auth.yaml --out .
postman:
	npx newman run postman/collection.json -e postman/env.stage.json -r cli,htmlextra --reporter-htmlextra-export postman/report.html
ui:
	cd ui-tests && npm ci && npx playwright install --with-deps && npx playwright test --reporter=html
all: gen postman ui
