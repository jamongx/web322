-- 7. Display the total number of orders per month.
-- Sort the result from January to December.

select to_char(order_date, 'month') as "Month", count(*)
from orders
group by to_char(order_date, 'month')
order by to_date(order_date, 'month');