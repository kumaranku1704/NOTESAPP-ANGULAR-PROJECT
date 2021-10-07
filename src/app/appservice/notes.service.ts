import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from  'angularfire2/database';
import Notes from '../appInterfaces/notes.interface';


@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private dbPath = '/notes';

  notesRef: AngularFireList<Notes>;

  constructor(private db: AngularFireDatabase) {
    this.notesRef = db.list(this.dbPath);
  }
 

  // this function is used for getting all the data from notesref 
  getAll(): AngularFireList<Notes> {
    return this.notesRef;
  }
 
  // this function is used for creating the note and pushing its valued to noteref
  create(note: Notes): any {
    return this.notesRef.push(note);
  }

  // this function is used for updating the values on dataref
  update(key: string, value: any): Promise<void> {
    return this.notesRef.update(key, value);
  }


// this function is used for deleting the specific note
  delete(key: string): Promise<void> {
    return this.notesRef.remove(key);
  }
  
}
