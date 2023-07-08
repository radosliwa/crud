declare module "cors";
declare module "body-parser";

declare namespace NodeJS {
  interface ProcessEnv {
    MONGO_CONNECTION_STRING: string;
  }
}
