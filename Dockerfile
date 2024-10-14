# Use Composer 2 with PHP 8.2 for building
FROM composer:2 as build
WORKDIR /app
COPY . /app

# Install dependencies using Composer 2
RUN composer install

# Use PHP 8.2 with Apache
FROM php:8.2-apache

# Install necessary PHP extensions
RUN docker-php-ext-install pdo pdo_mysql

# Expose port 8080
EXPOSE 8080

# Copy application from the build stage
COPY --from=build /app /var/www/

# Configure Apache
COPY docker/000-default.conf /etc/apache2/sites-available/000-default.conf
COPY .env.example /var/www/.env

# Set permissions and enable mod_rewrite
RUN chmod 777 -R /var/www/storage/ && \
    echo "Listen 8080" >> /etc/apache2/ports.conf && \
    chown -R www-data:www-data /var/www/ && \
    a2enmod rewrite
