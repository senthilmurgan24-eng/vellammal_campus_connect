#!/usr/bin/env bash
set -euo pipefail

# Usage:
#   sudo bash setup-ubuntu-ec2.sh /path/to/repo
# Example:
#   sudo bash setup-ubuntu-ec2.sh /home/ubuntu/vellammal_campus_connect

REPO_PATH="${1:-}"
if [ -z "$REPO_PATH" ]; then
  echo "Usage: sudo bash setup-ubuntu-ec2.sh /path/to/repo"
  exit 1
fi

if [ ! -d "$REPO_PATH" ]; then
  echo "Repository path not found: $REPO_PATH"
  exit 1
fi

echo "Installing Nginx and rsync..."
apt-get update -y
apt-get install -y nginx rsync

echo "Creating frontend deployment directory..."
mkdir -p /var/www/ranknovainstitute/current

if command -v npm >/dev/null 2>&1; then
  echo "Building frontend..."
  cd "$REPO_PATH/frontend"
  npm ci
  npm run build
  rsync -av --delete dist/ /var/www/ranknovainstitute/current/
else
  echo "npm not found. Skipping frontend build step."
  echo "Install Node.js and rerun, or copy built frontend to /var/www/ranknovainstitute/current manually."
fi

echo "Applying Nginx site config..."
cp "$REPO_PATH/deploy/nginx/ranknovainstitute.conf" /etc/nginx/conf.d/ranknovainstitute.conf
nginx -t
systemctl enable nginx
systemctl restart nginx

echo "Installing backend systemd service unit..."
cp "$REPO_PATH/deploy/systemd/campus-connect.service" /etc/systemd/system/campus-connect.service

echo "Preparing backend environment file..."
mkdir -p /etc/default
if [ ! -f /etc/default/campus-connect ]; then
  cp "$REPO_PATH/deploy/systemd/campus-connect.env.example" /etc/default/campus-connect
  chmod 600 /etc/default/campus-connect
  echo "Created /etc/default/campus-connect from template. Update DB and EMAIL_APP_PASSWORD before starting backend."
else
  echo "/etc/default/campus-connect already exists. Keeping existing values."
fi

systemctl daemon-reload
systemctl enable campus-connect

echo "Setup complete."
echo "Next steps:"
echo "1) Place backend jar at /opt/campus-connect/backend/app.jar"
echo "2) Edit /etc/default/campus-connect and set DB_URL, DB_USERNAME, DB_PASSWORD, EMAIL_USERNAME, EMAIL_FROM, EMAIL_APP_PASSWORD"
echo "3) Start backend: sudo systemctl start campus-connect"
echo "4) Check status: sudo systemctl status campus-connect"
