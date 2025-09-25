import { CartItemDao } from "./Dao/cartsItems";
import { CartDao } from "./Dao/carts";
import { userDao } from "./Dao/users";
import { productsDao } from "./Dao/products";
import { OrderDao } from "./Dao/order";
import { OrderItemDao } from "./Dao/orderItems";
import { CategoryDao } from "./Dao/categories";

export interface DataStore extends CartDao , CartItemDao , userDao,productsDao,OrderDao,OrderItemDao,CategoryDao{
}
