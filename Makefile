PORT = 3000

run:
	npm start $(PORT)

test:
	rm -rf coverage
	npm test -- --coverage

build:
	npm run build

clean:
	rm -rf build coverage

quick:
	make clean && make run $(PORT)
