
const BookCard = ({ book, showAddToCart }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
      <h3 className="text-white font-semibold">{book.title}</h3>
      <p className="text-slate-400 text-sm">{book.author}</p>
      <p className="text-purple-400 font-bold mt-2">Rs. {book.price}</p>

      {showAddToCart && (
        <button className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg">
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default BookCard;
