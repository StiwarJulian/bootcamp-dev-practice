import express from 'express';
import { corsMiddleware } from './middleware/cors.js';
import { DEFAULTS } from './config.js';
import { jobsRouter } from './routes/jobs.js';

const PORT = process.env.PORT ?? DEFAULTS.PORT;
const app = express();

app.use(corsMiddleware());
app.use(express.json());
    
app.use('/jobs', jobsRouter);

app.get('/', (req, res) => {
  return res.send('Hello, World!');
});

app.get('/health', (req, res) => {
  return res.json({ 
        status: 'OK', 
        uptime: process.uptime() 
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})

