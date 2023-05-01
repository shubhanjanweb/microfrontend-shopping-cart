USE `oganidb`;

DROP TABLE IF EXISTS `category`;

CREATE TABLE `category` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'id',
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT 'created at',
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT 'updated at',
  `deleted_at` timestamp(6) NULL DEFAULT NULL COMMENT 'deleted at',
  `category_name` varchar(100) NOT NULL COMMENT 'category name',
  `description` varchar(100) NOT NULL COMMENT 'description',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4;

LOCK TABLES `category` WRITE;

INSERT INTO `category` VALUES (1,'2022-07-21 10:05:53.777648','2022-07-21 10:05:53.777648',NULL,'Vegetable','This is green vagetable'),(2,'2022-07-21 10:05:53.792109','2022-07-21 10:05:53.792109',NULL,'Fruit','This is green fruit'),(3,'2022-07-21 10:05:53.806644','2022-07-21 10:05:53.806644',NULL,'Fresh Meat','Fresh Meat'),(4,'2022-07-21 10:05:53.815961','2022-07-21 10:05:53.815961',NULL,'Vegetables','Vegetables'),(5,'2022-07-21 10:05:53.824285','2022-07-21 10:05:53.824285',NULL,'Fruit & Nut Gifts','Fruit & Nut Gifts'),(6,'2022-07-21 10:05:53.833261','2022-07-21 10:05:53.833261',NULL,'Fresh Berries','Fresh Berries'),(7,'2022-07-21 10:05:53.842273','2022-07-21 10:05:53.842273',NULL,'Ocean Foods','Ocean Foods'),(8,'2022-07-21 10:05:53.852606','2022-07-21 10:05:53.852606',NULL,'Butter & Eggs','Butter & Eggs'),(9,'2022-07-21 10:05:53.862685','2022-07-21 10:05:53.862685',NULL,'Fastfood','Fastfood'),(10,'2022-07-21 10:05:53.872572','2022-07-21 10:05:53.872572',NULL,'Fresh Onion','Fresh Onion'),(11,'2022-07-21 10:05:53.881538','2022-07-21 10:05:53.881538',NULL,'Papayaya & Crisps','Papayaya & Crisps'),(12,'2022-07-21 10:05:53.910363','2022-07-21 10:05:53.910363',NULL,'Oatmeal','Oatmeal'),(13,'2022-07-21 10:05:53.920070','2022-07-21 10:05:53.920070',NULL,'Fresh Bananas','Fresh Bananas'),(14,'2022-07-21 10:05:53.928357','2022-07-21 10:05:53.928357',NULL,'Dry Fruit','Dry Fruit'),(15,'2022-07-21 10:05:53.937245','2022-07-21 10:05:53.937245',NULL,'Juice','Tropicana Juice');

UNLOCK TABLES;

DROP TABLE IF EXISTS `product`;

