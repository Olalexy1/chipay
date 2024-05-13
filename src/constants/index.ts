import {
  AirPeace,
  AxaMansard,
  BetWay,
  Bolt,
  CowryWise,
  Dominos,
  FilmHouse,
  GIGM,
  IbomAir,
  IrokoTV,
  KudaBank,
  LagosInternal,
  MTN,
  PiggyVest,
} from "../../public/icons";

export const Services = [
  { id: 1, name: "Digital Payments" },
  { id: 2, name: `Instant Transfers` },
  { id: 3, name: "Mobile Wallets" },
  { id: 4, name: "Prepaid Cards" },
  { id: 5, name: "Virtual Cards" },
  { id: 6, name: "Crypto Cards" },
];

export const MarqueImages = [
  { id: 1, name: "AirPeace", src: AirPeace },
  { id: 2, name: "AxaMansard", src: AxaMansard },
  { id: 3, name: "BetWay", src: BetWay },
  // { id: 4, name: "Bolt", src: Bolt },
  { id: 5, name: "CowryWise", src: CowryWise },
  { id: 6, name: "Dominos", src: Dominos },
  { id: 7, name: "FilmHouse", src: FilmHouse },
  { id: 8, name: "GIGM", src: GIGM },
  { id: 9, name: "IbomAir", src: IbomAir },
  { id: 10, name: "IrokoTV", src: IrokoTV },
  { id: 11, name: "KudaBank", src: KudaBank },
  { id: 12, name: "LagosInternal", src: LagosInternal },
  { id: 13, name: "MTN", src: MTN },
  { id: 14, name: "PiggyVest", src: PiggyVest },
];

interface PageContent {
  title: string;
  href: string;
}

interface Page {
  id: string;
  name: string;
  href: string;
  content?: PageContent;
}

interface Category {
  id: string;
  name: string;
  pages: Page[];
}

interface NavLinks {
  categories: Category[];
}

export const navLinks: NavLinks = {
  categories: [
    {
      id: "whyChiPay",
      name: "Why ChiPay",
      pages: [
        {
          id: "why",
          name: "Why Choose ChiPay",
          href: "#",
          content: {
            title:
              "Title 1 Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur omnis repellat sit",
            href: "#",
          },
        },
        {
          id: "products",
          name: "Products",
          href: "#",
          content: {
            title:
              "Title 2 Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur omnis repellat sit",
            href: "#",
          },
        },
        {
          id: "other",
          name: "Other Services",
          href: "#",
          content: {
            title:
              "Title 3 Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur omnis repellat sit",
            href: "#",
          },
        },
      ],
    },
    {
      id: "resources",
      name: "Resources",
      pages: [
        {
          id: "blog",
          name: "Blog",
          href: "#",
        },
        {
          id: "guides",
          name: "Guides",
          href: "#",
        },
        {
          id: "integrations",
          name: "Integrations",
          href: "#",
        },
        {
          id: "faqs",
          name: "FAQ's",
          href: "#",
        },
      ],
    },
    {
      id: "company",
      name: "Company",
      pages: [
        {
          id: "about",
          name: "About Us",
          href: "#",
        },
        {
          id: "compliance",
          name: "Compliance",
          href: "#",
        },
        {
          id: "careers",
          name: "Careers",
          href: "#",
        },
      ],
    },

    {
      id: "support",
      name: "Support",
      pages: [
        {
          id: "contact",
          name: "Contact Us",
          href: "#",
        },
        {
          id: "help",
          name: "Help Center",
          href: "#",
        },
        {
          id: "terms",
          name: "Terms of Service",
          href: "#",
        },
        {
          id: "privacy",
          name: "Privacy Policy",
          href: "#",
        },
        {
          id: "cookie",
          name: "Cookie Policy",
          href: "#",
        },
      ],
    },
  ],
};

export const sidebarLinks = [
  {
    imgURL: "/icons/home.svg",
    route: "/dashboard",
    label: "Home",
  },
  {
    imgURL: "/icons/dollar-circle.svg",
    route: "/dashboard/my-banks",
    label: "My Banks",
  },
  {
    imgURL: "/icons/transaction.svg",
    route: "/dashboard/transaction-history",
    label: "Transaction History",
  },
  {
    imgURL: "/icons/money-send.svg",
    route: "/dashboard/payment-transfer",
    label: "Transfer Funds",
  },
];

