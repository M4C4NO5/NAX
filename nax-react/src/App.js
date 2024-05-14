import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DailyHabits from './pages/DailyHabits';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import Analytics from './pages/Analytics';

function App() {
  return (
    <div className='min-h-full h-screen'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            <DailyHabits />
          } />
          <Route path='register' element={
            <RegisterPage/>
          } />
          <Route path='login' element={
            <LoginPage/>
          } />
          <Route path='analytics' element={
            <Analytics/>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
