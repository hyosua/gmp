/**
 * Génère le manuel utilisateur enrichi avec screenshots, PDF et DOCX.
 *
 * Usage : npx tsx scripts/generate-manual.ts [--skip-screenshots]
 *
 * Prérequis :
 *   - Le site tourne sur http://localhost:3000 (npm run dev)
 *   - La base est seedée (npm run db:reset)
 *   - pandoc installé (apt install pandoc)
 */

import { chromium, type Page } from "playwright";
import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";

const BASE_URL = "http://localhost:3000";
const DOCS_DIR = path.join(process.cwd(), "docs");
const SCREENSHOTS_DIR = path.join(DOCS_DIR, "screenshots");
const SOURCE = path.join(DOCS_DIR, "manuel-utilisateur.md");
const ENRICHED = path.join(DOCS_DIR, "manuel-utilisateur-enrichi.md");

type Role = "public" | "etudiant" | "enseignant" | "entreprise" | "admin";

interface Target {
  /** Identifiant de section dans le manuel (ex: "3.1") */
  section: string;
  url: string;
  role: Role;
  /** Action optionnelle exécutée après navigation, avant le screenshot */
  action?: (page: Page) => Promise<void>;
}

const CREDENTIALS: Record<string, { email: string; password: string }> = {
  etudiant: { email: "etudiant1@test.com", password: "gmp" },
  enseignant: { email: "enseignant1@test.com", password: "gmp" },
  entreprise: { email: "entreprise1@test.com", password: "gmp" },
  admin: { email: "admin@test.com", password: "gmp" },
};

const TARGETS: Target[] = [
  // Section 2 - Connexion
  { section: "2.1", url: "/connexion", role: "public" },

  // Section 3 - Espace Étudiant
  { section: "3.1", url: "/espace-etudiant/notes", role: "etudiant" },
  {
    section: "3.2",
    url: "/espace-etudiant/emploi-du-temps",
    role: "etudiant",
  },
  { section: "3.3", url: "/dashboard/cours", role: "etudiant" },
  {
    section: "3.4",
    url: "/espace-etudiant/projets-tuteurs",
    role: "etudiant",
  },
  { section: "3.5", url: "/espace-etudiant/offres", role: "etudiant" },

  // Section 4 - Espace Enseignant
  { section: "4.1", url: "/espace-enseignant/notes", role: "enseignant" },
  {
    section: "4.2",
    url: "/espace-enseignant/emploi-du-temps",
    role: "enseignant",
  },
  { section: "4.3", url: "/dashboard/cours", role: "enseignant" },

  // Section 5 - Espace Entreprise
  {
    section: "5.1",
    url: "/espace-entreprise/projets-tuteurs",
    role: "entreprise",
  },
  { section: "5.2", url: "/espace-entreprise/offres", role: "entreprise" },

  // Section 6 - Administration
  { section: "6.1", url: "/admin/utilisateurs", role: "admin" },
  { section: "6.2", url: "/admin", role: "admin" },
  { section: "6.3", url: "/admin/projets-tuteurs", role: "admin" },
  { section: "6.4", url: "/admin/offres", role: "admin" },
  { section: "6.5", url: "/dashboard/cours", role: "admin" },
  {
    section: "6.6",
    url: "/admin/utilisateurs",
    role: "admin",
    action: async (page: Page) => {
      await page.click('button:has-text("Importer")');
      await page.waitForSelector("text=Choisir un fichier");
    },
  },
];

async function login(page: Page, role: string) {
  const { email, password } = CREDENTIALS[role];
  await page.goto(`${BASE_URL}/connexion`, { waitUntil: "networkidle" });
  await page.fill("#email", email);
  await page.fill("#password", password);
  await Promise.all([
    page.waitForNavigation({ waitUntil: "networkidle" }),
    page.click('button[type="submit"]'),
  ]);
}

async function takeScreenshots() {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });

  // Groupe les cibles par rôle pour minimiser les connexions
  const byRole = new Map<Role, Target[]>();
  for (const target of TARGETS) {
    const list = byRole.get(target.role) ?? [];
    list.push(target);
    byRole.set(target.role, list);
  }

  for (const [role, targets] of Array.from(byRole.entries())) {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 800 },
    });
    const page = await context.newPage();

    if (role !== "public") {
      process.stdout.write(`  [${role}] Connexion...`);
      await login(page, role);
      console.log(" OK");
    }

    for (const target of targets) {
      process.stdout.write(`  Screenshot ${target.section} → ${target.url}`);
      await page.goto(`${BASE_URL}${target.url}`, {
        waitUntil: "networkidle",
      });
      if (target.action) await target.action(page);
      const outFile = path.join(SCREENSHOTS_DIR, `${target.section}.png`);
      await page.screenshot({ path: outFile, fullPage: false });
      console.log(" OK");
    }

    await context.close();
  }

  await browser.close();
}

function enrichMarkdown() {
  let content = fs.readFileSync(SOURCE, "utf-8");

  const taken = fs
    .readdirSync(SCREENSHOTS_DIR)
    .filter((f) => f.endsWith(".png"))
    .map((f) => path.basename(f, ".png"));

  for (const section of taken) {
    // Escape le point dans le numéro de section (ex: "3.1" → "3\.1")
    const escaped = section.replace(".", "\\.");
    // Correspond à "### 3.1 Titre quelconque" en début de ligne
    const regex = new RegExp(`^(#{1,4} ${escaped}[. ][^\n]*\n)`, "m");
    const img = `\n![](./screenshots/${section}.png)\n`;
    content = content.replace(regex, `$1${img}`);
  }

  fs.writeFileSync(ENRICHED, content, "utf-8");
  console.log(
    `  Markdown enrichi écrit dans ${path.relative(process.cwd(), ENRICHED)}`,
  );
}

function generatePDF() {
  // Lancer pandoc depuis docs/ pour que ./screenshots/... se résolve correctement
  execSync(
    [
      "pandoc",
      `"manuel-utilisateur-enrichi.md"`,
      `-o "manuel-utilisateur.pdf"`,
      "--pdf-engine=xelatex",
      `-V geometry:margin=2.5cm`,
      `-V fontsize=11pt`,
      `-V lang=fr`,
      `--metadata title="Manuel d'utilisateur - Site GMP"`,
    ].join(" "),
    { stdio: "inherit", cwd: DOCS_DIR },
  );
  console.log(`  PDF → docs/manuel-utilisateur.pdf`);
}

function generateDOCX() {
  execSync(
    [
      "pandoc",
      `"manuel-utilisateur-enrichi.md"`,
      `-o "manuel-utilisateur.docx"`,
      `--reference-doc="templates/manuel-reference.docx"`,
      `--metadata title="Manuel d'utilisateur - Site GMP"`,
    ].join(" "),
    { stdio: "inherit", cwd: DOCS_DIR },
  );
  console.log(`  DOCX → docs/manuel-utilisateur.docx`);
}

async function main() {
  const skipScreenshots = process.argv.includes("--skip-screenshots");

  if (!skipScreenshots) {
    console.log("\n=== Étape 1/3 : Screenshots ===");
    await takeScreenshots();
  } else {
    console.log("\n=== Étape 1/3 : Screenshots (ignorés) ===");
  }

  console.log("\n=== Étape 2/3 : Enrichissement du markdown ===");
  enrichMarkdown();

  console.log("\n=== Étape 3/3 : Export PDF + DOCX ===");
  generatePDF();
  generateDOCX();

  console.log("\nTerminé.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
