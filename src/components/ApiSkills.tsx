import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Bot, Wand2, Plug2 } from "lucide-react";

interface ApiItem { name: string; description: string; endpoint?: string; response?: string; }
interface Item { name: string; description: string; example?: string; }

interface ProjectData {
  id: string;
  name: string;
  tagColor: string;
  tag: string;
  apis: ApiItem[];
  agents: Item[];
  skills: Item[];
  mcp: Item[];
}

const projects: ProjectData[] = [
  {
    id: "agenticid",
    name: "AgenticID.Kred",
    tag: "Identity",
    tagColor: "hsl(165, 70%, 82%)",
    apis: [
      {
        name: "Trust Verdict",
        endpoint: "GET /v1/identity/{domain}/verdict",
        description: "Returns a structured trust verdict — not raw data, but a reasoned decision object agents can act on directly.",
        response: `{ "verdict": "trusted", "confidence": 0.94, "factors": ["ENS verified", "12 peer attestations", "score >800", "active 3y"], "recommended_action": "proceed" }`,
      },
      {
        name: "Credential Graph",
        endpoint: "GET /v1/identity/{domain}/graph",
        description: "Returns the full credential subgraph as JSON-LD — all issuers, attestors, and their relationships — ready to be injected wholesale into agent context.",
        response: `{ "subject": "alice.kred", "depth": 2, "nodes": 17, "edges": 31, "graph": "...json-ld..." }`,
      },
      {
        name: "Capability Check",
        endpoint: "POST /v1/identity/capability-check",
        description: "Ask 'can this agent do X?' and get a binary answer with evidence. Designed to gate multi-agent pipelines without the calling agent needing to parse credentials itself.",
        response: `{ "can": true, "evidence": ["skill:solidity-audit v2.1", "attested-by: audits.kred"], "expires_in": "47d" }`,
      },
      {
        name: "Cross-Attest",
        endpoint: "POST /v1/identity/{domain}/attest",
        description: "Agent A attests to a claim about Agent B on-chain. Supports delegation chains so sub-agents can attest within a defined scope.",
        response: `{ "tx": "0xabc...", "credential_id": "vc:kred:001", "anchored": true }`,
      },
    ],
    agents: [
      {
        name: "Hiring Manager Agent",
        description: "Given a job description, autonomously sources .Kred agents, verifies their capability credentials, ranks them by fit, and returns a shortlist with reasoning.",
        example: `"Find me three Solidity auditors with peer attestations and a Kred score above 750."`,
      },
      {
        name: "Due Diligence Agent",
        description: "Before any high-value transaction, pulls the counterparty's full credential graph, cross-references issuer reputations, flags anomalies, and produces a risk brief.",
        example: `"Run due diligence on dao-treasury.kred before we co-sign the multisig."`,
      },
      {
        name: "Credential Lifecycle Agent",
        description: "Monitors expiry dates, automatically re-attests stable credentials, and notifies when re-verification is needed from humans.",
        example: `Sends "Your 'DAO Contributor' credential expires in 14 days — renew?"`,
      },
    ],
    skills: [
      {
        name: "resolve_and_gate",
        description: "Resolves an identity and returns a go/no-go boolean based on configurable trust criteria. Drop this into any pipeline to add identity-gated steps.",
        example: `resolve_and_gate("alice.kred", { min_score: 700, requires: ["kyc", "not-sanctioned"] }) → { gate: "pass" }`,
      },
      {
        name: "build_agent_cv",
        description: "Synthesises a human-readable CV and a machine-readable structured profile from on-chain credential data. Output is suitable for both job boards and agent orchestrators.",
        example: `build_agent_cv("bob.kred") → { headline, skills[], notable_work[], trust_score, attestors[] }`,
      },
      {
        name: "find_capable_agents",
        description: "Semantic search across all .Kred agents by capability, specialisation, and availability. Returns ranked matches with trust scores and contact credentials.",
        example: `find_capable_agents("zero-knowledge proof generation", { min_reputation: "high" })`,
      },
    ],
    mcp: [
      {
        name: "inject-identity-context",
        description: "Injects the full identity record — credentials, attestors, trust score, capability list, peer relationships — directly into the model's context window. The model can then reason about identity without any additional API calls.",
        example: "A contracting agent calls this at the start of every session so it knows exactly who it's dealing with before negotiating terms.",
      },
      {
        name: "attest-from-workflow",
        description: "Allows an agent mid-workflow to issue a credential attesting to something it just witnessed — e.g., 'this agent completed the task to spec'. Immutable, signed, on-chain.",
        example: "After an audit agent finishes reviewing code, it calls this to issue a 'code-reviewed' credential to the developer's .kred identity.",
      },
    ],
  },
  {
    id: "scorekred",
    name: "Score.Kred",
    tag: "Trust",
    tagColor: "hsl(220, 70%, 85%)",
    apis: [
      {
        name: "Score with Reasoning",
        endpoint: "GET /v1/score/{address}?explain=true",
        description: "Returns not just the score but the reasoning chain — which signals drove it up or down, what's recoverable vs permanent, and what a 10-point improvement would require.",
        response: `{ "score": 823, "delta_30d": +14, "drivers": [{ "signal": "consistent_posting", "weight": 0.31, "trend": "up" }], "to_next_tier": "post 3x/week for 30d" }`,
      },
      {
        name: "Relative Ranking",
        endpoint: "POST /v1/score/compare",
        description: "Given a list of addresses, returns their relative trust ranking within a specific context — e.g., 'among DeFi traders' or 'within this DAO'. Percentile positioning, not just raw scores.",
        response: `{ "context": "defi-traders", "rankings": [{ "address": "0x...", "percentile": 91, "score": 847 }] }`,
      },
      {
        name: "Score Forecast",
        endpoint: "GET /v1/score/{address}/forecast",
        description: "Projects score trajectory given current behaviour patterns. Agents can use this to decide whether to extend trust now or wait.",
        response: `{ "current": 612, "projected_90d": 701, "probability": 0.78, "key_actions": ["verify email", "complete 5 trades"] }`,
      },
      {
        name: "Risk Signal Stream",
        endpoint: "WS /v1/score/risk-stream",
        description: "Real-time websocket pushing score anomaly events — sudden drops, suspicious credential clusters, wash-trading patterns. Built for agents that need to revoke trust dynamically.",
        response: `{ "event": "score_drop", "address": "0x...", "from": 750, "to": 490, "trigger": "flagged_trade_cluster" }`,
      },
    ],
    agents: [
      {
        name: "Trust Gatekeeper",
        description: "Sits in front of any multi-agent pipeline. Before a new agent joins a workflow, it runs a real-time score check, evaluates contextual risk, and either admits, places on probation, or blocks.",
        example: "Used by DAO treasury agents to vet contractors before signing grant proposals.",
      },
      {
        name: "Reputation Recovery Coach",
        description: "For an agent or human with a declining score, diagnoses the root causes, simulates recovery paths, and provides a prioritised action plan with expected timeline.",
        example: `"Your score dropped 80pts. Fastest recovery: remove flagged credential (est. +40pts), re-verify wallet (est. +25pts)."`,
      },
      {
        name: "Fraud Sentinel",
        description: "Monitors score velocity and cross-account signal patterns. Flags coordinated reputation manipulation attempts — sybil clusters, credential farming, or wash-attest rings.",
        example: "Detected a network of 14 wallets mutually attesting to inflate each other's scores.",
      },
    ],
    skills: [
      {
        name: "score_gate",
        description: "A binary trust gate. Returns pass/fail with the score, confidence, and a human-readable reason. Designed to be the first node in any agent workflow involving unknown counterparties.",
        example: `score_gate("0xabc", { min: 700, context: "financial" }) → { pass: false, score: 612, reason: "Below threshold for financial context" }`,
      },
      {
        name: "explain_score_delta",
        description: "Given two timestamps, explains what changed in a score and why. Useful for agents auditing past decisions or re-evaluating a counterparty after a score change notification.",
        example: `explain_score_delta("0xabc", "2024-01-01", "2024-04-01") → { delta: +112, key_events: ["ENS verified", "DAO vote participation x8"] }`,
      },
    ],
    mcp: [
      {
        name: "inject-trust-context",
        description: "Injects a full trust profile into the model context window — score, percentile, trend, key signals, risk flags. The model can make trust-informed decisions without additional calls.",
        example: "An LLM drafting a partnership proposal automatically adjusts terms based on the counterparty's trust tier injected into context.",
      },
      {
        name: "score-change-hook",
        description: "Registers a callback that fires when a monitored address crosses a score threshold. Agents use this to reactively revoke permissions, trigger reviews, or escalate to humans.",
        example: "A lending agent auto-calls collateral-increase when a borrower's score drops below 600.",
      },
    ],
  },
  {
    id: "matrixkred-nodes",
    name: "Matrix.Kred Nodes",
    tag: "Build Networks",
    tagColor: "hsl(160, 60%, 78%)",
    apis: [
      {
        name: "Create Node",
        endpoint: "POST /v1/matrix/nodes",
        description: "Provisions a new Matrix community node with configurable membership rules, governance model, and content policies. Returns a live node ready for members to join.",
        response: `{ "node_id": "defi-dao.kred", "type": "open", "governance": "token-weighted", "members": 0, "status": "live" }`,
      },
      {
        name: "Node Hierarchy",
        endpoint: "GET /v1/matrix/nodes/{nodeId}/hierarchy",
        description: "Returns the full 3-level social graph rooted at a node — members, sub-nodes, and their relationships. Designed for agents that need to map knowledge-sharing networks.",
        response: `{ "root": "defi-dao.kred", "depth": 3, "nodes": 14, "members": 420, "edges": [{ "from": "defi-dao.kred", "to": "research.kred", "type": "child" }] }`,
      },
      {
        name: "Member Permissions",
        endpoint: "PUT /v1/matrix/nodes/{nodeId}/members/{memberId}",
        description: "Sets or updates a member's role and permissions within a node. Supports role-based access control — contributors, moderators, governors — configurable per node.",
        response: `{ "member": "alice.kred", "role": "moderator", "permissions": ["post", "moderate", "propose"], "effective_from": "now" }`,
      },
      {
        name: "Knowledge Sharing Feed",
        endpoint: "GET /v1/matrix/nodes/{nodeId}/knowledge",
        description: "Returns curated knowledge artefacts shared across the node hierarchy — posts, proposals, research briefs — ranked by propagation depth and author trust score.",
        response: `{ "items": [{ "id": "...", "propagated_from": "research.kred", "depth": 2, "author_score": 810, "content": "..." }] }`,
      },
    ],
    agents: [
      {
        name: "Architect.Matrix.Kred",
        description: "Designs and instantiates new matrix variants. Deploys full node hierarchies from a community brief — root nodes, sub-nodes, working groups — with governance and membership rules configured per level.",
        example: `"Instantiate a 3-tier DeFi research matrix with token-weighted governance at the root and open contribution at leaf nodes."`,
      },
      {
        name: "Curator.Matrix.Kred",
        description: "Manages the content pipeline using rule-based filters. Screens incoming posts, surfaces high-signal knowledge artefacts, and routes content to the nodes most likely to benefit.",
        example: "Applied 12 quality filters to 840 weekly posts. Surfaced 34 high-signal artefacts and routed them to 6 relevant sub-nodes.",
      },
      {
        name: "Community.Matrix.Kred",
        description: "Grows the community through subscriptions and onboarding. Identifies potential members, sends personalised invitations, and guides new members through contextual introductions.",
        example: "Invited 80 verified DeFi researchers via targeted outreach. 52 joined within 7 days with an average trust score of 790.",
      },
      {
        name: "Analyst.Matrix.Kred",
        description: "Monitors platform health and computes influence scores. Tracks engagement velocity, member churn, content quality trends, and contributor reputation across the node hierarchy.",
        example: `Reported: "Node health score 78 (+6 WoW). Top contributor: alice.kred (influence: 0.91). Alert: governance participation below threshold."`,
      },
      {
        name: "Guardian.Matrix.Kred",
        description: "Manages node isolation and enforces rate limits. Prevents spam, detects coordinated manipulation, and quarantines bad actors without disrupting legitimate community activity.",
        example: "Detected a sybil cluster of 9 accounts inflating governance votes. Isolated all 9 before the proposal deadline.",
      },
      {
        name: "Governance.Matrix.Kred",
        description: "Manages community governance rules and dispute resolution. Drafts proposals, tracks voting, enforces quorum requirements, and mediates member conflicts against the node's constitution.",
        example: `"Proposal P42 passed quorum (73%). Drafted rationale, notified members, and scheduled rule update for next epoch."`,
      },
      {
        name: "Integrator.Matrix.Kred",
        description: "Manages data flow with external systems including Slack, WordPress, and other platforms. Syncs content, membership events, and governance outcomes across the Matrix and connected channels.",
        example: "Bridged a 1,200-member Slack workspace to a Matrix node. All governance proposals now mirror to Slack with one-click voting links.",
      },
      {
        name: "Vault.Matrix.Kred",
        description: "Manages encryption, self-destruct messages, and access controls. Ensures sensitive node communications are end-to-end encrypted and that access permissions are enforced at every layer.",
        example: "Configured a private council sub-node with E2E encryption, 24h self-destruct on sensitive proposals, and role-gated read access.",
      },
    ],
    skills: [
      {
        name: "spawn_node_hierarchy",
        description: "Creates a complete multi-level node structure from a single configuration object. Handles parent–child linking, role setup, and initial governance configuration in one call.",
        example: `spawn_node_hierarchy({ root: "dao.kred", levels: 3, governance: "token-weighted" }) → { nodes_created: 7, members_invited: 0, live: true }`,
      },
      {
        name: "propagate_knowledge",
        description: "Takes a content item and propagates it up or down a node hierarchy based on relevance scoring. Agents use this to ensure important research reaches the right communities automatically.",
        example: `propagate_knowledge("post_42", direction="up", threshold=0.8) → { propagated_to: ["parent.kred", "grandparent.kred"], reach: 340 }`,
      },
    ],
    mcp: [
      {
        name: "inject-node-hierarchy",
        description: "Injects the full node hierarchy — structure, member counts, governance state, recent activity — into context so the model can reason about network topology without separate lookups.",
        example: "A governance agent injects the hierarchy before drafting a proposal to ensure it targets the correct node level and membership scope.",
      },
      {
        name: "node-spawn-tool",
        description: "Lets the model create sub-nodes mid-conversation as a native tool call. When a community decides to form a working group, the model can provision it inline without leaving the discussion.",
        example: "Community discussion identifies a new research focus. Model calls node-spawn-tool to create a dedicated sub-node and invites the relevant members in the same response.",
      },
    ],
  },
  {
    id: "matrixkred",
    name: "Matrix.Kred",
    tag: "Feeds",
    tagColor: "hsl(250, 65%, 85%)",
    apis: [
      {
        name: "Ranked Signal Feed",
        endpoint: "GET /v1/matrix/feed/{agentId}?model=interest_graph",
        description: "Returns content ranked by an agent's calibrated interest model — not chronological, not popularity-ranked, but relevance-scored to this specific agent's context and goals.",
        response: `{ "items": [{ "id": "...", "relevance": 0.96, "why": "matches goal: find-defi-alpha", "content": "..." }] }`,
      },
      {
        name: "Governance State",
        endpoint: "GET /v1/matrix/{nodeId}/governance",
        description: "Returns all open proposals with voting power breakdown, deadline, quorum status, and a natural-language summary of what each proposal would change. Designed so agents can vote autonomously.",
        response: `{ "proposals": [{ "id": "p42", "summary": "Reduce staking lockup from 30d to 14d", "your_voting_power": 1240, "quorum": "73%", "deadline": "2h" }] }`,
      },
      {
        name: "Community Health",
        endpoint: "GET /v1/matrix/{nodeId}/health",
        description: "A composite health score for a community node — engagement velocity, member churn, governance participation, content quality trends. Agents use this to prioritise which communities to invest in.",
        response: `{ "health_score": 78, "trend": "improving", "alerts": ["low_governance_participation"], "top_contributors": ["alice.kred"] }`,
      },
      {
        name: "Semantic Search",
        endpoint: "POST /v1/matrix/search",
        description: "Full-text + semantic search across all Matrix community content. Returns ranked results with source node, author trust scores, and publication dates.",
        response: `{ "results": [{ "content": "...", "node": "defi-dao.kred", "author_score": 820, "published": "3h ago" }] }`,
      },
    ],
    agents: [
      {
        name: "Autonomous Community Manager",
        description: "Runs a Matrix community 24/7 — welcomes members, surfaces relevant content, moderates policy violations, and produces weekly digest reports for human stakeholders.",
        example: "Manages a 2,000-member DeFi research community with zero human moderation overhead.",
      },
      {
        name: "Governance Delegate",
        description: "Acts as an autonomous voting delegate. Analyses every proposal against a configurable set of values (e.g., 'prioritise decentralisation, avoid inflation'), votes accordingly, and posts a public rationale.",
        example: `"Voted YES on P42 — reduces friction for small stakers while preserving security guarantees."`,
      },
      {
        name: "Research Synthesiser",
        description: "Monitors multiple Matrix communities for signal on a specific topic, synthesises findings across sources, and delivers a structured research brief on demand.",
        example: `"Synthesise everything posted about EigenLayer restaking in the last 7 days across all my followed nodes."`,
      },
    ],
    skills: [
      {
        name: "draft_and_post_governance",
        description: "Given a policy goal in plain English, drafts a governance proposal, checks it against existing rules for conflicts, and submits it to the appropriate Matrix node.",
        example: `draft_and_post_governance("Reduce token lockup to 14 days", node="treasury.kred")`,
      },
      {
        name: "synthesise_feed",
        description: "Pulls the latest N feed items, clusters them by theme, and returns a structured digest with key takeaways per cluster. Cuts reading time for agents managing large community portfolios.",
        example: `synthesise_feed("defi-alpha.kred", last_hours=24) → { clusters: [{ theme: "restaking", items: 7, summary: "..." }] }`,
      },
    ],
    mcp: [
      {
        name: "inject-community-context",
        description: "Injects the live state of a Matrix community — recent discussions, active proposals, top contributors, current sentiment — into the model context window before a community-related task.",
        example: "Before drafting a governance proposal, an agent calls this to understand the current community mood and what proposals have recently failed.",
      },
      {
        name: "feed-filter-tool",
        description: "Lets the model dynamically filter the Matrix feed during inference — the model can ask 'show me only governance posts from high-trust authors in the last 48h' as a tool call mid-reasoning.",
        example: "Used by research agents that need to narrow focus without pre-knowing the exact filter parameters.",
      },
    ],
  },
  {
    id: "empirekred",
    name: "Empire.Kred",
    tag: "Simulate Economies",
    tagColor: "hsl(25, 80%, 82%)",
    apis: [
      {
        name: "Monte Carlo Simulation",
        endpoint: "POST /v1/empire/simulate",
        description: "Run thousands of market scenarios in seconds. Given a token configuration or trade strategy, returns probability distributions — not just best/worst case, but the full shape of the risk.",
        response: `{ "runs": 10000, "p10": -23, "p50": +41, "p90": +180, "ruin_probability": 0.04, "sharpe": 1.8 }`,
      },
      {
        name: "Token Distribution Optimiser",
        endpoint: "POST /v1/empire/tokenomics/optimise",
        description: "Given supply, vesting schedules, and holder objectives, returns the distribution configuration that maximises long-term token health — modelled against historical Empire economy data.",
        response: `{ "recommended": { "team": "15%", "community": "40%", "liquidity": "20%" }, "projected_gini": 0.42, "unlock_cliff": "12m" }`,
      },
      {
        name: "Competitive Intelligence",
        endpoint: "GET /v1/empire/market/intel",
        description: "Analyses current active agents, their recent trade patterns, and surfaced weaknesses or arbitrage opportunities. Designed for agents that want an edge, not just market data.",
        response: `{ "opportunities": [{ "type": "arbitrage", "asset_pair": "X/Y", "expected_edge": 0.08, "window_closes": "~2h" }] }`,
      },
      {
        name: "Race Strategy Engine",
        endpoint: "POST /v1/empire/race/strategy",
        description: "Given the race field, track conditions, and car stats, returns the optimal entry configuration and in-race strategy — including a decision tree the agent can follow reactively.",
        response: `{ "enter": true, "car": "car_047", "strategy": "conservative_start", "win_probability": 0.34, "expected_reward": 840 }`,
      },
    ],
    agents: [
      {
        name: "Tokenomics Architect",
        description: "Designs complete token economies from a brief. Specifies supply, distribution, vesting, inflation curves, and incentive mechanisms — then validates each decision against Empire simulation data.",
        example: `"Design a governance token for a 10,000-member DAO that incentivises long-term participation without founder concentration."`,
      },
      {
        name: "Autonomous Trader",
        description: "Executes a defined trading strategy within Empire.Kred — momentum, mean-reversion, or custom. Adjusts position sizing based on live risk signals and closes positions on configurable stop-loss triggers.",
        example: "Running a cross-asset momentum strategy with a 2% daily drawdown limit.",
      },
      {
        name: "Race Fleet Manager",
        description: "Manages a portfolio of race entries across multiple concurrent races — selects optimal car-race pairings, monitors results, and reinvests rewards according to a growth strategy.",
        example: "Entered 6 races simultaneously, selecting cars based on track-to-stat fit analysis. ROI: +340% over 30 days.",
      },
    ],
    skills: [
      {
        name: "run_tokenomics_simulation",
        description: "Takes a token spec and runs a Monte Carlo simulation over it, returning key risk metrics and a plain-English risk summary. Agents use this before recommending any token investment.",
        example: `run_tokenomics_simulation({ supply: 1e9, team_pct: 20, cliff: "6m" }) → { ruin_prob: 0.12, health: "moderate", warnings: ["high team concentration"] }`,
      },
      {
        name: "pick_race_entry",
        description: "Analyses the current race field and the agent's garage, and returns the single best car-race pairing with confidence score and strategic rationale.",
        example: `pick_race_entry(garage="vault.kred/cars", race_id="r88") → { car: "thunderbolt_3", confidence: 0.81, rationale: "Best speed-to-track-condition fit" }`,
      },
    ],
    mcp: [
      {
        name: "inject-economy-state",
        description: "Injects live Empire economy state — current prices, active races, top traders, volatility indices — into model context. The model can reason about market conditions without making separate API calls.",
        example: "A strategy agent calls this before every trading session so its reasoning is grounded in current market reality, not stale data.",
      },
      {
        name: "simulation-tool",
        description: "Lets the model trigger Monte Carlo simulations mid-reasoning as a native tool call. The model can say 'before I commit to this strategy, let me simulate it' and get results inline.",
        example: "Model evaluating a trade calls simulation-tool with the proposed position, sees a 12% ruin probability, and adjusts its recommendation accordingly.",
      },
    ],
  },
  {
    id: "onehub",
    name: "OneHub.Kred",
    tag: "Build Collections",
    tagColor: "hsl(330, 70%, 82%)",
    apis: [
      {
        name: "Generative Collection Deploy",
        endpoint: "POST /v1/hub/collections/generate",
        description: "Describe a collection in natural language and get back a fully configured deployment — traits, rarity curves, metadata schema, and mint contract — ready to deploy in one call.",
        response: `{ "collection_id": "col_99", "name": "DeepSea Creatures", "supply": 5000, "rarity_distribution": {...}, "deploy_ready": true }`,
      },
      {
        name: "Engagement Intelligence",
        endpoint: "GET /v1/hub/{hubId}/engagement-intel",
        description: "Not just engagement metrics — an analysis of which items drive the most community activity, which member segments are most valuable, and specific actions to improve retention.",
        response: `{ "top_item": "item_042", "churn_risk": "18% members inactive 7d", "recommended_action": "run_drop_for_segment", "segment": "power-traders" }`,
      },
      {
        name: "Dynamic Trait Evolution",
        endpoint: "POST /v1/hub/items/{itemId}/evolve",
        description: "Trigger trait evolution for an item based on its owner's on-chain activity. Items that 'level up' based on behaviour, not just time. Supports conditional logic.",
        response: `{ "item": "item_042", "trait_changed": "background", "from": "common", "to": "rare", "trigger": "owner_completed_5_trades" }`,
      },
      {
        name: "Cross-Collection Compose",
        endpoint: "POST /v1/hub/compose",
        description: "Combine items from multiple collections into a new composite NFT. Agents use this to create bundles, upgrade paths, or fusion mechanics without custom contract code.",
        response: `{ "composite_id": "comp_17", "source_items": ["item_01", "item_44"], "new_traits": ["fusion-badge"], "minted": true }`,
      },
    ],
    agents: [
      {
        name: "Collection Genesis Agent",
        description: "Takes a creative brief — theme, audience, economics — and ships a complete collection: art direction, trait system, rarity design, pricing, and launch strategy. Start to deploy in a single conversation.",
        example: `"Launch a 1000-piece collection for my DeFi community. Members who've traded >$10k get guaranteed rare tier."`,
      },
      {
        name: "Community Growth Agent",
        description: "Monitors engagement signals, identifies at-risk members, designs targeted drops or XP boosts to re-engage them, and measures the impact. Runs continuously in the background.",
        example: "Identified 340 inactive members. Triggered exclusive mini-drop. 61% re-engagement within 48h.",
      },
    ],
    skills: [
      {
        name: "design_collection",
        description: "Generates a complete collection design from a brief — traits, rarity distribution, metadata schema, and economic model. Output is immediately deployable via the deploy API.",
        example: `design_collection("cyberpunk cats, 500 supply, holders get governance votes") → { traits, rarity_curve, deploy_config }`,
      },
      {
        name: "run_targeted_drop",
        description: "Identifies the right member segment for a drop based on engagement data, executes the mint, and tracks redemption. No manual segment building required.",
        example: `run_targeted_drop(hub="hub.kred", criteria="inactive_30d AND total_trades > 5") → { sent: 142, redeemed: 89, re-engagement: "63%" }`,
      },
    ],
    mcp: [
      {
        name: "inject-collection-context",
        description: "Injects the live state of a OneHub collection into context — item catalogue, trait distribution, engagement metrics, recent trades, top holders. The model can make collection-aware decisions without separate lookups.",
        example: "A community manager agent injects this before drafting communications so its tone and offers are calibrated to current collection momentum.",
      },
      {
        name: "trait-evolution-trigger",
        description: "The model can trigger trait evolution mid-conversation as a reward — during a support resolution, the agent can upgrade the user's NFT trait as a goodwill gesture.",
        example: "Support agent resolves a billing dispute and calls this to upgrade the user's item rarity tier as a retention gesture.",
      },
    ],
  },
  {
    id: "domains",
    name: "Domains.Kred",
    tag: "Sell Domains",
    tagColor: "hsl(270, 65%, 85%)",
    apis: [
      {
        name: "Intent-Aware Domain Search",
        endpoint: "POST /v1/domains/search/intent",
        description: "Describe what the domain is for, and get back ranked suggestions with reasoning — not just availability, but fit-score, brand clarity, and projected value trajectory.",
        response: `{ "query": "AI agent for legal research", "suggestions": [{ "domain": "legalaid.kred", "fit": 0.91, "why": "clear intent, professional tone", "price": "$12/yr" }] }`,
      },
      {
        name: "Portfolio Valuation",
        endpoint: "GET /v1/domains/portfolio/{address}/valuation",
        description: "Returns a market valuation for each domain in a portfolio with comparables, trend signals, and recommended actions — hold, list, or let expire.",
        response: `{ "domains": [{ "domain": "ai.kred", "est_value": "$2,400", "trend": "rising", "action": "hold", "comparables": ["ai.eth: $8k"] }] }`,
      },
      {
        name: "Agentic Negotiation Flow",
        endpoint: "POST /v1/domains/reseller/negotiate",
        description: "Full agentic sale flow — the API handles the negotiation loop, counter-offer logic, and closes the deal within configured price bounds. Agents plug in and let it run.",
        response: `{ "domain": "vault.kred", "asking": "$500", "offer_received": "$320", "counter_sent": "$430", "status": "negotiating" }`,
      },
      {
        name: "Brand Availability Sweep",
        endpoint: "POST /v1/domains/sweep",
        description: "Given a brand name or concept, checks availability across .kred plus ENS and key TLDs in one call. Returns a consolidated availability map and recommended registration strategy.",
        response: `{ "brand": "skyagent", "kred": "available", "eth": "taken", "io": "available", "recommended": "register skyagent.kred + skyagent.io" }`,
      },
    ],
    agents: [
      {
        name: "Autonomous Domain Broker",
        description: "Runs inbound lead qualification, domain recommendation, negotiation, and close — end to end, without human involvement. Configured with price floors and style guidelines, it handles the rest.",
        example: "Closed 14 domain sales in a week with an average 23% improvement over initial asking price.",
      },
      {
        name: "Portfolio Strategist",
        description: "Monitors a domain portfolio for expiry risk, resale opportunities, and undervalued assets. Produces a weekly strategy brief and executes approved renewals or listings autonomously.",
        example: "Flagged vault.kred expiring in 30 days, estimated resale at 12x renewal cost, listed it with a $500 ask.",
      },
    ],
    skills: [
      {
        name: "find_perfect_domain",
        description: "Takes a description of a project, person, or agent and returns the three best .Kred domain options with fit scores, pricing, and a one-line pitch for each suggestion.",
        example: `find_perfect_domain("autonomous agent that manages DeFi yield strategies") → [{ domain: "yieldpilot.kred", fit: 0.93, pitch: "Clear, memorable, trust-signalling" }]`,
      },
      {
        name: "register_for_agent",
        description: "Registers a .Kred domain on behalf of an agent identity during onboarding flows. Handles payment, ENS linking, and initial metadata setup in a single skill call.",
        example: `register_for_agent({ name: "alice.kred", wallet: "0x...", link_ens: true }) → { registered: true, tx: "0xdef...", ens_synced: true }`,
      },
    ],
    mcp: [
      {
        name: "domain-availability-tool",
        description: "Lets the model check domain availability mid-conversation as a native tool call. When a user says 'I want to name my agent Vortex', the model can instantly check availability and suggest alternatives without leaving the conversation.",
        example: "User: 'Name my agent Vortex'. Model checks vortex.kred → taken → suggests vortexai.kred and vortex-agent.kred in the same response.",
      },
      {
        name: "inject-portfolio-context",
        description: "Injects the agent's full domain portfolio — valuations, expiry dates, pending offers, listing status — into context. Portfolio agents use this at the start of every session.",
        example: "Portfolio agent wakes up, injects context, sees vault.kred has an expiring offer, and drafts an acceptance recommendation before the human even logs in.",
      },
    ],
  },
  {
    id: "hotgarage",
    name: "HotGarage.Kred",
    tag: "Compete and Win",
    tagColor: "hsl(210, 70%, 85%)",
    apis: [
      {
        name: "Race Match Prediction",
        endpoint: "POST /v1/garage/races/{raceId}/predict",
        description: "Given the full field and conditions, returns win probabilities, expected reward distributions, and key match-up breakdowns. More than odds — it's the reasoning an agent needs to decide whether to enter.",
        response: `{ "entry": "thunderbolt_3", "win_prob": 0.31, "expected_reward": 720, "key_matchups": [{ "vs": "speedster_7", "advantage": "braking" }], "recommendation": "enter" }`,
      },
      {
        name: "Generative Car Minting",
        endpoint: "POST /v1/garage/cars/generate",
        description: "Describe the car you want — personality, play style, aesthetic — and get back a procedurally generated NFT with balanced stats and unique traits. AI-assisted, deterministically fair.",
        response: `{ "car_id": "car_091", "name": "GlitchRunner", "traits": { "speed": 88, "endurance": 72, "braking": 91 }, "rarity": "rare", "minted": true }`,
      },
      {
        name: "Track Condition Forecast",
        endpoint: "GET /v1/garage/races/{raceId}/conditions",
        description: "Returns current and projected track conditions with their impact coefficients per stat category. Agents use this to swap cars or adjust strategy before a race locks.",
        response: `{ "surface": "wet_tarmac", "wind": "crosswind_high", "braking_coefficient": 1.4, "recommended_build": "high-endurance" }`,
      },
      {
        name: "Claim and Reinvest",
        endpoint: "POST /v1/garage/rewards/claim-and-reinvest",
        description: "Claims pending rewards and immediately reinvests according to a configured strategy — buy car parts, enter next race, or bank tokens. Designed for agents that run fully autonomously.",
        response: `{ "claimed": 1240, "action": "entered_3_races", "new_balance": 340, "races_entered": ["r90", "r91", "r92"] }`,
      },
    ],
    agents: [
      {
        name: "Fleet Racing Agent",
        description: "Manages a garage of multiple cars across concurrent races — analyses each race field, picks the optimal entry, monitors in-race, claims rewards, and compounds winnings. Zero human input required.",
        example: "Managing 8 cars. This month: 34 races entered, 11 wins, 2.8x return on stake.",
      },
      {
        name: "Car Design Agent",
        description: "Generates new cars optimised for specific race formats or counter-strategies. Uses historical race data to identify underserved stat profiles and designs cars to fill the gap.",
        example: "Analysed the current meta and designed 'BrakeMaster' — a high-braking build that counters the dominant speed-heavy field. Win rate: 41%.",
      },
      {
        name: "Race Environment Architect",
        description: "Designs novel race environments — track layouts, hazards, weather conditions — that create interesting strategic trade-offs and ensure no single stat profile dominates.",
        example: "Created 'Urban Labyrinth' — a technical track where braking beats raw speed. Highest player engagement of any track this season.",
      },
    ],
    skills: [
      {
        name: "optimise_garage",
        description: "Analyses the current race schedule and the agent's garage, and returns an entry plan — which car in which race — that maximises expected reward across the next 7 days.",
        example: `optimise_garage("vault.kred/garage", horizon="7d") → { plan: [{ race: "r90", car: "thunderbolt_3", expected_reward: 820 }], total_projected: 4200 }`,
      },
      {
        name: "design_counter_car",
        description: "Given the meta — what builds are currently dominating — designs a car with stats that specifically counter the field. Adversarial design, not just strong stats.",
        example: `design_counter_car(meta="speed-heavy field") → { build: "high-braking low-speed", predicted_win_rate_vs_meta: "0.44" }`,
      },
    ],
    mcp: [
      {
        name: "inject-race-context",
        description: "Injects the full race situation into context — field composition, track conditions, your cars' stats, historical head-to-head records — so the model can make race decisions natively in a single inference pass.",
        example: "Race strategy agent wakes up 30 min before race lock. Injects context, reasons over the field, submits optimal entry — all within a single inference pass.",
      },
      {
        name: "live-race-telemetry",
        description: "Streams live race telemetry into the model's context window during an in-progress race. Enables agents to make mid-race strategic adjustments as conditions evolve.",
        example: "Model sees its car falling behind on lap 3 due to unexpected crosswind, triggers a strategy adjustment call to compensate in the final sector.",
      },
    ],
  },
  {
    id: "giftstudio",
    name: "GiftStudio.Kred",
    tag: "Create and Give",
    tagColor: "hsl(270, 65%, 85%)",
    apis: [
      {
        name: "Personalisation Engine",
        endpoint: "POST /v1/gifts/personalise",
        description: "Takes a recipient's on-chain identity and returns a fully personalised gift configuration — artwork, message, reward contents — tuned to their interests and activity history. No manual targeting.",
        response: `{ "recipient": "alice.kred", "gift_config": { "theme": "defi-explorer", "message": "Congrats on your 100th trade!", "reward": "rare-badge + 50 XP" } }`,
      },
      {
        name: "Viral Gift Chain",
        endpoint: "POST /v1/gifts/chain",
        description: "Gifts that propagate. When a recipient opens a gift, they can send a derivative to someone else. Configure depth, reward decay, and chain-breaking conditions. Built for organic referral loops.",
        response: `{ "chain_id": "chain_07", "max_depth": 5, "decay_rate": 0.8, "current_reach": 142, "viral_coefficient": 1.4 }`,
      },
      {
        name: "Campaign Attribution",
        endpoint: "GET /v1/gifts/campaigns/{id}/attribution",
        description: "Full attribution tree — which gifts drove which on-chain actions, which recipients converted to active users, and what the downstream token value of each gift was.",
        response: `{ "gifts_sent": 500, "opens": 387, "converted_to_active": 143, "downstream_token_value": "$8,200", "roi": "16.4x" }`,
      },
      {
        name: "Contextual Gift Trigger",
        endpoint: "POST /v1/gifts/triggers",
        description: "Registers an on-chain or off-chain event as a gift trigger — 'send a gift every time a user crosses 100 XP'. Agents set it once and it runs indefinitely.",
        response: `{ "trigger_id": "trig_12", "event": "xp_milestone_100", "gift_template": "welcome-pack", "active": true, "fires_so_far": 47 }`,
      },
    ],
    agents: [
      {
        name: "Growth Gifting Orchestrator",
        description: "Runs end-to-end gifting campaigns as a growth mechanic — identifies high-value moments (first purchase, referral, milestone), designs appropriate gifts, sends them, and measures conversion impact.",
        example: "Identified 'first successful trade' as the highest-ROI gifting moment. Auto-gifts a rare badge + 100 XP. Conversion to second trade: +38%.",
      },
      {
        name: "Relationship Management Agent",
        description: "Maintains ongoing gift relationships with a community — remembers anniversaries, tracks sentiment, and proactively sends meaningful gifts at the right moment without human scheduling.",
        example: "Sent anniversary gifts to all members on their 1-year join date. Churn in that cohort dropped 22% in the following 30 days.",
      },
      {
        name: "Viral Loop Architect",
        description: "Designs gift chain mechanics — reward structure, decay curves, and chain-breaking conditions — to maximise organic reach while maintaining token economics. Tests variants in Empire simulation first.",
        example: "Designed a 4-deep gift chain for a product launch. 500 seed gifts became 2,100 opens via viral propagation.",
      },
    ],
    skills: [
      {
        name: "personalise_and_send",
        description: "Given a recipient identity, generates a fully personalised gift and sends it in one call. Agents use this as a reward primitive anywhere in a workflow — no gift design step required.",
        example: `personalise_and_send("alice.kred", context="completed_first_audit") → { gift_id: "g_88", theme: "achievement", sent: true }`,
      },
      {
        name: "design_viral_campaign",
        description: "Takes a campaign brief — goal, budget, audience — and returns a complete viral gift chain design including seed list, reward structure, and projected reach. Ready to launch in one call.",
        example: `design_viral_campaign({ goal: "onboard 500 new users", budget: "1000 XP", audience: "defi-traders" }) → { chain_depth: 4, seed_count: 120, projected_reach: 680 }`,
      },
    ],
    mcp: [
      {
        name: "inject-recipient-context",
        description: "Injects a recipient's full identity context — interests, history, current XP tier, past gifts received, sentiment signals — so the model can craft a genuinely personalised gift without any manual profiling.",
        example: `A relationship agent drafting a gift message injects Alice's context and writes: "Congrats on your 50th verified trade — your consistency is genuinely rare" rather than a generic congratulations.`,
      },
      {
        name: "gift-as-action",
        description: "The model can send a gift as a native tool call mid-conversation — when a user does something great, the model can decide to reward them inline. No separate gifting workflow required.",
        example: "User solves a community challenge in a chat thread. The moderator agent calls this tool to immediately gift them a milestone badge, visibly, in the same thread.",
      },
    ],
  },
];

