import { createServer } from 'node:http';
import { randomUUID } from 'node:crypto';
import { json } from 'node:stream/consumers';

process.loadEnvFile();
const PORT = process.env.PORT || 3000;

function sendJsonResponse(res, statusCode, data) {
    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    return res.end(JSON.stringify(data));
}

const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
]

const server = createServer(async (req, res) => {
    console.log(`Received request: ${req.method} ${req.url}`);

    const { method, url } = req;
    const { pathname, queryString } = url.split('?');
    const searchParams = new URLSearchParams(queryString);
    // console.log('searchParams:', searchParams.get('limit'))

    if (method === 'GET') {
        if (pathname === '/') {
            res.setHeader('Content-Type', 'text/plain; charset=utf-8');
            return  res.end('Hello, World from Node.js server! 🔥');
        }

        if (pathname === '/health') {
            return sendJsonResponse(res, 200, { status: 'ok', uptime: process.uptime() });
        }

        if (pathname === '/users') {
            const limit = Number(searchParams.get('limit')) || users.length;
            const offset = Number(searchParams.get('offset')) || 0;

            const paginatedUsers = users.slice(offset, offset + limit);

            return sendJsonResponse(res, 200, paginatedUsers);
        }
    }

    if (method === 'POST') {
        if (pathname === '/users') {
            const body = await json(req);

            const { name } = body;
            if (!name) {
                return sendJsonResponse(res, 400, { error: 'Name is required' });
            }

            const newUser = { id: randomUUID(), name };
            users.push(newUser);

            return sendJsonResponse(res, 201, newUser);
        }
    }


    return sendJsonResponse(res, 404, { error: 'Not Found' });
})

server.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
})
