import clsx from "clsx";
export const CustomButton: React.FC<{text: string, className: string, onClick?: () => void;}>  = ({ text, className, onClick }) => {
 
    return (
      <button onClick={onClick} className={clsx("rounded-2xl border-2 border-dotted border-black px-6 py-3 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"
                        ,className)}>
        {text}
      </button>
    );
  };

  export const NeuroButtonWrapper : React.FC<{ text: string; icon: React.ReactNode, handleClick: ()=>void }> = ({ text, icon, handleClick }) => {
    return (
      <div className="bg-slate-100 w-full min-h-[200px] flex items-center justify-center">
        <NeumorphismButton text={text} icon={icon} handleClick={handleClick} />
      </div>
    );
  };
  
  const NeumorphismButton: React.FC<{ text: string; icon: React.ReactNode, handleClick: ()=>void }> = ({ text, icon, handleClick  }) => {
    return (
      <button
      onClick={handleClick}
        className={`
          px-4 py-2 rounded-full 
          flex items-center gap-2 
          text-slate-500
          shadow-[-5px_-5px_10px_rgba(255,_255,_255,_0.8),_5px_5px_10px_rgba(0,_0,_0,_0.25)]
          
          transition-all
  
          hover:shadow-[-1px_-1px_5px_rgba(255,_255,_255,_0.6),_1px_1px_5px_rgba(0,_0,_0,_0.3),inset_-2px_-2px_5px_rgba(255,_255,_255,_1),inset_2px_2px_4px_rgba(0,_0,_0,_0.3)]
          hover:text-violet-500
      `}
      >
        {icon}
        <span>{text}</span>
      </button>
    );
  };
  