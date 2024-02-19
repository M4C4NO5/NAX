import Button from "../components/Button";
import Input from "../components/Input";

function NewHabitForm() {
  return (
    <div className="flex items-center justify-center h-screen">
      <form className="w-full max-w-sm">
          <div className="flex items-center justify-center mb-16">
            <Input placeholder="Habit" />
          </div>
          <div className="flex items-center justify-center mb-16">
            <Input placeholder="Hour" />
          </div>
          <div className="flex items-center justify-center">
            <Button text="Submit" type="submit" />
          </div>
      </form>
    </div>
  );
}

export default NewHabitForm;
