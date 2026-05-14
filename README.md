# WalkWell: Original sketches vs Iteration 1 vs post–user study — full interaction map

This README supports **SIT216 Assessment 2**. It does three things:

1. **Critical timeline (matches your correction):** **Iteration 1** is **night / diurnal context** in **copy, scoring labels, and “Why this route?”** — *not* **Normal vs Shortcut**. **Normal vs Shortcut** + **mode control on route details** + **visual/affordance/map interaction** polish sit in **post–usability study** (blue).
2. **Full baseline:** **Every screen** in the paper → hi-fi spine is named; **every transition** is an **arrow label** (tap / type / save / continue / accept / stay / …).
3. **Mermaid:** Colour classes — **grey** = original corpus, **green** = Iteration 1 (night intelligence), **blue** = after user testing (planning mode + UI polish).

---

## 1. Colour legend (`classDef`)

| Class   | Meaning |
|---------|---------|
| `paper` | **Baseline** (hand-drawn + same-architecture hi-fi): onboarding, profiles, search, routes, nav, breaks, reroute, feedback, alter prefs. |
| `iter1` | **Iteration 1:** **night context** on **route options**, **route details / “Why this route?”** (lighting · activity · crossings), **in-nav reroute** tuned for night (*better-lit, more active*). |
| `post`  | **Post–user study:** **Normal vs Shortcut** planning contract, **expand/return to full comparison** from route details, **dark theme**, **larger map**, **slider affordance**, **draggable map**. |

**Night “Why this route?” (readable wording):** the night screen explains **three separate dimensions** — **better lighting** (well-lit corridors), **more active areas** (busier streets / natural surveillance), **safer crossings** (signals / pedestrian priority). It does **not** mush them into one meaningless slug.

---

## 2. Chart A — **Complete baseline journey** (all screens, all interactions)

*Grey only. Read arrow labels as the **minimum** interaction set you can demo.*

