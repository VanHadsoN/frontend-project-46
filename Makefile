install: # установливаются зависимости после клонирования проекта
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
	npx jest
test-coverage: # отображается в командной строке процент покрытия тестами
	npx jest --coverage
test-watch: # тесты выполняются в режиме наблюдения с доп. параметрами
	npx jest -- --watchAll
