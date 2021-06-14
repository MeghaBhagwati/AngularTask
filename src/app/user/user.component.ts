import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';

export class User {
  constructor(
    public userId: number,
    public userName: string,
    public userSurname: string,
    public userPincode: number,
    
    public userDob: Date,
    public userDoj: Date,
    public active: boolean

  ) {}
  
}
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
users: User[];
closeResult: any;
//editForm:FormGroup;
  constructor(
private httpClient: HttpClient,
private modalService: NgbModal,
//private fb:FormBuilder
  ) {}

ngOnInit():void{
  this.getUsers();
}




  
  getUsers(){
    this.httpClient.get<any>('http://localhost:8686/rest/user/all').subscribe(
      response => {
        console.log(response);
        this.users = response;
      }
    );
  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string{
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  onSubmit(f: NgForm) {
    const url = 'http://localhost:8686/rest/user/save';
    this.httpClient.post(url, f.value)
      .subscribe((result) => {
        this.ngOnInit(); //reload the table
      });
    this.modalService.dismissAll(); //dismiss the modal
  }
  openDetails(targetModal, user: User) {
    this.modalService.open(targetModal ,{
     centered: true,
     backdrop: 'static',
     size: 'lg'
   });
   
   
   
    document.getElementById('uname').setAttribute('value', user.userName);
    document.getElementById('usurname').setAttribute('value', user.userSurname);
    
 }
  
 
 
 
 
  

}



