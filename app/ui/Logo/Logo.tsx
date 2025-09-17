import Image from "next/image";
import IconLogo from "./IconLogo";

/**
 * `Logo` is a composite component that renders the brand logo.
 *
 * It combines:
 * - `IconLogo` — a custom animated/styled icon
 * - `Image` — the brand name rendered from an SVG
 *
 * Example usage:
 * ```tsx
 * // Render the logo in a header or navigation bar
 * <header>
 *   <Logo />
 * </header>
 * ```
 *
 * Notes:
 * - Layout is horizontal, with a small gap between the icon and the text.
 * - Uses Next.js `Image` component for optimized image rendering.
 * - Fully self-contained, no props required.
 * - Can be reused anywhere the full brand logo is needed.
 */
export default function Logo() {
  return (
    <div className="flex flex-row gap-[5] items-center">
      <IconLogo />
      <Image src="/SPORTSEE.svg" alt="Sportsee" width={132.97} height={23.41} />
    </div>
  );
}
