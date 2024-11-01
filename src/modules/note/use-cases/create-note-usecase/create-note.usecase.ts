import { Note } from '../../entities/note';
import { NotesRepository } from '../../repositories/note.repository';

interface CreateNoteRequest {
  title: string;
  description?: string;
  userId: string;
}

export class CreateNoteUsecase {
  constructor(private noteRepository: NotesRepository) {}

  async execute({ title, description, userId }: CreateNoteRequest) {
    const note = new Note({
      title,
      description,
      userId,
    });

    await this.noteRepository.create(note);

    return note;
  }
}
