import express from 'express';
import jobs from './jobs.json' with { type: 'json' }    
import { DEFAULTS } from './config.js';

const PORT = process.env.PORT || DEFAULTS.PORT;
const app = express();


app.use((request, response, next) => {
    const timeString = new Date().toLocaleDateString()
    console.log(`${timeString} ${request.method} ${request.url}`);
    next();
})

app.get('/', (req, res) => {
  return res.send('Hello, World!');
});

app.get('/health', (req, res) => {
  return res.json({ 
        status: 'OK', 
        uptime: process.uptime() 
    });
});

app.delete('/jobs/:id', (req, res) => {
    return res.json({ message: 'All jobs have been deleted (not really, this is a mock endpoint).' });
})

app.post('/jobs', (req, res) => {
    return res.json({ message: 'A new job has been created (not really, this is a mock endpoint).' });
})

app.put('/jobs/:id', (req, res) => {
    const { id } = req.params;
    return res.json({ message: `Job with id ${id} has been updated (not really, this is a mock endpoint).` });
})

app.patch('/jobs/:id', (req, res) => {
    const { id } = req.params;
    return res.json({ message: `Job with id ${id} has been partially updated (not really, this is a mock endpoint).` });
})

app.get('/jobs', (req, res) => {
    const { text, title, level, limit = DEFAULTS.LIMIT_PAGINATION, technology, offset = DEFAULTS.LIMIT_OFFSET } = req.query;

    let filteredJobs = jobs

    if (text) {
        const searchTerm = text.toLowerCase()
        filteredJobs = filteredJobs.filter(job => 
            job.titulo.toLowerCase().includes(searchTerm) ||
            job.descripcion.toLowerCase().includes(searchTerm)
        );
    }

    if (title) {
        const titleTerm = title.toLowerCase()
        filteredJobs = filteredJobs.filter(job => 
            job.titulo.toLowerCase().includes(titleTerm)
        );
    }

    if (technology) {
        const techTerm = technology.toLowerCase()
        filteredJobs = filteredJobs.filter(job => 
            job.tecnologias.some(tech => tech.toLowerCase().includes(techTerm))
        );
    }

    const limitNumber = Number(limit);
    const offsetNumber = Number(offset);

    filteredJobs = filteredJobs.slice(offsetNumber, offsetNumber + limitNumber);

    return res.json(filteredJobs);
})

app.get('/jobs/:id', (req, res) => {
    const { id } = req.params;

    const idNumber = Number(id);

    return res.json({ id: idNumber, title: 'Software Engineer', company: 'Tech Corp' });
})

app.get('/bb*bb', (req, res) => {
    return res.send('Pattern matched!');
});

app.get('/file/*filename', (req, res) => {
    return res.send(`file/*`);
});

app.get(/.*fly/, (req, res) => {
    return res.send('Regex pattern matched!');
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})