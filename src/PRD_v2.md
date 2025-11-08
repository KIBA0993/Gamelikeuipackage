# Unhooked — Product Requirements Document (PRD) v1.8 (Consolidated Full Spec)
Date: October 15, 2025  
Owner: PM — Unhooked  
Status: Final for build  
Decision note (carried forward): From "13) no to all" — Cosmetics can use Gems (dual currency), Weather‑lite ambience default OFF (flag‑controlled), and "Preview Room Sizes" toggle NOT exposed.

---

## 0) Changelog (v1.6 → v1.8)
- Added complete Health system: Healthy → Sick → Dead, timers, visuals, and effects.
- Added Recover/Revive/Restart flows (Gems only), cooldowns, and limits. Non‑paid recovery path for Sick remains.
- Added species‑specific Food Shop (cat/dog/both) with per‑species overrides.
- Extended Admin Portal/CMS to manage recovery pricing/limits, species scoping, seasonal windows, and memorials.
- Hardened payments: server receipt validation, entitlement rollback on refunds, idempotency keys, and ledgers.
- Re‑affirmed economy guardrails: Food is Energy‑only; Cosmetics are cosmetic‑only (no gameplay) and may be purchased with Gems and/or Energy.

---

## 1) Vision, Goals, Non‑Goals, Guardrails
Vision
- Help people use their phones more intentionally: earn Energy by staying under a self‑set daily limit, then spend that Energy caring for a delightful, original virtual friend.

Goals
- Turn healthier phone habits into daily, visible progress.
- Keep systems fair, transparent, and tamper‑resistant.
- Delight with seasonal content, animations, and light quests—never grindy.

Non‑Goals
- No competitive leaderboards or public comparisons.
- No gameplay advantages from paid currency.

IP/UX Guardrails
- Art: cozy pixel art, soft dithering, rounded silhouettes; primary transitions 250–400 ms.
- Fairness: avg_daily_buff ≤ 0.20; paid recovery only restores baseline health.
- A11y first: VoiceOver/TalkBack support, color‑contrast ≥ 4.5:1, large‑text layouts.

---

## 2) Scope and Platforms
- iOS and Android smartphone apps; optional home/lockscreen widgets.
- Single‑player, offline‑tolerant with periodic server sync.
- Regions: global with localized catalogs and regional pricing; region freeze logic to deter hopping.

---

## 3) Personas (abridged)
- The Reset‑Seeker: Wants a gentle nudge to use phone less; appreciates clear goals.
- The Customizer: Loves cosmetics, seasonal drops, and expressive rooms/pets.
- The Parent/Teen Pair: Requires parental gates for purchases/revives where platform mandates.

---

## 4) Core Economy
Currencies
- Energy (E): earned daily from healthy usage; max 150 E/day.
- Gems: paid currency (IAP only); cosmetics and recovery flows; never affects gameplay stats beyond restoring health.

Daily Energy Award (authoritative server)
- Inputs: user daily limit L (minutes), actual usage U.
- r = U / L (clamped ≥ 0).  
- Award function (tunable): E_day = round(150 × max(0, 1 − r)^γ), with γ ∈ [0.8..1.4]; moving average smoothing window w ∈ [1..3] days applied to r near threshold to reduce volatility.
- Anti‑abuse: device integrity checks; duplicate device lockouts; server sanity ceilings.

Spending
- Food: Energy only (25–150 E). Contributes to fullness/mood and a temporary daily buff (see §6).
- Cosmetics: Energy and/or Gems (dual pricing allowed). Purely visual.
- Recovery: Gems only (Cure/Revive/Restart).

Reset and Time
- Local daily reset at 00:00 device local time, normalized via server; daylight transitions use server truth.
- fed_today flips to true when Food spend ≥ 100 E within the local day.

---

## 5) Friend Growth & Buffs
- Growth units apply at reset; base growth is tied to under‑limit adherence (from §4), then modified by the previous day's Food buff.
- Daily buff: sum of purchased Food buff_frac values, capped by state:
  - Healthy cap: +0.25
  - Sick cap: +0.10
  - Fragile (post‑Revive): +0.15 for fragile_days
- Growth pauses entirely while Sick or Dead.

---

## 6) Health States and Recovery
State machine
- Healthy → Sick → Dead

Counters
- consecutive_unfed_days increments at reset if fed_today = false; resets to 0 when fed_today = true.
- Sick at 3 consecutive_unfed_days.
- Dead at 7 consecutive_unfed_days.

Effects
- Sick:
  - Growth paused; daily buff cap = +0.10; Trick disabled; Pet/Groom/Nap allowed; Feed emphasized.
  - Visuals: low‑energy idle, cough/sneeze loop, desaturated overlay (~10%).
