import React, { useState, useEffect } from "react";
import userApi from "src/apis/user.api";
import GroupApi from "src/apis/group.api";
import { UserTListConfig, UserT, IUserSession } from "src/types/product.type";
import { GroupReponse } from "src/types/user.type"
import { Eye, Lock, Unlock, RefreshCw, Users } from "lucide-react";
import Modal from "./Modal"; // modal thuần Tailwind
import { FriendTListConfig } from 'src/types/product.type'

  const queryConfig: FriendTListConfig = {
    name: '',
    type: "0"
  }


export default function ListUser() {
  const [users, setUsers] = useState<UserT[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserT | null>(null);
  const [openModal, setOpenModal] = useState<null | "reset" | "loginInfo" | "lock" | "groups">(null);
    console.log(selectedUser)
  // state phân trang & search
  const [queryConfig, setQueryConfig] = useState<UserTListConfig>({
    page: 1,
    limit: 10,
    name: "",
  });

  const [total, setTotal] = useState<number>(0);

  const fetchUsers = async () => {
    const { data } = await userApi.getListUserAdmin(queryConfig);
    // giả sử API trả về { users: [], total: number }
    setUsers(data.users || []);
    setTotal(data.total || 0);
  };

  useEffect(() => {
    fetchUsers();
  }, [queryConfig]);

  // Tính tổng số trang
  const totalPages = Math.ceil(total / Number(queryConfig.limit || 2));

  const [groups, setGroups] = useState<GroupReponse[]>([])
const [loading, setLoading] = useState(false)


useEffect(() => {
  if (!selectedUser?.phone) return

  setLoading(true)
  GroupApi.getGroupList(queryConfig, selectedUser.phone)
    .then((res) => {
      setGroups(res.data.data) // theo SuccessResponse<GroupReponse[]>
    })
    .finally(() => setLoading(false))
}, [selectedUser])

const [sessions, setSessions] = useState<IUserSession[]>([])
const [loadingSessions, setLoadingSessions] = useState(false)

useEffect(() => {
  if (openModal === "loginInfo" && selectedUser?.phone) {
    setLoadingSessions(true)
    userApi.getSession(selectedUser.phone)
      .then((res) => {
        // API đang trả về IUserSession (nên sửa thành IUserSession[] trong userApi để lấy list)
        const data = Array.isArray(res.data) ? res.data : [res.data]
        setSessions(data)
      })
      .finally(() => setLoadingSessions(false))
  }
}, [openModal, selectedUser])


  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Danh sách người dùng</h1>

      {/* Thanh search */}
      <div className="mb-4 flex items-center space-x-2">
        <input
          type="text"
          placeholder="Tìm theo số điện thoại..."
          value={queryConfig.name}
          onChange={(e) =>
            setQueryConfig({ ...queryConfig, name: e.target.value, page: 1 })
          }
          className="border rounded px-3 py-2 w-64"
        />
        <button
          onClick={() => fetchUsers()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Tìm kiếm
        </button>
      </div>

      {/* Bảng người dùng */}
      <table className="min-w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Avatar</th>
            <th className="p-2 border">Tên</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">SĐT</th>
            <th className="p-2 border">Trạng thái</th>
            <th className="p-2 border">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.phone} className="text-center">
                <td className="p-2 border">
                  <img
                    src={user.avatar || "/default-avatar.png"}
                    alt={user.name}
                    className="w-10 h-10 rounded-full mx-auto"
                  />
                </td>
                <td className="p-2 border">{user.name}</td>
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border">{user.phone}</td>
                <td className="p-2 border">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      user.status === "ONLINE"
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="p-2 border space-x-2">
                  {/* Reset */}
                  <button
                    className="p-2 rounded border hover:bg-gray-100"
                    onClick={() => {
                      setSelectedUser(user);
                      setOpenModal("reset");
                    }}
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>

                  {/* Login Info */}
                  <button
                    className="p-2 rounded border hover:bg-gray-100"
                    onClick={() => {
                      setSelectedUser(user);
                      setOpenModal("loginInfo");
                    }}
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  {/* Lock/Unlock */}
                  <button
                    className="p-2 rounded border hover:bg-gray-100"
                    onClick={() => {
                      setSelectedUser(user);
                      setOpenModal("lock");
                    }}
                  >
                    {user.status === "BLOCKED" ? (
                      <Unlock className="w-4 h-4" />
                    ) : (
                      <Lock className="w-4 h-4" />
                    )}
                  </button>

                  {/* Groups */}
                  <button
                    className="p-2 rounded border hover:bg-gray-100"
                    onClick={() => {
                      setSelectedUser(user);
                      setOpenModal("groups");
                    }}
                  >
                    <Users className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="p-4 text-center text-gray-500">
                Không tìm thấy người dùng
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Phân trang */}
      <div className="flex justify-between items-center mt-4">
        <span>
          Trang {queryConfig.page} / {totalPages || 1}
        </span>
        <div className="space-x-2">
          <button
            disabled={Number(queryConfig.page) <= 1}
            onClick={() =>
              setQueryConfig({
                ...queryConfig,
                page: Number(queryConfig.page) - 1,
              })
            }
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <button
            disabled={Number(queryConfig.page) >= totalPages}
            onClick={() =>
              setQueryConfig({
                ...queryConfig,
                page: Number(queryConfig.page) + 1,
              })
            }
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

 {/* Modal hiển thị nội dung động */}
      <Modal
        open={!!openModal}
        onClose={() => setOpenModal(null)}
        title={
          openModal === "reset"
            ? "Reset mật khẩu"
            : openModal === "loginInfo"
            ? "Thông tin login"
            : openModal === "lock"
            ? selectedUser?.status === "BLOCKED"
              ? "Mở khoá tài khoản"
              : "Khoá tài khoản"
            : openModal === "groups"
            ? "Danh sách nhóm"
            : ""
        }
      >
{openModal === "reset" && (
  <div>
    <p>
      Bạn có chắc muốn reset mật khẩu cho{" "}
      <b>{selectedUser?.name}</b>?
    </p>
    <button
      className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      onClick={async () => {
        if (!selectedUser?.email) return;

        try {
          const res = await userApi.resetPassUserAdmin({
            email: selectedUser.email,
          });
          alert(
            `Reset thành công. Mật khẩu mới đã gửi tới email ${selectedUser.email}`
          );
          setOpenModal(null);
        } catch (error) {
          console.error(error);
          alert("Reset mật khẩu thất bại!");
        }
      }}
    >
      Xác nhận Reset
    </button>
  </div>
)}

{openModal === "loginInfo" && (
  <div className="space-y-3">
    <p className="text-base font-medium">
      Lịch sử đăng nhập của <b>{selectedUser?.name}</b>
    </p>

    {loadingSessions ? (
      <p className="text-gray-500 text-sm">Đang tải...</p>
    ) : sessions.length > 0 ? (
      <div className="divide-y border rounded-md bg-white shadow-sm">
        {sessions.map((s) => (
          <div
            key={s.id}
            className="flex items-center justify-between p-3 hover:bg-gray-50 transition"
          >
            {/* Bên trái: Thông tin login */}
            <div className="flex flex-col text-sm">
              <span>
                <b>Đăng nhập:</b>{" "}
                {new Date(s.loginAt).toLocaleString("vi-VN")}
              </span>
              <span>
                <b>Đăng xuất:</b>{" "}
                {s.logoutAt
                  ? new Date(s.logoutAt).toLocaleString("vi-VN")
                  : "Chưa đăng xuất"}
              </span>
              <span className="text-xs text-gray-500">
                {s.ipAddress || "IP không rõ"} -{" "}
                {s.userAgent ? s.userAgent.slice(0, 30) + "..." : "Thiết bị không rõ"}
              </span>
            </div>

            {/* Bên phải: trạng thái */}
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                s.status === "ONLINE"
                  ? "bg-green-100 text-green-600"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {s.status}
            </span>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-gray-500 text-sm">Không có phiên đăng nhập nào</p>
    )}
  </div>
)}


{openModal === "lock" && (
  <div>
    <p>
      {selectedUser?.status === "BLOCK"
        ? `Bạn có chắc muốn mở khoá ${selectedUser?.name}?`
        : `Bạn có chắc muốn khoá ${selectedUser?.name}?`}
    </p>
    <button
      className="w-full mt-4 bg-red-600 text-white py-2 rounded hover:bg-red-700"
      onClick={async () => {
        if (!selectedUser?.phone) return;

        try {
          await userApi.resetsatusUserAdmin(selectedUser.phone);
          alert("Cập nhật trạng thái thành công!");
          setOpenModal(null);
          fetchUsers(); // reload danh sách user
        } catch (error) {
          console.error(error);
          alert("Cập nhật trạng thái thất bại!");
        }
      }}
    >
      {selectedUser?.status === "BLOCK" ? "Mở khoá" : "Khoá"}
    </button>
  </div>
)}

{openModal === "groups" && (
  <div className="space-y-3">
    <p className="text-base font-medium">
      Nhóm của <b>{selectedUser?.name}</b>
    </p>

    {groups.length > 0 ? (
      <div className="space-y-2">
        {groups.map((group) => (
          <div
            key={group.id}
            className="flex items-center gap-3 p-3 rounded-xl border bg-white shadow-sm hover:shadow-md transition"
          >
            {/* Avatar nhóm */}
            <img
              src={group.avatar || "/default-group.png"}
              alt={group.name}
              className="w-10 h-10 rounded-full object-cover"
            />

            {/* Nội dung nhóm */}
            <div className="flex-1">
              <p className="font-medium text-sm">{group.name}</p>
              <p className="text-xs text-gray-500 truncate">
                {group.last_message || "Chưa có tin nhắn"}
              </p>
            </div>

            {/* Info bên phải */}
            <div className="flex flex-col items-end text-xs text-gray-400">
              <span>
                {new Date(group.last_message_date).toLocaleDateString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </span>
              {group.unread_count > 0 && (
                <span className="mt-1 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {group.unread_count}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-sm text-gray-500">Không có nhóm nào</p>
    )}
  </div>
)}

      </Modal>
    </div>
  );
}
