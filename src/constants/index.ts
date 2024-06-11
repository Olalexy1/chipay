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
  LogoutIcon,
  HomeIcon,
  TransactionIcon,
  TransferIcon,
  MoneyIcon,
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
    label: "Account Overview",
  },
  {
    imgURL: "/icons/dollar-circle.svg",
    route: "/dashboard/my-wallets",
    label: "My Wallets",
  },
  {
    imgURL: "/icons/transaction.svg",
    route: "/dashboard/transaction-history",
    label: "Transaction History",
  },
  {
    imgURL: "/icons/money-send.svg",
    route: "/dashboard/transfer-funds",
    label: "Transfer Funds",
  },
  {
    imgURL: "/icons/money-send.svg",
    route: "/dashboard/receive-funds",
    label: "Receive Funds",
  },
  {
    imgURL: "/icons/user-settings1.svg",
    route: "/dashboard/account-settings",
    label: "Account Settings",
  },
];


export const transactionCategoryStyles = {
  "failed": {
    borderColor: "border-red-700",
    backgroundColor: "bg-red-700",
    textColor: "text-red-700",
    chipBackgroundColor: "bg-inherit",
  },
  "pending": {
    borderColor: "border-[#F2F4F7]",
    backgroundColor: "bg-gray-500",
    textColor: "text-[#344054]",
    chipBackgroundColor: "bg-[#F2F4F7]",
  },
  "success": {
    borderColor: "border-[#12B76A]",
    backgroundColor: "bg-[#12B76A]",
    textColor: "text-[#027A48]",
    chipBackgroundColor: "bg-[#ECFDF3]",
  },
  default: {
    borderColor: "border-blue-700",
    backgroundColor: "bg-blue-500",
    textColor: "text-blue-700",
    chipBackgroundColor: "bg-inherit",
  },
};

export const wallets = [
  { id: 1, value: "chi", name: "Chi Wallet" },
  { id: 2, value: "momo", name: "Momo Wallet" },
  { id: 3, value: "airtime", name: "Airtime Wallet" },
];
