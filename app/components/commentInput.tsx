import React, { useState } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function CommentInput({ postId }) {
  const [comment, setComment] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    async (commentText) => await axios.post(`/api/posts/${postId}/addComment`, { comment: commentText }),
    {
      onError: (error) => {
        console.error(error);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
        setComment("");
        setIsDisabled(false);
      },
    }
  );

  const submitComment = async (e) => {
    e.preventDefault();
    setIsDisabled(true);
    mutate(comment);
  };

  return (
    <form onSubmit={submitComment} className="bg-gray my-4 p-4 rounded-md ">
      <textarea
        onChange={(e) => setComment(e.target.value)}
        value={comment}
        placeholder="Add a comment..."
        className="p-2 text-sm rounded-md my-5 ml-auto bg-gray-200"
      />
      <button
        disabled={isDisabled}
        className="text-sm bg-gray-800 text-white py-1 px-4 ml-auto rounded-xl disabled:opacity-25"
        type="submit"
      >
        Add Comment
      </button>
    </form>
  );
}
