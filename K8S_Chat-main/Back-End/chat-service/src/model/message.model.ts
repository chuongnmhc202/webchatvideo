import { Schema, model, Document } from 'mongoose';
import { IMessage } from '../interface/message.interface';

const messageSchema = new Schema<IMessage & Document>({
  sender: { type: String, required: true },
  receiver: { type: String, required: true },
  is_group: { type: Boolean, required: true },
  content_type: {
    type: String,
    required: true,
    enum: ['text', 'image', 'file', 'video', 'video_call_signal'],
  },
  timestamp: { type: Date, required: true, default: Date.now  },
  status: {
    type: String,
    required: true,
    enum: ['sent', 'delivered', 'read'],
    default: 'sent',
  },

  text: { type: String },
  // file, image, video
  url_file: { type: String },
  name_file: { type: String },
  size_file: { type: String },
  mime_type_file: { type: String },
  duration_video: { type: String },

  // video call
  type_video_call: {
    type: String,
    enum: ['offer', 'answer', 'ice-candidate'],
  },
  sdp: { type: String },
  candidate: { type: String },
  sdpMid: { type: String },
  sdpMLineIndex: { type: String },
  avt: { type: String },
  name: { type: String },
    // NEW 👇
  deleted_by: { type: [String], default: [] },
  is_recalled: { type: Boolean, default: false }, // đánh dấu đã thu hồi

reactions: [
  {
    user: { type: String, required: true }, // phone
    userName: { type: String, required: true }, // tên
    emoji: { type: String, required: true } // ❤️, 👍, 😂 ...
  }
],


});

// Tạo chỉ mục cho các trường cần tối ưu truy vấn
messageSchema.index({ sender: 1, receiver: 1, timestamp: 1 }); // Tạo chỉ mục kết hợp cho sender, receiver, và timestamp
messageSchema.index({ is_group: 1 }); // Tạo chỉ mục cho is_group nếu cần thiết
messageSchema.index({ content_type: 1 }); // Tạo chỉ mục cho content_type nếu cần thiết

export const MessageModel = model<IMessage & Document>('Message', messageSchema);