- Dead:
  - Growth paused; Feed/Trick disabled; Pet shows "memorial pat"; Nap hidden.
  - Visuals: gentle ghost sprite; grayscale vignette.

Recovery paths
- Natural (no pay):
  - Sick → Healthy after any 2 fed_today days in a rolling 3‑day window. Buff cap restores to +0.25 next reset.
  - Dead has no natural recovery.
- Paid (Gems; no retroactive growth):
  - Vet Cure (Sick only): default 120 Gems. Immediate Healthy; consecutive_unfed_days = 0; cap back to +0.25 next reset. Limits: 1/24h, max 5/30d.
  - Revive (Dead only): default 400 Gems. Immediate Healthy; consecutive_unfed_days = 0; Fragile debuff for 3 days (buff cap +0.15).
  - Restart (Sick or Dead): default 200 Gems. New pet at Stage 0; preserves cosmetics, room items, wallets, and Memories snapshot; 24h cooldown.
- Safeguards:
  - Two‑step confirm with exact price, cooldowns, and next‑available timestamp.
  - 10‑second undo grace on Restart (local only).
  - Parental gate as required by platform policies.
- Flags/limits (server‑enforced, admin‑configurable): see §11.

---

## 7) Food Shop (Energy‑only; species‑aware)
Catalog visibility
- Items scoped to species: cat | dog | both.
- Species can override stats/animations. Changing species via Restart refreshes visible catalog immediately.

Rules
- Price: 25–150 E.
- Attributes: fullness_delta (10–60%), mood_delta (+1..+3), buff_frac (0.00..0.15).
- Daily buff cap enforcement as per §5; fed_today becomes true at ≥100 E spend.

Seed catalog (editable in Admin)
- Cat
  - Tuna Treats — 25 E — Fullness +12%, Mood +1, Buff +0.00 — anim: chew_fish
  - Chicken Bites — 50 E — Fullness +22%, Mood +1, Buff +0.05 — anim: chew_bite
  - Salmon Bowl — 100 E — Fullness +40%, Mood +2, Buff +0.10 — anim: slurp_bowl
  - Catnip Feast (Seasonal) — 150 E — Fullness +55%, Mood +3, Buff +0.15 — anim: catnip_spin
- Dog
  - Crunch Biscuit — 25 E — Fullness +15%, Mood +1, Buff +0.00 — anim: crunch_biscuit
  - Turkey Jerky — 50 E — Fullness +25%, Mood +1, Buff +0.05 — anim: tug_jerky
  - Beef Stew — 100 E — Fullness +45%, Mood +2, Buff +0.10 — anim: lap_stew
  - Birthday Bones (Seasonal) — 150 E — Fullness +60%, Mood +3, Buff +0.15 — anim: bone_party
- Both
  - Veggie Medley — 75 E — Fullness +30%, Mood +1, Buff +0.05 — anim: chew_crunch

Acceptance
- Species filter and seasonal windows apply; per‑species overrides merge correctly; catalog updates within one session refresh after species change.

---

## 8) Cosmetics Store (dual currency; cosmetic‑only)
- Pricing: Energy and/or Gems (dual SKU support).
- No gameplay tags or stats; purely visual changes (outfits, room decor, palettes).
- Seasonal drops with regional pricing; region freeze applies on purchase envelope.

---

## 9) Payments, Ledger, and Refunds
- IAP flow: client → storekit/play billing → server receipt validation → entitlements ledger.
- Idempotency: all purchase and recovery endpoints require idempotency_key; duplicate requests return last success.
- Refunds: server receives webhook and rolls back entitlements; negative Gems balance locks recovery/cosmetics until resolved.
- Ledgers: immutable append‑only with daily balances; reconciliation jobs nightly.

---

## 10) UX, Flows, and Microcopy
Key screens
- Home (Healthy): friend idle; Food CTA; Cosmetics CTA.
- Sick banner: "Your friend is sick. Feed twice in 3 days to recover, or visit the Vet now." CTAs: Feed • Vet (120 Gems).
- Dead screen: "Your friend has passed away." CTAs: Revive (400 Gems) • Start Over (200 Gems).
- Confirm modals: show cost, effect, cooldown, limits, and next‑available date/time.

A11y
- Sick/Dead banners role=alert; announce costs and alternatives.
- Haptics: light error for disabled actions while Sick/Dead.
- Large text layouts tested; focus order preserved in modals.

Microcopy (success)
- Cure: "All better. Take it easy today."
- Revive: "Back with us. Be gentle for a few days."
- Restart: "A fresh start begins now."

