"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import register from "../../lib/http/register"
import formatApiError from "../../lib/utils/formatApiError"

import Button from "../../components/settings/CreatePointButton"
import AppRouteRouteModule from "next/dist/server/route-modules/app-route/module";



export default function Register() {
    const [role, setRole] = useState('');
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const [error, setError] = useState("");
    const router = useRouter();


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await register(username, email, password1, password2, role);
            console.log("User créé :", data);
            router.push("/auth/login");
        } catch (err) {
            const message = formatApiError(err);
            console.log("REGISTER ERROR:", message);
            setError(message); 
        }
    }
    return (
        <div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>username:</label>
                <input
                    type="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="username"
                    required
                />
                <hr />
                <label>email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email"
                    required
                />
                <hr />
                <label>password 1:</label>
                <input
                    type="password1"
                    value={password1}
                    onChange={(e) => setPassword1(e.target.value)}
                    placeholder="password1"
                    required
                />
                <hr />
                <label>password 2:</label>
                <input
                    type="password2"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    placeholder="password2"
                    required
                />
                <hr />

                <label>role: 
                    <input
                        type="radio"
                        name="role"
                        value="boss"
                        checked={role === "boss"}
                        onChange={(e) => setRole(e.target.value)}
                    />
                    Patron
                </label>
                <label>
                    <input
                        type="radio"
                        name="role"
                        value="employee"
                        checked={role === "employee"}
                        onChange={(e) => setRole(e.target.value)}
                    />
                    Employé
                </label>
                <hr />
                


                <button type="submit">Register</button>
            </form>
            <div>
                <Button />
            </div>
        </div>
    );
}