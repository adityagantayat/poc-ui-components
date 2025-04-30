import { motion, AnimatePresence, scale } from 'framer-motion';
import { CSSProperties } from 'react';

export type AnimationKey = 'popIn'
  | 'springPop'
  | 'backdropZoom'
  | 'flip3D'
  | 'skewSlide'
  | 'glassBlur'
  | 'skyDrop';

 export const animations = {
  popIn: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.9, opacity: 0 },
    transition: { type: 'spring', stiffness: 300, damping: 25,ease: 'easeInOut' },
  },
  springPop: {
    initial: { y: 100, opacity: 0, scale:0.2 },
    animate: { y: [50, 0], opacity: 1, scale:[0.3, 1] },
    exit: { y: 100, opacity: 0, scale:0.2 },
    transition: { duration: 0.2, type:'spring', stiffness:200, ease: 'easeOut' },
  },
  backdropZoom: {
      initial: { scale: 1.2, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 0.95, opacity: 0 },
  },
  flip3D: {
    initial: { rotateY: -180, opacity: 0 },
    animate: { rotateY: 0, opacity: 1 },
    exit: { rotateY: -180, opacity: 0 },
    transition: { duration: 0.5 },
  },
  skewSlide: {
    initial: { skewY: 10, y: -100, opacity: 0 },
    animate: { skewY: 0, y: 0, opacity: 1 },
    exit: { y: -100, opacity: 0 },
  },
  glassBlur: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.5 },
  },
  skyDrop: {
    initial: { y: -300, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -300, opacity: 0 },
    transition: { type: 'spring', stiffness: 300, damping: 15 },
  },
};

interface DialogProps{
  show: boolean;
  animationKey?: keyof typeof animations;
  onClose: () => void;
  onConfirm?: () => void;
  dialogType: 'confirm' | 'alert' | 'error' | 'success';
  title: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  headerStyles?: CSSProperties;
  children?: React.ReactNode;
  defaultButtons?: boolean;
}
const headerGradient = (type:'confirm' | 'alert' | 'error' | 'success' ) => {
    switch (type) {
      case 'success':
        return 'bg-gradient-to-r from-green-400 to-green-600';
      case 'confirm':
        return 'bg-gradient-to-r from-blue-400 to-blue-600';
      case 'error':
        return 'bg-gradient-to-r from-red-400 to-red-600';
      case 'alert':
        return 'bg-gradient-to-r from-yellow-300 to-yellow-500';
      default:
        return 'bg-gradient-to-r from-gray-300 to-gray-500';
    }
  };
export const Dialog = ({ show, animationKey = 'popIn', 
                        onClose, dialogType, 
                        title, onConfirm,
                        cancelButtonText, confirmButtonText,
                        headerStyles, children,
                        defaultButtons=true }: DialogProps) => {
  const anim = animations[animationKey];
  return (
    <AnimatePresence>
      {show && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <motion.div
            className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[70vh] flex flex-col m-4"
            {...anim}
          >
            <div className={`flex items-center justify-center rounded-t-xl ${headerGradient(dialogType)} p-2`}
            style={headerStyles}>
                <h2 className="text-xl font-bold">{title}</h2>
            </div>
            <div className="p-4 flex-1 overflow-y-auto">
                {children}
            </div>
            { defaultButtons && <div className="flex items-center justify-center space-x-4  gap-4 p-4">              
                    {
                        dialogType === 'confirm' && 
                        <button onClick={onConfirm} className="px-6 py-2 font-medium bg-indigo-500 text-white w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]">
                            {confirmButtonText || 'Confirm'}
                        </button>
                    }
                    <button onClick={onClose} className="px-6 py-2 font-medium bg-gray-100 text-black w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]">
                        {cancelButtonText || 'Cancel'}
                    </button>
            </div>}
            
          </motion.div>
          </div>
        )}
      </AnimatePresence>
    );
};