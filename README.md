# WalkWell — Assessment report draft (scaffold for HD-level structure)

*Paste sections into your Word template. Replace bracketed placeholders with your unit-specific details (unit code, ethics approval, real n, dates, citations).*

---

## Introduction

WalkWell is a **walking navigation** application that helps people plan pedestrian routes by balancing **safety**, **shade and heat exposure**, **how busy or quiet** a route feels, **rest and physical comfort** along the way, and **social and cultural** place preferences—so the journey feels **comfortable and considered**, not merely **fast**.

Users can **set preferences quickly or in detail**, **search** for a destination, **compare comfort-aware route options** with transparent trade-offs, and **follow turn-by-turn guidance**. They can **add comfort stops** during navigation and **accept or decline contextual reroute suggestions** when the environment offers a better match to their comfort profile (for example more shade along an alternative path).

This report describes the **system**, **design rationale**, **design evolution** from low-fidelity flows to the current high-fidelity prototype, and—where applicable—how **usability evaluation** informed refinements after structured testing.

---

## System description

### Goals and target users

WalkWell is aimed at **people who walk by choice or necessity** and care about **how** a route feels—not only **how long** it takes. That includes commuters and students, people sensitive to **heat or sun**, people who prefer **quieter or more populated** streets, and people who factor in **lighting, crossings, and amenity** when walking **later in the day**. The product goal is to make **comfort-aware routing legible and adjustable**, so users understand **why** a route is recommended and can **tune** the model without relearning the whole app each trip.

### System capabilities

- **Preference capture:** **Quick** path for essential choices and a **Detailed** path across multiple comfort dimensions, ending in a **profile summary** that can be **saved** and **revisited**.  
- **Context at the hub:** **Home** surfacing **location**, **weather and UV**, and a **readable summary** of the active comfort profile.  
- **Discovery and planning:** **Search** with **recents** and **saved** anchors, **suggestions**, **empty-state handling**, and **route calculation** with an explicit loading state.  
- **Route intelligence (presentation):** **Multiple route alternatives** with **comfort scoring**, **time trade-offs**, and a **“Why this route?”** explanation tied to preferences.  
- **In-trip support:** **Turn-by-turn** presentation, **comfort stop** selection with **clear impact on timing**, and **contextual reroute offers** with explicit costs and benefits.  
- **Closing the loop:** **Post-trip feedback** and optional **preference adjustment** so short-term experience can refine long-term defaults.

### Interactions

At a high level, interactions follow a **closed loop**:

**Onboard / configure → plan (search) → compare routes → start navigation → (optional) reroute or stops → arrive → reflect / adjust → return to hub.**

Within that loop, controls include **tappable cards and list rows**, **toggles** and **radio groups**, **sliders** (including time trade-off), **primary and secondary actions** (for example **Accept** vs **stay on route**), and **persistent navigation** between **Home**, **Saved**, and **Preferences**.

### Functional overview diagram

Include **one** diagram that shows the **main tasks** without micromanaging every screen. Recommended sources:

- Baseline **paper / low-fi spine** (onboarding → home → search → routes → why → navigate → stops / reroute → feedback → alter prefs).  
- Optional second strip: **night context** variants on **route options**, **why this route**, and **in-nav reroute** if that is part of Iteration 1 claims.

If you use Mermaid, keep **colour legend** minimal (for example **grey = baseline**, **green = Iteration 1 contextual copy**, **blue = post-usability refinements**) and place the legend in the figure caption. *(You already have diagram blocks in `WalkWell-Iteration1-Flowcharts-README.md`—export to PNG for the Word document.)*

---

## Design rationale

WalkWell’s interface choices aim to support **understandability**, **control**, and **trust** in an algorithmically assisted navigation product.

- **Visibility of system status:** Clear **defaults messaging**, **preference summaries**, and **explicit trade-offs** on routes and reroutes.  
- **User control and freedom:** **Skip** paths, **non-linear profile editing**, and **decline** options on contextual reroutes.  
- **Consistency and standards:** **Bottom navigation**, familiar **search** patterns, and **primary / secondary** button hierarchy.  
- **Recognition rather than recall:** **Chips**, **icons with text**, and **plain-language** explanations in **Why this route**.  
- **Error prevention and recovery:** **Disabled Find route** until input is usable; **no results** states with guidance; **back** navigation in multi-step setup.  
- **Aesthetic and minimalist presentation:** **Card chunking** in setup and profiles; progressive disclosure from **Quick** to **Detailed**.  
- **Comfort as multi-factor design:** Safety, thermal comfort, social density, amenities, and cultural factors are **separate levers** so users do not have to collapse incompatible needs into one implicit choice.

