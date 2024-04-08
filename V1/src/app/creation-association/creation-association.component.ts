import {Component, OnInit} from '@angular/core';
import {NavComponent} from "../nav/nav.component";
import {FooterComponent} from "../footer/footer.component";
import {MatIconModule} from "@angular/material/icon";
import {NgForOf, UpperCasePipe} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {User} from "../users-page/users-page.component";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router, RouterLink, RouterLinkActive} from "@angular/router";
import {ApiHelperService} from "../services/api-helper.service";
import {TokenStorageService} from "../services/token-storage.service";
import {lastValueFrom, Observable} from "rxjs";

@Component({
  selector: 'app-creation-association',
  standalone: true,
  imports: [
    NavComponent,
    FooterComponent,
    MatIconModule,
    NgForOf,
    ReactiveFormsModule,
    UpperCasePipe,
    RouterLinkActive,
    RouterLink,
    FormsModule
  ],
  templateUrl: './creation-association.component.html',
  styleUrl: './creation-association.component.css'
})
export class CreationAssociationComponent{
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private api: ApiHelperService,
    private router: Router,
    private token: TokenStorageService
  ) {}

  validate(): void {
    console.log('ON CREE')
    const nom: string = (document.getElementById('nom') as HTMLInputElement).value;
    const description: string = (document.getElementById('description') as HTMLInputElement).value;
    this.api.post({ endpoint: '/associations',
      data: { name: nom, idUsers: [], description: description}}).then(response => {
      this.router.navigateByUrl('/associations');
    })
  };
  protected readonly JSON = JSON;
}
