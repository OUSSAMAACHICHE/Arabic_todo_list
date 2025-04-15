import "./App.css";
import { Container } from "@mui/material";
import Task from "./components/component";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

// context
import { TodosContext } from "./contexts/todoContext";

// Hooks
import { useEffect, useState } from "react";

// Libraries
import { v4 as uuidv4 } from "uuid";

function App() {
  const initialState = [];
  const [tasks, setTasks] = useState(() => {
    // return the saved tasks from localStorage
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : initialState;
  });
  let tasksToRender = tasks;

  const [titleInput, setTitleInput] = useState("");
  const [displayedTasksType, setDisplayedTasksType] = useState("all");

  // save tasks on localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log("calling useEffect");
  }, [tasks]);

  const handleTasksState = (ev) => {
    setDisplayedTasksType(ev.target.value);
  };
  function handleAddClick() {
    // Check if there's a task exist
    if (titleInput) {
      // create new todo
      const newTodo = {
        title: titleInput,
        description: "",
        isCompleted: false,
        id: uuidv4(),
      };
      // add the new todo to the main tasks array
      setTasks([...tasks, newTodo]);
      setTitleInput("");
    }
  }

  const handleCompleted = () => {
    return tasks.filter((ts) => ts.isCompleted);
  };
  const handleNotCompleted = () => {
    return tasks.filter((ts) => !ts.isCompleted);
  };
  // Check tasks state
  if (displayedTasksType === "completed") {
    tasksToRender = handleCompleted();
  } else if (displayedTasksType === "no-completed") {
    tasksToRender = handleNotCompleted();
  } else {
    tasksToRender = tasks;
  }

  const allTasks = tasksToRender.map((task) => (
    <Task todo={task} key={task.id} />
  ));
  return (
    <div className="App">
      <TodosContext.Provider value={{ tasks, setTasks }}>
        <Container maxWidth="sm" className="container">
          <h1 style={{ fontSize: "4rem", margin: "0" }}>مهامي</h1>
          <hr></hr>
          <ToggleButtonGroup
            style={{ marginBottom: "20px" }}
            value={displayedTasksType}
            exclusive
            onChange={handleTasksState}
            aria-label="text alignment"
          >
            <ToggleButton value="all" aria-label="left aligned">
              الكل
            </ToggleButton>
            <ToggleButton value="completed" aria-label="centered">
              المكتملة
            </ToggleButton>
            <ToggleButton value="no-completed" aria-label="right aligned">
              الغير مكتملة
            </ToggleButton>
            <ToggleButton
              value="justify"
              aria-label="justified"
              disabled
            ></ToggleButton>
          </ToggleButtonGroup>

          {tasksToRender.length ? allTasks : <p>لا يوجد مهام حاليا</p>}

          <Grid container spacing={2}>
            <Grid size={8}>
              <TextField
                style={{ width: "100%" }}
                id="outlined-basic"
                label="كتابة مهمة"
                variant="outlined"
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
              />
            </Grid>
            <Grid size={4}>
              <Button
                style={{ width: "100%", height: "100%" }}
                variant="contained"
                color="success"
                onClick={handleAddClick}
                disabled={titleInput.length === 0 ? true : false}
              >
                اضافة
              </Button>
            </Grid>
          </Grid>
        </Container>
      </TodosContext.Provider>
    </div>
  );
}

export default App;
