import { useRef, useState } from 'react'
import BadgeComponent from './badge/BadgeComponent';
import { BellIcon, CircleAlertIcon, CircleCheckBig, FlagIcon, MailIcon, MessageSquareWarningIcon, OctagonXIcon, RefreshCcwIcon } from 'lucide-react';
import ToastManager, { ToastAnimationTypes, ToastManagerRef, ToastVariantTypes } from './toast-notifications/ToastContainer';
import { CustomButton, NeuroButtonWrapper } from './button';
import { DialogAnimationTypes, animations, Dialog, DialogRef, DialogTypes } from './dialog-box/dialog';

const Home = () => {
    const [toastAnimationType, setToastAnimationType] = useState<ToastAnimationTypes>('slide');
    const [dialogType, setDialogType] = useState<DialogTypes>('alert');
    const toastManagerRef = useRef<ToastManagerRef>(null);
    const [mode, setMode] = useState<'dark' | 'light'>('dark');
    const [appearance, setAppearance] = useState<'glow' | 'gradient'>('glow');
    const dialogRef = useRef<DialogRef>(null);
    const getIcon = (type: string) => {
        switch (type) {
            case 'success':
                return <CircleCheckBig color='green' />;
            case 'error':
                return <OctagonXIcon color='maroon' />;
            case 'warning':
                return <CircleAlertIcon color='orange' />;
            case 'info':
                return <MessageSquareWarningIcon color='teal' />;
            default:
                return <CircleCheckBig color='green' />;
                
        }
    }
    const getGradientColor = (type: string) => {
        switch (type) {
            case 'success':
                return 'rgba(34, 197, 94, 1)';
            case 'error':
                return 'rgba(255, 0, 0, 1)';
            case 'warning':
                return 'rgba(252, 211, 77, 1)';
            case 'info':
                return 'rgba(59, 130, 246, 1)';
            default:  
                return 'rgba(34, 197, 94, 1)';
        }
    }
    const handleAddToast = (variant: ToastVariantTypes) => {
      if (toastManagerRef.current) {
        toastManagerRef.current.addToast({message: "This is a toast message",
                                          mode: mode,
                                          variant: variant,
                                          animation: toastAnimationType,
                                          icon: getIcon(variant),
                                          appearance,
                                          gradientColor: getGradientColor(variant),
                                        });
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
    const changeAppearance = () => {
        if(appearance === 'glow') {
            setAppearance('gradient');
        }
        else {
            setAppearance('glow');
        }
    }
    const handleOpenDialog = (key: DialogAnimationTypes) => {
        dialogRef.current?.open({
            animationKey: key,
            dialogType: dialogType,
            title: 'Customisable Dialog header with customisable styles',
            content: 'This is a dialog box with customisable animation and styles',
            confirmButtonText: 'Alright !',
            cancelButtonText: 'Cancel !',
            confirmationCallBack: (confirm: boolean) => {
                 confirm ? handleAddToast('success') : handleAddToast('error');
            },
            headerStyles: {display:'flex', textAlign: 'center'},
        });
    };
    return (
        <div className='flex flex-col items-center justify-center bg-slate-100'>
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
            <ToastManager ref={toastManagerRef} maxToasts={4}/>
                
            {/* </ToastManager> */}
      <div className='mt-4 flex flex-col w-full items-center justify-center gap-2' >
        <div className="mb-4">
          <select
            onChange={(e) => setToastAnimationType(e.target.value as ToastAnimationTypes)}
            className="p-2 border border-gray-300 rounded-lg w-full"
          >
            <option value="slide">Slide</option>
            <option value="fade">Fade</option>
            <option value="bounce">Bounce</option>
            <option value="pop">Pop</option>
          </select>
        </div>
          
      <NeuroButtonWrapper text={`Show ${appearance === 'glow' ? 'gradient' : 'glow'} toast notification`} icon={<RefreshCcwIcon/>} handleClick={changeAppearance }/>

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
      {appearance === 'glow' && <NeuroButtonWrapper text={`Show ${mode === 'dark' ? 'light' : 'dark'} toast notification`} icon={<RefreshCcwIcon/>} handleClick={changeMode }/>
}
      <div className='mt-4 flex w-full items-center justify-center gap-2' >
        <h2>Select the type of dialog box</h2>
        <select
          onChange={(e) => setDialogType(e.target.value as DialogTypes)}
          className="p-2 border border-gray-300 rounded-lg"
        >
          <option value="alert">alert</option>
          <option value="success">success</option>
          <option value="error">error</option>
          <option value="confirm">confirm</option>
        </select>
      </div>
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Choose from the below Dialog Animations</h1>
          <div className="flex flex-wrap gap-4">
            {Object.keys(animations).map((key: string) => (
              <button
                key={key}
                onClick={() => handleOpenDialog(key as DialogAnimationTypes)}
                className="p-4 bg-gray-200 rounded shadow"
              >
                {key}
              </button>
            ))}
          </div>
          <Dialog ref={dialogRef}/>
        </div>
      </div>

    )
}

export default Home
