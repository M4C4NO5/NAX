import { useState } from "react";
import axios from "axios";
import Button from './Button';
import Input from "./Input";
import Task from "./Task";
import { API_URL_TODO, DEFAULT_HABIT } from "../constants/constants";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

function DailyList({ list, setList }) {
  const [message, setMessage] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
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
      return;
    }
    if (!confirmation) {
      for (const item of list) {
        if (item.hour === newHabit.hour) {
          setMessage(true);
          return;
        }
      }
    }
    console.log(newHabit);
    axios.post(API_URL_TODO, newHabit)
      .then(({ data }) => {
        setNewHabit(DEFAULT_HABIT);
        setInputHidden(true);
        setList([...list, data]);
      }
    )
    setConfirmation(false);
  }

  const deleteTask = (id) => {
    axios.delete(API_URL_TODO+id);
    setList(list.filter(task => task.id !== id));
  }

  const handleSubmitUpdate = (id,habit) => {
    if (habit.name === '' || habit.hour === '') {
      console.log('error');
      // Aquí puedes lanzar un error o manejar el error de otra manera
      alert('Debes llenar ambos campos');
      return;
    }
    axios.put(API_URL_TODO+id, habit)
      .then(() => {
        setNewHabit(DEFAULT_HABIT);
        axios.get(API_URL_TODO + "?format=json").then(
          // on success
          ({ data }) => setList(data),
          // on error
          (data) => console.error(data)
        );
      })
      .catch(error => {
        console.error('Error:', error.response.data);
        // Aquí puedes lanzar un error o manejar el error de otra manera
        alert('Error al actualizar hábito');
      });
  }

  const confirmDuplicateHabit = () => {
    setConfirmation(true);
    setMessage(false);
  }

  return (
    <div className="flex flex-col items-center bg-secondary p-8 rounded-lg w-96">
      <div className="text-center rounded-full bg-primary p-5 w-60">
        <h3 className="text-2xl font-semibold text-white">Hábitos Diarios</h3>
      </div>
      <div className="w-full my-4">
        {list.map(item => {
          return (<Task key={item.id} action={handleCheckTask} deleteHabitFunc={deleteTask} updateHabitFunc={handleSubmitUpdate} {...item} />)
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
        :
        <div className="flex gap-4">
          <Button text="Cancelar" action={() => setInputHidden(!inputHidden)}/>
          <Button text="Confirmar" action={handleSubmitCreate} />
        </div>
      }
      <Dialog open={message} handler={() => setMessage(false)}>
        <DialogHeader>En este horario hay otro hábito</DialogHeader>
        <DialogBody>
          ¿Estás segur@ de crear este hábito?
          No dudamos que puedas hacer varias cosas al mismo tiempo, pero asegúrate que estas tareas sean compatibles.
          Haz click en "Cancelar" para cambiar la hora del hábito.
          Por el contrario, presiona "Confirmar" para crearlo de todas maneras.
        </DialogBody>
        <DialogFooter>
          <Button
            text="Cancelar"
            action={() => setMessage(false)}
            className="mr-4"
          />
          <Button
            text="Confirmar"
            variant="auxiliar"
            action={confirmDuplicateHabit}
          />
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default DailyList;
