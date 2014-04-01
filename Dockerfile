FROM ubuntu
RUN apt-get -y update
RUN apt-get install -y build-essential git

RUN git clone https://github.com/joyent/node.git
WORKDIR /node
RUN git checkout v0.10.26
RUN ./configure
RUN make
RUN make install

WORKDIR /
RUN apt-get install -y curl
RUN curl https://raw.githubusercontent.com/pypa/pip/1.5.4/contrib/get-pip.py | python

# for tornado, specifically
RUN apt-get install -y python-dev

ADD . /qwirkle

WORKDIR /qwirkle
RUN make install
RUN make jsx
RUN make coffee

EXPOSE 13000

CWD ["--nodaemon", "--configuration=supervisord.conf"]
ENTRYPOINT ["supervisord"]
