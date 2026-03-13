# Deployment choice for ranknovainstitute.com

Recommended option based on your notes:
- Use ALB + Nginx on EC2 now.
- Keep a single frontend SPA today.
- Keep path flexibility for future split pages and uploads.

Why this option is suitable:
- Easy to start with one server and one domain.
- Future-ready for multi-page path routing (for example /student, /parent, /faculty).
- Upload support can be controlled in both Nginx and Spring Boot.
- Later you can scale by adding more EC2 instances behind the same ALB.

## 1) Nginx setup on EC2

Copy config:
- Source file: deploy/nginx/ranknovainstitute.conf
- Target path on server: /etc/nginx/conf.d/ranknovainstitute.conf

Frontend build location expected by config:
- /var/www/ranknovainstitute/current

Typical deployment commands (Ubuntu):

```bash
sudo mkdir -p /var/www/ranknovainstitute/current
cd /path/to/frontend
npm ci
npm run build
sudo rsync -av --delete dist/ /var/www/ranknovainstitute/current/

sudo cp deploy/nginx/ranknovainstitute.conf /etc/nginx/conf.d/ranknovainstitute.conf
sudo nginx -t
sudo systemctl restart nginx
```

Quick automation script:
- `deploy/scripts/setup-ubuntu-ec2.sh`

Run:

```bash
sudo bash deploy/scripts/setup-ubuntu-ec2.sh /path/to/vellammal_campus_connect
```

## 2) Backend environment variables on EC2

Set these for Spring Boot service:

- CORS_ALLOWED_ORIGINS=https://ranknovainstitute.com,https://www.ranknovainstitute.com
- WS_ALLOWED_ORIGINS=https://ranknovainstitute.com,https://www.ranknovainstitute.com
- MAX_FILE_SIZE=25MB
- MAX_REQUEST_SIZE=30MB

Systemd unit file added:
- `deploy/systemd/campus-connect.service`

Secrets file location used by service:
- `/etc/default/campus-connect`
- Template in repo: `deploy/systemd/campus-connect.env.example`

Example `/etc/default/campus-connect`:

```bash
DB_URL=jdbc:postgresql://<db-host>:5432/campus_connect
DB_USERNAME=<db-user>
DB_PASSWORD=<db-password>
EMAIL_USERNAME=<smtp-user>
EMAIL_APP_PASSWORD=<smtp-password>
JWT_SECRET=<long-random-secret>
```

## 3) ALB setup

Use the template script:
- deploy/aws/alb-setup-template.ps1

Interactive runner added:
- deploy/aws/run-alb-setup.ps1

Run (Windows PowerShell):

```powershell
.\deploy\aws\run-alb-setup.ps1
```

The script creates:
- Application Load Balancer
- Target group to EC2 port 80 (Nginx)
- Listener 80 -> 443 redirect
- HTTPS listener with ACM certificate
- Route53 alias records for apex and www

## 4) Frontend production env

Create frontend/.env.production from frontend/.env.production.example and set:

- VITE_API_BASE_URL=https://ranknovainstitute.com/api
- VITE_WS_URL=wss://ranknovainstitute.com/ws-connect

This keeps browser traffic on same domain, avoiding cross-domain complexity.

## 5) Future multi-page split

When you split into 3 separate pages/apps, add explicit Nginx locations before SPA fallback:

```nginx
location /student/ { try_files $uri $uri/ /student/index.html; }
location /parent/ { try_files $uri $uri/ /parent/index.html; }
location /faculty/ { try_files $uri $uri/ /faculty/index.html; }
```

Or route each path to different upstream services if you split deployments.

## 6) Upload growth plan

As uploads increase:
- Move binary files to S3 (recommended)
- Keep metadata in Postgres
- Use pre-signed URLs for direct browser upload
- Raise Nginx and Spring limits only when required

## 7) Start backend with systemd

After copying jar to `/opt/campus-connect/backend/app.jar`:

```bash
sudo systemctl daemon-reload
sudo systemctl enable campus-connect
sudo systemctl start campus-connect
sudo systemctl status campus-connect
```
