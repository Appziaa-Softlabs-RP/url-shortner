# Stage 1: Build
FROM composer:2.3.10 as build
WORKDIR /app
COPY . /app
RUN composer install --no-dev && composer dumpautoload
RUN php artisan optimize:clear

# Stage 2: Final image
FROM php:8.2-apache-bullseye

# Install required packages
RUN apt update && apt install -y zlib1g-dev libpng-dev libwebp-dev libjpeg-dev libfreetype6-dev && rm -rf /var/lib/apt/lists/*
RUN docker-php-ext-install pdo pdo_mysql
RUN docker-php-ext-configure gd --with-jpeg --with-webp --with-freetype
RUN docker-php-ext-install gd

# Set Apache to listen on port 8080
EXPOSE 8080
COPY --from=build /app /var/www/
COPY docker/000-default.conf /etc/apache2/sites-available/000-default.conf

# Update Apache configuration
RUN echo "Listen 8080" >> /etc/apache2/ports.conf && \
    echo "ServerName localhost" >> /etc/apache2/apache2.conf && \
    chown -R www-data:www-data /var/www/ && \
    a2enmod rewrite

# Set the entrypoint
ENTRYPOINT ["docker-php-entrypoint"]
CMD ["apache2-foreground"]