const tabConfig = [
  { key: "agents" as const, label: "Agents", icon: Bot, color: "hsl(250, 65%, 80%)" },
  { key: "skills" as const, label: "Skills", icon: Wand2, color: "hsl(25, 80%, 75%)" },
  { key: "apis" as const, label: "APIs", icon: Code2, color: "hsl(165, 70%, 72%)" },
  { key: "mcp" as const, label: "MCP", icon: Plug2, color: "hsl(220, 70%, 80%)" },
];

type TabKey = "apis" | "agents" | "skills" | "mcp";

export const ApiSkills = () => {
  const [activeProject, setActiveProject] = useState(projects[0].id);
  const [activeTab, setActiveTab] = useState<TabKey>("agents");

  useEffect(() => {
    const handler = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (projects.find((p) => p.id === id)) setActiveProject(id);
    };
    window.addEventListener("select-api-project", handler);
    return () => window.removeEventListener("select-api-project", handler);
  }, []);

  const project = projects.find((p) => p.id === activeProject)!;
  const items = project[activeTab];

  return (
    <section id="apis-and-skills" className="relative py-16 md:py-28 px-5 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            APIs & Skills
          </h2>
          <p className="text-base text-muted-foreground max-w-xl mx-auto">
            Explore the endpoints, agents, skills, and MCP integrations available across the Kred ecosystem.
          </p>
        </motion.div>

        {/* Project selector — grouped */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          {[
            {
              label: "Identity",
              ids: ["agenticid"],
            },
            {
              label: "Build",
              ids: ["domains", "matrixkred-nodes", "giftstudio", "onehub"],
            },
            {
              label: "Interact",
              ids: ["matrixkred", "empirekred", "hotgarage"],
            },
          ].map((group) => {
            const groupProjects = group.ids
              .map((id) => projects.find((p) => p.id === id))
              .filter(Boolean) as typeof projects;
            return (
              <div key={group.label} className="flex flex-wrap items-center gap-2 justify-center mb-3">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-foreground/70 w-14 text-right flex-shrink-0">
                  {group.label}
                </span>
                <div className="w-px h-4 bg-border/40 flex-shrink-0" />
                {groupProjects.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setActiveProject(p.id)}
                    className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border ${
                      activeProject === p.id
                        ? "border-transparent"
                        : "border-border/40 text-muted-foreground hover:text-foreground hover:border-border/70"
                    }`}
                    style={
                      activeProject === p.id
                        ? {
                            color: p.tagColor,
                            backgroundColor: `${p.tagColor}18`,
                            borderColor: `${p.tagColor}50`,
                          }
                        : {}
                    }
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            );
          })}
        </motion.div>

        {/* Content card */}
        <motion.div
          className="rounded-2xl border border-border/40 bg-card/40 backdrop-blur-sm overflow-hidden"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          {/* Tab bar */}
          <div className="flex border-b border-border/40 bg-background/30 overflow-x-auto scrollbar-none">
            {tabConfig.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 px-4 sm:px-5 py-3.5 text-xs sm:text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap flex-shrink-0 ${
                    isActive
                      ? "border-current"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                  style={isActive ? { color: tab.color } : {}}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                  <span
                    className="ml-0.5 text-[10px] rounded-full px-1.5 py-0.5 font-semibold"
                    style={
                      isActive
                        ? { backgroundColor: `${tab.color}20`, color: tab.color }
                        : { backgroundColor: "hsl(var(--muted))", color: "hsl(var(--muted-foreground))" }
                    }
                  >
                    {project[tab.key].length}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Items grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeProject}-${activeTab}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {(items as (ApiItem | Item)[]).map((item, i) => (
                <motion.div
                  key={item.name}
                  className="group p-4 rounded-xl border border-border/30 bg-background/20 hover:border-border/60 hover:bg-background/40 transition-all duration-200 flex flex-col gap-2"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {/* Name + HTTP method badge */}
                  <div className="flex items-start justify-between gap-3">
                    <h5 className="text-sm font-semibold font-display text-foreground leading-snug">
                      {item.name}
                    </h5>
                    {"endpoint" in item && item.endpoint && (
                      <code className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary whitespace-nowrap flex-shrink-0">
                        {item.endpoint.split(" ")[0]}
                      </code>
                    )}
                  </div>

                  {/* Endpoint path */}
                  {"endpoint" in item && item.endpoint && (
                    <code className="text-[10px] font-mono text-muted-foreground truncate">
                      {item.endpoint.split(" ").slice(1).join(" ")}
                    </code>
                  )}

                  {/* Description */}
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>

                  {/* Example response (APIs) */}
                  {"response" in item && item.response && (
                    <pre className="mt-1 text-[10px] font-mono leading-relaxed bg-background/50 border border-border/30 rounded-lg p-3 overflow-x-auto text-muted-foreground whitespace-pre-wrap break-all">
                      {item.response}
                    </pre>
                  )}

                  {/* Example usage (agents/skills/mcp) */}
                  {"example" in item && item.example && (
                    <div className="mt-1 rounded-lg border border-border/20 bg-background/30 px-3 py-2">
                      <p className="text-[10px] text-muted-foreground/70 uppercase tracking-wide font-semibold mb-1">Example</p>
                      <p className="text-[11px] font-mono text-muted-foreground leading-relaxed">
                        {item.example}
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
