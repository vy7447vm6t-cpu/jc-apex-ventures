import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const PROJECT_ROOT = path.resolve(__dirname, '../..');
export const SRC_DIR = path.join(PROJECT_ROOT, 'src');
export const APP_DIR = path.join(SRC_DIR, 'app');
export const COMPONENTS_DIR = path.join(SRC_DIR, 'components');
export const CONTENT_DIR = path.join(SRC_DIR, 'content');
export const PUBLIC_DIR = path.join(PROJECT_ROOT, 'public');
export const PUBLIC_IMAGES = path.join(PUBLIC_DIR, 'images');
export const PUBLIC_LOGOS = path.join(PUBLIC_IMAGES, 'logos');

export const PATHS = {
  packageJson: path.join(PROJECT_ROOT, 'package.json'),
  nextConfig: path.join(PROJECT_ROOT, 'next.config.ts'),
  tsconfig: path.join(PROJECT_ROOT, 'tsconfig.json'),
  globalsCss: path.join(APP_DIR, 'globals.css'),
  layoutTsx: path.join(APP_DIR, 'layout.tsx'),
  homePage: path.join(COMPONENTS_DIR, 'HomePage.tsx'),
  homeRoute: path.join(APP_DIR, 'page.tsx'),
  divisionsContent: path.join(CONTENT_DIR, 'divisions.ts'),
  
  // Components
  logo: path.join(COMPONENTS_DIR, 'Logo.tsx'),
  navbar: path.join(COMPONENTS_DIR, 'Navbar.tsx'),
  footer: path.join(COMPONENTS_DIR, 'Footer.tsx'),
  groundedHero: path.join(COMPONENTS_DIR, 'GroundedHero.tsx'),
  groundedWhy: path.join(COMPONENTS_DIR, 'GroundedWhy.tsx'),
  groundedServices: path.join(COMPONENTS_DIR, 'GroundedServices.tsx'),
  groundedProjectTrack: path.join(COMPONENTS_DIR, 'GroundedProjectTrack.tsx'),
  groundedAffiliations: path.join(COMPONENTS_DIR, 'GroundedAffiliations.tsx'),
  groundedProcess: path.join(COMPONENTS_DIR, 'GroundedProcess.tsx'),
  groundedCalculators: path.join(COMPONENTS_DIR, 'GroundedCalculators.tsx'),
  groundedCta: path.join(COMPONENTS_DIR, 'GroundedCTA.tsx'),
  clientMarquee: path.join(COMPONENTS_DIR, 'ClientMarquee.tsx'),
  divisionPage: path.join(COMPONENTS_DIR, 'DivisionPage.tsx'),
  sectionEyebrow: path.join(COMPONENTS_DIR, 'SectionEyebrow.tsx'),
  underlineTabs: path.join(COMPONENTS_DIR, 'UnderlineTabs.tsx'),
  messaging: path.join(CONTENT_DIR, 'messaging.ts'),
  trackRecord: path.join(CONTENT_DIR, 'track-record.ts'),
  profilesLib: path.join(PROJECT_ROOT, 'profiles', 'lib.mjs'),
  enquiryForm: path.join(COMPONENTS_DIR, 'EnquiryForm.tsx'),
  solarCalculator: path.join(COMPONENTS_DIR, 'SolarCalculator.tsx'),
  solarPlants: path.join(COMPONENTS_DIR, 'SolarPlants.tsx'),
  onGridDiagram: path.join(COMPONENTS_DIR, 'OnGridDiagram.tsx'),
  siteEnquiryForm: path.join(COMPONENTS_DIR, 'SiteEnquiryForm.tsx'),
  solisLayout: path.join(APP_DIR, 'solis', 'layout.tsx'),
  workMap: path.join(COMPONENTS_DIR, 'WorkMap.tsx'),
  hotelGallery: path.join(COMPONENTS_DIR, 'HotelGallery.tsx'),
  flowDiagram: path.join(COMPONENTS_DIR, 'FlowDiagram.tsx'),
  places: path.join(CONTENT_DIR, 'places.ts'),
  photos: path.join(CONTENT_DIR, 'photos.ts'),
  printEstimator: path.join(COMPONENTS_DIR, 'PrintEstimator.tsx'),
  spaceEstimator: path.join(COMPONENTS_DIR, 'SpaceEstimator.tsx'),
  imageLightbox: path.join(COMPONENTS_DIR, 'ImageLightbox.tsx'),
  consultationModal: path.join(COMPONENTS_DIR, 'ConsultationModal.tsx'),
  clippy: path.join(COMPONENTS_DIR, 'Clippy.tsx'),
  effects: path.join(COMPONENTS_DIR, 'effects.tsx'),
  servicePages: path.join(CONTENT_DIR, 'service-pages.ts'),
  companyProfilePdf: path.join(PUBLIC_DIR, 'profiles', 'JC-Apex-Ventures-Company-Profile.pdf'),
  
  // Routes
  routeSolis: path.join(APP_DIR, 'solis', 'page.tsx'),
  routeSanyog: path.join(APP_DIR, 'sanyog', 'page.tsx'),
  routeGridApex: path.join(APP_DIR, 'grid-apex', 'page.tsx'),
  routeTvasta: path.join(APP_DIR, 'tvasta', 'page.tsx'),
  routeEmudran: path.join(APP_DIR, 'emudran', 'page.tsx'),
  routeAgrim: path.join(APP_DIR, 'agrim', 'page.tsx'),
  routeGrievances: path.join(APP_DIR, 'electricity-grievances', 'page.tsx'),
  routeLicenses: path.join(APP_DIR, 'licenses', 'page.tsx'),
  routePrintMgmt: path.join(APP_DIR, 'print-management', 'page.tsx'),
  routeSpacePlanning: path.join(APP_DIR, 'space-planning', 'page.tsx'),
  routeStudio: path.join(APP_DIR, 'studio', 'page.tsx'),
  apiContact: path.join(APP_DIR, 'api', 'contact', 'route.ts'),
};

export function fileExists(filePath) {
  try {
    return fs.existsSync(filePath);
  } catch {
    return false;
  }
}

export function readFileSafe(filePath) {
  try {
    if (!fs.existsSync(filePath)) return null;
    return fs.readFileSync(filePath, 'utf8');
  } catch {
    return null;
  }
}

export function readBinarySafe(filePath) {
  try {
    if (!fs.existsSync(filePath)) return null;
    return fs.readFileSync(filePath);
  } catch {
    return null;
  }
}

export function listDirFiles(dirPath) {
  try {
    if (!fs.existsSync(dirPath)) return [];
    return fs.readdirSync(dirPath);
  } catch {
    return [];
  }
}
