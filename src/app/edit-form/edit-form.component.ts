import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Notes from '../appInterfaces/notes.interface';
import { NotesService } from '../appservice/notes.service';
import { DialogComponent } from '../dialog/dialog.component';
import { UtilityService } from '../utility.service';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css'],
})
export class EditFormComponent implements OnInit {
  isReadOnly: boolean = true;
  imageSrc: any;
  content: string = '';
  currentNote: any | Notes = {
    title: '',
    Content: '',
    imageUrl: '',
  };
  showPop:boolean = false;
  DonotShowPop:boolean=false;

  selectedFile!: File;

  constructor(
    public dialog: MatDialog,
    
    private router: Router,
    private _notesService: NotesService,
    private _utilityService: UtilityService
  ) {
    this.currentNote = this.router.getCurrentNavigation()?.extras.state;
  }

  ngOnInit(): void {}

  // open takes two parameters one is component and other is optional configurations

  openDialog() {
     
    //  this.showPop=true;
    //  this.dialog.open(EditFormComponent) 
    this.dialog.open(DialogComponent,{
      data:{Key:this.currentNote.key},
    });

    this.dialog.open(DialogComponent).afterClosed().subscribe(res =>{
       
         if(res == "true"){
           this.deleteNotes();
           this.dialog.closeAll();
         }
         else{
           this.dialog.closeAll();
         }
    });
  }

  enableEdit() {
    this.isReadOnly = false;
  }

  readURL(event: any): void {
    
    this.currentNote.imageUrl = null;
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => (this.imageSrc = reader.result);

      reader.readAsDataURL(file);
    }
    this.selectedFile = event.target.files[0];
  }

  saveNotes() {
   

    if (this.selectedFile != undefined) {
      this._utilityService.onUpload(this.selectedFile).subscribe(
        (res) => {
          

          this.currentNote.imageUrl = JSON.parse(
            JSON.stringify(Object.values(res)[0])
          ).url;

          this.updateNote();
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      this.updateNote();
    }
  }

  //  we have made a function updateNote in which are updating the title content and imag and pushing it to noteref
  updateNote(): void {
    const data = {
      title: this.currentNote.title,
      Content: this.currentNote.Content,
      imageUrl: this.currentNote.imageUrl,
    };

    if (this.currentNote.key) {
      this._utilityService.show();
      this._notesService
        .update(this.currentNote.key, data)
        .then(() => {
          this._utilityService.hide();
          this.router.navigate(['/dashboard']);
        })
        .catch((err) => {
          console.log(err);
          this._utilityService.hide();
        });
    }
  }
  //  we have made a function in which are deleteing the specific notes
  deleteNotes(): void {
    if (this.currentNote.key) {
      this._notesService
        .delete(this.currentNote.key)
        .then(() => {
          this.router.navigate(['/dashboard']);
        })
        .catch((err) => console.log(err));
    }
  }
}
