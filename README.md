# Hưỡng dẫn chạy Source
1. git clone https://github.com/NguyenTanThanh0709/K8S_Chat.git
2. docker-compose up
3. thực hiện đưa data user.sql và chatDB.js vào MySql và MongoDB
- mysql (root, pass, 3307, localhost)
- mongoDb (mongodb://localhost:27017/ChatDB)
# Chạy Source Back-End
## Chạy user-service
1. cd Back-End/user-service
2. npm install
3. npm run dev
## Chạy chat-service
1. cd Back-End/chat-service
2. npm install
3. npm run dev
## Chạy socket-service
1. cd Back-End/socket-service
2. npm install
3. npm run dev

# Chạy Source Front-End
1. cd SRC
2. npm i
3. npm run dev

=> app chạy http://localhost:3000/
