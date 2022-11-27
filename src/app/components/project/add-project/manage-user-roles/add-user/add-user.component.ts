import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})

export class AddUserComponent {
  constructor(
    private _location: Location,
  ) {}
  backClicked() {
    this._location.back();
  }
}
