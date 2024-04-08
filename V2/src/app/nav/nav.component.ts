import {Component, Inject, Input} from '@angular/core';
import {TokenStorageService} from "../services/token-storage.service";
import {CommonModule} from "@angular/common";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  isLogged!:boolean
  constructor(
    private service:TokenStorageService,
    private router: Router
  ) {}

  ngDoCheck(){
    this.isLogged = this.service.isLogged()
  }

  logout(): void {
    console.log("click on logout !");
    this.service.clear();
    this.router.navigateByUrl("/login");
  }
}
