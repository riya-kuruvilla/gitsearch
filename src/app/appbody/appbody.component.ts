import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-appbody',
  templateUrl: './appbody.component.html',
  styleUrls: ['./appbody.component.css']
})

export class AppbodyComponent implements OnInit {
  search = '';
  //  res = null;
  obj;
  tag = `No Data To Display`;
  isLoading: boolean;
  isImage: boolean;
  baseUrl = 'https://api.github.com/users/';

  constructor(private httpClient: HttpClient, private toastr: ToastrService) { }
  pushData(search) {
    console.log('hi');
    if (localStorage.getItem(search) != null) {
      this.isLoading = true;
      this.obj = JSON.parse(localStorage.getItem(search));
      this.tag = this.obj.login;
      this.isLoading = false;
      this.isImage = true;


    } else {


      this.isLoading = true;
      this.isImage = false;
      console.log(search);
      this.httpClient.get(this.baseUrl + search)
        // .subscribe((res: any) => {
        .subscribe(res => {
          this.obj = res;
          localStorage.setItem(search, JSON.stringify(this.obj));

          this.tag = this.obj.login;
          this.isImage = true;
          this.isLoading = false;

        },

          error => {
            this.toastr.error('User not found', 'invalid user');
            this.isLoading = false,
              this.obj = false;

          }

        );
    }
  }

  ngOnInit() {
    this.isLoading = false;
  }


}
