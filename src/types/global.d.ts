declare namespace NodeJS {
  interface ProcessEnv {
    readonly REACT_APP_API_KEY: string;
    readonly REACT_APP_AUTH_DOMAIN: string;
    readonly REACT_APP_DATABASE_UR: string;
    readonly REACT_APP_PROJECT_ID: string;
    readonly REACT_APP_STORAGE_BUCKET: string;
    readonly REACT_APP_MESSAGING_SEDNER_ID: string;
    readonly REACT_APP_APP_ID: string;
    readonly REACT_APP_MEASUREMENT_ID: string;
  }
}