import {Component, OnInit} from '@angular/core';
import {NavComponent} from "../nav/nav.component";
import {HttpClient} from "@angular/common/http";
import {lastValueFrom, Observable} from "rxjs";
import {MatTableModule} from "@angular/material/table";
import {FooterComponent} from "../footer/footer.component";
import {NgForOf, NgIf} from "@angular/common";
import {UserItemComponent} from "../user-item/user-item.component";
import {AssociationItemComponent} from "../association-item/association-item.component";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-associations-page',
  standalone: true,
  imports: [
    NavComponent,
    MatTableModule,
    FooterComponent,
    NgForOf,
    UserItemComponent,
    AssociationItemComponent,
    RouterLinkActive,
    RouterLink,
    NgIf
  ],
  templateUrl: './associations-page.component.html',
  styleUrl: './associations-page.component.css'
})
export class AssociationsPageComponent implements OnInit {

  constructor(
    private http: HttpClient
  ) {}

  message !: string;
  dataSource: any= [];
  ngOnInit(): void {
    const request: Observable<any> = this.http.get('/api/associations', {observe: 'response'});
    console.log(lastValueFrom(request));
    lastValueFrom(request).then(response => this.dataSource = response.body);
  }

  search(e: KeyboardEvent) {
    const searchTerm = (e.target as HTMLInputElement).value;
    if (searchTerm === "") {
      const request: Observable<any> = this.http.get('/api/associations/', {observe: 'response'});
      lastValueFrom(request).then(response => this.dataSource = response.body);
      this.message = "";
    } else if (e.key === 'Enter') {
      // La touche Entrée a été enfoncée
      // Récupérer la valeur de la barre de recherche
      const searchTerm = (e.target as HTMLInputElement).value;
      this.dataSource = [];
      const request: Observable<any> = this.http.get('/api/associations/' + searchTerm, {observe: 'response'});
      lastValueFrom(request).then(response => {
        this.dataSource.push(response.body);
        this.message = "";
      })
        .catch(e => this.message = "Aucune association avec cet id");
      }
    }
}
