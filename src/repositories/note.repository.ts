import { notes } from '../data';
import { INote, IStats, IUpdateNote } from '../intefaces';

class NoteRepository {
    getAll(): INote[] {
        return notes.filter((note) => !note.archived);
    }

    getById(id: string): INote {
        return <INote>notes.find((note) => note.id === id && !note.archived);
    }

    create(note: INote): INote {
        notes.push(note);
        return note;
    }

    update(updateNote: INote, updateData: IUpdateNote): INote {
        notes.forEach((note, index) => {
            if (note.id === updateNote.id) {
                let { dates } = note;

                if (updateData.dates) {
                    dates = note.dates.split(',').includes(updateData.dates)
                        ? note.dates
                        : `${note.dates},${updateData.dates}`;
                }

                notes.splice(index, 1, { ...updateNote, ...updateData, dates });
            }
        });

        return this.getById(updateNote.id);
    }

    delete(id: string): void {
        notes.forEach((note, index) => {
            if (note.id === id && !note.archived) {
                notes.splice(index, 1);
            }
        });
    }

    stats(noteData: INote[]) {
        const stats = {} as IStats<number>;

        noteData.forEach((item) => {
            const category = item.category.replace(' ', '_') as keyof typeof stats;
            if (stats[category]) {
                stats[category]++;
            } else {
                stats[category] = 1;
            }
        });

        return stats;
    }
}

export const noteRepository = new NoteRepository();
