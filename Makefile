all: coffee

test: python-test coffee-test

coffee:
	coffee --compile --output qwirkle/static/js qwirkle/static/js/src

python-test:
	nosetests

coffee-test:
	jasmine-node --coffee --verbose qwirkle/tests/coffee/

# vim: set noexpandtab tabstop=4 list
