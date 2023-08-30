import { Link, useParams } from "react-router-dom"
import { detailedPost } from "./detailed-post.model"
import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"

export const DetailedPost = observer(() => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  useEffect(() => { 
   return () => detailedPost.dispose() 
  }, [])
  const { id } = useParams()
  if(!id){
    return null
  }
  const { data } = detailedPost.getPost({ id })
  const test = detailedPost.updatePost.data
  console.log(test)
  return (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault()
        detailedPost.updatePost.mutate({ id, title, body, userId: 1 })
      }} action="">
        <input type="text" value={title} onChange={e => setTitle(e.target.value)}/>
        <input type="text" value={body} onChange={e => setBody(e.target.value)}/>
        <button>UPdate</button>
      </form>
      <h2>
        title: {data?.title}
      </h2>
      <p>
        description: {data?.body}
      </p>
      <Link to={'/posts'} replace>
        <div>
          Go back to posts
        </div>
      </Link>
    </div>
  )
})
