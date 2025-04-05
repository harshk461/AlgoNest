'use server'

import { cookies } from "next/headers";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const getAllClientUsers = async () => {
    try {
        const token = cookies().get("token")?.value || null; // ✅ Fetch token from cookies (server-side)

        if (!token) {
            throw new Error("No token found, unauthorized request.");
        }

        const res = await axios.get(`${apiUrl}/users/get-client-users`);

        return {
            data: res.data,
            headers: res.data.length > 0
                ? Object.keys(res.data[0]).map(key => ({
                    key,
                    label: key.toUpperCase()
                }))
                : []
        };
    } catch (err) {
        console.error("Error fetching client users:", err);
        throw err;
    }
};

export { getAllClientUsers };
