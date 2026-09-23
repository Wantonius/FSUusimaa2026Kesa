import { Component, signal } from '@angular/core';
import {Bucket} from './bucket.component';
@Component({
  imports: [Bucket],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('d_inputsandoutputs');
}
