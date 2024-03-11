import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { API_URL_TODO, DEFAULT_HABIT } from '../constants/constants';
import Header from '../components/Header';


function NewHabitForm() {
  const [newHabit, setNewHabit] = useState(DEFAULT_HABIT);
  const navigate = useNavigate();


  const handleSubmit = event => {
    event.preventDefault();
    if (newHabit.name === '' || newHabit.hour === '') {
      console.log('error');
      // TODO: inform about errors
      return;
    }
    axios.post(API_URL_TODO, newHabit)
      .then(() => {
        setNewHabit(DEFAULT_HABIT);
        navigate('/');
      })
      .catch(error => {
        console.error('Error:', error.response.data);
        // Aquí puedes lanzar un error o manejar el error de otra manera
        alert('Error al crear hábito');
      });
  }


  const handleInputTask = event => {
    setNewHabit({
      ...newHabit,
      name: event.target.value
    });
  }

  const handleInputHour = event => {
    setNewHabit({
      ...newHabit,
      hour: event.target.value
    });
  }

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="mb-16 text-2xl font-bold text-primary">Guardar nuevo hábito</h2>
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
            <div className="flex items-center justify-center mb-16">
              <Input placeholder="Hábito" value={newHabit.name} action={handleInputTask} />
            </div>
            <div className="flex items-center justify-center mb-16">
              <Input type="time" placeholder="Hora" value={newHabit.hour} active={true} action={handleInputHour} />
            </div>
            <div className="flex items-center justify-center">
              <Button text="Guardar" type="submit" />
            </div>
        </form>
      </div>
    </>
  );
}

export default NewHabitForm;
