FROM ubuntu
RUN apt-get upgrade -y
RUN apt-get update
RUN apt-get install -y nodejs

ADD . /qwirkle

CD /qwirkle
RUN make install
RUN make jsx
RUN make coffee

EXPOSE 13000

ENTRYPOINT ["supervisord", "--nodaemon", "--config", "supervisord.conf"]
