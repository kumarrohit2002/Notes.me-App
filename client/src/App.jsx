
import './App.css'
import LoginPage from './components/LoginPage';
import MainPage from './components/MainPage';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Routes,Route} from 'react-router-dom';




function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/notes" element={<MainPage/>} />
       
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App
