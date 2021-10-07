import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import Notes from '../appInterfaces/notes.interface';
import { NotesService } from '../appservice/notes.service';

import { UtilityService } from '../utility.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  searchText: string = '';
  notes!: Notes[];
  selectedValue!: string;
  order: string[] = ['Asc', 'Desc'];
  currentIndex = -1;
  showDeleteBtn: boolean = false;
  selectedNote: string[] = [];
  currentUser: any = '';

  constructor(
    private router: Router,
    private _notesService: NotesService,
    private _utilityService: UtilityService
  ) {}

  ngOnInit(): void {
    this.currentUser = localStorage.getItem('useremail')?.toString();
    this.retrieveNotes();
  }
  // this function is made when user wants to create a newnote it will navigate it to createform
  addNotes() {
    this.router.navigate(['/createform']);
  }

  //  this function is made for retrieving the notes
  retrieveNotes(): void {
    this._utilityService.show();
    this._notesService
      .getAll()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((data) => {
        this._utilityService.hide();
        this.notes = data;
        this.getFilteresNotes();
        
      });
  }

  // this function is used for passing the note to EditFormComponent
  setActiveNote(note: Notes): void {
    this.router.navigate(['/editform'], { state: note });
  }

  // this function is used to adjust note as per order
  reverseNotes() {
    this.notes = this.notes.reverse();
    this.showDeleteBtn = false;
  }

  // this function is used for selecting multiple notes at a time
  selectNote(key: string) {
    if (this.selectedNote.indexOf(key) !== -1) {
      const index = this.selectedNote.indexOf(key);
      this.selectedNote.splice(index, 1);
    } else {
      this.selectedNote.push(key);
    }
    this.selectedNote.length > 0
      ? (this.showDeleteBtn = true)
      : (this.showDeleteBtn = false);
  }

  // this function is used for deleting notes
  deleteNotes() {
    this.selectedNote.forEach((element) => {
      this._notesService
        .delete(element)
        .then(() => {
         
        })
        .catch((err) => console.log(err));
    });
    this.showDeleteBtn = false;
    this.selectedNote = [];
  }

  // this function is used for show the notes of specific user
  getFilteresNotes() {
    this.notes = this.notes.filter((note) => note.Email == this.currentUser);
  }
}