---

## 11) Admin Portal / CMS
Roles
- Admin, Content Editor, Read‑only.

Recovery configuration (global)
- cure_sick_gems (default 120), revive_dead_gems (400), restart_gems (200)
- cure_cooldown_h (24), revive_cooldown_h (168), restart_cooldown_h (24)
- cure_max_per_30d (5), revive_max_per_90d (2)
- fragile_days (3), fragile_buff_cap (0.15)
- Kill switch: recovery.enabled (default ON)
- Limits enforcement toggle: recovery.limits_enforced (default ON; cannot be disabled in production)

Food catalog
- species_scope: cat|dog|both
- species_overrides: per‑species deltas (fullness/mood/buff), animation_id
- Seasonal windows: start_utc, end_utc; seasonal price overrides allowed

Memorials
- enable_memorial (bool), max_snapshots_per_user (default 5); export tool for support.

Publishing safety
- Diff preview, validation (price ranges, buff caps), and server‑enforced minimum cooldowns; two‑person review for price increases over threshold.

---

## 12) Data Model (selected objects)
Pet
- pet_id (uuid)
- user_id (uuid)
- species (enum: cat|dog)
- stage (int)
- health_state (enum: healthy|sick|dead)
- consecutive_unfed_days (int)
- fragile_until (timestamp|null)
- dead_at (timestamp|null)
- created_at/updated_at

DailyStats
- date (yyyy‑mm‑dd), usage_minutes, limit_minutes, r_smooth, energy_awarded

FoodCatalogItem
- item_id (string), title (string), price_energy (int 25..150), species_scope (enum), defaults { fullness_delta, mood_delta, buff_frac }, species_overrides? { cat?, dog? }, seasonal_window?

RecoveryConfig (singleton)
- cure/ revive/ restart costs, cooldowns, limits, fragile_days, fragile_buff_cap, flags

LedgerEntry
- entry_id, user_id, currency (E|Gems), delta, reason (food|cosmetic|cure|revive|restart|refund), idempotency_key, created_at

Memorial
- memorial_id, user_id, pet_species, pet_stage, snapshot_url, created_at

---

## 13) APIs
Auth omitted for brevity; all calls require auth + device integrity token.

- GET /v1/pet/state
  - Returns: { species, stage, health_state, consecutive_unfed_days, fragile_until }

- POST /v1/pet/recover
  - Body: { action: "cure"|"revive"|"restart", idempotency_key }
  - 200 OK:
    - cure|revive → { health_state: "healthy", consecutive_unfed_days: 0, fragile_until }
    - restart → { new_pet: { pet_id, species, stage: 0, health_state: "healthy" } }
  - 4xx errors: invalid_state, cooldown_active, limit_reached, insufficient_gems, idempotency_conflict

- GET /v1/food/catalog?species=cat|dog
  - Returns effective items with species merges and seasonal availability.

- POST /v1/purchase/validate
  - Body: { store: "app_store"|"play", receipt, idempotency_key }
  - Returns: { gems_added, entitlements[], ledger_entry_id }

- GET /v1/ledger
  - Query: { currency, date_from, date_to }
  - Returns: paginated ledger entries.

Admin (secured; role‑gated)
- GET/PUT /admin/recovery_config
- CRUD /admin/food_items
- GET/PUT /admin/feature_flags
- GET /admin/publishing/diff → validation report

---

## 14) Analytics and KPIs
Events
- recovery_viewed { state }
- recovery_attempted { action, result, reason? }
- recovery_completed { action, cost_gems, cooldown_next_at }
- memorial_saved { has_snapshot }
- species_food_purchase { item_id, species_scope, effective_species, price_energy }
- iap_validated { store, amount_usd }
- refund_processed { amount_usd }

North‑star / Health
- % users Sick per day, % users Dead per day
- Days‑to‑recovery (natural vs paid)
- Revives per 1,000 DAU; Recovery revenue share
- Catalog conversion by species; buff cap breach rate (should be 0)

---

## 15) Privacy, Security, and Compliance
- Minimal data: usage minutes and limit minutes; no app‑level browsing content.
- Parental gates on recovery paywalls as per App Store/Play guidelines.
- Region freeze: on purchase envelope, lock region for 30 days to deter price arbitrage.
- Data retention: ledger 7 years; memorial images until user deletes or account closure.

---

## 16) Experiments, Flags, and Live Ops
Feature flags
- recovery.enabled (ON)
- recovery.limits_enforced (ON)
- food.species_scoping_enabled (ON)
- ambience.weather_lite (OFF by default)

