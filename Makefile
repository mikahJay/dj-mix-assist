PORT = 3000

run:
	npm start $(PORT)

test:
	npm test -- --coverage

build:
	npm run build

clean:
	rm -rf build

quick:
	make clean && make run $(PORT)
