import {Component, OnInit} from '@angular/core';
import {ApiHelperService} from "../services/api-helper.service";
import {TokenStorageService} from "../services/token-storage.service";
import {Router} from "@angular/router";
import {NavComponent} from "../nav/nav.component";
import {FooterComponent} from "../footer/footer.component";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-modification-infos',
  standalone: true,
  imports: [
    NavComponent,
    FooterComponent,
    ReactiveFormsModule
  ],
  templateUrl: './modification-infos.component.html',
  styleUrl: './modification-infos.component.css'
})
export class ModificationInfosComponent implements OnInit {
  constructor(
    private api: ApiHelperService,
    private router: Router,
    private token: TokenStorageService
  ) {}

  profile = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    email: new FormControl(''),
    age: new FormControl(0)
  });

  id !: number;
  ngOnInit(): void {
    this.id = this.token.getUserId();
    if (Number.isNaN(this.id)) this.router.navigateByUrl('/login');
    this.api.get({ endpoint: `/users/${this.id}` }).then((response) => {
      this.profile.patchValue(response);
    })
      .catch(e => this.router.navigateByUrl('404'));
  }
  submit(e: Event): void {
    e.preventDefault();
    console.log("submit");
    this.api.put({ endpoint: `/users/${this.id}`, data: { ...this.profile.value}}).then(response => {
      this.router.navigateByUrl('/account');
    })
  };
}
