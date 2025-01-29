import { TodoCard } from "./TodoCard";

export function TodoList(props) {
    const { todos, selectedTab, todoIndex } = props

    const filterTodosList = selectedTab === 'All' ?
        todos : 
        selectedTab === 'Completed' ? 
        todos.filter(val => val.status) : 
        todos.filter(val => !val.status)

    return (
        <>
            {filterTodosList.map((todo, todoIndex) => {
                return (
                    <TodoCard 
                    key={todoIndex}
                    todoIndex={todos.findIndex(val => val.input
                    == todo.input)}
                    {...props}
                    todo={todo}/>
                )
            })}
        </>
    )
}