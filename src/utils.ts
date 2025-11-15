export function urlToJsonParams(url: string): Record<string, string> {
    const params = new URL(url).searchParams;
    const result: Record<string, string> = {};
    params.forEach((value, key) => {
        result[key] = value;
    });
    return result;
}

export function safeRoute<T>(handler: (req: T) => Promise<Response> | Response) {
    return async (req: T) => {
        try {
            return await handler(req);
        } catch (error) {
            if (error && typeof error === 'object' && 'status' in error && 'message' in error) {
                const err = error as { status: number; message: string };
                return Response.json({ message: err.message }, { status: err.status });
            }
            console.error('Unexpected error in route handler:', error);
            return Response.json({ message: 'Internal Server Error' }, { status: 500 });
        }
    };
}

export function createRouteError(message: string, status: number) {
    return {
        message,
        status,
    };
}
