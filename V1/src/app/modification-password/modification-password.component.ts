import { Component } from '@angular/core';
import {FooterComponent} from "../footer/footer.component";
import {NavComponent} from "../nav/nav.component";
import {ApiHelperService} from "../services/api-helper.service";
import {Router} from "@angular/router";
import {TokenStorageService} from "../services/token-storage.service";
import {User} from "../users-page/users-page.component";

@Component({
  selector: 'app-modification-password',
  standalone: true,
  imports: [
    FooterComponent,
    NavComponent
  ],
  templateUrl: './modification-password.component.html',
  styleUrl: './modification-password.component.css'
})
export class ModificationPasswordComponent {
  constructor(
    private api: ApiHelperService,
    private router: Router,
    private token: TokenStorageService
  ) {}

  error !:string;
  user!: User;
  validate(): void {
    const mdp: string = (document.getElementById('nouveau-mdp') as HTMLInputElement).value;
    const mdp2: string = (document.getElementById('confirmer-nouveau-mdp') as HTMLInputElement).value;
    if (mdp !== mdp2)  {
      this.error = "Le mot de passe est différent";
      console.log(this.error);
    }
    else {
      const id = this.token.getUserId();
      this.api.get({endpoint : '/users/' +id}).then( response => {
        this.user = response;
        this.api.put({ endpoint: '/users/'+ id, data: { firstname: this.user.firstname, lastname: this.user.lastname, age : this.user.age, email : this.user.email, password : mdp}}).then(response => {
          this.router.navigateByUrl('/account');
        })
      });

    }
  };
}
