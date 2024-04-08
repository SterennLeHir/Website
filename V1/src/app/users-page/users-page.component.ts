import {Component, OnInit} from '@angular/core';
import {MatTableModule} from "@angular/material/table";
import {CommonModule} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {lastValueFrom, Observable} from "rxjs";
import {NavComponent} from "../nav/nav.component";
import {FooterComponent} from "../footer/footer.component";
import {UserItemComponent} from "../user-item/user-item.component";
import {RouterLinkActive} from "@angular/router";
import {RoleValue} from "../modification-membres/role.enum";

export class User {
  role !: RoleValue;
  constructor(
    public id: number,
    public password: string,
    public lastname: string,
    public firstname: string,
    public age: number,
    public email: string
  ) {}
}

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [CommonModule, MatTableModule, NavComponent, FooterComponent, UserItemComponent, RouterLinkActive],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.css'
})
export class UsersPageComponent implements OnInit {
  constructor(
    private http: HttpClient
  ) {}

  message !: string;
  dataSource: User[]= [];
  ngOnInit(): void {
    const userRequest: Observable<any> = this.http.get('/api/users', { observe: 'response' });
    lastValueFrom(userRequest).then(response => this.dataSource = response.body);
  }

  search(e: KeyboardEvent) {
    const searchTerm = (e.target as HTMLInputElement).value;
    if (searchTerm === "") {
      const request: Observable<any> = this.http.get('/api/users/', {observe: 'response'});
      lastValueFrom(request).then(response => this.dataSource = response.body);
      this.message = "";
    } else if (e.key === 'Enter') {
      // La touche Entrée a été enfoncée
      // Récupérer la valeur de la barre de recherche
      const searchTerm = (e.target as HTMLInputElement).value;
      this.dataSource = [];
      const request: Observable<any> = this.http.get('/api/users/' + searchTerm, {observe: 'response'});
      lastValueFrom(request).then(response => {
        //console.log("pas d'erreur");
        this.dataSource.push(response.body);
        this.message = "";
      })
        .catch(e => this.message = "Aucun utilisateur avec cet id");
    }
  }
}
