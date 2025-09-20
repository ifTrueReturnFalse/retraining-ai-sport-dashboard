"use client"

import { useUser } from "@/app/context/UserContext"

export default function Page() {
  const userData = useUser()
  return (
    <div>Profil</div>
  )
}