import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// simulate e.g. a session timeout
const checkIsUserAuthenticated = () => {
  return false;
};

export const getProfile = async () => {
  const cookieStore = await cookies();
  const profileName = cookieStore.get("profile")?.value;
  const name = profileName ?? "John Doe";
  return { name };
};

export const updateProfile = async (name: string) => {
  const cookieStore = await cookies();
  const isAuthenticated = checkIsUserAuthenticated();
  if (!isAuthenticated) {
    redirect("/login");
  }
  cookieStore.set("profile", name);
};
