import { motion } from 'framer-motion';
import { CircleXIcon } from 'lucide-react';
import { useEffect } from 'react';

interface ToastProps {
  message: string;
  onClose: (id: number) => void; // Callback to remove the toast
  id: number;
  variant?: 'success' | 'error' | 'info' | 'warning' | 'default'; // You can add more variants here
  animation: 'slide' | 'fade' | 'bounce' | 'pop'; // You can add more types here
  mode?: 'dark' | 'light'; // You can add more modes here
  icon?: React.ReactNode; // Optional children prop
  appearance?: 'glow' | 'gradient';
  gradientColor?: string;
  duration?: number;
  timeoutMapRef: React.RefObject<Map<number, ReturnType<typeof setTimeout>>>;
}

const Toast = ({ message, onClose, id, animation, variant='default', mode, icon, appearance='gradient', gradientColor='rgba(5, 1, 1, 1)', duration = 4000, timeoutMapRef }: ToastProps) => {
  const animationVariants = {
      slide: {
          hidden: { x: '100%', opacity: 0},
          visible: { x: 0, opacity: 1 },
          exit: { x: '100%', opacity: 0 },
      },
      fade: {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
          exit: { opacity: 0 },
      },
      bounce: {
          hidden: { y: -50, opacity: 0 },
          visible: { y: 0, opacity: 1 },
          exit: { y: 50, opacity: 0 },
      },
      pop: {
          hidden: { opacity: 0, scale: 0.5 },
          visible: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 0.5 },
      },
  };
  const modeColor = appearance === 'glow' ? 
                                    mode === 'dark' ? 'bg-gradient-to-t from-gray-800 via-slate-800 to-gray-800 text-white' 
                                    : 'bg-white text-black'
                                    : '';
  const getVariantStyles = () => {
    if(appearance === 'glow') 
      {
        switch (variant) {
          case 'success':
            return {border: 'border-2 border-solid border-green-700',  
                    boxShadow: '0 0 10px rgba(34, 197, 94, 0.8), 0 0 20px rgba(34, 197, 94, 0.6), 0 0 30px rgba(34, 197, 94, 0.4)', };
          case 'error':
            return { border: 'border-2 border-solid border-red-700',   
                    boxShadow: '0 0 10px 5px rgba(255, 0, 0, 0.5)', };
          case 'warning':
            return { border: 'border-2 border-solid border-yellow-400', 
                boxShadow: '0 0 10px rgba(252, 211, 77, 0.8), 0 0 20px rgba(252, 211, 77, 0.6), 0 0 30px rgba(252, 211, 77, 0.4)'};
          case 'info':
            return { border: 'border-2 border-solid border-blue-700',  
                boxShadow: '0 0 10px rgba(59, 130, 246, 0.8), 0 0 20px rgba(59, 130, 246, 0.6), 0 0 30px rgba(59, 130, 246, 0.4)'};
          default:
            return {border: 'border-2 border-solid border-inherit'} ;
        }
      }
    else 
      {
        switch (variant) {
          case 'success':
            return {borderLeft:`6px solid ${gradientColor}`,
                    background:`linear-gradient(135deg, ${createGradient(gradientColor)}, ${gradientColor})`};
          case 'error':
            return { borderLeft:`6px solid ${gradientColor}`,
                    background:`linear-gradient(135deg, ${createGradient(gradientColor)}, ${gradientColor})`};
          case 'warning':
            return { borderLeft:`6px solid ${gradientColor}`,
                background:`linear-gradient(135deg, ${createGradient(gradientColor)}, ${gradientColor})`};
          case 'info':
            return { borderLeft:`6px solid ${gradientColor}`,
                background:`linear-gradient(135deg, ${createGradient(gradientColor)}, ${gradientColor})`};
          default:
            return {borderLeft:`6px solid ${gradientColor}`, 
                background:`linear-gradient(135deg, ${createGradient(gradientColor)}, ${gradientColor})`};
        }
      }

    };

  const createGradient = (color: string) => {
    const arr = color.slice(color.indexOf('(') + 1, color.indexOf(')')).split(',');
    if(arr.length > 3) {
      arr.pop();
    }
    arr.push(' 0.7');
    const fromGrad = `rgba(${arr.join(',')})`;
    return fromGrad;
  }
 

  useEffect(() => {
    const timeoutId = setTimeout(()=>onClose(id), duration); 
    const timeoutRefMap = timeoutMapRef.current; //capture the current timeoutRefMap
    timeoutRefMap.set(id, timeoutId);

    return () => {
      clearTimeout(timeoutId);
      timeoutRefMap.delete(id); // use captured reference
    };
  }, [duration]);

  return (
    <motion.div
      className={`toast p-1 rounded-lg shadow-lg mb-3 flex justify-between items-center ${modeColor}`}
      variants={animationVariants[animation]}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ type: 'spring', stiffness: 100, damping: 25 }}
      key={id}
      style={getVariantStyles()}
      aria-live="assertive"
    >
        <motion.span className='p-2'
            initial={{ opacity: 0, y: 50, scale: 0.5 }}
            animate={{ opacity: 1, y: [50, 0], scale: 1 }}
            transition={{ duration: 1,
                    ease: "easeInOut",
                    type: "spring",
                    stiffness: 300,
                    }}>
            <span style={{color: `${gradientColor} !important`}}>{icon}</span>
            </motion.span>
        <p className={mode === 'dark' ? 'text-white' : 'text-black'}>{message}</p>
        <button onClick={()=>onClose(id)} className={`ml-4 mb-2 text-xs transform hover:scale-75 ${mode === 'dark' ? 'text-white' : 'text-black'} font-semibold hover:text-gray-400`}>
            <CircleXIcon size='16px' className=''/>
        </button>
    </motion.div>
  );
};

export default Toast;
