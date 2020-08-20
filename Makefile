dev-client:
	npm run start-client

dev-server:
	npm run start-server

build:
	rm -rf build
	npm run build

install:
	npm install

.PHONY: build