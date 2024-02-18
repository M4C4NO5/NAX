import proptype from 'prop-types';

function Task({
  id,
  task,
  hour,
  completed,
  action = () => {}
}) {

  return (
    <span className="flex w-full mb-5">
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
      <p className={`${completed && 'line-through'} mr-3 w-full`}>{task}</p>
      <p className={`${completed && 'line-through'} flex items-center underline stroke-black`}>{hour}</p>
    </span>
  );
}

Task.propTypes = {
  task: proptype.string.isRequired,
  hour: proptype.string.isRequired,
  completed: proptype.bool.isRequired,
  action: proptype.func
}

export default Task;