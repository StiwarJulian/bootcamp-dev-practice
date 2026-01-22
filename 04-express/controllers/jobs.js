import { DEFAULTS } from "../config.js";
import { JobModel } from "../models/job.js";

export class JobsController {
    static async getAll(req, res) {
        const { text, title, level, limit = DEFAULTS.LIMIT, technology, offset = DEFAULTS.OFFSET } = req.query;

        const paginatedJobs = await JobModel.getAll({ text, title, level, limit, technology, offset });

        return res.json({ data: paginatedJobs, total: filteredJobs.length, limit: limitNumber, offset: offsetNumber });
    }

    static async getById(req, res) {
        const { id } = req.params;

        const job = await JobModel.getById(id);

        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }

        return res.json(job);
    }

    static async create(req, res) {
        const { titulo, empresa, ubicacion, data } = req.body;

        const newJob = await JobModel.create({ titulo, empresa, ubicacion, data });

        return res.status(201).json(newJob);
    }

    static async update(req, res) {
        const { id } = req.params;

        const { titulo, empresa, ubicacion, data } = req.body;

        const updatedJob = await JobModel.update(id, { titulo, empresa, ubicacion, data });
        
        if (!updatedJob) {
            return res.status(404).json({ error: 'Job not found' });
        }

        return res.json(updatedJob);
    }

    static async partialUpdate(req, res) {
        const { id } = req.params;

        const updatedJob = await JobModel.partialUpdate(id, req.body);
        
        if (!updatedJob) {
            return res.status(404).json({ error: 'Job not found' });
        }
        
        return res.json(updatedJob);
    }

    static async delete(req, res) {
        const { id } = req.params;
        await JobModel.delete(id);

        return res.json({ message: `Job with id ${id} has been deleted.` });
    }
}