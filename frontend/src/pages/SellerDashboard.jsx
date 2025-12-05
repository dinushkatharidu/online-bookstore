import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const emptyBook = {
  title: "",
  author: "",
  price: "",
  category: "",
  condition: "used",
  description: "",
  imageUrl: "",
};

const SellerDashboard = () => {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState(emptyBook);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const loadMyBooks = async () => {
    try {
      const res = await api.get("/books/my");
      if (res.data.success) {
        setBooks(res.data.data);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load books");
    }
  };

  useEffect(() => {
    loadMyBooks();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");
    setLoading(true);

    try {
      if (editingId) {
        // update
        const res = await api.patch(`/books/${editingId}`, {
          ...form,
          price: Number(form.price),
        });
        if (res.data.success) {
          setMsg("Book updated");
          setForm(emptyBook);
          setEditingId(null);
          loadMyBooks();
        }
      } else {
        // create
        const res = await api.post("/books", {
          ...form,
          price: Number(form.price),
        });
        if (res.data.success) {
          setMsg("Book created");
          setForm(emptyBook);
          loadMyBooks();
        }
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Something went wrong. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (book) => {
    setEditingId(book._id);
    setForm({
      title: book.title,
      author: book.author,
      price: book.price,
      category: book.category || "",
      condition: book.condition || "used",
      description: book.description || "",
      imageUrl: book.imageUrl || "",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this book?")) return;

    try {
      await api.delete(`/books/${id}`);
      setMsg("Book deleted");
      loadMyBooks();
    } catch (err) {
      console.error(err);
      setError("Failed to delete book");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 px-4 py-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold mb-2">Seller dashboard</h1>
        <p className="text-sm text-slate-400 mb-6">
          Logged in as <span className="font-medium">{user?.name}</span> (
          {user?.role})
        </p>

        <div className="grid md:grid-cols-5 gap-6">
          {/* Form */}
          <div className="md:col-span-2 bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
            <h2 className="text-lg font-semibold mb-2">
              {editingId ? "Edit book" : "Add new book"}
            </h2>
            {msg && (
              <div className="mb-2 text-xs text-emerald-300 bg-emerald-950/40 border border-emerald-800 rounded px-3 py-1.5">
                {msg}
              </div>
            )}
            {error && (
              <div className="mb-2 text-xs text-red-300 bg-red-950/40 border border-red-800 rounded px-3 py-1.5">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-3 text-sm">
              <div>
                <label className="block text-slate-300 mb-1">Title</label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-slate-50 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-1">Author</label>
                <input
                  name="author"
                  value={form.author}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-slate-50 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">
                    Price (LKR)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-slate-50 focus:outline-none focus:ring-2 focus:ring-purple-600"
                    required
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Condition</label>
                  <select
                    name="condition"
                    value={form.condition}
                    onChange={handleChange}
                    className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-slate-50 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  >
                    <option value="used">Used</option>
                    <option value="new">New</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-slate-300 mb-1">Category</label>
                <input
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-slate-50 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="Programming, Novel, OUSL, etc."
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-1">
                  Image URL (optional)
                </label>
                <input
                  name="imageUrl"
                  value={form.imageUrl}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-slate-50 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-1">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-slate-50 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
              <div className="flex gap-3 mt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium px-3 py-2 disabled:opacity-60"
                >
                  {editingId ? "Update book" : "Add book"}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(null);
                      setForm(emptyBook);
                    }}
                    className="rounded-lg border border-slate-600 text-slate-200 text-sm px-3 py-2"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Book list */}
          <div className="md:col-span-3">
            <h2 className="text-lg font-semibold mb-3">
              My books ({books.length})
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {books.map((book) => (
                <div
                  key={book._id}
                  className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex flex-col"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm text-slate-50">
                      {book.title}
                    </h3>
                    <p className="text-xs text-slate-400 mb-1">{book.author}</p>
                    <p className="text-sm text-purple-300 font-semibold mb-2">
                      LKR {book.price}
                    </p>
                    <p className="text-xs text-slate-400 line-clamp-2">
                      {book.description}
                    </p>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => handleEdit(book)}
                      className="flex-1 rounded-lg border border-slate-600 text-xs text-slate-100 px-2 py-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(book._id)}
                      className="flex-1 rounded-lg bg-red-600 hover:bg-red-700 text-xs text-white px-2 py-1"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}

              {books.length === 0 && (
                <p className="text-sm text-slate-400">
                  You have not listed any books yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
