"use client"
import AddPost from "./components/addPosts"
import axios from "axios"
import {useQuery} from "@tanstack/react-query"
import Post from "./components/posts"

const allPosts = async () => {
  const response = await axios.get("/api/posts/getPosts")
  return response.data
}

export default function Home() {
  const { data, error, isLoading } = useQuery({
    queryFn: allPosts,
    queryKey: ["posts"],
  })
  if (error) return error
  if (isLoading) return "Loading..."

return(
    <main>
      <AddPost />
      {data?.map((post) => (
        <Post
          key={post.id}
          name={post.user.name}
          avatar={post.user.image}
          postTitle ={post.title}
          id={post.id}
        />
      ))}
      </main>
  )
}
