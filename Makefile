install-deps: # устанавливаются зависимости после клонирования проекта
	npm ci
link:
	sudo npm link
lint: # выполняется проверка Linter-ом всех файлов проекта
	npx eslint .
publish: # выполняется имитация публикации проекта
    npm publish --dry-run