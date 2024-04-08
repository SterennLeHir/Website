import {Component, Input} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {NgIf} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-association-item',
  standalone: true,
  imports: [
    MatCardModule,
    NgIf,
    RouterLinkActive,
    RouterLink
  ],
  templateUrl: './association-item.component.html',
  styleUrl: './association-item.component.css'
})
export class AssociationItemComponent {
  @Input() myData!:any
}
