# Nihongo - Development Plan

## Current State (Completed)

- [x] Core app architecture (Next.js, Prisma, Supabase)
- [x] Authentication (NextAuth.js)
- [x] SRS system with 9 stages (Apprenti → Satori)
- [x] Lesson flow with rich cards (radicals, kanji, vocabulary)
- [x] Review system with quiz
- [x] Gamification (XP, streaks, levels)
- [x] Performance optimization (SWR caching, parallel queries)
- [x] Enhanced lesson cards showing:
  - Component radicals for kanji
  - Vocabulary preview for kanji
  - Kanji preview for radicals
  - Example sentences
- [x] Web Speech API for Japanese pronunciation
- [x] Deployed to Vercel + Supabase

---

## Phase 1: Content Infrastructure (Priority: High)

### 1.1 Create JSON-based content structure
**Goal:** Make it easy to add/edit content without touching code

```
/content/
  /level-01/
    radicals.json
    kanji.json
    vocabulary.json
  /level-02/
    ...
```

**JSON format example:**
```json
// kanji.json
{
  "kanji": [
    {
      "character": "日",
      "meaningsFr": ["soleil", "jour"],
      "readingsOn": ["ニチ", "ジツ"],
      "readingsKun": ["ひ", "か"],
      "meaningMnemonic": "Un rectangle avec une ligne...",
      "readingMnemonic": "Nichi ressemble à niche...",
      "radicals": ["日"],
      "level": 1
    }
  ]
}
```

### 1.2 Build content import script
- Read JSON files
- Validate data completeness
- Import to database with relationships
- Report missing/invalid entries

### 1.3 Create content validation
- Check all kanji have radicals defined
- Check all vocab have kanji defined
- Check mnemonics exist for all items
- Check readings are in hiragana/katakana

---

## Phase 2: Content Generation (Priority: High)

### 2.1 Research & data gathering
**Sources to research:**
- WaniKani order and structure (levels 1-60)
- Anki decks (Core 2k/6k, RTK)
- JLPT vocabulary lists (N5 → N1)
- Joyo kanji list (2,136 kanji)

**Data needed per item:**

| Item | Required Fields |
|------|-----------------|
| Radical | character, meaningFr, mnemonic, imageUrl (if no unicode) |
| Kanji | character, meaningsFr[], readingsOn[], readingsKun[], meaningMnemonic, readingMnemonic, radicals[] |
| Vocabulary | word, meaningsFr[], readings[], mnemonic, sentenceJp, sentenceFr, kanji[] |

### 2.2 AI-assisted mnemonic generation
**Strategy:**
1. Use Claude/GPT to generate French mnemonics
2. Incorporate French cultural references
3. Make reading mnemonics phonetically memorable
4. Review and edit in batches of 50-100

**Mnemonic guidelines:**
- Use familiar French words/concepts
- Create vivid, memorable images
- Connect reading sounds to French words
- Keep consistent style across levels

### 2.3 Content creation schedule

| Level | Radicals | Kanji | Vocabulary | Status |
|-------|----------|-------|------------|--------|
| 1-3   | 26       | 18    | 18         | ✅ Done |
| 4-10  | ~50      | ~100  | ~300       | 🔲 To do |
| 11-20 | ~50      | ~200  | ~600       | 🔲 To do |
| 21-40 | ~50      | ~400  | ~1200      | 🔲 To do |
| 41-60 | ~50      | ~400  | ~1500      | 🔲 To do |

**Total target:** ~200 radicals, ~2000 kanji, ~6000 vocabulary

---

## Phase 3: User Experience Polish (Priority: Medium)

### 3.1 Onboarding
- [ ] Welcome tutorial for new users
- [ ] Explain SRS system simply
- [ ] Set expectations (daily reviews)

### 3.2 Dashboard improvements
- [ ] Weekly/monthly progress charts
- [ ] Accuracy trends
- [ ] Level-up celebrations
- [ ] Achievement badges

### 3.3 Settings & customization
- [ ] Lessons per day (adjustable)
- [ ] Review batch size
- [ ] Audio on/off
- [ ] Theme options (light/dark)

### 3.4 Mobile experience
- [ ] Test and fix responsive issues
- [ ] Touch-friendly quiz input
- [ ] PWA support (installable)

---

## Phase 4: Advanced Features (Priority: Low)

### 4.1 Audio improvements
- [ ] Pre-generate audio files for all readings
- [ ] Option: ElevenLabs for premium quality
- [ ] Audio for example sentences

### 4.2 Additional study modes
- [ ] Self-study (browse without SRS)
- [ ] Cramming mode (review anytime)
- [ ] Burned items review

### 4.3 Social features
- [ ] Leaderboards
- [ ] Study groups
- [ ] Share progress

### 4.4 Analytics
- [ ] User engagement metrics
- [ ] Content difficulty analysis
- [ ] Drop-off points identification

---

## Phase 5: Monetization (Future)

### Options to consider:
1. **Freemium model**
   - Free: Levels 1-10
   - Paid: Full content access

2. **Subscription**
   - Monthly/yearly plans
   - Premium audio
   - Advanced stats

3. **One-time purchase**
   - Lifetime access

---

## Immediate Next Steps

### This week:
1. [ ] Create JSON content structure
2. [ ] Build import script
3. [ ] Generate levels 4-5 content with AI
4. [ ] Review and refine mnemonics

### Next week:
5. [ ] Generate levels 6-10 content
6. [ ] Test full user journey (new user → level 3)
7. [ ] Fix any bugs found
8. [ ] Deploy with expanded content

---

## Technical Debt / Improvements

- [ ] Add error boundaries for better error handling
- [ ] Add loading skeletons that match component layout
- [ ] Add end-to-end tests (Playwright)
- [ ] Set up CI/CD pipeline
- [ ] Add proper logging/monitoring
- [ ] Database backups strategy

---

## Content Quality Checklist

Before publishing each level:
- [ ] All items have French translations
- [ ] All mnemonics are culturally appropriate
- [ ] No offensive or inappropriate content
- [ ] Readings are accurate (verified against dictionary)
- [ ] Example sentences are natural Japanese
- [ ] Radical-kanji relationships are correct
- [ ] Vocabulary-kanji relationships are correct
