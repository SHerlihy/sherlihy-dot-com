/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_QUERY_URL?: string;
  readonly VITE_LOGS_URL?: string;
  readonly VITE_LOGS_API_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
