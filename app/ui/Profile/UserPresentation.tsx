"use client";

import Image from "next/image";
import { useUser } from "@/app/context/UserContext";
import styles from "./UserPresentation.module.css";
import { ISOToString } from "@/app/lib/utils";

/**
 * `UserPresentation` is a React functional component that displays a user's
 * profile picture, first name, last name, and membership date.
 *
 * It fetches user data from the `UserContext`.
 *
 * @component
 * @returns {JSX.Element} A div element containing the user's presentation details.
 */
export default function UserPresentation() {
  // Access user data from the UserContext.
  const userData = useUser();

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        {/* Conditionally renders the profile picture if `profilePicture` is available in `userData.profile`. */}
        {userData.profile?.profilePicture && (
          <Image
            src={userData.profile?.profilePicture} // Source of the profile picture.
            alt="Image de profil"
            height={117} // Fixed height for the image.
            width={104} // Fixed width for the image.
            className={styles.image}
          />
        )}
      </div>
      <div>
        {/* Displays the user's first name and last name.
            Uses optional chaining (`?.`) to safely access properties and defaults to empty strings if `profile` is null. */}
        <p
          className={styles.name}
        >{`${userData.profile?.firstName} ${userData.profile?.lastName}`}</p>

        {/* Conditionally displays the membership date if `createdAt` is available in `userData.profile`.
            The `ISOToString` utility function formats the ISO date string into a readable format. */}
        {userData.profile?.createdAt && (
          <p className={styles.member}>{`Membre depuis le ${ISOToString(
            userData.profile?.createdAt
          )}`}</p>
        )}
      </div>
    </div>
  );
}
