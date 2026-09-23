import {Component} from '@angular/core';
import {Apple} from './apple.component';

@Component({
	selector:"bucket",
	imports:[Apple],
	standalone:true,
	templateUrl:"./bucket.component.html"
})
export class Bucket {
	message:string = "";
	
	getMessage(message:string) {
		if(message === "Brown") {
			this.message = "This apple is rotten";
		} else {
			this.message = "This apple is "+message;
		}
	}
}