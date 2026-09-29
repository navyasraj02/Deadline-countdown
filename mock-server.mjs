import { createServer} from 'node:http';

// For testing: one deadline, five minutes after the server starts.
const deadline = Date.now() + 5 * 60 * 1000;

createServer((request, response) => {
    if (request.url === '/api/deadline') {
        const secondsLeft = Math.max(
            0,
            Math.ceil((deadline - Date.now()) / 1000)
        );

        response.writeHead(200, {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store',
        });

        response.end(JSON.stringify({ secondsLeft }));
        return;
    }

    response.writeHead(404);
    response.end('Not found');
}).listen(3000, () => {
    console.log('Mock API running at http://127.0.0.1:3000');
});