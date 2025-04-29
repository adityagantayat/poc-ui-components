import React, { useRef, useState } from 'react'
import BadgeComponent from './badge/BadgeComponent';
import { BellIcon, CircleAlertIcon, CircleCheckBig, CloudAlertIcon, FlagIcon, MailIcon, MessageSquareWarningIcon, OctagonXIcon, RefreshCcwIcon } from 'lucide-react';
import ToastManager from './toast-notifications/ToastContainer';
import { CustomButton, NeuroButtonWrapper } from './button';

const Home = () => {
    const [toastType, setToastType] = useState<'slide' | 'fade' | 'bounce' | 'pop'>('slide');
    const toastManagerRef = useRef<any>(null);
    const [mode, setMode] = useState<'dark' | 'light'>('dark');
    const getIcon = (type: string) => {
        switch (type) {
            case 'success':
                return <CircleCheckBig color='green' />;
            case 'error':
                return <OctagonXIcon color='red' />;
            case 'warning':
                return <CircleAlertIcon color='orange' />;
            case 'info':
                return <MessageSquareWarningIcon color='#60afd7' />;
            default:
                return <CircleCheckBig color='green' />;
                
        }
    }
    const handleAddToast = (variant: 'success' | 'error' | 'warning' | 'info') => {
      if (toastManagerRef.current) {
        toastManagerRef.current.addToast("This is a toast message", variant, toastType, mode, getIcon(variant));
      }
    };
    const changeMode = () => {
        if(mode === 'dark') {
            setMode('light');
        }
        else {
            setMode('dark');
        }
    }
    return (
        <div className='flex flex-col items-center justify-center h-screen bg-slate-100'>
        {/* <button className='rounded-lg bg-black text-white p-4' onClick={handleClick}>Show Toast notification </button> */}
            <h1 className='text-3xl font-bold'>Badge Component</h1>
            <div className='flex items-center justify-between mt-4 w-1/2'>
                <BadgeComponent text="15" type="warning" variant="bounce">
                    <MailIcon className="w-10 h-10 text-black"  />
                </BadgeComponent>
                <BadgeComponent text="15" type="primary" >
                    <FlagIcon className="w-10 h-10 text-black" />
                </BadgeComponent>
                <BadgeComponent text="15" type="error" variant="pulse">
                    <BellIcon className="w-10 h-10 text-black" />
                </BadgeComponent>
            </div>
            <h1 className='text-3xl font-bold mt-10'>Toast Notification</h1>
            <ToastManager ref={toastManagerRef} maxToasts={3}/>
                
            {/* </ToastManager> */}

      <div className="mb-4">
        <select
          onChange={(e) => setToastType(e.target.value as 'slide' | 'fade' | 'bounce' | 'pop')}
          className="p-2 border border-gray-300 rounded-lg w-full"
        >
          <option value="slide">Slide</option>
          <option value="fade">Fade</option>
          <option value="bounce">Bounce</option>
          <option value="pop">Pop</option>
        </select>
      </div>
      <div className='flex flex-wrap items-center justify-between mt-4 w-full p-10'>
        <CustomButton text='Success Toast'
            onClick={() => handleAddToast('success')}
            className="bg-green-500 text-white flex-1"
        />
        
        <CustomButton text='Warning Toast'
            onClick={() => handleAddToast('warning')}
            className="bg-yellow-500 text-black flex-1"
        />
        
        <CustomButton text='Error Toast'
            onClick={() => handleAddToast('error')}
            className="bg-red-500 text-white flex-1"
        />
        
        <CustomButton text='Info Toast'
            onClick={() => handleAddToast('info')}
            className="bg-blue-400 text-white flex-1"
        />
        

      </div>
        <NeuroButtonWrapper text={`Show ${mode === 'dark' ? 'light' : 'dark'} toast notification`} icon={<RefreshCcwIcon/>} handleClick={changeMode }/>
        </div>

    )
}

export default Home
