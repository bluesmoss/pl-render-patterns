import React, {useState} from 'react';
import { useTodos } from './useTodos'
import { TodoCounter } from '../components/TodoCounter';
import { TodoSearch } from '../components/TodoSearch';
import { TodoList } from '../components/TodoList';
import { TodoItem } from '../components/TodoItem';
import { CreateTodoButton } from  '../components/CreateTodoButton'
import { Modal } from '../components/Modal'
import { TodoForm } from '../components/TodoForm'
import { TodoHeader } from "../components/TodoHeader";
import { ChangeAlertWithStorageListener } from "../components/ChangeAlert";



function App() {


  const { 
    error,
    loading,
    searchedTodos,
    completeTodo,
    deleteTodo,
    openModal,
    setOpenModal,
    totalTodos, 
    completedTodos,
    searchValue, 
    setSearchValue,
    addTodo,
    synchronizeTodos} =useTodos()

    return (
      <React.Fragment>
      <TodoHeader loading={loading}>
        <TodoCounter 
          totalTodos={totalTodos} 
          completedTodos={completedTodos}  
        />
        <TodoSearch 
          searchValue={searchValue} 
          setSearchValue={setSearchValue}  
        />      
      </TodoHeader>

      <TodoList
        error = {error}
        loading = {loading}
        searchedTodos = {searchedTodos}
        searchText={searchValue}
        totalTodos={totalTodos}
        onError={() =>  <p>Hubo un error....</p>}
        onLoading={() =>  <p>Loading....</p>}
        onEmptyTodos={() =>  <p>Creat tu primer todo</p>}
        onEmptySearchResults={(searchText) =>  <p>No hay resultados para: {searchText}</p>}
        render={(todo, item) => (
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
            onComplete={() => completeTodo(todo.text)}
            onDelete={()=> deleteTodo(todo.text)}
          />
        )}
      >

      {/* {
        todo => (
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
            onComplete={() => completeTodo(todo.text)}
            onDelete={()=> deleteTodo(todo.text)}
          />
        )
      } */}
      </TodoList>

      {/* <TodoList>
          {error && <p>error....</p>}}
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
      </TodoList> */}

      { !!openModal && (
        <Modal>
          <TodoForm addTodo={addTodo} setOpenModal={setOpenModal}/>
        </Modal>
      )}


      <CreateTodoButton
        setOpenModal = {setOpenModal}
      />


      <ChangeAlertWithStorageListener synchronize={synchronizeTodos}/>
    </React.Fragment>
  )
}

export default App;
