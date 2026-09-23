import {Component,OnInit,inject,signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
	selector:"secret",
	standalone:true,
	templateUrl:"./secret.component.html"
})
export class Secret implements OnInit {
	
	name = signal<string>("");
	private route = inject(ActivatedRoute);
	
	ngOnInit() {
		this.route.queryParams.subscribe({
			next:(params) => {this.name.set(params["name"])}
 		})
	}
	
}