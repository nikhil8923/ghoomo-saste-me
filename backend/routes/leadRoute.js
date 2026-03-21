import express from "express";

const router = express.Router();

router.post("/send-lead", async (req, res) => {
  const { name, phone, email, destination, date, travelers, sharing, budget } = req.body;

  try {
    console.log("📥 Lead received:", req.body);

    // ✅ Send to n8n webhook
    const response = await fetch(process.env.N8N_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        phone,
        email,
        destination,
        date,
        travelers,
        sharing,
        budget
      })
    });

    // ✅ Optional check
    if (!response.ok) {
      throw new Error("Webhook failed");
    }

    console.log("🚀 Lead sent to n8n successfully");

    res.status(200).json({
      success: true,
      message: "Lead sent successfully"
    });

  } catch (error) {
    console.error("❌ Webhook Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to send lead"
    });
  }
});

export default router;