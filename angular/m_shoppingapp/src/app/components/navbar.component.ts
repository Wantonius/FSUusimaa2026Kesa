import {Component,inject} from '@angular/core';
import {LoginService} from '../services/login.service';
import {Router,RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
	selector:"navbar",
	standalone:true,
	imports:[CommonModule,RouterLink],
	templateUrl:"./navbar.component.html"
})
export class Navbar {
	
	private router = inject(Router);
	private login = inject(LoginService);
	
	isUserLogged() {
		return this.login.isUserLogged();
	}
	
	logout() {
		this.login.logout().subscribe({
			next:(data) => console.log(data),
			error:(error) => {
				this.login.setLoginState(false,"");
				this.router.navigate(["/"])
			},
			complete:() => {
				this.login.setLoginState(false,"");
				this.router.navigate(["/"])
			}
		})
	}
}