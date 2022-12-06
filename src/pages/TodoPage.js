/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import change from '../Svg/change.gif'
import complete from '../Svg/complete.svg'
import undone from '../Svg/undone.svg'
import trash from '../Svg/trash.gif'
import axios from 'axios'
export const TodoPage = () => {
  const [updateId, setUpdateId] = useState(null)
  const [updateMode, setUpdateMode] = useState(false)
  const [getTodo, setGetTodo] = useState('')
  const [_getTodo, _setGetTodo] = useState('')
  const [data, setData] = useState({
    title: '',
    desc: '',
    priority: '',
    id: '',
    creationTime: new Date().toLocaleString(),
  })

  const clearForm = () => {
    setData({ title: '', desc: '', priority: '', id: '' })
  }

  const sortTodos = (todos) => {
    todos.sort((a, b) => {
      return (
        a.priority - b.priority ||
        new Date(b.creationTime) - new Date(a.creationTime)
      )
    })
    return todos
  }

  const formatDateTodo = (todos) => {
    return todos.map((value) => {
      return {
        ...value,
        creationTime: new Date(value.creationTime).toLocaleString(),
      }
    })
  }
  // inizio getTodo
  const getTodos = async () => {
    try {
      const result = await axios({
        url: 'http://127.0.0.1:5000/getTodos',
        method: 'GET',
      })
      const dataSorted = sortTodos(result.data)
      setGetTodo(formatDateTodo(dataSorted))
      _setGetTodo(formatDateTodo(dataSorted))
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    getTodos()
  }, [])

  // inizio form function
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }

  //fine form function

  const _createTodo = async () => {
    try {
      await axios({
        url: 'http://127.0.0.1:5000/addTodo',
        method: 'POST',
        data,
      })
      clearForm()
      await getTodos()
    } catch (error) {
      console.error(error.message)
    }
  }

  //inizio addTodo function
  const _updateTodo = async () => {
    try {
      await axios({
        url: `http://127.0.0.1:5000/updateTodo/${updateId}`,
        method: 'POST',
        data,
      })
      clearForm()
      setUpdateMode(false)
      setUpdateId(null)
      await getTodos()
    } catch (error) {
      console.error(error.message)
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!updateMode) {
      await _createTodo()
    } else {
      await _updateTodo()
    }
  }
  //fine addTodo function

  // delete function
  const handleDelete = async (id) => {
    try {
      await axios({
        url: `http://127.0.0.1:5000/deleteTodo/${id}`,
        method: 'DELETE',
      })
      await getTodos()
    } catch (error) {
      console.error(error.message)
    }
  }
  // fine delete function

  //inizio update function
  const toggleUpdateMode = (id) => {
    setUpdateId(updateMode === false ? id : null)
    if (updateMode === false) {
      const todo = getTodo.filter((value) => value.id === id)
      _setGetTodo(sortTodos(todo))
      setData(todo[0])
    } else {
      _setGetTodo(getTodo)
      clearForm()
    }
    setUpdateMode(!updateMode)
  }

  //inizio complete function
  const handleToggleComplete = async (id, status) => {
    try {
      await axios({
        url: `http://127.0.0.1:5000/updateTodo/${id}`,
        method: 'POST',
        data: {
          status: status === 1 ? 2 : 1,
        },
      })
      await getTodos()
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <>
      <div className="tp-container">
        {/* getData form */}
        <form className="todo-form" onSubmit={handleSubmit}>
          <div>
            <input
              className="todo-input"
              onInput={handleInputChange}
              type="text"
              name="title"
              value={data.title}
              required
              placeholder="Title"
            />
            <span className="bar"></span>
          </div>
          <div>
            <input
              className="todo-input"
              onInput={handleInputChange}
              type="text"
              name="desc"
              value={data.desc}
              required
              placeholder="Description"
            />
            <span className="bar"></span>
          </div>

          <select
            className="todo-input h-9"
            onChange={handleInputChange}
            name="priority"
            value={data.priority}
            required
          >
            <option value="">select priority...</option>
            <option value="1">alta</option>
            <option value="2">media</option>
            <option value="3">bassa</option>
          </select>
          <button className="btn-todo-submit h-9" type="submit">
            {!updateMode ? 'addTodo' : 'update'}
          </button>
        </form>
        {/* fine form  */}
      </div>
      {/* inizio card */}
      <div className="todo-list">
        {_getTodo &&
          _getTodo.map((value, index) => (
            <div
              key={index}
              className="w-2/3 h-[14rem] bg-white flex flex-row justify-between rounded-xl "
            >
              <div className="flex flex-col justify-evenly m-1 p-1 h-full">
                <p className="text-2xl">{value.title}</p>

                <p className="text-todo italic">
                  Creation Time: {value.creationTime}
                </p>

                {value.priority == 1 ? (
                  <p className="italic">Priority: Hight</p>
                ) : null}
                {value.priority == 2 ? (
                  <p className="italic">Priority: Medium</p>
                ) : null}
                {value.priority == 3 ? (
                  <p className="italic">Priority: Low</p>
                ) : null}

                <p className="text-todo italic">{value.desc}</p>
              </div>
              <div className="btn-container">
                {/* complete task */}
                <button
                  className="btn-todo-page"
                  onClick={() => handleToggleComplete(value.id, value.status)}
                >
                  {value.status === 1 ? (
                    <img src={undone} alt="complete task" />
                  ) : (
                    <img src={complete} alt="not complete" />
                  )}
                </button>
                {/* update task */}
                <button
                  className="btn-todo-page"
                  onClick={() => toggleUpdateMode(value.id)}
                >
                  <img className="w-8 h-8" src={change} alt="change todo" />
                  {updateMode ? (
                    <p className="italic text-rose-700 ">cancel</p>
                  ) : null}
                </button>
                {/* delete task */}
                <button onClick={() => handleDelete(value.id)}>
                  <img className="w-8 h-8" src={trash} alt="" />
                </button>
              </div>
            </div>
          ))}
      </div>
      {/* fine card */}
    </>
  )
}