Where **night walking** is emphasised in Iteration 1, explanatory emphasis can shift toward **lighting**, **street activity**, and **crossings** when those dimensions better explain comfort **after dark**, while preserving the **same underlying preference model**.

---

## Design evolution

The **initial low-fidelity prototype** defined a **six-dimension comfort model**—**safety**; **shade and heat**; **crowd-related comfort**; **rest and physical comfort**; **social and cultural** considerations; and **time trade-off**—and supported **editing the profile by factor** without forcing users to repeat the entire wizard each time.

**Iteration one** of the ** high-fidelity prototype ** retained this architecture but **surfaced it more clearly**: a **labelled stepper** for detailed setup, **sharper safety copy** (including **safer crossings** as a **first-class** control), **richer shade options** (including an explicit **“no shade” / ignore** framing where appropriate), and a **wider time budget** on the **time trade-off** control (**up to about 50 minutes** on the slider) to align with multimodal route comparisons.

One major change in the **detailed setup flow** was the move from a **continuous crowds / “liveliness” control** in the sketches to **four labelled options** in the high-fidelity design. The sketch pattern aimed to represent comfort as a **spectrum** along the quiet–lively axis (a useful research story for “avoid both extremes”). In hi-fi, **discrete categories** prioritise **fast, unambiguous commitment** on a small screen: users can **recognise** a whole-scene description (**Deserted / Quiet / Lively / Noisy**) without **interpolating** a thumb position. The trade-off is **reduced granularity** in the middle of the range. The team should state whether radios are a **deliberate simplification** validated by pilot feedback or a **placeholder** to revisit if granular control proves necessary.

Other notable evolution points (summarise visually in figures, not only here):

- **Welcome and onboarding IA:** earlier **value communication** and **fewer redundant steps** before choosing Quick vs Detailed.  
- **Home hub:** **readable default state**, **bottom navigation**, and **realistic map** presentation.  
- **Reroute and stops:** **explicit minutes** (and sometimes **percentage-style cues**) plus **clear accept / stay** patterns.

**(Feature table — paste into Word and expand rows as needed.)**

| Feature area | Low-fi / sketch behaviour | Hi-fi Iteration 1 behaviour | User need addressed |
|--------------|---------------------------|-----------------------------|---------------------|
| Onboarding entry | Welcome; optional skip; separate “value” step in some flows | Welcome with chips and subtitle; streamlined path to Quick / Detailed | Trust; clarity before commitment; low drop-off |
| Setup depth choice | Quick vs Detailed | Cards with time and scope badges | Honest effort estimate; informed choice |
| Detailed progression | Stepwise dimensions | Labelled six-step stepper | Orientation; reduced feeling “lost” in setup |
| Safety | Core toggles; crossings sometimes bundled | Four toggles; crossings explicit; night-relevant helper copy | Safer routing; legibility after dark |
| Heat / shade | Few discrete levels | More options including ignore-shade framing | Flexibility; night vs day mental models |
| Crowd / liveliness | Spectrum slider | Four radio categories | Speed of choice vs spectrum granularity |
| Time trade-off | Coarse steps in sketches | Slider to ~50 min (+ minute marks) | Match real route trade-offs |
| Profile hub | Per-factor return / save | Card summaries with edit affordances | Iterative tuning without replay |
| Home | Search + weather + preferences strip | Same story + defaults banner + bottom nav | System status; global IA |
| Search / routes | Compare comfort vs speed | Suggestions, empty state, cards, “Why” | Transparency; informed selection |
| Navigation | Reroute with trade-off | Offers + post-accept feedback | Agency; informed switches |
| Stops | Comfort spots | List with impact and ETA timeline | Predictability of detours |
| Post-trip | Feedback; alter prefs | Structured options + sliders | Close learning loop |

---

## Pre-user testing

Before structured usability sessions, the prototypes were typically refined through:

- **Heuristic review** against common usability principles (status visibility, error handling, consistency, hierarchy).  
- **Walkthroughs** with peers or supervisors on **task completeness** (can a user complete setup, plan a route, navigate, and finish without dead ends?).  
- **Prototype fidelity checks** ensuring **copy**, **states** (loading, empty, success), and **flows** match the documented comfort model.

Briefly list **what you actually did** (number of informal sessions, checklist review, etc.).

