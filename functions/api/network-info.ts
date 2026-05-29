import dcColos from "../data/DC-Colos.json";

export async function onRequest(context: any) {
	const request = context.request;
	const cf = request.cf || {};

	// Get client IP address
	const ip = request.headers.get("CF-Connecting-IP") || "127.0.0.1";

	// Get Cloudflare data center airport code (e.g. SIN, CGK)
	const colo = cf.colo || "Local";

	// Look up location info from local JSON
	const dcInfo = (dcColos as any)[colo] || {
		cca2: "ID",
		city: "Jakarta",
		country: "Indonesia",
		lat: -6.2,
		lon: 106.8,
		name: "Jakarta, Indonesia",
		region: "Asia Pacific"
	};

	return new Response(
		JSON.stringify({
			ip,
			colo,
			dcInfo,
		}),
		{
			headers: {
				"Content-Type": "application/json",
				"Cache-Control": "private, no-cache, no-store, must-revalidate",
			},
		}
	);
}
