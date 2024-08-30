
const ErrorPopup = ({ message } : any) => {
  return (
      <div id="customer-error" aria-live="polite" aria-atomic="true">
        <div className="p-2 my-2 bg-red-100 rounded shadow-lg text-center">
            <p className="my-2 text-md text-red-600" key={message}>
                {message}
            </p>
        </div>
      </div>
  );
};

export default ErrorPopup;