---

## Post-user testing

Summarise **what changed after** usability evaluation. Typical themes (replace with **your** findings):

- **Visual design:** **dark mode** or contrast refinements for glare or evening use.  
- **Map interaction and size:** larger preview, **pannable** map if users expected gestures.  
- **Affordance clarifications:** controls that looked like independent buttons (for example **time “chips”**) restyled so they read as **scale marks** not extra actions.  
- **Copy and discoverability:** clearer exits, labels, or onboarding hints if tasks failed or slowed.

Use **short quantitative claims** only if grounded in your spreadsheet (for example “7/10 participants noticed X”).

---

## Future changes

Plausible directions (tailor to your roadmap):

- **Stronger personalisation** from repeated trips (weighting feedback without overfitting one bad day).  
- **Richer accessibility** (motor, vision, cognitive) and **localisation**.  
- **Data realism** tied to Australian pedestrian and amenity datasets where appropriate for assessment scope.  
- **Further night / diurnal** presentation rules co-designed with target users.  
- **Resolving** any known **content QA** issues (duplicate headings, placeholder strings).

---

## Usability evaluation

### Study design

State whether the study was **within-subjects** or **between-subjects**, **moderated** or **unmoderated**, **remote** or **lab**, and what **prototype medium** was used (Figma prototype, device, etc.).

### Participants and recruitment

Target **n** (for example 8–12 for coursework), **inclusion criteria** (walks regularly, age range, access to device), **recruitment channel** (class pool, friends-and-family with limits), and **diversity** notes appropriate to ethics.

### Tasks

List **3–6 scenario tasks**, for example:

1. Complete **Quick** setup and save.  
2. Adjust one **Detailed** dimension from the profile and return.  
3. Search a destination and **compare** routes using **Why this route**.  
4. **Accept** a reroute offer (or decline).  
5. Add a **comfort stop** and confirm timing impact.  
6. Complete **post-trip** feedback.

Include **success criteria** (what counts as task success).

### Data collected

Examples: **task completion**, **time on task**, **error counts**, **SUS or RAW-NASA** (if used), **think-aloud themes**, **short debrief questions**.

### Method

Describe **sessions** (length), **scripting**, **note-taking**, and how **videos** or **logs** were stored (**de-identification**).

### Ethical considerations

Consent, voluntary participation, withdrawal, privacy of recordings, storage duration, minimal personal data, **risk** language suitable for coursework (reference **HREC** only if actually approved).

### How findings informed the final iteration

Cross-link **each major finding** to a **visible UI change** (map, dark theme, slider styling, copy). If a finding did **not** change the UI (time/budget), say so honestly.

---

## Conclusion

WalkWell addresses a **real gap** in consumer navigation: routes are rarely explained in terms of **pedestrian comfort** across **multiple dimensions**. The **low-fidelity** work established a credible **six-factor** model and **closed-loop** journey (configure → plan → explain → navigate → reflect). **Iteration one** translated that model into a **coherent visual system** with **clearer status**, **stronger onboarding**, and **more explicit trade-offs** on routes and reroutes. **Usability evaluation** sharpened **affordances** and **presentation** where prototype testing revealed mismatches with user expectations.

Limitations include **prototype fidelity**, **sample size**, and **simulated routing data** in a student project context. Future work should **tie claims to evaluation evidence** and extend **accessibility** and **real-world data** proportionate to deployment goals.

---

## Minor edits to your evolution paragraph (grammar / flow)

You can replace your draft with:

*The initial low-fidelity prototype defined a six-dimension comfort model—safety; shade and heat; crowd-related comfort; rest and physical comfort; social and cultural considerations; and time trade-off—and allowed the profile to be edited per factor without repeating every step. Iteration one of the high-fidelity prototype preserved this architecture but presented it more clearly through an appealing labelled stepper, sharper safety copy (including safer crossings as a first-class control), richer shade options (including an explicit “ignore shade” framing), and a wider time trade-off range (up to about fifty minutes) via the slider.*

*A major detailed-setup change was replacing sketch crowd comfort expressed as a continuous spectrum with four predefined options. While the slider supported a middle-ground story for people who dislike both emptiness and crowding, discrete categories prioritise fast, unambiguous choice on mobile at the cost of granularity. The design rationale should state whether this simplification was intentional pending testing or an open point for refinement.*

---

*End scaffold. Trim subsections if your page limit requires; keep figures and one usability table over long unfounded claims.*
