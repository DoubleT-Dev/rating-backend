import React from 'react';

interface RadioProps {
  id: string;
  message: any;
}

const ValidateError: React.FC<RadioProps> = ({
    id,
  message
}) => {

    console.log(message);
  return (
    <div id={`${id}-error`} aria-live="polite" aria-atomic="true">
        {
        message &&
        message.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
            {error}
            </p>
        ))}
    </div>
  );
};

export default ValidateError;