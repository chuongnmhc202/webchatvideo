#!/bin/bash bash deploy.sh

# docker compose build user-service
# docker compose build chat-service
# docker compose build socket-service

docker compose build
docker push nguyentanthanh0709/user-service:latest
docker push nguyentanthanh0709/chat-service:latest
docker push nguyentanthanh0709/socket-service:latest
