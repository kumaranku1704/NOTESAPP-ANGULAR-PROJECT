import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Notes from '../appInterfaces/notes.interface';

import { NotesService } from '../appservice/notes.service';
import { UtilityService } from '../utility.service';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css'],
})
export class CreateFormComponent implements OnInit {
  imageSrc: any;
  selectedFile!: File;
  title: string = '';
  text: string = '';
  notes: Notes = new Notes();

  constructor(
    private _utilityService: UtilityService,
    private _notesService: NotesService,
    private router: Router
  ) {
    this.notes.date = new Date();
    // this.notes.date.setDate(this.notes.date.getDate() - 1);
    
  }

  ngOnInit(): void {}

  // we have made a function readurl in
  readURL(event: any): void {
    
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => (this.imageSrc = reader.result);

      reader.readAsDataURL(file);
    }
    this.selectedFile = event.target.files[0];
  }
  //  we have made a function for uploading our image to noteref
  saveNotes() {
    if (this.selectedFile != undefined) {
      this._utilityService.onUpload(this.selectedFile).subscribe(
        (res) => {
          this.notes.imageUrl = JSON.parse(
            JSON.stringify(Object.values(res)[0])
          ).url;

          this.createNote();
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      this.createNote();
    }
  }

  // this functionis used for creating the notesdata and emailvalues and aftercompletion redirectiing it to dashboard page
  createNote() {
    this.notes.Email = localStorage.getItem('useremail')?.toString();
    this.notes.Date = this.notes.date?.toDateString();
    this._notesService.create(this.notes).then(() => {
      this.router.navigate(['/dashboard']);
    });
  }
}
