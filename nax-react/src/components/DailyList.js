import { useState } from "react";
import axios from "axios";
import Button from './Button';
import Input from "./Input";
import Task from "./Task";
import { API_URL_TODO, DEFAULT_HABIT } from "../constants/constants";

function DailyList({ list, setList }) {
  const [newHabit, setNewHabit] = useState(DEFAULT_HABIT);
  const [inputHidden, setInputHidden] = useState(true);

  const handleCheckTask = event => {
    const itemId = Number(event.target.id.substring(4));
    const newList = list.map(item => {
      if (itemId === item.id) {
        item.completed = !item.completed;
        // Update habit with status
        axios.put(API_URL_TODO + item.id, item)
      }
      return item;
    });
    setList(newList);
  }

  const handleInputTask = event => {
    setNewHabit({
      ...newHabit,
      [event.target.id]: event.target.value
    });
  }

  const handleSubmitCreate = () => {
    if (newHabit.name === '' || newHabit.hour === '') {
      console.log('error');
      // Aquí puedes lanzar un error o manejar el error de otra manera
      alert('Debes llenar ambos campos');
      return;
    }
    axios.post(API_URL_TODO, newHabit)
      .then(({ data }) => {
        setNewHabit(DEFAULT_HABIT);
        setInputHidden(true);
        setList([...list, data]);
      })
      .catch(error => {
        console.error('Error:', error.response.data);
        // Aquí puedes lanzar un error o manejar el error de otra manera
        alert('Error al crear hábito');
      });
  }

  const deleteTask = (id) => {
    axios.delete(API_URL_TODO+id);
    setList(list.filter(task => task.id !== id));
  }

  return (
    <div className="flex flex-col items-center bg-secondary p-8 rounded-lg w-96">
      <div className="text-center rounded-full bg-primary p-5 w-60 mb-6">
        <h3 className="text-2xl font-semibold text-white">Hábitos Diarios</h3>
      </div>
      <div className="min-w-64 my-4">
        {list.map(item => {
          return (<Task key={item.id} action={handleCheckTask} deleteHabitFunc={deleteTask} {...item} />)
        })}
        {
          !inputHidden
          ? (
            <span className="flex mt-5">
              <Input id="name" placeholder="Hábito" value={newHabit.name} action={handleInputTask} className="rounded-l-md w-3/5" />
              <Input id="hour" type="time" placeholder="Hora" value={newHabit.hour} action={handleInputTask} className="rounded-r-md w-2/5" />
            </span>
          )
          : ''
        }
      </div>
      {
        inputHidden
        ? <Button text="Añadir nuevo hábito" action={() => setInputHidden(false)} />
        : <Button text="Confirmar" action={handleSubmitCreate} />
      }
    </div>
  );
}

export default DailyList;
