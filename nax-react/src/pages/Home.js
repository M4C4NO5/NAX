import React, { useEffect, useRef, useState } from "react";
import { Item } from '../components/Item';
import { Togglable } from '../components/Togglable';
import { TaskForm } from '../components/TaskForm';
import { Header } from '../components/Header';
import { Select } from '../components/Select';
import { sortOptions } from '../constants/sortOptions';
import axios from "axios";



function Home({todos = []}) {
  const [list, setList] = useState(todos);
  const [filterState, setFilterState] = useState('all');

  const bottomList = useRef(null)

  useEffect(() => {
    axios.get('/api/todo').then(
      // on success
      ({ data }) => {
        let { tasks } = data;
        for (const index in tasks) {
          tasks[index].completed = Boolean(tasks[index].completed);
        }
        setList(tasks);
      },
      // on error
      () => console.error('Not logged.')
    );
  }, [])

  function scrollBottom() {
    bottomList.current?.scrollIntoView({behavior: 'smooth'});
  }

  function handleChangeFilter(event) {
    let value = 'all';
    if (event.target.value === 'true') {
      value = true;
    } else if (event.target.value === 'false') {
      value = false;
    }
    setFilterState(value);
  }

  function handleCheckTask(event) {
    const itemId = Number(event.target.id.substring(4));
    const newList = list.map((item) => {
      if (itemId === item.id) {
        item.completed = !item.completed;
      }
      return item;
    });
    setList(newList);

    axios.post('/api/todo/completed', {task_id: itemId});
  }

  return (
    <>
      <Header/>
      <main className='lg:px-24 md:px-16 px-4'>
        <header className='mb-6 flex space-x-8 w-fit'>
          <h2 className='text-2xl font-bold'>List</h2>
          <Select name='filter' value={filterState} options={sortOptions} action={handleChangeFilter}  />
        </header>
        {list.map(item => {
          if (filterState === 'all') {
            return <Item key={item.id} handleCheckTask={handleCheckTask} {...item} />
          }
          if (filterState === item.completed) {
            return <Item key={item.id} handleCheckTask={handleCheckTask} {...item} />
          }
        })}
        <div className="pt-12" ref={bottomList}></div>
        <Togglable>
          <span onClick={event => {
              event.target.classList.toggle('rotate-45')
            }} className='z-40 fixed lg:right-24 md:right-16 right-4 md:bottom-12 bottom-8 p-3 rounded-full bg-indigo-700 hover:bg-indigo-900 text-white cursor-pointer transition ease transform duration-300'>
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(45)">
              <g id="SVGRepo_bgCarrier" strokeWidth={0} />
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
              <g id="SVGRepo_iconCarrier">
                <path d="M12 12L6 6M12 12L18 18M12 12L18 6M12 12L6 18" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
              </g>
            </svg>
          </span>
          <TaskForm setList={setList} scrollBottom={scrollBottom} />
        </Togglable>
      </main>
    </>
  );
}

export default Home;