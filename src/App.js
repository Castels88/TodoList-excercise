import { Link, Route, Routes } from 'react-router-dom'
import { MainPage } from './pages/MainPage'
import { TodoPage } from './pages/TodoPage'

export function App() {
  return (
    <>
      <nav className="flex flex-row m-2 h-15 content-center items-center justify-evenly	">
        <h2 className="basis-1/4 text-white italic text-xl">Todo App</h2>{' '}
        <Link
          className="basis-1/4 italic text-xl flex justify-center bg-white text-violet-900 rounded-lg hover:bg-violet-600 hover:text-white	"
          to="/"
        >
          Home
        </Link>{' '}
        <Link
          className="basis-1/4 italic text-xl flex justify-center bg-white text-violet-900 rounded-lg hover:bg-violet-600 hover:text-white"
          to="/TodoPage"
        >
          TodoPage
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/TodoPage" element={<TodoPage />} />
      </Routes>
    </>
  )
}
