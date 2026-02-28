FROM php:8.3-cli-alpine AS vendor
WORKDIR /app

RUN apk add --no-cache \
    git \
    unzip \
    icu-dev \
    libzip-dev \
    && docker-php-ext-install intl zip

COPY --from=composer:2.8 /usr/bin/composer /usr/bin/composer

COPY composer.json composer.lock ./
RUN composer install \
    --no-dev \
    --prefer-dist \
    --no-interaction \
    --optimize-autoloader \
    --no-scripts

FROM node:20-alpine AS frontend-assets
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM php:8.3-cli-alpine
WORKDIR /var/www/html

RUN apk add --no-cache \
    bash \
    libzip-dev \
    oniguruma-dev \
    icu-dev \
    mysql-client \
    && docker-php-ext-install pdo pdo_mysql mbstring intl bcmath

COPY --from=vendor /app/vendor ./vendor
COPY . .
COPY --from=frontend-assets /app/public/build ./public/build

RUN cp .env.example .env \
    && php artisan package:discover --ansi \
    && php artisan key:generate --force \
    && mkdir -p storage/framework/cache storage/framework/sessions storage/framework/views bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache

EXPOSE 8000
CMD ["sh", "-c", "php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=8000"]
