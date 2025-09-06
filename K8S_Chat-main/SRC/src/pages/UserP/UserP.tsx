import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { User } from 'src/types/user.type'
import userApi from 'src/apis/user.api'
import {  useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { toast } from 'react-toastify';
import friendApi from 'src/apis/friend.api'

const UserP = () => {
    // const { phone, isFriend } = useParams()
    const { phone, isFriend } = useParams<{ phone: string; isFriend?: string }>()
    const { data: user, refetch: refetchProfile } = useQuery({
        queryKey: ['profile', phone],
        queryFn: () => userApi.getProfile(phone as string),
        enabled: !!phone
      })

      const navigate = useNavigate()
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'N/A'
    return new Date(dateStr).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
  const [isSending, setIsSending] = useState(false)
  const [isUnfriend, setIsUnfriend] = useState(false)

    const { data: profileDataLS, refetch } = useQuery<User>({
    queryKey: ['profile'],
    queryFn: async () => {
      const raw = localStorage.getItem('profile');
      if (!raw) throw new Error('No profile found in localStorage');
      return JSON.parse(raw) as User;
    },
  });


    const handleUnfriend = async () => {

    console.log({
      senderPhone: profileDataLS?.phone as string,
      receiverPhone: user?.data.data.phone as string
    })
    try {
      setIsUnfriend(true)
      var res = await friendApi.unfriend({
        senderPhone: profileDataLS?.phone as string,
        receiverPhone: user?.data.data.phone as string
      })

      toast.success(res.data)
      navigate(`/profile/${phone}/false`)
    } catch (error) {
      console.error(error)
      toast.error((error as any)?.response?.data?.message || 'Lỗi hủy kết bạn')
    } finally {
      setIsUnfriend(false)
    }
  }

    const handleBlockfriend = async () => {

    console.log({
      senderPhone: profileDataLS?.phone as string,
      receiverPhone: user?.data.data.phone as string
    })
    try {

      var res = await friendApi.blockfriend({
        senderPhone: profileDataLS?.phone as string,
        receiverPhone: user?.data.data.phone as string
      })

      toast.success(res.data)
      navigate('/')
    } catch (error) {
      console.error(error)
      toast.error((error as any)?.response?.data?.message || 'Lỗi Block người dùng')
    } finally {
      setIsUnfriend(false)
    }
  }

  const handleSendFriendRequest = async () => {
    try {
      setIsSending(true)
      var res = await friendApi.sendFriendRequest({
        senderPhone: profileDataLS?.phone as string,
        receiverPhone: user?.data.data.phone as string
      })
      if (res.data === 'You can not send a friend request to yourself') {
        toast.warning(res.data)
      } else {
        toast.success(res.data)
      }
      // Có thể cập nhật lại UI ở đây, ví dụ:
      // refetchFriendList()
      navigate(`/profile/${phone}/true`) 
    } catch (error) {
      console.error(error)
      toast.error((error as any)?.response?.data?.message || 'Lỗi gửi lời mời kết bạn')
    } finally {
      setIsSending(false)
    }
  }



  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-xl rounded-3xl overflow-hidden border border-gray-200">
        
      <div className="bg-gradient-to-r p-2 from-indigo-500 to-blue-500 h-32 relative">
                    <button
                onClick={() => navigate('/')}
                className="m-2 sm:mt-0 px-6 py-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold shadow"
            >
                <AiOutlineArrowLeft size={20} />
            </button>
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
          <img
            src={user?.data?.data?.avatar || 'https://i.pravatar.cc/150?img=3'}
            alt={user?.data?.data?.name}
            className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-md"
          />
        </div>
      </div>
      <div className="pt-16 pb-8 px-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800">{user?.data.data.name || 'No name provided'}</h2>
        <p className="text-gray-500 mt-1">Người dùng</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-sm text-left text-gray-600">
          <div>
            <span className="block text-gray-400">Email</span>
            <span className="font-medium">{user?.data.data.email}</span>
          </div>
          <div>
            <span className="block text-gray-400">Phone</span>
            <span className="font-medium">{user?.data.data.phone || 'N/A'}</span>
          </div>
          <div>
            <span className="block text-gray-400">Address</span>
            <span className="font-medium">{user?.data.data.address || '07, Liên Cơ, Hoà Đông, Krong Pak'}</span>
          </div>
          <div>
            <span className="block text-gray-400">Date of Birth</span>
            <span className="font-medium">
              {user?.data.data.date_of_birth ? new Date(user?.data.data.date_of_birth).toLocaleDateString() : '07/09/2003'}
            </span>
          </div>
          <div>
            <span className="block text-gray-400">Status</span>
            <span className={`font-medium ${user?.data.data.status === 'active' ? 'text-green-500' : 'text-red-500'}`}>
              {user?.data.data.status || 'N/A'}
            </span>
          </div>
          <div>
            <span className="block text-gray-400">Created At</span>
            <span className="font-medium">{formatDate(user?.data.data.createdAt)}</span>
          </div>
          <div>
            <span className="block text-gray-400">Updated At</span>
            <span className="font-medium">{formatDate(user?.data.data.updatedAt)}</span>
          </div>
        </div>
{/* Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row sm:justify-center sm:space-x-4">
          {isFriend === 'false' ? (
            <button onClick={handleSendFriendRequest} className="px-6 py-2 rounded-full bg-green-600 hover:bg-green-700 text-white font-semibold shadow">
              Kết bạn
            </button>
          ) : (
            <button onClick={handleUnfriend} className="px-6 py-2 rounded-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold shadow">
              Huỷ kết bạn
            </button>
          )}

          <button onClick={handleBlockfriend} className="px-6 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white font-semibold shadow">
            Chặn
          </button>
        </div>

      </div>
    </div>
  )
}

export default UserP
