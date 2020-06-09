import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ComboSearchComponent } from '../../../../shared/combo-search/combo-search.component';

import { User } from '../user.model';
import _ from 'lodash';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent
extends ComboSearchComponent<User> implements OnChanges {
  selected: string;
  @Input() roles: number[] = [];
  constructor(public _userService: UserService) {
    super(_userService, false);
  }
  onLoad(filter = '') {
    if (!this.roles) {
      return;
    }
    debugger
    return this.service
      .getAll<User>(filter, 'id', 'asc', 0, 0, this.roles)
      .subscribe((response: any) => {
        this.payload = response.payload;
        this.filteredData.next(this.payload.slice());
      });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.roles) {
      this.onLoad();
    }
  }
  onSelectionChange(evt) {
    const selected = _.filter(this.payload, (el) => {
      return el.id === evt.value[0];
    });
    this.selected = selected[0].name;
  }
}
