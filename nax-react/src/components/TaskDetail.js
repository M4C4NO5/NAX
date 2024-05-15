import axios from "axios";
import { useState } from "react";
import Button from "./Button";
import {
  Drawer,
  IconButton,
} from "@material-tailwind/react";
import { API_URL_CALENDAR } from "../constants/constants";

export function TaskDetail({
  open,
  close,
  id,
  name,
  hour,
  hour_end,
  description,
  updateHabitFunc = () => {},
  deleteHabitFunc = () => {},
}) {
  const [message, setMessage] = useState(false)
  const [editing, setEditing] = useState(false);
  const [newHabit, setNewHabit] = useState({
    'name': name,
    'hour': hour,
    'hour_end': hour_end,
    'description': description,
  });

  const handleInputTask = event => {
    setNewHabit({
      ...newHabit,
      [event.target.id]: event.target.value
    });
  }

  const updateAction = () => {
    if (newHabit.hour_end < newHabit.hour) {
      setMessage("La hora de fin no puede ser mayor a la de inicio")
      return;
    }
    updateHabitFunc(id, newHabit);
    setEditing(false);
    setMessage(false);
  }

  const addToCalendar = () => {
    axios.get(API_URL_CALENDAR + id).then(() => {
      setMessage("¡Hábito agregado a Google Calendar!");
      setTimeout(() => {
        setMessage(false);
      }, 8000);
    })
  }

  return (
    <Drawer size={650} placement="right" open={open} onClose={close} className="p-10 w-1/2">
      <div className="mb-10 flex items-center justify-between">
        {
          !editing
          ? <h2 className="text-4xl">{name}</h2>
          : <input type="text" id="name" placeholder="Hábito" value={newHabit.name} onChange={handleInputTask} className="text-4xl p-2 border border-gray-600 rounded-lg w-full" />
        }

        <IconButton variant="text" color="blue-gray" onClick={close}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </IconButton>
      </div>

      {
        !editing
        ? (
          <>
            <p className="text-lg mb-2">Hora inicio: {hour}</p>
            <p className="text-lg mb-10">Hora final: {hour_end ?? "no tiene"}</p>
            <p className="text-lg mb-16 text-gray-700">
              {
                description ?? "Agrega más información relevante que quieras tener a la mano para la realización del hábito o tarea. También pueden ser subtareas que debas recordar."
              }
            </p>
          </>
        )
        : (
          <>
            <p className="text-lg mb-2">Hora inicio: <input id="hour" type="time" value={newHabit.hour} onChange={handleInputTask} className="border border-gray-600 rounded-lg p-0.5" /></p>
            <p className="text-lg mb-10">Hora final: <input id="hour_end" type="time" value={newHabit.hour_end} onChange={handleInputTask} className="border border-gray-600 rounded-lg p-0.5" /></p>
            <textarea
              id="description"
              value={newHabit.description}
              onChange={handleInputTask}
              className="text-lg mb-16 text-gray-700 w-full h-32 border border-gray-600 rounded-lg p-2"
              placeholder="Agrega más información relevante que quieras tener a la mano para la realización del hábito o tarea. También pueden ser subtareas que debas recordar."
            ></textarea>
          </>
        )
      }
      <div className="flex gap-2 mb-12">
        {
          !editing
          ? (
            <>
              <Button text="Editar" action={() => setEditing(true)} />
              <Button text="Agregar a Calendar" variant={'auxiliar'} action={addToCalendar} />
            </>
          )
          : (
            <>
              <Button text="Cancelar" action={() => setEditing(false)} />
              <Button text="Confirmar" variant={'auxiliar'} action={updateAction} />
            </>
          )
        }
        <Button text="Borrar" action={() => deleteHabitFunc(id)} />
      </div>
      {
        message
        ? (
          <span className="p-4 bg-auxiliar text-white rounded-xl ">
            {message}
          </span>
        )
        : ""
      }
    </Drawer>
  );
}
