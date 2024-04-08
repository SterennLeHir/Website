import {Component, OnInit} from '@angular/core';
import {FooterComponent} from "../footer/footer.component";
import {MatIconModule} from "@angular/material/icon";
import {NavComponent} from "../nav/nav.component";
import {KeyValuePipe, NgForOf, UpperCasePipe} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {User} from "../users-page/users-page.component";
import {ActivatedRoute, Router, RouterLink, RouterLinkActive} from "@angular/router";
import {ApiHelperService} from "../services/api-helper.service";
import {lastValueFrom, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {RoleValue} from "./role.enum";

@Component({
  selector: 'app-modification-membres',
  standalone: true,
  imports: [
    FooterComponent,
    MatIconModule,
    NavComponent,
    NgForOf,
    ReactiveFormsModule,
    UpperCasePipe,
    FormsModule,
    KeyValuePipe,
    RouterLinkActive,
    RouterLink
  ],
  templateUrl: './modification-membres.component.html',
  styleUrl: './modification-membres.component.css'
})
export class ModificationMembresComponent implements OnInit {

  constructor(private router: Router, private api: ApiHelperService, private http: HttpClient, private route: ActivatedRoute) {}

  private assocId!:number;
  public members !: User[]; // membres initaux
  public membersModified : User[] = []// membres au cours de la modification
  public users !: User[];
  public selectedUser !:User;
  public membersToDeleteId : number[] = []; // id des membres qui ont été supprimés
  public newMembers : User[] = []; // utilisateurs qui viennent de devenir membre
  ngOnInit(): void {
    this.route.paramMap
      .subscribe(res => {
        const id = res.get("id");
        console.log(`id ${id}`);
        if (id != null) {
          this.assocId = +id;
          console.log("recuperation des membres");
          this.api.get({endpoint: '/associations/' + id + '/members'})
            .then(response => {
            this.members = response; // tableau initial qui ne changera pas durant la modification
            // Promise.all pour attendre la fin de toutes les requêtes asynchrones
            Promise.all(this.members.map(member => this.api.get({endpoint: '/roles/' + member.id + '/' + id})))
              .then(responses => {
                // responses est un tableau contenant les réponses pour chaque membre
                for (let i = 0; i < this.members.length; i++) {
                  // attribution du rôle à chaque membre
                  this.members[i].role = responses[i].name;
                  console.log(`role ${responses[i].name}`)
                }
                console.log("Membres initialisation :");
                console.log(JSON.stringify(this.members));
                // copie du tableau de membres avec les rôles attribués
                this.membersModified = this.members.map(member => ({...member}));
                console.log("Copie initialisation :");
                console.log(JSON.stringify(this.membersModified));
              })
              .then(response => {
                const userRequest: Observable<any> = this.http.get('/api/users', {observe: 'response'});
                lastValueFrom(userRequest).then(response => this.users = response.body);
                console.log("recuperation des utilisateurs");
              })
          })
            .catch(e => this.router.navigateByUrl('404'));
        }
      })
  }
  validate(): void {
    // On met à jour les membres
    this.api.put({ endpoint: '/associations/'+ this.assocId,
      data: { idUsers: this.membersToId()}}).then(response => {
      this.router.navigateByUrl('/associations/'+ this.assocId);
      console.log(`Utilisateurs ajoutés dans l'association`)
    }).then(() => this.modifyRoles());
    // On met à jour les rôles

  };

  modifyRoles() {
    // mise à jour des rôles pour tous les anciens membres
    console.log("Anciens membres");
    console.log(JSON.stringify(this.membersModified));
    for (const member of this.membersModified) {
      //console.log("boucle put");
      this.api.put({ endpoint: '/roles/'+ member.id + '/' + this.assocId,
        data: { name: member.role}}).then(response => {
        console.log(`role modifié pour l'utilisateur ${member.id} dans l'association ${this.assocId}`);
      })
    }
    console.log("Nouveaux membres");
    console.log(JSON.stringify(this.newMembers));
    // création des rôles pour tous les nouveaux membres
    for (const newMember of this.newMembers) {
      //console.log("boucle post");
      console.log("role à créer pour le membre : ");
      console.log(JSON.stringify(newMember));
      this.api.post({ endpoint: '/roles',
        data: { name: newMember.role, idUser : newMember.id, idAssociation : this.assocId}}).then(response => {
        console.log(`role créé pour l'utilisateur ${newMember.id} dans l'association ${this.assocId}`);
      }).catch(e => console.log("oups problème"));
    }
    console.log("Membres à supprimer");
    console.log(this.membersToDeleteId);
    for (let i = 0; i < this.membersToDeleteId.length; i++) { // suppression des rôles pour tous les nouveaux membres
      this.api.delete({ endpoint: '/roles/'+ this.membersToDeleteId[i] + '/' + this.assocId}).then(response => {
        console.log(`role supprimé pour l'utilisateur ${this.membersToDeleteId[i]} dans l'association ${this.assocId}`);
      })
    }
  }

  deleteMember(user:User): void{
    const i = this.members.findIndex(member => user.id === member.id); // position du user dans la liste initiale
    if (i !== -1) { // on l'ajoute aux membres à supprimer que s'il appartenait à la liste initiale
      this.membersToDeleteId.push(this.members[i].id);
      console.log("membres à supprimer");
    }
    // on le supprime de la liste modifiée ou de la liste des nouveaux users
    const i2 = this.newMembers.findIndex(member => user.id === member.id); // position du user dans la liste modifiée
    if (i2 !== -1) { // si c'est un nouveau membre
      this.newMembers.splice(i2, 1);
    } else {
      const i3 = this.membersModified.findIndex(member => user.id === member.id); // position du user dans la liste modifiée
      this.membersModified.splice(i3, 1);
    }
    console.log("Deleting member:", JSON.stringify(user));
  }

  addMember(): void{
    const idInModifiedList= this.membersModified.concat(this.newMembers).findIndex(member => this.selectedUser.id === member.id);
    if(idInModifiedList === -1){ // on n'ajoute le userSelected que s'il n'est pas déjà membre (liste modifiée)
      this.selectedUser.role = RoleValue.M; // Valeur par défaut
      if (this.membersToDeleteId.indexOf(this.selectedUser.id) !== -1) {// l'utilisateur a été supprimé sans valider
        // On l'enlève des utilisateurs à supprimer
        const indexToDelete = this.membersToDeleteId.indexOf(this.selectedUser.id);
        this.membersToDeleteId.splice(indexToDelete, 1);
      }
      // on regarde si c'est un nouveau membre ou un présent dans la liste initiale
      const idInInitialList= this.members.findIndex(member => this.selectedUser.id === member.id);
      if(idInInitialList !== -1) { // si c'est un ancien membre on modifie son role
        console.log("ancien membre");
        this.membersModified.push(this.selectedUser);
      } else { // si c'est un nouveau membre on l'ajoute à la liste des nouveaux membres
        console.log("nouveau membre");
        this.newMembers.push(this.selectedUser);
      }
      console.log('Adding member:', JSON.stringify(this.selectedUser));

    }
  }
  private membersToId(): number[]{
    return this.membersModified.concat(this.newMembers).map(member => member.id);
  }
  protected readonly RoleValue = RoleValue;
  protected readonly Object = Object;
}
