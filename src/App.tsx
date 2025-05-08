import './App.css';
import Home from './components/Home';
import { ToastProvider } from './components/toast-notifications/ToastContext';
// import { MyComponent } from './components/MyComponent';

function App() {
  return (
    <div className="App">
      <ToastProvider>
          <Home/>
      </ToastProvider>
    </div>
  );
}

export default App;
