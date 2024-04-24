import { useEffect, useState } from "react";
import DailyList from "../components/DailyList";
import axios from "axios";
import { API_URL_SIMULATE, API_URL_STREAK, API_URL_TODO } from "../constants/constants";
import Button from "../components/Button";
import Header from "../components/Header";

function DailyHabits() {

  const [list, setList] = useState([]);
  const [percentageDaily, setpercentageDaily] = useState(0);
  const [streak, setStreak] = useState(0);

  const circumference = 70 * 2 * Math.PI;

  useEffect(() => {
    axios.get(API_URL_TODO + "?format=json").then(
      // on success
      ({ data }) => {
        if (data !== undefined) {
          setList(data);
        }
      },
      // on error
      (data) => console.error(data)
    );

    axios.get(API_URL_STREAK).then(
      // on success
      ({ data }) => {
        if (data !== undefined) {
          setStreak(data);
        }
      },
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
    setpercentageDaily((counter * 100) / total);
  }, [list])

  const simulateDay = async () => {
    await axios.get(API_URL_SIMULATE);

    const newList = list.map(item => {
      item.completed = false;
      return item;
    });
    setList(newList);

    axios.get(API_URL_STREAK).then(
      // on success
      ({ data }) => {
        setStreak(data);
      },
      // on error
      (data) => console.error(data)
    );
  };

  return (
    <>
      <Header />
      <main className="flex justify-evenly px-20 relative top-28">
        <section className="flex flex-col items-center justify-center">
          {/* Progress bar */}
          <h3 className="text-lg mb-3">Tu progreso hoy</h3>
          <div className="w-96 h-4 mb-2 bg-support rounded-full">
            <div className="h-4 bg-primary rounded-full ease-in-out delay-75 duration-500" style={{width: `${percentageDaily}%`}} />
          </div>
          {/* List */}
          <DailyList list={list} setList={setList} />
          {/* Simulate button */}
          <div className="my-12">
            <Button text="Simular día" action={simulateDay} />
          </div>
        </section>
        <section className="flex flex-col items-center mt-24">
          <h3 className="text-xl font-bold mb-10">Tu racha de hábitos</h3>
          <svg className="w-36 h-36">
            <circle className="text-support m-auto" strokeWidth={15} stroke="currentColor" fill="transparent" r={60} cx={70} cy={70} />
            <circle className="text-primary m-auto" strokeWidth={15} strokeDasharray={circumference} strokeDashoffset={circumference - Math.round((streak * 100) / 21) / 100 * circumference} strokeLinecap="round" stroke="currentColor" fill="transparent" r={60} cx={70} cy={70} />
          </svg>
          <h3 className="text-xl font-bold relative mt-2 -top-24">{streak} día(s)</h3>
          <p className="mb-2 w-2/3 text-center">Según estudios, después de 21 días comienzas a afianzar en tu cerebro algún habíto.</p>
          <p className="w-2/3 text-center">¡Pero mantén tu racha todo lo que puedas!</p>
        </section>
      </main>
    </>
  );
}

export default DailyHabits;