// good_user / good_password - Bank of America
export const TEST_USER_ID = "6627ed3d00267aa6fa3e";

// custom_user -> Chase Bank
// export const TEST_ACCESS_TOKEN =
//   "access-sandbox-da44dac8-7d31-4f66-ab36-2238d63a3017";

// custom_user -> Chase Bank
export const TEST_ACCESS_TOKEN =
  "access-sandbox-229476cf-25bc-46d2-9ed5-fba9df7a5d63";

export const ITEMS = [
  {
    id: "6624c02e00367128945e", // appwrite item Id
    accessToken: "access-sandbox-83fd9200-0165-4ef8-afde-65744b9d1548",
    itemId: "VPMQJKG5vASvpX8B6JK3HmXkZlAyplhW3r9xm",
    userId: "6627ed3d00267aa6fa3e",
    accountId: "X7LMJkE5vnskJBxwPeXaUWDBxAyZXwi9DNEWJ",
  },
  {
    id: "6627f07b00348f242ea9", // appwrite item Id
    accessToken: "access-sandbox-74d49e15-fc3b-4d10-a5e7-be4ddae05b30",
    itemId: "Wv7P6vNXRXiMkoKWPzeZS9Zm5JGWdXulLRNBq",
    userId: "6627ed3d00267aa6fa3e",
    accountId: "x1GQb1lDrDHWX4BwkqQbI4qpQP1lL6tJ3VVo9",
  },
];

export const topCategoryStyles = {
  "Food and Drink": {
    bg: "bg-blue-25",
    circleBg: "bg-blue-100",
    text: {
      main: "text-blue-900",
      count: "text-blue-700",
    },
    progress: {
      bg: "bg-blue-100",
      indicator: "bg-blue-700",
    },
    icon: "/icons/monitor.svg",
  },
  Travel: {
    bg: "bg-success-25",
    circleBg: "bg-success-100",
    text: {
      main: "text-success-900",
      count: "text-success-700",
    },
    progress: {
      bg: "bg-success-100",
      indicator: "bg-success-700",
    },
    icon: "/icons/coins.svg",
  },
  default: {
    bg: "bg-pink-25",
    circleBg: "bg-pink-100",
    text: {
      main: "text-pink-900",
      count: "text-pink-700",
    },
    progress: {
      bg: "bg-pink-100",
      indicator: "bg-pink-700",
    },
    icon: "/icons/shopping-bag.svg",
  },
};

export const transactionCategoryStyles = {
  "Food and Drink": {
    borderColor: "border-pink-600",
    backgroundColor: "bg-pink-500",
    textColor: "text-pink-700",
    chipBackgroundColor: "bg-inherit",
  },
  Payment: {
    borderColor: "border-success-600",
    backgroundColor: "bg-green-600",
    textColor: "text-success-700",
    chipBackgroundColor: "bg-inherit",
  },
  "Bank Fees": {
    borderColor: "border-success-600",
    backgroundColor: "bg-green-600",
    textColor: "text-success-700",
    chipBackgroundColor: "bg-inherit",
  },
  Transfer: {
    borderColor: "border-red-700",
    backgroundColor: "bg-red-700",
    textColor: "text-red-700",
    chipBackgroundColor: "bg-inherit",
  },
  Processing: {
    borderColor: "border-[#F2F4F7]",
    backgroundColor: "bg-gray-500",
    textColor: "text-[#344054]",
    chipBackgroundColor: "bg-[#F2F4F7]",
  },
  Success: {
    borderColor: "border-[#12B76A]",
    backgroundColor: "bg-[#12B76A]",
    textColor: "text-[#027A48]",
    chipBackgroundColor: "bg-[#ECFDF3]",
  },
  Travel: {
    borderColor: "border-[#0047AB]",
    backgroundColor: "bg-blue-500",
    textColor: "text-blue-700",
    chipBackgroundColor: "bg-[#ECFDF3]",
  },
  default: {
    borderColor: "",
    backgroundColor: "bg-blue-500",
    textColor: "text-blue-700",
    chipBackgroundColor: "bg-inherit",
  },
};
