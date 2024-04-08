import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-user-item',
  standalone: true,
  imports: [CommonModule, MatCardModule, RouterLink, RouterLinkActive],
  templateUrl: './user-item.component.html',
  styleUrl: './user-item.component.css'
})
export class UserItemComponent {

  @Input() myData!:any
}
