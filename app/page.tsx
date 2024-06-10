import Profile from "./Profile";
import { getProfile } from "./dal";

export default function Page() {
  const profile = getProfile();

  return <Profile profile={profile} />;
}
