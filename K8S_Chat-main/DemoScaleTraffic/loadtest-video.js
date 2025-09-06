// loadtest-video.js
import puppeteer from "puppeteer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const videoPath = path.join(__dirname, "fake_video.y4m");
const audioPath = path.join(__dirname, "fake_audio.wav");


const BASE_URL = "http://localhost/call?callerId=0333657673&type=sent&isGroup=1";
// hàm sleep
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function launchUser(userIndex, receiverId) {
const browser = await puppeteer.launch({
  headless: "new",
  args: [
    "--use-fake-device-for-media-stream",
    "--use-fake-ui-for-media-stream",
    "--no-sandbox",
    "--disable-setuid-sandbox",
    `--use-file-for-fake-video-capture=${videoPath}`,
    `--use-file-for-fake-audio-capture=${audioPath}`
  ],
});

  const page = await browser.newPage();
  const url = `${BASE_URL}&receiverId=${receiverId}&roomId=room0333657673${receiverId}`;
  console.log(url)
  await page.goto(url);
  console.log(`🎥 User ${userIndex} joined call with room ${receiverId}`);
}

(async () => {
  const users = 5; // số client fake cho mỗi receiver
  const receiverIds = Array.from({ length: 50 }, (_, i) => i + 1); // 50 nhóm khác nhau

  for (const rid of receiverIds) {
    for (let i = 0; i < users; i++) {
      launchUser(i, rid); // không await để mở song song
      await sleep(1500);
    }
  }
})();
