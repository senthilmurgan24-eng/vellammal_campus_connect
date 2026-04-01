# vellammal_campus_connect

## Localhost SSO Testing

1. In Google Cloud Console, open your Web OAuth client and add these Authorized JavaScript origins:
	- http://localhost:5173
	- http://localhost:3000
	- http://localhost:4173
2. Set backend environment variable:
	- GOOGLE_CLIENT_ID=<your-google-web-client-id>
3. Create frontend local env file using the example:
	- Copy frontend/.env.local.example to frontend/.env.local
	- Keep VITE_GOOGLE_CLIENT_ID the same as GOOGLE_CLIENT_ID
4. Run backend and frontend locally.

Note: Backend CORS and CSP are already configured to allow localhost ports 5173, 3000, and 4173 for SSO testing.
Note: Local backend script defaults to H2 DB so localhost can run without remote PostgreSQL access. To use Postgres locally, set DB_URL, DB_DRIVER, DB_DIALECT, DB_USERNAME, and DB_PASSWORD before starting backend.
