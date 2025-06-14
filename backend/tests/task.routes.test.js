require('dotenv').config();
const request = require('supertest');
const app = require('../app'); // ton fichier app.js ou server.js
const db = require('../models');

beforeAll(async () => {
    await db.sequelize.sync({ force: true }); // reset DB pour test
});

afterAll(async () => {
    await db.sequelize.close(); // fermeture propre
});

describe('Task API', () => {

    let categoryId;
    let tagId;

    beforeAll(async () => {
        const category = await db.Category.create({ name: 'Work' });
        categoryId = category.id;
        const tag = await db.Tag.create({ name: 'Urgent' });
        tagId = tag.id;
    });

    it('should create a new task', async () => {
        const res = await request(app)
            .post('/api/tasks')
            .send({
                title: 'Test task',
                description: 'This is a test',
                categoryId: categoryId,
                tags: [tagId],
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.title).toBe('Test task');
    });

    it('should return list of tasks with category and tags', async () => {
        const res = await request(app).get('/api/tasks/init');
        expect(res.statusCode).toBe(200);
        expect(res.body.tasks.length).toBeGreaterThan(0);
        expect(res.body.categories.length).toBeGreaterThan(0);
        expect(res.body.tags.length).toBeGreaterThan(0);
    });
});
it('should return all tasks', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
});

it('should return a single task by ID', async () => {
    const res = await request(app).get('/api/tasks/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
});

it('should update a task', async () => {
    const res = await request(app)
        .put('/api/tasks/1')
        .send({ title: 'Updated task' });
    expect(res.statusCode).toEqual(200);
    expect(res.body.title).toBe('Updated task');
});

it('should delete a task', async () => {
    const res = await request(app).delete('/api/tasks/1');
    expect(res.statusCode).toEqual(204);
});

describe('Category API', () => {

    it('should create a new category', async () => {
        const res = await request(app)
            .post('/api/categories')
            .send({ name: 'New Category' });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.name).toBe('New Category');
    });

    it('should return all categories', async () => {
        const res = await request(app).get('/api/categories');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });
});
describe('Tag API', () => {

    it('should create a new tag', async () => {
        const res = await request(app)
            .post('/api/tags')
            .send({ name: 'New Tag' });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.name).toBe('New Tag');
    });

    it('should return all tags', async () => {
        const res = await request(app).get('/api/tags');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });
});