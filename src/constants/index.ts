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
          id: 'why',
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
          id: 'blog',
          name: "Blog",
          href: "#",
        },
        {
          id: 'guides',
          name: "Guides",
          href: "#",
        },
        {
          id: 'integrations',
          name: "Integrations",
          href: "#",
        },
        {
          id: 'faqs',
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
          id: 'about',
          name: "About Us",
          href: "#",
        },
        {
          id: 'compliance',
          name: "Compliance",
          href: "#",
        },
        {
          id: 'careers',
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
