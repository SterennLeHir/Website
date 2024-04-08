import {Component, OnInit} from '@angular/core';
import {NavComponent} from "../nav/nav.component";
import {FooterComponent} from "../footer/footer.component";
import {ApiHelperService} from "../services/api-helper.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgForOf, UpperCasePipe} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {lastValueFrom, Observable} from "rxjs";

@Component({
  selector: 'app-modification-association',
  standalone: true,
  imports: [
    NavComponent,
    FooterComponent,
    NgForOf,
    UpperCasePipe,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './modification-association.component.html',
  styleUrl: './modification-association.component.css'
})

export class ModificationAssociationComponent implements OnInit{
  private assocId!:number;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private api: ApiHelperService,
    private router: Router
  ) {}

  association = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
  });
  ngOnInit(): void {
    this.route.paramMap
      .subscribe(res => {
        const id = res.get("id");
        if (id != null) {
          this.assocId = +id;
          const userRequest: Observable<any> = this.http.get(`/api/associations/${this.assocId}`, { observe: 'response' });
          lastValueFrom(userRequest).then( response => {
            this.association.patchValue(response.body);
          })
            .catch(e => this.router.navigateByUrl('404'));
        }
      })
  }

  submit(e: Event): void {
    e.preventDefault();
    console.log("submit");
    this.api.put({ endpoint: `/associations/${this.assocId}`, data: { ...this.association.value}}).then(response => {
      this.router.navigateByUrl(`/associations/${this.assocId}`);
    })
  };
}
