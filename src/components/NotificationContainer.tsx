import React, { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import NotificationToast, { NotificationProps } from './NotificationToast';

interface NotificationContextType {
  addNotification: (notification: Omit<NotificationProps, 'id' | 'onClose'>) => void;
  removeNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: React.ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);

  const addNotification = useCallback((notification: Omit<NotificationProps, 'id' | 'onClose'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newNotification: NotificationProps = {
      ...notification,
      id,
      onClose: removeNotification,
    };
    
    setNotifications(prev => [...prev, newNotification]);
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  return (
    <NotificationContext.Provider value={{ addNotification, removeNotification }}>
      {children}
      
      {/* Container de notificações */}
      <div 
        className="fixed top-4 right-4 z-50 space-y-3 max-w-sm w-full pointer-events-none"
        aria-live="polite"
        aria-label="Notificações"
      >
        <AnimatePresence mode="popLayout">
          {notifications.map((notification) => (
            <div key={notification.id} className="pointer-events-auto">
              <NotificationToast {...notification} />
            </div>
          ))}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;