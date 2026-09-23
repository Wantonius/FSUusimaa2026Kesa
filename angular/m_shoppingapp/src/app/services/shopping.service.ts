import {Service,inject} from '@angular/core';
import {ShoppingItem} from '../models/shoppingitem.model';
import {LoginService} from './login.service';
import {BackendMessage} from '../models/backendmessage.model';
import {HttpClient,HttpHeaders} from '@angular/common/http';

@Service()
export class ShoppingService {
	
	private http = inject(HttpClient);
	private login = inject(LoginService);
	
	getList() {
		const httpOptions = {
			headers:new HttpHeaders({
				"token":this.login.getToken()
			})
		}
		return this.http.get<ShoppingItem[]>("/api/shopping",httpOptions);
	}
	
	addItem(item:ShoppingItem) {
		const httpOptions = {
			headers:new HttpHeaders({
				"Content-Type":"application/json",
				"token":this.login.getToken()
			})
		}
		return this.http.post<BackendMessage>("/api/shopping",item,httpOptions);
	}
	
	removeItem(id:number) {
		const httpOptions = {
			headers:new HttpHeaders({
				"token":this.login.getToken()
			})
		}
		return this.http.delete<BackendMessage>("/api/shopping/"+id,httpOptions);
	}
}