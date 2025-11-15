const server = Bun.serve({
    port: 3000,
    routes: {
        '/': () => Response.json({ message: 'Application is running' }, { status: 200 }),
    },
});

console.log(`Server running at ${server.url}`);
