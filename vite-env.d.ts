/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly APP_BASE_URL: string;
  readonly APP_BASE_IMGURL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
