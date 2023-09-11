"use client"
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import CommentInput from "../components/commentInput";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function Post({ avatar, name, postTitle, id }) {

  const queryClient = useQueryClient()
  const [isCommenting, setIsCommenting] = useState(false);

  const {mutate} = useMutation(
    async (id: string) => await axios.delete("/api/posts/deletePosts", {data:id}),
    {
      onError: (error) => {
        console.log(error)
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["posts"])
        toast.success("Deleting post")
      },
    }
    )
    const deletePost = () => {
      mutate(id)
    }
    return (
        <div className="bg-white my-8 p-8 rounded-lg">
            <div className="flex items-center gap-2">
                <Image
                    className="rounded-full"
                    width={32}
                    height={32}
                    src={avatar}
                    alt="avatar"
                />
                <h3 className="font-bold text-gray-700">{name}</h3>
            </div>
            <div className="my-8">
                <p className="break-all">{postTitle}</p>
            </div>
            <div className="flex gap-4 cursor-pointer items-center">
                     <button className="text-sm font-bold text-gray-800 " onClick={() => setIsCommenting(!isCommenting)}>
          Add Comment
        </button>
        <button className="text-sm font-bold text-red-500" onClick={deletePost}>Delete</button>
       
      </div>
      {isCommenting && <CommentInput postId={id} />}
            </div>
    )
}