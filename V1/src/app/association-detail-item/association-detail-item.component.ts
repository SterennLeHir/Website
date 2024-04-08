import {Component, OnInit} from '@angular/core';
import {FooterComponent} from "../footer/footer.component";
import {NavComponent} from "../nav/nav.component";
import {NgForOf, NgIf, UpperCasePipe} from "@angular/common";
import {ActivatedRoute, Router, RouterLink, RouterLinkActive} from "@angular/router";
import {ApiHelperService} from "../services/api-helper.service";
import {Association} from "../user-detail-item/user-detail-item.component";
import {User} from "../users-page/users-page.component";
import {lastValueFrom, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {UsersListComponent} from "../users-list/users-list.component";

export class Minute {
  constructor(
    public id: number,
    public content: string,
    public date: string,
    public voters : User[],
    public association : Association
  ) {}
}
@Component({
  selector: 'app-association-detail-item',
  standalone: true,
  imports: [
    FooterComponent,
    NavComponent,
    NgForOf,
    NgIf,
    UpperCasePipe,
    RouterLink,
    RouterLinkActive,
    UsersListComponent
  ],
  templateUrl: './association-detail-item.component.html',
  styleUrl: './association-detail-item.component.css'
})
export class AssociationDetailItemComponent implements OnInit{
  constructor(private route: ActivatedRoute,
              private api: ApiHelperService,
              private http:HttpClient,
  private router: Router
) {
  }
  ngOnInit(): void {
    this.route.paramMap
      .subscribe(res => {
        this.id = res.get("id");
        if (this.id != null) {
          const userRequest: Observable<any> = this.http.get('/api/associations/'+this.id, { observe: 'response' });
          lastValueFrom(userRequest).then(response => this.association = response.body)
            .catch(e => this.router.navigateByUrl('404'));
          /*this.api.get({endpoint : '/associations/'+id}).then(response => {
            console.log(response);
            this.association = response;
          });*/
          this.api.get({endpoint : '/associations/' + this.id + '/members'}).then(response => {
            this.members = response;
            this.nbMembers = this.members.length;
          });
          this.api.get({endpoint : '/minutes/association/' + this.id}).then(response => {
            this.minutes = response;
            this.nbMinutes = this.minutes.length;
          });
        }
      })
  }


  association!:Association;
  members: User[] = [];
  minutes: Minute[] = [];
  nbMinutes !: number;
  nbMembers !: number;
  id !: string | null;


  delete():void{
    console.log('ON DELETE')
    this.api.delete({ endpoint: '/associations/'+ this.id,
      data: { id: this.id}}).then(response => {
      this.router.navigateByUrl('/associations');
    })
  }
}

