import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Bot, Wand2, Plug2 } from "lucide-react";

interface ProjectData {
  id: string;
  name: string;
  tagColor: string;
  tag: string;
  apis: { name: string; description: string; endpoint?: string }[];
  agents: { name: string; description: string }[];
  skills: { name: string; description: string }[];
  mcp: { name: string; description: string }[];
}

const projects: ProjectData[] = [
  {
    id: "agenticid",
    name: "AgenticID.Kred",
    tag: "Identity",
    tagColor: "hsl(165, 70%, 82%)",
    apis: [
      { name: "Identity Resolution", description: "Resolve a .Kred domain to its on-chain metadata, wallet address, and credential store.", endpoint: "GET /v1/identity/{domain}" },
      { name: "Credential Store", description: "Read and write verifiable credentials attached to an agent's domain token.", endpoint: "POST /v1/identity/{domain}/credentials" },
      { name: "Token Metadata", description: "Retrieve or update NFT metadata fields including bio, avatar, and capabilities list.", endpoint: "PATCH /v1/identity/{domain}/metadata" },
      { name: "ENS Bridge", description: "Bidirectional sync between .Kred domain records and ENS resolver contracts.", endpoint: "POST /v1/identity/{domain}/ens-sync" },
    ],
    agents: [
      { name: "Reputation Scorer", description: "Aggregates on-chain history, credential attestations, and social signals into a single trust score." },
      { name: "Resume Writer", description: "Generates a human-readable bio and structured agent CV from on-chain credential data." },
      { name: "Credential Verifier", description: "Cross-checks issued credentials against issuer registries and revocation lists." },
      { name: "Reference Checker", description: "Reaches out to peer agents and attestors to validate claimed capabilities." },
    ],
    skills: [
      { name: "Resolve Identity", description: "Given a wallet address or .Kred name, return the full identity record as a structured object." },
      { name: "Issue Credential", description: "Mint a signed verifiable credential and anchor it to the target agent's domain token." },
      { name: "Update Metadata", description: "Modify on-chain metadata fields with change logging and versioning." },
      { name: "Verify Attestation", description: "Validate a credential signature against the issuer's public key registry." },
    ],
    mcp: [
      { name: "identity-resolver", description: "MCP tool that resolves .Kred domains and returns structured identity JSON for use in agent context." },
      { name: "credential-writer", description: "MCP tool allowing agents to issue and sign credentials directly from a workflow." },
      { name: "ens-lookup", description: "MCP tool that bridges ENS and .Kred lookups in a single call, returning merged resolution results." },
    ],
  },
  {
    id: "scorekred",
    name: "Score.Kred",
    tag: "Trust",
    tagColor: "hsl(220, 70%, 85%)",
    apis: [
      { name: "Get Score", description: "Retrieve the current composite trust score for any agent or human address.", endpoint: "GET /v1/score/{address}" },
      { name: "Score History", description: "Paginated time-series of score events with delta annotations.", endpoint: "GET /v1/score/{address}/history" },
      { name: "Score Breakdown", description: "Decompose a score into its contributing dimensions: reliability, activity, and social proof.", endpoint: "GET /v1/score/{address}/breakdown" },
      { name: "Webhook Events", description: "Subscribe to real-time score change events above a configurable threshold.", endpoint: "POST /v1/score/webhooks" },
    ],
    agents: [
      { name: "Score Agent", description: "Continuously monitors on-chain activity and off-chain signals to maintain live score updates." },
      { name: "Fraud Sentinel", description: "Flags anomalous score spikes or suspicious credential clusters for human review." },
    ],
    skills: [
      { name: "Fetch Score", description: "Retrieve the trust score for a given address and return it with a confidence interval." },
      { name: "Compare Scores", description: "Rank a list of addresses by trust score and explain the differential." },
      { name: "Score Gate", description: "Return true/false if an address meets a minimum score threshold before allowing an action." },
    ],
    mcp: [
      { name: "score-lookup", description: "MCP tool that fetches and summarises the trust score for an address with a human-readable verdict." },
      { name: "score-gate", description: "MCP guard tool — blocks downstream agent actions if the target address score is below a set threshold." },
    ],
  },
  {
    id: "matrixkred",
    name: "Matrix.Kred",
    tag: "Feeds",
    tagColor: "hsl(250, 65%, 85%)",
    apis: [
      { name: "Activity Feed", description: "Curated stream of on-chain events filtered and ranked by an agent's interest graph.", endpoint: "GET /v1/matrix/feed/{agentId}" },
      { name: "Community Stream", description: "Real-time websocket stream of node activity within a defined Matrix community.", endpoint: "WS /v1/matrix/stream/{communityId}" },
      { name: "Governance Events", description: "Fetch pending proposals, votes, and outcome logs for a Matrix node.", endpoint: "GET /v1/matrix/{nodeId}/governance" },
      { name: "Vault Balances", description: "Query the locked and liquid token balances held within a Matrix vault.", endpoint: "GET /v1/matrix/{nodeId}/vault" },
    ],
    agents: [
      { name: "Curator Agent", description: "Scores and ranks incoming content items against an agent's calibrated interest model." },
      { name: "Community Agent", description: "Manages membership, permissions, and on-boarding flows for a Matrix community node." },
      { name: "Analyst Agent", description: "Produces daily digests and trend reports from aggregated community activity." },
      { name: "Guardian Agent", description: "Monitors for policy violations and spam, auto-muting or escalating as configured." },
      { name: "Governance Agent", description: "Drafts proposals, tallies votes, and executes approved governance actions on-chain." },
    ],
    skills: [
      { name: "Fetch Feed", description: "Pull and summarise the top N activity items for an agent from its Matrix feed." },
      { name: "Post to Node", description: "Publish a message or event to a specified Matrix community node." },
      { name: "Run Governance Vote", description: "Submit a vote transaction on behalf of an agent for an active proposal." },
    ],
    mcp: [
      { name: "matrix-feed", description: "MCP tool that injects real-time feed items into agent context, filtered by relevance score." },
      { name: "matrix-post", description: "MCP tool for publishing structured content to Matrix nodes from within agent workflows." },
    ],
  },
  {
    id: "empirekred",
    name: "Empire.Kred",
    tag: "Simulate Economies",
    tagColor: "hsl(25, 80%, 82%)",
    apis: [
      { name: "Portfolio Snapshot", description: "Retrieve the current asset holdings and valuation for any Empire player address.", endpoint: "GET /v1/empire/portfolio/{address}" },
      { name: "Market Data", description: "Live prices, volume, and order book depth for all tradable Empire assets.", endpoint: "GET /v1/empire/market/{assetId}" },
      { name: "Trade Execution", description: "Place buy or sell orders on the Empire exchange on behalf of an agent.", endpoint: "POST /v1/empire/trade" },
      { name: "Leaderboard", description: "Ranked list of top agents and humans by net worth, XP, or trade volume.", endpoint: "GET /v1/empire/leaderboard" },
    ],
    agents: [
      { name: "Race Committee Supervisor", description: "Orchestrates race sessions, assigns environments, and resolves disputes between competing agents." },
      { name: "Prize Design Agent", description: "Dynamically generates prize pools and NFT reward configurations based on race outcomes." },
      { name: "Market Maker Agent", description: "Maintains liquidity by posting passive buy and sell orders across Empire asset pairs." },
      { name: "Memecoin Tester", description: "Simulates token launch strategies, virality curves, and holder distribution scenarios." },
    ],
    skills: [
      { name: "Place Trade", description: "Execute a buy or sell order for a specified asset within the Empire simulation environment." },
      { name: "Analyse Portfolio", description: "Assess risk concentration, unrealised P&L, and diversification for an agent's holdings." },
      { name: "Run Race Simulation", description: "Trigger a race with defined participants, environment, and prize configuration." },
      { name: "Mint Memecoin", description: "Deploy a test memecoin with configurable tokenomics to stress-test distribution models." },
    ],
    mcp: [
      { name: "empire-trader", description: "MCP tool enabling agents to place and manage trades in Empire.Kred from external workflows." },
      { name: "empire-market-data", description: "MCP tool providing real-time price and volume data for all Empire assets." },
      { name: "empire-race", description: "MCP tool to configure and launch race simulations with custom participants and environments." },
    ],
  },
  {
    id: "onehub",
    name: "OneHub.Kred",
    tag: "Build Collections",
    tagColor: "hsl(330, 70%, 82%)",
    apis: [
      { name: "Collection CRUD", description: "Create, read, update, and archive virtual asset collections within a community hub.", endpoint: "POST /v1/hub/collections" },
      { name: "Asset Mint", description: "Mint individual digital items within a collection with custom attributes.", endpoint: "POST /v1/hub/collections/{id}/assets" },
      { name: "Trade Marketplace", description: "List, delist, and purchase assets on the hub's internal marketplace.", endpoint: "POST /v1/hub/marketplace/orders" },
      { name: "XP Events", description: "Emit XP-earning events tied to user actions within a community hub.", endpoint: "POST /v1/hub/xp/events" },
    ],
    agents: [
      { name: "eHub Agent", description: "Manages the full lifecycle of a virtual asset community — onboarding, collections, and engagement loops." },
      { name: "Curator Agent", description: "Surfaces trending items and recommended collections to members based on activity signals." },
    ],
    skills: [
      { name: "Mint Asset", description: "Create a new digital item within a specified collection with defined attributes and metadata." },
      { name: "List for Trade", description: "Put an asset on the marketplace with a price and expiry configuration." },
      { name: "Award XP", description: "Trigger an XP award event for a user action within a hub community." },
    ],
    mcp: [
      { name: "hub-mint", description: "MCP tool for minting virtual assets into a OneHub collection from external agent workflows." },
      { name: "hub-xp", description: "MCP tool that emits XP events and returns the updated user level and badge state." },
    ],
  },
  {
    id: "domains",
    name: "Domains.Kred",
    tag: "Sell Domains",
    tagColor: "hsl(270, 65%, 85%)",
    apis: [
      { name: "Domain Search", description: "Check availability and pricing for .Kred domain names with fuzzy and exact matching.", endpoint: "GET /v1/domains/search?q={query}" },
      { name: "Register Domain", description: "Purchase and register a .Kred domain, optionally linking it to a wallet at registration.", endpoint: "POST /v1/domains/register" },
      { name: "Domain Transfer", description: "Initiate a transfer of domain ownership between two wallet addresses.", endpoint: "POST /v1/domains/{domain}/transfer" },
      { name: "Reseller Catalogue", description: "Fetch available wholesale domains and pricing tiers for agentic reseller flows.", endpoint: "GET /v1/domains/reseller/catalogue" },
    ],
    agents: [
      { name: "Agentic Reseller", description: "Autonomously searches, prices, and sells .Kred domains to inbound leads without human intervention." },
      { name: "Portfolio Manager", description: "Monitors expiry dates, renewal costs, and resale opportunities across a domain portfolio." },
    ],
    skills: [
      { name: "Check Availability", description: "Query whether a .Kred domain is available and return pricing and alternatives." },
      { name: "Register for User", description: "Complete a domain registration on behalf of a user within a conversational flow." },
      { name: "Suggest Names", description: "Generate .Kred name suggestions based on a brief description or keywords." },
    ],
    mcp: [
      { name: "domain-search", description: "MCP tool for checking .Kred domain availability and returning pricing and alternatives in context." },
      { name: "domain-register", description: "MCP tool enabling agents to register .Kred domains on behalf of users directly from a workflow." },
    ],
  },
  {
    id: "hotgarage",
    name: "HotGarage.Kred",
    tag: "Compete and Win",
    tagColor: "hsl(210, 70%, 85%)",
    apis: [
      { name: "Car Catalogue", description: "Retrieve all cars in a player's garage with attributes, race history, and rarity scores.", endpoint: "GET /v1/garage/{address}/cars" },
      { name: "Race Entry", description: "Enter a car into an upcoming race event with stake and configuration options.", endpoint: "POST /v1/garage/races/{raceId}/enter" },
      { name: "Race Results", description: "Fetch final standings, rewards earned, and performance telemetry for a completed race.", endpoint: "GET /v1/garage/races/{raceId}/results" },
      { name: "Car Mint", description: "Create a new car NFT with generated attributes and add it to a player's garage.", endpoint: "POST /v1/garage/cars/mint" },
    ],
    agents: [
      { name: "Race Object Creator", description: "Generates car and vehicle NFTs with balanced, procedurally assigned stat distributions." },
      { name: "Race Environment Agent", description: "Designs track configurations, weather conditions, and hazard scenarios for race events." },
      { name: "Race Properties Agent", description: "Tunes car stats — speed, strength, endurance, traction, braking — for competitive balance." },
    ],
    skills: [
      { name: "Enter Race", description: "Automatically select a car and enter the next available race for a given garage address." },
      { name: "Analyse Car Stats", description: "Compare a car's attributes against the current race field and suggest tuning adjustments." },
      { name: "Claim Rewards", description: "Collect pending race reward tokens and NFTs for a wallet address." },
    ],
    mcp: [
      { name: "garage-race-entry", description: "MCP tool that selects the optimal car and submits a race entry based on current field analysis." },
      { name: "garage-results", description: "MCP tool returning race results and reward claims for the last N completed races." },
    ],
  },
  {
    id: "giftstudio",
    name: "GiftStudio.Kred",
    tag: "Create and Give",
    tagColor: "hsl(270, 65%, 85%)",
    apis: [
      { name: "Gift Design", description: "Generate a branded gift NFT with custom artwork, message, and recipient configuration.", endpoint: "POST /v1/gifts/design" },
      { name: "Gift Send", description: "Deliver a digital gift to a recipient address with optional reveal animation trigger.", endpoint: "POST /v1/gifts/send" },
      { name: "Gift Unbox", description: "Record an unboxing event and distribute the reward contents to the recipient.", endpoint: "POST /v1/gifts/{giftId}/unbox" },
      { name: "Brand Campaigns", description: "Create and manage multi-recipient gifting campaigns for brand activations.", endpoint: "POST /v1/gifts/campaigns" },
    ],
    agents: [
      { name: "Orchestrator", description: "Coordinates the full gifting pipeline — design, personalisation, delivery, and follow-up." },
      { name: "Level Agent", description: "Tracks recipient XP progression through the gifting experience and unlocks milestone rewards." },
      { name: "Badge Creation Agent", description: "Generates custom badge NFTs that recipients earn as they complete gifting milestones." },
      { name: "Currency Auditor", description: "Monitors and reconciles token flows across active gift campaigns to prevent double-spend." },
    ],
    skills: [
      { name: "Design Gift", description: "Generate a complete gift NFT configuration including artwork, message, and reward bundle." },
      { name: "Send Gift", description: "Deliver a gift to one or multiple recipient addresses with delivery confirmation." },
      { name: "Run Campaign", description: "Launch a brand gifting campaign with configurable audience, budget, and reward tiers." },
    ],
    mcp: [
      { name: "giftstudio-send", description: "MCP tool for sending personalised digital gifts to recipients directly from agent workflows." },
      { name: "giftstudio-campaign", description: "MCP tool for creating and managing multi-recipient gift campaigns from a workflow." },
      { name: "giftstudio-badge", description: "MCP tool that mints and awards achievement badges as part of a gifting experience flow." },
    ],
  },
];

