import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss']
})
export class ContactEditComponent implements OnInit {
  contact: Contact;
  subscription: Subscription;

  constructor(private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this.route.data.subscribe(data => {
      this.contact = data.contact || this.contactService.getEmptyContact();
    })
    // the same
    // this.route.params.subscribe(params => {
    //   const { id } = params;
    //   // @ts-ignore
    //   this.contact = id ? await this.contactService.getContactById(id).toPromise() : this.contactService.getEmptyContact();
    // })
  }

  onSaveContact() {
    this.contactService.saveContact(this.contact);
    this.router.navigateByUrl(this.contact._id ? `/contacts/${this.contact._id}` : '/contacts')
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
