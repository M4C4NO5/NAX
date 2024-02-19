import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";

const DEFAULT_HABIT = {
  task: '',
  hour: ''
}

function NewHabitForm() {
  const [newHabit, setNewHabit] = useState(DEFAULT_HABIT);
  const navigate = useNavigate()

  const handleSubmit = event => {
    event.preventDefault();
    if (newHabit.task === '' || newHabit.hour === '') {
      console.log('error');
      // TODO: inform about errors
      return;
    }
    console.log(newHabit);
    // TODO: post item to API
    setNewHabit(DEFAULT_HABIT);
    navigate('/');
  }

  const handleInputTask = event => {
    setNewHabit({
      ...newHabit,
      task: event.target.value
    });
  }

  const handleInputHour = event => {
    setNewHabit({
      ...newHabit,
      hour: event.target.value
    });
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <div className="flex items-center justify-center mb-16">
            <Input placeholder="Habit" value={newHabit.task} action={handleInputTask} />
          </div>
          <div className="flex items-center justify-center mb-16">
            <Input placeholder="Hour" value={newHabit.hour} action={handleInputHour} />
          </div>
          <div className="flex items-center justify-center">
            <Button text="Submit" type="submit" />
          </div>
      </form>
    </div>
  );
}

export default NewHabitForm;
