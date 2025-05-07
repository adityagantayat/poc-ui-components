import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import Toast from './ToastComponent';
import { AnimatePresence } from 'framer-motion';

interface ToastManagerProps {
  maxToasts: number; // Maximum number of toasts to display at once
}
export type ToastAnimationTypes = 'slide' | 'fade' | 'bounce' | 'pop';
export type ToastVariantTypes = 'success' | 'error' | 'warning' | 'info';
interface ToastProps { 
  id: number; message: string; variant: ToastVariantTypes; 
  animation: ToastAnimationTypes, 
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
    const timeoutMapRef = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());
    // Expose the addToast function to the parent via ref
    useImperativeHandle(ref, () => ({
      addToast: (data: ToastDataArgs) => {
        const { message, variant, animation, mode, icon, appearance = 'glow', gradientColor = 'rgba(5, 1, 1, 1)', duration = 4000 } = data;
        const newToast = {id:Date.now() + Math.random(), message, variant, animation, mode, icon, appearance, gradientColor, duration}
        const updatedToasts = [newToast, ...toasts];
        // If the number of toasts exceeds maxToasts, remove the oldest one
        if (updatedToasts.length > maxToasts) {
          const deletedToast = updatedToasts.pop();
          removeToast(deletedToast?.id || 0);
        }
        setToasts(updatedToasts);
      },
    }));
  
    const removeToast = (id: number) => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
      const timeout = timeoutMapRef.current.get(id);
      if (timeout) {
        clearTimeout(timeout);
        timeoutMapRef.current.delete(id);
      }
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
            onClose={(id) => removeToast(id)}
            icon={toast.icon}
            mode={toast.mode}
            appearance={toast.appearance}
            gradientColor={toast.gradientColor}
            duration={toast.duration}
            timeoutMapRef={timeoutMapRef}
          />
        ))}
        </AnimatePresence>
      </div>
    );
  });
  
  ToastManager.displayName = 'ToastManager'; // For better debugging and ref forwarding
  
  export default ToastManager;