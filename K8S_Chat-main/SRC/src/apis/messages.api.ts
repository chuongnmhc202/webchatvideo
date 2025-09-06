import { IMessage, GetMessagesQuery } from 'src/types/utils.type'
import http1 from 'src/utils/http1'


const messagesApi = {

    sendMessage(body: IMessage) {
        return http1.post<IMessage>('/api/chat/message/send', body)
    },

    getMessage(query: GetMessagesQuery) {
        return http1.get<IMessage[]>('/api/chat/message/get-messages', { params: query })
    },

    // Thu hồi tin nhắn
    recallMessage(messageId: string, userPhone: string) {
        return http1.put('/api/chat/message/recall', { messageId, userPhone })
    },

    // Xoá tin nhắn cho riêng mình
    deleteMessageForMe(messageId: string, userPhone: string) {
        return http1.put('/api/chat/message/delete-for-me', { messageId, userPhone })
    },
    // Xoá toàn bộ tin nhắn trong cuộc trò chuyện cho riêng mình
    deleteAllMessagesForMe(userPhone: string, receiver: string, isGroup: boolean) {
        return http1.put('/api/chat/message/delete-all-for-me', {
            userPhone,
            receiver,
            isGroup,
        })
    },

    searchMessages(userPhone: string, receiver: string, isGroup: boolean, keyword: string, limit?: number) {
        return http1.get<IMessage[]>('/api/chat/message/search', {
            params: { userPhone, receiver, isGroup, keyword, limit },
        });
    },

        // Thêm getMessagesFromDate
    getMessagesFromDate(userPhone: string, receiver: string, isGroup: boolean, startDate: string | Date) {
        return http1.post<IMessage[]>('/api/chat/message/from-date', { userPhone, receiver, isGroup, startDate });
    }, 

        // 📌 Lấy media (ảnh/video) liền trước
    getPrevMediaMessage(messageId: string) {
        return http1.get<IMessage>(`/api/chat/message/${messageId}/prev-media`);
    },

    // 📌 Lấy media (ảnh/video) liền sau
    getNextMediaMessage(messageId: string) {
        return http1.get<IMessage>(`/api/chat/message/${messageId}/next-media`);
    },

// 📌 Sửa lại editMessage
editMessage(messageId: string, text: string) {
  return http1.put<IMessage>(`/api/chat/message/${messageId}/edit`, { text });
},

// Thả reaction
editAddreactMessage(messageId: string, user: string, userName: string, emoji: string) {
  return http1.post<IMessage>(`/api/chat/message/${messageId}/react`, { user, userName, emoji });
},
// 📌 Sửa lại editMessage
editRemoveReactMessage(messageId: string, user: string) {
  return http1.delete<IMessage>(`/api/chat/message/${messageId}/react`, { data: { user } });
}


    
}

export default messagesApi;