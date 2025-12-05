import { useCart } from "../context/CartContext";

const Cart = () => {
  const { items, updateQuantity, removeFromCart, clearCart, total } = useCart();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 px-4 py-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold mb-2">Your cart</h1>
        <p className="text-sm text-slate-400 mb-4">
          Manage quantities, remove items, and review total cost.
        </p>

        {items.length === 0 ? (
          <p className="text-sm text-slate-400">Your cart is empty.</p>
        ) : (
          <>
            <div className="space-y-3 mb-4">
              {items.map((item) => (
                <div
                  key={item.book._id}
                  className="flex items-center justify-between bg-slate-900/80 border border-slate-800 rounded-xl px-3 py-2 text-sm"
                >
                  <div>
                    <p className="font-medium">{item.book.title}</p>
                    <p className="text-xs text-slate-400">{item.book.author}</p>
                    <p className="text-xs text-slate-400 mt-1">
                      LKR {item.book.price} x {item.quantity} ={" "}
                      <span className="text-purple-300 font-semibold">
                        LKR {item.book.price * item.quantity}
                      </span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.book._id, Number(e.target.value))
                      }
                      className="w-16 rounded-lg bg-slate-900 border border-slate-700 px-2 py-1 text-slate-50 text-xs focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                    <button
                      onClick={() => removeFromCart(item.book._id)}
                      className="text-xs text-red-400 hover:text-red-300"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-slate-800 pt-3">
              <p className="text-sm text-slate-300">
                Total:{" "}
                <span className="font-semibold text-purple-300">
                  LKR {total}
                </span>
              </p>
              <div className="flex gap-2">
                <button
                  onClick={clearCart}
                  className="text-xs border border-slate-600 rounded-lg px-3 py-1 text-slate-200"
                >
                  Clear cart
                </button>
                <button className="text-xs bg-purple-600 hover:bg-purple-700 rounded-lg px-3 py-1 text-white font-medium">
                  Checkout (demo)
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
