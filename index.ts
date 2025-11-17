import { leadsService } from './src/services/leads/index.ts';
import { safeRoute, urlToJsonParams } from './src/utils';

const server = Bun.serve({
    port: 3000,
    routes: {
        '/': safeRoute(() => {
            return Response.json({ message: 'Application is running' }, { status: 200 });
        }),
        '/leads/create': safeRoute((req) => {
            const result = leadsService.create(urlToJsonParams(req.url) as any);
            return Response.json(result, { status: 201 });
        }),
        '/leads/:id': safeRoute((req) => {
            const id = req.params.id;
            const result = leadsService.getById(id);
            if (result) {
                return Response.json(result, { status: 200 });
            } else {
                return Response.json({ message: 'Lead not found' }, { status: 404 });
            }
        }),
        '/leads/:id/update': safeRoute((req) => {
            const id = req.params.id;
            const result = leadsService.updateById(id, urlToJsonParams(req.url));
            if (result) {
                return Response.json(result, { status: 200 });
            } else {
                return Response.json({ message: 'Lead not found' }, { status: 404 });
            }
        }),
        '/leads/:id/delete': safeRoute((req) => {
            const id = req.params.id;
            const result = leadsService.deleteById(id);
            if (result) {
                return Response.json(result, { status: 200 });
            } else {
                return Response.json({ message: 'Lead not found' }, { status: 404 });
            }
        }),
    },
});

console.log(`Server running at ${server.url}`);
