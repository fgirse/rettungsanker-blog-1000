# Webhook Synchronisierung - Troubleshooting ✅

## Schritte zur Fehlerbehebung:

### 1. Überprüfe die Umgebungsvariablen
```bash
# .env.local sollte enthalten:
WEBHOOK_SECRET=whsec_xxxxx  # Von Clerk Dashboard kopiert
NEXT_PUBLIC_URL=https://5383b898b7ba.ngrok-free.app
MONGODB_URL=mongodb+srv://...
CLERK_SECRET_KEY=sk_...
```

### 2. Stelle sicher, dass ngrok läuft
```bash
# Terminal 1:
ngrok http 3000
# Sollte zeigen: Forwarding https://5383b898b7ba.ngrok-free.app -> http://localhost:3000
```

### 3. Dev Server neu starten
```bash
# Terminal 2:
npm run dev
# Sollte zeigen: ✓ Ready in X.Xs
```

### 4. Teste den Webhook im Clerk Dashboard
```
Dashboard → Webhooks → Dein Endpoint → Send Test Event
- Wähle: user.created
- Klicke: Send Test
- Terminal sollte zeigen: 🔔 Webhook received from Clerk
```

### 5. Überprüfe die Terminal-Logs

**Erfolgreicher Webhook:**
```
🔔 Webhook received from Clerk
📍 Request URL: https://5383b898b7ba.ngrok-free.app/api/webhooks/clerk
🔑 Webhook secret found: whsec_+hiDQV...
📋 Webhook headers: { 'svix-id': '✅', 'svix-timestamp': '✅', 'svix-signature': '✅' }
📦 Webhook payload: { type: 'user.created', data: { ... } }
🔐 Verifying webhook signature...
✅ Webhook signature verified
📋 Event type: user.created
👤 Processing user: { id: 'user_xxxxx', first_name: 'John', ... }
🔌 Connecting to MongoDB for user operation...
✅ MongoDB connected
💾 Creating/updating user: { clerkId: 'user_xxxxx', ... }
✅ User saved to MongoDB: { mongoId: '507f1f77...', ... }
```

**Fehlerbeispiele:**
```
❌ WEBHOOK_SECRET is not set in environment
  → Fix: .env.local aktualisieren und Dev Server neu starten

❌ Missing svix headers
  → Fix: Webhook-URL in Clerk korrekt?

❌ Signature verification failed
  → Fix: WEBHOOK_SECRET ist falsch, neuer Secret vom Dashboard

❌ Error creating or updating user: Duplicate email
  → Fix: E-Mail existiert bereits, anderen Namen verwenden
```

### 6. Verifi im MongoDB

```bash
node check-users.mjs

# Sollte zeigen:
# ✅ Connected to MongoDB
# 📊 Total users: 1
# 👥 Users in database:
# 1. John Doe (@johndoe)
#    Email: john@example.com
```

## Schnelle Überprüfung

**Ist der Secret aktuell?**
```bash
# Im .env.local:
cat .env.local | grep WEBHOOK_SECRET
```

**Ist die ngrok URL aktuell?**
```bash
# Im .env.local:
cat .env.local | grep NEXT_PUBLIC_URL

# Im Clerk Dashboard:
# Webhooks → Dein Endpoint → sollte korrekte URL haben
```

**Ist MongoDB erreichbar?**
```bash
node test-mongodb.mjs
# Sollte zeigen: ✅ Connected to MongoDB successfully!
```

## Häufige Lösungen

### Problem: "WEBHOOK_SECRET is not set"
```bash
# .env.local neu laden
npm run dev
# oder neues Terminal öffnen
```

### Problem: "Duplicate email/username"
```bash
# User existiert bereits, anderer Name verwenden oder:
# Alte Test-User löschen aus MongoDB
```

### Problem: Webhook wird nicht empfangen
1. ngrok URL in Clerk Dashboard überprüfen (exakt!)
2. Webhook-Endpoint aktualisieren/neu erstellen
3. Dev Server neu starten
4. Test-Event senden

## Nächste Schritte

1. ✅ Webhooks im Clerk Dashboard konfiguriert?
2. ✅ WEBHOOK_SECRET in .env.local?
3. ✅ ngrok läuft?
4. ✅ Dev Server läuft?
5. ✅ Test-Event erfolgreich?
6. ✅ Benutzer in MongoDB?

Wenn alle Punkte ✅ sind, funktioniert die Synchronisierung! 🎉
