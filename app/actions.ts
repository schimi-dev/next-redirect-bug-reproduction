"use server";

import { revalidatePath } from "next/cache";
import { updateProfile } from "./dal";

export async function updateProfileAction(formData: FormData) {
  const name = formData.get("name") as string;
  await updateProfile(name);
  revalidatePath("/");
  return { message: "Profile saved." };
}
