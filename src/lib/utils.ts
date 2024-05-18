import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import qs from "query-string";
import {
  toast,
  ToastContent,
  ToastOptions,
  Slide,
  Id,
  Bounce,
} from "react-toastify";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// FORMAT DATE TIME
export const formatDateTime = (dateString: Date) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    month: "short", // abbreviated month name (e.g., 'Oct')
    day: "numeric", // numeric day of the month (e.g., '25')
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const dateDayOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    year: "numeric", // numeric year (e.g., '2023')
    month: "2-digit", // abbreviated month name (e.g., 'Oct')
    day: "2-digit", // numeric day of the month (e.g., '25')
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short", // abbreviated month name (e.g., 'Oct')
    year: "numeric", // numeric year (e.g., '2023')
    day: "numeric", // numeric day of the month (e.g., '25')
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const formattedDateTime: string = new Date(dateString).toLocaleString(
    "en-US",
    dateTimeOptions
  );

  const formattedDateDay: string = new Date(dateString).toLocaleString(
    "en-US",
    dateDayOptions
  );

  const formattedDate: string = new Date(dateString).toLocaleString(
    "en-US",
    dateOptions
  );

  const formattedTime: string = new Date(dateString).toLocaleString(
    "en-US",
    timeOptions
  );

  return {
    dateTime: formattedDateTime,
    dateDay: formattedDateDay,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};

export function formatAmount(amount: number): string {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  return formatter.format(amount);
}

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export const removeSpecialCharacters = (value: string) => {
  return value.replace(/[^\w\s]/gi, "");
};

interface UrlQueryParams {
  params: string;
  key: string;
  value: string;
}

export function formUrlQuery({ params, key, value }: UrlQueryParams) {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
}

export function encryptId(id: string) {
  return btoa(id);
}

export function decryptId(id: string) {
  return atob(id);
}

// Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character
const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

export const authFormSchema = (type: string) =>
  z
    .object({
      // sign up
      firstName:
        type === "sign-in" || type === "transfer" || type === "receive"
          ? z.string().trim().optional()
          : z
              .string({ message: "First name is required." })
              .trim()
              .min(3, {
                message: "First name must be at least 3 characters long.",
              })
              .max(256, {
                message:
                  "First name must be between 3 and 256 characters long.",
              }),
      lastName:
        type === "sign-in" || type === "transfer" || type === "receive"
          ? z.string().trim().optional()
          : z
              .string({ message: "Last name is required." })
              .trim()
              .min(3, {
                message: "Last name must be at least 3 characters long.",
              })
              .max(256, {
                message: "Last name must be between 3 and 256 characters long",
              }),
      address1:
        type === "sign-in" || type === "transfer" || type === "receive"
          ? z.string().optional()
          : z.string({ message: "Address is required." }).max(256, {
              message: "Address is cannot be more than 256 characters.",
            }),
      city:
        type === "sign-in" || type === "transfer" || type === "receive"
          ? z.string().optional()
          : z
              .string({ message: "City is required." })
              .max(50, { message: "City cannot be more than 256 characters." }),
      state:
        type === "sign-in" || type === "transfer" || type === "receive"
          ? z.string().optional()
          : z.string({ message: "State is required." }).max(256, {
              message: "State cannot be more than 256 characters",
            }),
      postalCode:
        type === "sign-in" || type === "transfer" || type === "receive"
          ? z.string().optional()
          : z.string({ message: "Postal code is required." }).length(6, {
              message: "Postal code must be 6 characters long.",
            }),
      dateOfBirth:
        type === "sign-in" || type === "transfer" || type === "receive"
          ? z.string().optional()
          : z.string({ message: "Date of birth is required." }).date(),
      confirmPassword:
        type === "sign-in" || type === "transfer" || type === "receive"
          ? z.string().optional()
          : z.string({ message: "Confirm password is required." }),
      // both
      email:
        type === "sign-in" || type === "sign-up"
          ? z
              .string({ message: "Email is required." })
              .email({ message: "Enter a valid email address." })
          : z.string().optional(),
      password:
        type === "sign-in" || type === "sign-up"
          ? z
              .string({ message: "Password is required." })
              .min(8, { message: "Password must be at least 8 characters." })
              .regex(passwordValidation, {
                message:
                  "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
              })
              .trim()
          : z.string().optional(),
      //transfer  form
      receiver:
        type === "transfer"
          ? z.string({ message: "Receiver is required" }).trim()
          : z.string().optional(),
      wallet:
        type === "transfer"
          ? z.string({ message: "Wallet ID is required" }).trim()
          : z.string().optional(),
      valueInUSD:
        type === "transfer" || type === "receive"
          ? z.coerce
              .number()
              .min(10, { message: "Amount cannot be less than 10 USD" })
          : z.number().optional(),
      //receive form
      payerEmail:
        type === "receive"
          ? z
              .string({ message: "Email is required." })
              .email({ message: "Enter a valid email address." })
          : z.string().optional(),
      currency: z.string().trim().optional(),
      amount: z.string().trim().optional(),
      redirect_url: z.string().trim().optional(),
    })
    .refine(
      (values) => {
        if (type === "sign-up") {
          return values.password === values.confirmPassword;
        }
        return true;
      },
      {
        message: "Passwords must match!",
        path: ["confirmPassword"],
      }
    );

export const avatarLetters = (inputString: string | undefined) => {
  const words = inputString?.split(" "); // Split the string into words
  const firstLetters = words?.map((word) => word.charAt(0)); // Extract the first letter of each word
  return firstLetters?.join(""); // Join the first letters back together
};

export const defaultToastOptions: ToastOptions = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  transition: Bounce,
};

type ToastType = "success" | "error" | "info" | "warning" | "default";

/**
 * Display toast
 *
 * @param {ToastType} type
 * @param {ToastContent} content
 * @param {ToastOptions} [options=defaultToastOption]
 * @return {Id}
 */
export const showToast = (
  type: ToastType,
  content: ToastContent,
  options: Partial<ToastOptions> = {}
): Id => {
  const optionsToApply = { ...defaultToastOptions, ...options };

  switch (type) {
    case "success":
      return toast.success(content, optionsToApply);
    case "error":
      return toast.error(content, optionsToApply);
    case "info":
      return toast.info(content, optionsToApply);
    case "warning":
      return toast.warn(content, optionsToApply);
    case "default":
      return toast(content, optionsToApply);
    default:
      return toast(content, optionsToApply);
  }
};
