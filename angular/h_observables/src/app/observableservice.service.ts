import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
@Injectable({
	providedIn:"root"
})
export class ObservableService {
	
	obs = new Observable((sub) => {
		setTimeout(() => sub.next("1"),1000)
		setTimeout(() => sub.next("2"),2000)
		setTimeout(() => sub.next("3"),3000)
		setTimeout(() => sub.next("4"),4000)
		setTimeout(() => sub.next("5"),5000)
		setTimeout(() => sub.complete(),6000)
	})
	
	getObservable() {
		return this.obs;
	}
}