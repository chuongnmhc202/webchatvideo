import http from 'src/utils/http'
import { FriendListResponse, FriendRequest } from 'src/types/user.type'
import { FriendTListConfig, BlockedFriend } from 'src/types/product.type'

const friendApi = {
    getFriendList(queryConfig: FriendTListConfig,phone: string) {
        return http.get<FriendListResponse>(`/api/user/user/friend/${phone}`, {params: queryConfig})
      },
      sendFriendRequest(body: FriendRequest) {
        return http.post<string>('/api/user/friend/friend', body)
      },
      unfriend(body: FriendRequest) {
        return http.post<string>('/api/user/friend/unfriend', body)
      },
      blockfriend(body: FriendRequest) {
        return http.post<string>('/api/user/friend/block', body)
      }
      ,
      getblockfriend(phone: string) {
        return http.get<BlockedFriend[]>(`/api/user/user/block/${phone}`)
      }
}
  
  export default friendApi