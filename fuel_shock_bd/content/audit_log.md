# Research Pass 1 — Raw Log

**Question:** How will the September 2026 fuel price spike (Tk 145 → 165 octane; diesel Tk 115 → 135) affect Bangladesh?
**Date of pass:** 21 September 2026 (day the hike took effect)
**Purpose:** Complete audit trail — the originating conversation, every search run, every figure extracted, its source, and every derived calculation. This is the working file behind `README.md`.

**Verification status legend**
- `[REPORTED]` — stated in a cited source
- `[DERIVED]` — computed in this pass from reported inputs; method shown
- `[ASSUMED]` — parameter chosen by this pass; stated so it can be challenged
- `[UNVERIFIED]` — claim carried in from the originating conversation, not independently confirmed

---

## Part 1 — The originating conversation

This pass began from a prior conversation (another assistant) that the user pasted in. Recorded verbatim in substance, because Pass 1's first job was to check its claims.

### 1.1 User's opening prompt
> "Do an analysis of fuel cost vs avg income of every country"

### 1.2 Prior assistant's response — global fuel affordability framework

Defined **fuel affordability** as the percentage of average monthly income needed for a 50-litre tank, and argued absolute pump price does not determine pain. Four archetypes:

| # | Archetype | Pump price | 50L as % of monthly income | Examples |
|---|---|---|---|---|
| 1 | High income, high fuel cost (European/Nordic) | $1.90–2.35/L | 2.0–3.5% | Norway, Denmark, Germany, Netherlands, UK |
| 2 | High income, low/moderate cost (US & Gulf) | $0.50–1.15/L | 0.8–1.8% | USA, Switzerland, Qatar, UAE, Saudi, Australia |
| 3 | Low/middle income, subsidised pump (State-Buffer) | $0.05–0.75/L | 5–15% | Egypt, Algeria, Iran, Venezuela, Malaysia, Indonesia |
| 4 | Low/middle income, market/taxed pump (High Fuel Stress) | $0.95–1.30/L | 25–60%+ | India, Pakistan, Nigeria, Kenya, Madagascar, Philippines |

Affordability matrix it provided (all figures `[UNVERIFIED]`, described by the source itself as estimates):

| Country | Fuel price ($/L) | 50L tank ($) | Avg monthly net wage ($) | % of income per 50L |
|---|---|---|---|---|
| United States | 0.95 | 47.50 | 4,400 | 1.1% |
| Switzerland | 2.05 | 102.50 | 6,600 | 1.6% |
| Australia | 1.20 | 60.00 | 3,500 | 1.7% |
| Japan | 1.15 | 57.50 | 2,300 | 2.5% |
| United Kingdom | 1.85 | 92.50 | 3,100 | 3.0% |
| Germany | 1.95 | 97.50 | 3,150 | 3.1% |
| China | 1.15 | 57.50 | 1,100 | 5.2% |
| Brazil | 1.15 | 57.50 | 600 | 9.6% |
| South Africa | 1.25 | 62.50 | 550 | 11.4% |
| India | 1.20 | 60.00 | 400 | 15.0% |
| Pakistan | 1.00 | 50.00 | 160 | 31.3% |
| Nigeria | 0.75 | 37.50 | 110 | 34.1% |
| Madagascar | 1.30 | 65.00 | 105 | 61.9% |

Its three takeaways: the "illusion of cheap gas" (a Nigerian at $0.75/L faces ~30× the strain of an American at $0.95/L); inflation multipliers where 50L exceeds 20% of pay; and subsidy traps (Nigeria pre-reform, Egypt, Sri Lanka) where decoupling from world crude ends in fiscal deficits and devaluation.

### 1.3 User's follow-up — the actual question, and the lived observations
> "Compare to bd and recently the gov increased the fuel price from 145 to 165. The price was 125 a year ago too! Massive spike out of nowhere and gov employees get wage increase (50-200%) but private sector gets nothing. Autorikshas flood the road loadshedding spike too."

Four distinct claims to test — this drove the whole search plan:
1. Price path 125 → 145 → 165 within about a year
2. Government wage increase of 50–200%, nothing for the private sector
3. Autorickshaws flooding the roads
4. Load shedding spiking

### 1.4 Prior assistant's second response — tier placement
Introduced a second benchmark, the **work-time metric** (hours/minutes of labour per litre), and placed Bangladesh at **~31% of average monthly income per 50L tank**, ranking it among the ~20–25 most fuel-stressed of 130+ tracked nations, but "not the single worst." Its tier table `[UNVERIFIED]`:

| Tier | % of monthly income (50L) | Work time per 1L | Representative countries |
|---|---|---|---|
| Top (hyper-affordable) | 0.5–2.0% | 1–4 min | US, Qatar, UAE, Switzerland, Australia |
| Upper middle | 2.0–5.0% | 5–9 min | UK, Germany, France, Japan, South Korea |
| Middle stress | 5.0–15.0% | 10–25 min | China, Brazil, Mexico, India |
| Severe stress | 20.0–35.0% | 40–60 min | **Bangladesh (~31%)**, Pakistan (~31%), Nigeria (~34%), Sri Lanka |
| Extreme fuel poverty | 50% to >100% | 90–200+ min | Madagascar, Malawi, Rwanda, Zimbabwe, Mozambique |

Also argued: landlocked transport premiums (Malawi fuel $3.00–3.80/L on sub-$100 wages) and post-subsidy shock plus currency collapse (Nigeria) explain the countries worse than Bangladesh. And for Bangladesh specifically — regional outlier in South Asia at roughly double India's ~15%; private four-wheeler use restricted to the top income decile; secondary transmission through diesel freight, logistics and backup generation into food prices and transit fares.

### 1.5 The user's final instruction
> "FROM THIS FIND OUT HOW TO RECENT SPIKE TO 145 then 165 taka for fuel in bd is gonna effect BD."

**Judgment made at the start of this pass:** the inherited affordability numbers are estimates of unstated provenance, and the Bangladesh figure in particular rests on a wage denominator that was never disclosed. Pass 1 therefore verifies the event first, then rebuilds the affordability arithmetic with explicit, cited denominators, then works the transmission channels. Every inherited number is treated as a hypothesis, not an input.

---

## Part 2 — Search log

14 web searches and 5 targeted page fetches. Queries recorded verbatim.

### S1. `Bangladesh fuel price increase 165 taka octane petrol 2026`
Confirmed the event. All four products +Tk 20/L. Octane 145→165, petrol 140→160, kerosene 135→155, diesel 115→135 (+17.4%). Effective midnight 21 September 2026. Reasons given: international prices more than doubled since March 2026; freight up on regional instability; BPC losses Tk 228.76bn (US$1.9bn) March–August; hike expected to cut annual losses ~Tk 100bn, conserve FX, curb smuggling to neighbours. Follows hikes in April and June.

