import React from "react";

type ButtonProps = {
    text: string;
    onClick: () => void;
    className?: string;
};

const AddButton: React.FC<ButtonProps> = ({ text, onClick, className }) => {
    return (
        <button
            onClick={onClick}
            className={`bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 ${className}`}
        >
            {text}
        </button>
    );
};

export default AddButton;
