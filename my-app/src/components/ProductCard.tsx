import { FaPlus } from "react-icons/fa";
import { server } from "../redux/api/userAPI";
import { CartItem } from "../types/types";

type ProductsProps = {
  photo: string;
  name: string;
  price: number;
  productId: string;
  stock: number;
  handler: (cartItem: CartItem) => string | undefined;
};

const ProductCard = ({
  photo,
  name,
  price,
  productId,
  stock,
  handler,
}: ProductsProps) => {
  return (
    <div className="productCard">
      <img src={`${server}/${photo}`} alt={name} />
      <p>{name}</p>
      <span>₹ {price}</span>
      <div>
        <button
          onClick={() =>
            handler({ productId, price, name, photo, stock, quantity: 1 })
          }
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
