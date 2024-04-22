import { useEffect, useState } from "react";
import DailyList from "../components/DailyList";
import axios from "axios";
import { API_URL_SIMULATE, API_URL_TODO } from "../constants/constants";
import Button from "../components/Button";
import Header from "../components/Header";

function DailyHabits() {

  const [list, setList] = useState([]);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    axios.get(API_URL_TODO + "?format=json").then(
      // on success
      ({ data }) => setList(data),
      // on error
      (data) => console.error(data)
    );
  }, [])

  useEffect(() => {
    let total = list.length;
    let counter = 0;
    for (const item of list) {
      if (item.completed) {
        counter++;
      }
    }
    setPercentage((counter * 100) / total);
  }, [list])

  const simulateDay = () => {
    axios.get(API_URL_SIMULATE);
    const newList = list.map(item => {
      item.completed = false;
      return item;
    });
    setList(newList);
  };

  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center flex-1 relative top-24">
        {/* Progress bar */}
        <h3 className="text-lg mb-3">Tu progreso hoy:</h3>
        <div className="w-96 h-4 mb-2 bg-support rounded-full">
          <div className="h-4 bg-primary rounded-full ease-in-out delay-75 duration-500" style={{width: `${percentage}%`}} />
        </div>
        {/* List */}
        <DailyList list={list} setList={setList} />
        {/* Simulate button */}
        <div className="mt-12">
          <Button text="Simular día" action={simulateDay} />
        </div>
        <div className="mt-12">
          <Button text="Crear hábitos por defecto" action={handleCreateDefaultHabits} />
        </div>
      </main>
    </>
  );
}

export default DailyHabits;
