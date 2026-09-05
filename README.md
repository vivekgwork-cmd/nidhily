# nidhily

Portfolio + blog for Dr. ShriNidhi B M, built with [Astro](https://astro.build) and a built-in [Decap CMS](https://decapcms.org) editor so she can write and publish posts herself, with no code or terminal involved.

## Local development

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # outputs to ./dist
npm run preview   # serve the production build locally
```

## Project structure

- `src/content/blog/` — blog posts (Markdown). Each file's frontmatter is `title`, `description`, `pubDate`, `heroImage` (optional), `draft`.
- `src/content/pages/home.md`, `about.md` — editable copy for the Home and About pages.
- `src/pages/` — the actual routes (Home, About, Blog list, Blog post, RSS).
- `public/admin/` — the Decap CMS editor (`/admin`) and its `config.yml`.
- `functions/auth.js`, `functions/callback.js` — Cloudflare Pages Functions implementing the GitHub OAuth login the CMS uses.

## Deploying to Cloudflare Pages

1. In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to Git**, pick `vivekgwork-cmd/nidhily`.
2. Build settings: framework preset **Astro**, build command `npm run build`, output directory `dist`.
3. Deploy once to get the live URL (e.g. `https://nidhily.pages.dev`, or a custom domain if you attach one).
4. Update two places to match that real URL:
   - `astro.config.mjs` → `site`
   - `public/admin/config.yml` → `backend.base_url`

   Commit and push — Cloudflare redeploys automatically on every push to `main`.

## One-time setup: letting her log in to `/admin`

The CMS needs a GitHub OAuth App so it can verify who's logging in and commit on their behalf. This is a one-time setup — do this once, and it works forever.

1. **Create a GitHub OAuth App**: GitHub → Settings → Developer settings → OAuth Apps → New OAuth App.
   - Homepage URL: your Cloudflare Pages URL (e.g. `https://nidhily.pages.dev`)
   - Authorization callback URL: `https://nidhily.pages.dev/callback`
   - Save it, then generate a **Client Secret**. Keep the Client ID and Client Secret handy.
2. **Add them to Cloudflare Pages**: Pages project → Settings → Environment variables → add:
   - `GITHUB_CLIENT_ID`
   - `GITHUB_CLIENT_SECRET`

   Set both for the **Production** environment, then retrigger a deploy (env var changes don't apply retroactively).
3. **Give her push access to the repo**: GitHub repo → Settings → Collaborators → invite her GitHub account. Decap's login checks for write access to the repo, so this step is required — she can't log in without it.
4. Visit `https://nidhily.pages.dev/admin`, sign in with GitHub, and confirm you can create/edit a post.

## How she uses it day-to-day

She visits `/admin` on the live site, logs in with her GitHub account, and gets a simple dashboard: a list of posts, a "New Post" button, and a form (title, description, date, optional cover image, a rich-text body, and a "save as draft" checkbox). Hitting **Publish** commits the change directly to `main`; Cloudflare Pages picks it up and the live site updates in under a couple of minutes. No code, no terminal, no you.
