import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const PaymentSection = ({ onClose }) => {
  // Define a default state object for the form, replacing the PaymentFormState interface
  const initialFormState = {
    nameOnCard: "",
    cardNumber: "",
    expiry: "", // MM/YY
    cvv: "",
  };

  const { total, clearCart } = useCart();
  const navigate = useNavigate();

  // Remove type annotation from useState
  const [form, setForm] = useState(initialFormState);

  // Remove type annotation from useState
  const [error, setError] = useState(null);
  const [isPaying, setIsPaying] = useState(false);
  // Remove type annotation from useState
  const [successMessage, setSuccessMessage] = useState(null);

  // Remove type annotation for the event parameter
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) setError(null);
  };

  const isFormValid = () => {
    const trimmedName = form.nameOnCard.trim();
    if (trimmedName.length < 3) return false;

    const cleanedCard = form.cardNumber.replace(/\s+/g, "");
    if (!/^\d{16}$/.test(cleanedCard)) return false;

    // MM/YY – months 01–12
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.expiry)) return false;

    if (!/^\d{3,4}$/.test(form.cvv)) return false;

    return true;
  };

  // Remove type annotation for the event parameter
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      setError("Please fill all payment fields correctly.");
      return;
    }

    setIsPaying(true);
    setError(null);

    // Simulate a short payment processing delay
    setTimeout(() => {
      setSuccessMessage("Payment successful! Redirecting to the main page...");
      clearCart();

      // Optional: close payment section state in parent
      if (onClose) onClose();

      // Redirect to homepage (main page)
      navigate("/");
    }, 700);
  };

  const handleCancel = () => {
    if (onClose) onClose();
  };

  const formattedTotal = total.toFixed(2);

  return (
    <div className="mt-6">
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg shadow-purple-900/20 backdrop-blur">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-slate-50">
            Payment details
          </h2>
          <span className="text-xs px-2 py-1 rounded-full bg-slate-800 text-slate-300">
            Secure checkout
          </span>
        </div>

        <p className="text-xs text-slate-400 mb-4">
          Complete your payment to place the order. We don&apos;t store card
          details in this demo.
        </p>

        <div className="mb-4 flex items-center justify-between text-sm">
          <span className="text-slate-300">Amount to pay</span>
          <span className="font-semibold text-purple-300">
            LKR {formattedTotal}
          </span>
        </div>

        {error && (
          <div className="mb-3 rounded-lg border border-red-500/50 bg-red-500/10 px-3 py-2 text-xs text-red-200">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="mb-3 rounded-lg border border-purple-600/60 bg-purple-950/40 px-3 py-2 text-xs text-purple-200">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Name on card */}
          <div>
            <label className="block text-xs text-slate-300 mb-1">
              Name on card
            </label>
            <input
              type="text"
              name="nameOnCard"
              value={form.nameOnCard}
              onChange={handleChange}
              placeholder="Dinushka Tharidu"
              className="w-full rounded-lg bg-slate-900 border border-slate-800 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600"
              required
            />
          </div>

          {/* Card number */}
          <div>
            <label className="block text-xs text-slate-300 mb-1">
              Card number
            </label>
            <input
              type="text"
              name="cardNumber"
              value={form.cardNumber}
              onChange={handleChange}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              className="w-full rounded-lg bg-slate-900 border border-slate-800 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600"
              required
            />
            <p className="mt-1 text-[11px] text-slate-500">
              Demo only – you can enter any 16 digits.
            </p>
          </div>

          {/* Expiry + CVV */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-slate-300 mb-1">
                Expiry (MM/YY)
              </label>
              <input
                type="text"
                name="expiry"
                value={form.expiry}
                onChange={handleChange}
                placeholder="08/28"
                maxLength={5}
                className="w-full rounded-lg bg-slate-900 border border-slate-800 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600"
                required
              />
            </div>
            <div>
              <label className="block text-xs text-slate-300 mb-1">CVV</label>
              <input
                type="password"
                name="cvv"
                value={form.cvv}
                onChange={handleChange}
                placeholder="123"
                maxLength={4}
                className="w-full rounded-lg bg-slate-900 border border-slate-800 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600"
                required
              />
            </div>
          </div>

          {/* Actions */}
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <button
              type="button"
              onClick={handleCancel}
              disabled={isPaying}
              className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-xs font-medium text-slate-200 hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isPaying || !isFormValid()}
              className="inline-flex items-center justify-center rounded-lg bg-purple-600 px-5 py-2 text-xs font-semibold text-white hover:bg-purple-700 disabled:opacity-60 disabled:cursor-not-allowed shadow-md shadow-purple-900/40 transition"
            >
              {isPaying ? "Processing..." : `Pay LKR ${formattedTotal}`}
            </button>
          </div>

          <p className="mt-2 text-[11px] text-slate-500">
            This is a demo payment. No real transaction is performed.
          </p>
        </form>
      </div>
    </div>
  );
};

export default PaymentSection;
