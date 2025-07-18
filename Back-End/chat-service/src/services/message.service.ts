import { MessageModel } from '../model/message.model';
import { IMessage } from '../interface/message.interface';
import axios from 'axios';
import * as dotenv from 'dotenv'

dotenv.config()

const USER_SERVICE_BASE_URL = process.env.USER_SERVICE_BASE_URL || 'http://localhost:8180';

const FRIEND_MESSAGE_ENDPOINT = `${USER_SERVICE_BASE_URL}/api/user/friend/friend/message`;
const GROUP_MESSAGE_ENDPOINT = `${USER_SERVICE_BASE_URL}/api/user/group/group/member/message`;


export class MessageService {

    static async sendMessage(messageData: IMessage): Promise<IMessage> {
        console.log(messageData);
        try {
          const message = new MessageModel({
            ...messageData,
            // timestamp: messageData.timestamp ? new Date(messageData.timestamp) : new Date(), 
            status: messageData.status || 'sent',
          });

          const savedMessage = await message.save();
     // Tạo nội dung lastMessage phù hợp với loại tin nhắn
      let lastMessage: string;

      switch (messageData.content_type) {
        case 'text':
          lastMessage = messageData.text || '[Text]';
          break;
        case 'image':
          lastMessage = 'Hình ảnh';
          break;
        case 'video':
          lastMessage = 'Video';
          break;
        case 'file':
          lastMessage = 'Tệp tin';
          break;
        case 'video_call_signal':
          lastMessage = 'Cuộc gọi video';
          break;
        default:
          lastMessage = 'Tin nhắn';
      }
                // Gọi API cập nhật lastMessage sau khi lưu thành công
      if (!messageData.is_group) {
        // Chỉ gọi nếu là tin nhắn cá nhân
        await axios.post(FRIEND_MESSAGE_ENDPOINT, {
          userPhone: savedMessage.sender,
          friendPhone: savedMessage.receiver,
          lastMessage: lastMessage // hoặc message.text, tuỳ interface bạn định nghĩa
        });
      } else {
        console.log({
          groupId: messageData.receiver,
          lastMessage: lastMessage // hoặc message.text, tuỳ interface bạn định nghĩa
        })
          await axios.put(GROUP_MESSAGE_ENDPOINT, {
          groupId: messageData.receiver,
          lastMessage: lastMessage // hoặc message.text, tuỳ interface bạn định nghĩa
        });
      }

          return savedMessage;
        } catch (error) {
          throw new Error(`Send message failed: ${error}`);
        }
      }

      static async getMessages(
        sender: string, 
        receiver: string, 
        isGroup: boolean,
        limit: number = 5,  // default to 20 messages per page
        lastMessageTimestamp?: string // optional parameter to fetch messages after the given timestamp
    ): Promise<IMessage[]> {
        console.log(sender, receiver, isGroup)

        try {
            // Prepare the query filter
            // let query: {
            //     $or: { sender: string; receiver: string; }[];
            //     is_group: boolean;
            //     timestamp?: { $lt: Date };
            // } = {
            //     $or: [
            //         { sender, receiver },
            //         { sender: receiver, receiver: sender }  // Bi-directional messages
            //     ],
            //     is_group: isGroup,
            // };

            let query: {
                $or?: { sender: string; receiver: string; }[];
                is_group: boolean;
                receiver?: string;
                timestamp?: { $lt: Date };
            } = {
                is_group: isGroup,
            };

            // Nếu là tin nhắn nhóm, chỉ filter theo receiver (groupId)
            if (isGroup) {
                query.receiver = receiver;
            } else {
                query.$or = [
                    { sender, receiver },
                    { sender: receiver, receiver: sender }  // Bi-directional messages
                ];
            }


            // If the lastMessageTimestamp is provided, add it to the query
            if (lastMessageTimestamp) {
                query = { ...query, timestamp: { $lt: new Date(lastMessageTimestamp) } };
                            // Fetch the messages sorted by timestamp (descending) and limit the number of results
            const messages = await MessageModel.find(query)
            .sort({ timestamp: -1 })
            .limit(limit)
            .exec();

            // Return the fetched messages
            return messages.reverse();
            }

            // Fetch the messages sorted by timestamp (descending) and limit the number of results
            const messages = await MessageModel.find(query)
                .sort({ timestamp: -1 })
                .limit(limit)
                .exec();

            // Return the fetched messages
            return messages.reverse();
        } catch (error: any) {
            console.error("Error while retrieving messages:", error);
            throw new Error(`Get messages failed: ${error.message || error}`);
        }
    }
      
}