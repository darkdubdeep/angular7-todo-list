import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { TodoService } from "./../../services/todo.service";

import { Todo } from "./../../models/Todo";

@Component({
  selector: "app-todo-item",
  templateUrl: "./todo-item.component.html",
  styleUrls: ["./todo-item.component.scss"]
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;

  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();

  constructor(private todoService: TodoService) {}

  ngOnInit() {}

  // Set dynamic classes
  setCLasses() {
    let classes = {
      todo: true,
      "is-complete": this.todo.completed
    };
    return classes;
  }

  onToggle(todo) {
    this.todoService.toggleCompleted(todo).subscribe(todo => {
      console.log(todo);
      this.todo.completed = !this.todo.completed;
    });
  }

  onDelete(todo) {
    this.deleteTodo.emit(todo);
  }
}
