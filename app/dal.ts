import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// simulate e.g. a session timeout
const checkIsUserAuthenticated = () => {
  return false;
};

export const getProfile = () => {
  const profileName = cookies().get("profile")?.value;
  const name = profileName ?? "John Doe";
  return { name };
};

export const updateProfile = (name: string) => {
  const isAuthenticated = checkIsUserAuthenticated();
  if (!isAuthenticated) {
    redirect("/login");
  }
  cookies().set("profile", name);
};