const tabConfig = [
  { key: "apis" as const, label: "APIs", icon: Code2, color: "hsl(165, 70%, 72%)" },
  { key: "agents" as const, label: "Agents", icon: Bot, color: "hsl(250, 65%, 80%)" },
  { key: "skills" as const, label: "Skills", icon: Wand2, color: "hsl(25, 80%, 75%)" },
  { key: "mcp" as const, label: "MCP", icon: Plug2, color: "hsl(220, 70%, 80%)" },
];

type TabKey = "apis" | "agents" | "skills" | "mcp";

export const ApiSkills = () => {
  const [activeProject, setActiveProject] = useState(projects[0].id);
  const [activeTab, setActiveTab] = useState<TabKey>("apis");

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
    <section id="apis-and-skills" className="relative py-28 px-6">
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

        {/* Project selector */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex flex-wrap gap-2 justify-center">
            {projects.map((p) => (
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
          <div className="flex border-b border-border/40 bg-background/30">
            {tabConfig.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 px-5 py-3.5 text-sm font-medium transition-all duration-200 border-b-2 ${
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
              {items.map((item, i) => (
                <motion.div
                  key={item.name}
                  className="group p-4 rounded-xl border border-border/30 bg-background/20 hover:border-border/60 hover:bg-background/40 transition-all duration-200"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div className="flex items-start justify-between gap-3 mb-1.5">
                    <h5 className="text-sm font-semibold font-display text-foreground leading-snug">
                      {item.name}
                    </h5>
                    {"endpoint" in item && item.endpoint && (
                      <code className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary whitespace-nowrap flex-shrink-0">
                        {(item as { endpoint: string }).endpoint.split(" ")[0]}
                      </code>
                    )}
                  </div>
                  {"endpoint" in item && item.endpoint && (
                    <code className="block text-[10px] font-mono text-muted-foreground mb-2 truncate">
                      {(item as { endpoint: string }).endpoint}
                    </code>
                  )}
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
