"use client";

import { startTransition, useState } from "react";
import { updateProfileAction } from "./actions";

export default function Profile({ profile }: { profile: { name: string } }) {
  const [editProfile, setEditProfile] = useState(false);

  if (editProfile)
    return (
      <form
        action={async (formData) => {
          // When `redirect` is called on the server `undefined` is returned to the client.
          // This is not known by Typescript.
          // However, according to the React docs, composing server actions with actions on the client is a supported use case.
          // https://react.dev/reference/rsc/server-actions#composing-server-actions-with-actions
          // So, having an `undefined` return value on the client can be dangerous and might lead to subtle bugs.
          const result = await updateProfileAction(formData);
          if (result === undefined)
            console.error(
              `The server action returned \`undefined\` to the client. However, Typescript does not know this, since \`redirect\` has a \`never\` return type.`
            );
          startTransition(() => {
            setEditProfile(false);
          });
        }}
      >
        <input required name="name" defaultValue={profile.name} />
        <button type="button" onClick={() => setEditProfile(false)}>
          Cancel
        </button>
        <button type="submit">Save</button>
      </form>
    );

  return (
    <div>
      <h1>{profile.name}</h1>
      <button onClick={() => setEditProfile(true)}>Edit Profile</button>
    </div>
  );
}
