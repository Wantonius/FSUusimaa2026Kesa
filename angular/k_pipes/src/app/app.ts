import { Component, signal } from '@angular/core';
import { CapitalizePipe } from './capitalize.pipe';

@Component({
  imports: [CapitalizePipe],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('k_pipes');
}
