import { ActionFunction, redirect } from "@remix-run/cloudflare";
import { CreateHouse } from "~/controllers/HouseController.server";
import { authenticator } from "~/services/auth0.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const user = (await authenticator.isAuthenticated(request)) as {
    id: string;
  } | null;

  if (!user) return redirect("/login");

  const description = {
    description: formData.get("description") as string,
    photos: formData.get("photos") as string,
  };

  const body = {
    name: formData.get("name") as string,
    address: formData.get("address") as string,
    description,
    highLight: !!formData.get("highlight") as boolean,
    price: Number(formData.get("price")?.toString()),
    type: formData.get("type") as string,
    userId: user.id,
  };

  try {
    const property = await CreateHouse(body);
    if (!property) return redirect("/dashboard/propiedades");

    return redirect(`/dashboard/propiedades/${property.id}`);
  } catch (error) {
    console.log(error);
  }

  return redirect("/dashboard/propiedades");
};
