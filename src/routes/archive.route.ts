import {
    Request,
    Response,
    NextFunction,
    Router,
} from 'express';
import { archiveService, noteService } from '../services';
import { noteMiddleware } from '../middlewares';

export const archiveRoute = Router();

archiveRoute.get('/archive', (req: Request, res: Response, next: NextFunction) => {
    try {
        const archivedNotes = archiveService.getAll();

        res.status(200).json(archivedNotes);
    } catch (e) {
        next(e);
    }
});

archiveRoute.delete(
    '/archive/:id',
    noteMiddleware.isNote(archiveService),
    (req: Request, res: Response, next: NextFunction) => {
        try {
            const { note } = req.app.locals;
            noteService.update(note, { archived: false });

            res.status(200).json('Unarchived successfully!');
        } catch (e) {
            next(e);
        }
    },
);
