import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");

    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const signups = await prisma.waitlist.findMany({
            orderBy: { createdAt: "desc" }
        });

        const csv = [
            "Email,Source,Created At",
            ...signups.map(row =>
                `${row.email},${row.source || ""},${row.createdAt.toISOString()}`
            )
        ].join("\n");

        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", "attachment; filename=waitlist.csv");
        res.status(200).send(csv);
    } catch (error) {
        console.error("Export error:", error);
        res.status(500).json({ error: "Server error" });
    }
}
