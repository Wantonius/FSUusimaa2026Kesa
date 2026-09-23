import { Component, signal } from '@angular/core';
import {ContactList} from './components/contactlist.component';
@Component({
  imports: [ContactList],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('g_services');
}