### S2. `Bangladesh BPC fuel price September 2026 diesel octane petrol per litre`
Cross-confirmed. Prices held at diesel 115 / octane 145 / petrol 140 / kerosene 135 from 1–20 September, then stepped on the 21st. Gave the clean before/after table.

### S3. `Bangladesh fuel price hike April June 2026 diesel octane price history timeline`
Built the price path. **April 18, 2026:** diesel +15 → 115, octane +20 → 140, petrol +19 → 135, kerosene +18 → 130 (called a record high at the time). **June 2026:** all except diesel +5 → octane 145, petrol 140, kerosene 135. Confirmed the **automatic pricing mechanism introduced 2024**, adjusting periodically on international trends, exchange rate and import cost. *This search is what let the pre-April baseline be back-computed — see D1.*

### S4. `Bangladesh inflation rate 2026 food inflation BBS August 2026`
August 2026 (BBS): general **8.26%** (second consecutive monthly easing, from 8.32% in July); food **7.02%** (from 7.16%); non-food **9.32%** (up from 9.28%). Month-on-month general index +2.31%, food +3.86%.

### S5. `Bangladesh government pay scale increase 2026 salary hike public employees`
Largest civil service pay rise since independence. Grades 1–10 basic up to **+100%**; grades 11–20 up to **+142%**. Lowest basic Tk 8,250 → **20,000**; highest Tk 78,000 → **1,56,000**. **24 lakh employees + 9 lakh pensioners**; first award in 11 years. Cost **Tk 1,05,580 crore**. Phased over three years — 50% of the basic increase in year one, remainder in year two, house rent and allowances in year three. New: Tk 3,000/month disabled-child allowance; mobile allowance extended to all 20 grades. **Confirms user claim #2 on the government side.**

### S6. `Bangladesh loadshedding 2026 power crisis furnace oil diesel electricity generation gas shortage`
**Confirms user claim #4.** Most serious electricity crisis since the government took office in February 2026. Gas supply at a **16-year low** in July–August 2026; daily load shedding exceeded **3,500 MW** at peak. Grid needs ~3,800 mmcfd, got about half. Gas plants: 12,200 MW capacity producing max 5,200 MW. PDB covering the gap with ~**3,000 MW of furnace oil** plus diesel peakers at peak hours. **71 of 143 power plants** idle or well below capacity. Rural consumers 7–8 hrs of cuts daily, some up to 10; rural co-ops serving ~40 million people absorbed ~3,000 MW of the cuts while Dhaka fared better. Causes: Moheshkhali LNG terminal fire (21 July), rough seas idling the second floater, declining domestic gas, and **QatarEnergy force majeure after Hormuz strikes — Qatar had supplied ~60% of LNG**.

### S7. `Brent crude oil price September 2026 Hormuz war oil shock price per barrel`
The upstream cause. Brent $92.30 (1 Sep) → $99.05 → $101.21 (highest close since 22 May) → **$103.87 (18 Sep)**. **Hormuz throughput collapsed 21.6 → 4.9 mbd between Q4 2025 and Q2 2026, −77%.** East-West Crude Oil Pipeline shutdown 11 September. Goldman: Brent could exceed **$120 in 2027** if Gulf output stays 4 mbd below prewar.

### S8. `Bangladesh taka exchange rate dollar 2026 foreign exchange reserves import bill oil`
USD/BDT **123.03** (8 Sep 2026); 2026 average 122.69, range 121.10–124.02; taka −1.09% over 12 months. Reserves **$29.47bn** (IMF BPM6 method); gross reserves $35.1bn in February. Bangladesh Bank bought **$4.3bn** from the interbank market this fiscal year.

### S9. `Bangladesh bus fare increase 2026 transport fare hike after fuel price CNG`
The April precedent, which became the pass-through benchmark. Bus fares **+11 paisa/km**: Dhaka/Chattogram metro Tk 2.45 → **2.56**; 52-seat inter-district Tk 2.12 → **2.23**. Owners demanded **28 paisa**, citing maintenance and the dollar; government limited it to 11 "considering public interest." **Diesel buses only — CNG fares unchanged.** Fares to adjust automatically with fuel prices in future. Launch fares raised up to **18 paisa/km**. Separately: "bus fares surge unchecked" after the hike, and a 2022 precedent of fares raised **as much as 22%** after a record hike.

### S10. `Bangladesh battery run rickshaw autorickshaw 2026 flood roads unemployment Dhaka`
**Confirms user claim #3.** **97%** of battery rickshaws and ~86% of pedal rickshaws unregistered. Innovision survey: **21.35% of battery rickshaw drivers were previously farmers** — the largest occupational group. Battery cost may force fleet reductions and significant unemployment. Government considering relocating them outside metropolitan areas to fix traffic "without creating new unemployment."

### S11. `battery run rickshaw electricity consumption Bangladesh megawatt charging load estimate crore units`
The grid-load link. Estimates vary by source: ~500 MW daily for ~60 lakh vehicles; **CPD: e-three-wheelers ≈ 5% of total national generation, ~750 MW**; another range **800 MW–1 GW ≈ 5% of generation**. Per vehicle 4–9 kWh/day. In Dhaka: **3,300 authorised charging stations versus ~48,136 illegal charging points.** August 2026: government **mandated solar charging** for millions of electric rickshaws.

### S12. `Bangladesh average monthly income labour force survey BBS per capita income 2026 median wage taka`
The denominators the inherited 31% lacked. Average gross monthly salary **Tk 18,000 (~$149)**; **median monthly income Tk 9,000 (~$75)**; minimum wage **Tk 12,500** (since 1 Dec 2023). GDP per capita $2,960 nominal / $10,850 PPP (2026 est.). Labour force 77.36 million (2024).

### S13. `Bangladesh furnace oil price 2026 power generation cost per unit diesel peaking plant taka kWh`
The fuel nobody was discussing. **Furnace oil Tk 70.10 → 94.69 (April, +Tk 24) → 113.54 (May).** Private oil-fired plants received capacity payments of **BDT 9.5/kWh** in FY2024-25. Average generation cost rose BDT 6.61 → 11.33/kWh between FY2020-21 and FY2022-23. Bangladesh runs **10.7% of generation on oil** versus India 0.02%, Pakistan 0.6%, Vietnam 0.06%. Government spending ~**Tk 1.2bn/day** on fuel-oil generation.

### S14. `Bangladesh private sector wage growth 2026 real wages minimum wage garment workers inflation`
The other half of user claim #2. RMG minimum wage **Tk 12,500**, +56% from Tk 8,000, set December 2023 after protests; **9% annual increment**. **No fixed increment system in the private sector** — employer discretion. **National wage growth 8.05% against 8.26% inflation → real wages negative.** Garment wages "barely increased since 2019" in real terms. Minimum wage adequate rurally, short of urban (especially Dhaka) cost of living.

