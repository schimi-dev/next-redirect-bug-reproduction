import Profile from "./Profile";
import { getProfile } from "./dal";

export default async function Page() {
  const profile = await getProfile();

  return <Profile profile={profile} />;
}
