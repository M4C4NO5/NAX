import { Link } from "react-router-dom";
import Task from "./Task";
import Button from './Button';
import axios from "axios";
import { API_URL_TODO } from "../constants/constants";

function DailyList({ list, setList }) {

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

  const deletea = (event) => {
    axios.delete(API_URL_TODO+event.target.id);
    setList(list.filter(task => task.id !== parseInt(event.target.id)));
  }

  return (
    <div className="flex flex-col items-center bg-secondary p-8 rounded-lg w-96">
      <div className="text-center rounded-full bg-primary p-5 w-60 mb-6">
        <h3 className="text-2xl font-semibold text-white">Hábitos Diarios</h3>
      </div>
      <div className="min-w-64 my-4">
        {list.map(item => {
          return (<Task key={item.id} action={handleCheckTask} deleteHabitFunc={deletea} {...item} />)
        })}
      </div>
      <Link to="newhabit">
        <Button text="Añadir nuevo hábito" />
      </Link>
    </div>
  );
}

export default DailyList;
