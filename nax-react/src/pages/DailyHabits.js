import { useEffect, useState } from "react";
import DailyList from "../components/DailyList";
import axios from "axios";
import { API_URL_SIMULATE, API_URL_TODO, API_URL_DEFAULT_HABITS } from "../constants/constants";
import Button from "../components/Button";
import Header from "../components/Header";

function DailyHabits() {

  const [list, setList] = useState([]);
  const [percentage, setPercentage] = useState(0);

  const handleCreateDefaultHabits = () => {
    axios.post(API_URL_DEFAULT_HABITS)
      .then(response => {
        alert('Hábitos por defecto creados correctamente');
        // Realizar una solicitud GET para obtener la lista actualizada de hábitos
        axios.get(API_URL_TODO + "?format=json")
          .then(({ data }) => {
            // Actualizar el estado 'list' con la nueva lista
            setList(data);
          })
          .catch(error => {
            console.error('Error al obtener la lista actualizada:', error);
          });
      })
      .catch(error => {
        console.error('Error:', error);
        alert("Ha ocurrido un error al crear hábitos por defecto");
      });
  };

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
      <main className="flex flex-col items-center justify-center h-screen">
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
