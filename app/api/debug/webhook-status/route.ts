import { auth } from "@clerk/nextjs/server";

export async function GET() {
  const { userId } = await auth();
  
  if (!userId) {
    return Response.json({ error: "Unauthorized - Please sign in first" }, { status: 401 });
  }

  // In production, you'd query your webhook logs from a database
  // For now, return general instructions and debugging guidance
  return Response.json({
    message: "Webhook Status & Debug Guide",
    userAuthenticated: true,
    userId,
    endpoints: {
      healthCheck: "/api/health/clerk",
      webhookEndpoint: "/api/webhooks/clerk",
    },
    instructions: [
      "1. Go to Clerk Dashboard: https://dashboard.clerk.com",
      "2. Select your instance (rettungsanker-freiburg)",
      "3. Go to Settings → Webhooks",
      "4. Click on: https://rettungsanker-freiburg.click/api/webhooks/clerk",
      "5. Scroll to 'Recent events'",
      "6. Look for 'user.created' events after you signed up",
      "7. Click on the event to see detailed response",
      "8. Check if status is 200 (success) or something else",
      "9. If failed, the error message will show the reason",
    ],
    checklist: {
      "Domain whitelisted in Clerk": "Settings → Domains → Verify rettungsanker-freiburg.click is present",
      "Webhook enabled": "Settings → Webhooks → Should show enabled status",
      "Webhook secret correct": "Verify WEBHOOK_SECRET in your .env matches Clerk Dashboard",
      "MongoDB connection": "Check logs for 'Connected to MongoDB'",
      "User in MongoDB": "Run: db.users.findOne({clerkId: 'your_user_id'})",
    },
    commonIssues: {
      "Webhook shows failed (5xx)": [
        "- WEBHOOK_SECRET mismatch",
        "- MongoDB connection failure",
        "- Email or username already exists in DB",
      ],
      "User data loads locally but not in prod": [
        "- Domain not whitelisted in Clerk Dashboard",
        "- Using wrong API keys (test keys in production)",
      ],
      "Metadata not syncing": [
        "- Webhook failed to process",
        "- Retry logic exhausted",
        "- Check webhook event logs for errors",
      ],
    },
  });
}
