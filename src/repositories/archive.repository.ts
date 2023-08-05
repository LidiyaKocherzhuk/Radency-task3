import { notes } from '../data';
import { INote } from '../intefaces';

class ArchiveRepository {
    getAll(): INote[] {
        return notes.filter((note) => note.archived);
    }

    getById(id: string): INote {
        return <INote>notes.find((note) => note.id === id && note.archived);
    }
}

export const archiveRepository = new ArchiveRepository();
