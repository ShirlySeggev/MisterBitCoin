import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Move } from 'src/app/models/move';
import { User } from 'src/app/models/user';
import { BitcoinService } from 'src/app/services/bitcoin.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  // user$: Observable<User>;
  user: User;
  subscribe: Subscription;
  btc$: Observable<number>;
  movesToDisplay: Move[];
  title: string;

  constructor(private userService: UserService,
    private bitcoinService: BitcoinService,
    private router: Router) { }

  ngOnInit(): void {
    // this.user$ = this.userService.user$;
    this.subscribe = this.userService.user$.subscribe(user => this.user = user);
    this.btc$ = this.bitcoinService.getRate();
    this.movesToDisplay = this.userService.getMoves('all'); //get all moves
    this.title = this.movesToDisplay.length > 0 ? `Your Moves:`:'No Moves';
  }

  onLogout(){
    this.userService.logout();
    this.router.navigateByUrl('/signup');
    this.subscribe.unsubscribe();
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }
}
