"use client"

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios"


export default function CreatePost() {
  const [title, setTitle] = useState("")
  const [isDisabled, setIsDisabled] = useState(false)


  //Create a post
  // Here I am trying to get an API to send data to
 const {mutate} = useMutation(
  async (title) => await axios.post("/api/posts/addPosts", {title})
  )

  // initially (e) stated that it is declared but never used. Had to sepecify that this was a FORM EVENT
  const submitPost = async (e:React.FormEvent) => {
    e.preventDefault()
    setIsDisabled(true)
    mutate(title)
  }


      return (
      <form onSubmit={submitPost} className="bg-white my-8 p-8 rounded-md ">
        <div className="flex flex-col my-4">
          <textarea
            onChange={(e) => setTitle(e.target.value)}
            name="title"
            value={title}
            placeholder="Share your thoughts"
            className="p-4 text-lg rounded-md my-2  bg-gray-200"
          />
        </div>
        <div className=" flex items-center justify-between gap-2">
          <p
            className={`font-bold text-sm ${
              title.length > 300 ? "text-red-700" : "text-gray-700"
            } `}
          >{`${title.length}/300`}</p>
          <button
            disabled={isDisabled}
            className="text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25"
            type="submit"
          >
            Create post
          </button>
        </div>
      </form>
    )
  }
  