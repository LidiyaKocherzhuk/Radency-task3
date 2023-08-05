import express from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';

import { config } from './helpers';
import { noteRoute, archiveRoute } from './routes';
import { seeding } from './seeds/notes.seed';

const app = express();

app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: config.FRONTEND_HOST }));

seeding();

app.use(noteRoute);
app.use(archiveRoute);

// @ts-ignore
app.use('*', (err, req, res, next) => {
    res.status(err.status || 500)
        .json({
            message: err.message,
            data: err.data,
        });
});

const HOST = config.SERVER_HOST;
app.listen(HOST, async () => {
    try {
        console.log(`Server has started on ${HOST} host!`);
    } catch (error) {
        if (error) {
            console.log(error);
        }
    }
});
