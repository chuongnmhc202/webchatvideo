import { Router } from 'express';
import { MessageController, } from '../controllers/message.controller';

const router = Router();

// POST /api/message/send
router.post('/send', MessageController.sendMessage);

// GET /api/message/get-messages
router.get('/get-messages', MessageController.getMessages);
router.put('/recall', MessageController.recallMessage);
// Xoá tin nhắn cho riêng mình
// PUT /api/message/delete-for-me
router.put('/delete-for-me', MessageController.deleteMessageForMe);

// Xoá toàn bộ tin nhắn cho riêng mình
router.put('/delete-all-for-me', MessageController.deleteAllMessagesForMe);
router.get('/search', MessageController.searchMessages);
router.post('/from-date', MessageController.getMessagesFromDate);
router.get("/:id/prev-media", MessageController.getPrevMediaMessage);
router.get("/:id/next-media", MessageController.getNextMediaMessage);

// 🆕 Sửa tin nhắn (PUT /api/message/:id/edit)
router.put('/:id/edit', MessageController.editMessage);
// Thả reaction
router.post("/:id/react", MessageController.addReaction);

// Gỡ reaction
router.delete("/:id/react", MessageController.removeReaction);

export default router;