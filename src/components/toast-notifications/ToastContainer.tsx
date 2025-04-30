import React, { forwardRef, useImperativeHandle, useState } from 'react';
import Toast from './ToastComponent';
import { AnimatePresence } from 'framer-motion';

interface ToastManagerProps {
  maxToasts: number; // Maximum number of toasts to display at once
}
interface ToastProps { 
  id: number; message: string; variant: 'success' | 'error' | 'warning' | 'info'; 
  animation: 'slide' | 'fade' | 'bounce' | 'pop', 
  mode: 'dark' | 'light', 
  icon: React.ReactNode,
  appearance?: 'glow' | 'gradient';
  gradientColor?: string;
  duration?: number;
}
export type ToastDataArgs = Omit<ToastProps, 'id'>;

export interface ToastManagerRef {
  addToast: (data: ToastDataArgs) => void;
}
  
const ToastManager = forwardRef<ToastManagerRef, ToastManagerProps>(({ maxToasts }, ref) => {
    const [toasts, setToasts] = useState<ToastProps[]>([]);
  
    // Expose the addToast function to the parent via ref
    useImperativeHandle(ref, () => ({
      addToast: (data: ToastDataArgs) => {
        const { message, variant, animation, mode, icon, appearance = 'glow', gradientColor = 'rgba(5, 1, 1, 1)', duration = 4000 } = data;
        setToasts((prevToasts) => {
          if (prevToasts.length >= maxToasts) {
            return [{ id: Date.now(), message, variant, animation, mode, icon, appearance, gradientColor, duration }, ...prevToasts.slice(0,-1)];
          }
          return [{ id: Date.now(), message, variant, animation, mode, icon, appearance, gradientColor, duration }, ...prevToasts];
        });
      },
    }));
  
    const removeToast = (id: number) => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    };
  
    return (
      <div className="fixed top-5 right-5 mt-4 mr-4 w-sm space-y-8">
        <AnimatePresence>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            id={toast.id}
            variant={toast.variant}
            message={toast.message}
            animation={toast.animation}
            onClose={() => removeToast(toast.id)}
            icon={toast.icon}
            mode={toast.mode}
            appearance={toast.appearance}
            gradientColor={toast.gradientColor}
            duration={toast.duration}
          />
        ))}
        </AnimatePresence>
      </div>
    );
  });
  
  ToastManager.displayName = 'ToastManager'; // For better debugging and ref forwarding
  
  export default ToastManager;