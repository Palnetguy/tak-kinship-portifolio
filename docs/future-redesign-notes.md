# Future-redesign candidates (parked, not built)

The TAK team parked these at the 2026-08-10 walkthrough because engineering time is
already stretched. They are NOT in the current site. This note exists only so the future
decision starts warm.

## 1. Website chatbot with question logging (Mr. Smith)

An AI chat bot that answers visitor questions, with a backend that logs the questions asked
so the FAQ can be improved over time.

Candidate off-the-shelf frameworks:

| Option | Cost | Notes |
|---|---|---|
| Chatbase | Subscription (free tier, then paid) | Trained on your own site/docs, hosted widget, logs conversations. Fastest path. |
| Voiceflow | Subscription (free tier) | Visual flow builder, richer control, more setup. |
| Tawk.to | Free | Live chat plus a basic bot; logging built in, human handoff. Least "AI". |
| Crisp | Subscription (free tier) | Inbox plus bot, decent analytics. |
| Self-hosted (Next API route + an LLM API + a small DB) | Pay-per-use LLM only | Most control, most build time; the rebuild already has a server layer to hang it on. Question logs would live next to the existing backend. |

The logging requirement is the real driver: any option chosen must retain the asked
questions, which rules out a purely client-side widget with no backend.

## 2. Visitor analytics (Mr. Smith)

"How many visitors, are we still relevant." Google Analytics 4 is the obvious fit and is
free. On this Next.js site it is a script tag plus a consent gate. Privacy-lighter
alternatives if that is a concern later: Plausible or Umami (both paid-hosted or
self-hostable), which need no cookie banner.

No work started on either. This is a placeholder for the future-redesign scope.
