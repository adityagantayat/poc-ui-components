import './App.css';
import { DialogProvider } from './components/dialog-box/dialogContext';
import Home from './components/Home';
import { ToastProvider } from './components/toast-notifications/ToastContext';

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
