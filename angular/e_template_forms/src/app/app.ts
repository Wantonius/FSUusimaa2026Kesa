import { Component, signal } from '@angular/core';
import {TemplateForm} from './components/templateform.component';
@Component({
  imports: [TemplateForm],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('e_template_forms');
}
