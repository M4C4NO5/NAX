import proptype from 'prop-types';
import { useState } from "react";
import addNotification from 'react-push-notification';
import { IconButton } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClearIcon from '@mui/icons-material/Clear';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

function Task({
  id,
  name,
  hour,
  completed,
  action = () => {},
  deleteHabitFunc = () => {},
}) {
  const toggleVisibility = () => {setIsHidden(!isHidden)};
  const [isHidden, setIsHidden] = useState(false);

  const notification = () => {
    addNotification({
      title: 'Recordatorio Hábito',
      subtitle: 'NAX',
      message: `Es hora de ${name}. ¡No lo olvides!`,
      theme: 'darkblue',
      native: true // when using native, your OS will handle theming.
    });
  };

  return (
    <div>
      <span onMouseEnter={toggleVisibility} onMouseLeave={toggleVisibility} className="flex w-full mt-5">
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
        <p className={`${completed && 'line-through'} mx-3 w-full`}>{name}</p>
        {
          isHidden
          ?
          <span className="flex">
            <IconButton onClick={() => {deleteHabitFunc(id)}} style={{padding: '0px'}}>
              <ClearIcon/>
            </IconButton>
            <IconButton onClick={notification} style={{padding: '0px'}}>
              <NotificationsActiveIcon />
            </IconButton>
          </span>
          :
          <p className={`${completed && 'line-through'} flex items-center underline stroke-black`}>{hour}</p>
        }
      </span>
    </div>
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
