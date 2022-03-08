truncate table ignite_db.user_details;
truncate table ignite_db.product_details;
truncate table ignite_db.cart_details;
truncate table ignite_db.category_details;


select * from ignite_db.product_details;
select * from ignite_db.category_details;

update ignite_db.product_details set categoryId = 2 where id = 1