FROM nginx:1.19.9

RUN apt update

COPY public /etc/contents