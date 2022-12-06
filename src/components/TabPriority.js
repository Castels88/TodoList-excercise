import { Tab } from '@headlessui/react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import complete from '../Svg/complete.svg'
import undone from '../Svg/undone.svg'

export const TabPriority = () => {
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
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  return (
    <Tab.Group>
      <Tab.List className="m-2 flex flex-row content-center items-center justify-center ">
        <Tab
          className={({ selected }) =>
            classNames(
              'basis-1/4 rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
              'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
              selected
                ? 'bg-white shadow'
                : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
            )
          }
        >
          Alta
        </Tab>
        <Tab
          className={({ selected }) =>
            classNames(
              'basis-1/4 rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
              'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
              selected
                ? 'bg-white shadow'
                : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
            )
          }
        >
          Media
        </Tab>
        <Tab
          className={({ selected }) =>
            classNames(
              'basis-1/4 rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
              'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
              selected
                ? 'bg-white shadow'
                : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
            )
          }
        >
          Bassa
        </Tab>
      </Tab.List>
      <Tab.Panels className="mt-2 m-2 flex justify-center items-center">
        <Tab.Panel
          className={classNames(
            'w-1/2 flex flex-col rounded-xl bg-white p-3',
            'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
          )}
        >
          <p className="italic text-xl">total task: {info.p1.tot}</p>
          <p className="italic text-xl flex flex-row gap-1">
            completed: {info.p1.complete} <img src={complete} alt="" />
          </p>
          <p className="italic text-xl flex flex-row gap-1">
            todo: {info.p1.todo} <img src={undone} alt="" />
          </p>
        </Tab.Panel>
        <Tab.Panel
          className={classNames(
            'w-1/2 rounded-xl bg-white p-3',
            'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
          )}
        >
          <p className="italic text-xl">total task: {info.p2.tot}</p>
          <p className="italic text-xl  flex flex-row gap-1">
            completed: {info.p2.complete} <img src={complete} alt="" />
          </p>
          <p className="italic text-xl  flex flex-row gap-1">
            todo: {info.p2.todo} <img src={undone} alt="" />
          </p>
        </Tab.Panel>
        <Tab.Panel
          className={classNames(
            'w-1/2 rounded-xl bg-white p-3',
            'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
          )}
        >
          <p className="italic text-xl">total task: {info.p3.tot}</p>
          <p className="italic text-xl  flex flex-row gap-1">
            completed: {info.p3.complete} <img src={complete} alt="" />
          </p>
          <p className="italic text-xl  flex flex-row gap-1">
            todo: {info.p3.todo} <img src={undone} alt="" />
          </p>
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  )
}
