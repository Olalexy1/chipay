"use client";

import "react-toastify/dist/ReactToastify.css";
import '@/styles/globals.css';
import { Bounce, Slide, ToastContainer } from "react-toastify";

interface ToastProviderProps {
    children: React.ReactNode;
}

export default function ToastProvider({ children }: ToastProviderProps) {
    const contextClass = {
        success: "bg-green-600",
        error: "bg-red-600",
        info: "bg-blue-600",
        warning: "bg-orange-400",
        default: "bg-indigo-600",
        dark: "bg-white-600 font-gray-300",
    };

    return (
        <>
            {children}
            {/* <ToastContainer
                toastClassName={(context) =>
                    contextClass[context?.type || "default"] +
                    " relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"
                }
                bodyClassName={() => "text-sm font-white font-med block p-3"}
                position="top-right"
                autoClose={4000}
                transition={Slide}
            /> */}

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
        </>
    );
}