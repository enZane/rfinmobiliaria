import { findOrCreateUser } from "~/repository/User.server";

export const FindOrCreateUser = async ({
  email,
  name,
  password,
}: {
  email: string;
  name: string;
  password: string;
}) => {
  return await findOrCreateUser({ email, name, password});
};
