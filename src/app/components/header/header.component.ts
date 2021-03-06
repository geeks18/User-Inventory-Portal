import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public auth: AuthService,private router: Router) { }

  ngOnInit() {
  }


  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
}
}
