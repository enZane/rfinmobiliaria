import {
  createHouse,
  deleteHouseById,
  findAllHouses,
  findHouseById,
  updateHouseById,
} from "~/repository/House.server";

export const CreateHouse = async ({
  name,
  address,
  description,
  highLight,
  price,
  type,
  userId,
}: {
  name: string;
  address: string;
  description: object;
  highLight: boolean;
  price: number;
  type: string;
  userId: string;
}) => {
  return await createHouse({
    name,
    address,
    description,
    highLight,
    price,
    type,
    userId,
  });
};

export const GetHouseById = async (id: string) => {
  return await findHouseById(id);
};

export const GetAllHouses = async (
  {
    orderBy,
    limit,
  }: {
    orderBy: string;
    limit: number;
  } = {
    orderBy: "",
    limit: 0,
  }
) => {
  return await findAllHouses({
    orderBy,
    limit,
  });
};

export const DeleteHouseById = async (id: string) => {
  return await deleteHouseById(id);
};

export const EditHouseById = async (
  id: string,
  body: {
    name: string;
    address: string;
    description: object;
    highLight: boolean;
    price: number;
    type: string;
  }
) => {
  return await updateHouseById(id, body);
};
