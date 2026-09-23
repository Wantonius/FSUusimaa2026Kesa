import { Component, signal } from '@angular/core';
import {BindingExample} from './bindingexample.component';
@Component({
  imports: [BindingExample],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('c_property_binding');
}
