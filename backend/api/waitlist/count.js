import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");

    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const count = await prisma.waitlist.count();
        res.status(200).json({ count });
    } catch (error) {
        console.error("Count error:", error);
        res.status(500).json({ error: "Server error" });
    }
}
