import prismaClient from "~/services/prisma.server";

export const createHouse = async ({
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
  try {
    return await prismaClient.houses.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        name,
        address,
        description,
        highLight,
        price,
        type,
      },
    });
  } catch (error) {
    console.log("error", error);
  }
};

const select = {
  id: true,
  name: true,
  address: true,
  description: true,
  highLight: true,
  price: true,
  type: true,
  user: {
    select: {
      name: true,
    },
  },
};

export const findAllHouses = async ({
  orderBy,
  limit,
}: {
  orderBy: string;
  limit: number;
}) => {
  return await prismaClient.houses.findMany({
    select,
    orderBy: orderBy ? { [orderBy]: "desc" } : undefined,
    take: limit ? limit : undefined,
  });
};

export const findHouseById = async (id: string) => {
  return await prismaClient.houses.findUnique({
    select,
    where: {
      id,
    },
  });
};

export const deleteHouseById = async (id: string) => {
  return await prismaClient.houses.delete({
    where: {
      id,
    },
  });
};

export const updateHouseById = async (id: string, data: any) => {
  return await prismaClient.houses.update({
    where: {
      id,
    },
    data,
  });
};
