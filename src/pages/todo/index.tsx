import { RouteObject } from "react-router-dom"
import { lazy } from "react"
import { $$page } from "./todos.model"
const Todo = lazy(() => import('./todos.page'))
export const productRoute: RouteObject = {
    path: '/todo',
    element: <Todo/>,
    loader: ({ request }) => {
        const page = new URL(request.url).searchParams.get('page') || '1'
        $$page.todo.getTodos({ page: +page })
        return Promise.resolve({})
    }
}