import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiHelperService} from "../services/api-helper.service";
import {Minute} from "../association-detail-item/association-detail-item.component";
import {FooterComponent} from "../footer/footer.component";
import {NavComponent} from "../nav/nav.component";
import {NgForOf, NgIf, UpperCasePipe} from "@angular/common";
import {User} from "../users-page/users-page.component";
import {UsersListComponent} from "../users-list/users-list.component";

@Component({
  selector: 'app-minute',
  standalone: true,
  imports: [
    FooterComponent,
    NavComponent,
    NgForOf,
    NgIf,
    UpperCasePipe,
    UsersListComponent
  ],
  templateUrl: './minute.component.html',
  styleUrl: './minute.component.css'
})
export class MinuteComponent implements OnInit {
  constructor(private route: ActivatedRoute, private api: ApiHelperService, private router : Router){}

  ngOnInit(): void {
  console.log(this.route.paramMap);
    this.route.paramMap
      .subscribe(res => {
        const id = res.get("id");
        if (id != null) {
          this.api.get({endpoint : '/minutes/'+id}).then(response => {
            console.log(response);
            this.minute = response;
            this.voters = this.minute.voters;
            this.idAssociation = response.association.id ;
          })
            .catch(e => this.router.navigateByUrl('404'));
        }
      })
    }
  idAssociation !: any;
  minute !: Minute
  voters!: User[]
}
