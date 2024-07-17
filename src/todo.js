import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './todo.css';
export default function Todo() {

    const [input, setInput] = useState(null);
    const [todos, setTodos] = useState();

    useEffect(() => {
        getTodos()
    }, []);

    const getTodos = async() => {
        const response = await axios.get('http://127.0.0.1:8000/todos/');
        console.log(response.data);
        if(response.data!=null) {
            setTodos(response.data);
        }
        
    }

    const addTodos = async(key) => {

        const response = await axios.post('http://127.0.0.1:8000/todos/',{key:key, value:false});
        getTodos();
    }
    const deleteTodos = async(key) => {

        const response = await axios.delete('http://127.0.0.1:8000/todos/?key='+key);
        getTodos();
    }
    const updateTodos = async(key, value) => {
        
        const response = await axios.put('http://127.0.0.1:8000/todos/', {key:key, value:!value});
        getTodos();
    }

    function AddToList() {
        
        if(input.trim() != null || input.trim()!= '') {
            addTodos(input);
           
            // setTodos([...todos, input]);
            setInput('');
        }
    }

    function removeTodo(key) {
        deleteTodos(key);
        // console.log(index);
        // if (todos!=null) {
        //     todos.splice(index, 1);
        //     setTodos([...todos])
        // }
    }
    return (
    <div className='container'>
        <h1>Todo List</h1>
        <div >
            <br></br>
            <input type='text'  onChange={(e) => setInput(e.target.value)} className='input-field'></input>
            <button onClick={AddToList} className="add-button" >Add</button>
        </div>
        <ul>
            {todos!=null && Object.entries(todos).map((todo, index)=>{
                return(
                <div className="todo-item">
                    <input type='checkbox'checked={todo[1]} onChange={()=>updateTodos(todo[0],todo[1])} key={todo[0]} className="checkbox"/> {todo[0]} <button onClick={()=>removeTodo(todo[0])} className="remove-button">Remove</button>
               </div>)
})}
        </ul>
    </div>
    )
}
