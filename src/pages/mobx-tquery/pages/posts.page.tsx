import { Link } from "react-router-dom"
import { observer } from "mobx-react-lite"
import { postStore } from "./posts.model"

export const Posts = observer(() => {
  const posts = postStore.posts
  return (
    <div>
      {posts?.data?.map(({ title, id }) => {
        return (
          <Link to={`/post/${id}`} key={id}>
            <div>
            {title}

            </div>
          </Link>
        )
      })}
    </div>
  )
})