import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import { productRoute } from './pages/todo'
import { Suspense } from 'react'
const router = createBrowserRouter([
  productRoute
])
function App() {
  return (
    <>
      <Suspense fallback={null}>
        <RouterProvider router={router}/>
      </Suspense>
    </>
  )
}

export default App
