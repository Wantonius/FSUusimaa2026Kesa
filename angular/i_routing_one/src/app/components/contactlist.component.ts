import {Component,OnInit,inject} from '@angular/core';
import {Contact} from '../models/contact.model';
import {ContactService} from '../services/contactservice.service';
import {CommonModule} from '@angular/common';

@Component({
	selector:"contact-list",
	standalone:true,
	imports:[CommonModule],
	templateUrl:"./contactlist.component.html"
})
export class ContactList implements OnInit {
	
	contactList:Contact[] = [];
	private contactService = inject(ContactService);
	
	ngOnInit() {
		this.getList();
	}
	
	getList() {
		this.contactList = this.contactService.getList();
	}

	
	removeContact(id:number) {
		this.contactService.removeContact(id);
		this.getList();
	}
}