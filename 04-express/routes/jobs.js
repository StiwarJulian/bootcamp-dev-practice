import { Router } from 'express';
import { JobsController } from '../controllers/jobs.js';

// CRUD Endpoints for /jobs
export const jobsRouter = Router();

jobsRouter.get('/', JobsController.getAll);
jobsRouter.get('/:id', JobsController.getById);
jobsRouter.post('/', JobsController.create);
jobsRouter.put('/:id', JobsController.update);
jobsRouter.patch('/:id', JobsController.partialUpdate);
jobsRouter.delete('/:id', JobsController.delete);