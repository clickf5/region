dev-client:
	npm run start-client

dev-server:
	npm run start-server

dev-mongo:
	docker-compose up --build -d mongo

build:
	rm -rf build
	npm run build

install:
	npm install

test:
	npm test

lint:
	npx eslint .

.PHONY: build