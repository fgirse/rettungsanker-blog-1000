# User Management - MongoDB Sync Problem GELÖST ✅

## Problem
Benutzer, die im Dashboard erstellt werden, erscheinen nicht in der MongoDB-Datenbank.

## Root Cause
Benutzer werden in Clerk erstellt, aber es gibt zwei Möglichkeiten, sie in MongoDB zu synchronisieren:

1. **Clerk Webhooks** (automatisch) - Empfohlen
2. **Manuelle Synchronisierung** (manuell)

## Lösung 1: Clerk Webhooks einrichten (Empfohlen)

### Schritt 1: Locale Server exposieren
```bash
# Terminal 1: ngrok starten
ngrok http 3000
# Sie erhalten eine URL wie: https://abc123.ngrok.io
```

### Schritt 2: Webhook im Clerk Dashboard konfigurieren
1. Gehen Sie zu: https://dashboard.clerk.com
2. Wählen Sie Ihre App
3. Gehen Sie zu **Webhooks** → **+ Add Endpoint**
4. **Endpoint URL:** `https://your-ngrok-url.ngrok.io/api/webhooks/clerk`
5. **Events auswählen:**
   - ✅ `user.created`
   - ✅ `user.updated`
   - ✅ `user.deleted`
6. **Signing Secret kopieren** und in `.env.local` speichern:
   ```bash
   WEBHOOK_SECRET=whsec_xxxxx
   ```

### Schritt 3: Dev Server neu starten
```bash
npm run dev
```

### Schritt 4: Testen
1. Neuen Benutzer erstellen: http://localhost:3000/sign-up
2. Terminal-Logs überprüfen auf:
   ```
   🔔 Webhook received from Clerk
   👤 Processing user: { ... }
   ✅ User created/updated in MongoDB
   ```
3. Benutzer überprüfen:
   ```bash
   node check-users.mjs
   ```

## Lösung 2: Benutzer manuell synchronisieren

Wenn Webhooks noch nicht funktionieren, können Sie Benutzer manuell synchronisieren:

```bash
node sync-users.mjs
```

Dies synchronisiert alle bestehenden Clerk-Benutzer in MongoDB.

## Lösung 3: Test-Benutzer direkt erstellen

Zum Testen können Sie auch direkt einen Test-Benutzer in MongoDB erstellen:

```bash
node test-create-user.mjs
```

## Troubleshooting

### Fehler: "auth() was called but Clerk can't detect usage of clerkMiddleware()"
✅ **GELÖST:** Middleware wurde aktualisiert zu:
```typescript
export default clerkMiddleware();
```

### Fehler: Users erscheinen nicht in MongoDB nach Anmeldung
1. **Webhooks überprüfen:**
   - Sind Webhooks im Clerk Dashboard konfiguriert?
   - Ist die URL korrekt?
   - Ist das `WEBHOOK_SECRET` korrekt?

2. **Logs überprüfen:**
   ```bash
   # Terminal sollte zeigen:
   🔔 Webhook received from Clerk
   🔌 Connecting to MongoDB for user operation...
   ✅ User saved to MongoDB
   ```

3. **Manuell synchronisieren:**
   ```bash
   node sync-users.mjs
   ```

### Fehler: Duplicate email/username
- Benutzer existiert bereits in MongoDB
- Überprüfen Sie in: http://localhost:3000/admin oder mit `node check-users.mjs`

## Workflows

### Workflow 1: Benutzer über Clerk registriert sich
```
User klickt "Sign Up" 
  ↓
Clerk erstellt Benutzer
  ↓
Clerk sendet webhook.created Event
  ↓
Ihr API empfängt Event
  ↓
User wird in MongoDB erstellt
```

### Workflow 2: Benutzer aktualisiert Profil in Clerk
```
User ändert Profil in Clerk
  ↓
Clerk sendet webhook.updated Event
  ↓
Ihr API empfängt Event
  ↓
User wird in MongoDB aktualisiert
```

## Dateien überprüfen

**MongoDB-Benutzer überprüfen:**
```bash
node check-users.mjs
```

**Webhook-Logs im Terminal ansehen:**
- Terminal sollte zeigen, wenn ein Webhook empfangen wird
- Suchen Sie nach: `🔔 Webhook received from Clerk`

## Produktion

Wenn Sie in Produktion gehen:

1. **Webhook URL aktualisieren:**
   - Ändern Sie in Clerk Dashboard von ngrok URL zu: `https://yourdomain.com/api/webhooks/clerk`

2. **Umgebungsvariablen setzen:**
   ```bash
   WEBHOOK_SECRET=whsec_xxxxx
   MONGODB_URL=mongodb+srv://...
   CLERK_SECRET_KEY=sk_...
   ```

3. **Test durchführen:**
   - Registrieren Sie einen Benutzer
   - Überprüfen Sie die Logs
   - Überprüfen Sie MongoDB

## Zusammenfassung

✅ **Middleware:** Behoben
✅ **Webhook Route:** Vorhanden unter `/api/webhooks/clerk`
✅ **User Model:** Vorhanden mit alle notwendigen Feldern
⏳ **Webhook Konfiguration:** Muss im Clerk Dashboard eingestellt werden

Sobald Sie die Webhooks im Clerk Dashboard konfigurieren, werden Benutzer automatisch in MongoDB synchronisiert!
