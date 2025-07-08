import React, { createContext, useContext, useEffect, useState } from 'react';
import { connectSocket, getSocket } from 'src/socket/socket';

interface SocketContextType {
  socketReady: boolean;
  socket: ReturnType<typeof getSocket> | null;
  onlineUsers: string[];
}

const SocketContext = createContext<SocketContextType>({
  socketReady: false,
  socket: null,
  onlineUsers: [],
});

export const useSocketContext = () => useContext(SocketContext);

export const SocketProvider = ({ userId, children }: { userId: string; children: React.ReactNode }) => {
  const [socketReady, setSocketReady] = useState(false);
  const [socket, setSocket] = useState<ReturnType<typeof getSocket> | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  useEffect(() => {
    if (!userId) return;

    connectSocket(userId);
    const currentSocket = getSocket();
    if (!currentSocket) return;

    const handleConnect = () => {
      setSocketReady(true);
      setSocket(currentSocket);
    };

    const handleDisconnect = () => {
      setSocketReady(false);
      setSocket(null);
      setOnlineUsers([]);
    };

    const handleOnlineUsers = (users: string[]) => {
      setOnlineUsers(users);
    };

    currentSocket.on('connect', handleConnect);
    currentSocket.on('disconnect', handleDisconnect);
    currentSocket.on('getOnlineUsers', handleOnlineUsers);

    if (currentSocket.connected) {
      setSocketReady(true);
      setSocket(currentSocket);
    }

    return () => {
      currentSocket.off('connect', handleConnect);
      currentSocket.off('disconnect', handleDisconnect);
      currentSocket.off('getOnlineUsers', handleOnlineUsers);
    };
  }, [userId]);

  useEffect(() => {
  console.log("✅ SocketProvider MOUNTED for", userId);
}, [userId]);

return (
    <SocketContext.Provider value={{ socketReady, socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
