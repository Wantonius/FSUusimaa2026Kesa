import { Component, signal } from '@angular/core';
import {HelloWorld} from './helloworld.component';

@Component({
  imports: [HelloWorld],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('a_hello_world');
}
