import {Request,Response, } from 'express'
import {User, SuccessResponse } from '../interface/type'


import {
    sendFriendRequestService,
    unfriendUserService,
    updateFriendLastMessageService,
    resetFriendUnreadCountService
  } from '../services/friend.service';


  export const sendFriendRequestController = async (req: Request, res: Response) => {
    try {
      const { senderPhone, receiverPhone, type = "0" } = req.body
  
      if (!senderPhone || !receiverPhone) {
        return res.status(400).json({ message: 'Missing senderPhone or receiverPhone.' })
      }
  
      const result = await sendFriendRequestService(senderPhone, receiverPhone, type)
  
      return res.status(200).json( result )
    } catch (error) {
      console.error('Error in sendFriendRequestController:', error)
      return res.status(500).json('Internal Server Error')
    }
  }  


  export const unfriendUserController = async (req: Request, res: Response) => {
    try {
      const { senderPhone, receiverPhone } = req.body
  
      if (!senderPhone || !receiverPhone) {
        return res.status(400).json('userPhone và friendPhone là bắt buộc.')
      }
  
      await unfriendUserService(senderPhone, receiverPhone)
  
      return res.status(200).json('Hủy kết bạn thành công.')
    } catch (error) {
      console.error('Lỗi khi hủy kết bạn:', error)
      return res.status(500).json('Hủy kết bạn thất bại.')
    }
  }

  export const updateFriendLastMessageController = async (req: Request, res: Response) => {
  try {
    const { userPhone, friendPhone, lastMessage, sender } = req.body

    if (!userPhone || !friendPhone || !lastMessage) {
      return res.status(400).json({ message: 'Missing required fields: userPhone, friendPhone, lastMessage' })
    }

    await updateFriendLastMessageService(userPhone, friendPhone, lastMessage, sender)

    return res.status(200).json({ message: 'Cập nhật tin nhắn thành công.' })
  } catch (error) {
    console.error('Lỗi khi cập nhật tin nhắn cuối:', error)
    return res.status(500).json({ message: 'Cập nhật tin nhắn thất bại.' })
  }
}

export const resetUnreadCountController = async (req: Request, res: Response) => {
  try {
    const { userPhone, friendPhone, sender } = req.body;

    if (!userPhone || !friendPhone) {
      return res.status(400).json({ message: 'userPhone và friendPhone là bắt buộc.' });
    }

    await resetFriendUnreadCountService(userPhone, friendPhone, sender);

    return res.status(200).json({ message: 'Unread count reset thành công.' });
  } catch (error) {
    console.error('Lỗi khi reset unread count:', error);
    return res.status(500).json({ message: 'Reset unread count thất bại.' });
  }
};