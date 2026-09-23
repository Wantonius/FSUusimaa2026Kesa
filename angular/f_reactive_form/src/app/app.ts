import { Component, signal } from '@angular/core';
import {ReactiveForm} from './reactiveform.component';
@Component({
  imports: [ReactiveForm],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('f_reactive_form');
}
