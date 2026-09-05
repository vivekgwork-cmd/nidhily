// Cloudflare Pages Function: GET /callback
// Step 2 of the Decap CMS GitHub OAuth flow — GitHub redirects here with a
// short-lived code, which we exchange server-side for an access token, then
// hand back to the CMS login popup via postMessage.
export async function onRequestGet(context) {
	const { env, request } = context;
	const clientId = env.GITHUB_CLIENT_ID;
	const clientSecret = env.GITHUB_CLIENT_SECRET;

	if (!clientId || !clientSecret) {
		return new Response(
			'Missing GITHUB_CLIENT_ID / GITHUB_CLIENT_SECRET environment variables.',
			{ status: 500 },
		);
	}

	const url = new URL(request.url);
	const code = url.searchParams.get('code');

	if (!code) {
		return new Response('Missing OAuth code.', { status: 400 });
	}

	const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
	});

	const data = await tokenResponse.json();

	if (data.error) {
		return new Response(`GitHub OAuth error: ${data.error_description || data.error}`, {
			status: 400,
		});
	}

	const payload = JSON.stringify({ token: data.access_token, provider: 'github' });

	// Decap CMS's login popup listens for a "authorizing:github" handshake,
	// then expects a "authorization:github:success:<payload>" message back.
	const html = `<!doctype html><html><body>
<script>
(function() {
	function receiveMessage(e) {
		window.opener.postMessage('authorization:github:success:${payload}', e.origin);
		window.removeEventListener('message', receiveMessage, false);
	}
	window.addEventListener('message', receiveMessage, false);
	window.opener.postMessage('authorizing:github', '*');
})();
</script>
</body></html>`;

	return new Response(html, { headers: { 'Content-Type': 'text/html' } });
}
