import { useEffect, useState } from "react";
import api from "../api/axios";
import { useCart } from "../context/CartContext";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/books");
        if (res.data.success) {
          setBooks(res.data.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100">
        Loading books...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 px-4 py-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold mb-2">Online Book Marketplace</h1>
        <p className="text-sm text-slate-400 mb-6">
          Browse books from different sellers and add them to your cart.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {books.map((book) => (
            <div
              key={book._id}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col "
            >
              {book.imageUrl && (
                <img
                  src={book.imageUrl}
                  alt={book.title}
                  className="max-h-90 object-contain rounded-xl w-full max-w-xs  "
                />
              )}
              <div className="flex-1">
                <h2 className="text-base font-semibold mb-1">{book.title}</h2>
                <p className="text-xs text-slate-400 mb-1">{book.author}</p>
                <p className="text-sm text-purple-300 font-semibold mb-1">
                  LKR {book.price}
                </p>
                {book.category && (
                  <p className="text-xs text-slate-400 mb-1">
                    Category: {book.category}
                  </p>
                )}
                <p className="text-xs text-slate-400 line-clamp-3">
                  {book.description}
                </p>
                {book.seller && (
                  <p className="text-[11px] text-slate-500 mt-2">
                    Seller: {book.seller.name} ({book.seller.email})
                  </p>
                )}
              </div>
              <button
                onClick={() => addToCart(book)}
                className="mt-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium px-3 py-2"
              >
                Add to cart
              </button>
            </div>
          ))}

          {books.length === 0 && (
            <p className="text-sm text-slate-400">No books available yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
