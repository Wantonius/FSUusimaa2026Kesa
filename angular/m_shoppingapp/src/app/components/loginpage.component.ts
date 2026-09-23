import {Component,OnInit,inject,signal} from '@angular/core';
import {LoginService} from '../services/login.service';
import {FormsModule} from '@angular/forms';
import {User} from '../models/user.model';
import {Router} from '@angular/router';

@Component({
	selector:"login-page",
	standalone:true,
	imports:[FormsModule],
	templateUrl:"./loginpage.component.html",
	styleUrl:"./loginpage.component.css"
})
export class LoginPage implements OnInit {
	
	user:User = new User("","");
	message = signal<string>("");
	private login = inject(LoginService);
	private router = inject(Router);
	
	ngOnInit() {
		if(this.login.isUserLogged()) {
			this.router.navigate(["/list"]);
		}
	}
	
	register() {
		this.login.register(this.user).subscribe({
			next:(data) => this.message.set(data.message),
			error:(error) => {
				if(error.status === 409) {
					this.message.set("Username already in use");
				} else {
					this.message.set(error.message);
				}
			},
			complete:() => console.log("Register done")
		})
	}
	
	onLogin() {
		this.login.login(this.user).subscribe({
			next:(data) => {
				this.message.set("Login Success");
				this.login.setLoginState(true,data.token);
				this.router.navigate(["/list"])
			},
			error:(error) => {
				this.message.set(error.message)
			},
			complete:() => console.log("Login done")
		})
	}
}