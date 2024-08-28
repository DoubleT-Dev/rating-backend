import React from 'react';

interface RadioProps {
  status: boolean;
}

const RadioBoxComponent: React.FC<RadioProps> = ({
  status
}) => {

  return (
    <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the active status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="off"
                  name="is_active"
                  type="radio"
                  value="false"
                  aria-describedby="error"
                  defaultChecked={status === false}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="off"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Off
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="on"
                  name="is_active"
                  type="radio"
                  value="true"
                  aria-describedby="error"
                  defaultChecked={status === true}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="on"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  ON
                </label>
              </div>
            </div>
          </div>
          {/* <div id="customer-error" aria-live="polite" aria-atomic="true">
            {error?.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
                </p>
            ))}
        </div> */}
        </fieldset>
  );
};

export default RadioBoxComponent;