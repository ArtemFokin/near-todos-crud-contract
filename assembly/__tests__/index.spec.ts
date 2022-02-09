import {create, getById, get, update, del} from '../index'
import {Todo, todos} from '../model';

describe('contract methods', () => {
  it("create a todo", ()=>{
    const todo = create("Drink water");
    
    expect(todos.getSome(todo.id)).toStrictEqual(todo);
  })

  it("get todo by id", ()=>{
    const a = create("Learn near js-api")
    const b = create("Learn near sdk")
    const c = create("Learn near concept")

    expect(getById(a.id)).toStrictEqual(a);
    expect(getById(b.id)).toStrictEqual(b);
    expect(getById(c.id)).toStrictEqual(c);
  })

  it("get a list of todos", ()=>{
    const todos = new Array<number>(100).fill(0).map<Todo>((_, i)=> Todo.insert('todo' + i.toString()));
    expect(get(20)).toStrictEqual(todos.slice(20,30));
    expect(get(0,10)).toStrictEqual(todos.slice(0, 10));
    expect(get(10, 10)).toStrictEqual(todos.slice(10,20));
    expect(get(60, 50)).toStrictEqual(todos.slice(60, 100));
  })

  it("updates a todo", ()=>{
    const todo = Todo.insert("Drink water");
    
    update(todo.id, {task: "Eat bread", done: true})
    const todoAfterUpdate = Todo.findById(todo.id);

    expect(todoAfterUpdate.id).toStrictEqual(todo.id);
    expect(todoAfterUpdate.task).toStrictEqual('Eat bread');
    expect(todoAfterUpdate.done).toBeTruthy();
  })

  itThrows('deletes a todo', () => {
    const todo = Todo.insert('Drink water');

    del(todo.id)

    Todo.findById(todo.id)
  });
});