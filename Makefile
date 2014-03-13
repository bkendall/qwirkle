all: coffee jsx

test: python-test coffee-test

jsx:
	./node_modules/react-tools/bin/jsx --no-cache-dir --extension jsx qwirkle/jsx/src qwirkle/static/js

coffee:
	# no coffee to complie at the moment
	#./node_modules/coffee-script/bin/coffee --compile --output qwirkle/static/js qwirkle/js/src
	true

python-test:
	nosetests

coffee-test:
	# ./node_modules/jasmine-node/bin/jasmine-node --coffee --verbose qwirkle/tests/coffee/
	true

node-install:
	npm install coffee-script react-tools jasmine-node

clean:
	rm -rf ./node_modules qwirkle/static/js/qwirkle.js

# vim: set noexpandtab tabstop=4 list
