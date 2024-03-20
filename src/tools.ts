interface FetchWithProgress {
    url: string;
    onProgress: (loaded: number, total: number) => void;
}

export async function fetchWithProgress({ url, onProgress }: FetchWithProgress): Promise<Response> {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const contentLength = response.headers.get('content-length');
    let total = 0;
    if (contentLength) {
        total = parseInt(contentLength, 10);
    }

    // Support for streaming response body
    if (response.body) {
        const reader = response.body.getReader();
        const stream = new ReadableStream({
            async start(controller) {
                let loaded = 0;

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) {
                        break;
                    }
                    if (value) {
                        loaded += value.length;
                        onProgress(loaded, total);
                        controller.enqueue(value);
                    }
                }

                controller.close();
                reader.releaseLock();
            }
        });

        // Return a new response object from the stream
        return new Response(stream, {
            headers: response.headers,
        });
    } else {
        // If the response does not support streaming
        onProgress(total, total); // Assuming it's completed
        return response;
    }
}
