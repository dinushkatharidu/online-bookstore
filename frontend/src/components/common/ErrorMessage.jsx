function ErrorMessage({ message, onClose }){
    if(!message){
        return null;
    }

    return (
      <div className="error-message">
        <div className="error-icon"></div>
        <p>{message}</p>

        {/* IF onClose exists THEN render the close button */}
        {onClose && (
          <button
            onClick={onClose}
            className="close-btn"
            aria-label="Close error message" 
          >
            X
          </button>
        )}
      </div>
    );

}

export default ErrorMessage;