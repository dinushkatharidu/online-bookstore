const ErrorAlert = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="flex w-full items-start gap-3 rounded-md border border-red-300 bg-red-50 p-4">
      {/* ICON */}
      <div className="flex-shrink-0">
        <svg
          className="h-5 w-5 text-red-600"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm-.75-11.75a.75.75 0 011.5 0v5.5a.75.75 0 01-1.5 0v-5.5zm.75 8.25a1 1 0 100 2 1 1 0 000-2z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {/* MESSAGE */}
      <div className="flex-1">
        <p className="text-sm font-medium text-red-800">{message}</p>
      </div>

      {/* CLOSE BUTTON */}
      {onClose && (
        <button
          onClick={onClose}
          className="text-red-600 hover:text-red-800 font-bold text-lg leading-none"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default ErrorAlert;
