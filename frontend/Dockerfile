FROM ubuntu:20.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y \
    python3 python3-pip \
    openjdk-11-jdk \
    gcc g++ \
    curl \
    vim \
    git \
    && apt-get clean

WORKDIR /app

# Add universal runner
COPY run.sh /app/run.sh
RUN chmod +x /app/run.sh

CMD ["/usr/bin/tail", "-f", "/dev/null"]
