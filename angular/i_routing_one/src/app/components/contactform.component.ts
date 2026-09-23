import {Component,inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Contact} from '../models/contact.model';
import {ContactService} from '../services/contactservice.service';

@Component({
	selector:"contact-form",
	standalone:true,
	imports:[FormsModule],
	templateUrl:"./contactform.component.html"
})
export class ContactForm {
	
	contact:Contact = new Contact("","","","",0);
	private contactService = inject(ContactService);

	addContact() {
		this.contactService.addContact(this.contact);
		this.contact = new Contact("","","","",0);
	}
}