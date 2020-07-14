import { environment } from './../../../../../environments/environment';
import { validRoles } from './../../../../utils/enums';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import * as _ from 'lodash'
import { User } from '../../../admin/users/user.model';
import { HttpService } from '../../../../services/http.service';
import { ComboSearchComponent } from '../../../../shared/combo-search/combo-search.component';

@Component({
  selector: 'app-professional-search',
  templateUrl: './professional-search.component.html',
  styleUrls: ['./professional-search.component.scss']
})
export class ProfessionalSearchComponent extends ComboSearchComponent<User> implements OnChanges {
  selected: string;
  @Input() isMultiple = true;
  @Input() disabled = false;
  @Input() users: User;
  @Output() professionalChanged = new EventEmitter<User[]>();
  constructor(public _httpService: HttpService) {
    super(_httpService, `${environment.apiUrl}/api/user?role=${validRoles.Professional}`);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.users.currentValue && changes.users.currentValue.length > 0 ) {
      this.filteredData.next(this.prepareData(changes.users.currentValue));
    }
    if (changes.users.currentValue && changes.users.currentValue.length === 0 ) {
      this.filteredData.next(null);
    }
  }
  private prepareData(users) {
    return users.map( i => {
      return {
        id: i.User.id,
        firstname:  i.User.firstname,
        lastname: i.User.lastname
      };
    });
  }
  onSelectionChange(evt) {
    const selected = _.filter(this.payload, (el) => {
      return el.id === evt.value;
    });
    this.professionalChanged.emit(selected[0]);
  }
}
