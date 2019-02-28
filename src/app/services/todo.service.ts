import { Todo } from "./../models/Todo";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { of } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

@Injectable({
  providedIn: "root"
})
export class TodoService {
  todosLimit: string = "?_limit=15";
  todosUrl: string = "https://jsonplaceholder.typicode.com/todos";

  developMode: boolean = true;

  mockTodos: Todo[] = [
    {
      id: 1,
      title: "hello",
      completed: true
    },
    {
      id: 2,
      title: "bye",
      completed: false
    }
  ];

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    if (this.developMode === true) {
      return of(this.mockTodos);
    } else {
      return this.http.get<Todo[]>(`${this.todosUrl}${this.todosLimit}`);
    }
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.todosUrl, todo, httpOptions);
  }

  toggleCompleted(todo: Todo): Observable<any> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.put(url, todo, httpOptions);
  }

  deleteTodo(todo: Todo): Observable<Todo> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.delete<Todo>(url, httpOptions);
  }
}
