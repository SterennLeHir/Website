import { Component } from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {ApiHelperService} from "../services/api-helper.service";
import {TokenStorageService} from "../services/token-storage.service";
import {NgIf} from "@angular/common";
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLinkActive,
    NgIf,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  messageError !: string;
  badPassword !: string;
  nullInputs !: string;
  constructor(
    private api: ApiHelperService,
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) {}

  account = new FormGroup({
      firstname : new FormControl('', Validators.required),
      lastname : new FormControl('', Validators.required),
      email : new FormControl('', Validators.required),
      age : new FormControl(18, [Validators.required, Validators.min(18)]),
      password : new FormControl('', Validators.required),
    }
  )
  confirm = new FormGroup( {
      confirmPassword : new FormControl('', Validators.required)
  }

  )

  firstnameControl() : AbstractControl | null {
    return this.account.get('firstname');
  }
  lastnameControl() : AbstractControl | null {
    return this.account.get('lastname');
  }

  emailControl() : AbstractControl | null {
    return this.account.get('email');
  }
  ageControl() : AbstractControl | null {
    return this.account.get('age');
  }
  passwordControl() : AbstractControl | null {
    return this.account.get('password');
  }

  confirmPasswordControl() : AbstractControl | null {
    return this.confirm.get('confirmPassword');
  }

  allElementsRequired () : boolean { // vérification sur les champs : on vérifie qu'ils sont tous remplis
    if (this.firstnameControl()?.errors?.['required'] || this.lastnameControl()?.errors?.['required'] || this.emailControl()?.errors?.['required'] ||
    this.ageControl()?.errors?.['required'] || this.passwordControl()?.errors?.['required'] || this.confirmPasswordControl()?.errors?.['required']) {
      return false;
    } else {
      return true;
    }
  }

  register(): void {
    console.log("registering...");
    if (this.passwordControl()?.value !== this.confirmPasswordControl()?.value) {
      this.badPassword = "Les mots de passe sont différents";
      this.passwordControl()?.setValue('');
      this.confirmPasswordControl()?.setValue('');
    } else if (!this.allElementsRequired()) {
      this.nullInputs = "Veuillez remplir tous les champs obligatoires";
    }
    else {
      this.api.post({ endpoint: '/auth/register', data: { ...this.account.value }}).then(response => {
        this.api.post({ endpoint: '/auth/login', data: { username: this.emailControl()?.value, password : this.passwordControl()?.value }}).then(response => {
          this.tokenStorageService.save(response.access_token, response.id);
          if(this.tokenStorageService.isLogged()) this.router.navigateByUrl('/home');
          else console.log("Votre compte n'a pas été créé");
        })
      })
        .catch((error) => {
          this.messageError = "L'utilisateur existe déjà";//error.error.message;
        })
    }

  };
}
