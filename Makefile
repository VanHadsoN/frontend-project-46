install-deps: # установливаются зависимости после клонирования проекта
	npm ci
gendiff:
	node bin/gendiff.js
link:
	sudo npm link
publish: # выполняется имитация публикации проекта
	npm publish --dry-run
lint: # выполняется проверка Linter-ом всех файлов проекта
	npx eslint .
test: # выполняются тесты Jest
	npm test
test-coverage: # отображается в командной строке процент покрытия тестами
	npm test -- --coverage --coverageProvider=v8
test-watch: # тесты выполняются в режиме наблюдения с доп. параметрами
	npm test -- --watchAll
