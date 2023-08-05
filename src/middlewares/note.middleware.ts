import { Request, Response, NextFunction } from 'express';

import { noteValidator } from '../validators';
import { ErrorHandler } from '../errors';
import { archiveService, noteService } from '../services';

class NoteMiddleware {
    isNote(service: typeof noteService | typeof archiveService) {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                const note = service.getById(req.params.id);

                if (!note) {
                    next(new ErrorHandler('Note does not exist!', 404));
                }

                req.app.locals = { ...req.app.locals, note };
                next();
            } catch (error) {
                next(error);
            }
        };
    }

    isValidCreateData(req: Request, res:Response, next: NextFunction) {
        try {
            const { error, value } = noteValidator.create.validate(req.body);

            if (error) {
                next(new ErrorHandler(error.message, 400));
            }

            req.app.locals = { ...req.app.locals, noteData: value };
            next();
        } catch (error) {
            next(error);
        }
    }

    isValidUpdateData(req: Request, res:Response, next: NextFunction) {
        try {
            const { error, value } = noteValidator.update.validate(req.body);

            if (error) {
                next(new ErrorHandler(error.message, 400));
            }

            req.app.locals = { ...req.app.locals, noteUpdateData: value };
            next();
        } catch (error) {
            next(error);
        }
    }
}

export const noteMiddleware = new NoteMiddleware();
