# Use an official PHP image with FPM
# FROM php:8.2-fpm

# # Install system dependencies
# RUN apt-get update && apt-get install -y \
#     nginx \
#     vim \
#     zip \
#     unzip \
#     git \
#     curl \
#     libpng-dev \
#     libjpeg-dev \
#     libfreetype6-dev \
#     && docker-php-ext-configure gd --with-freetype --with-jpeg \
#     && docker-php-ext-install gd pdo pdo_mysql

# # Install Composer
# COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# # Copy existing application files
# COPY . /var/www/html

# # Set the working directory
# WORKDIR /var/www/html

# # Change ownership of the Laravel application
# RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# # Configure Nginx
# COPY ./nginx.conf /etc/nginx/nginx.conf

# # Expose the correct port
# EXPOSE 80

# # Start PHP-FPM and Nginx together
# CMD service php8.2-fpm start && nginx -g 'daemon off;'




# Use an official PHP image with FPM
FROM php:8.2-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    nginx \
    vim \
    zip \
    unzip \
    git \
    curl \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_mysql

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set the working directory
WORKDIR /var/www/html

# Copy only necessary files first (improves build caching)
COPY composer.json composer.lock package.json package-lock.json ./

# Install PHP dependencies inside the container
RUN composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader

# Install Node.js dependencies (for frontend, if needed)
RUN apt-get install -y nodejs npm && npm install && npm run build

# Copy the rest of the application
COPY . .

# Set permissions for Laravel storage and cache
RUN chown -R www-data:www-data storage bootstrap/cache

# Configure Nginx
COPY ./nginx.conf /etc/nginx/nginx.conf

# Expose the correct port
EXPOSE 80

# Start PHP-FPM and Nginx together
CMD service php8.2-fpm start && nginx -g 'daemon off;'
