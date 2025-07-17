import { useCart } from "../context/CartContext";

function CartPage() {
  const { cartItems, removeFromCart } = useCart();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item.id}
              style={{ display: "flex", gap: "10px", alignItems: "center" }}
            >
              <span>{item.name}</span>
              <span>₹{item.price}</span>
              <button onClick={() => addToCart(item)}>+</button>
              <span>{item.quantity}</span>
              <button onClick={() => removeFromCart(item.id)}>-</button>
            </div>
          ))}
          <h3>Total: ₹{totalPrice}</h3>
        </>
      )}
    </div>
  );
}

export default CartPage;
