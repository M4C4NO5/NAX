import { useState } from 'react';
import Task from "./Task";
import Button from './Button';

const defaultList = [
  {
    id: 1,
    task: "Wake up",
    hour: "6am",
    completed: true
  },
  {
    id: 2,
    task: "Do exercise",
    hour: "7am",
    completed: true
  },
  {
    id: 3,
    task: "Read a book",
    hour: "10am",
    completed: false
  }
]

function DailyList() {

  const [list, setList] = useState(defaultList);

  const handleCheckTask = event => {
    const itemId = Number(event.target.id.substring(4));
    const newList = list.map(item => {
      if (itemId === item.id) {
        item.completed = !item.completed;
      }
      return item;
    });
    setList(newList);
  }

  return (
    <div className="flex flex-col items-center bg-secondary p-8 rounded-lg w-96">
      <div className="text-center rounded-full bg-primary p-2 w-32 mb-6">
        <h3 className="text-2xl font-medium text-white">Daily</h3>
      </div>
      <div>
        {list.map(item => {
          return <Task key={item.id} action={handleCheckTask} {...item} />
        })}
      </div>
      <Button text={"Add new habit"} link='./newhabit'/>
    </div>
  );
}

export default DailyList;
