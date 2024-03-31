import './App.css';
import { Notifications } from 'react-push-notification';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DailyHabits from './pages/DailyHabits';

function App() {
  return (
    <div className='min-h-full h-screen'>
      <Notifications />
      <BrowserRouter>
        <Routes>
          <Route path='' element={
            <DailyHabits />
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
