export async function onRequest(context: any) {
	const env = context.env;

	if (!env.LASTFM_USERNAME || !env.LASTFM_API_KEY) {
		return new Response(
			JSON.stringify({ error: "Missing Last.fm environment variables" }),
			{
				status: 500,
				headers: { "Content-Type": "application/json" },
			}
		);
	}

	const username = (env.LASTFM_USERNAME || "").trim();
	const apiKey = (env.LASTFM_API_KEY || "").trim();

	try {
		const res = await fetch(
			`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=6`
		);

		if (!res.ok) {
			return new Response(
				JSON.stringify({ error: "Failed to fetch Last.fm data" }),
				{ status: res.status, headers: { "Content-Type": "application/json" } }
			);
		}

		const data = await res.json();
		return new Response(JSON.stringify(data), {
			headers: {
				"Content-Type": "application/json",
				"Cache-Control": "public, max-age=15",
			},
		});
	} catch (err) {
		return new Response(
			JSON.stringify({
				error: "Exception while fetching Last.fm track",
				details: err instanceof Error ? err.message : String(err),
			}),
			{ status: 500, headers: { "Content-Type": "application/json" } }
		);
	}
}
