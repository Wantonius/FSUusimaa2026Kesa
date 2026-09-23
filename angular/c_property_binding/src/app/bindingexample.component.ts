import {Component,OnInit,signal} from '@angular/core';

@Component({
	selector:"binding-example",
	standalone:true,
	templateUrl:"./bindingexample.component.html"
})
export class BindingExample implements OnInit {
	buttonDisabled = signal<boolean>(true);
	
	ngOnInit() {
		setTimeout(() => {
			console.log("Here");
			this.buttonDisabled.set(false);
		},5000);
	}
}