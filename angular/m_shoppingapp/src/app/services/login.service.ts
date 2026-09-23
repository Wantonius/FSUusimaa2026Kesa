import {Service,inject} from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {BackendMessage} from '../models/backendmessage.model';
import {User} from '../models/user.model';
import {LoginState} from '../models/loginstate.model';

@Service()
export class LoginService {
	
	private token:string = "";
	private isLogged:boolean = false;
	private http = inject(HttpClient);
	
	constructor() {
		let temp = sessionStorage.getItem("loginstate");
		if(temp) {
			let state:LoginState = JSON.parse(temp);
			this.isLogged = state.isLogged;
			this.token = state.token;
		}
	}
	
	register(user:User) {
		const httpOptions = {
			headers:new HttpHeaders({
				"Content-Type":"application/json"
			})
		}
		return this.http.post<BackendMessage>("/register",user,httpOptions);
	}

	login(user:User) {
		const httpOptions = {
			headers:new HttpHeaders({
				"Content-Type":"application/json"
			})
		}
		return this.http.post<BackendMessage>("/login",user,httpOptions);
	}
	
	logout() {
		const httpOptions = {
			headers:new HttpHeaders({
				token:this.token
			})
		}
		return this.http.post<BackendMessage>("/logout",{},httpOptions);
	}
	
	getToken() {
		return this.token;
	}
	
	isUserLogged() {
		return this.isLogged;
	}
	
	setLoginState(isLogged:boolean,token:string) {
		this.token = token;
		this.isLogged = isLogged;
		sessionStorage.setItem("loginstate",JSON.stringify({
			isLogged:isLogged,
			token:token
		}))
	}
	
}