### S15. `Bangladesh fuel price hike protest reaction September 2026 opposition Tarique Rahman government criticism`
Political constraint. **PM Tarique Rahman publicly apologised over the electricity and fuel crisis on 5 September and warned against anarchy**; said the government is open to opposition input. **Second fuel hike since the BNP government took office in February 2026.** Energy division statement: "the ongoing war in the Middle East has caused a significant increase in the international prices of all types of petroleum products and freight charges since March 2026, and the upward trend continues." Global context: fuel-price protests across multiple countries mid-September (CNN, 15 Sep). Government to be "tougher against fuel hoarding, smuggling."

### S16. `Bangladesh GDP growth forecast 2026 revised 3.9% job losses remittances Gulf crisis returning migrants`
Macro damage. **FY2025-26 GDP growth cut from 4.6% to 3.9%** on the Middle East conflict plus domestic fragilities. **Gulf states ≈ 3.0% of GDP in remittances ≈ 50% of total inflows.** Poverty exits cut from **1.7 million to 0.5 million** in FY2026. **Real wages already negative for low-income and unskilled workers across agriculture, industry and services.**

### S17. `Bangladesh diesel irrigation boro season cost farmers 2026 agriculture subsidy`
The largest forward-looking channel. Boro irrigation **Tk 3,500–4,000/bigha**, hitting **Tk 6,000** during fuel shortages in Chuadanga. **~15 lakh shallow tube wells** run on diesel. Diesel reportedly sold **Tk 15–80/L above regulated price** in some regions. **Boro is >55% of total rice production, ~21–22 million tonnes.** Existing mechanisation subsidies (70% haor / 50% elsewhere) cover combine harvesters, not diesel. Experts calling for direct cash support.

### S18. `Bangladesh garment RMG factories diesel generator cost 2026 export competitiveness energy crisis production loss`
Export channel. Factories paying a **Tk 10/L premium** for generator diesel; some burning up to **$25,000/day (Tk 30 lakh)** on alternative fuels; smaller units ~**Tk 40,000/day** with 3–4 hours of outages. **Production capacity down 20–30%**; knit composite and woven washing plants at **50% or less**. Risk of losing orders to India, Pakistan, Vietnam.

### S19. `Bangladesh LDC graduation November 2026 duty free access RMG exports impact`
The collision date. **Graduation 24 November 2026.** LDC status currently gives duty-free access to EU, UK, Canada, Japan covering **75–78% of exports**; RMG is >80% of export earnings and 4m+ workers. Post-transition tariffs **9–12% EU, 7–13% Japan, 16–18% Canada**; estimated **6–14% drop in export earnings, $1–7bn/yr** (WTO warning of up to $8bn ≈ 14% of exports). **EU/UK/Canada grace periods to November 2029.**

### S20. `Bangladesh BPC losses subsidy 2026 fuel smuggling India automatic pricing formula next adjustment`
BPC mechanics. Losses **Tk 22,875.66 crore March–August 2026**, driven by global prices rising without domestic adjustment — **the automatic formula exists but was not applied after March.** India's prices are deliberately built into the formula to deter cross-border smuggling. Formula components: import cost at the payment-day exchange rate, plus customs tax, dealer commission, BPC development cost, operating expense, transport, and a small margin; **monthly** adjustment. Precedent exists for cuts (Tk 2/L reduction under the formula).

### Fetch F1 — Daily Star, "Fuel prices hiked by Tk 20 a litre"
Prices, effective date, April comparison. Notably contained **no** rationale, BPC figures, impact estimate, official quotes, or mention of transport/irrigation/power effects — pure price reporting. Recorded because the absence is itself informative about the announcement's framing.

### Fetch F2 — Daily Star, "Fuel price hike lays bare stress on economy" (April)
The April analogue, used to calibrate expectations. Energy Minister Iqbal Hassan Mahmood Tuku: "Fuel must be purchased with foreign currency. By increasing prices slightly, we are trying to keep the situation at a 'tolerable level.'" Transport associations proposed city fare rises **up to 64%** and long-distance up to Tk 3.80/km; waterways proposed **36–42%**. Agricultural economist **Jahangir Alam Khan**: severe Boro risk at peak irrigation demand, threatening yields across irrigation, harvesting, transport and marketing. **Prof Mustafizur Rahman (CPD)**: will "erode purchasing power after prolonged inflation, while raising costs across transport, industry, and trade." **Zahid Hussain (ex-World Bank)** supported the adjustment — subsidies "drained public funds and disproportionately benefited wealthier groups." BPC raised supply targets from 20 April: diesel +17.5%, octane +25.9%, petrol +20.6%.

### Fetch F3 — Daily Star, "BPC may run out of funds for fuel imports in Oct" ⚠️ **the decisive find**
- Working capital **Tk 12,368 crore** (6 September) — enough for September import payments only
- Stated minimum need **Tk 15,000–20,000 crore** (two months of imports)
- Accumulated losses March–August **Tk 22,876 crore**
- **August import spend Tk 7,603 crore versus Tk 2,741 crore the same month a year earlier (+177%)**
- August duties/taxes on diesel: **Tk 32.44/litre**
- Already withdrawn **Tk 19,500 crore** from development project accounts; **Tk 1,679.72 crore** left
- Further obligations: Tk 524 crore (September, LPG tank land), Tk 690 crore by December (Single Point Mooring), Tk 3,500 crore development costs through December
- **BPC's own proposed September prices vs what the government set: diesel Tk 187 vs 135; petrol 150 vs 160; octane 154 vs 165; kerosene 146 vs 155**
- **October 2026: risks exhausting funds for opening letters of credit**
- State Minister for Energy Aninda Islam Amit: "The government is treating all matters related to ensuring uninterrupted fuel imports as a priority." BPC "does not expect the funding crunch to disrupt fuel supplies immediately."

### Fetch F4 — TBS, "Fuel prices hiked by Tk20 per litre"
Percentages: diesel **17.4%**, petrol **14.3%**, octane **13.8%**, kerosene **14.8%**. Government kept prices through August "despite doubling international costs." Rationale: reduce BPC losses, prevent smuggling, maintain electricity and gas subsidies. **BPC loss Tk 89/L on diesel; ~Tk 109 crore/day; ~Tk 40,000 crore/year annualised; hike saves ~Tk 10,000 crore/year.** Regional diesel comparison: **Bangladesh 135, India 134.76, Myanmar 164.83, Nepal 161.24, Pakistan 185.48.** Reactions — **Dr Fahmida Khatun (CPD)**: "wide-ranging consequences," transport costs into food prices, disproportionate burden on the poor. **Anwar-ul Alam Chowdhury Parvez (BCI)**: "more than 15% increase without consulting anyone," intensified inflation, reduced export competitiveness. **Shams Mahmud (Bangladesh-Thai Chamber)**: necessary buffering but adds inflationary pressure on already-weakening export industries. **No statement on further hikes, rationing or supply restrictions.**

