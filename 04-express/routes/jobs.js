import { Router } from 'express';
import { JobsController } from '../controllers/jobs.js';
import { validateJob, validatePartialJob } from '../schemas/jobs.js';

// CRUD Endpoints for /jobs
export const jobsRouter = Router();

function validateCreate(req, res, next) {
    const validation = validateJob(req.body);
    if (validation.success) {
        req.body = validation.data;
        return next();
    }

    return res.status(400).json({ error: 'Invalid request', details: validation.error.errors });
};

function validatePartialUpdate(req, res, next) {
    const validation = validatePartialJob(req.body);
    if (!validation.success) {
        return res.status(400).json({ error: 'Invalid request', details: validation.error.errors });
    }
    
    req.body = validation.data;
    return next();
};

jobsRouter.get('/', JobsController.getAll);
jobsRouter.get('/:id', JobsController.getById);
jobsRouter.post('/', validateCreate, JobsController.create);
jobsRouter.patch('/:id', validatePartialUpdate, JobsController.partialUpdate);
jobsRouter.put('/:id', JobsController.update);
jobsRouter.delete('/:id', JobsController.delete);