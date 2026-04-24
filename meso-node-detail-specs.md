# Meso — Node Detail Page Specifications

**Purpose.** Define what belongs on the detail page for every node type in Meso's operating‑model graph, written as a UI wireframe brief. Each page is the single pane of glass a CIO, CHRO, or COO lands on when they click into a node.

**Source of truth.** `graph.go` (16 node types, ~40 edge types). Attributes drawn directly from the struct; derived metrics computed from the edge set.

**Persona shorthand.** Each field/section is tagged with relevance:
- **`[CIO]`** — technology estate, services, SLA, delivery, dependencies
- **`[CHRO]`** — people, roles, teams, span of control, capacity, culture
- **`[COO]`** — value streams, processes, capabilities, cost, governance, OKRs
- **`[ALL]`** — core identity & audit surface every persona expects

---

## 0. Cross‑cutting sections (apply to every node)

Every detail page shares a common shell. Node‑specific sections are layered inside.

### 0.1 Header bar `[ALL]`
- Node name + type badge (e.g., "Team · stream_aligned")
- Status chip (`active` / `archived` / `draft` / `pipeline` — per node's enum)
- Domain breadcrumb (where applicable) → Legal entity breadcrumb
- Primary owner chip (Role or Person) + avatar cluster of top contributors
- Action buttons: Edit · Share · Export · Subscribe · Clone

### 0.2 At‑a‑glance stat strip `[ALL]`
Four–six hero tiles, tailored per node (see each section below). Always includes a "last updated" and "health" composite.

### 0.3 Description & purpose `[ALL]`
Narrative block. Falls back to system‑generated summary if `purpose`/`description` is empty.

### 0.4 Relationship map `[ALL]`
Interactive sub‑graph centred on this node. Filters for edge type, hop depth (1/2/3), and persona lens. Export as PNG / embed in deck.

### 0.5 Tabs (node‑specific)
Standard tab set per node. Sticky sub‑nav so a CIO/CHRO/COO can jump to the section they care about.

### 0.6 Activity & history `[ALL]`
- Change log from `history` field (field‑level diffs, actor, timestamp)
- Commentary thread (mentions, resolutions)
- Related governance decisions (pulled from linked `GovernanceBody.decisionRecordURL`)

### 0.7 Audit panel `[ALL]`
`createdAt`, `createdBy` (where tracked), `updatedAt`, `updatedBy`, ID, external IDs, data quality score (completeness of required fields + freshness of linked data).

---

## 1. Domain

**Mental model.** A Domain is a top‑level organisational lens ("Engineering", "Finance", "Commercial"). It's a container — most other nodes carry a `BelongsToDomainEdge`.

### 1.1 Header
- Name, status, domain owner (usually a senior Role), parent legal entity

### 1.2 At‑a‑glance `[ALL]`
- Total headcount (roll‑up of `PersonNode` via Teams → Domain) `[CHRO]`
- Active services count + % within SLA `[CIO]`
- Active value streams + aggregate OKR health `[COO]`
- Annual budget (sum of cost centers in domain) + YTD burn `[COO]`
- Number of governance bodies operating in the domain
- Domain health composite (weighted KPI attainment)

### 1.3 Tabs
- **Organisation** — all Teams, TemporaryTeams, Roles, MasterRoles scoped here `[CHRO]`
- **Services** — catalogue filtered to this domain `[CIO]`
- **Value streams & capabilities** — what this domain delivers `[COO]`
- **KPIs & OKRs** — domain‑scoped performance
- **Governance** — bodies, cadences, escalations
- **Cost centres** — budget tree, chargeback flows `[COO]`
- **Processes** — process catalogue, ownership coverage

### 1.4 Suggested visualisations
- Domain tree (parent domain → children; not modelled but derivable from team parentage)
- Org chart mini‑map
- KPI scorecard tiles

---

## 2. LegalEntity

**Mental model.** The legal wrapper — group entity, third‑party supplier, or client. Everything ultimately sits inside one. Critical for compliance, contracting, and cross‑border org design.

### 2.1 Header
- Name, type (`group_entity` / `third_party_supplier` / `client_entity`), address, geographical location, status
- Parent legal entity badge + depth in hierarchy

### 2.2 At‑a‑glance
- Type + jurisdiction (from `location`) `[ALL]`
- Headcount employed by this entity `[CHRO]`
- Teams managed (via `ManagedByLegalEntityEdge`) `[CHRO]`
- Services provided (via `LegalEntityProvidesServiceEdge`) — critical for 3P suppliers `[CIO]`
- Child legal entities count `[ALL]`
- Legal representatives on file (count + gap warning if zero) `[ALL]`

### 2.3 Tabs
- **Hierarchy** — parent, siblings, children tree (`LegalEntityParentOfEdge`)
- **People** — everyone with `BelongsToLegalEntityEdge` + legal representatives (`LegalRepresentativeEdge`) `[CHRO]`
- **Teams** — teams managed by this entity `[CHRO]`
- **Services provided** — especially useful when entity = supplier `[CIO]`
- **Governance bodies** — governance entities belonging here
- **Cost centres** — cost centres scoped to this entity `[COO]`
- **Contracts & compliance** (gap — see §17)

### 2.4 Persona lens callouts
- **CIO**: "What services do 3P suppliers provide us, and what's the concentration risk?"
- **CHRO**: "Which entities employ our people, and where are the cross‑border exposures?"
- **COO**: "How is the legal entity tree aligned to the operating model?"

---

## 3. Team

**Mental model.** A durable team, typed per Team Topologies (`stream_aligned`, `platform`, `enabling`, `complicated_subsystem`). The load‑bearing node for operating models.

### 3.1 Header
- Name, team type badge, domain, legal entity, status, `isManagedService` flag (important: indicates outsourced)
- Team lead avatars (from `LeadOfEdge`)

### 3.2 At‑a‑glance
- `directMemberCount` / `totalMemberCount` `[CHRO]`
- Internal vs external split (`directInternalMemberCount` vs `directExternalMemberCount`) `[CHRO]`
- Annual allocated cost (sum of `BookedToCostCenterEdge.allocationPercent × costCenter.annualBudget`) `[COO]`
- Services provided / consumed counts `[CIO]`
- OKR health (share on‑track among owned OKRs) `[COO]`
- Vacancy rate (roles on team with no `FillsRoleEdge`) `[CHRO]`

### 3.3 Tabs
- **About** — purpose, responsibilities, decisionAuthorities, workspaceLinks, communicationChannels `[ALL]`
- **Members & roles** — leads, members, all `HasRoleEdge` roles with fill status `[CHRO]`
- **Services** — provided (`ProvidesServiceEdge`), consumed (`ConsumesServiceEdge`) `[CIO]`
- **Value streams** — `ContributesToEdge` targets `[COO]`
- **Capabilities owned** — `OwnsCapabilityEdge` `[COO]`
- **OKRs & KPIs** — `OwnsOKREdge`, `ContributesToKPIEdge` (with `contributionType`) `[COO]`
- **Governance** — bodies governing this team (`GovernsEdge`) `[ALL]`
- **Relationships** — parent team, child teams (`ParentOfEdge`), temp teams contributed to (`ContributingTeamEdge`)
- **Cost** — cost centre bookings with allocation % chart `[COO]`
- **Processes** — `ExecutesProcessEdge`

### 3.4 Derived insights
- **Span of influence**: # downstream services consumed by other teams
- **Load index**: services provided ÷ headcount — platform/enabling team stress signal `[CIO]`
- **External dependency**: `directExternalMemberCount / directMemberCount`
- **Governance surface**: # governance bodies overseeing this team

### 3.5 Persona lens callouts
- **CIO**: services provided, SLA attainment of those services, dependency depth
- **CHRO**: lead present? vacancies? external share? supervision graph sanity
- **COO**: value‑stream alignment, OKR health, cost per outcome

---

## 4. TemporaryTeam

**Mental model.** A time‑bounded team — task force, project team, program team, working group. Same shell as Team, plus temporal dimension and sponsorship.

### 4.1 Header extras
- Temporary team type badge
- `startDate` → `targetEndDate` with progress bar + days remaining
- Sponsor chip (Role via `SponsorsEdge`)

### 4.2 At‑a‑glance
- Elapsed time / time remaining
- Member counts (as Team)
- Contributing teams count (`ContributingTeamEdge` inbound)
- OKR progress composite `[COO]`
- Burn vs forecast (if cost centre booked) `[COO]`

### 4.3 Tabs
Same as Team, plus:
- **Timeline & milestones** — start/end, contributing team cadence, OKR period alignment
- **Sponsor & stakeholders** — sponsor role, governance bodies, escalation path
- **End‑state readiness** — checklist for closure: OKRs closed, hand‑offs to Teams documented

### 4.4 Persona lens callouts
- **COO**: is this on track to close by `targetEndDate`? What's the hand‑off plan?
- **CHRO**: who goes where when it ends?
- **CIO**: which services does it touch?

---

## 5. MasterRole

**Mental model.** The archetype ("Engineering Manager", "Product Designer L5"). Instances are `RoleNode`s across teams.

### 5.1 Header
- Name, domain, status

### 5.2 At‑a‑glance `[CHRO]`
- Instances count (inbound `InstanceOfEdge`)
- Filled vs vacant ratio across instances
- Communities this master role belongs to
- Coverage across domains/teams

### 5.3 Tabs
- **About** — canonical purpose + responsibilities
- **Instances** — all `RoleNode`s that are `InstanceOfEdge` of this master; table with team, domain, filled‑by, status
- **Communities** — `MasterRoleCommunityMemberEdge`
- **Career surface** — (future) progression ladder linking adjacent master roles

### 5.4 Persona lens callouts
- **CHRO**: vacancy heatmap, consistency of purpose/responsibilities across instances, community participation

---

## 6. Role

**Mental model.** A role instance on a specific team. The atomic unit of accountability.

### 6.1 Header
- Name, instance of master role, parent team, domain, status
- Filled‑by avatar (from `FillsRoleEdge`) — vacancy badge if none

### 6.2 At‑a‑glance
- Filled / vacant / interim `[CHRO]`
- Services owned count (`OwnsServiceEdge`) `[CIO]`
- Processes owned / executed `[COO]`
- Cost centres owned `[COO]`
- OKRs owned + progress `[COO]`
- Capabilities owned `[COO]`
- Governance memberships (count + chair/facilitator/standing/advisory breakdown)

### 6.3 Tabs
- **About** — purpose, responsibilities, decisionAuthorities, workspaceLinks, communicationChannels
- **Person** — who fills it, history of prior holders (from `history`)
- **Team context** — parent team, sibling roles, supervisor role
- **Ownership** — services, processes, cost centres, capabilities, OKRs owned `[COO][CIO]`
- **Governance** — bodies this role sits on (`GovernanceMemberEdge` with memberType) `[ALL]`
- **Sponsorships** — temporary teams sponsored (`SponsorsEdge`)
- **Delegations received** — `DelegatesToEdge` where this role is the target

### 6.4 Derived insights
- **Accountability surface**: services + processes + cost centres + capabilities owned — flag overload
- **Decision footprint**: count of `AuthorityType=decides` across governance memberships
- **Vacancy age** if unfilled

### 6.5 Persona lens callouts
- **CHRO**: vacancy, succession readiness, span
- **CIO**: critical service ownership — is it single‑threaded?
- **COO**: decision‑rights clarity — are authorities explicit?

---

## 7. Person

**Mental model.** A human (internal full profile, external, or stub). The CHRO's primary canvas.

### 7.1 Header
- Avatar, first + surname, pronouns, email, location
- `isExternal` badge, `personType` (`full` / `stub`), `contributorType` (`manager` / `individual_contributor` / `external`)
- Primary legal entity (`BelongsToLegalEntityEdge`)

### 7.2 At‑a‑glance `[CHRO]`
- Roles filled (count + list)
- Teams: led / member of
- Direct reports (inbound `SupervisesEdge`) — **span of control**
- Supervisor (outbound `SupervisesEdge`)
- Governance memberships
- Communities led / member of
- OKRs owned + progress

### 7.3 Tabs
- **About** — aboutMe, pronouns, personalityProfiles, socialLinks, avatarURL, communicationChannels
- **Positions** — roles filled across teams (historical via `history`) `[CHRO]`
- **Org view** — mini tree: supervisor → this person → direct reports `[CHRO]`
- **Teams & communities** — memberships and leadership `[CHRO]`
- **Governance** — seats held, member type per body `[ALL]`
- **OKRs & KPIs** — owned OKRs, KPIs contributed to `[COO]`
- **Legal entity** — employer (useful in multi‑entity groups)

### 7.4 Derived insights
- **Span of control**: direct + indirect reports
- **Role load**: count of roles filled
- **Governance load**: seat count, weighted by cadence
- **External flag** + cross‑entity exposure

### 7.5 Persona lens callouts
- **CHRO**: span, role load, external risk, succession cover
- **COO**: OKR coverage, decision‑authority accumulation
- **CIO**: (when role owns a service) single‑person dependency risk

---

## 8. ValueStream

**Mental model.** The end‑to‑end flow that delivers value to a customer or stakeholder. The COO's anchor.

### 8.1 Header
- Name, domain, status, business outcomes list

### 8.2 At‑a‑glance `[COO]`
- Contributing teams (count, via `ContributesToEdge`)
- Contributing services (count)
- Contributing processes (count)
- Enabling capabilities (count, via `EnablesValueStreamEdge`)
- OKR portfolio health (share on‑track)
- Top KPI with current value vs target

### 8.3 Tabs
- **Outcomes** — `businessOutcomes` expanded with linked KPIs
- **Contributors** — teams, services, roles, processes, persons feeding into it
- **Capabilities enabling** — `EnablesValueStreamEdge` inbound
- **Processes** — `ValueStreamParentOfProcessEdge` children — end‑to‑end flow visualised as a swim lane
- **KPIs** — stream‑level leading/lagging indicators with trend `[COO]`
- **OKRs** — stream‑aligned OKRs and progress
- **Cost to serve** — rolled up via contributing teams' cost centre bookings `[COO]`

### 8.4 Derived insights
- **End‑to‑end cycle time** (from process timings)
- **Cost per outcome**
- **Value‑stream coverage**: are all four contributor types present?

### 8.5 Persona lens callouts
- **COO**: end‑to‑end performance, bottlenecks, cost‑to‑serve, outcome attainment
- **CIO**: service concentration inside the stream — fragility
- **CHRO**: team health contributing to the stream

---

## 9. GovernanceBody

**Mental model.** A durable decision forum — board, committee, council, forum, review board. The COO's nerve system.

### 9.1 Header
- Name, type, cadence, purpose, status, decision‑record URL, parent legal entity

### 9.2 At‑a‑glance `[ALL]`
- Members count by memberType (chair / facilitator / standing / advisory)
- Scope breadth: teams + services governed
- Escalation target (outbound `EscalatesToEdge`)
- Last decision date (from history or `decisionRecordURL`)
- Next meeting (derived from `cadence` + schedule)

### 9.3 Tabs
- **Charter** — purpose, inputs, outputs, decision authorities (typed: decides / approves / advises / ratifies)
- **Members** — chair, facilitator, standing, advisory with Person/Role links `[ALL]`
- **Scope** — teams governed (`GovernsEdge`), services governed (`GovernsServiceEdge`), processes executed (`ExecutesProcessEdge`)
- **Escalation & delegation** — incoming/outgoing `EscalatesToEdge` + `DelegatesToEdge`
- **Cadence & decisions** — meeting cadence, recent decisions, pending items
- **Communication** — workspaceLinks, communicationChannels

### 9.4 Derived insights
- **Authority clarity score**: share of linked decisions with typed authority
- **Span of governance**: teams + services reached directly or via delegation
- **Quorum integrity**: chair + facilitator + ≥1 standing present?

### 9.5 Persona lens callouts
- **COO**: are decisions happening at the right level? Delegation paths clean?
- **CIO**: which services are under this body's oversight?
- **CHRO**: governance load distribution across people

---

## 10. Service

**Mental model.** A provided capability — technical, business, or customer‑facing. The CIO's primary canvas.

### 10.1 Header
- Name, type (`technical` / `business` / `customer_facing`), serviceDomain, status (`pipeline` / `active` / `archived`), SLA summary
- Request URL, primary communication channels
- Owning Role chip (via `OwnsServiceEdge`)

### 10.2 At‑a‑glance `[CIO]`
- SLA attainment % (requires runtime data — see §17 gap)
- Number of consumer teams (`ConsumesServiceEdge` inbound)
- Number of upstream dependencies (`ServiceDependsOnEdge` outbound)
- Number of downstream dependents (`ServiceDependsOnEdge` inbound)
- Annual run cost (via cost centre bookings) `[COO]`
- Governance status (is it overseen by a body?)

### 10.3 Tabs
- **Overview** — description, SLA detail, request flow
- **Providers** — teams providing (`ProvidesServiceEdge`), legal entity provider (`LegalEntityProvidesServiceEdge`) — key for 3P supplier services
- **Ownership** — owning role, provider team leads
- **Consumers** — teams consuming, with usage depth
- **Dependencies** — upstream/downstream graph (`ServiceDependsOnEdge`) with depth slider
- **KPIs** — uptime, latency, CSAT, request volume, cost‑per‑request, incidents `[CIO]`
- **OKRs** — OKRs measured by this service's KPIs `[COO]`
- **Governance** — bodies governing (`GovernsServiceEdge`)
- **Processes** — related processes
- **Cost** — cost centre bookings + allocation `[COO]`
- **Value stream contribution** — `ContributesToEdge` targets

### 10.4 Derived insights (CIO KPI suite)
- **Availability / uptime** against SLA
- **Mean time to recovery**
- **Request volume & concurrency trend**
- **Cost per request / per consumer**
- **Dependency fan‑in and fan‑out** — blast radius
- **Single‑provider risk** — is only one team providing?
- **Single‑consumer dominance** — concentration of value
- **Deprecation readiness** — status pipeline/active/archived age
- **Change failure rate** (if linked to CI/CD — gap §17)

### 10.5 Persona lens callouts
- **CIO**: reliability, dependency risk, cost, consumer load, lifecycle status
- **COO**: contribution to value streams, OKR alignment, cost per outcome
- **CHRO**: owning role vacancy risk, provider team health

---

## 11. CostCenter

**Mental model.** Financial bucket for budgeting and chargeback. CFO/COO tool.

### 11.1 Header
- Name, code, externalId, type (`operational` / `shared_service` / `project` / `overhead` / `investment`), currency, fiscal year start, chargeback model (`none` / `showback` / `chargeback` / `allocation`)
- Owning Role, parent cost centre breadcrumb

### 11.2 At‑a‑glance `[COO]`
- Annual budget + YTD spend + burn rate
- Forecast variance
- Chargeback model badge
- Count of bookings (teams + roles + services with `BookedToCostCenterEdge`)
- Child cost centres count

### 11.3 Tabs
- **Financials** — budget, actuals, variance, forecast (runtime — §17 gap)
- **Bookings** — all inbound `BookedToCostCenterEdge` with allocation % stacked chart (by team / temp team / role / service)
- **Chargeback flows** — outbound `ChargesBackToEdge` with allocationKey (`headcount` / `usage` / `fixed` / `custom`)
- **Hierarchy** — parent / children (`CostCenterParentOfEdge`)
- **Ownership** — owning role
- **Legal entity** — `BelongsToLegalEntityEdge`

### 11.4 Derived insights
- **Utilisation**: spend ÷ budget
- **Cost driver**: which booking consumes the most
- **Allocation integrity**: do inbound allocation %s sum to 100 per contributor?
- **Chargeback recovery**: outflow vs inflow

### 11.5 Persona lens callouts
- **COO**: budget health, driver analysis, chargeback fairness
- **CIO**: (for IT cost centres) cost per service, allocation clarity
- **CHRO**: (for people cost centres) cost per head, shared‑service consumption

---

## 12. KPI

**Mental model.** A measured indicator. Could be leading or lagging, financial, operational, customer, people, quality, or risk.

### 12.1 Header
- Name, abbreviation, type (`lagging` / `leading`), category, direction (`higher_is_better` / `lower_is_better` / `target_is_better`), unit, measurement frequency, dashboard URL
- Target: `targetValue` + `targetOperator` (`gte` / `lte` / `eq`)

### 12.2 At‑a‑glance `[COO][CIO]`
- Current value vs target (delta + status colour)
- Trend sparkline (runtime data — §17 gap)
- Contributors count by type (`owns` / `contributes` / `influences`)
- Parent KPI, dependency count

### 12.3 Tabs
- **Definition** — description, formula, unit, direction, frequency, dashboard link
- **Performance** — current, trend, period comparisons (requires data source)
- **Contributors** — `ContributesToKPIEdge` inbound with `contributionType` tag — who can move this?
- **Hierarchy** — parent (`KPIParentOfEdge`), children
- **Dependencies** — `KPIDependsOnEdge` graph — driver tree
- **OKRs using this KPI** — inbound `MeasuredByKPIEdge`

### 12.4 Derived insights
- **Driver tree**: dependency graph rendered as a causal map
- **Attainment streak**: periods meeting target
- **Owner coverage**: do contributors include a team and a role owner?

### 12.5 Persona lens callouts
- **CIO**: operational & quality category KPIs, service‑linked
- **CHRO**: people category KPIs — engagement, attrition, hiring velocity
- **COO**: financial & customer — the scorecard top line

---

## 13. OKR

**Mental model.** Objective or key result, time‑bounded, owned, measured.

### 13.1 Header
- Title, `nodeType` (`objective` / `key_result`), period, `startDate` → `endDate`, status (`draft` / `active` / `closed`)
- Progress: `currentValue` / `targetValue` (unit), `progressStatus`, `confidenceScore`

### 13.2 At‑a‑glance `[COO]`
- % complete
- Time remaining vs period
- Confidence score (trend if tracked in history)
- Progress status chip
- Owner chip(s) — Team / Role / Person / TempTeam

### 13.3 Tabs
- **Definition** — description, measurement window, success criteria
- **Owners** — `OwnsOKREdge` — who's accountable
- **Alignment** — `OKRParentOfEdge`, `AlignedToOKREdge` — up and across the tree
- **Measurement** — KPIs used (`MeasuredByKPIEdge`) with current vs target
- **Check‑ins** — cadence, history of `currentValue` and `confidenceScore` snapshots
- **Dependencies** — blocking OKRs / contributing OKRs

### 13.4 Derived insights
- **Health index** combining progressStatus + confidenceScore + time remaining
- **Ownership clarity**: single owner vs multiple
- **Alignment depth**: hops to a top‑level objective

### 13.5 Persona lens callouts
- **COO**: portfolio‑wide OKR rollup, at‑risk list
- **CHRO**: people‑owned OKRs — development signal
- **CIO**: service/tech‑owned OKRs — delivery signal

---

## 14. Process

**Mental model.** A defined way of working. Owned, executed, and measurable.

### 14.1 Header
- Name, type, status (`pipeline` / `active` / `archived`), documentation URL, domain, parent value stream, parent capability

### 14.2 At‑a‑glance `[COO]`
- Steps count
- Executors (roles / teams / governance bodies via `ExecutesProcessEdge`)
- Owner (`OwnsProcessEdge`)
- Cycle time (runtime — §17 gap)
- Contribution to value stream

### 14.3 Tabs
- **Definition** — steps, description, documentation
- **Ownership** — owning role, executors
- **Parent & children** — `ProcessParentOfEdge`
- **Value stream & capability** — parents (`ValueStreamParentOfProcessEdge`, `BusinessCapabilityParentOfProcessEdge`)
- **KPIs** — `ContributesToKPIEdge` targets: cycle time, first‑pass yield, error rate
- **Governance** — bodies executing this process
- **Related services** — services touched

### 14.4 Derived insights
- **Executor breadth**: how many teams/roles touch the process
- **Ownership clarity**: single role owner present?
- **Automation candidate score**: step count × executor breadth (heuristic)

### 14.5 Persona lens callouts
- **COO**: cycle time, bottlenecks, ownership clarity
- **CIO**: digital/technical processes — automation opportunity
- **CHRO**: people processes (hiring, onboarding, performance) — fairness and speed

---

## 15. BusinessCapability

**Mental model.** A "what we can do" lens (capability map), independent of how it's done. Bridges strategy and operating model.

### 15.1 Header
- Name, description, level (L1 / L2 / L3), parent capability, domain, status

### 15.2 At‑a‑glance `[COO]`
- Level in capability tree
- Child capabilities count (`CapabilityParentOfEdge`)
- Enabled value streams count (`EnablesValueStreamEdge`)
- Supporting processes count
- Owners (Role / Team via `OwnsCapabilityEdge`)
- KPI attainment (via `ContributesToKPIEdge` inbound)

### 15.3 Tabs
- **Tree position** — parent + children, rendered as a capability map fragment
- **Owners** — roles / teams owning this
- **Value streams enabled** — `EnablesValueStreamEdge`
- **Supporting processes** — `BusinessCapabilityParentOfProcessEdge`
- **Maturity & investment** (gap §17 — suggested runtime fields)
- **KPIs** — capability‑scoped

### 15.4 Derived insights
- **Maturity** (if captured): heatmap on the capability map
- **Investment concentration**: cost centres linked via owning team
- **Orphan risk**: capability with no owner or no supporting process

### 15.5 Persona lens callouts
- **COO**: strategy‑to‑execution traceability — where are our investment gaps?
- **CIO**: capabilities enabled by tech services — platform leverage
- **CHRO**: skills map underlying each capability (future edge §17)

---

## 16. Community

**Mental model.** A cross‑team group of people and master roles sharing practice or interest (Guild / CoP / ERG).

### 16.1 Header
- Name, purpose, status, community lead (Person via `CommunityLeadEdge`)

### 16.2 At‑a‑glance `[CHRO]`
- Member count (Person + MasterRole members)
- Cross‑domain reach (# domains represented)
- Lead present flag
- Activity level (from history / channel activity — gap §17)

### 16.3 Tabs
- **About** — purpose, charter
- **Members** — persons (`PersonCommunityMemberEdge`) + master roles (`MasterRoleCommunityMemberEdge`)
- **Leadership** — community lead
- **Activity** — events, channels (gap §17)

### 16.4 Persona lens callouts
- **CHRO**: engagement, skills sharing, DEI/belonging surface
- **COO**: cross‑functional alignment indicator
- **CIO**: tech communities of practice — standards adoption

---

## 17. Gaps & suggested additions to `graph.go`

While building these detail pages, several attribute/edge gaps surfaced. Flagging for roadmap consideration:

1. **Runtime metrics ingestion**: current/trend values for KPIs, SLA attainment for Services, cycle time for Processes, burn for CostCenters. Schema likely needs a `Measurement` node or time‑series store rather than being denormalised on the node.
2. **Skills / competencies**: no `SkillNode` today — would let Communities, MasterRoles, and Processes reference a shared skill vocabulary. Edges: `PersonHasSkillEdge`, `RoleRequiresSkillEdge`, `CapabilityRequiresSkillEdge`.
3. **CapabilityLevel on the node**: `CapabilityLevel` enum exists but is not stored on `BusinessCapabilityNode`. Add `level` field.
4. **Maturity & investment on Capability**: common CIO/COO lens.
5. **Contracts / SLAs as first‑class**: `ContractNode` linking LegalEntity ↔ Service ↔ dates + terms would strengthen the 3P supplier view.
6. **Incident / Risk**: `IncidentNode` and `RiskNode` with edges to Services, Processes, and GovernanceBodies — CIO reliability lens.
7. **Event / Meeting**: `GovernanceBodyMeetingNode` so cadence becomes a timeline, not just an enum.
8. **Succession**: successor edge on Person → Role would formalise what today lives in the `history` field.
9. **Location taxonomy**: `GeographicalLocation` is referenced for LegalEntity and Person but not modelled as a node — becomes important for entity maps and workforce distribution.
10. **Data quality score**: a system‑derived completeness metric per node, surfaced in §0.7.

---

## 18. Cross‑node wireframe patterns

Reusable components that should ship once and be dropped into every detail page:

- **Edge list drawer** — standard inbound/outbound edge table with filter, grouping, CSV export
- **Person card** — avatar + role + team + location + contact (used everywhere a Person is referenced)
- **Role card** — role + filled‑by + team + master role badge
- **Service card** — name + type + status + SLA dot + owner
- **Cost pill** — currency + annual budget or booking amount + allocation %
- **Status chip system** — consistent colour mapping across all status enums
- **Persona toggle** — `CIO | CHRO | COO | All` — dims fields outside the selected lens
- **Hop slider** — 1/2/3 hop depth when exploring the relationship map
- **"Why does this matter?" callout** — per‑persona contextual explainer at the top of the page
