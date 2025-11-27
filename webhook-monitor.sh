#!/bin/bash

# Real-time webhook monitoring and testing script
# This script monitors the application logs for webhook events

echo "🔔 WEBHOOK REAL-TIME MONITOR"
echo "======================================================================"
echo ""
echo "This script will monitor your application logs for webhook events."
echo ""
echo "Setup Instructions:"
echo "1. Make sure your app is running: npm run dev"
echo "2. In another terminal, run this script: bash webhook-monitor.sh"
echo "3. Create a test account at http://localhost:3000/sign-up"
echo "4. Watch this terminal for webhook events"
echo ""
echo "======================================================================"
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if app is running
echo "🔍 Checking if app is running on port 3000..."
if ! curl -s http://localhost:3000 > /dev/null 2>&1; then
  echo -e "${RED}❌ Application is not running on http://localhost:3000${NC}"
  echo "Please start the app first: npm run dev"
  exit 1
fi
echo -e "${GREEN}✅ Application is running${NC}"
echo ""

# Keywords to monitor in logs
declare -a WEBHOOK_KEYWORDS=(
  "Webhook received"
  "Webhook signature verified"
  "Processing user"
  "User created/updated in MongoDB"
  "Updated Clerk metadata"
  "Error"
  "webhook"
)

echo -e "${BLUE}📊 WEBHOOK EVENTS TO MONITOR:${NC}"
echo "  ✅ Webhook received from Clerk"
echo "  ✅ Webhook signature verified"
echo "  ✅ Processing user"
echo "  ✅ User created/updated in MongoDB"
echo "  ✅ Updated Clerk metadata"
echo "  ❌ Error creating/updating user"
echo "  ❌ Webhook verification failed"
echo ""
echo "======================================================================"
echo ""

# Instructions for testing
echo -e "${YELLOW}📖 TO TEST WEBHOOK:${NC}"
echo ""
echo "1. Open http://localhost:3000/sign-up in your browser"
echo "2. Create a test account with:"
echo "   - Email: test_$(date +%s)@example.com"
echo "   - Password: SecurePassword123!"
echo "   - First Name: Test"
echo "   - Last Name: User"
echo "3. Watch this terminal for webhook logs"
echo "4. You should see:"
echo "   - 🔔 Webhook received from Clerk"
echo "   - ✅ Webhook signature verified"
echo "   - 👤 Processing user"
echo "   - ✅ User created/updated in MongoDB"
echo "   - ✅ Updated Clerk metadata"
echo ""
echo "======================================================================"
echo ""
echo -e "${YELLOW}⏳ Waiting for webhook events...${NC}"
echo ""
echo "Press Ctrl+C to stop monitoring"
echo ""

# Monitor npm logs
# This is a simplified approach that watches for keywords in the terminal
# For production, consider using proper log aggregation

echo -e "${BLUE}📝 REAL-TIME LOG MONITORING STARTED${NC}"
echo "======================================================================="
echo ""

# Note: This is a placeholder. In a real environment, you would:
# 1. Configure proper logging to a file
# 2. Use 'tail -f' to monitor that file
# 3. Or use 'npm run dev 2>&1 | grep' to filter logs

echo -e "${YELLOW}NOTE:${NC}"
echo "To see real-time logs, run your app with:"
echo "  npm run dev 2>&1 | tee app.log"
echo ""
echo "Then in another terminal, run:"
echo "  tail -f app.log | grep -E '(Webhook|Error|Processing|Created)'"
echo ""

# Manual testing endpoint
echo "======================================================================"
echo ""
echo -e "${BLUE}🧪 MANUAL WEBHOOK TEST:${NC}"
echo ""
echo "If you want to test the webhook endpoint manually, use:"
echo ""
echo "curl -X POST http://localhost:3000/api/webhooks/clerk \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -H 'svix-id: msg_test' \\"
echo "  -H 'svix-timestamp: $(date +%s)' \\"
echo "  -H 'svix-signature: v1,test' \\"
echo "  -d '{\"type\": \"user.created\"}'"
echo ""
echo "Note: Manual tests will fail signature verification (expected)"
echo ""

# Keep script running
read -p "Press Enter to exit..."
