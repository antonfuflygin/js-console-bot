dev:
	npm run dev
makemigration:
	npm run migration:generate --name=$(name)
migrate:
	npm run migration:run
revertmigration:
	npm run migration:revert
