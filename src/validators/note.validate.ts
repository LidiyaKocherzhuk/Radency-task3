import Joi from 'joi'

export enum ENoteCategory {
    "Task"="Task",
    "Random_Thought"="Random Thought",
    "Idea"="Idea",
    "Quote"="Quote",
}

export const noteValidator = {
    create: Joi.object({
        name: Joi.string().required().min(2).max(250)
            .trim(),
        content: Joi.string().required().min(2).max(250)
            .trim(),
        dates: Joi.string().regex(/\d{1,2}\/\d{1,2}\/\d{2,4}/),
        category: Joi.string()
            .required()
            .valid(...Object.values(ENoteCategory))
            .trim(),
    }),

    update: Joi.object({
        name: Joi.string().min(2).max(50).trim(),
        content: Joi.string().min(2).max(250)
            .trim(),
        dates: Joi.string().regex(/\d{1,2}\/\d{1,2}\/\d{2,4}/),
        category: Joi.string()
            .valid(...Object.values(ENoteCategory))
            .trim(),
    }),
};
