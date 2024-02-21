import { useEffect, useState } from "react";
import DailyList from "../components/DailyList";
import axios from "axios";
import { API_URL_TODO } from "../constants/constants";

function DailyHabits() {

  const [list, setList] = useState([]);

  useEffect(() => {
    axios.get(API_URL_TODO + "?format=json").then(
      // on success
      ({ data }) => setList(data),
      // on error
      (data) => console.error(data)
    );
  }, [])

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      {/* List */}
      <DailyList list={list} setList={setList} />
    </main>
  );
}

export default DailyHabits;
