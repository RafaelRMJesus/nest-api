import { randomUUID } from 'crypto';
import { Replace } from 'src/utils/replace-type';

interface NoteSchema {
  title: string;
  description: string | null;
  userId: string;
  createdAt: Date;
}

export class Note {
  private props: NoteSchema;
  private _id: string;

  constructor(
    props: Replace<NoteSchema, { description?: string; createdAt?: Date }>,
    id?: string,
  ) {
    this.props = {
      ...props,
      description: props.description ?? null,
      createdAt: props.createdAt ?? new Date(),
    };
    this._id = id || randomUUID();
  }

  get id(): string {
    return this._id;
  }

  get title(): string {
    return this.props.title;
  }

  set title(title: string) {
    this.props.title = title;
  }

  get description(): string | null {
    return this.props.description;
  }

  set description(description: string | null) {
    this.props.description = description;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get userId(): string {
    return this.props.userId;
  }
}
