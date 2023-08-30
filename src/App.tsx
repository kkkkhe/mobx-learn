import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import { productRoute } from './pages/todo'
import { Suspense } from 'react'
import { Page } from './pages/first.page'
import { InputsPage } from './pages/inputs/inputs.page'
import { Posts } from './pages/mobx-tquery/pages/posts.page'
import { DetailedPost } from './pages/mobx-tquery/pages/detailed-post.page'
const router = createBrowserRouter([
  {
    path: '/',
    element: <Page/>
  },
  productRoute,
  {
    path: '/inputs',
    element: <InputsPage/>
  },
  {
    path: 'posts',
    element: <Posts/>
  },
  {
    path: 'post/:id',
    element: <DetailedPost/>
  }
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
