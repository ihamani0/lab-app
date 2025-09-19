FROM php:8.3-fpm

# Set a non-root user
ARG UID=1000
ARG GID=1000

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpq-dev \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_pgsql mbstring exif pcntl bcmath gd

# Install Node.js and npm
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Create a non-root user to run the application
RUN groupadd -g $GID --non-unique laravel \
 && useradd -u $UID -g laravel -m laravel

# Set working directory
WORKDIR /var/www/html

# Copy all application files (including composer + npm files)
# Set ownership to laravel user upfront
COPY --chown=laravel:laravel . .

# Switch to non-root user BEFORE running installs
USER laravel

# Install Composer dependencies (first pass, no scripts)
RUN composer install --no-scripts --no-autoloader

# Install NPM dependencies
RUN npm install

# Final composer install with autoloader optimization
# (in case post-install scripts or optimizations are needed)
RUN composer install --optimize-autoloader

# Ensure correct permissions for Laravel runtime dirs
RUN mkdir -p storage/logs storage/framework/cache storage/framework/sessions storage/framework/views bootstrap/cache \
 && chmod -R 775 storage bootstrap/cache

# Keep running as non-root user
USER laravel

# Optional: Add healthcheck or CMD as needed
