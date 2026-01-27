import jobs from '../data/jobs.json' with { type: 'json' }    

export class JobModel {
    static async getAll({ text, title, level, limit , technology, offset }) {
        let filteredJobs = jobs;

        if (text) {
            const searchTerm = text.toLowerCase();
            filteredJobs = filteredJobs.filter(job => 
                job.titulo.toLowerCase().includes(searchTerm) ||
                job.descripcion.toLowerCase().includes(searchTerm)
            );
        }

        if (title) {
            const titleTerm = title.toLowerCase();
            filteredJobs = filteredJobs.filter(job => 
                job.titulo.toLowerCase().includes(titleTerm)
            );
        }

        if (technology) {
            const techTerm = technology.toLowerCase();
            filteredJobs = filteredJobs.filter(job => 
                job.data.technology.some(tech => tech.toLowerCase().includes(techTerm))
            );
        }

        const limitNumber = Number(limit);
        const offsetNumber = Number(offset);

        const paginatedJobs = filteredJobs.slice(offsetNumber, offsetNumber + limitNumber);

        return paginatedJobs;
    }

    static async getById(id) {
        return jobs.find(job => job.id === id);
    }

    static async create({ titulo, empresa, ubicacion, data }) {
        const newJob = {
            id: crypto.randomUUID(),
            titulo,
            empresa,
            ubicacion,
            data
        };

        jobs.push(newJob);

        return newJob;
    }

    static async update(id, { titulo, empresa, ubicacion, data }) {
        const jobIndex = jobs.findIndex(job => job.id === id);

        if (jobIndex === -1) {
            throw new Error('Job not found');
        }

        const updatedJob = {
            id,
            titulo,
            empresa,
            ubicacion,
            data
        };
        
        jobs[jobIndex] = updatedJob;

        return updatedJob;
    }

    static async partialUpdate(id, updateData) {
        const jobIndex = jobs.findIndex(job => job.id === id);

        if (jobIndex === -1) {
            throw new Error('Job not found');
        }

        const existingJob = jobs[jobIndex];

        const updatedJob = {
            ...existingJob,
            ...updateData,
            id
        };
        
        jobs[jobIndex] = updatedJob;

        return updatedJob;
    }

    static async delete(id) {
        const jobIndex = jobs.findIndex(job => job.id === id);

        if (jobIndex === -1) {
            throw new Error('Job not found');
        }

        jobs.splice(jobIndex, 1);

        return;
    }
}
