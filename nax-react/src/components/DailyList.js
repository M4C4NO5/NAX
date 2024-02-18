import Task from "./Task";

function DailyList() {
  return (
    <div className="flex flex-col items-center bg-secondary p-8 rounded-lg w-96">
      <div className="text-center rounded-full bg-primary p-2 w-32 mb-6">
        <h3 className="text-2xl font-medium text-white">Daily</h3>
      </div>
      <div>
        <Task task="Wake up early" hour="6am" />
      </div>
    </div>
  );
}

export default DailyList;