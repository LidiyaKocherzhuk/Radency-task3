import { faker } from '@faker-js/faker';
import { v4 } from 'uuid';

import { notes } from '../data';

export function seeding(): void {
    try {
        const date = `${new Date().getDay() - 1}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`;

        for (let i = 0; i < 7; i++) {
            notes.push({
                id: v4(),
                name: faker.word.verb(),
                content: faker.lorem.sentence(),
                category: faker.helpers.arrayElement(['Task', 'Random_Thought', 'Idea', 'Quote']),
                created: date,
                dates: date,
                archived: faker.helpers.arrayElement([true, false]),
            });
        }
    } catch (e) {
        console.log(e);
    }
}