### Fetch F5 — CPD, Fahmida Khatun on the hike
"Substantial policy intervention, especially when inflation and household financial pressure are already high"; may "intensify inflation, reduce household consumption and weaken growth." Lower-income families disproportionately burdened. **Irrigation: 70% of pumps diesel.** Manufacturing hit on generators and logistics; small businesses most vulnerable. Recommendations: disclose the price calculation transparently, prevent excessive fare rises and market manipulation, targeted support for low-income households, small farmers and public transport users. **No quantified projections offered** — which is why Part 4 builds its own.

### Fetch F6 — Daily Star editorial, "Hurrah for some, pain for many"
The distributional case. 24 lakh employees and 9 lakh pensioners gain after an 11-year freeze; the general population bears inflation and reduced public services because the government lacks revenue and must borrow. **Implementation cost Tk 1,05,580 crore. Last year's tax revenue shortfall Tk 88,000 crore against a Tk 5,03,000 crore target. Projected job losses from regional instability: 6,00,000. Growth forecast cut 4.5% → 3.9%.** Contains **no** private-sector wage data — only a suggestion that the private sector "align its pay structures without putting additional strain on the economy." *Noted as a gap the log fills from S14.*

### Fetch F7 — search on mitigation measures
**Family Card**: digital social safety-net programme launched by the Ministry of Social Welfare **10 March 2026**, unifying poor and low-income families in one database for direct financial and food assistance. Cash transfers/vouchers suggested as the effective instrument. No TCB/OMS measures found tied to this specific hike. World Bank has a fuel-market-volatility support factsheet (May 2026).

---

## Part 3 — Consolidated data table

### 3.1 Price path, Tk/litre `[REPORTED]` except D1

| Fuel | Pre-18 Apr `[DERIVED D1]` | 18 Apr | June | 21 Sep | Δ since March `[DERIVED]` | Δ this hike |
|---|---|---|---|---|---|---|
| Diesel | 100 | 115 | 115 | **135** | +35.0% | +17.4% |
| Petrol | 116 | 135 | 140 | **160** | +37.9% | +14.3% |
| Octane | 120 | 140 | 145 | **165** | +37.5% | +13.8% |
| Kerosene | 112 | 130 | 135 | **155** | +38.4% | +14.8% |
| Furnace oil | 70.10 | 94.69 | 113.54 (May) | 113.54 | **+62.0%** | n/a |

### 3.2 BPC position

| Item | Value | Source |
|---|---|---|
| Losses, March–August 2026 | Tk 22,875.66 crore | F3, F4, S1 |
| Loss per litre, diesel, pre-hike | Tk 89 | F4 |
| Daily diesel loss, pre-hike | Tk 109 crore | F4 |
| Annualised diesel loss run-rate | ~Tk 40,000 crore | F4 |
| Claimed annual saving from hike | ~Tk 10,000 crore | F4 |
| Working capital, 6 Sep 2026 | Tk 12,368 crore | F3 |
| Stated minimum working capital | Tk 15,000–20,000 crore | F3 |
| Drawn from development accounts | Tk 19,500 crore (Tk 1,679.72 crore left) | F3 |
| August import spend | Tk 7,603 crore (vs Tk 2,741 crore YoY, +177%) | F3 |
| Duties + taxes on diesel, August | Tk 32.44/litre | F3 |
| BPC proposed September diesel price | Tk 187 (government set 135) | F3 |
| LC funding exhaustion risk | October 2026 | F3 |

### 3.3 Macro

| Indicator | Value | Source |
|---|---|---|
| Inflation, general, Aug 2026 | 8.26% (2nd month of easing) | S4 |
| Inflation, food / non-food | 7.02% / 9.32% | S4 |
| MoM general index | +2.31% | S4 |
| National wage growth | 8.05% (below inflation) | S14 |
| USD/BDT | 123.03 | S8 |
| Reserves (BPM6) | $29.47bn | S8 |
| GDP growth FY26, revised | 3.9% (from 4.5–4.6%) | S16, F6 |
| Projected job losses | 600,000 | F6 |
| Poverty exits FY26 | 0.5m (from 1.7m pre-conflict) | S16 |
| Gulf share of remittances | ~50% of inflows, ~3% of GDP | S16 |
| Brent, September 2026 | $92–104 | S7 |
| Hormuz throughput | 4.9 mbd (from 21.6, −77%) | S7 |

### 3.4 Wages

| Group | Level | Change | Source |
|---|---|---|---|
| Govt grades 1–10 | — | basic up to +100% | S5 |
| Govt grades 11–20 | lowest 8,250 → 20,000 | up to **+142%** | S5 |
| Govt highest basic | 78,000 → 1,56,000 | +100% | S5 |
| Covered population | 24 lakh + 9 lakh pensioners | first rise in 11 years | S5 |
| Cost / phasing | Tk 1,05,580 crore over 3 years | 50% of basic in year 1 | S5 |
| RMG minimum wage | Tk 12,500 (since Dec 2023) | +9%/yr increment only | S14 |
| Private sector generally | no mechanism | employer discretion | S14 |
| Average gross salary | Tk 18,000 (~$149) | — | S12 |
| Median monthly income | Tk 9,000 (~$75) | — | S12 |

### 3.5 Power and e-rickshaws

| Item | Value | Source |
|---|---|---|
| Peak load shedding, Jul–Aug 2026 | >3,500 MW | S6 |
| Gas supply | 16-year low; ~half of 3,800 mmcfd need | S6 |
| Gas plants | 12,200 MW capacity → max 5,200 MW output | S6 |
| Idle/derated plants | 71 of 143 | S6 |
| Furnace-oil generation | ~3,000 MW; ~Tk 1.2bn/day | S6, S13 |
| Oil share of generation | 10.7% (India 0.02%, Pakistan 0.6%) | S13 |
| Rural outages | 7–8 hrs/day, up to 10 | S6 |
| e-3W grid load | 500 MW–1 GW ≈ 5% of generation | S11 |
| e-3W per-vehicle draw | 4–9 kWh/day | S11 |
| Dhaka charging points | 3,300 authorised vs ~48,136 illegal | S11 |
| Unregistered battery rickshaws | 97% | S10 |
| Drivers who were farmers | 21.35% | S10 |

### 3.6 Agriculture and industry

| Item | Value | Source |
|---|---|---|
| Diesel share of irrigation pumps | ~70% | F5 |
| Diesel shallow tube wells | ~15 lakh | S17 |
| Boro share of rice output | >55%, 21–22 mn tonnes | S17 |
| Irrigation cost/bigha | Tk 3,500–4,000 (to 6,000 in shortages) | S17 |
| Rural diesel over-pricing | Tk 15–80/L above regulated | S17 |
| Boro procurement price | held at old level | S17 |
| PDB dues sought pre-Boro | Tk 9,750 crore | S17 |
| RMG output loss | 20–30% (washing plants ≤50%) | S18 |
| Generator diesel premium | Tk 10/L over pump | S18 |
| Factory fuel spend | Tk 40,000/day small; up to $25,000/day large | S18 |
| LDC graduation | 24 Nov 2026; grace to Nov 2029 | S19 |
| Post-graduation tariffs | EU 9–12%, Japan 7–13%, Canada 16–18% | S19 |
| Export loss estimate | 6–14% ($1–8bn/yr) | S19 |

