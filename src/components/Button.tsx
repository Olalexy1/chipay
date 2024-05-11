import Image from "next/image";
import { Children, ReactNode } from "react";

interface ButtonPops {
    label: string;
    iconURL?: string;
    backgroundColor?: string;
    textColor?: string;
    borderColor?: string;
    fullWidth?: boolean;
    children?: ReactNode;
    className?: string;
    onClick?: () => void;
    isDisabled?: boolean;
}

const Button: React.FC<ButtonPops> = ({
    label,
    iconURL,
    backgroundColor,
    textColor,
    borderColor,
    fullWidth,
    children,
    className,
    onClick,
    isDisabled
}) => {
    return (
        <button
            className={`flex justify-center items-center gap-2 px-7 py-4 border font-montserrat text-lg leading-none
        ${backgroundColor
                    ? `${backgroundColor} ${textColor} ${borderColor}`
                    : "bg-blue-800 text-white border-blue-800"
                } rounded-2xl ${className} ${fullWidth && "w-full"}`}
        >
            {label}

            {children && (
                <span className="inline-block transition-transform">
                    {children}
                </span>
            )}

            {iconURL && (
                <span className="inline-block transition-transform">
                    <Image
                        src={iconURL}
                        alt='arrow right icon'
                        className='ml-2 rounded-full bg-white w-5 h-5'
                    />
                </span>
            )}
        </button>
    );
};

export default Button;
