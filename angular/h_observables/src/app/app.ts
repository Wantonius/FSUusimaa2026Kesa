import { Component, signal } from '@angular/core';
import {ObservableService} from './observableservice.service';

@Component({
  imports: [],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
	protected readonly title = signal('h_observables');

	message = signal<string>("");
	
	constructor(private obsservice:ObservableService) {}

	startObserving() {
		this.obsservice.getObservable().subscribe({
			next:(value) => {this.message.set("observable value:"+value)},
			error:(error) => {this.message.set("Error occured:"+error)},
			complete:() => {this.message.set("Done")}
		})
	}
}
