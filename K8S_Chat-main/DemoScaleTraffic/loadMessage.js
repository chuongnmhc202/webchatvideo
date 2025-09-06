import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 200 },  // trong 10s đầu, tăng từ 0 → 200 user
    { duration: '20s', target: 500 },  // trong 20s tiếp theo, tăng lên 500 user
    { duration: '30s', target: 1000 }, // giữ ổn định ở 1000 user trong 30s
    { duration: '30s', target: 2000 }, // giữ ổn định ở 2000 user trong 30s
    { duration: '10s', target: 0 },    // giảm dần từ 1000 → 0 user trong 10s
  ],
};
export default function () {
  const fullUrl = `http://localhost/api/chat/message/get-messages?sender=0333657673&receiver=0333657672&is_group=false&limit=5`;
  const params = { headers: { 'Content-Type': 'application/json' } };
  let res = http.get(fullUrl, params);
  check(res, {
    'Lấy tin nhắn thành công': (r) => r.status === 200,
  });
  sleep(1);
}
