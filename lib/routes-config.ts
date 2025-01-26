// for page navigation & to sort on leftbar

export type EachRoute = {
  title: string;
  href: string;
  noLink?: true; // noLink will create a route segment (section) but cannot be navigated
  items?: EachRoute[];
};

export const API: EachRoute[] = [
  {
    title: "Getting Started",
    href: "/getting-started",
    noLink: true,
    items: [
      { title: "Introduction", href: "/introduction" },
      { title: "Shorten a Link", href: "/shorten-rwps-link", },
    ],
  },
];

export const DOCS: EachRoute[] = [
  {
    title: "Getting Started",
    href: "/getting-started",
    noLink: true,
    items: [
      { title: "Introduction", href: "/introduction" },
      { title: "Authentication", href: "/authentication", },
      // { title: "Rate Limits", href: "/rate-limits", },
    ],
  },
  {
    title: "Tutorials",
    href: "/tutorials",
    noLink: true,
    items: [
      { title: "Create a account", href: "/create-a-account" },
      { title: "Shorten Link", href: "/shorten-link", },
      { title: "Metrics", href: "/metrics" }
    ],
  }
];

type Page = { title: string; href: string };

function getRecurrsiveAllLinks(node: EachRoute) {
  const ans: Page[] = [];
  if (!node.noLink) {
    ans.push({ title: node.title, href: node.href });
  }
  node.items?.forEach((subNode) => {
    const temp = { ...subNode, href: `${node.href}${subNode.href}` };
    ans.push(...getRecurrsiveAllLinks(temp));
  });
  return ans;
}

export const docs_page_routes = DOCS.map((it) => getRecurrsiveAllLinks(it)).flat();
export const api_page_routes = API.map((it) => getRecurrsiveAllLinks(it)).flat();
