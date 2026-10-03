# Projects on Vercel

The projects section reads published projects and details from Laravel. In
production it currently uses the exported snapshot bundled from `src/data`.
The export also writes JSON to `public/project-data` for inspection.
The export includes project images, so Vercel can serve them without calling
the backend. The frontend sends `Accept-Language: en` when using the API.

InfinityFree's free hosting returns a JavaScript challenge to external API
clients. Its API cannot be called directly from a frontend on Vercel. Do not
set `VITE_API_BASE_URL` to the InfinityFree hostname.

## Local

1. Run `npm run dev` in this frontend. The exported projects and images work
   even when Laravel is not running.
2. To read live data while developing, start MySQL and run
   `php artisan serve --host=127.0.0.1 --port=8000` in
   `C:\xampp\htdocs\portfolio\backend`.
3. Create `.env.local` here with
   `VITE_API_BASE_URL=http://127.0.0.1:8000`. For another backend, use
   `VITE_API_BASE_URL=http://your-local-backend:port`.

If the configured API is unavailable, the frontend displays the exported
projects as a fallback.

## Update the projects after editing the dashboard

1. Make the changes in Laravel and ensure the projects are published.
2. Run the local Laravel server as above.
3. Run `npm run export:projects` in this frontend.
4. Commit the changed `src/data` and `public/project-data` files and
   redeploy Vercel.

The export reads both project endpoints, copies all referenced images, and
fails if it receives HTML instead of JSON. The deployed project list is a
snapshot; dashboard changes do not appear until it is exported and redeployed.

## Public Vercel deployment

For automatic updates without exporting, deploy the Laravel backend and its
MySQL database to a public PHP host that allows external API requests.

1. Deploy the Laravel backend and its MySQL database to that PHP host.
   Configure its web root to the Laravel `public` directory.
2. Set the backend `APP_URL` to its public HTTPS origin. Run
   `php artisan storage:link` so uploaded project images are available at
   `/storage/...`. Keep the uploaded files on persistent storage.
3. Set backend `CORS_ALLOWED_ORIGINS=https://your-portfolio.vercel.app`.
   Add any custom frontend domain to the comma-separated list. Refresh
   Laravel's configuration cache after changing environment variables.
4. In Vercel's frontend project, set the **Production** environment variable
   `VITE_API_BASE_URL=https://your-backend.example.com` (origin only,
   without `/api/v1`). Redeploy the frontend after changing it.
5. Confirm that the public API endpoint returns projects and that a
   `cover.url` image opens from a different device. The URL must use HTTPS
   and a public hostname, not localhost or 127.0.0.1.

With a public backend, Vercel serves the React frontend while the dashboard,
database, API, and uploaded images stay on the backend host. The `vercel.json`
rewrite keeps direct links such as `/contact` working.
