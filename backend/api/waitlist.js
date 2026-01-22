import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Helper to set CORS headers
const setCorsHeaders = (res) => {
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
};

export default async function handler(req, res) {
    setCorsHeaders(res);

    // Handle preflight
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    try {
        // GET - View all signups
        if (req.method === "GET") {
            const signups = await prisma.waitlist.findMany({
                orderBy: { createdAt: "desc" }
            });
            return res.status(200).json(signups);
        }

        // POST - Add new signup
        if (req.method === "POST") {
            const { email, source } = req.body || {};

            if (!email) {
                return res.status(400).json({ error: "Email is required" });
            }

            // Basic email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({ error: "Invalid email format" });
            }

            // Check if email already exists
            const existing = await prisma.waitlist.findUnique({
                where: { email: email.toLowerCase() }
            });

            if (existing) {
                return res.status(409).json({ error: "Email already registered" });
            }

            // Save to database
            const signup = await prisma.waitlist.create({
                data: {
                    email: email.toLowerCase(),
                    source: source || "website"
                }
            });

            console.log(`New waitlist signup: ${email}`);
            return res.status(201).json({ success: true, id: signup.id });
        }

        return res.status(405).json({ error: "Method not allowed" });
    } catch (error) {
        console.error("Waitlist error:", error);
        return res.status(500).json({ error: "Server error" });
    }
}
