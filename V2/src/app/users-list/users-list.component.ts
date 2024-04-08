import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {User} from "../users-page/users-page.component";
import {NgForOf, UpperCasePipe} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {ApiHelperService} from "../services/api-helper.service";

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    NgForOf,
    RouterLinkActive,
    UpperCasePipe,
    RouterLink
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit, OnChanges{

  constructor(private api: ApiHelperService) {}

  @Input() members !: User[]
  @Input() id !: any;
  roles = new Map();

  ngOnInit(): void {
    console.log("init user lists");
    for (const member of this.members) {
        this.api.get({endpoint : '/roles/' + member.id + '/' + this.id}).then(response => {
          console.log(response.name);
          this.roles.set(member, response.name);
          console.log("la map est :");
          console.log(this.roles);
        });
    }
  }

  ngOnChanges(): void {
    console.log("init user lists");
    for (const member of this.members) {
      this.api.get({endpoint : '/roles/' + member.id + '/' + this.id}).then(response => {
        console.log(response.name);
        this.roles.set(member, response.name);
        console.log("la map est :");
        console.log(this.roles);
      });
    }
  }


  getRole(member: User) {
    return this.roles.get(member);
  }
}
