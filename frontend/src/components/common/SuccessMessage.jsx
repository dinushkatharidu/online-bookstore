function SuccessMessage({ message, onClose }){
    if(!message || message===""){
        return null;
    }

    return (
      <div className="success-message">
        <div className="success-icon"></div>
        <p>{message}</p>

        {onClose && (
          <button
            onClick={onClose}
            className="close-btn"
            aria-label="Close message"
          >
            X
          </button>
        )}
      </div>
    );
}

export default SuccessMessage;