import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {NgForOf, NgIf, UpperCasePipe} from "@angular/common";
import {ApiHelperService} from "../services/api-helper.service";
import {NavComponent} from "../nav/nav.component";
import {FooterComponent} from "../footer/footer.component";
import {UserItemComponent} from "../user-item/user-item.component";

@Component({
  selector: 'app-user-detail-item',
  standalone: true,
  imports: [
    UpperCasePipe,
    NgIf,
    NavComponent,
    FooterComponent,
    NgForOf,
    UserItemComponent
  ],
  templateUrl: './user-detail-item.component.html',
  styleUrl: './user-detail-item.component.css'
})
export class UserDetailItemComponent implements OnInit {

  constructor(private route: ActivatedRoute, private api: ApiHelperService, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap
      .subscribe(res => {
        const id = res.get("id");
        if (id != null) {
          this.api.get({endpoint : '/users/'+id}).then(response => this.user = response).catch(e => this.router.navigateByUrl('*'));
          this.api.get({endpoint : '/associations/' + id + '/associations'}).then(response => {
            this.associations = response;
            for (const asso of this.associations) {
              //console.log("Boucle for");
              console.log(asso);
              const idAsso = asso.id;
              /*const role = this.api.get({endpoint : '/roles/' + id + '/'+ idAsso}).then(res => {
                this.roles.push(res);
              })*/ // A faire ( ne marche pas)
            }
          });
        }
      })
  }


  user!:any
  associations: Association[] = []
  roles: string[] = [];
}
export class Association {
  id!:number;
  name!:string;
  description!:string;
  users!:any;
}

