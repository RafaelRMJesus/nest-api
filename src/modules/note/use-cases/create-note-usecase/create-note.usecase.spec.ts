import { NoteRepositoryMock } from '../../repositories/note-mock.repository';
import { CreateNoteUsecase } from './create-note.usecase';

let noteRepositoryMock: NoteRepositoryMock;
let createNoteUsecase: CreateNoteUsecase;

describe('Create Note', () => {
  beforeEach(() => {
    noteRepositoryMock = new NoteRepositoryMock();
    createNoteUsecase = new CreateNoteUsecase(noteRepositoryMock);
  });

  it('should be able to create a new note', async () => {
    expect(noteRepositoryMock).toEqual([]);

    const note = await createNoteUsecase.execute({
      title: 'teste',
      userId: '123123',
    });

    expect(noteRepositoryMock.notes).toEqual([note]);
  });
});
