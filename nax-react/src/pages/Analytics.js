import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL_ANALYTICS } from "../constants/constants";

function Analytics() {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    axios.get(API_URL_ANALYTICS).then(
      ({ data }) => setHabits(data)
    )
  }, [])

  return (
    <>
      <main className="py-20 px-16">
        <table class="w-1/2 text-left rtl:text-right text-gray-500">
          <thead class="text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" class="px-6 py-3">
                Hábito
              </th>
              <th scope="col" class="px-6 py-3">
                Ocurrencias
              </th>
            </tr>
          </thead>
          <tbody>
            {habits.map(habit => {
              return(
                <tr class="bg-white border-b hover:bg-gray-50">
                  <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {habit.name}
                  </th>
                  <td class="px-6 py-4">
                    {habit.name__count}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </main>
    </>
  );
}

export default Analytics;
