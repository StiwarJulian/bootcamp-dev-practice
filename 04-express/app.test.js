import { test, describe, before, after } from 'node:test';
import assert from 'node:assert';
import app from './app.js';

let server
const PORT = 3001;
const BASE_URL = `http://localhost:${PORT}`;

before(async () => {
    return new Promise((resolve, reject) => {
        server = app.listen(PORT, () => resolve());
        server.on('error', (err) => reject(err));
    })
});

after(async () => {
    return new Promise((resolve, reject) => {
        server.close((err) => {
            if (err) return reject(err);
            resolve();
        });
    });
})

describe('GET /jobs', () => {
    test('should return a list of jobs', async () => {
        const response = await fetch(`${BASE_URL}/jobs`);
        assert.strictEqual(response.status, 200);

        const json = await response.json();
        assert.ok(Array.isArray(json.data), 'La respuesta debe ser un array');
    });

    test('should return jobs for technology filter', async () => {
        const technology = 'javascript';
        const response = await fetch(`${BASE_URL}/jobs?technology=${technology}`);
        assert.strictEqual(response.status, 200);

        const json = await response.json();
        assert.ok(
            json.data.every(job => job.data.technology.includes(technology)), 'Todos los trabajos deben incluir JavaScript');
    });
});

describe('POST /jobs', () => {
    test('should create a new job with valid data', async () => {
        const newJob = {
            titulo: 'Desarrollador Backend',
            empresa: 'Tech Solutions',
            ubicacion: 'Remoto',
            data: {
                technology: ['Node.js', 'Express'],
                modalidad: 'Remoto',
                nivel: 'Junior'
            }
        };

        const response = await fetch(`${BASE_URL}/jobs`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newJob)
        });

        assert.strictEqual(response.status, 201);

        const json = await response.json();
        assert.strictEqual(json.titulo, newJob.titulo);
        assert.strictEqual(json.empresa, newJob.empresa);
    });

    test('should return 400 for invalid job data', async () => {
        const invalidJob = {
            titulo: 'De',
            empresa: 'Tech Solutions',
            ubicacion: 'Remoto',
            data: {
                technology: [],
                modalidad: 'Remoto',
                nivel: 'Junior'
            }
        };

        const response = await fetch(`${BASE_URL}/jobs`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(invalidJob)
        });

        assert.strictEqual(response.status, 400);

        const json = await response.json();
        assert.ok(json.error.includes('Invalid request'));
    });
});