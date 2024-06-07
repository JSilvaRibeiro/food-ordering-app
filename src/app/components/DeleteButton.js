import { useState } from "react";
import TrashIcon from "./icons/TrashIcon";

const DeleteButton = ({ label, onDelete }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  if (showConfirm) {
    return (
      <div className="fixed bg-black/80 inset-0 flex items-center h-full w-full justify-center z-50">
        <div className="bg-white p-4 rounded-lg">
          <div className="text-center">Are you sure you want to delete?</div>
          <div className="flex gap-2 justify-center mt-4">
            <button
              className="hover:bg-gray-300"
              type="button"
              onClick={() => setShowConfirm(false)}
            >
              Cancel
            </button>
            <button
              className="primary"
              type="button"
              onClick={() => {
                onDelete();
                setShowConfirm(false);
              }}
            >
              Yes,&nbsp;Delete!
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className={
        typeof label === "string"
          ? "hover:bg-gray-300 flex items-center"
          : "border-hidden hover:bg-red-500 hover:text-white p-1"
      }
      type="button"
    >
      {typeof label === "string" ? label : <TrashIcon />}
    </button>
  );
};

export default DeleteButton;
