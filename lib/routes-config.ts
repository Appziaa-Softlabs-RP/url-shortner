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
      { title: "Introduction", href: "/api-refernce/introduction" },
      { title: "Shorten a Link", href: "/api-refernce/shorten-rwps-link", },
      { title: "Create a RWPS Link", href: "/api-refernce/create-rwps-link" },
      { title: "Delete a RWPS Link", href: "/api-refernce/delete-rwps-link" },
      { title: "Update a RWPS Link", href: "/api-refernce/update-rwps-link" },
      { title: "Retrieve a RWPS Link", href: "/api-refernce/retrieve-rwps-link" },
      { title: "Expand a RWPS Link", href: "/api-refernce/expand-rwps-link" },
      { title: "Get Clicks for a RWPS Link", href: "/api-refernce/get-clicks-for-a-rwps-link" },
      { title: "Get a Clicks Summary for a RWPS Link", href: "/api-refernce/get-cliks-summary-for-a-rwps-link" },
      { title: "Get Metrics for a RWPS Link by Country", href: "/api-refernce/get-metrics-for-a-rwps-link-by-country" },
      { title: "Get Metrics for a RWPS Link by City", href: "/api-refernce/get-metrics-for-a-rwps-link-by-city" },
      { title: "Get Metrics for a RWPS Link by Device Type", href: "/api-refernce/get-metrics-for-a-rwps-link-by-device-type" },
      { title: "Get Metrics for a RWPS Link by Referres", href: "/api-refernce/get-metrics-for-a-rwps-link-by-referres" },
      { title: "Get Metrics for a RWPS Link by Referring Name", href: "/api-refernce/get-metrics-for-a-rwps-link-by-referring-name" },
      { title: "Get Metrics for a RWPS Link by Referring Domains", href: "/api-refernce/get-metrics-for-a-rwps-link-by-referring-domains" },
      { title: "Retrieve RWPS Link by Group", href: "/api-refernce/retrieve-rwps-link-by-group" },
      { title: "Bulk Update RWPS Links", href: "/api-refernce/bulk-update-rwps-links" },
      { title: "Retrieve Sorted RWPS Links for Group", href: "/api-refernce/retrieve-sorted-rwps-links-for-group" },
    ],
  },
  {
    title: "BSDs",
    href: "/api-refernce/bsds",
    items: [
      { title: "Get BSDs", href: "/api-refernce/get-bsds" }
    ],
  },
  {
    title: "Campaings",
    href: "/api-refernce/campaings",
    items: [
      { title: "Retrieve Campaings", href: "/api-refernce/retrieve-campaings" },
      { title: "Create Campaings", href: "/api-refernce/create-campaings" },
      { title: "Retrieve a Campaings", href: "/api-refernce/retrieve-campaings" },
      { title: "Update Campaings", href: "/api-refernce/update-campaings" },
      { title: "Retrieve Channlels", href: "/api-refernce/retrieve-channlels" },
      { title: "Create Channels", href: "/api-refernce/create-channels" },
      { title: "Get a Channels", href: "/api-refernce/get-channels" },
      { title: "Update a Channels", href: "/api-refernce/update-channels" },
    ],
  },
  {
    title: "Custom RWPS Link",
    href: "/api-refernce/custom-rwpslinks",
    items: [
      { title: "Add Custom RWPS Link", href: "/api-refernce/get-bsds" },
      { title: "Update RWPS Link", href: "/api-refernce/get-bsds" },
      { title: "Retrieve RWPS Link", href: "/api-refernce/get-bsds" },
      { title: "Get Metrics for a Custom RWPS Link by Destination", href: "/api-refernce/get-bsds" },
      { title: "Get Clicks for a Custom RWPS Link's Entire History", href: "/api-refernce/get-bsds" },
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
      { title: "Rate Limits", href: "/rate-limits", },
      { title: "Troubleshooting and Tips", href: "/troubleshooting-and-tips", },
      { title: "Retrieve Sorted RWPS Links for Group", href: "/retrieve-sorted-rwps-links-for-group" },
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
