import { useState } from "react";
import { add, remove, toggleCompleted } from "./features/todoSlice";
import { fetchUser } from "./features/userSlice";
import { useAppDispatch, useAppSelector } from "./store";

function App() {
  const todos = useAppSelector(state => state.todos)
  const user = useAppSelector(state => state.user)
  const [title, setTitle] = useState("")

  const dispatch = useAppDispatch();

  const onSave = () => {
    dispatch(add(title))
    setTitle("")
  }
  const onDelete = (id: string) => {
    dispatch(remove(id))
    setTitle("")
  }
  const toggle = (id: string) => {
    dispatch(toggleCompleted(id))
    setTitle("")
  }

  return (
    <div className="App">
      <input name="title" value={title} onChange={(e) => setTitle(e.currentTarget.value)} />
      <button onClick={onSave}>Save</button>

      <ul>
        {todos.map((todo) =>
          <li key={todo.id}>
            <button onClick={() => { toggle(todo.id) }}>{todo.completed ? 'Mark not completed' : 'Mark completed'}</button>
            <button onClick={() => { onDelete(todo.id) }}>Delete</button>
            <span>{todo.title}</span>
          </li>)}
      </ul>

      <div>
        <button onClick={()=> dispatch(fetchUser())}>Fetch</button>
        {user.loading && 'loading ...'}
        {user.error && user.error}
        {user.data && 
          <div>
            Result: {user.data.services.services.map((service: any, index: any) => <li key={index}>{service.name}</li>)}
          </div>
        }
      </div>
    </div>
  );
}

export default App;
