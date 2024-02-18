import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DailyHabits from './pages/DailyHabits';

function App() {
  return (
    <div className='min-h-full h-screen'>
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
