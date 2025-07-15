import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, X, Info } from 'lucide-react';

export interface NotificationProps {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
  duration?: number;
  onClose: (id: string) => void;
}

const NotificationToast: React.FC<NotificationProps> = ({
  id,
  type,
  title,
  message,
  duration = 5000,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} className="text-success" />;
      case 'error':
        return <AlertCircle size={20} className="text-error" />;
      case 'info':
        return <Info size={20} className="text-accent-gold" />;
      default:
        return <Info size={20} className="text-accent-gold" />;
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case 'success':
        return 'border-success';
      case 'error':
        return 'border-error';
      case 'info':
        return 'border-accent-gold';
      default:
        return 'border-accent-gold';
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'bg-success/10';
      case 'error':
        return 'bg-error/10';
      case 'info':
        return 'bg-accent-gold/10';
      default:
        return 'bg-accent-gold/10';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 300, scale: 0.3 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.5, transition: { duration: 0.2 } }}
      className={`
        ${getBackgroundColor()} ${getBorderColor()}
        border backdrop-blur-md rounded-lg p-4 shadow-xl max-w-sm w-full
        relative overflow-hidden
      `}
      role="alert"
      aria-live="polite"
      aria-atomic="true"
    >
      {/* Barra de progresso */}
      <motion.div
        initial={{ width: '100%' }}
        animate={{ width: '0%' }}
        transition={{ duration: duration / 1000, ease: 'linear' }}
        className={`absolute top-0 left-0 h-1 ${
          type === 'success' ? 'bg-success' : 
          type === 'error' ? 'bg-error' : 'bg-accent-gold'
        }`}
      />

      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 mt-0.5">
          {getIcon()}
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-white mb-1">
            {title}
          </h4>
          <p className="text-sm text-gray-300">
            {message}
          </p>
        </div>
        
        <button
          onClick={() => onClose(id)}
          className="flex-shrink-0 text-gray-400 hover:text-white transition-colors p-1 rounded-md hover:bg-white/10"
          aria-label="Fechar notificação"
        >
          <X size={16} />
        </button>
      </div>
    </motion.div>
  );
};

export default NotificationToast;