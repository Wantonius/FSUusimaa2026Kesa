import { Component, signal } from '@angular/core';
import {Conditional} from './conditional.component';
import {PersonList} from './personlist.component';
@Component({
  imports: [Conditional,PersonList],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('b_built_in_directives');
}
