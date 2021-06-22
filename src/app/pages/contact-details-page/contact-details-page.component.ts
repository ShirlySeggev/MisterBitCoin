import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import { Contact } from 'src/app/models/contact.model';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Move } from 'src/app/models/move';

@Component({
  selector: 'contact-details-page',
  templateUrl: './contact-details-page.component.html',
  styleUrls: ['./contact-details-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactDetailsPageComponent implements OnInit {
  contact: Contact;
  user: User;
  amount: number;
  movesToDisplay: Move[];
  title: string;
  contactSubscription: Subscription;
  userSubscription: Subscription;

  constructor(private contactService: ContactService,
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router) { }

  ngOnInit(): void {
    this.contactSubscription = this.route.data.subscribe(data => this.contact = data.contact)
    this.userSubscription = this.userService.user$.subscribe(user => this.user = user);
    this.movesToDisplay = this.userService.getMoves(this.contact._id);
    this.title = this.movesToDisplay.length > 0 ? `Your last ${this.movesToDisplay.length} Moves:` : 'No Moves';
    // The same
    // this.route.params.subscribe(params => {
    //   const { id } = params;
    //   this.subscription = this.contactService.getContactById(id).subscribe(contact => this.contact = contact);
    // })
  }



  onBack() {
    this.router.navigateByUrl('/contacts')
  }

  onDelete() {
    this.contactService.deleteContact(this.contact._id);
    this.router.navigateByUrl('/contacts')
  }

  onTransfer(amount: number) {
    if (this.user.coins < amount) {
      alert('you haven\'t enough coins!')
      return;
    } else {
      this.userService.addMove(this.contact, amount);
      this.movesToDisplay = this.userService.getMoves(this.contact._id);
      amount = null;
    }

  }

  ngOnDestroy() {
    this.contactSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

}
