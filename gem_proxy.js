export default {
  async fetch(request) {
    const externalUrl = "https://generativelanguage.googleapis.com";
    const url = new URL(request.url);
    const proxiedUrl = externalUrl + url.pathname + url.search;

    try {
      const proxiedRequest = new Request(proxiedUrl, {
        method: request.method,
        headers: request.headers,
        body: request.method !== "GET" && request.method !== "HEAD" ? request.body : null,
      });

      const response = await fetch(proxiedRequest);

      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  },
};
