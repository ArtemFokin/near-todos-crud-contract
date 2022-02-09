import { Todo, PartialTodo } from "./model";

export function create(task: string): Todo {
  return Todo.insert(task);
}

export function getById(id: u32): Todo{
  return Todo.findById(id);
}

export function get(offset: u32, limit: u32=10): Todo[]{
  return Todo.find(offset, limit);
}

export function update(id: u32, updates: PartialTodo): Todo{
  return Todo.findByIdAndUpdate(id, updates);
}

export function del(id: u32): void{
  Todo.findByIdAndDelete(id);
}