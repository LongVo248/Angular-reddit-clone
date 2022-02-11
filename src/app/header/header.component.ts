import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean= false;
  username: string='';
  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  goToUserProfile() {
    // this.router.navigateByUrl('/user-profile/' + this.username);
  }
  logout(){

  }
}
