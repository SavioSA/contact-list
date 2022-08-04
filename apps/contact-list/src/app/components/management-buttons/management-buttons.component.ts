import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'contact-list-management-buttons',
  templateUrl: './management-buttons.component.html',
  styleUrls: ['./management-buttons.component.scss'],
})
export class ManagementButtonsComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void { }

  goToNewContact() {
    this.router.navigate(['/user/new']);
  }
  goToList() {
    this.router.navigate(['/list']);
  }
}
