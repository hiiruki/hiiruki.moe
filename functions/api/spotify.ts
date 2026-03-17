export async function onRequest(context) {
	const env = context.env;
	const kv = env.SPOTIFY_KV;

	if (!env.SPOTIFY_CLIENT_ID || !env.SPOTIFY_CLIENT_SECRET || !env.SPOTIFY_REFRESH_TOKEN) {
		return new Response(JSON.stringify({ error: "Missing Spotify environment variables" }), { 
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}

	let accessTokenRaw = kv ? await kv.get('accessToken') : null;
	const expirationTime = kv ? (Number(await kv.get('expirationTime')) || 0) : 0;
	let accessToken;

	if (!accessTokenRaw || Date.now() > expirationTime) {
		try {
			const res = await fetch('https://accounts.spotify.com/api/token', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					Authorization: `Basic ${btoa(`${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`)}`
				},
				body: new URLSearchParams({
					grant_type: 'refresh_token',
					refresh_token: env.SPOTIFY_REFRESH_TOKEN
				})
			});

			if (!res.ok) {
				return new Response(JSON.stringify({ error: "Failed to fetch Spotify token" }), { status: res.status });
			}

			const response = await res.json();
			accessToken = response.access_token;
			
			if (kv) {
				await kv.put('accessToken', accessToken);
				await kv.put('expirationTime', `${Date.now() + response.expires_in * 1000}`);
			}
		} catch (err) {
			return new Response(JSON.stringify({ error: "Exception while fetching Spotify token", details: err.message }), { status: 500 });
		}
	} else {
		accessToken = accessTokenRaw;
	}

	// Now fetch the "currently playing" or "recently played" data from Spotify using the Access Token
	try {
        // Try getting currently playing first
		let res = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
			headers: { Authorization: `Bearer ${accessToken}` }
		});

		if (res.status === 204 || res.status > 400) {
            // If offline, fetch recently played
            res = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            if (res.ok) {
                const data = await res.json();
                if (data.items && data.items.length > 0) {
                    const track = data.items[0].track;
                    return new Response(JSON.stringify({
                        isPlaying: false,
                        title: track.name,
                        artist: track.artists.map(a => a.name).join(', '),
                        albumImageUrl: track.album.images[0]?.url,
                        songUrl: track.external_urls.spotify
                    }), { headers: { "Content-Type": "application/json" } });
                }
            }
			return new Response(JSON.stringify({ isPlaying: false, title: "Not Playing", artist: "", albumImageUrl: "" }), { headers: { "Content-Type": "application/json" } });
		}

		const data = await res.json();
        
        if (data.item) {
            return new Response(JSON.stringify({
                isPlaying: data.is_playing,
                title: data.item.name,
                artist: data.item.artists.map(a => a.name).join(', '),
                albumImageUrl: data.item.album.images[0]?.url,
                songUrl: data.item.external_urls?.spotify
            }), { headers: { "Content-Type": "application/json" } });
        }
        
        return new Response(JSON.stringify({ isPlaying: false }), { headers: { "Content-Type": "application/json" } });

	} catch (err) {
		return new Response(JSON.stringify({ error: "Exception while fetching Spotify track", details: err.message }), { status: 500 });
	}
}
