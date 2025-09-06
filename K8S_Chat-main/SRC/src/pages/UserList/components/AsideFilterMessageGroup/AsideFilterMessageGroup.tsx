import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import clsx from 'clsx'
import { useMutation } from '@tanstack/react-query'
import friendApi from 'src/apis/friend.api'
import { useForm } from 'react-hook-form'
import moment from 'moment'
import { TfiMenuAlt } from 'react-icons/tfi'
import { createSearchParams, Link } from 'react-router-dom'
import path from 'src/constants/path'
import { useTranslation } from 'react-i18next'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { User, FriendListResponse, GroupReponse } from 'src/types/user.type'
import GroupApi from 'src/apis/group.api'
import { FriendTListConfig } from 'src/types/product.type'
import Popover from 'src/components/Popover'
import { useMessages } from 'src/contexts/MessagesContext'
import { GetMessagesQuery } from 'src/types/utils.type'
import { MdGroupAdd, MdSettings, MdPeopleAlt, MdPersonAdd, MdExitToApp } from 'react-icons/md'
import { v4 as uuidv4 } from "uuid"; // npm install uuid
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import InputFile from 'src/components/InputFile'
import { storage } from 'src/configs/firebase';


interface AsideFilterMessageProps {
  selectedCategory: string
  isScreenSM: boolean;
  setIsScreenSM: React.Dispatch<React.SetStateAction<boolean>>
  isChatBox: boolean;
  setIsChatBox: React.Dispatch<React.SetStateAction<boolean>>
}

interface CreateGroupBody {
  ownerPhone: string
  name: string
}


