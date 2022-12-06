/* eslint-disable eqeqeq */
import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { TabPriority } from '../components/TabPriority'
import complete from '../Svg/complete.svg'

export const MainPage = () => {
  const [getTodo, setGetTodo] = useState('')
  const [info, setInfo] = useState({
    p1: { tot: 0, complete: 0, todo: 0 },
    p2: { tot: 0, complete: 0, todo: 0 },
    p3: { tot: 0, complete: 0, todo: 0 },
  })

  const getTodos = async () => {
    try {
      const result = await axios({
        url: 'http://127.0.0.1:5000/getTodos',
        method: 'GET',
      })
      const _info = {
        p1: { tot: 0, complete: 0, todo: 0 },
        p2: { tot: 0, complete: 0, todo: 0 },
        p3: { tot: 0, complete: 0, todo: 0 },
      }
      result.data.forEach((value) => {
        const inf = _info[`p${value.priority}`]
        if (value.status === 2) {
          inf.complete = inf.complete + 1
        } else {
          inf.todo = inf.todo + 1
        }
        inf.tot = inf.tot + 1
      })
      setInfo(_info)

      setGetTodo(result.data.filter((value) => value.status === 2))
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    getTodos()
  }, [])

  return (
    <div style={{ height: '95vh' }}>
      <TabPriority />
      <div className="todo-list">
        {getTodo &&
          getTodo.map((value, index) => (
            <div key={index} className="box-card">
              <div className="card-container">
                <h3 className="title-todo text-xl">{value.title}</h3>
                {value.priority == '1' ? (
                  <p className="italic">Priority: Hight</p>
                ) : null}
                {value.priority == '2' ? (
                  <p className="italic">Priority: Medium</p>
                ) : null}
                {value.priority == '3' ? (
                  <p className="italic">Priority: Low</p>
                ) : null}
                {value.status == 2 ? (
                  <p className="italic">Task completed !!!</p>
                ) : null}
                {value.status == 2 ? (
                  <img className="w-5" src={complete} alt="task complete" />
                ) : null}
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
