import { PersistentUnorderedMap, math } from "near-sdk-as";

export const todos = new PersistentUnorderedMap<u32, Todo>("todos");

@nearBindgen
export class PartialTodo {
  task: string;
  done: bool;
}

@nearBindgen
export class Todo{
  id: u32;
  task: string;
  done: bool;

  constructor(task: string){
    this.id = math.hash32<string>(task);
    this.task = task;
    this.done = false;
  }

  static insert(task: string): Todo{
    const todo = new Todo(task);
    todos.set(todo.id, todo);
    return todo;
  }

  static findById(id: u32): Todo {
    return todos.getSome(id);
  }

  static find(offset: u32, limit: u32): Todo[]{
    return todos.values(offset, offset + limit);
  }

  static findByIdAndUpdate(id: u32, partial: PartialTodo): Todo {
    const todo = this.findById(id);

    todo.task = partial.task;
    todo.done = partial.done;

    todos.set(id, todo);

    return todo;
  }

  static findByIdAndDelete(id: u32): void{
    todos.delete(id);
  }
}