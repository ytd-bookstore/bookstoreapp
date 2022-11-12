CREATE TABLE `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `surname` varchar(255),
  `email` varchar(255),
  `passwordHash` varchar(255),
  `passwordSalt` varchar(255),
  `credit` int,
  `is_admin` boolean,
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `addresses` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `address_line` text,
  `city` varchar(255),
  `district` varchar(255),
  `postal_code` varchar(255),
  `mobile` varchar(255),
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `books` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255),
  `author` varchar(255),
  `price` float,
  `publisher` varchar(255),
  `description` text,
  `edition` varchar(255),
  `format` varchar(255),
  `page` int,
  `rating` float,
  `rating_count` int,
  `image` blob,
  `stock` int,
  `genre_id` varchar(255),
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `orders` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `address_id` int,
  `total` int,
  `status` varchar(255),
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `orderbooks` (
  `order_id` int,
  `book_id` int,
  `quantity` int DEFAULT 1,
  `created_at` timestamp,
  `updated_at` timestamp,
  PRIMARY KEY (`order_id`, `book_id`)
);

CREATE TABLE `favorites` (
  `user_id` int,
  `book_id` int,
  `created_at` timestamp,
  `updated_at` timestamp,
  PRIMARY KEY (`user_id`, `book_id`)
);

CREATE TABLE `carts` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `total` int,
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `cartbooks` (
  `cart_id` int,
  `book_id` int,
  `quantity` int DEFAULT 1,
  `created_at` timestamp,
  `updated_at` timestamp,
  PRIMARY KEY (`cart_id`, `book_id`)
);

CREATE TABLE `districts` (
  `city_name` varchar(255),
  `name` varchar(255),
  `created_at` timestamp,
  `updated_at` timestamp,
  PRIMARY KEY (`city_name`, `name`)
);

CREATE TABLE `bookgenres` (
  `book_id` int,
  `genre_id` int,
  PRIMARY KEY (`book_id`, `genre_id`)
);

CREATE TABLE `genres` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255)
);

ALTER TABLE `addresses` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `orders` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `orders` ADD FOREIGN KEY (`address_id`) REFERENCES `addresses` (`id`);

ALTER TABLE `orderbooks` ADD FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);

ALTER TABLE `orderbooks` ADD FOREIGN KEY (`book_id`) REFERENCES `books` (`id`);

ALTER TABLE `favorites` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `favorites` ADD FOREIGN KEY (`book_id`) REFERENCES `books` (`id`);

ALTER TABLE `carts` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `cartbooks` ADD FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`);

ALTER TABLE `cartbooks` ADD FOREIGN KEY (`book_id`) REFERENCES `books` (`id`);

ALTER TABLE `bookgenres` ADD FOREIGN KEY (`book_id`) REFERENCES `books` (`id`);

ALTER TABLE `bookgenres` ADD FOREIGN KEY (`genre_id`) REFERENCES `genres` (`id`);
