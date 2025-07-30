// src/hooks/useTyping.ts
import { useEffect, useRef } from 'react';
import { Socket } from 'socket.io-client';

export function useTyping(socket: Socket, conversationId: string, userId: string) {
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleTyping = () => {
    socket.emit('typing', { conversationId, userId });

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      socket.emit('stop_typing', { conversationId, userId });
    }, 3000); // sau 3s không nhập thì ngừng typing
  };

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  return { handleTyping };
}