```mermaid
flowchart TB
  subgraph O1["A. First launch / onboarding"]
    W([Welcome])
    H0[[Home on defaults after Skip]]
    S1[Step 1 Value props Safer Cooler Simpler]
    S2[Choose Quick or Detailed setup]
    W -->|Tap Skip for now| H0
    W -->|Tap Set preferences| S1
    S1 -->|Tap Continue| S2
  end

  subgraph O2["B. Quick setup path"]
    Q1["Quick Step 1 of 2 Safety basics plus Heat and Shade"]
    Q2["Quick Step 2 of 2 Time tradeoff slider"]
    PQ[Quick profile summary Save Customise more]
    S2 -->|Pick Quick setup| Q1
    Q1 -->|Tap Continue| Q2
    Q2 -->|Tap Finish| PQ
  end

  subgraph O3["C. Detailed setup path linear"]
    D1[Safety Profile toggles Save]
    D2[Heat and Shade radios Save]
    D3[Crowd Comfort radios Save]
    D4[Rest and Physical toggles Save]
    D5[Social and Cultural toggles Save]
    D6[Time tradeoff slider or list Save]
    PD[Detailed profile summary Save]
    S2 -->|Pick Detailed setup| D1
    D1 -->|Tap Continue| D2
    D2 -->|Tap Continue| D3
    D3 -->|Tap Continue| D4
    D4 -->|Tap Continue| D5
    D5 -->|Tap Continue| D6
    D6 -->|Tap Continue| PD
  end

  subgraph O4["D. Profile hub non-linear edits"]
    ECAT[Category editor eg Safety Shade Crowd Rest Social Time]
    PQ -->|Tap Save| HM[Home hub]
    PD -->|Tap Save| HM
    PQ -->|Tap Customise more| PD
    PQ -->|Tap row or edit| ECAT
    PD -->|Tap row or edit| ECAT
    ECAT -->|Tap Save| PQ
    ECAT -->|Tap Save| PD
  end

  subgraph O5["E. Shell Home Saved Preferences"]
    HM -->|Bottom tab Home| HM
    HM -->|Bottom tab Saved| SV[Saved list or placeholders]
    SV -->|Back or tab Home| HM
    HM -->|Bottom tab Preferences| PF[Preferences entry mirrors profile hub]
    PF -->|Back or finish| HM
    HM -->|Tap Comfort summary or settings chip| PF
    HM -->|Tap Your current location| HM
  end

  subgraph O6["F. Search and destination"]
    HM -->|Tap Where to search| SC0[Search idle saved chips Home Work Uni plus Recent]
    SC0 -->|Tap saved chip| SC1[Search with destination filled]
    SC0 -->|Tap recent row| SC1
    SC0 -->|Type query| SC2[Search suggestions typeahead]
    SC2 -->|Tap suggestion row| SC1
    SC2 -->|No match state| NR[No results found adjust spelling]
    NR -->|Clear or edit query| SC0
    SC1 -->|Tap Find route enabled| LD[Loading Calculating route]
  end

  subgraph O7["G. Planning compare and explain"]
    LD --> RO[Route options list Comfortable Fastest Shaded Quiet etc]
    RO -->|Tap Select on a card| RD[Route details map summary Start navigation]
    RO -->|Scroll compare| RO
    RD -->|Back| RO
    WH1[Why read Shade or heat fit]
    WH2[Why read Safe accessible crossings lighting isolation]
    WH3[Why read Crowd or quiet fit]
    RD -->|Scroll read| WH1
    RD -->|Scroll read| WH2
    RD -->|Scroll read| WH3
    RD -->|Tap Start navigation| NV[Turn by turn navigation map]
  end

  subgraph O8["H. Navigation runtime"]
    NV -->|Tap Pause| PAU[Pause or take a break entry]
    PAU -->|Resume or exit pause| NV
    NV -->|Tap Add stop or Take a break| BR[Comfort stop picker list bench store toilet fountain]
    BR -->|Tap Add break on rows multi select| BR
    BR -->|Tap Continue| NV
    NV -->|Trigger contextual better path| RR[Reroute sheet explicit minutes Stay vs Accept]
    RR -->|Tap Stay on current route| NV
    RR -->|Tap Accept new route| NV
    NV -->|Auto glare heuristic optional| NV
    NV -->|End navigation | HM
    NV -->|Reach destination| AR[Arrived You arrived feedback form]
    AR -->|Select feedback radio optional| AR
    AR -->|Tap Finish| AP[Alter preferences suggested tweaks Done]
    AP -->|Tap Done| HM
  end

  subgraph O9["I. Resume from Home"]
    H0 -->|Same as Home hub entry| HM
  end

  classDef paper fill:#E0E0E0,stroke:#424242,stroke-width:2px,color:#000
  classDef iter1 fill:#C8E6C9,stroke:#2E7D32,stroke-width:2px,color:#000
  classDef post fill:#BBDEFB,stroke:#1565C0,stroke-width:2px,color:#000

  class W,H0,S1,S2,Q1,Q2,PQ,D1,D2,D3,D4,D5,D6,PD,ECAT,HM,SV,PF,SC0,SC1,SC2,NR,LD,RO,RD,WH1,WH2,WH3,NV,PAU,BR,RR,AR,AP paper
```

### Baseline checklist (for figures / video)

| # | Screen / state | Outgoing interactions (labels) |
|---|----------------|--------------------------------|
| A | Welcome | Skip → Home defaults; Set preferences → Step 1 |
| B | Step 1 | Continue → Choose setup |
| C | Choose setup | Quick → Quick 1; Detailed → Safety |
| D | Quick 1 / 2 | Continue / Finish → Quick profile |
| E | Detailed 1…6 | Continue chain → Detailed profile |
| F | Quick / Detailed profile | Save → Home; row tap → Category editor; Quick → Customise more → Detailed |
| G | Home | Tabs Saved / Preferences; tap search; tap comfort summary; location |
| H | Search | Chips / recent / typeahead / Find route / no results |
| I | Loading | → Route options |
| J | Route options | Select → Route details; scroll compare |
| K | Route details | Back; scroll Why; Start navigation |
| L | Navigate | Pause resume Add stop reroute Stay Accept auto glare optional End navigation Arrival |
| M | Break picker | Multi select; Continue |
| N | Arrived | Feedback radios; Finish |
| O | Alter preferences | Done → Home |
| P | Pause | Pause sheet; resume → Navigate |
| Q | End navigation | Exit → Home if prototype allows |

