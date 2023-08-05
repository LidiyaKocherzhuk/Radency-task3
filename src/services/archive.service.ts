import { archiveRepository } from '../repositories';
import { INote } from '../intefaces';

class ArchiveService {
    getAll(): INote[] {
        return archiveRepository.getAll();
    }

    getById(id: string): INote {
        return archiveRepository.getById(id);
    }
}

export const archiveService = new ArchiveService();
