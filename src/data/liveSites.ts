import type { Project } from "@/types/project";

const defaultLiveSiteScreenshot = "/projects/live-site-placeholder.svg";
const liveSiteTech = ["Web Development", "E-commerce"];
const liveSiteScreenshots: Partial<Record<string, string>> = {
  indusa: "/projects/indusa-cord-palmer-portfolio-screenshot.png",
  bask: "/projects/bask-cord-palmer-portfolio-screenshot.png",
  "botera-ma": "/projects/botera-ma-cord-palmer-portfolio-screenshot.png",
  "botera-new-jersey": "/projects/botera-new-jersey-cord-palmer-portfolio-screenshot.png",
  "bronx-joint": "/projects/bronx-joint-cord-palmer-portfolio-screenshot.png",
  "bud-and-ritas": "/projects/bud-and-ritas-cord-palmer-portfolio-screenshot.png",
  "cann-studio": "/projects/cann-studio-cord-palmer-portfolio-screenshot.png",
  cannavibes: "/projects/cannavibes-cord-palmer-portfolio-screenshot.png",
  "cookies-d-c": "/projects/cookies-d-c-cord-palmer-portfolio-screenshot.png",
  "craft-cannabis": "/projects/craft-cannabis-cord-palmer-portfolio-screenshot.png",
  cuzzies: "/projects/cuzzies-cord-palmer-portfolio-screenshot.png",
  "daily-green": "/projects/daily-green-cord-palmer-portfolio-screenshot.png",
  "dank-s-warehouse": "/projects/dank-s-warehouse-cord-palmer-portfolio-screenshot.png",
  "elevated-roots": "/projects/elevated-roots-cord-palmer-portfolio-screenshot.png",
  "frass-box": "/projects/frass-box-cord-palmer-portfolio-screenshot.png",
  "green-valley": "/projects/green-valley-cord-palmer-portfolio-screenshot.png",
  greenrock: "/projects/greenrock-cord-palmer-portfolio-screenshot.png",
  "harbor-house": "/projects/harbor-house-cord-palmer-portfolio-screenshot.png",
  "high-rollers": "/projects/high-rollers-cord-palmer-portfolio-screenshot.png",
  hikei: "/projects/hikei-cord-palmer-portfolio-screenshot.png",
  "illicit-gardens": "/projects/illicit-gardens-cord-palmer-portfolio-screenshot.png",
  "kush-groove": "/projects/kush-groove-cord-palmer-portfolio-screenshot.png",
  "local-s-cannahouse": "/projects/local-s-cannahouse-cord-palmer-portfolio-screenshot.png",
  monko: "/projects/monko-cord-palmer-portfolio-screenshot.png",
  "niagara-herbalist": "/projects/niagara-herbalist-cord-palmer-portfolio-screenshot.png",
  pleasantrees: "/projects/pleasantrees-cord-palmer-portfolio-screenshot.png",
  redi: "/projects/redi-cord-palmer-portfolio-screenshot.png",
  resilienture: "/projects/resilienture-cord-palmer-portfolio-screenshot.png",
  "road-trip": "/projects/road-trip-cord-palmer-portfolio-screenshot.png",
  "root-22": "/projects/root-22-cord-palmer-portfolio-screenshot.png",
  skunked: "/projects/skunked-cord-palmer-portfolio-screenshot.png",
  "social-j": "/projects/social-j-cord-palmer-portfolio-screenshot.png",
  "star-buds": "/projects/star-buds-cord-palmer-portfolio-screenshot.png",
  "stoops-nyc": "/projects/stoops-nyc-cord-palmer-portfolio-screenshot.png",
  terrabis: "/projects/terrabis-cord-palmer-portfolio-screenshot.png",
  "the-boston-garden": "/projects/the-boston-garden-cord-palmer-portfolio-screenshot.png",
  "the-goods": "/projects/the-goods-cord-palmer-portfolio-screenshot.png",
  "the-public-garden": "/projects/the-public-garden-cord-palmer-portfolio-screenshot.png",
  "underground-legacy": "/projects/underground-legacy-cord-palmer-portfolio-screenshot.png",
  "union-chill": "/projects/union-chill-cord-palmer-portfolio-screenshot.png",
  "urban-leaf": "/projects/urban-leaf-cord-palmer-portfolio-screenshot.png",
  "wonderland-cannabis": "/projects/wonderland-cannabis-cord-palmer-portfolio-screenshot.png",
  yilo: "/projects/yilo-cord-palmer-portfolio-screenshot.png",
};

function hostnameOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/+$/, "");
  }
}

function formatList(items: string[]): string {
  if (items.length <= 1) return items[0] ?? "";
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

/**
 * Opening sentences, rotated per-site.
 *
 * These pages are generated from a small data set, so without rotation all 40+
 * of them ship byte-identical prose and near-identical meta descriptions —
 * which is exactly the thin/duplicate-content pattern that leaves them stuck on
 * "Discovered - currently not indexed" in Search Console. Each site gets a
 * different frame plus its own domain, industry mix, and stack.
 */
const openings = [
  (title: string, host: string) =>
    `${title} is a live production site at ${host}, designed, built, and maintained by Cord Palmer.`,
  (title: string, host: string) =>
    `Cord Palmer built and ships ${title}, the production website running at ${host}.`,
  (title: string, host: string) =>
    `${title} runs in production at ${host} — a client build delivered end to end by Cord Palmer.`,
  (title: string, host: string) =>
    `Serving customers at ${host}, ${title} is an active client site from Cord Palmer's production portfolio.`,
];

const cannabisNote =
  "Work on the build covered the constraints that come with a regulated retail market — age verification, compliant product presentation, and menu structures that stay accurate as inventory moves — without giving up the conversion path a storefront depends on.";

const generalNote =
  "The build focused on page speed, clear information architecture, and a structure the client's own team can keep updated after launch.";

function describeLiveSite(
  title: string,
  url: string,
  industry: string[],
  tech: string[]
): string {
  const host = hostnameOf(url);
  // Stable per-slug rotation: same site always renders the same copy across builds.
  const opening = openings[title.length % openings.length](title, host);
  const isCannabis = industry.includes("cannabis");

  return [
    opening,
    `It sits in the ${formatList(industry)} space and was delivered with ${formatList(tech)}.`,
    isCannabis ? cannabisNote : generalNote,
  ].join(" ");
}

function createLiveSiteProject(
  slug: string,
  title: string,
  url: string,
  industry: string[] = ["cannabis", "ecommerce"],
  tech: string[] = liveSiteTech
): Project {
  return {
    slug,
    title,
    url,
    screenshot: liveSiteScreenshots[slug] ?? defaultLiveSiteScreenshot,
    industry,
    tech,
    year: 2026,
    featured: false,
    showInPersonal: true,
    showInAgency: true,
    iframeAllowed: true,
    content: describeLiveSite(title, url, industry, tech),
  };
}

export const liveSites: Project[] = [
  // ── Non-cannabis first ───────────────────────────────────────────────────
  createLiveSiteProject(
    "indusa",
    "Indusa",
    "https://indusapr.com/",
    ["industrial", "technology", "infrastructure"],
    ["Web Development"]
  ),
  createLiveSiteProject(
    "resilienture",
    "Resilienture",
    "https://resilienture.com/",
    ["consulting", "technology", "infrastructure", "finance"],
    ["Web Development"]
  ),
  createLiveSiteProject(
    "cann-studio",
    "Cann Studio",
    "https://cann-studio.com/",
    ["agency", "portfolio"]
  ),
  createLiveSiteProject(
    "cuzzies",
    "Cuzzies",
    "https://www.shopcuzzies.com/",
    ["cannabis", "ecommerce"]
  ),
  createLiveSiteProject(
    "hikei",
    "Hikei",
    "https://wehikei.com/",
    ["cannabis", "ecommerce"]
  ),
  createLiveSiteProject(
    "redi",
    "Redi",
    "https://tryredi.com/",
    ["cannabis", "ecommerce"]
  ),
  createLiveSiteProject(
    "social-j",
    "Social-j",
    "https://social-j.com/",
    ["cannabis", "ecommerce"]
  ),
  createLiveSiteProject(
    "stoops-nyc",
    "Stoops NYC",
    "https://stoopsnyc.com/",
    ["cannabis", "ecommerce"]
  ),
  // ── Cannabis ─────────────────────────────────────────────────────────────
  createLiveSiteProject("bask", "Bask", "https://cometobask.com/"),
  createLiveSiteProject(
    "botera-new-jersey",
    "Botera New Jersey",
    "https://boteranj.com/"
  ),
  createLiveSiteProject("botera-ma", "Botera MA", "https://boterama.com/"),
  createLiveSiteProject("bronx-joint", "Bronx Joint", "https://thebronxjoint.com/"),
  createLiveSiteProject("bud-and-ritas", "Bud&Ritas", "https://budandritas.com/"),
  createLiveSiteProject("cannavibes", "Cannavibes", "https://cannavibesnj.com/"),
  createLiveSiteProject("cookies-d-c", "Cookies D.C.", "https://dc.cookies.co/"),
  createLiveSiteProject(
    "craft-cannabis",
    "Craft Cannabis",
    "https://www.craftcannabis.com/"
  ),
  createLiveSiteProject("daily-green", "Daily Green", "https://thedailygreennyc.com/"),
  createLiveSiteProject(
    "dank-s-warehouse",
    "Dank's Warehouse",
    "https://dankswarehouse.com/"
  ),
  createLiveSiteProject(
    "elevated-roots",
    "Elevated Roots",
    "https://elevatedrootsma.com/"
  ),
  createLiveSiteProject("frass-box", "Frass Box", "https://frassboxcannabis.com/"),
  createLiveSiteProject(
    "green-valley",
    "Green-Valley",
    "https://greenvalleydispensary.com/"
  ),
  createLiveSiteProject("greenrock", "GreenRock", "https://greenrockcannabis.net/"),
  createLiveSiteProject(
    "harbor-house",
    "Harbor House",
    "https://harborhousecollective.com/"
  ),
  createLiveSiteProject(
    "high-rollers",
    "High Rollers",
    "https://highrollersdispensary.com/"
  ),
  createLiveSiteProject(
    "illicit-gardens",
    "Illicit Gardens",
    "https://illicitgardens.com/"
  ),
  createLiveSiteProject("kush-groove", "Kush Groove", "https://kushgroove.com/"),
  createLiveSiteProject("la-vida-gardens", "La Vida Gardens", "https://lavidagardens.com/"),
  createLiveSiteProject(
    "local-s-cannahouse",
    "Local's CannaHouse",
    "https://localscannahouse.com/"
  ),
  createLiveSiteProject("monko", "Monko", "https://monko.co/"),
  createLiveSiteProject("native-sun", "Native Sun", "http://nativesuncannabis.com/"),
  createLiveSiteProject(
    "niagara-herbalist",
    "Niagara Herbalist",
    "https://theniagaraherbalist.com/"
  ),
  createLiveSiteProject("pleasantrees", "Pleasantrees", "https://enjoypleasantrees.com/"),
  createLiveSiteProject("road-trip", "Road Trip", "https://roadtripdispensary.com/"),
  createLiveSiteProject("root-22", "Root 22", "https://root22dispensary.com/"),
  createLiveSiteProject("skunked", "Skunked", "https://skunkedmj.com/"),
  createLiveSiteProject("star-buds", "Star Buds", "https://shop.starbuds.us/"),
  createLiveSiteProject("terrabis", "Terrabis", "https://terrabis.co/"),
  createLiveSiteProject(
    "the-boston-garden",
    "The Boston Garden",
    "https://boston.garden/"
  ),
  createLiveSiteProject("the-goods", "The Goods", "https://www.thegoodsforall.com/"),
  createLiveSiteProject(
    "the-public-garden",
    "The Public Garden",
    "https://public.garden/"
  ),
  createLiveSiteProject(
    "underground-legacy",
    "Underground Legacy",
    "https://ulcannabis.com/"
  ),
  createLiveSiteProject("union-chill", "Union Chill", "https://unionchillco.com/"),
  createLiveSiteProject("urban-leaf", "Urban Leaf", "https://urbanleafny.com/"),
  createLiveSiteProject(
    "wonderland-cannabis",
    "Wonderland Cannabis",
    "https://wonderlandcannabisco.com/"
  ),
  createLiveSiteProject("yilo", "YiLo", "https://yilo.com/"),
];
