import proptype from 'prop-types';
import { useState } from "react";
import { TaskDetail } from './TaskDetail';

function Task({
  id,
  name,
  hour,
  hour_end,
  description,
  completed,
  action = () => {},
  deleteHabitFunc = () => {},
  updateHabitFunc = () => {},
}) {
  const [isHidden, setIsHidden] = useState(false);

  const toggleVisibility = () => setIsHidden(!isHidden);

  return (
    <>
      <span className="flex w-full mt-5 cursor-pointer">
        <span className="relative inline-flex items-center rounded-full cursor-pointer mr-3">
          <input
            type="checkbox"
            id={`todo${id}`}
            checked={completed}
            onChange={action}
            className="todo-checkbox peer relative h-6 w-6 cursor-pointer appearance-none rounded-full transition-all hover:scale-105" />
          <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth={1}>
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
            </svg>
          </span>
        </span>
        <p className={`${completed && 'line-through'} mx-3 w-full`} onClick={toggleVisibility}>{name}</p>
        <p className={`${completed && 'line-through'} flex items-center underline stroke-black w-11`} onClick={toggleVisibility}>{hour}</p>

        <span className="ml-3 m-auto" onClick={toggleVisibility}>
          <svg height={20} viewBox="0 0 24 24" id="three-dots" xmlns="http://www.w3.org/2000/svg" fill="#000000">
            <g id="SVGRepo_bgCarrier" strokeWidth={0} />
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
            <g id="SVGRepo_iconCarrier">
              <g id="_20x20_three-dots--grey" data-name="20x20/three-dots--grey" transform="translate(24) rotate(90)">
                <rect id="Rectangle" width={24} height={24} fill="none" /> <circle id="Oval" cx={1} cy={1} r={1} transform="translate(5 11)" stroke="#000000" strokeMiterlimit={10} strokeWidth="0.5" />
                <circle id="Oval-2" data-name="Oval" cx={1} cy={1} r={1} transform="translate(11 11)" stroke="#000000" strokeMiterlimit={10} strokeWidth="0.5" />
                <circle id="Oval-3" data-name="Oval" cx={1} cy={1} r={1} transform="translate(17 11)" stroke="#000000" strokeMiterlimit={10} strokeWidth="0.5" />
              </g>
            </g>
          </svg>
        </span>
      </span>
      <TaskDetail
        open={isHidden}
        close={toggleVisibility}
        id={id}
        name={name}
        hour={hour}
        hour_end={hour_end}
        description={description}
        updateHabitFunc={updateHabitFunc}
        deleteHabitFunc={deleteHabitFunc}
      />
    </>
  );
}

Task.propTypes = {
  id: proptype.number.isRequired,
  name: proptype.string.isRequired,
  hour: proptype.string.isRequired,
  completed: proptype.bool.isRequired,
  action: proptype.func
}

export default Task;
