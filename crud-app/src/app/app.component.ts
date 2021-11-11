import { Component } from '@angular/core';
import {faHeart} from '@fortawesome/free-solid-svg-icons';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import {faMinusCircle} from '@fortawesome/free-solid-svg-icons';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'CRUD Demo';
  faHeart = faHeart;
  faClipboard = faClipboard;
  faFilter = faFilter;
  faMinusCircle = faMinusCircle;
  faPlusCircle = faPlusCircle;
  showCreate:boolean = false;
  showRetrieve:boolean = false;
  showUpdate:boolean = false;
  showDelete:boolean = false;

  showCreateComponent(event){
    this.showCreate = true;
    this.showRetrieve = false;
    this.showUpdate = false;
    this.showDelete = false;
  }

  showRetrieveComponent(event){
    this.showCreate = false;
    this.showRetrieve = true;
    this.showUpdate = false;
    this.showDelete = false;
  }

  showUpdateComponent(event){
    this.showCreate = false;
    this.showRetrieve = false;
    this.showUpdate = true;
    this.showDelete = false;
  }

  showDeleteComponent(event){
    this.showCreate = false;
    this.showRetrieve = false;
    this.showUpdate = false;
    this.showDelete = true;
  }
}
