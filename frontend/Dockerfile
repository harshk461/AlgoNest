FROM ubuntu:20.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y \
    python3 python3-pip \
    gcc g++ \
    && apt-get clean

WORKDIR /app


CMD ["/usr/bin/tail", "-f", "/dev/null"]
