import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Notes from '../appInterfaces/notes.interface';
import { NotesService } from '../appservice/notes.service';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  showPop:boolean=false;
  

  constructor(private router: Router,
    private _notesService: NotesService,
    @Inject(MAT_DIALOG_DATA) private data:{key:any}
    ){
      
     }

  ngOnInit(): void {
  }

  deleteNotes(): void {
   
    this._notesService
        .delete(this.data.key)
        .then(() => {
          this.router.navigate(['/dashboard']);
        })
        .catch((err) => console.log(err));
    }

    cancel(){
      this.showPop=false;
      this.router.navigate(["editform"])
    }
  

}
