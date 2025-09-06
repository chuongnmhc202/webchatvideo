
# 🎥 Hệ thống Chat & Video Call Hiệu Năng Cao

## 📌 Giới thiệu

Đây là hệ thống **chat và gọi video thời gian thực** được xây dựng với **Node.js, WebSocket** và triển khai trên **Kubernetes** để đạt khả năng **mở rộng, chịu tải cao**.  
Hệ thống phục vụ nhu cầu trò chuyện, gọi video 1-1 và nhóm cho hàng ngàn người dùng cùng lúc.

### Kiến trúc tổng quan

- **user-service**: Quản lý người dùng, thông tin cá nhân, danh sách bạn bè, nhóm.  
- **chat-service**: Lưu trữ và xử lý tin nhắn text, file, media.  
- **socket-service**: Xử lý realtime (WebSocket), signaling WebRTC cho video call.  
- **SFU (Selective Forwarding Unit)**: Quản lý stream video cho group call (sử dụng mediasoup / ion-sfu).  
- **Redis & Kafka**: Pub/Sub, message queue, tối ưu hiệu năng và đồng bộ giữa microservices.  

---

## 🚀 Hướng dẫn chạy Source

### 1️⃣ Yêu cầu môi trường
- Docker  
- Minikube  
- kubectl  
- Node.js v18+  
- Tài khoản DockerHub (để push image)

---

### 2️⃣ Clone repository
```bash
git clone https://github.com/NguyenTanThanh0709/K8S_Chat.git
cd K8S_Chat


# Hưỡng dẫn chạy Source
Docker
Minikube
kubectl 
(Có DockerHub account để push image)
1. git clone https://github.com/NguyenTanThanh0709/K8S_Chat.git
2. cd K8S_Chat
2. docker-compose up
3. minikube start
4. minikube tunnel
5. cd k8s
6. kubectl apply -f .
7. kiểm tra trạng thái
kubectl get pods -n microservices
kubectl get svc -n microservices
kubectl get ingress -n microservices
8. ứng dụng chạy trên http://localhost