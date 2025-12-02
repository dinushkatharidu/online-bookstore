const SuccessAlert = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="alert-success">
      <div className="flex-shrink-0">
        <svg
          className="h-5 w-5 text-green-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7. 707 9.293a1 1 0 00-1. 414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium">{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-green-400 hover:text-green-500"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default SuccessAlert;