Monitors (SLOs)
- recovery_error_rate < 1%
- revive_cooldown_breaches = 0
- fragile_cap_honored = 100%
- catalog_filter_mismatch = 0

---

## 17) Acceptance Criteria (summary)
Health/Recovery
- Sick triggers exactly at 3 consecutive unfed resets; Dead at 7.
- Cure/Revive/Restart apply immediately; cooldown, limits, and fragile debuff enforced server‑side.
- Natural recovery path for Sick works with 2 fed days in 3 days.

Food (Species)
- Catalog only shows species‑appropriate + "both" items.
- Seasonal windows respected; per‑species overrides applied.

Payments/Ledger
- Idempotent across retries; refunds revoke entitlements and adjust balances.

UX/A11y
- Sick/Dead banners announce via screen readers; confirm modals list costs, limits, and timestamps.

---

## 18) Risks & Mitigations
- Monetization pressure at vulnerable moments → Always present non‑paid Sick recovery; clear copy that recovery grants no extra growth; strict cooldowns/limits.
- Abuse via refunds → Server receipts, webhook‑driven entitlement rollback, negative balance lock.
- Region hopping → Freeze region for 30 days after any paid purchase; warn on mismatch.
- Edge grief on Restart → Two‑step confirm + typed "RESTART" + 10‑second undo grace.

---

## 19) Glossary
- Energy (E): earned daily currency (max 150/day).
- Gems: paid currency; cosmetics and recovery only.
- fed_today: boolean that flips when Food spend ≥ 100 E in a day.
- buff_frac: fractional modifier contributing to daily buff cap.
- Fragile: post‑Revive limited buff state for fragile_days.

---

## 20) Appendices

### A) State Matrix (key actions by health)
| Action | Healthy | Sick | Dead |
|---|---|---|---|
| Feed | Enabled | Emphasized | Disabled |
| Trick | Enabled | Disabled | Disabled |
| Pet/Groom | Enabled | Enabled (milder) | Memorial pat / tidy only |
| Nap | Enabled | Enabled | Hidden |
| Growth | Enabled | Paused | Paused |

### B) Food Item Acceptance Checklist
- price_energy ∈ [25..150]; fullness_delta ∈ [10..60]; mood_delta ∈ [1..3]; buff_frac ∈ [0.00..0.15].
- Species scoping valid; seasonal windows valid; animations bound.

### C) Recovery Acceptance Checklist
- Costs, cooldowns, and per‑period limits validated.
- Cure/Revive/Restart transitions correct; fragile debuff ends on schedule.
- Parental gate present when required.

### D) Example CMS Seed (illustrative)
```json
{
  "recovery_config": {
    "cure_sick_gems": 120,
    "revive_dead_gems": 400,
    "restart_gems": 200,
    "cure_cooldown_h": 24,
    "revive_cooldown_h": 168,
    "restart_cooldown_h": 24,
    "cure_max_per_30d": 5,
    "revive_max_per_90d": 2,
    "fragile_days": 3,
    "fragile_buff_cap": 0.15
  },
  "food_items": [
    { "item_id": "cat_tuna_25", "title": "Tuna Treats", "price_energy": 25, "species_scope": "cat",
      "defaults": { "fullness_delta": 12, "mood_delta": 1, "buff_frac": 0.0 },
      "species_overrides": { "cat": { "feed_animation_id": "chew_fish" } }
    },
    { "item_id": "dog_biscuit_25", "title": "Crunch Biscuit", "price_energy": 25, "species_scope": "dog",
      "defaults": { "fullness_delta": 15, "mood_delta": 1, "buff_frac": 0.0 },
      "species_overrides": { "dog": { "feed_animation_id": "crunch_biscuit" } }
    },
    { "item_id": "both_veggie_75", "title": "Veggie Medley", "price_energy": 75, "species_scope": "both",
      "defaults": { "fullness_delta": 30, "mood_delta": 1, "buff_frac": 0.05 }
    },
    { "item_id": "cat_salmon_100", "title": "Salmon Bowl", "price_energy": 100, "species_scope": "cat",
      "defaults": { "fullness_delta": 40, "mood_delta": 2, "buff_frac": 0.10 }
    },
    { "item_id": "dog_stew_100", "title": "Beef Stew", "price_energy": 100, "species_scope": "dog",
      "defaults": { "fullness_delta": 45, "mood_delta": 2, "buff_frac": 0.10 }
    }
  ]
}
```

### E) Error Codes (recover)
- invalid_state: action not allowed in current health_state.
- cooldown_active: try after timestamp provided.
- limit_reached: period max hit.
- insufficient_gems: not enough balance.
- idempotency_conflict: key reuse with different payload.

---

End of PRD v1.8
