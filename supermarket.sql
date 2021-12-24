-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 16, 2021 at 01:35 PM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 8.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `supermarket`
--

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `date_created` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`id`, `user_id`, `date_created`) VALUES
(1, 3, '2021-02-08'),
(2, 3, '2021-03-17'),
(3, 3, '2021-03-20'),
(4, 123456789, '2021-03-20'),
(50, 3, '2021-04-28'),
(51, 3, '2021-04-29'),
(52, 204204101, '2021-04-29'),
(53, 204204101, '2021-04-29'),
(54, 204204101, '2021-04-29'),
(55, 123456789, '2021-04-29'),
(57, 465678981, '2021-05-02'),
(59, 3, '2021-05-03'),
(60, 3, '2021-05-05'),
(61, 204204101, '2021-05-05'),
(62, 123456789, '2021-05-05'),
(63, 123456789, '2021-05-05'),
(64, 123456789, '2021-05-05'),
(65, 3, '2021-05-05'),
(66, 204204204, '2021-05-06'),
(67, 3, '2021-05-06'),
(68, 207251141, '2021-12-16'),
(69, 212467013, '2021-12-16');

-- --------------------------------------------------------

--
-- Table structure for table `cart_items`
--

CREATE TABLE `cart_items` (
  `cart_id` bigint(20) NOT NULL,
  `product_id` bigint(20) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(13,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `cart_items`
--

INSERT INTO `cart_items` (`cart_id`, `product_id`, `quantity`, `price`) VALUES
(1, 5, 3, '19.50'),
(1, 9, 4, '19.60'),
(1, 11, 2, '40.00'),
(2, 1, 1, '5.94'),
(2, 3, 1, '10.40'),
(3, 3, 1, '12.90'),
(3, 5, 1, '6.50'),
(3, 6, 3, '20.10'),
(3, 7, 3, '20.70'),
(3, 35, 3, '10.50'),
(4, 3, 2, '25.80'),
(4, 5, 6, '32.50'),
(4, 35, 1, '3.50'),
(50, 1, 4, '23.76'),
(50, 9, 5, '24.50'),
(50, 35, 1, '3.50'),
(51, 3, 1, '12.90'),
(51, 4, 1, '10.40'),
(51, 5, 2, '13.00'),
(51, 9, 4, '19.60'),
(51, 46, 2, '13.80'),
(51, 52, 1, '5.90'),
(52, 1, 2, '11.88'),
(52, 2, 1, '5.90'),
(52, 4, 1, '10.40'),
(52, 5, 2, '13.00'),
(52, 9, 4, '19.60'),
(52, 10, 1, '5.90'),
(52, 31, 1, '5.90'),
(52, 32, 1, '5.90'),
(52, 35, 3, '10.50'),
(53, 1, 1, '5.94'),
(53, 3, 2, '25.80'),
(53, 35, 1, '3.50'),
(54, 35, 1, '3.50'),
(55, 5, 2, '13.00'),
(55, 6, 1, '6.70'),
(55, 9, 4, '19.60'),
(57, 1, 1, '5.94'),
(57, 2, 1, '5.90'),
(57, 10, 2, '11.80'),
(57, 32, 1, '5.90'),
(57, 33, 1, '4.90'),
(57, 38, 3, '7.50'),
(57, 41, 1, '11.90'),
(57, 49, 1, '10.90'),
(59, 1, 1, '5.94'),
(59, 2, 1, '5.90'),
(59, 4, 1, '10.40'),
(59, 6, 2, '13.40'),
(59, 11, 1, '20.00'),
(59, 32, 2, '11.80'),
(59, 35, 3, '10.50'),
(59, 49, 1, '10.90'),
(59, 53, 1, '5.90'),
(60, 38, 1, '2.50'),
(61, 31, 2, '11.80'),
(61, 32, 1, '5.90'),
(61, 40, 1, '11.90'),
(62, 40, 1, '11.90'),
(63, 40, 1, '11.90'),
(65, 33, 2, '9.80'),
(65, 49, 1, '10.90'),
(65, 58, 2, '13.80'),
(65, 68, 1, '13.90'),
(65, 82, 1, '119.90'),
(65, 90, 1, '4.16'),
(66, 13, 1, '5.90'),
(66, 69, 1, '29.90'),
(66, 71, 2, '19.80'),
(66, 102, 1, '13.90'),
(66, 104, 2, '27.80'),
(69, 66, 1, '21.90'),
(69, 83, 1, '64.90');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) NOT NULL,
  `name` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(6, 'Bakery'),
(5, 'Beverages'),
(3, 'Dairy'),
(1, 'Fruit'),
(4, 'Meat & Fish'),
(2, 'Vegetables');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) NOT NULL,
  `cart_id` bigint(20) NOT NULL,
  `total_price` decimal(13,2) NOT NULL,
  `city` varchar(120) NOT NULL,
  `street` varchar(120) NOT NULL,
  `order_date` date NOT NULL,
  `delivery_date` date NOT NULL,
  `payment_method` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `cart_id`, `total_price`, `city`, `street`, `order_date`, `delivery_date`, `payment_method`) VALUES
