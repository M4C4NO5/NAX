import Button from "../components/Button";
import Inpt from "../components/Inpt";

function NewHabitForm() {
  return (
    <div className="flex items-center justify-center h-screen">
      <form className="w-full max-w-sm">
          <div className="flex items-center justify-center mb-16">
            <Inpt placeholder="Habit" />
          </div>
          <div className="flex items-center justify-center mb-16">
            <Inpt placeholder="Hour" />
          </div>
          <div className="flex items-center justify-center">
            <Button text="Submit" type="submit" />
          </div>
      </form>
    </div>
  );
}

export default NewHabitForm;
