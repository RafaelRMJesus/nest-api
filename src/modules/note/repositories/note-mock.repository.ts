import { NotesRepository } from './note.repository';
import { Note } from '../entities/note';

export class NoteRepositoryMock implements NotesRepository {
  public notes: Note[] = [];

  async create(note: Note): Promise<void> {
    this.notes.push(note);
  }
}
