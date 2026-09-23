import {Component,OnInit,inject,signal} from '@angular/core';
import {ShoppingItem} from '../models/shoppingitem.model';
import {Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import {ShoppingService} from '../services/shopping.service';
import {LoginService} from '../services/login.service';

@Component({
	selector:"shopping-list",
	standalone:true,
	imports:[CommonModule],
	templateUrl:"./shoppinglist.component.html"
})
export class ShoppingList implements OnInit {
	
	list = signal<ShoppingItem[]>([]);
	private router = inject(Router);
	private login = inject(LoginService);
	private shopping = inject(ShoppingService);
	
	ngOnInit() {
		if(this.login.isUserLogged()) {
			this.getList();
		} else {
			this.router.navigate(["/"]);
		}
	}
	
	getList() {
		this.shopping.getList().subscribe({
			next:(data) => this.list.set(data),
			error:(error) => {
				if(error.status === 403) {
					this.login.setLoginState(false,"");
					this.router.navigate(["/"])
				} else {
					console.log(error)
				}
			},
			complete:() => console.log("done")
		})
	}
	
	removeItem(id:number) {
		this.shopping.removeItem(id).subscribe({
			next:(data) => this.getList(),
			error:(error) => {
				if(error.status === 403) {
					this.login.setLoginState(false,"");
					this.router.navigate(["/"])
				} else {
					console.log(error)
				}
			},
			complete:() => console.log("done")
		})
	}
}