import { useEffect, useState } from 'react'
import clsx from 'clsx'
import moment from 'moment'
import { TfiMenuAlt } from 'react-icons/tfi'
import { Link } from 'react-router-dom'
import path from 'src/constants/path'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import friendApi from 'src/apis/friend.api'
import { useMessages } from 'src/contexts/MessagesContext'
import { connectSocket, disconnectSocket, getSocket } from 'src/socket/socket'
import { User, friends } from 'src/types/user.type'
import { FriendTListConfig } from 'src/types/product.type'
import { GetMessagesQuery } from 'src/types/utils.type'
import { useSocketContext } from 'src/contexts/SocketContext';
interface AsideFilterMessageProps {
  selectedCategory: string
  isScreenSM: boolean;
  setIsScreenSM: React.Dispatch<React.SetStateAction<boolean>>
  isChatBox: boolean;
  setIsChatBox: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AsideFilter({ selectedCategory, isScreenSM, setIsScreenSM, isChatBox, setIsChatBox }: AsideFilterMessageProps) {
  const { t } = useTranslation('home')
  const { setMessagesData, setUserData, setGroupResponse } = useMessages()

  const [selectedFriendId, setSelectedFriendId] = useState<string | null>(null)
  const [searchName, setSearchName] = useState('')
  const { socketReady, onlineUsers } = useSocketContext();

  const { data: profileDataLS } = useQuery<User>({
    queryKey: ['profile'],
    queryFn: async () => {
      const raw = localStorage.getItem('profile')
      if (!raw) throw new Error('No profile found in localStorage')
      return JSON.parse(raw) as User
    }
  })

  const phone = profileDataLS?.phone

  const queryConfig: FriendTListConfig = { name: searchName }

  const { data: friendList } = useQuery({
    queryKey: ['friendList', phone, queryConfig],
    queryFn: () => friendApi.getFriendList(queryConfig, phone as string),
    enabled: selectedCategory === '1' && !!phone
  })

  useEffect(() => {
  if (friendList?.data.friends && friendList.data.friends.length > 0) {
    setUserData(friendList.data.friends[0]);
    setSelectedFriendId(friendList.data.friends[0].user.phone || null);

    // Optional: setMessagesData luôn với bạn đầu tiên
    const data: GetMessagesQuery = {
      sender: phone as string,
      receiver: friendList.data.friends[0].user.phone as string,
      is_group: false,
    };
    setMessagesData(data);
    setGroupResponse(null);
  }
}, [friendList]);

  const handleClick = (friend: friends) => {
    setSelectedFriendId(friend.user.phone as string)
    const data: GetMessagesQuery = {
      sender: phone as string,
      receiver: friend.user.phone as string,
      is_group: false
    }
    setMessagesData(data)
    setUserData(friend)
    setGroupResponse(null)
    if (isScreenSM){
      setIsChatBox(true)
    }
  }



  const isUserOnline = (phone: string) => {
    return onlineUsers.includes(phone)
  }

  return (
    <div className='flex h-full flex-col bg-white p-4 shadow-md rounded-md border'>
      <div className="opacity-0">FIXED</div>
    <div className='bg-white z-10'>

      <Link to={path.home} className='flex items-center font-bold'>
        <TfiMenuAlt className='mr-3 h-4 w-3 fill-current' />
        {t('aside filter.filter friend group')}
      </Link>
      <div className='mt-4 mb-2 h-[1px] bg-gray-300' />

      <input
        type='text'
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
        placeholder='   Tìm kiếm bạn bè...'
        className='mb-4 w-full p-3 border rounded-md bg-gray-100 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder:text-gray-400 transition-all ease-in-out duration-200'
        style={{ boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}
      />

      <ul className='pl-2'>
        {friendList?.data.friends.map((friend) => {
          const isActive = friend.user.phone === selectedFriendId
          const latestMessage = {
            text: friend.last_message,
            createdAt: friend.last_message_date
          }

 

          return (
            <li key={friend.user.phone} className='py-2 relative'>
              <button onClick={() => handleClick(friend)} className='w-full text-left'>
                {isActive && (
                  <svg
                    viewBox='0 0 4 7'
                    className='absolute left-[-10px] top-2 mr-2 h-2 w-2 fill-orange'
                  >
                    <polygon points='4 3.5 0 0 0 7' />
                  </svg>
                )}

                <div
                  className={clsx(
                    'flex items-center justify-between rounded-lg p-3 hover:bg-gray-100 transition-all duration-150',
                    isActive && 'bg-orange-100'
                  )}
                >
                  <div className='flex items-center space-x-3'>
                    <div className='relative'>
                      <img
                        src={friend.user.avatar}
                        alt='user-avatar'
                        className='h-10 w-10 rounded-full object-cover border-2 border-white shadow-sm'
                      />
                      <span
                        className={clsx(
                          'absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white',
                          isUserOnline(friend.user.phone as string)
                            ? 'bg-green-500'
                            : 'bg-gray-400'
                        )}
                      />
                    </div>
                    <div>
                      <div className='font-semibold text-sm text-gray-900'>{friend.user.name}</div>
                      <div className='text-xs text-gray-500'>{(latestMessage.text)}</div>
                    </div>
                  </div>

                  <div className='flex flex-col items-end space-y-1'>
                    <div className='text-xs text-gray-400'>
                      {moment(latestMessage.createdAt).format('HH:mm DD/MM')}
                    </div>
                      {(() => {
                        const isCurrentUserUserPhone = profileDataLS?.phone === friend.user_phone
                        const unreadCount = isCurrentUserUserPhone
                          ? friend.unread_count_user
                          : friend.unread_count_friend

                        return unreadCount > 0 ? (
                          <div className='bg-red-500 text-white text-xs px-2 py-0.5 rounded-full'>
                            {unreadCount}
                          </div>
                        ) : null
                      })()}

                  </div>
                </div>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
    </div>
  )
}
