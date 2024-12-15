import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  let [click, setClick] = useState("");
  let [allTask, setAllTask] = useState([]);
  let [edit, setEdit] = useState(false);
  let handleChange = (e) => {
    setClick(e.target.value);
  };

  let handleSubmit = () => {
    axios
      .post("http://localhost:3000/createTodo", {
        task: click,
      })
      .then((data) => {
        setClick("");
        alert("Data added successfully");
        setAllTask((pre) => [...pre, data.data.data]); //optimastic update
        console.log(click);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function getAllTask() {
    axios
      .get("http://localhost:3000/readTodo")
      .then((data) => {
        setAllTask(data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //  onClick={() => handleEdit}

  useEffect(() => {
    getAllTask();
    console.log(edit);
  }, []);

  let handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/deleteTodo/${id}`)
      .then(() => {
        setAllTask((pre) => pre.filter((i) => i._id !== id));
        alert("Todo deleted successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  let handleEdit = () => {
    setEdit(edit);
  };

  return (
    <>
      {/* component */}
      <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
        <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
          <div className="mb-4">
            <h1 className="text-grey-darkest">Todo List</h1>
            <div className="flex mt-4">
              <input
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
                placeholder="Add Todo"
              />
              <button
                onClick={handleSubmit}
                className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-teal-300 hover:bg-teal"
              >
                Add
              </button>
            </div>
          </div>
          {allTask.map((task) => (
            <div className="flex mb-4 items-center">
              <p className="w-full text-grey-darkest">{task.task}</p>
              <button className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-teal-300 text-green border-green hover:bg-green">
                Edit
              </button>
              <button
                onClick={() => handleDelete(task._id)}
                className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-teal-300 hover:bg-red"
              >
                Remove
              </button>
            </div>
          ))}
          {edit && (
            <div className="w-[200px] h-[200px] bg-gray-400 mx-auto absolute top-0 left-[50%] translate-x-[-50%] rounded-md">
              <input type="text" placeholder="Enter your text" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