---

## Part 4 — Derived calculations

Every number in `README.md` marked `[est.]` is defined here.

**D1 — Pre-April baseline prices.** April hike deltas subtracted from April levels: diesel 115−15=**100**; petrol 135−19=**116**; octane 140−20=**120**; kerosene 130−18=**112**. → Cumulative since March: diesel **+35.0%**, petrol **+37.9%**, octane **+37.5%**, kerosene **+38.4%**. *Note: the user recalled octane at 125 a year ago; 120 is the immediate pre-April level. Both are consistent with a formula drifting in the 120–131 band through 2025. Octane 125 → 165 = +32% year-on-year.*

**D2 — 50L octane affordability.** 50 × 165 = Tk 8,250 = **$67.07** at 123.0 BDT/USD.
- ÷ 18,000 avg gross = **45.8%**
- ÷ 12,500 RMG minimum = **66.0%**
- ÷ 20,000 new govt lowest basic (fully phased) = **41.3%**
- ÷ 9,000 median = **91.7%**
- A year ago at Tk 125: 6,250 ÷ 18,000 = **34.7%**
- *Reconciliation of the inherited 31%:* 8,250 ÷ 0.31 implies a monthly wage of **Tk 26,600 (~$216)** — above Bangladesh's average gross salary and roughly 3× the median. The inherited figure was not wrong so much as computed against an undisclosed and unrepresentative denominator.

**D3 — Work-time per litre.** At 208 hrs/month: avg wage Tk 86.54/hr → 165 ÷ 86.54 = **1.91 hrs = 1h 54m**. Median Tk 43.27/hr → **3.81 hrs = 3h 49m**. RMG Tk 60.10/hr → **2h 45m**. Diesel at avg wage: 135 ÷ 86.54 = **1.56 hrs = 94 min**. → Places Bangladesh in the inherited table's *Extreme Fuel Poverty* band (90–200+ min/L), not *Severe Stress* (40–60 min).

**D4 — Diesel gap closure.** BPC formula price 187 − pre-hike 115 = **Tk 72 gap**; Tk 20 passed = **27.8% closed**; **Tk 52 remaining**. Note the flat Tk 20 *over*-recovers on petrol (160 vs 150 proposed), octane (165 vs 154) and kerosene (155 vs 146) — a cross-subsidy from those three to diesel that still leaves diesel short.

**D5 — Diesel volume and saving cross-check.** Implied throughput = 109 crore/day ÷ Tk 89/L = **~12.2 mn L/day**. Saving = 20 × 12.24m × 365 = **~Tk 8,900 crore/yr** against the government's claimed ~Tk 10,000 crore. ✓ Internally consistent, which corroborates the reported loss figures. Post-hike loss = 89 − 20 = **Tk 69/L**; daily **~Tk 85 crore**; annualised **~Tk 31,000 crore**. Monthly cash relief ~Tk 730 crore against a ~Tk 3,800 crore/month loss run-rate (22,876 ÷ 6).

**D6 — The duty wedge.** Tk 32.44 of the Tk 135 pump price = **24.0%**. Net public-sector position per litre: NBR collects 32.44, BPC loses 69 → **net −Tk 36.56/L**. Zeroing the duty would close 32.44 ÷ 52 = **62.4% of the remaining gap** with no pump-price rise.

**D7 — Inflation decomposition** `[ASSUMED]` weights, standard for the Bangladesh CPI basket:
| Channel | Assumption | Contribution |
|---|---|---|
| Direct fuel purchase | 1.5–2.5% weight × ~15% price rise | +0.25 to +0.40 pp |
| Transport services | 5–6% weight × 8–15% realised fare rise | +0.40 to +0.90 pp |
| Food via freight + irrigation | 46% food weight × 0.8–1.4% cost pass-through | +0.40 to +0.65 pp |
| **Cost-push subtotal** | | **+1.05 to +1.95 pp** |
| Pay-scale demand injection | ~Tk 30–35k crore ≈ 0.55% of GDP | +0.30 to +0.50 pp |
→ From 8.26%, expect **9.5–10.5% by Dec 2026–Jan 2027**, non-food leading to ~10.5–11%, food re-accelerating on a lag. The two-month easing trend breaks in the October or November print.

**D8 — GDP denominator for D7.** $2,960 per capita × ~175m = **~$518bn ≈ Tk 63.7 lakh crore**. Year-one pay injection Tk 30–35k crore = **0.47–0.55% of GDP**.

**D9 — Bus fare pass-through.** April: diesel +15.0% → gazetted metro fare +4.49% (2.45→2.56). **Ratio 0.30.** Applied to +17.4%: +5.2% → metro **Tk 2.69/km**, inter-district **Tk 2.35/km**. Commuter effect, 20 km/day round trip: gazetted +Tk 2.6/day ≈ **Tk 60/month**; but a minimum-fare round-up from Tk 10 to 15 on two legs × 22 working days = **Tk 220–300/month** ≈ **1.8–2.4% of an RMG wage**. Realised overshoot is the documented pattern (S9: "surge unchecked"; 2022: up to 22%).

**D10 — Irrigation cost.** Diesel ≈ 60–70% of the Tk 3,500–4,000/bigha baseline ≈ Tk 2,400. This hike: +17.4% × 2,400 = **+Tk 418/bigha ≈ +Tk 1,254/acre** (3 bigha/acre). Since March: +35% × 2,400 = **+Tk 840/bigha ≈ +Tk 2,520/acre**. Boro area ~4.9m ha = 12.1m acres; ~70% diesel-irrigated = **8.47m acres**. Aggregate: **~Tk 1,060 crore from this hike; ~Tk 2,130 crore since March.** Per kg of rice: diesel-irrigation ≈ Tk 3–4 of Tk 32–35/kg production cost; +35% = **+Tk 1.05–1.40/kg**.

**D11 — Generator costs.** Effective factory diesel = 135 + 10 premium = **Tk 145/L**. A unit reported at Tk 40,000/day scales to **~Tk 47,000/day** (+17.4%); one at $25,000/day → **~$29,300/day**.

**D12 — Freight.** 15t truck, Dhaka–Chattogram 250 km at ~3 km/L = 83.3 L one way × Tk 20 = **+Tk 1,667/trip** ≈ 6% of a Tk 25,000–30,000 charter. Realised rate rise **8–12%** once empty return legs and driver costs compound.

**D13 — e-3W versus liquid fuel, per km.** Petrol 3W at Tk 165/L and ~15 km/L = **Tk 11.00/km**. Battery 3W drawing 4–9 kWh/day over ~100 km at Tk 8–9/kWh = 0.04–0.09 kWh/km = **Tk 0.32–0.81/km**. Ratio **~14–34×**; for the 93% of Dhaka charging points that are illegal, the operator's marginal cost is **~0**. The hike widened an already decisive wedge by another 13.8%.

