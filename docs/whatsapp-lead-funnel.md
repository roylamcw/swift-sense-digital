# WhatsApp Lead Funnel Pilot

This runbook covers the controlled SSD WhatsApp qualification pilot. The funnel is disabled by default and must remain limited to explicitly allowlisted test senders until production approval.

## Flow

1. An allowlisted sender replies `START` or explicitly asks for human help.
2. SSD asks for the sender's business need, company name, full name and email.
3. SSD asks for explicit consent to store those details, the WhatsApp number and the business need in HubSpot.
4. Only `YES I CONSENT`, `I CONSENT` or `I AGREE` authorises submission. A plain `yes` does not.
5. A successful submission removes qualification details from Redis and places the conversation in human handover.
6. Automatic replies remain suppressed during handover.

`CANCEL` or `STOP` cancels an in-progress qualification. If HubSpot explicitly rejects a request, the sender may make one deliberate retry by replying `RETRY` and consenting again. An uncertain network result is never retried automatically because the first request might already have succeeded.

## Production environment

The Vercel project needs these server-only variables:

- `WHATSAPP_LEAD_FUNNEL_ENABLED`: set to `true` only for an approved controlled test.
- `WHATSAPP_AI_ALLOWED_SENDER_IDS`: comma-separated WhatsApp numeric IDs; the funnel reuses the existing AI-pilot allowlist.
- `KV_REST_API_URL`: supplied by the connected Upstash integration.
- `KV_REST_API_TOKEN`: supplied by the connected Upstash integration.

The existing WhatsApp reply, Meta signature and AI Gateway variables remain required by the webhook. Never expose any token through a `NEXT_PUBLIC_` variable, source control, logs, screenshots or chat.

## Storage and failure protection

- Conversation state expires after seven days.
- Processed message IDs are reserved for 24 hours to prevent duplicate replies and duplicate HubSpot submissions.
- Redis key names contain SHA-256 hashes instead of raw WhatsApp phone or message identifiers.
- Qualification data is removed from Redis after confirmed HubSpot success.
- If Redis is unavailable, the qualification funnel stays off. The existing reply path uses only in-memory duplicate protection until Redis recovers.
- Logs contain counters and redacted provider diagnostics, not message text, names, email addresses or phone numbers.

## Controlled test checklist

Do not perform this test until the pull request is approved, merged and deployed and the feature flag is enabled for the approved sender.

1. Confirm the Upstash variables exist in Vercel Production without revealing their values.
2. Confirm only the approved test sender is in `WHATSAPP_AI_ALLOWED_SENDER_IDS`.
3. Set `WHATSAPP_LEAD_FUNNEL_ENABLED=true` and redeploy Production.
4. Send `START` from the approved WhatsApp number.
5. Complete the qualification using synthetic test details and a unique test email address.
6. Verify that a plain `yes` does not submit anything.
7. Reply `YES I CONSENT` once.
8. Confirm exactly one HubSpot record and one confirmation reply.
9. Send another WhatsApp message and confirm automatic replies are suppressed for handover.
10. Review redacted Vercel logs and delete the synthetic HubSpot test record after verification.
11. Disable `WHATSAPP_LEAD_FUNNEL_ENABLED` and redeploy if the pilot is not continuing.