CREATE TABLE `product` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'id',
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT 'created at',
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT 'updated at',
  `deleted_at` timestamp(6) NULL DEFAULT NULL COMMENT 'deleted at',
  `product_name` varchar(100) NOT NULL COMMENT 'product name',
  `price` float NOT NULL COMMENT 'price',
  `description` varchar(5000) NOT NULL COMMENT 'description',
  `image_url` varchar(500) DEFAULT NULL COMMENT 'image_url',
  `discount_percentage` int DEFAULT NULL COMMENT 'discount percentage',
  `categoryId` bigint DEFAULT NULL COMMENT 'id',
  `stockId` bigint DEFAULT NULL COMMENT 'id',
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_f81d90fc0d025b50a3bfcf7dba` (`stockId`),
  KEY `FK_ff0c0301a95e517153df97f6812` (`categoryId`),
  CONSTRAINT `FK_ff0c0301a95e517153df97f6812` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4;

LOCK TABLES `product` WRITE;

INSERT INTO `product` VALUES (
  1,'2022-07-21 10:06:35.876929','2022-07-21 10:06:35.876929',NULL,'Spinach',30,
  "Spinach (Spinacia oleracea) is a leafy green vegetable that originated in Persia. It belongs to the amaranth family and is related to beets and quinoa. What\'s more, it\'s considered very healthy, as it\'s loaded with nutrients and antioxidants.",
  'product (3).jpg',12,1,NULL),
  (2,'2022-07-21 10:06:35.889831','2022-07-21 10:06:35.889831',NULL,'Capsicum',30,
  'Capsicum fruits of several varieties with commercial value are called by various European-language names in English, such as jalapeï¿½o, peperoncini, and peperoncito; many of these are usually sold pickled. Paprika (in English) refers to a powdered spice made of dried Capsicum of several sorts, though in Hungary, Germany, Sweden, Finland and some other countries it is the name of the fruit (or the vegetable) as well. Both whole and powdered chili are frequent ingredients in dishes prepared throughout the world, and characteristic of several cuisine styles, including Mexican, Sichuan (Szechuan) Chinese, Korean, Cajun and Creole, along with most South Asian and derived (e.g. Jamaican) curries.',
  'product (2).jpg',15,1,NULL),
  (3,'2022-07-21 10:06:35.904723','2022-07-21 10:06:35.904723',NULL,'Blueberries',30,
  'Blueberries are considered a superfood, and can help maintain healthy bones, reduce blood pressure, manage diabetes, and ward off heart disease.',
  'product (5).jpg',10,2,NULL),
  (4,'2022-07-21 10:06:35.915003','2022-07-21 10:06:35.915003',NULL,'Oranges',30,
  'An orange is a fruit of various citrus species in the family Rutaceae; it primarily refers to Citrus ï¿½ sinensis, which is also called sweet orange, to distinguish it from the related Citrus ï¿½ aurantium, referred to as bitter orange.',
  'product (9).jpg',10,2,NULL),
  (5,'2022-07-21 10:06:35.925634','2022-07-21 10:06:35.925634',NULL,'Burger',30,
  'A hamburger is a food consisting of fillings ï¿½usually a patty of ground meat, typically beefï¿½placed inside a sliced bun or bread roll.',
  'product (6).jpg',0,9,NULL),
  (6,'2022-07-21 10:06:35.936487','2022-07-21 10:06:35.936487',NULL,'Guava',20,
  'Guava is a common tropical fruit cultivated in many tropical and subtropical regions. The common guava Psidium guajava (lemon guava, apple guava) is a small tree in the myrtle family (Myrtaceae), native to Mexico, Central America, the Caribbean and northern South America.',
  'product (8).jpg',0,2,NULL),
  (7,'2022-07-21 10:06:35.949989','2022-07-21 10:06:35.949989',NULL,'Watermelon',20,
  'Watermelon is a flowering plant species of the Cucurbitaceae family and the name of its edible fruit. A scrambling and trailing vine-like plant, it is a highly cultivated fruit worldwide, with more than 1,000 varieties.',
  'product (10).jpg',0,2,NULL),
  (8,'2022-07-21 10:06:35.960916','2022-07-21 10:06:35.960916',NULL,'Apple',20,
  'An apple is an edible fruit produced by an apple tree. Apple trees are cultivated worldwide and are the most widely grown species in the genus Malus. The tree originated in Central Asia, where its wild ancestor, Malus sieversii, is still found today.',
  'product (11).jpg',0,2,NULL),
  (9,'2022-07-21 10:06:35.989162','2022-07-21 10:06:35.989162',NULL,'Mango',20,
  'A mango is an edible stone fruit produced by the tropical tree Mangifera indica which is believed to have originated from the region between northwestern Myanmar, Bangladesh, and northeastern India.',
  'product (12).jpg',0,2,NULL),
  (10,'2022-07-21 10:06:36.001263','2022-07-21 10:06:36.001263',NULL,'Banana',20,
  'A banana is an elongated, edible fruit botanically a berry produced by several kinds of large herbaceous flowering plants in the genus Musa. In some countries, bananas used for cooking may be called plantains, distinguishing them from dessert bananas.',
  'product (16).jpg',0,2,NULL),
  (11,'2022-07-21 10:06:36.012672','2022-07-21 10:06:36.012672',NULL,'Fresh Vegetables',30,
  "Order Food Online from Gopal Fresh Vegetable Store Samar Paly Lake Town and see it\'s menu for Home Delivery in Kolkata. Fastest delivery",
  'product (1).jpg',0,1,NULL),
  (12,'2022-07-21 10:06:36.024114','2022-07-21 10:06:36.024114',NULL,'Dates',80,
  "Dates are basically tropical fruits that are grown on date palm trees. It\'s scientifically known as Phoenix Dactylifera and is one of the healthiest fruits",
  'product (13).jpg',0,14,NULL),
  (13,'2022-07-21 10:06:36.036903','2022-07-21 10:06:36.036903',NULL,'Cashew Nuts',100,
  'The cashew tree is a tropical evergreen tree that produces the cashew seed and the cashew apple accessory fruit. The tree can grow as tall as 14 metres, but the dwarf cultivars, growing up to 6 m, prove more profitable, with earlier maturity and greater yields.',
  'product (14).jpg',0,14,NULL),
  (14,'2022-07-21 10:06:36.051052','2022-07-21 10:06:36.051052',NULL,'Mutton',200,
  'Lamb, hogget, and mutton, generically sheep meat, are the meat of domestic sheep, Ovis aries. A sheep in its first year is a lamb and its meat is also lamb. The meat from sheep in their second year is hogget. Older sheep meat is mutton',
  'product (15).jpg',5,3,NULL),
  (15,'2022-07-21 10:06:36.060895','2022-07-21 10:06:36.060895',NULL,'KFC Chicken',150,
  'Click to see the latest KFC Menu & Offers today. Order KFC online for Delivery, Take Away and Dine-In or download our KFC App for easy ordering.',
  'product (19).jpg',16,9,NULL),
  (16,'2022-07-21 10:06:36.074392','2022-07-21 10:06:36.074392',NULL,'Orange Juice',50,
  'Juice is a drink made from the extraction or pressing of the natural liquid contained in fruit and vegetables. It can also refer to liquids that are flavored with concentrate or other biological food sources, such as meat or seafood, such as clam juice',
  'product (20).jpg',15,10,NULL);

UNLOCK TABLES;


DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'id',
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT 'created at',
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT 'updated at',
  `deleted_at` timestamp(6) NULL DEFAULT NULL COMMENT 'deleted at',
  `user_name` varchar(100) NOT NULL COMMENT 'user name',
  `email_id` varchar(100) NOT NULL COMMENT 'emailId',
  `password` varchar(255) NOT NULL COMMENT 'password',
  `full_name` varchar(200) NOT NULL COMMENT 'fullName',
  `mobile_number` varchar(100) DEFAULT NULL COMMENT 'mobileNumber',
  `type` varchar(10) DEFAULT NULL COMMENT 'type',
  `photo_url` varchar(100) DEFAULT NULL COMMENT 'photoUrl',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_d34106f8ec1ebaf66f4f8609dd` (`user_name`),
  UNIQUE KEY `IDX_95c07c16136adcfdcb8221c1fc` (`email_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

LOCK TABLES `user` WRITE;

INSERT INTO `user` VALUES (1,'2022-07-21 10:06:55.576821','2022-07-21 10:06:55.576821',NULL,'admin','admin@ogani.com','$2b$10$p4DzAmoQ.0Sr6Ny2IaodtuAliIG7Fq/ntrpw1BI6BhiN8KRCCtsGC','Admin At Ogani','1234567890','admin','https://i.pravatar.cc/300'),(2,'2022-07-21 10:06:55.591225','2022-07-21 10:06:55.591225',NULL,'shubaner','shu@gmail.com','$2b$10$x5Z9qcgvQ.GZ.DM.p09j2ewsPhoMMyYT5xblX3xnY7g2/eL/q.6Ty','Shubhanjan Banerjee','1234567890','','http://localhost:9000/user/signup');

UNLOCK TABLES;