**D14 — Forex.** August import spend Tk 7,603 crore ÷ 123 = **$618m/month** vs Tk 2,741 crore = **$223m** a year earlier. Increment **$395m/month ≈ $4.74bn/yr ≈ 16.1% of the $29.47bn reserve stock.** Demand destruction at short-run price elasticity −0.1 to −0.2 `[ASSUMED]` → volume −1.7 to −3.5% → **~$150–250m/yr saved**. Real but second-order against a $4.74bn increment.

**D15 — Smuggling arbitrage.** Pre-hike: India 134.76 − Bangladesh 115 = **Tk 19.76/L** incentive to move subsidised diesel out. Post-hike: 134.76 − 135 = **−Tk 0.24/L**. Arbitrage eliminated. This rationale is sound.

**D16 — Wage wedge.** Year-one phased grade-20 basic = 8,250 + 50% × (20,000 − 8,250) = **Tk 14,125** (+71%, reaching +142% by year two). RMG worker: **Tk 12,500**, +0% since Dec 2023 (9%/yr increment aside). Against ~30% cumulative inflation since 2023 `[ASSUMED]`, the first is real-positive and the second sharply real-negative. Covered population 33 lakh ≈ **2% of population, ~4% of the 77.4m labour force**.

---

## Part 5 — Findings against the four original claims

| # | User's claim | Verdict | Evidence |
|---|---|---|---|
| 1 | "145 to 165, was 125 a year ago" | **Confirmed** | Octane 145→165 on 21 Sep; ~120–125 a year ago. +32% YoY, +37.5% since March |
| 2 | "Govt +50–200%, private nothing" | **Confirmed, magnitude slightly overstated at the top** | Grades 1–10 up to +100%, grades 11–20 up to +142% (not 200%); private sector has no mechanism, real wages negative (8.05% growth vs 8.26% inflation) |
| 3 | "Autorickshaws flood the road" | **Confirmed, and causally linked** | Operating cost 14–34× cheaper per km (D13); 97% unregistered; fleet draws 5% of national generation |
| 4 | "Load shedding spike" | **Confirmed, and part of the same loop** | >3,500 MW peak cuts; gas at 16-year low; e-3W charging 500 MW–1 GW on 48,136 illegal Dhaka points |
| — | "Out of nowhere" | **Partly rejected** | The shock is external (Hormuz) and was flagged since March. What was "sudden" is the *policy*: the monthly formula was suspended March–September, then six months of adjustment released in one Tk 20 step |

**The finding that mattered most, and was not in the originating conversation at all:** BPC asked for Tk 187 diesel and got Tk 135, leaving **Tk 52/L unpassed with only 27.8% of the gap closed**, while its working capital covers September only and **LC funding may be exhausted in October**. Tk 20 is roughly a quarter of the adjustment, not the end of it.

---

## Part 6 — Open questions for Pass 2

1. Actual BBS CPI basket weights for fuel, transport and food — D7 uses assumed weights and is the least firm calculation in the set.
2. Diesel volume split: irrigation vs freight vs generators vs power. Would sharpen D10/D11/D12 considerably.
3. Whether the diesel duty cut (D6) is under active consideration — no reporting found either way.
4. Gazetted bus fare revision after this hike — not yet published at the time of this pass; D9 is a forecast to be scored.
5. Boro acreage intentions for 2026-27 — the single most important unknown for 2027 food inflation.
6. Real-wage series for informal workers specifically, not the national aggregate.
7. Whether the Family Card rail is actually being used for fuel compensation.
8. e-3W fleet size: estimates range from 500,000 to 6,000,000 across sources. The load estimates rest on this and the range is unacceptably wide.

---

## Sources

