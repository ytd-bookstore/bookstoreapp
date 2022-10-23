CREATE TABLE `user` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `surname` varchar(255),
  `email` varchar(320),
  `passwordHash` varchar(255),
  `passwordSalt` varchar(255),
  `credit` int,
  `is_admin` boolean,
  `created_at` timestamp
);

CREATE TABLE `address` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `address_line1` varchar(255),
  `address_line2` varchar(255),
  `city` varchar(255),
  `district` varchar(255),
  `postal_code` varchar(255),
  `mobile` varchar(255),
  `created_at` timestamp
);

CREATE TABLE `book` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255),
  `author` varchar(255),
  `price` float,
  `publisher` varchar(255),
  `description` varchar(255),
  `edition` varchar(255),
  `format` varchar(255),
  `page` int,
  `rating` float,
  `rating_count` int,
  `image` blob,
  `stock` int,
  `genre_id` int
);

CREATE TABLE `book_genre` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `description` varchar(255)
);

CREATE TABLE `order` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `address_id` int,
  `total` int,
  `created_at` timestamp
);

CREATE TABLE `order_books` (
  `order_id` int,
  `book_id` int,
  `quantity` int DEFAULT 1,
  `created_at` timestamp,
  PRIMARY KEY (`order_id`, `book_id`)
);

CREATE TABLE `favorites` (
  `user_id` int,
  `book_id` int,
  PRIMARY KEY (`user_id`, `book_id`)
);

CREATE TABLE `cart` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `total` int,
  `created_at` timestamp
);

CREATE TABLE `cart_books` (
  `order_id` int,
  `book_id` int,
  `quantity` int DEFAULT 1,
  `created_at` timestamp,
  PRIMARY KEY (`order_id`, `book_id`)
);

CREATE TABLE `district` (
  `city_name` varchar(255),
  `name` varchar(255),
  PRIMARY KEY (`city_name`, `name`)
);

ALTER TABLE `address` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

ALTER TABLE `book` ADD FOREIGN KEY (`genre_id`) REFERENCES `book_genre` (`id`);

ALTER TABLE `order` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

ALTER TABLE `order` ADD FOREIGN KEY (`address_id`) REFERENCES `address` (`id`);

ALTER TABLE `order_books` ADD FOREIGN KEY (`order_id`) REFERENCES `order` (`id`);

ALTER TABLE `order_books` ADD FOREIGN KEY (`book_id`) REFERENCES `book` (`id`);

ALTER TABLE `favorites` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

ALTER TABLE `favorites` ADD FOREIGN KEY (`book_id`) REFERENCES `book` (`id`);

ALTER TABLE `cart` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

ALTER TABLE `cart_books` ADD FOREIGN KEY (`order_id`) REFERENCES `cart` (`id`);

ALTER TABLE `cart_books` ADD FOREIGN KEY (`book_id`) REFERENCES `book` (`id`);
