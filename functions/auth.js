// Cloudflare Pages Function: GET /auth
// Step 1 of the Decap CMS GitHub OAuth flow — redirects the editor's login
// popup to GitHub to ask for authorization.
export async function onRequestGet(context) {
	const { env, request } = context;
	const clientId = env.GITHUB_CLIENT_ID;

	if (!clientId) {
		return new Response('Missing GITHUB_CLIENT_ID environment variable.', { status: 500 });
	}

	const url = new URL(request.url);
	const redirectUri = `${url.origin}/callback`;

	const authorizeUrl = new URL('https://github.com/login/oauth/authorize');
	authorizeUrl.searchParams.set('client_id', clientId);
	authorizeUrl.searchParams.set('redirect_uri', redirectUri);
	authorizeUrl.searchParams.set('scope', 'repo,user');

	return Response.redirect(authorizeUrl.toString(), 302);
}
