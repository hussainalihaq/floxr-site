import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const port = process.env.PORT || 4000;
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ status: "ok", service: "floxr-waitlist" });
});

// Save a new waitlist signup
app.post("/waitlist", async (req, res) => {
  try {
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

  } catch (error) {
    console.error("Waitlist error:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

// View all signups (protect this in production!)
app.get("/waitlist", async (_req, res) => {
  try {
    const signups = await prisma.waitlist.findMany({
      orderBy: { createdAt: "desc" }
    });
    res.json(signups);
  } catch (error) {
    console.error("Error fetching waitlist:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get signup count
app.get("/waitlist/count", async (_req, res) => {
  try {
    const count = await prisma.waitlist.count();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Export to CSV
app.get("/waitlist/export", async (_req, res) => {
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
    res.send(csv);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(port, () => {
  console.log(`Floxr waitlist backend running on port ${port}`);
});
