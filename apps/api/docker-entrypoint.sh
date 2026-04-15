#!/usr/bin/env sh
set -e

if [ ! -f .env ]; then
  cp .env.example .env
fi

echo "Waiting for MySQL at ${DB_HOST:-mysql}:${DB_PORT:-3306}..."
until mysqladmin ping -h"${DB_HOST:-mysql}" -P"${DB_PORT:-3306}" -u"${DB_USERNAME:-root}" -p"${DB_PASSWORD:-}" --silent; do
  sleep 2
done

php artisan config:clear
php artisan migrate --force
php artisan db:seed --class=RbacSeeder --force || true

exec php artisan serve --host=0.0.0.0 --port=8000
