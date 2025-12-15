import { useEffect, useMemo, useState } from "react";
import api from "../api/axios";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Browse = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest"); 

  const { addToCart } = useCart();
  const { isAuthenticated, isBuyer } = useAuth();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/books");
        const list = Array.isArray(res?.data?.data) ? res.data.data : [];
        setBooks(list);
      } catch (err) {
        console.error("Failed to load books:", err);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filteredAndSorted = useMemo(() => {
    const q = query.trim().toLowerCase();

    let list = Array.isArray(books) ? [...books] : [];

    if (q) {
      list = list.filter((b) => {
        const title = (b?.title || "").toLowerCase();
        const author = (b?.author || "").toLowerCase();
        const category = (b?.category || "").toLowerCase();
        const sellerName = (b?.seller?.name || "").toLowerCase();
        return (
          title.includes(q) ||
          author.includes(q) ||
          category.includes(q) ||
          sellerName.includes(q)
        );
      });
    }

    switch (sortBy) {
      case "priceLow":
        list.sort((a, b) => Number(a?.price || 0) - Number(b?.price || 0));
        break;
      case "priceHigh":
        list.sort((a, b) => Number(b?.price || 0) - Number(a?.price || 0));
        break;
      case "title":
        list.sort((a, b) =>
          String(a?.title || "").localeCompare(String(b?.title || ""))
        );
        break;
      default:
        
        list.sort((a, b) => {
          const da = new Date(a?.createdAt || 0).getTime();
          const db = new Date(b?.createdAt || 0).getTime();
          return db - da;
        });
        break;
    }

    return list;
  }, [books, query, sortBy]);

  const showAddToCart = isAuthenticated && isBuyer;

  
  const SkeletonCard = () => (
    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden">
      <div className="aspect-4/5 bg-slate-800/50 animate-pulse" />
      <div className="p-4 space-y-3">
        <div className="h-4 w-3/4 bg-slate-800/60 rounded animate-pulse" />
        <div className="h-3 w-1/2 bg-slate-800/60 rounded animate-pulse" />
        <div className="h-4 w-1/3 bg-slate-800/60 rounded animate-pulse" />
        <div className="h-8 w-full bg-slate-800/60 rounded-xl animate-pulse" />
      </div>
    </div>
  );

  const formatLKR = (value) => {
    const n = Number(value || 0);
    return `LKR ${n.toLocaleString("en-LK")}`;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
    
      <div className="border-b border-slate-800/80 bg-slate-950/60 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
                Browse Books
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                Explore books from different sellers.
                {showAddToCart
                  ? " Add your favorites to cart."
                  : " Login as a buyer to add to cart."}
              </p>
            </div>

          
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative w-full sm:w-80">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by title, author, category, seller..."
                  className="w-full rounded-xl bg-slate-900/70 border border-slate-800 px-4 py-2.5 text-sm
                             placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-purple-600/60"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 text-sm px-2"
                    aria-label="Clear search"
                    type="button"
                  >
                    ✕
                  </button>
                )}
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-xl bg-slate-900/70 border border-slate-800 px-3 py-2.5 text-sm
                           outline-none focus:ring-2 focus:ring-purple-600/60"
              >
                <option value="newest">Sort: Newest</option>
                <option value="priceLow">Sort: Price (Low → High)</option>
                <option value="priceHigh">Sort: Price (High → Low)</option>
                <option value="title">Sort: Title (A → Z)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

  
      <div className="max-w-6xl mx-auto px-4 py-7">
        
        <div className="flex items-center justify-between gap-3 mb-5">
          <div className="text-sm text-slate-400">
            {loading
              ? "Loading..."
              : `${filteredAndSorted.length} book(s) found`}
          </div>

       
          <div className="text-xs px-3 py-1 rounded-full border border-slate-800 bg-slate-900/50 text-slate-300">
            Theme: Purple Dark UI
          </div>
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 9 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filteredAndSorted.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-8 text-center">
            <p className="text-slate-200 font-medium">No books found.</p>
            <p className="text-sm text-slate-400 mt-1">
              Try another keyword (title, author, category, seller name).
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredAndSorted.map((book) => {
              const image = book?.imageUrl;

              return (
                <div
                  key={book?._id}
                  className="group bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden
                             hover:border-purple-700/40 hover:shadow-[0_0_0_1px_rgba(147,51,234,0.18)]
                             transition"
                >
                 
                  <div className="relative aspect-4/5 bg-slate-950/40 border-b border-slate-800 overflow-hidden">
                    {image ? (
                      <img
                        src={image}
                        alt={book?.title || "Book"}
                        className="absolute inset-0 w-full h-full object-contain p-3
                                   transition-transform duration-300 group-hover:scale-[1.02]"
                        loading="lazy"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-3xl">📚</div>
                          <div className="text-xs text-slate-500 mt-2">
                            No image
                          </div>
                        </div>
                      </div>
                    )}

                 
                    <div className="absolute top-3 left-3">
                      <span
                        className="text-xs font-semibold px-3 py-1 rounded-full
                                       bg-slate-950/70 border border-slate-800 text-purple-200"
                      >
                        {formatLKR(book?.price)}
                      </span>
                    </div>
                  </div>

                 
                  <div className="p-4">
                    <h2 className="text-base font-semibold leading-snug line-clamp-2">
                      {book?.title || "Untitled Book"}
                    </h2>

                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <span className="text-xs text-slate-400 line-clamp-1">
                        {book?.author ? `by ${book.author}` : "Author unknown"}
                      </span>
                      {book?.category && (
                        <span className="text-[11px] px-2 py-0.5 rounded-full border border-slate-800 bg-slate-950/30 text-slate-300">
                          {book.category}
                        </span>
                      )}
                    </div>

                    {book?.description && (
                      <p className="mt-3 text-xs text-slate-400 line-clamp-3">
                        {book.description}
                      </p>
                    )}

                    {book?.seller?.name && (
                      <p className="mt-3 text-[11px] text-slate-500">
                        Seller: {book.seller.name}
                      </p>
                    )}

                   
                    {showAddToCart ? (
                      <button
                        onClick={() => addToCart(book)}
                        className="mt-4 w-full rounded-xl bg-purple-600 hover:bg-purple-700
                                   text-white text-sm font-semibold px-3 py-2.5
                                   shadow-[0_10px_30px_rgba(147,51,234,0.15)]
                                   active:scale-[0.99] transition"
                      >
                        Add to cart
                      </button>
                    ) : (
                      <div className="mt-4 w-full rounded-xl border border-slate-800 bg-slate-950/20 px-3 py-2.5 text-xs text-slate-400">
                        {isAuthenticated
                          ? "Seller view: Cart actions disabled"
                          : "Login as a buyer to add to cart"}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
