import { Note } from 'src/modules/note/entities/note';

export abstract class NotesRepository {
  abstract create(note: Note): Promise<void>;
}
