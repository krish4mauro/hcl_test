import { Component, OnInit } from '@angular/core';
import { FilterOption } from './filter-option.interface';
import { UsersService } from '../users.service';
import { Subscription } from 'rxjs';
import { Member } from '../member';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  subscription: Subscription;
  filterString = '';
  selectedOption = '';
  apiNameList: Member[];
  filteredUsers: Member[];
  options: FilterOption[] = [
    {
      value: 'name',
      text: 'Name',
    },
    {
      value: 'username',
      text: 'User Name',
    },
    {
      value: 'email',
      text: 'Email',
    },
    {
      value: 'phone',
      text: 'Phone',
    },
    {
      value: 'website',
      text: 'Website',
    },
  ];
  users: any[];
  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.serveUsers();
    this.usersService.getUsers().subscribe((users: any[]) => {
      this.users = users.filter(
        (user) => user.status && user.name === 'Leanne Graham'
      );
      console.log('Got the users as: ', this.users);
    });
  }
  serveUsers() {
    this.subscription = this.usersService.serveUsers().subscribe((users) => {
      this.apiNameList = users;
      this.filteredUsers = [...users];
    });
  }

  getFilteredwebsite() {
    this.filteredUsers = this.apiNameList.filter(
      (user) =>
        user.website.toLowerCase().indexOf(this.filterString.toLowerCase()) > -1
    );
  }

  getFilteredphone() {
    this.filteredUsers = this.apiNameList.filter(
      (user) =>
        user.phone.toLowerCase().indexOf(this.filterString.toLowerCase()) > -1
    );
  }
  getFilteredemail() {
    this.filteredUsers = this.apiNameList.filter(
      (user) =>
        user.email.toLowerCase().indexOf(this.filterString.toLowerCase()) > -1
    );
  }
  getFilteredUsername() {
    this.filteredUsers = this.apiNameList.filter(
      (user) =>
        user.username.toLowerCase().indexOf(this.filterString.toLowerCase()) >
        -1
    );
  }
  getFilteredname() {
    this.filteredUsers = this.apiNameList.filter(
      (user) =>
        user.name.toLowerCase().indexOf(this.filterString.toLowerCase()) > -1
    );
  }
  getFilteredUsers() {
    let sl = this.selectedOption.toLowerCase();
    switch (sl) {
      case 'name':
        this.getFilteredname();
        break;
      case 'username':
        this.getFilteredUsername();

        break;
      case 'email':
        this.getFilteredemail();

        break;
      case 'phone':
        this.getFilteredphone();
        break;
      case 'website':
        this.getFilteredwebsite();

        break;
    }
  }
  getFilteredUsers2() {
    this.filteredUsers = this.apiNameList.filter(
      (user) =>
        // let sl = this.selectedOption.toLowerCase();
        // console.log(sl);
        // console.log('---s', this.selectedOption);

        user.name.toLowerCase().indexOf(this.filterString.toLowerCase()) > -1
    );
  }

  ngOnDestroy() {
    this.subscription && this.subscription.unsubscribe();
  }
}