export default function AsideFilterMessageGroup({ selectedCategory, isScreenSM, setIsScreenSM, isChatBox, setIsChatBox }: AsideFilterMessageProps) {
  const [selectedFriendId, setSelectedFriendId] = useState<string | null>(null)
  const { setMessagesData, setUserData, setGroupResponse } = useMessages();

  const [searchName, setSearchName] = useState('')
  const queryConfig: FriendTListConfig = {
    name: searchName,
    type: "0"
  }

  const [groupName, setGroupName] = useState('')
  const [loading, setLoading] = useState(false)

  const { data: profileDataLS, refetch } = useQuery<User>({
    queryKey: ['profile'],
    queryFn: async () => {
      const raw = localStorage.getItem('profile');
      if (!raw) throw new Error('No profile found in localStorage');
      return JSON.parse(raw) as User;
    },
  });


  const phone = profileDataLS?.phone

  const { data: groupList } = useQuery({
    queryKey: ['groupList', phone, queryConfig],
    queryFn: () => GroupApi.getGroupList(queryConfig, phone as string),
    enabled: selectedCategory === '2' && !!phone,
  })

  const queryClient = useQueryClient()
  const createGroupMutation = useMutation((body: CreateGroupBody) =>
    GroupApi.createGroup(body)
  )
  const handleCreateGroup = () => {
    if (!groupName.trim()) return

    createGroupMutation.mutate(
      { ownerPhone: profileDataLS?.phone as string, name: groupName },
      {
        onSuccess: () => {
          // Dùng queryClient để refetch lại groupList
          queryClient.invalidateQueries(['groupList', profileDataLS?.phone])  // Invalidate queryKey của groupList
          toast.success('Đã tạo nhóm thành công!');

          setGroupName('') // Reset lại tên group
        },
        onError: (error) => {
          console.error('Tạo group thất bại:', error)
        }
      }
    )
  }

  const [selectedFriendsToAdd, setSelectedFriendsToAdd] = useState<string[]>([])
  const handleToggleFriend = (phone: string) => {
    setSelectedFriendsToAdd((prevSelected) =>
      prevSelected.includes(phone)
        ? prevSelected.filter((p) => p !== phone)
        : [...prevSelected, phone]
    )
  }
  const { t } = useTranslation('home')


  const [selectedFeature, setselectedFeature] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenAddPeople, setIsModalOpenAddPeople] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);

  const [file, setFile] = useState<File>()

  const { data: groupMembers, isLoading, isError } = useQuery(
    ['groupMembers', selectedGroupId],
    () => GroupApi.getGroupMemberInfo(selectedGroupId as string),
    {
      enabled: !!selectedGroupId && selectedFeature === 'members', // Chỉ gọi API khi có groupId được chọn
    }
  );

  const queryConfigFriend: FriendTListConfig = {
    name: searchName,
    type: "0"
  }

  const { data: friendList } = useQuery({
    queryKey: ['friendList', phone, queryConfigFriend],
    queryFn: () => friendApi.getFriendList(queryConfigFriend, phone as string),
    enabled: !!selectedGroupId && selectedFeature === 'addPeople' && !!phone, // Chỉ gọi API khi có groupId được chọn
  })

  const handleShowAddMembers = (groupId: string) => {
    handleCloseModal()
    setSelectedGroupId(groupId);
    setselectedFeature('addPeople');
    setIsModalOpenAddPeople(true);


  };
  const handleCloseModalAddMembers = () => {
    setIsModalOpenAddPeople(false);
    setSelectedGroupId(null);
    setselectedFeature(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedGroupId(null);
    setselectedFeature(null);
  };


  const handleShowMembers = (groupId: string) => {
    handleCloseModalAddMembers()
    setSelectedGroupId(groupId);
    setselectedFeature('members');
    setIsModalOpen(true);

  };


  const handleClick = (group: GroupReponse) => {
    setSelectedFriendId(group.id as string || null)
    const data: GetMessagesQuery = {
      sender: phone as string,
      receiver: group.id as string,
      is_group: true,
    };
    setMessagesData(data); // Sử dụng context để lưu dữ liệu
    setUserData(null)
    setGroupResponse(group)
    if (isScreenSM) {
      setIsChatBox(true)
    }
  };

  useEffect(() => {
    if (groupList?.data.data && groupList?.data.data.length > 0) {
      setGroupResponse(groupList.data.data[0]);
      setSelectedFriendId(groupList.data.data[0].id || null);

      // Optional: setMessagesData luôn với bạn đầu tiên
      const data: GetMessagesQuery = {
        sender: phone as string,
        receiver: groupList.data.data[0].id as string,
        is_group: false,
      };
      setMessagesData(data);
      setUserData(null);
    }
  }, [groupList]);


  const handleAddPeopleToGroup = async () => {
    if (!selectedGroupId || selectedFriendsToAdd.length === 0) return

    try {
      await GroupApi.addMembersToGroup(selectedGroupId, { memberPhones: selectedFriendsToAdd })
      queryClient.invalidateQueries(['groupMembers', selectedGroupId]) // Optional: refetch member list
      setSelectedFriendsToAdd([])
      handleCloseModalAddMembers()
      toast.success('Đã thêm thành viên thành công!');
    } catch (err) {
      console.error('Lỗi khi thêm thành viên:', err)
    }
  }

  const handleLeaveGroup = async (groupId: string) => {
    if (!profileDataLS?.phone) return; // Ensure the user has a phone number

    try {
      // Call the API to remove the member from the group
      const response = await GroupApi.removeMembersFromGroup(groupId, profileDataLS.phone);

      // Optionally, invalidate queries to refresh the group list
      queryClient.invalidateQueries(['groupList', profileDataLS?.phone]);

      // Reset selected group and close the modal
      setSelectedGroupId(null);
      setIsModalOpen(false);

      if (response.data == 'Failed') {
        toast.warning('Bạn là chủ nhóm nên không thể rời!');
      } else {
        toast.success('Đã rời nhóm thành công!');
      }

      // Optionally, display success message
      console.log('Successfully left the group');
    } catch (error) {
      console.error('Error leaving group:', error);
    }
  };

  const handleRemoveMember = async (groupId: string, user_phone: string) => {
    if (!user_phone) return; // Ensure the user has a phone number

    try {
      // Call the API to remove the member from the group
      const response = await GroupApi.removeMembersFromGroup(groupId, user_phone);

      setSelectedGroupId(null);
      setIsModalOpen(false);

      if (response.data == 'Failed') {
        toast.warning('Bạn là chủ nhóm nên không thể rời!');
      } else {
        toast.success('Đã rời nhóm thành công!');
      }

      // Optionally, display success message
      console.log('Successfully left the group');
    } catch (error) {
      console.error('Error leaving group:', error);
    }
  };


  const isOnline = true
  const [isModalRename, setIsModalRename] = useState(false);
  const [isModalChangeAvatar, setIsModalChangeAvatar] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');

  const handleOpenRename = (groupId: string, currentName: string) => {
    setSelectedGroupId(groupId);
    setNewGroupName(currentName);
    setIsModalRename(true);
  };

  const handleOpenChangeAvatar = (groupId: string) => {
    setSelectedGroupId(groupId);
    setIsModalChangeAvatar(true);
  };

  const handleRenameGroup = async () => {
    if (!selectedGroupId || !newGroupName.trim()) return;
    try {
      await GroupApi.updateGroup(selectedGroupId, { name: newGroupName });
      toast.success('Đổi tên nhóm thành công!');
      queryClient.invalidateQueries(['groupList', phone]);
      setIsModalRename(false);
    } catch (err) {
      toast.error('Lỗi khi đổi tên nhóm');
    }
  };

  const handleChangeAvatar = async () => {
    if (!selectedGroupId || !file) return;
    try {
      // Upload avatar (có thể cần API upload riêng)
      const formData = new FormData();
      formData.append('avatar', file);
      // await GroupApi.updateGroupInfo(selectedGroupId, { avatar: 'link-upload' }); // TODO: thay link từ API upload
      await GroupApi.updateGroup(selectedGroupId, { avatar: avatarName });
      toast.success('Đổi avatar thành công!');
      queryClient.invalidateQueries(['groupList', phone]);
      setIsModalChangeAvatar(false);
    } catch (err) {
      toast.error('Lỗi khi đổi avatar nhóm');
    }
  };

  const [avatarName, setAvatarName] = useState<string>()

  const handleChangeFile = (file?: File | undefined) => {
    setFile(file)
    if (file) {
      handleUpload(file)
    }
  }

  const handleUpload = async (file: File) => {
    if (file) {
      const uniqueId = uuidv4();

      try {
        const storageRef = ref(storage, `images/${uniqueId}_${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);

        alert('File uploaded successfully!');
        // setImagePreviews([downloadURL]); // Vì chỉ 1 file, dùng mảng có 1 phần tử
        setAvatarName(downloadURL)
        return downloadURL;
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('Error uploading file.');
        return null;
      } finally {
        // setLoading(false);
      }
    } else {
      alert('No file selected.');
      return null;
    }
  };


  return (
    <div className="z-10 h-[calc(100vh-47px)] overflow-y-auto bg-white p-4 shadow-md rounded-md border">
      <div className="opacity-0">FIXED</div>

      <Link to={path.home} className='flex items-center font-bold'>
        <TfiMenuAlt className='mr-3 h-4 w-3 fill-current' />
        {t('aside filter.filter friend group')}
      </Link>
      <div className='mt-4 mb-2 h-[1px] bg-gray-300' />

      <div className='flex items-center justify-between'>
        <input
          type="text"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          placeholder="  Tìm kiếm Nhóm ..."
          className="mb-4 w-full p-3 border rounded-md bg-gray-100 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder:text-gray-400 transition-all ease-in-out duration-200"
          style={{
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          }}
        />
        <Popover
          as={'span'}
          className='relative flex cursor-pointer items-center py-1 hover:text-red-300 text-orange'
          renderPopover={
            <div className='relative rounded-sm border border-gray-200 bg-white shadow-md p-4'>
              <h3 className='text-base font-semibold mb-2'>Tạo Group mới</h3>
              <input
                type='text'
                className='w-full rounded border px-3 py-2 text-sm outline-none ring-orange focus:ring-1'
                placeholder='Nhập tên Group'
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
              <button
                onClick={handleCreateGroup}
                className='mt-3 w-full rounded bg-orange px-4 py-2 text-white hover:bg-orange/90 disabled:opacity-70'
                disabled={loading}
              >
                {loading ? 'Đang tạo...' : 'Tạo Group'}
              </button>
            </div>
          }
        >
          <div className='text-2xl m-2 mb-6'><MdGroupAdd className="text-3xl" /></div>

        </Popover>
      </div>

      <ul className='pl-2 '>
        {groupList?.data.data.map((group) => {
          const isActive = group.id === selectedFriendId
          return (
            <li key={group.id} className='py-2 relative'>
              <button
                onClick={() => handleClick(group)}
                className='w-full text-left'
              >
                {isActive && (
                  <svg
                    viewBox='0 0 4 7'
                    className='absolute left-[-10px] top-2 mr-2 h-2 w-2 fill-orange'
                  >
                    <polygon points='4 3.5 0 0 0 7' />
                  </svg>
                )}

                {/* User Message Card */}
                <div
                  className={clsx(
                    'flex items-center justify-between rounded-lg p-3 hover:bg-gray-100 transition-all duration-150',
                    isActive && 'bg-orange-100'
                  )}
                >

                  <div className='flex items-center space-x-3 p-5'>
                    {/* Settings Popover */}
                    <div className='absolute top-2 right-2'>
                      <Popover
                        as='span'
                        className='absolute top-0 right-0'
                        renderPopover={
                          <div className='w-48 rounded-sm border border-gray-200 bg-white shadow-md p-2 space-y-2'>
                            <button
                              className='w-full flex items-center gap-2 px-3 py-1 text-left text-sm hover:bg-gray-100 rounded'
                              onClick={() => handleShowMembers(group.id)}
                            >
                              <MdPeopleAlt className="text-xl" />
                              <span>Thành viên</span>
                            </button>
                            <button
                              className='w-full flex items-center gap-2 px-3 py-1 text-left text-sm hover:bg-gray-100 rounded'
                              onClick={() => handleShowAddMembers(group.id)}
                            >
                              <MdPersonAdd className="text-xl" />
                              <span>Thêm Thành viên</span>
                            </button>
                            <button
                              className='w-full flex items-center gap-2 px-3 py-1 text-left text-sm text-red-600 hover:bg-gray-100 rounded'
                              onClick={() => handleLeaveGroup(group.id)}
                            >
                              <MdExitToApp className="text-xl" />
                              <span>Rời nhóm</span>
                            </button>
                            <button
                              className='w-full flex items-center gap-2 px-3 py-1 text-left text-sm hover:bg-gray-100 rounded'
                              onClick={() => handleOpenRename(group.id, group.name)}
                            >
                              ✏️ <span>Đổi tên nhóm</span>
                            </button>
                            <button
                              className='w-full flex items-center gap-2 px-3 py-1 text-left text-sm hover:bg-gray-100 rounded'
                              onClick={() => handleOpenChangeAvatar(group.id)}
                            >
                              🖼️ <span>Đổi ảnh nhóm</span>
                            </button>
                          </div>
                        }
                      >
                        <div className='text-xl cursor-pointer text-gray-500 hover:text-gray-700'><MdSettings className="text-xl" /></div>
                      </Popover>

                    </div>
                    <div className='relative'>
                      <img
                        src={group.avatar}
                        alt='user-avatar'
                        className='h-10 w-10 rounded-full object-cover border-2 border-white shadow-sm'
                      />
                      {isOnline && (
                        <span className='absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500'></span>
                      )}
                    </div>
                    <div>
                      <div className='font-semibold text-sm text-gray-900'>{group.name}</div>
                      <div className='text-xs text-gray-500 truncate max-w-[150px]'>{(group.last_message)}</div>
                    </div>
                  </div>

                  <div className='flex flex-col items-end space-y-1 relative'>
                    <div className='text-xs text-gray-400'>
                      {moment(group.last_message_date).format('HH:mm DD/MM')}
                    </div>
                    {group.unread_count > 0 && (
                      <div className='bg-red-500 text-white text-xs px-2 py-0.5 rounded-full'>
                        {group.unread_count}
                      </div>
                    )}


                  </div>
                </div>
              </button>
            </li>
          )
        })}
      </ul>

      {/* Modal */}
      {isModalOpen && groupMembers && (
        <div className=' flex  justify-center items-center bg-black bg-opacity-20'>
          <div className='p-4 rounded-md w-80'>
            <div className='flex justify-between'>
              <h3 className='text-lg font-semibold'>Danh sách thành viên</h3>
              <button onClick={handleCloseModal} className='text-gray-500'>❌</button>
            </div>
            {isLoading ? (
              <div>Loading...</div>
            ) : isError ? (
              <div>Error fetching members</div>
            ) : (
              <ul>
                {groupMembers?.data.map((member) => (
                  <li
                    key={member.user_phone}
                    className='flex items-center p-3 space-x-4 rounded-lg hover:bg-gray-100 transition-all duration-200'
                  >
                    <img
                      src={member.avatar || 'https://via.placeholder.com/40'}
                      alt='avatar'
                      className='w-12 h-12 rounded-full border-2 border-gray-200 object-cover'
                    />
                    <div className='flex-1'>
                      <div className='font-semibold text-lg text-gray-900'>{member.name}</div>
                      <div className='text-sm text-gray-500'>{member.role}</div>
                      <div className='text-xs text-gray-400 mt-1'>{`Joined: ${moment(member.joined_at).format('DD/MM/YYYY')}`}</div>
                    </div>
                    {profileDataLS?.phone != member?.user_phone && member.role != 'owner' && (
                      <button
                        onClick={() => handleRemoveMember(selectedGroupId as string, member.user_phone)}
                        className='ml-2 text-red-500 hover:text-red-700'
                        title='Xóa khỏi nhóm'
                      >
                        👨‍👩‍👧‍👦
                      </button>

                    )}
                  </li>


                ))}
              </ul>
            )}
          </div>
        </div>
      )}



      {isModalOpenAddPeople && friendList && (
        <div className='  flex justify-center items-center bg-black bg-opacity-20'>
          <div className='p-4 rounded-md w-96 max-h-[80vh] overflow-y-auto'>
            <div className='flex justify-between items-center mb-4'>
              <h3 className='text-lg font-semibold'>Thêm thành viên</h3>
              <button onClick={handleCloseModalAddMembers} className='text-gray-500'>❌</button>
            </div>
            <ul>
              {friendList?.data.friends.map((friend) => (
                <li key={friend.user.phone} className='flex items-center p-2 hover:bg-gray-100 rounded-lg transition'>
                  <img
                    src={friend.user.avatar || 'https://via.placeholder.com/40'}
                    alt='avatar'
                    className='w-10 h-10 rounded-full mr-3'
                  />
                  <div className='flex-1'>
                    <div className='font-medium text-gray-900'>{friend.user.name}</div>
                    <div className='text-sm text-gray-500'>{friend.user.phone}</div>
                  </div>
                  <input
                    type='checkbox'
                    checked={selectedFriendsToAdd.includes(friend.user.phone as string)}
                    onChange={() => handleToggleFriend(friend.user.phone as string)}
                    className='form-checkbox h-5 w-5 text-orange-500'
                  />
                </li>
              ))}
            </ul>
            <button
              onClick={handleAddPeopleToGroup}
              disabled={selectedFriendsToAdd.length === 0}
              className='mt-4 w-full bg-orange text-white py-2 rounded hover:bg-orange/90 disabled:opacity-60'
            >
              ➕ Thêm {selectedFriendsToAdd.length} thành viên
            </button>
          </div>
        </div>
      )}

      {isModalRename && (
        <div className='flex  justify-center items-center border'>
          <div className='bg-white p-4 rounded-lg w-80'>
            <h3 className='font-semibold mb-2'>Đổi tên nhóm</h3>
            <input
              type='text'
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              className='w-full border rounded p-2 mb-3'
            />
            <div className='flex justify-end gap-2'>
              <button onClick={() => setIsModalRename(false)} className='px-3 py-1 border rounded'>Hủy</button>
              <button onClick={handleRenameGroup} className='px-3 py-1 bg-orange text-white rounded'>Lưu</button>
            </div>
          </div>
        </div>
      )}


      {isModalChangeAvatar && (
        <div className='flex  justify-center items-center border'>
          <div className='bg-white p-4 rounded-lg w-80'>
            <h3 className='font-semibold mb-2'>Đổi ảnh nhóm</h3>
            <InputFile onChange={handleChangeFile} />
            {file && (
              <img
                src={URL.createObjectURL(file)}
                alt='preview'
                className='w-20 h-20 object-cover rounded-full mb-3'
              />
            )}
            <div className='flex justify-end gap-2'>
              <button onClick={() => setIsModalChangeAvatar(false)} className='px-3 py-1 border rounded'>Hủy</button>
              <button onClick={handleChangeAvatar} className='px-3 py-1 bg-orange text-white rounded'>Lưu</button>
            </div>
          </div>
        </div>
      )}


    </div>
  )
}
