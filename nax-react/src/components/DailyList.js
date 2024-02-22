import { Link } from "react-router-dom";
import Task from "./Task";
import Button from './Button';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL_TODO } from "../constants/constants";
import { useState } from "react";

function DailyList({ list, setList }) {

  const navigate = useNavigate();

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

  const deletea = (itemid) => {
    axios.delete(API_URL_TODO+itemid);
    setList(list.filter(Task => Task.id !== itemid));
  }

  return (
    <div className="flex flex-col items-center bg-secondary p-8 rounded-lg w-96">
      <div className="text-center rounded-full bg-primary p-5 w-60 mb-6">
        <h3 className="text-2xl font-semibold text-white">Hábitos Diarios</h3>
      </div>
      <div className="min-w-64 my-4">
        {list.map(item => {
          return (<div><Task key={item.id} action={handleCheckTask} {...item} />
          <Button text="Borrar" action={() => {
            deletea(item.id)}} /></div>)
        })}
      </div>
      <Link to="newhabit">
        <Button text="Añadir nuevo hábito" />
      </Link>
    </div>
  );
}

export default DailyList;
