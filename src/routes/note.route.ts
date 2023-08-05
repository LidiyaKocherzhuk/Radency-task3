import {
    Router,
    Request,
    Response,
    NextFunction,
} from 'express';

import { noteService } from '../services';
import { noteMiddleware } from '../middlewares';

export const noteRoute = Router();

noteRoute.post(
    '/notes',
    noteMiddleware.isValidCreateData,
    (req: Request, res: Response, next: NextFunction) => {
        try {
            const { noteData } = req.app.locals;

            const createdNote = noteService.create(noteData);

            res.status(201).json(createdNote);
        } catch (e: any) {
            next(e);
        }
    },
);

noteRoute.get(
    '/notes',
    (req: Request, res: Response, next: NextFunction) => {
        try {
            const notes = noteService.getAll();
            res.status(200).json(notes);
        } catch (e: any) {
            next(e);
        }
    },
);

noteRoute.get(
    '/notes/:id',
    noteMiddleware.isNote(noteService),
    (req: Request, res: Response, next: NextFunction) => {
        try {
            const { note } = req.app.locals;
            res.status(200).json(note);
        } catch (e: any) {
            next(e);
        }
    },
);

noteRoute.patch(
    '/notes/:id/archive',
    noteMiddleware.isNote(noteService),
    (req: Request, res: Response, next: NextFunction) => {
        try {
            const { note } = req.app.locals;

            noteService.update(note, { archived: true });

            res.status(200).json({ message: 'Archived successfully!' });
        } catch (e) {
            next(e);
        }
    },
);

noteRoute.patch(
    '/notes/:id',
    noteMiddleware.isNote(noteService),
    noteMiddleware.isValidUpdateData,
    (req: Request, res: Response, next: NextFunction) => {
        try {
            const { note, noteUpdateData } = req.app.locals;

            const updatedNote = noteService.update(note, noteUpdateData);

            res.status(201).json(updatedNote);
        } catch (e: any) {
            next(e);
        }
    },
);

noteRoute.delete(
    '/notes/:id',
    noteMiddleware.isNote(noteService),
    (req: Request, res: Response, next: NextFunction) => {
        try {
            noteService.delete(req.params.id);
            res.status(200).json({ message: 'Deleted successfully!' });
        } catch (e: any) {
            next(e);
        }
    },
);

noteRoute.get('/notes-stats', (req: Request, res: Response, next: NextFunction) => {
    try {
        const stats = noteService.stats();

        res.status(200).json(stats);
    } catch (e:any) {
        next(e);
    }
});
