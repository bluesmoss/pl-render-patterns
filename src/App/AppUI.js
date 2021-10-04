import React from "react";
import { TodoCounter } from '../components/TodoCounter';
import { TodoSearch } from '../components/TodoSearch';
import { TodoList } from '../components/TodoList';
import { TodoItem } from '../components/TodoItem';
import { CreateTodoButton } from  '../components/CreateTodoButton'
import { TodoContext } from '../TodoContext'

function AppUI() {
    return (
        <React.Fragment>
        <TodoCounter />
        <TodoSearch />
        
        <TodoContext.Consumer>
          { ({ 
            error,
            loading,
            searchedTodos,
            completeTodo,
            deleteTodo}) => (
              <TodoList>
              {error && <p>Hubo un error....</p>}
              {loading && <p>Loading....</p>}
              {(!loading && !searchedTodos.length) && <p>Creat tu primer todo</p>}

              {searchedTodos.map(todo => (
                <TodoItem
                  key={todo.text}
                  text={todo.text}
                  completed={todo.completed}
                  onComplete={() => completeTodo(todo.text)}
                  onDelete={()=> deleteTodo(todo.text)}
                />
              ))}
          </TodoList>
          )}          
        </TodoContext.Consumer>

        <CreateTodoButton />
      </React.Fragment>
    )
}

export {AppUI}