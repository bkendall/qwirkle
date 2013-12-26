all: coffee

coffee:
	coffee --compile --output qwirkle/static/js qwirkle/static/js/src

# vim: set noexpandtab tabstop=4 list
