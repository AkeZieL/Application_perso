"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import login from "@/app/lib/http/auth/login"
import formatApiError from "@/app/lib/utils/formatApiError"
import Button from "@/app/components/settings/CreatePointButton"

import Link from "next/link";

export default function Login() {
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await login(email, password);
            console.log("LOGIN OK:", data);
            // 
            router.push("/");
        } catch (err: any) {
            const message = formatApiError(err);
            setError(message);
        }
  };

    return(
        <div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>email: </label>
                <input
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <hr />

                <label>password: </label>
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <hr />

                <button type="submit">Login</button>
                <hr />

                <p style={{ marginTop: "10px" }}>
                    No account?{" "}
                    <Link href="/auth/register" style={{ textDecoration: "underline" }}>
                        Register
                    </Link>
                </p>
            </form>
            <div>
                <Button />
            </div>
        </div>
  );
}