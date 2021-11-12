import React, { Component, createRef } from 'react';

import './todo.css';
import TodoFilter from './todoFilter';
import TodoForm from './todoForm';
import TodoList from './todoList';

export default class Todo extends Component {
  state = {
    countries: [],
    message: ''
  };

  todotextCity = createRef();
  todotextDegree = createRef();

  async componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    try {
      // this.setState({
      //   loading: true,
      // });
      const res = await fetch('http://localhost:3000/Whether');
      const json = await res.json();
      this.setState({
        countries: json,
        // loading: false,
      });
      console.log('Countries are ' , json);
    } catch (error) {
      this.setState({
        error,
        // loading: false,
      });
    }
  };

  handleWhether = async (event) => {
    console.log('City and Degree are ',  this.todotextCity.current.value, ' and ', this.todotextDegree.current.value);
    try {
      event.preventDefault();

      const res = await fetch('http://localhost:3000/Whether', {
        method: 'POST',
        body: JSON.stringify({
          city: this.todotextCity.current.value,
          degree: this.todotextDegree.current.value,
        }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      const json = await res.json();

      this.setState(
        ({ countries }) => ({
          countries: [...countries, json],
        }),
        () => {
          this.todotextCity.current.value = '';
          this.todotextDegree.current.value = '';
        },
      );
    } catch (error) {
      this.setState({
        error,
      });
    }
  };

  // handleCompleteTodo = id => {
  //   this.setState(({ todoList }) => ({
  //     todoList: todoList.map(item => {
  //       if (item.id === id) {
  //         return { ...item, isDone: !item.isDone };
  //       }
  //       return item;
  //     }),
  //   }));
  // };

  // handleDeleteTodo = id => {
  //   this.setState(({ todoList }) => ({
  //     todoList: todoList.filter(item => item.id !== id),
  //   }));
  // };

  // handleFilterTodo = filterType => {
  //   this.setState({
  //     filterType,
  //   });
  // };

  // filteredTodo = () => {
  //   const { todoList, filterType } = this.state;
  //   return todoList.filter(item => {
  //     switch (filterType) {
  //       case 'pending':
  //         return !item.isDone;
  //       case 'completed':
  //         return item.isDone;
  //       default:
  //         return true;
  //     }
  //   });
  // };

  handleaddWhether = async event => {
    console.log('Option is ', event.target.value);
    
    const res = await fetch(`http://localhost:3000/Whether/${Number(event.target.value)}`);
      const json = await res.json();
      this.setState({
        message: 'Whether in ' + json.city + ' is ' + json.degree
        // loading: false,
      });
  };

  render() {
    const { countries } = this.state;
    
    return (
      <div className="container">
      <h1> Add Whether Details </h1>
          <label className="todo-item"> City &nbsp;
          </label>
          <input type="text" ref={this.todotextCity} />
          

          <label className="todo-item"> Degree &nbsp;            
          </label>
          <input type="text" ref={this.todotextDegree} />

          <button type="submit" onClick={() => this.handleWhether}> Add </button>

        <h1> Whether Details </h1>
        <select onChange={this.handleaddWhether}>
          {countries.map((option) => (
            <option value={option.id}>{option.city}</option>
          ))}
        </select>
        <span className="todo-item"> {this.state.message} </span>
      </div>
    );
  }
}

/* <table width="100%">
          <thead>
            <tr>
              <th>Is Done</th>
              <th>Task</th>
              <th>Process</th>
            </tr>
          </thead>
          <tbody>
            {todoList.map((item) => (
              <tr key={item.id}>
                <td>
                  <input type="checkbox" name="isDone" id="isDone" />
                </td>
                <td>
                  <span>{item.text}</span>
                </td>
                <td>
                  <button type="button">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table> */
