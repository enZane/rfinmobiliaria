export {};

declare global {
  const AUTH0_DOMAIN: string;
  const AUTH0_CLIENT_ID: string;
  const AUTH0_CLIENT_SECRET: string;
  const AUTH0_CALLBACK_URL: string;
  const AUTH0_LOGOUT_URL: string;
  const AUTH0_RETURN_TO_URL: string;
  const DATABASE_URL: string;
  const cloudinary: {
    createUploadWidget: (
      options: any,
      callback: (error: any, result: any) => void
    ) => {
      open: () => void;
    };
  };
}