(1, 1, '79.10', 'Tel Aviv', 'Hashiv\'a 3', '2021-02-08', '2021-02-10', '4231'),
(2, 2, '16.34', 'Kiryat Gat', 'HaMapilim 5', '2021-03-17', '2021-04-01', '4231'),
(5, 4, '61.80', 'Haifa', 'Masada 30 a', '2021-04-25', '2021-04-30', '4231'),
(8, 3, '70.70', 'Tel Aviv', 'Hashiv\'a 3', '2021-04-28', '2021-05-06', '5678'),
(9, 50, '51.76', 'Tel Aviv', 'Hashiv\'a 3', '2021-04-29', '2021-05-06', '5678'),
(10, 52, '88.98', 'Be\'er Sheva', 'Tzorfim 6/2', '2021-04-29', '2021-05-06', '5678'),
(11, 53, '35.24', 'Be\'er Sheva', 'Tzorfim 6/2', '2021-04-29', '2021-05-10', '5678'),
(12, 54, '3.50', 'Be\'er Sheva', 'Tzorfim 6/2', '2021-04-29', '2021-05-10', '5678'),
(13, 51, '75.60', 'Kiryat Gat', 'HaMapilim 5', '2021-05-03', '2021-05-09', '4201'),
(17, 55, '39.30', 'Haifa', 'Masada 30 a', '2021-05-03', '2021-05-12', '4806'),
(18, 59, '94.74', 'Tel Aviv', 'Hashiv\'a 3', '2021-05-05', '2021-05-11', '5601'),
(19, 61, '29.60', 'Be\'er Sheva', 'Tzorfim 6/2', '2021-05-05', '2021-05-11', '4608'),
(20, 62, '11.90', 'Haifa', 'Masada 30 a', '2021-05-05', '2021-05-11', '4506'),
(21, 63, '11.90', 'Haifa', 'Masada 30 a', '2021-05-05', '2021-05-12', '2344'),
(22, 60, '2.50', 'Tel Aviv', 'Hashiv\'a 3', '2021-05-05', '2021-05-12', '2345'),
(23, 66, '97.30', 'Holon', 'somewhere', '2021-05-06', '2021-05-16', '6480'),
(24, 57, '64.74', 'Holon', 'Rimon 2b', '2021-05-06', '2021-05-16', '5607'),
(25, 65, '172.46', 'Tel Aviv', 'Hashiv\'a 3', '2021-05-06', '2021-05-16', '4560');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint(20) NOT NULL,
  `name` varchar(90) NOT NULL,
  `category_id` bigint(20) NOT NULL,
  `unit_price` decimal(13,2) NOT NULL,
  `image_url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `category_id`, `unit_price`, `image_url`) VALUES
(1, 'Milk', 3, '5.94', 'https://www.freshdirect.com/media/images/product/dairy_16/dai_pid_2002513_j.jpg?lastModify=2018-01-09'),
(2, 'Lemon', 1, '5.90', 'https://pngimg.com/uploads/lemon/lemon_PNG25198.png'),
(3, 'Oat Milk', 3, '12.90', 'https://www.freshdirect.com//media/images/product/dairy_16/dai_pid_2004797_j.jpg?lastModify=2020-01-21'),
(4, 'Eggs', 3, '10.40', 'https://www.freshdirect.com/media/images/product/dairy_16/dai_pid_2002541_j.jpg?lastModify=2018-01-12'),
(5, 'Coca Cola', 5, '6.50', 'https://cdn.shopify.com/s/files/1/2141/9909/products/Coke_1.5L.png?v=1591901394'),
(6, 'Sprite', 5, '6.70', 'https://i.pinimg.com/originals/fe/79/a7/fe79a77d57b98386b8c05706eec0bd84.png'),
(7, 'FuzeTea Lemon ', 5, '6.90', 'https://i2.wp.com/piattopizza.com/wp-content/uploads/2020/04/Fuzetea-15L.png?fit=700%2C700&ssl=1'),
(8, 'Coca Cola Zero', 5, '6.70', 'https://paradisealacarte.com/wp-content/uploads/2016/10/0264.png'),
(9, 'Strawberry Yogurt', 3, '4.90', 'https://www.yoplait.com/wp-content/uploads/2019/09/Yoplait-Original-Strawberry-Yogurt-2-lb-460x460.png'),
(10, 'Banana', 1, '5.90', 'https://oboureg.com/igrifowh/2020/07/banana-600x600.png'),
(11, 'Strawberry', 1, '20.00', 'https://semaine.com/wp-content/uploads/2021/02/strawberries.png'),
(12, 'Avocado', 1, '14.90', 'https://chesenbio.com/wp-content/uploads/2019/09/1-MCP-on-avocado.png'),
(13, 'Orange', 1, '5.90', 'https://elwadi.eg/main/wp-content/uploads/2020/02/valencia.png'),
(31, 'Cucumber', 2, '5.90', 'https://e-mall.io/images/detailed/9/B909AD69-5582-417E-A475-57CB81BC4C67.png'),
(32, 'Tomato', 2, '5.90', 'https://freepngimg.com/thumb/tomato/6-tomato-png-image.png'),
(33, 'Onion', 2, '4.90', 'https://pngimg.com/uploads/onion/onion_PNG608.png'),
(35, 'Semolina Demi Baguette', 6, '3.50', 'https://i.pinimg.com/originals/f7/f7/d8/f7f7d87f76d472963756c35c1c47cfbe.png'),
(37, 'Whole Wheat Bread', 6, '13.90', 'https://brownberry.com/sites/all/files/products/brownberry/Brownberry%20Natural%20Wheat%207341001722.png'),
(38, 'Oita Bread', 6, '2.50', 'https://elviart.com/wp-content/uploads/2017/05/pita-premium2-1.png'),
(39, 'White Bread', 6, '5.00', 'https://res.cloudinary.com/hksqkdlah/image/upload/SIL_Arnold_CountryClassic02_dib4vl.png'),
(40, 'Whole Grain Bread', 6, '11.90', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0_9FXHVHMJaLsT8EEJgx9Kb2EJ_jm8pW0Gw&usqp=CAU'),
(41, 'Challah Bread', 6, '11.90', 'https://images-na.ssl-images-amazon.com/images/I/819VB0XNUDL._SL1500_.jpg'),
(42, '5 Pack Poppy Seed Bagels', 6, '10.90', 'https://farmtofamily.co.il/wp-content/uploads/2020/12/Poppy-seed.png'),
(43, '6 Pack Plain Bagels', 6, '10.90', 'https://www.pepperidgefarm.com/wp-content/uploads/2019/10/plain-bagels.png'),
(44, 'Peach', 1, '21.90', 'https://hookahlicious.co.il/wp-content/uploads/2019/10/white-peach.png'),
(45, 'Cranberry Cornbread', 6, '12.90', 'https://www.breadsmith.com/wp-content/uploads/2015/09/Cranberry-Cornbread.png'),
(46, 'Ciabetta', 6, '6.90', 'https://goodhopeonthego.co.za/image/cache/catalog/Products/Groceries/Ciabatta-800x800.png'),
(47, 'Brioche', 6, '18.90', 'https://www.briochegourmet.com/wp-content/uploads/2020/01/200107_02_BG_PACKAGING-AUSTRALIE_ETIQUETTE_Hot-Dog-Rolls_SIMU.png'),
(48, 'Rye Bread', 6, '11.90', 'https://arnoldbread.com/sites/all/files/products/arnold/Arnold%20Rye%20Jewish%20Seeded%207341003205.png'),
(49, 'Deer Dark 6 Pack .5L Water ', 5, '10.90', 'https://i5.walmartimages.com/asr/73f041ef-df7b-41d1-8163-f65836539a54.27d75de0ccbc097275777734098bba38.png'),
(50, 'Dr. Pepper Cherry', 5, '5.60', 'https://cdn.shopify.com/s/files/1/0270/6410/7107/products/cherry_02554c87-d77b-4032-ad75-3c3a5b4ba67f_600x.gif?v=1573701405'),
(52, 'Lettuce', 2, '5.90', 'https://i2.wp.com/kitchen.woolly.io/wp-content/uploads/2020/06/Green_Lettuce-1.png?fit=940%2C940&ssl=1'),
(53, 'Potato', 2, '5.90', 'https://chaldn.com/_mpimage/big-potato-net-weight-50-gm-1-kg?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D72279&q=low&v=1'),
(54, 'Sweet Potato', 2, '6.90', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmKmQYWe3LHesJFTUTKGMstrK9HaunmbYqDQ&usqp=CAU'),
(55, 'Cabbage', 2, '4.90', 'https://sc01.alicdn.com/kf/U19a653dfa23048a0999dce1353b4b3780/196078568/U19a653dfa23048a0999dce1353b4b3780.png_.webp'),
(56, 'Prigat 1.75L Piersici', 5, '5.90', 'https://pravalie.store/pub/media/catalog/product/cache/39e4a8825328a53d6e1f854af38fe862/1/0/101882.png'),
(57, 'Prigat Fresh Orange Juice', 5, '6.90', 'https://aviram.blob.core.windows.net/product-images/7290110110932.png'),
(58, 'Fresca Mango Juice', 5, '6.90', 'https://www.frescajuices.com/wp-content/uploads/2016/03/fresca-3ooml-Mango.png'),
(59, 'Neviot 6 Pack 1.5L Water', 5, '10.90', 'https://i.pinimg.com/originals/18/b3/2c/18b32c1672f332cf6c86afa7c5fd7d35.png'),
(60, 'Scheppes Soda', 5, '3.90', 'https://www.hon.co.il/wp-content/uploads/2017/06/%D7%A9%D7%95%D7%95%D7%A4%D7%A1-%D7%A1%D7%95%D7%93%D7%94.png'),
(61, 'Mountain Dew ', 5, '5.90', 'http://merkeygane.com/1379-large_default/mountain-dew.jpg'),
(62, 'Soy Milk', 3, '12.90', 'https://elisha.be/image/cache/catalog/PICS%202019/Alpro%20Drink%20Original%201L%20edge%20NL_F-600x600.png'),
(63, 'Brie Cheese', 3, '21.90', 'https://presidentcheese-y0leynmj.netdna-ssl.com/wp-content/uploads/2017/06/Brie-400x400.png'),
(64, 'Cottage Cheese', 3, '8.90', 'https://www.liberte.ca/sn_uploads/3082617101-Eng_Front_-_3D.png'),
(65, 'Shredded Gouda ', 3, '29.90', 'https://shoppy.co.il/wp-content/uploads/2020/07/gouda-shredded.png'),
(66, 'Butter Spread ', 3, '21.90', 'https://storcpdkenticomedia.blob.core.windows.net/media/lolretail/media/lolr-media/products/00034500151191-400x400.png?ext=.png'),
(67, 'Goat Feta', 3, '34.90', 'https://shoppy.co.il/wp-content/uploads/2020/04/%D7%A4%D7%98%D7%94.png'),
(68, 'Sour Cream', 3, '13.90', 'https://www.gaylea.com/wp-content/uploads/2017/10/GayLea_Sour-Cream_425mL_Gold_ENG_600x600.png'),
(69, 'Shredded Mozzarella', 3, '29.90', 'https://cdn11.bigcommerce.com/s-tfv7q8thbe/images/stencil/1280x1280/products/3551/5695/Cheese_Mozzarella_PART-SKIM-shredded_8oz_Cabot01__05613.1581188460.png?c=2'),
(70, 'Grapes', 1, '19.90', 'https://www.natureandmore.com/sites/www.natureandmore.com/files/styles/zijbalk/public/product/thumb/druiven_kopieeren.png?itok=zx1NjG11'),
(71, 'Goldspur Apple', 1, '9.90', 'https://res.cloudinary.com/john-mantas/image/upload/v1537291846/codepen/delicious-apples/green-apple-with-slice.png'),
(72, 'Cameo Apple', 1, '14.90', 'https://assets.stickpng.com/thumbs/580b57fbd9996e24bc43c11c.png'),
(73, 'Watermelon', 1, '7.90', 'https://eshop.checkersfs.co.za/content/images/thumbs/0009068_seedless-watermelon-red-each_540.png'),
(74, 'Melon', 1, '8.90', 'https://www.beetlanka.com/wp-content/uploads/2020/06/Melon-600x600.png'),
(75, 'Pineapple', 1, '29.90', 'https://www.adesfoods.co.uk/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/f/r/fresh-pineapple.png'),
(76, 'Chicken Breast ', 4, '31.90', 'https://www.colemannatural.com/wp-content/uploads/2020/08/chicken-breast.png'),
(77, 'Chicken Drumsticks', 4, '32.90', 'https://i5.walmartimages.com/asr/3619e7e5-7db2-4647-bae5-da79a7821fd3.11d27f7f5e95c63f41f5c275941b0a7b.png'),
(78, 'Chicken Inner Fillet', 4, '34.90', 'https://www.uvesa.es/wp-content/uploads/2018/06/Solomillos-de-pollo-con-ajo-y-perejil-800x800.png'),
(79, 'Chicken Thigh', 4, '27.90', 'https://i5.walmartimages.com/asr/732b4654-d38f-4afe-b311-e74216cb0210.a8784c82e8562ab780a5812faf0f58e7.png'),
(80, 'Minced Meat ', 4, '30.00', 'https://sodexo-cy.com/Admin/Public/GetImage.ashx?Width=800&Height=800&Crop=5&DoNotUpscale=True&FillCanvas=True&Image=/Files/Images/Ecom/Products/27268EA.png&AlternativeImage=%2FFiles%2FTemplates%2FDesigns%2FRapido%2FImages%2Fno-image-available.png'),
(81, 'Entrecote ', 4, '119.90', 'https://webshop.johanihallen.se/pub_images/original/J1937_Entrecote-skivad-200gr-hangmorad_SE.png?timestamp=1592308752'),
(82, 'Sirloin ', 4, '119.90', 'https://dtgxwmigmg3gc.cloudfront.net/imagery/assets/derivations/icon/512/512/true/eyJpZCI6IjViNTk1MjQyMTA2NDI0YzQ5NTQ4ZmViNGQxYzBhYzk2LmpwZyIsInN0b3JhZ2UiOiJwdWJsaWNfc3RvcmUifQ?signature=17bd38cae3f5d554128ca3aeed61dff0b3bb5051870505476e1e8756a5e9d938'),
(83, 'Asado', 4, '64.90', 'https://d2r9epyceweg5n.cloudfront.net/stores/001/344/619/products/asado-tira-res1-4e8976ff29db5f02d716167991955204-1024-1024.png'),
(84, 'Salmon Fillet ', 4, '99.90', 'https://storage.googleapis.com/tm-zopsmart-uploads/320/20201118/342317_1-20201118-080122.png'),
(85, 'Tilapia Fillet ', 4, '86.90', 'https://i2.wp.com/s3.ap-southeast-2.amazonaws.com/freshease.com.au/images/offloaded/2185A.png'),
(86, 'Sea bream Fillet ', 4, '119.90', 'https://arcadia-bioline.eu/image/cache/catalog/ImageGen.ashx-350x350.png'),
(87, 'Mullet Fillet ', 4, '97.90', 'https://www.marepiusrl.com/athena/wp-content/uploads/2019/06/filetti-salmone.png'),
(88, 'Celery', 2, '5.90', 'https://i.pinimg.com/originals/34/18/66/3418666ec5959863c0a57e135008b232.png'),
(89, 'Carrot', 2, '8.90', 'https://s3.amazonaws.com/jo.www.bucket/larabar/nodes/images/1406/retina/ingredients_carrots.png?1444892087'),
(90, 'Garlic', 2, '4.16', 'https://www.haridwarmart.com/wp-content/uploads/2019/08/haridwar-mart-garlic.png'),
(91, 'Beet', 2, '3.90', 'https://i.pinimg.com/originals/d0/51/7b/d0517bb64cde4919a7bcdefe2a1ccfce.png'),
(92, 'Pumpkin', 2, '9.90', 'https://www.beetlanka.com/wp-content/uploads/2020/06/Pumpkin.png'),
(93, 'Parsley', 2, '4.90', 'https://www.hamroonlinemart.com/image/cache/catalog/Products/Local%20vegetable%20/celery-vegetable-parsley-coriander-herb-vegetable-78861ed0e65d0889a4448cb5fff696fc-550x550w.png'),
(94, 'Mashrooms', 2, '8.90', 'https://www.natureandmore.com/sites/www.natureandmore.com/files/styles/zijbalk/public/product/thumb/champignon.png?itok=NVaJ-MIm'),
(95, 'Mint', 2, '3.90', 'http://freeticketmall.com/wp-content/uploads/thumbs_dir/fresh-mint-bunch-1-pc-1-nuj7yczac3jambbk8rdld3mmdaog230z8adpujeyi4.png'),
(96, 'Plum', 1, '14.90', 'https://milnefruit.com/images/products/plum.png'),
(97, 'Clementine ', 1, '5.90', 'https://cdn.shopify.com/s/files/1/0407/2426/7169/products/clementine_leaf-removebg_grande.png?v=1612317847'),
(98, 'Papaya', 1, '11.90', 'https://www.natureandmore.com/sites/www.natureandmore.com/files/styles/zijbalk/public/product/thumb/papaya_kopieeren.png?itok=seGPyoiu'),
(99, 'Lychee-Flavored Water', 5, '7.90', 'https://superbaba.co.il/wp-content/uploads/2020/09/1455-1-300x300.png'),
(100, 'Peach-Flavored Water', 5, '7.90', 'https://www.superdavid.co.il/uploads/159/7290013702029_1545565475627.png'),
(101, 'Strawberry-Flavored Water', 5, '7.90', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1mDew0ZxQ9AuCK-23FlopFHw7rN5rXX46OQ&usqp=CAU'),
(102, 'Focaccia Bread ', 6, '13.90', 'https://static.wixstatic.com/media/7a0db3_e42e20222fc54058a7d4d2f70f2087aa~mv2.png/v1/fill/w_600,h_600,al_c,q_85,usm_0.66_1.00_0.01/7a0db3_e42e20222fc54058a7d4d2f70f2087aa~mv2.webp'),
(103, 'Multigrain Bread ', 6, '11.90', 'https://www.qbake.qa/wp-content/uploads/2018/05/qbake_multigrain_new2-2.png'),
(104, 'English Muffins', 6, '13.90', 'https://turano.com/wp-content/uploads/2020/10/ENGLISHMUFFINS_Isolated-1.png'),
(105, 'Gouda ', 3, '29.90', 'https://www.cheesebar.ca/sites/default/files/styles/landscape/public/62338_0_0.png?itok=9ECSiHN1'),
(106, 'Parmesan', 3, '29.90', 'https://cdn.shopify.com/s/files/1/0060/6067/1058/products/112317-emborg-parmesan_150g_263-039_front_3d_grande.png?v=1593123743'),
(107, 'Chedder', 3, '21.90', 'https://www.snowdoniacheese.co.uk/wp-content/uploads/2019/11/Beechwood-2kg.png'),
(108, 'Kabab', 4, '49.90', 'https://5.imimg.com/data5/SELLER/Default/2020/10/AB/XN/MW/8795897/seekh-kabab-masala-500x500.png'),
(109, 'Sausage ', 4, '34.90', 'https://kiolbassa.com/wp-content/uploads/2016/08/All-Natural-BEEF-Sausage-Package-800x800-front.png'),
(110, 'Chicken Wings', 4, '34.90', 'https://goodhopeonthego.co.za/image/cache/catalog/Products/Chicken/FreshChickenWings-800x800.png');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `first_name` varchar(70) NOT NULL,
  `last_name` varchar(70) NOT NULL,
  `email` varchar(120) NOT NULL,
  `password` varchar(70) NOT NULL,
  `user_type` varchar(45) NOT NULL,
  `city` varchar(120) DEFAULT NULL,
  `street` varchar(120) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `user_type`, `city`, `street`) VALUES
(207251141, 'Karam', 'Jaber', 'Karam3199@Gmail.com', 'd0e618fb3047688851189f2aabbb3481', 'ADMIN', 'Haifa', '24');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_users_carts_idx` (`user_id`);

--
-- Indexes for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`cart_id`,`product_id`),
  ADD KEY `FK_cart_items_products_idx` (`product_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name_UNIQUE` (`name`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_orders_carts_idx` (`cart_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_products_categories_idx` (`category_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email_UNIQUE` (`email`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=111;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `FK_users_carts` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `FK_cart_items_carts` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`),
  ADD CONSTRAINT `FK_cart_items_products` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `FK_orders_carts` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `FK_products_categories` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
