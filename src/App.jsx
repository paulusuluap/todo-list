import { Header } from "./components/Header"
import { Tabs } from "./components/Tabs"
import { TodoInput } from "./components/TodoInput"
import { TodoList } from "./components/TodoList"

import { useState, useEffect } from "react"

function App() {
  // const todos = [
  //   { input: 'Hello! Add your first todo!', status: true },
  //   { input: 'Get the groceries!', status: false },
  //   { input: 'Learn how to web design', status: false },
  //   { input: 'Say hi to gran gran', status: true }
  // ]

  const [todos, setTodos] = useState([
    { input: 'Hello! Add your first todo!', status: false }
  ])
  const [selectedTab, setSelectedTab] = useState('Open')

  function handleAddTodo(newTodo) {
    const newTodoList = [...todos, { input: newTodo, status: false }]
    setTodos(newTodoList)
    handleSavedData(newTodoList)
  }

  function handleCompleteTodo(index) {
    // update/edit/modify
    let newTodoList = [...todos]
    let completedTodo = todos[index]
    completedTodo['status'] = true
    newTodoList[index] = completedTodo
    setTodos(newTodoList)
    handleSavedData(newTodoList)
  }

  function handleDeleteTodo(index) {
    let newTodoList = todos.filter((val, valIndex) => {
      return valIndex !== index
    })
    setTodos(newTodoList)
    handleSavedData(newTodoList)
  }

  function handleSavedData(currTodos) {
    localStorage.setItem('todo-app', JSON.stringify({ todos: 
      currTodos }))
  }

  useEffect(() => {
    if (!localStorage || !localStorage.getItem('todo-app')) { 
      return 
    }
    let db = JSON.parse(localStorage.getItem('todo-app'))
    setTodos(db.todos)
  }, [])

  return (
    <>
      <Header todos={todos}/>
      <Tabs selectedTab={selectedTab} setSelectedTab=
        {setSelectedTab} todos={todos} />
      <TodoList handleCompleteTodo={handleCompleteTodo} 
        handleDeleteTodo={handleDeleteTodo} 
        selectedTab={selectedTab} todos={todos}/>
      <TodoInput handleAddTodo={handleAddTodo}/>
    </>
  )
}

export default App
