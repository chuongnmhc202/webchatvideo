import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { User } from 'src/types/user.type'
import { AppProvider } from './contexts/app.context'
import { SocketProvider } from './contexts/SocketContext'
import SocketListeners from './contexts/SocketListeners'
import App from './App'

export default function MainApp() {
  const { data: profileDataLS } = useQuery<User>({
    queryKey: ['profile'],
    queryFn: async () => {
      const raw = localStorage.getItem('profile');
      if (!raw) throw new Error('No profile found in localStorage');
      return JSON.parse(raw) as User;
    },
  });

  const userId = profileDataLS?.phone || "";

  return (
    <AppProvider>
      <SocketProvider userId={userId}>
        <SocketListeners />
        <App />
      </SocketProvider>
    </AppProvider>
  );
}
