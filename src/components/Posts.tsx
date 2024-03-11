import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addTodo, fetchTodos } from "../api";
import TodoCard from "./TodoCard";

const Posts = () => {
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const queryClient = useQueryClient(); // Make sure to import useQueryClient from react-query

  // useQuery
  const {
    data: todos,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["todos", { search }],
    queryFn: () => fetchTodos(search),
    
    // staleTime:Infinity // will not refetch data in background
  });

  // useMutation

  const { mutateAsync: addTodoMutation } = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  const handleClickAddTodo = async () => {
    try {
      await addTodoMutation({ title });
      setTitle("");
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={handleClickAddTodo}>Add Todo</button>
      </div>
      {todos?.map((todo) => (
        <div key={todo.id}>
          <TodoCard todo={todo} />
        </div>
      ))}
    </div>
  );
};

export default Posts;
