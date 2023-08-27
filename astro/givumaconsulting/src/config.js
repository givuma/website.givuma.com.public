import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const ROOT_PATH = path.join(__dirname, "..");
export const PROD = process?.env?.NODE_ENV === "production" ? true : false;

export const SITE_PORT = 4097;
export const SITE_URL = !PROD
	? `http://localhost:${SITE_PORT}`
	: "https://givumaconsulting.com";

export const GOOGLE_TAG_MANAGER_ID = "";
export const GOOGLE_TAG_MANAGER = !PROD
	? ""
	: `<script async src="https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_MANAGER_ID}"></script><script>window.dataLayer = window.dataLayer || []; function gtag() { window.dataLayer.push(arguments); } gtag("js", new Date()); gtag("config", "${GOOGLE_TAG_MANAGER_ID}");</script>`;

export const GOOGLE_AD_SENSE_ID = "";
export const GOOGLE_AD_SENSE = ""; // `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${GOOGLE_AD_SENSE_ID}" crossorigin="anonymous"></script>`;
