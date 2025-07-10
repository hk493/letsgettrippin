/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AMADEUS_CLIENT_ID: string;
  readonly VITE_AMADEUS_API_SECRET: string;
  readonly VITE_STRIPE_KEY: string;
  readonly VITE_STRIPE_SECRET_KEY: string;
  readonly VITE_OPENAI_API_KEY: string;
  readonly VITE_ESIM_BASE: string;
  readonly VITE_ESIM_TOKEN: string;
  readonly VITE_TRIPADVISOR_API_KEY: string;
  readonly VITE_AUTH0_CLIENT_ID: string;
  readonly VITE_AUTH0_DOMAIN: string;
  readonly VITE_GOOGLE_MAPS_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
