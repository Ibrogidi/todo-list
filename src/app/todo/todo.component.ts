import { ITask } from './../models/task';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  value: any;
  todoForm !: FormGroup;
  todo: ITask [] = [];
  inprogress: ITask[] = [];
  done: ITask[] =[];
  updateIndex: any;
  isEditEnabled: boolean= false;
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      item:['',Validators.required]
    })
  }
  //todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

//  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  addTask(){
    this.todo.push({
      description: this.todoForm.value.item,
      done: false
    });
    this.todoForm.reset();
  }
  deleteTask(i: number,arrName:string){

    if(arrName==='todo'){
      this.todo.splice(i,1);

    }
    if(arrName==='inprogress'){
      this.inprogress.splice(i,1);
    }
    if(arrName==='done'){
      this.done.splice(i,1);
    }
  }
  onEdit(item: ITask,index:number){
    this.updateIndex = index;
    this.todoForm.controls['item'].setValue(item.description);
    this.isEditEnabled = true;
  }
updateTask(){
  this.todo[this.updateIndex].description =  this.todoForm.value.item;
  this.todo[this.updateIndex].done = false;
  this.todoForm.reset();
  this.updateIndex = undefined;
  this.isEditEnabled = false;
}

}
