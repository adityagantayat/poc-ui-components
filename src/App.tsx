import './App.css';
import { Dialog } from './components/dialog-box/dialog';
import { DialogProvider } from './components/dialog-box/dialogContext';
import Home from './components/Home';
import { ToastProvider } from './components/toast-notifications/ToastContext';
// import { MyComponent } from './components/MyComponent';

function App() {
  return (
    <div className="App">
      <DialogProvider>
        <ToastProvider>
            <Home/>
        </ToastProvider>
      </DialogProvider>
    </div>
  );
}

export default App;
