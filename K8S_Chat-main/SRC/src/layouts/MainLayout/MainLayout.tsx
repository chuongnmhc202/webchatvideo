import React, { Suspense } from 'react'
import Footer from 'src/components/Footer'
import Header from 'src/components/Header'


import { useQuery } from '@tanstack/react-query'
import { User } from 'src/types/user.type'
import { SocketProvider } from 'src/contexts/SocketContext'
import SocketListeners from 'src/contexts/SocketListeners'


interface Props {
  children?: React.ReactNode
}
export default function MainLayout({ children }: Props) {
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
    <Suspense>
      <SocketProvider userId={userId}>
        <SocketListeners />
      <Header />
      {children}
      </SocketProvider>
    </Suspense>
  )
}
