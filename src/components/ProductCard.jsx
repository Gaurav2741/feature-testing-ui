import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { cartItems, addToCart, removeFromCart } = useCart();

  const existingItem = cartItems.find((item) => item.id === product.id);

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>₹{product.price}</p>

      {existingItem ? (
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <button onClick={() => removeFromCart(product.id)}>-</button>
          <span>{existingItem.quantity}</span>
          <button onClick={() => addToCart(product)}>+</button>
        </div>
      ) : (
        <button onClick={() => addToCart(product)}>Add to Cart</button>
      )}
    </div>
  );
}

export default ProductCard;
