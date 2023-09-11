back:
	make -C server start

front:
	make -C client start

start:
	make back & make front

install: install-back install-front

install-back:
	cd server && npm ci

install-front:
	cd client && npm ci
