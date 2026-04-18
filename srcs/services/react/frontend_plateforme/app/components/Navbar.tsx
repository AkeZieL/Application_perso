"use client";

import { useLogout } from "../hooks/UseLogout";

export default function Navbar() {
  const logout = useLogout();

  return (
    <div>
      <button>Acceuil</button>

      <button>Avateur_utilisateur</button>
      <button>Notification</button>
      <button>Langue</button>

      <button>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}