**Explicit feedback radios (baseline / day framing):** *Too hot*, *Too crowded / too busy*, *Felt unsafe*, *Confusing directions* (if present), *Good*. **Night framing** may replace *Too hot* with a lighting-relevant option if that matches your final UI.

---

## 3. Chart B — **Iteration 1 only** (night context: options, why, reroute)

*Green = **added or reframed for after-dark**. Grey = same shell as baseline. **No** Shortcut / Normal here.*

**Intent:** Baseline **already** routes; Iteration 1 **re-weights explanation** so **lighting**, **street activity**, and **crossings** lead at night; **shade / crowd** copy is still in the model but **not the headline** when sun load is irrelevant.

```mermaid
flowchart TB
  subgraph PLAN["Planning layer"]
    NC{Night context after dark or user toggle}
    HM2[Home hub]
    SC[Search Find route]
    LD2[Loading]
    RO[Route options one list presentation]
    HM2 --> SC
    SC --> LD2
    LD2 --> RO
    NC -.->|labels chips scores on cards| RO
    RO --> SEL[Tap Select on one route card]
    SEL --> NC
    NC -->|Yes| RDN[Route details NIGHT summary map Start]
    NC -->|No| RDD[Route details DAY summary map Start]
  end

  subgraph WHYN["Why this route NIGHT three explainers"]
    RDN --> WN1[Better lighting well lit streets most of route]
    RDN --> WN2[More active areas busier corridors]
    RDN --> WN3[Safer crossings signals zebra priority]
    WN1 --> ST[Start navigation same nav shell]
    WN2 --> ST
    WN3 --> ST
  end

  subgraph WHYD["Why this route DAY three explainers baseline"]
    RDD --> WD1[Shade heat fit]
    RDD --> WD2[Safe accessible]
    RDD --> WD3[Low crowd quiet]
    WD1 --> ST
    WD2 --> ST
    WD3 --> ST
  end

  subgraph RUN["Runtime reroute copy"]
    ST --> NV2[Navigate]
    NV2 --> RRn[Reroute NIGHT better lit plus more active explicit plus minutes Stay Accept]
    NV2 --> RRd[Reroute DAY more shaded explicit plus minutes Stay Accept]
    NC -.->|prefer night sheet| RRn
    NC -.->|prefer day sheet| RRd
    RRn -->|Stay| NV2
    RRn -->|Accept| NV2
    RRd -->|Stay| NV2
    RRd -->|Accept| NV2
  end

  classDef paper fill:#E0E0E0,stroke:#424242,stroke-width:2px,color:#000
  classDef iter1 fill:#C8E6C9,stroke:#2E7D32,stroke-width:2px,color:#000
  classDef post fill:#BBDEFB,stroke:#1565C0,stroke-width:2px,color:#000

  class HM2,SC,LD2,RO,SEL,RDD,WD1,WD2,WD3,ST,NV2,RRd paper
  class NC,RDN,WN1,WN2,WN3,RRn iter1
```

**Report honesty:** Baseline already had **reroute + Stay / Accept**. Iteration 1 adds the **night-appropriate promise** (*better-lit and more active*) and **Night Comfort** framing — not “we invented rerouting.”

---

## 4. Chart C — **Post–user study** (Normal vs Shortcut + UI polish)

*Blue = introduced **after** usability testing per your brief. Dashed = overlays same nodes as baseline.*