**The hike**
- [Fuel prices hiked by Tk 20 a litre — The Daily Star](https://www.thedailystar.net/news/power-and-energy/news/fuel-prices-hiked-tk-20-litre-4278041)
- [Fuel prices hiked by Tk20 per litre — The Business Standard](https://www.tbsnews.net/economy/energy/fuel-prices-hiked-tk20-litre-1548591)
- [Bangladesh raises fuel prices by up to 17.4% — Business Standard](https://www.business-standard.com/world-news/bangladesh-raises-fuel-prices-by-up-to-17-4-amid-global-oil-price-surge-126092100126_1.html)
- [Bangladesh raises fuel prices by BDT 20 per litre — ANI](https://www.aninews.in/news/world/asia/bangladesh-raises-fuel-prices-by-bdt-20-per-litre-amid-oil-supply-crisis20260921120512/)
- [Fuel prices increased by Tk 15 to Tk 20 per litre — Prothom Alo](https://en.prothomalo.com/bangladesh/htrienv442)
- [Fuel Prices Increased by Tk 20 per Liter — Energy Bangla](https://energybangla.com/fuel-prices-increased-by-tk-20-per-liter/)

**Price history**
- [Govt hikes fuel prices (April) — The Daily Star](https://www.thedailystar.net/news/environment/natural-resources/energy/news/govt-hikes-fuel-prices-4154641)
- [Diesel now Tk 115, octane Tk 140 — The Daily Star](https://www.thedailystar.net/news/bangladesh/news/diesel-now-tk-115-octane-tk-140-4154861)
- [Petrol, octane up by Tk 5 per litre (June) — The Daily Star](https://www.thedailystar.net/news/environment/natural-resources/energy/news/fuel-prices-rise-again-petrol-octane-tk-5-litre-4187466)
- [Fuel prices raised in line with global market: diesel Tk115 — TBS](https://www.tbsnews.net/bangladesh/energy/fuel-prices-raised-line-global-market-diesel-tk115-litre-sunday-1414946)
- [Fuel prices remain unchanged in September — TBS](https://www.tbsnews.net/bangladesh/energy/fuel-prices-remain-unchanged-september-1529531)
- [Furnace oil price hiked by Tk24 per litre — Bangladesh Pratidin](https://en.bd-pratidin.com/economy/2026/04/12/60575)
- [Furnace Oil Price Increased — Energy Bangla](https://energybangla.com/furnace-oil-price-increased/)

**BPC and pricing formula**
- [BPC may run out of funds for fuel imports in Oct — The Daily Star](https://www.thedailystar.net/news/bangladesh/news/bpc-may-run-out-funds-fuel-imports-oct-4276036)
- [Price shock threatens BPC's profit streak — The Daily Star](https://www.thedailystar.net/news/bangladesh/news/price-shock-threatens-bpcs-profit-streak-4137106)
- [The hidden price of cheap fuel — TBS](https://www.tbsnews.net/bangladesh/hidden-price-cheap-fuel-1417106)
- [Automatic fuel oil pricing from March — TBS](https://www.tbsnews.net/bangladesh/energy/automatic-fuel-oil-pricing-march-754006)
- [With automatic pricing formula, BPC can't cry wolf about losses — The Daily Star](https://www.thedailystar.net/opinion/views/news/automatic-pricing-formula-bpc-cant-cry-wolf-about-losses-3657156)
- [BPC posts consistent monthly profits under new fuel pricing formula — The Financial Express](https://thefinancialexpress.com.bd/trade/bpc-posts-consistent-monthly-profits-under-new-fuel-pricing-formula)
- [Bangladesh cuts fuel prices by BDT 2 under automatic pricing — Bonik Barta](https://en.bonikbarta.com/business/DKuT3nzIbcwQQKQ1)

**Economy and inflation**
- [Fuel price hike lays bare stress on economy — The Daily Star](https://www.thedailystar.net/news/bangladesh/news/fuel-price-hike-lays-bare-stress-economy-4155731)
- [Fuel price hike to raise living costs: Fahmida Khatun — CPD](https://cpd.org.bd/fuel-price-hike-to-raise-living-costs/)
- [August inflation eases to 8.26% — The Daily Star](https://www.thedailystar.net/business/news/august-inflation-eases-826-4267046)
- [Inflation dips for 2nd consecutive month to 8.26% — TBS](https://www.tbsnews.net/bangladesh/inflation-eases-again-2nd-straight-month-1535836)
- [Inflation eases slightly to 8.26pc in August — BSS](https://www.bssnews.net/news/421999)
- [Forecast on GDP growth cut to 3.9pc — The Financial Express](https://thefinancialexpress.com.bd/economy/bangladesh/forecast-on-gdp-growth-cut-to-39pc-amid-headwinds)
- [Bangladesh's economic growth set to slow to 3.9% — TBS](https://www.tbsnews.net/economy/bangladeshs-economic-growth-slows-39-inflation-banking-risks-investment-crisis-deepen)
- [Urgent Reforms Needed to Restore Macro Stability — World Bank](https://www.worldbank.org/en/news/press-release/2026/04/08/urgent-reforms-needed-to-restore-macro-stability-sustain-growth-and-create-jobs-in-bangladesh)
- [Exchange Rate of Taka — Bangladesh Bank](https://www.bb.org.bd/en/index.php/econdata/exchangerate)
- [Forex reserves cross $29 billion — The Daily Star](https://www.thedailystar.net/business/news/forex-reserves-cross-29-billion-month-imf-calculation-4102131)

**Transport fares**
- [Govt raises bus fares by 11 paisa per km — The Daily Star](https://www.thedailystar.net/news/bangladesh/transport/news/govt-raises-bus-fares-11-paisa-km-4158631)
- [Bus fare hiked by about 5% — The Daily Star](https://www.thedailystar.net/news/bangladesh/transport/news/bus-fare-hiked-about-5-4159336)
- [Bus fares surge unchecked as fuel price hike hits commuters — TBS](https://www.tbsnews.net/bangladesh/bus-fares-surge-unchecked-fuel-price-hike-hits-commuters-1417996)
- [Govt raises launch fares by up to 18 paisa per km — The Daily Star](https://www.thedailystar.net/news/bangladesh/transport/news/govt-raises-launch-fares-18-paisa-km-4169266)
- [Transport owners press for higher fares, citing 'phantom costs' — Prothom Alo](https://en.prothomalo.com/bangladesh/hvdsdx596p)
- [Bangladesh raises bus fares as much as 22% after record fuel price hike — bdnews24](https://bdnews24.com/bangladesh/32s1anf2v7)

**Agriculture**
- [Farmers in distress as diesel price hike drives up costs — The Daily Star](https://www.thedailystar.net/business/news/farmers-distress-diesel-price-hike-drives-costs-4156316)
- [Govt sticks to old Boro price despite high production cost — The Daily Star](https://www.thedailystar.net/business/news/govt-sticks-old-boro-price-despite-high-production-cost-4158386)
- [Energy Shock and Boro Rice — Daily Sun](https://www.daily-sun.com/opinion/870198/energy-shock-and-boro-rice-the-rising-threat-to-bangladesh-s-food-security)
- [Energy Price, Fertiliser Uncertainty Threaten Boro Production — Daily Sun](https://www.daily-sun.com/bangladesh/867288)
- [PDB seeks Tk9,750cr to clear power dues ahead of Boro season — TBS](https://www.tbsnews.net/agriculture/pdb-seeks-tk9750cr-clear-power-dues-ahead-boro-season-1545041)
- [Fuel crisis: Farmers struggling to access oil for agricultural machineries — Prothom Alo](https://en.prothomalo.com/bangladesh/nuhb3dj86o)
- [Govt mulls providing diesel subsidy to Boro farmers — TBS](https://www.tbsnews.net/bangladesh/energy/govt-mulls-providing-diesel-subsidy-boro-farmers-488298)

**Power and load shedding**
- [Gas shortage sparks extensive power cuts — The Daily Star](https://www.thedailystar.net/news/bangladesh/news/gas-shortage-sparks-extensive-power-cuts-4238811)
- [Load shedding off the charts once again — The Daily Star](https://www.thedailystar.net/news/bangladesh/news/load-shedding-the-charts-once-again-4244141)
- [Fuel scarcity, unequal cuts deepen power crisis — The Daily Star](https://www.thedailystar.net/opinion/editorial/news/fuel-scarcity-unequal-cuts-deepen-power-crisis-4158976)
- [Power generation falls at 4 major plants — Prothom Alo](https://en.prothomalo.com/bangladesh/71x97mygnp)
- [Load-shedding exceeds 2,500MW amid gas crisis — New Age](https://www.newagebd.net/post/country/308109/load-shedding-exceeds-2500mw-amid-gas-crisis)
- [Bangladesh's Power Crisis: Energy Vulnerability and Political Consequences — Eurasia Review](https://www.eurasiareview.com/14092026-bangladeshs-power-crisis-energy-vulnerability-and-political-consequences-analysis/)
- [Fostering Bangladesh's energy transition — IEEFA](https://ieefa.org/resources/fostering-bangladeshs-energy-transition)
- [Cost 3 times higher, yet electricity being purchased from oil-run power plants — Prothom Alo](https://en.prothomalo.com/bangladesh/l6ukoajcxm)

**Battery rickshaws**
- [Battery-run rickshaws strain Bangladesh's power grid — Dhaka Tribune](https://www.dhakatribune.com/business/408819/battery-run-rickshaws-strain-bangladesh-s-power)
- [Can solar power help solve Bangladesh's auto-rickshaw electricity theft crisis? — TBS](https://www.tbsnews.net/thoughts/can-solar-power-help-solve-bangladeshs-auto-rickshaw-electricity-theft-crisis-1325981)
- [Dhaka's Tesla: Technological upgrade or poverty trap? — The Daily Star](https://www.thedailystar.net/slow-reads/unheard-voices/news/dhakas-tesla-technological-upgrade-or-poverty-trap-4144236)
- [Regulate battery-run rickshaws — The Daily Star](https://www.thedailystar.net/news/regulate-battery-run-rickshaws-4085381)
- [Bangladesh mandates solar charging for millions of electric rickshaws — pv magazine](https://www.pv-magazine.com/2026/08/21/bangladesh-mandates-solar-charging-for-millions-of-electric-rickshaws/)
- [Govt mulls relocating battery-run rickshaws outside city areas — Prothom Alo](https://en.prothomalo.com/bangladesh/k3ccdcisks)
- [High penetration of electric autorickshaw on national power system — ScienceDirect](https://www.sciencedirect.com/science/article/pii/S2666790823000423)

**RMG and exports**
- [Energy crunch cuts Bangladesh's RMG output 20–30% — Bonik Barta](https://en.bonikbarta.com/business/eR81slI8yYSbHxxp)
- [Ctg RMG factories hit by nearly half-shift load shedding; costs rise 20% — TBS](https://www.tbsnews.net/economy/ctg-rmg-factories-hit-nearly-half-shift-load-shedding-costs-rise-20-1427756)
- [Gas crunch cripples industries, threatens export orders — TBS](https://www.tbsnews.net/bangladesh/energy/gas-crunch-cripples-industries-threatens-export-orders-1501656)
- [RMG exports brace for a gathering storm — The Daily Star](https://www.thedailystar.net/business/economy/news/rmg-exports-brace-gathering-storm-4153336)
- [Power Crisis Cripples RMG Output by 30pc — The Observer](https://www.observerbd.com/news/572857)
- [Bangladesh Gas Crisis Exposes RMG's Decarbonization Catch-22 — Sourcing Journal](https://wwd.com/sourcing-journal/industry-news/bangladesh-rmg-energy-crisis-1239129058/)
- [Bangladesh's LDC Graduation: Key Risks, Export Impact — Stein & Partners](https://www.steinandpartners.com/investment-finance/bangladeshs-ldc-graduation-key-risks-recommended-actions/)
- [How will LDC graduation impact Bangladesh's RMG sector? — The Daily Star](https://www.thedailystar.net/opinion/views/news/how-will-ldc-graduation-impact-bangladeshs-rmg-sector-3870356)
- [Can Bangladesh absorb LDC graduation-induced tariff shocks? — IGC](https://www.theigc.org/sites/default/files/2024-09/Razzaque%20et%20al.%20Policy%20Brief%20September%202024.pdf)

**Wages and pay scale**
- [Govt issues gazette on new pay structure — TBS](https://www.tbsnews.net/bangladesh/gazette-issued-national-pay-scale-2026-1547116)
- [National pay scale: Hurrah for government employees — The Daily Star](https://www.thedailystar.net/news/bangladesh/news/national-pay-scale-hurrah-government-employees-4261766)
- [Hurrah for some, pain for many (editorial) — The Daily Star](https://www.thedailystar.net/opinion/editorial/news/hurrah-some-pain-many-4262196)
- [Ninth national pay commission: Up to 142% salary hike pitched — The Daily Star](https://www.thedailystar.net/news/ninth-natl-pay-commission-142-salary-hike-pitched-4087411)
- [New pay scale for govt employees from July 1 — The Daily Star](https://www.thedailystar.net/news/bangladesh/news/new-pay-scale-govt-employees-july-1-4180026)
- [Government unveils phased rollout of new public sector pay structure — bdnews24](https://bdnews24.com/budget2026-27/a5dd4ae683e7)
- [A New Pay Scale in Bangladesh Amid High Inflation — Countercurrents](https://countercurrents.org/2026/09/a-new-pay-scale-in-bangladesh-amid-high-inflation-who-gets-relief-and-who-does-not/)
- [Average Salary in Bangladesh — wage.is](https://wage.is/bangladesh/)
- [Wage trends: Bangladesh — Fair Labor Association](https://www.fairlabor.org/resource/fair-labor-associations-bangladesh-wage-trends-report-and-recommendations/)
- [Minimum wage-setting in Bangladesh's apparel industry — Cornell GLI](https://www.ilr.cornell.edu/sites/default/files-d8/2025-02/cornell-gli-brief-bangladesh-february-2025_0.pdf)

**Global oil context**
- [Brent crude tops $101 as fighting escalates in Persian Gulf — CNBC](https://www.cnbc.com/2026/09/09/oil-prices-today-wti-brent-us-iran-hormuz-attacks.html)
- [Oil rises to $99 on report Iran launched second undisclosed attack — CNBC](https://www.cnbc.com/2026/09/08/oil-prices-today-brent-wti-hormuz-iran-war.html)
- [Brent Crude Holds at $95 as Hormuz Throughput Drops to One-Fifth — Eastern Herald](https://easternherald.com/2026/09/04/brent-crude-oil-price-september-4-2026-hormuz-opec/)
- [Oil prices rise as attacks dent hopes for Strait of Hormuz reopening — Al Jazeera](https://www.aljazeera.com/economy/2026/8/12/oil-prices-rise-as-attacks-dent-hopes-for-strait-of-hormuz-reopening)
- [Oil prices surge as US-Iran strikes intensify in Strait of Hormuz — Al Jazeera](https://www.aljazeera.com/economy/2026/9/7/oil-prices-surge-as-us-iran-strikes-intensify-in-strait-of-hormuz)
- [2026 Iran war fuel crisis — Wikipedia](https://en.wikipedia.org/wiki/2026_Iran_war_fuel_crisis)
- [2026–2028 world oil market chronology — Wikipedia](https://en.wikipedia.org/wiki/2026%E2%80%932028_world_oil_market_chronology)
- [The Third Oil Shock: Bangladesh's Response — ISAS/NUS](https://www.isas.nus.edu.sg/wp-content/uploads/media/isas_papers/ISAS%20Brief%2071%20-%20Email%20-%20The%20Third%20Oil%20Shock%20-%20Bangladesh's%20Response.pdf)

**Politics and mitigation**
- [PM Tarique Rahman apologises over electricity, fuel crisis — Daily Waadaa](https://www.dailywaadaa.com/amp/story/bangladesh/2026/09/05/i-apologise-to-all-those-suffering-from-electricity-and-fuel-shortages-pm)
- ["We are open to opposition input on fuel situation" — The Daily Star](https://www.thedailystar.net/news/bangladesh/news/we-are-open-opposition-input-fuel-situation-pm-tells-js-4158376)
- [Govt to be tougher against fuel hoarding, smuggling — Jago News](https://www.jagonews24.com/en/national/news/91228)
- [As price of fuel ratchets up, so does anger — CNN](https://www.cnn.com/2026/09/15/world/fuel-prices-protests-iran-war-intl)
- [Record Bangladesh fuel hike triggers huge queues — Gulf News](https://gulfnews.com/world/asia/record-bangladesh-fuel-hike-triggers-huge-queues-1.1659774026732)
- [Family Card — Wikipedia](https://en.wikipedia.org/wiki/Family_Card)
- [World Bank Support to Help Navigate Fuel Market Volatility in Bangladesh](https://www.worldbank.org/en/news/factsheet/2026/05/18/world-bank-support-to-help-navigate-fuel-market-volatility-in-bangladesh)
