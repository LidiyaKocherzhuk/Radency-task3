import { v4 } from 'uuid';

import { noteRepository } from '../repositories';
import {
    IGroupStats,
    INote,
    INoteData,
    IStats,
    IUpdateNote,
} from '../intefaces';
import { archiveService } from './archive.service';
import { ENoteCategory } from '../validators';

class NoteService {
    getAll(): INote[] {
        return noteRepository.getAll();
    }

    getById(id: string): INote {
        return noteRepository.getById(id);
    }

    create(noteData: INoteData): INote {
        const date = `${new Date().getDay() - 1}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`;
        const id = v4();

        return noteRepository.create({
            ...noteData,
            id,
            created: date,
            dates: noteData.dates ?? date,
            archived: false,
        });
    }

    update(updateNote: INote, updateData: IUpdateNote) {
        return noteRepository.update(updateNote, updateData);
    }

    delete(id: string) {
        noteRepository.delete(id);
    }

    stats() {
        const activeNotesStats = noteRepository.stats(this.getAll());
        const archivedNotesStats = noteRepository.stats(archiveService.getAll());

        const stats = {} as IStats<IGroupStats>;

        for (const key of Object.keys(ENoteCategory)) {
            stats[key as keyof IStats<number>] = {
                active: activeNotesStats[key as keyof IStats<number>],
                archived: archivedNotesStats[key as keyof IStats<number>],
            };
        }

        return stats;
    }
}

export const noteService = new NoteService();