```mermaid
flowchart TB
  subgraph ENTRY["Planning entry after study"]
    HM3[Home hub]
    TM{Trip planning mode}
    HM3 -->|Open search or plan| TM
    TM -->|Normal full transparency| NORM[Search to Loading to Route options to Route details to Start]
    TM -->|Shortcut low interruption| SHCUT[Search may skip list to Route detail fastest emphasis optional loader]
    SHCUT -->|User expands comparison| NORM
  end

  subgraph RDET["Route details mode control"]
    RD2[Route details screen]
    RD2 -->|Control Normal mode or Expand| NORM
    RD2 -->|Remain in Shortcut contract| SHCUT
  end

  subgraph POLISH["Visual and interaction refinements"]
    P1[Dark theme toggle Settings]
    P2[Larger map on Home and planning previews]
    P3[Time slider ticks read as ticks not fake buttons]
    P4[Draggable pannable map where users expect]
    P1 -.-> HM3
    P2 -.-> HM3
    P3 -.-> TM
    P4 -.-> RD2
  end

  classDef paper fill:#E0E0E0,stroke:#424242,stroke-width:2px,color:#000
  classDef iter1 fill:#C8E6C9,stroke:#2E7D32,stroke-width:2px,color:#000
  classDef post fill:#BBDEFB,stroke:#1565C0,stroke-width:2px,color:#000

  class HM3,NORM,RD2 paper
  class TM,SHCUT,P1,P2,P3,P4 post
```

---

## 5. Optional — **Mentor-style** hub (one page figure)

*Colours: **green** only on night fork node `NC`; **blue** on `TM` if you want one slide that shows both eras.*

```mermaid
flowchart TB
  ROOT([WalkWell Home hub])
  ROOT --> ONB[Onboarding Welcome through profiles Save]
  ROOT --> PREF[Preferences tab and Comfort summary edits]
  ROOT --> SRCH[Search Saved Recent typeahead No results]
  ROOT --> PLN[Plan Loading Route options Route details Start]
  ROOT --> NAV[Navigate Breaks Reroute Arrived Alter prefs]
  NC2{{Night context Iteration 1}}
  NC2 -.-> PLN
  NC2 -.-> NAV
  TM2{{Normal vs Shortcut post study}}
  TM2 -.-> PLN

  classDef paper fill:#E0E0E0,stroke:#424242,stroke-width:2px,color:#000
  classDef iter1 fill:#C8E6C9,stroke:#2E7D32,stroke-width:2px,color:#000
  classDef post fill:#BBDEFB,stroke:#1565C0,stroke-width:2px,color:#000
  class ROOT,ONB,PREF,SRCH,PLN,NAV paper
  class NC2 iter1
  class TM2 post
```

---

## 6. Figures / annotations (Figma / report)

| Figure | Composite | Callouts |
|--------|-----------|----------|
| **F-baseline-strip** | Welcome → Choose setup → one profile → Home | Numbered **①–③** on **Save / Continue / Skip** only |
| **F-night-options** | Route options **day vs night** same destination | **①** Night Comfort % **②** Lighting / Activity / Crossings chips **③** Day shade lead for contrast |
| **F-night-why-three** | One route details night with **three** Why rows | **①** Better lighting **②** More active areas **③** Safer crossings — **separate** callout each |
| **F-night-reroute** | Bottom sheet night vs day | **①** +minutes **②** Stay **③** Accept |
| **F-post-mode** | **Normal** vs **Shortcut** from Home/search | **①** Mode picker **②** Skip list **③** Expand to full comparison |
| **F-post-polish** | Light vs dark; small vs large map | **①** Dark theme **②** Map scale **③** Drag |

---

## 7. Pasteable report paragraph (timeline corrected)

*The hand-drawn flows already defined the **closed-loop comfort walk**: profiles, search, multi-route comparison, transparency (“why”), navigation, optional comfort stops, explicit reroute trade-offs, arrival feedback, and preference adjustment. **Iteration 1** preserves that architecture but adds **diurnal context** so that, **after dark**, route presentation and explanations foreground **lighting**, **street activity**, and **safe crossings** rather than **shade-first** framing. **Usability testing** then motivated **Normal vs Shortcut** as two **planning contracts**, clearer **return to full comparison**, and **presentation fixes**: **dark UI**, **larger maps**, **honest slider affordances**, and **draggable maps**.*

---

## 8. Rendering Mermaid (GitHub-safe)

- One ```mermaid block = one diagram starting with `flowchart` or `graph`.
- In `class A,B,C stylename` always use **commas** between IDs.
- If GitHub fails on complex graphs, paste into [mermaid.live](https://mermaid.live) and export **PNG**.

---

*End. Keep **green** claims aligned with **night context** only; keep **blue** aligned with **post-study** mode + polish.*
