export async function onRequest(context: any) {
	const env = context.env;

	if (!env.LASTFM_USERNAME || !env.LASTFM_API_KEY) {
		return new Response(
			JSON.stringify({ error: "Service temporarily unavailable" }),
			{
				status: 503,
				headers: {
					"Content-Type": "application/json",
					"Cache-Control": "no-store",
				},
			}
		);
	}

	const username = (env.LASTFM_USERNAME || "").trim();
	const apiKey = (env.LASTFM_API_KEY || "").trim();

	try {
		const params = new URLSearchParams({
			method: "user.getrecenttracks",
			user: username,
			api_key: apiKey,
			format: "json",
			limit: "6",
		});

		const controller = new AbortController();
		const timeout = setTimeout(() => controller.abort(), 8000);

		const res = await fetch(
			`https://ws.audioscrobbler.com/2.0/?${params.toString()}`,
			{ signal: controller.signal }
		);

		clearTimeout(timeout);

		if (!res.ok) {
			return new Response(
				JSON.stringify({ error: "Unable to fetch data" }),
				{
					status: 502,
					headers: {
						"Content-Type": "application/json",
						"Cache-Control": "no-store",
					},
				}
			);
		}

		const data = await res.json();
		return new Response(JSON.stringify(data), {
			headers: {
				"Content-Type": "application/json",
				"Cache-Control": "public, max-age=30",
			},
		});
	} catch (err) {
		return new Response(
			JSON.stringify({ error: "Service temporarily unavailable" }),
			{
				status: 502,
				headers: {
					"Content-Type": "application/json",
					"Cache-Control": "no-store",
				},
			}
		);
	}
}
