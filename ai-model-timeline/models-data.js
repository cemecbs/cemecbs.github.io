/**
 * Frontier AI Models Dataset (2022 - Late 2026)
 * Chronological release data, technical specifications, benchmarks, and architectural breakthroughs.
 * Universal Module Definition: Supports script tag, ES import, and CommonJS.
 */

(function (root, factory) {
  if (typeof exports === 'object' && typeof module !== 'undefined') {
    module.exports = factory();
  } else {
    const data = factory();
    root.FRONTIER_AI_DATA = data;
    root.LABS = data.LABS;
    root.FRONTIER_MODELS = data.FRONTIER_MODELS;
    root.PERSONAL_AGENTS = data.PERSONAL_AGENTS;
    root.FRONTIER_LABS = data.FRONTIER_LABS;
  }
})(typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : this, function () {

  const LABS = {
    openai: {
      id: "openai",
      name: "OpenAI",
      color: "#10a37f",
      accent: "#059669",
      glow: "rgba(16, 163, 127, 0.4)",
      badgeBg: "rgba(16, 163, 127, 0.15)",
      border: "rgba(16, 163, 127, 0.4)"
    },
    google: {
      id: "google",
      name: "Google DeepMind",
      color: "#3b82f6",
      accent: "#2563eb",
      glow: "rgba(59, 130, 246, 0.4)",
      badgeBg: "rgba(59, 130, 246, 0.15)",
      border: "rgba(59, 130, 246, 0.4)"
    },
    anthropic: {
      id: "anthropic",
      name: "Anthropic",
      color: "#f59e0b",
      accent: "#d97706",
      glow: "rgba(245, 158, 11, 0.4)",
      badgeBg: "rgba(245, 158, 11, 0.15)",
      border: "rgba(245, 158, 11, 0.4)"
    },
    meta: {
      id: "meta",
      name: "Meta AI",
      color: "#8b5cf6",
      accent: "#7c3aed",
      glow: "rgba(139, 92, 246, 0.4)",
      badgeBg: "rgba(139, 92, 246, 0.15)",
      border: "rgba(139, 92, 246, 0.4)"
    },
    mistral: {
      id: "mistral",
      name: "Mistral AI",
      color: "#ff7000",
      accent: "#ea580c",
      glow: "rgba(255, 112, 0, 0.4)",
      badgeBg: "rgba(255, 112, 0, 0.15)",
      border: "rgba(255, 112, 0, 0.4)"
    },
    xai: {
      id: "xai",
      name: "xAI",
      color: "#e2e8f0",
      accent: "#94a3b8",
      glow: "rgba(226, 232, 240, 0.4)",
      badgeBg: "rgba(226, 232, 240, 0.15)",
      border: "rgba(226, 232, 240, 0.4)"
    },
    deepseek: {
      id: "deepseek",
      name: "DeepSeek",
      color: "#0ea5e9",
      accent: "#0284c7",
      glow: "rgba(14, 165, 233, 0.4)",
      badgeBg: "rgba(14, 165, 233, 0.15)",
      border: "rgba(14, 165, 233, 0.4)"
    },
    thinkingmachines: {
      id: "thinkingmachines",
      name: "Thinking Machines",
      color: "#ec4899",
      accent: "#db2777",
      glow: "rgba(236, 72, 153, 0.4)",
      badgeBg: "rgba(236, 72, 153, 0.15)",
      border: "rgba(236, 72, 153, 0.4)"
    },
    microsoft: {
      id: "microsoft",
      name: "Microsoft AI",
      color: "#ef4444",
      accent: "#dc2626",
      glow: "rgba(239, 68, 68, 0.4)",
      badgeBg: "rgba(239, 68, 68, 0.15)",
      border: "rgba(239, 68, 68, 0.4)"
    }
  };

  const FRONTIER_MODELS = [
    {
      id: "chatgpt-gpt35",
      name: "ChatGPT (GPT-3.5)",
      shortName: "GPT-3.5",
      lab: "openai",
      releaseDate: "2022-11-30",
      dateFormatted: "Nov 30, 2022",
      year: 2022,
      quarter: "Q4 2022",
      category: "flagship",
      eloIndex: 1117,
      contextWindow: "4,096 tokens",
      architecture: "175B Dense Transformer",
      license: "Proprietary API",
      isOpenWeights: false,
      modalities: ["Text"],
      trainingParadigm: "Supervised Fine-Tuning + RLHF",
      summary: "Sparked the worldwide generative AI consumer revolution with fluent conversational instruction following.",
      breakthroughs: [
        "First conversational RLHF deployment to capture mass public adoption (100M MAU in 2 months).",
        "Demonstrated that RLHF dramatically boosts user preference and zero-shot steerability over raw base models.",
        "Established the chat interface as the primary paradigm for human-AI interaction."
      ],
      benchmarks: {
        mmlu: "70.0%",
        humaneval: "48.1%",
        arenaElo: 1117,
        math: "34.1%"
      }
    },
    {
      id: "llama-1",
      name: "LLaMA 1",
      shortName: "LLaMA 1",
      lab: "meta",
      releaseDate: "2023-02-24",
      dateFormatted: "Feb 24, 2023",
      year: 2023,
      quarter: "Q1 2023",
      category: "open-weights",
      eloIndex: 1050,
      contextWindow: "2,048 tokens",
      architecture: "7B - 65B Dense Transformer",
      license: "Research Only",
      isOpenWeights: true,
      modalities: ["Text"],
      trainingParadigm: "Pre-trained on 1.4T tokens (Chinchilla-optimal)",
      summary: "Ignited the open-source AI explosion by proving smaller, over-trained models can beat giants.",
      breakthroughs: [
        "Validated Chinchilla scaling: 7B/13B models trained on 1.0T-1.4T tokens beat GPT-3 175B on many tasks.",
        "Released for research; subsequent weight releases triggered local inference (llama.cpp) and open fine-tuning.",
        "Standardized RoPE (Rotary Positional Embeddings), SwiGLU, and RMSNorm across modern open LLMs."
      ],
      benchmarks: {
        mmlu: "68.9% (65B)",
        humaneval: "23.7%",
        arenaElo: 1050,
        math: "50.9% (GSM8k)"
      }
    },
    {
      id: "gpt-4",
      name: "GPT-4",
      shortName: "GPT-4",
      lab: "openai",
      releaseDate: "2023-03-14",
      dateFormatted: "Mar 14, 2023",
      year: 2023,
      quarter: "Q1 2023",
      category: "flagship",
      eloIndex: 1256,
      contextWindow: "8,192 / 32,768 tokens",
      architecture: "~1.8T Mixture-of-Experts (16×110B)",
      license: "Proprietary API",
      isOpenWeights: false,
      modalities: ["Text", "Vision"],
      trainingParadigm: "Large-scale MoE + RLHF + Rule-Based Reward Models",
      summary: "The defining multimodal frontier model that achieved human-level performance across professional exams.",
      breakthroughs: [
        "Passed the Uniform Bar Exam at the 90th percentile and GRE tests in top percentiles.",
        "Secretly pioneered production Sparse Mixture-of-Experts (16 experts, 2 active per token).",
        "Set the state-of-the-art benchmark that remained undefeated for almost an entire year."
      ],
      benchmarks: {
        mmlu: "86.4%",
        humaneval: "67.0%",
        arenaElo: 1256,
        math: "92.0% (GSM8k)"
      }
    },
    {
      id: "claude-1",
      name: "Claude 1",
      shortName: "Claude 1",
      lab: "anthropic",
      releaseDate: "2023-03-14",
      dateFormatted: "Mar 14, 2023",
      year: 2023,
      quarter: "Q1 2023",
      category: "flagship",
      eloIndex: 1145,
      contextWindow: "9,000 tokens",
      architecture: "Dense Transformer",
      license: "Proprietary API",
      isOpenWeights: false,
      modalities: ["Text"],
      trainingParadigm: "Constitutional AI (RLAIF: AI Feedback)",
      summary: "Anthropic's debut commercial assistant introducing Constitutional AI for safety and steerability.",
      breakthroughs: [
        "Pioneered Constitutional AI (RLAIF), training AI to evaluate and refine its own outputs according to explicit safety principles.",
        "Demonstrated high resistance to adversarial jailbreaks without becoming overly preachy.",
        "Stronger long-form writing and nuanced tone control than contemporaries."
      ],
      benchmarks: {
        mmlu: "75.6%",
        humaneval: "58.0%",
        arenaElo: 1145,
        math: "70.2% (GSM8k)"
      }
    },
    {
      id: "claude-2",
      name: "Claude 2",
      shortName: "Claude 2",
      lab: "anthropic",
      releaseDate: "2023-07-11",
      dateFormatted: "Jul 11, 2023",
      year: 2023,
      quarter: "Q3 2023",
      category: "flagship",
      eloIndex: 1180,
      contextWindow: "100,000 tokens",
      architecture: "Dense Transformer with Long-Context Attention",
      license: "Proprietary API",
      isOpenWeights: false,
      modalities: ["Text", "Code"],
      trainingParadigm: "Constitutional AI + Extended Context Pretraining",
      summary: "First frontier model capable of processing full books, legal filings, and codebases in a single 100k prompt.",
      breakthroughs: [
        "Broke the 100,000 token context barrier (roughly 75,000 words in a single request).",
        "Scored 71.2% on HumanEval coding benchmark (up from 56.0% in Claude 1).",
        "Popularized large-scale document analysis and multi-document synthesis."
      ],
      benchmarks: {
        mmlu: "78.5%",
        humaneval: "71.2%",
        arenaElo: 1180,
        math: "88.0% (GSM8k)"
      }
    },
    {
      id: "llama-2",
      name: "Llama 2 (7B, 13B, 70B)",
      shortName: "Llama 2",
      lab: "meta",
      releaseDate: "2023-07-18",
      dateFormatted: "Jul 18, 2023",
      year: 2023,
      quarter: "Q3 2023",
      category: "open-weights",
      eloIndex: 1105,
      contextWindow: "4,096 tokens",
      architecture: "7B, 13B, 70B Dense Transformer (GQA on 70B)",
      license: "Llama 2 Community License (Commercial)",
      isOpenWeights: true,
      modalities: ["Text"],
      trainingParadigm: "Pretrained on 2.0T tokens + RLHF (Rejection Sampling + PPO)",
      summary: "First commercially permissible open-weights family that became the de facto foundation for enterprise self-hosting.",
      breakthroughs: [
        "Commercial usage allowed for products under 700M monthly active users.",
        "Grouped-Query Attention (GQA) applied to 70B model for memory-efficient inference.",
        "Ghost Attention (GAtt) introduced to sustain consistent persona across multi-turn chats."
      ],
      benchmarks: {
        mmlu: "68.9% (70B)",
        humaneval: "29.9% (70B)",
        arenaElo: 1105,
        math: "56.8% (GSM8k)"
      }
    },
    {
      id: "mistral-7b",
      name: "Mistral 7B",
      shortName: "Mistral 7B",
      lab: "mistral",
      releaseDate: "2023-09-27",
      dateFormatted: "Sep 27, 2023",
      year: 2023,
      quarter: "Q3 2023",
      category: "efficient",
      eloIndex: 1120,
      contextWindow: "8,192 / 32,768 tokens",
      architecture: "7.3B Dense, Sliding Window Attention (SWA)",
      license: "Apache 2.0",
      isOpenWeights: true,
      modalities: ["Text", "Code"],
      trainingParadigm: "Sliding Window Attention + Grouped-Query Attention",
      summary: "Smashed parameter efficiency records, beating all 13B models and rivaling Llama 34B under a pure Apache 2.0 license.",
      breakthroughs: [
        "Sliding Window Attention (SWA) achieving O(k × n) memory cost instead of quadratic.",
        "Outperformed Llama 2 13B across all benchmarks and rivaled Llama 1 34B.",
        "Released as an unceremonious magnet link that took the AI research world by storm."
      ],
      benchmarks: {
        mmlu: "62.5%",
        humaneval: "30.5%",
        arenaElo: 1120,
        math: "52.2% (GSM8k)"
      }
    },
    {
      id: "grok-1",
      name: "Grok-1",
      shortName: "Grok-1",
      lab: "xai",
      releaseDate: "2023-11-04",
      dateFormatted: "Nov 4, 2023",
      year: 2023,
      quarter: "Q4 2023",
      category: "flagship",
      eloIndex: 1140,
      contextWindow: "8,192 tokens",
      architecture: "314B Sparse MoE (8 experts, 2 active, 86B active)",
      license: "Apache 2.0 (weights open Mar 2024)",
      isOpenWeights: true,
      modalities: ["Text"],
      trainingParadigm: "Custom JAX/Rust training stack on 8-expert MoE",
      summary: "xAI's massive debut 314B MoE model featuring real-time X platform access and an irreverent persona.",
      breakthroughs: [
        "Built from scratch in just 4 months using a custom JAX/Rust distributed training stack.",
        "Huge 314B parameter architecture open-sourced under Apache 2.0 in March 2024.",
        "First model with real-time semantic browsing of social media posts (X/Twitter)."
      ],
      benchmarks: {
        mmlu: "73.0%",
        humaneval: "63.2%",
        arenaElo: 1140,
        math: "62.9% (GSM8k)"
      }
    },
    {
      id: "gpt-4-turbo",
      name: "GPT-4 Turbo",
      shortName: "GPT-4 Turbo",
      lab: "openai",
      releaseDate: "2023-11-06",
      dateFormatted: "Nov 6, 2023",
      year: 2023,
      quarter: "Q4 2023",
      category: "flagship",
      eloIndex: 1285,
      contextWindow: "128,000 tokens",
      architecture: "Refined Mixture-of-Experts with Vision",
      license: "Proprietary API",
      isOpenWeights: false,
      modalities: ["Text", "Vision"],
      trainingParadigm: "Optimized MoE + Function Calling Fine-Tuning",
      summary: "Launched at OpenAI DevDay with 128k context, April 2023 knowledge cutoff, and 3x cheaper pricing.",
      breakthroughs: [
        "128k context window at 3x lower prompt cost and 2x lower completion cost than original GPT-4.",
        "Pioneered Structured Outputs (JSON mode) and parallel function calling for reliable agent workflows.",
        "Unified vision and text APIs under a single endpoint (`gpt-4-turbo`)."
      ],
      benchmarks: {
        mmlu: "87.1%",
        humaneval: "74.4%",
        arenaElo: 1285,
        math: "94.2% (GSM8k)"
      }
    },
    {
      id: "gemini-1-ultra",
      name: "Gemini 1.0 (Ultra & Pro)",
      shortName: "Gemini 1.0",
      lab: "google",
      releaseDate: "2023-12-06",
      dateFormatted: "Dec 6, 2023",
      year: 2023,
      quarter: "Q4 2023",
      category: "multimodal",
      eloIndex: 1260,
      contextWindow: "32,768 tokens",
      architecture: "Native Multimodal Transformer (Ultra, Pro, Nano)",
      license: "Proprietary API",
      isOpenWeights: false,
      modalities: ["Text", "Vision", "Audio", "Video"],
      trainingParadigm: "Jointly trained across audio, images, video, code, and text on TPU v4/v5e",
      summary: "Google DeepMind's native multimodal titan that became the first AI model to beat human experts on MMLU.",
      breakthroughs: [
        "First AI to surpass human experts on MMLU benchmark, scoring 90.04% with uncertainty routing.",
        "Natively multimodal from day one, not stitched together from separate text and vision encoders.",
        "Scaled across TPU v4 and TPU v5e clusters with custom Pathways orchestration."
      ],
      benchmarks: {
        mmlu: "90.0%",
        humaneval: "74.4%",
        arenaElo: 1260,
        math: "94.4% (GSM8k)"
      }
    },
    {
      id: "mixtral-8x7b",
      name: "Mixtral 8x7B",
      shortName: "Mixtral 8x7B",
      lab: "mistral",
      releaseDate: "2023-12-11",
      dateFormatted: "Dec 11, 2023",
      year: 2023,
      quarter: "Q4 2023",
      category: "open-weights",
      eloIndex: 1215,
      contextWindow: "32,768 tokens",
      architecture: "46.7B Sparse MoE (8 experts, 2 active, ~12.9B active)",
      license: "Apache 2.0",
      isOpenWeights: true,
      modalities: ["Text", "Code"],
      trainingParadigm: "Sparse Mixture-of-Experts + 32k context pre-training",
      summary: "Proved open-weight Sparse MoE could beat Llama 2 70B while offering 6x faster inference throughput.",
      breakthroughs: [
        "Beat Llama 2 70B on most benchmarks while using only 12.9B active parameters per token.",
        "Catalyzed the industry shift toward Sparse Mixture-of-Experts architecture in open models.",
        "Released under Apache 2.0, enabling widespread enterprise fine-tuning and commercial hosting."
      ],
      benchmarks: {
        mmlu: "70.6%",
        humaneval: "40.2%",
        arenaElo: 1215,
        math: "74.4% (GSM8k)"
      }
    },
    {
      id: "gemini-15-pro",
      name: "Gemini 1.5 Pro",
      shortName: "Gemini 1.5 Pro",
      lab: "google",
      releaseDate: "2024-02-15",
      dateFormatted: "Feb 15, 2024",
      year: 2024,
      quarter: "Q1 2024",
      category: "multimodal",
      eloIndex: 1300,
      contextWindow: "1,000,000 - 2,000,000 tokens",
      architecture: "Sparse MoE Native Multimodal",
      license: "Proprietary API",
      isOpenWeights: false,
      modalities: ["Text", "Vision", "Audio", "Video", "Code"],
      trainingParadigm: "Long-Context Needle-In-A-Haystack Optimization",
      summary: "Groundbreaking 1M-2M token context window able to ingest entire codebases, hour-long video, and book series.",
      breakthroughs: [
        "Broke all previous context records with 1M-2M token context window maintaining 99.7% retrieval accuracy.",
        "In-context learning of the undocumented Kalamang language using only a grammar reference manual in prompt.",
        "Processed 1 hour of video or 11 hours of raw audio in a single query with exact timestamp grounding."
      ],
      benchmarks: {
        mmlu: "85.9%",
        humaneval: "84.1%",
        arenaElo: 1300,
        math: "91.7% (GSM8k)"
      }
    },
    {
      id: "claude-3-opus",
      name: "Claude 3 (Opus, Sonnet, Haiku)",
      shortName: "Claude 3 Opus",
      lab: "anthropic",
      releaseDate: "2024-03-04",
      dateFormatted: "Mar 4, 2024",
      year: 2024,
      quarter: "Q1 2024",
      category: "flagship",
      eloIndex: 1310,
      contextWindow: "200,000 tokens",
      architecture: "Dense Multimodal Transformer family",
      license: "Proprietary API",
      isOpenWeights: false,
      modalities: ["Text", "Vision"],
      trainingParadigm: "Constitutional AI + Multimodal Vision Synthesis",
      summary: "Claude 3 Opus knocked GPT-4 off the #1 spot on Chatbot Arena and set new benchmarks in graduate reasoning.",
      breakthroughs: [
        "First model to officially unseat GPT-4 from the #1 rank on the LMSYS Chatbot Arena leaderboard.",
        "Exhibited meta-awareness during testing: noticed an out-of-place needle in a 200k haystack test.",
        "Introduced the Haiku-Sonnet-Opus model tiers that became the standard naming blueprint across competitors."
      ],
      benchmarks: {
        mmlu: "88.2%",
        humaneval: "84.9%",
        arenaElo: 1310,
        math: "95.0% (GSM8k)"
      }
    },
    {
      id: "llama-3",
      name: "Llama 3 (8B & 70B)",
      shortName: "Llama 3",
      lab: "meta",
      releaseDate: "2024-04-18",
      dateFormatted: "Apr 18, 2024",
      year: 2024,
      quarter: "Q2 2024",
      category: "open-weights",
      eloIndex: 1290,
      contextWindow: "8,192 tokens",
      architecture: "Dense Transformer, 128k Vocab (Tiktoken)",
      license: "Llama 3 Community License",
      isOpenWeights: true,
      modalities: ["Text", "Code"],
      trainingParadigm: "Pre-trained on 15T tokens (7× Llama 2) + DPO / PPO",
      summary: "A massive leap in open-weight capability, matching closed frontier models from the previous year.",
      breakthroughs: [
        "15T token pretraining dataset with 4× more code and 30+ languages.",
        "128k token vocabulary based on tiktoken, improving tokenization efficiency by 15%.",
        "Llama 3 8B outperformed previous generation Llama 2 70B on virtually every benchmark."
      ],
      benchmarks: {
        mmlu: "82.0% (70B)",
        humaneval: "81.7% (70B)",
        arenaElo: 1290,
        math: "93.0% (GSM8k)"
      }
    },
    {
      id: "gpt-4o",
      name: "GPT-4o ('Omni')",
      shortName: "GPT-4o",
      lab: "openai",
      releaseDate: "2024-05-13",
      dateFormatted: "May 13, 2024",
      year: 2024,
      quarter: "Q2 2024",
      category: "multimodal",
      eloIndex: 1335,
      contextWindow: "128,000 tokens",
      architecture: "End-to-End Omni-Multimodal Neural Net",
      license: "Proprietary API",
      isOpenWeights: false,
      modalities: ["Text", "Vision", "Audio", "Video"],
      trainingParadigm: "Unified cross-modal token pretraining",
      summary: "Unified voice, vision, and text into a single model with human conversational latency (232ms).",
      breakthroughs: [
        "End-to-end audio processing: eliminated separate STT -> LLM -> TTS pipelines, enabling emotion and laughter.",
        "Average response latency of 320ms (down to 232ms), matching human conversational response times.",
        "2× faster and 50% cheaper than GPT-4 Turbo while delivering superior vision and coding."
      ],
      benchmarks: {
        mmlu: "88.7%",
        humaneval: "90.2%",
        arenaElo: 1335,
        math: "95.8% (GSM8k)"
      }
    },
    {
      id: "claude-35-sonnet-v1",
      name: "Claude 3.5 Sonnet (v1)",
      shortName: "Claude 3.5 Sonnet",
      lab: "anthropic",
      releaseDate: "2024-06-20",
      dateFormatted: "Jun 20, 2024",
      year: 2024,
      quarter: "Q2 2024",
      category: "flagship",
      eloIndex: 1345,
      contextWindow: "200,000 tokens",
      architecture: "Dense Transformer + Artifacts UI",
      license: "Proprietary API",
      isOpenWeights: false,
      modalities: ["Text", "Vision", "Code"],
      trainingParadigm: "Advanced Coding & Reasoning RL",
      summary: "Mid-tier model that outperformed all flagship models (including Opus & GPT-4o) at 1/5th the cost of Opus.",
      breakthroughs: [
        "Hit 64% on SWE-bench Verified, becoming the undisputed world leader in automated software engineering.",
        "Introduced Artifacts UI, allowing interactive React apps, SVGs, and docs to render alongside chat in real time.",
        "Operating at 2× the speed of Claude 3 Opus, redefining the performance-to-cost frontier."
      ],
      benchmarks: {
        mmlu: "88.7%",
        swebench: "64.0%",
        arenaElo: 1345,
        math: "96.4% (GSM8k)"
      }
    },
    {
      id: "gpt-4o-mini",
      name: "GPT-4o mini",
      shortName: "GPT-4o mini",
      lab: "openai",
      releaseDate: "2024-07-18",
      dateFormatted: "Jul 18, 2024",
      year: 2024,
      quarter: "Q3 2024",
      category: "efficient",
      eloIndex: 1270,
      contextWindow: "128,000 tokens",
      architecture: "Distilled Multimodal Transformer",
      license: "Proprietary API",
      isOpenWeights: false,
      modalities: ["Text", "Vision"],
      trainingParadigm: "Frontier distillation from GPT-4o",
      summary: "Smashed pricing floors ($0.15/1M input tokens), offering frontier-level intelligence at fractional cost.",
      breakthroughs: [
        "60% cheaper than GPT-3.5 Turbo and significantly more capable across MMLU, reasoning, and vision.",
        "First small frontier model to support multimodal text and vision inputs at mass enterprise pricing.",
        "Scored 82.0% on MMLU, surpassing previous generation flagships in lightweight packaging."
      ],
      benchmarks: {
        mmlu: "82.0%",
        humaneval: "87.0%",
        arenaElo: 1270,
        math: "91.3% (GSM8k)"
      }
    },
    {
      id: "llama-31-405b",
      name: "Llama 3.1 (405B, 70B, 8B)",
      shortName: "Llama 3.1 405B",
      lab: "meta",
      releaseDate: "2024-07-23",
      dateFormatted: "Jul 23, 2024",
      year: 2024,
      quarter: "Q3 2024",
      category: "open-weights",
      eloIndex: 1320,
      contextWindow: "128,000 tokens",
      architecture: "405B Dense Transformer, 16,000 H100 cluster",
      license: "Llama 3.1 Community License",
      isOpenWeights: true,
      modalities: ["Text", "Code"],
      trainingParadigm: "15.6T tokens, FP8 training on 16k H100s + Iterative DPO",
      summary: "The first true frontier-class 400B+ open model competing directly with top proprietary closed models.",
      breakthroughs: [
        "First open model to compete head-to-head with GPT-4o and Claude 3.5 Sonnet on major benchmarks.",
        "Open weights licensed to allow developers to distill and generate synthetic data for smaller custom models.",
        "Pioneered FP8 low-precision distributed pre-training across a massive 16,384 GPU cluster."
      ],
      benchmarks: {
        mmlu: "88.6%",
        humaneval: "89.0%",
        arenaElo: 1320,
        math: "96.8% (GSM8k)"
      }
    },
    {
      id: "grok-2",
      name: "Grok-2 & Grok-2 mini",
      shortName: "Grok-2",
      lab: "xai",
      releaseDate: "2024-08-13",
      dateFormatted: "Aug 13, 2024",
      year: 2024,
      quarter: "Q3 2024",
      category: "flagship",
      eloIndex: 1300,
      contextWindow: "128,000 tokens",
      architecture: "Frontier Transformer + Flux.1 Image Engine",
      license: "Proprietary API",
      isOpenWeights: false,
      modalities: ["Text", "Vision", "Image Generation"],
      trainingParadigm: "Real-time Telemetry + Visual Reasoning",
      summary: "Debuted in the #2 position on LMSYS Arena with unaligned image generation and live X platform telemetry.",
      breakthroughs: [
        "Rose to #2 on the LMSYS Chatbot Arena leaderboard, outperforming Claude 3.5 Sonnet v1 and GPT-4-Turbo upon launch.",
        "Integrated Black Forest Labs Flux.1 for fast photorealistic image generation inside the chat flow.",
        "Enhanced real-time search synthesis pulling directly from real-time news events on X."
      ],
      benchmarks: {
        mmlu: "87.5%",
        humaneval: "88.4%",
        arenaElo: 1300,
        math: "92.2% (GSM8k)"
      }
    },
    {
      id: "openai-o1-preview",
      name: "OpenAI o1-preview & o1-mini",
      shortName: "OpenAI o1-preview",
      lab: "openai",
      releaseDate: "2024-09-12",
      dateFormatted: "Sep 12, 2024",
      year: 2024,
      quarter: "Q3 2024",
      category: "reasoning",
      eloIndex: 1355,
      contextWindow: "128,000 tokens",
      architecture: "Test-Time Compute Scaled Reasoning Transformer",
      license: "Proprietary API",
      isOpenWeights: false,
      modalities: ["Text", "Code"],
      trainingParadigm: "Large-scale RL with Hidden Chain-of-Thought",
      summary: "A historic paradigm shift: scaling compute during inference to 'think' step-by-step through complex math and code.",
      breakthroughs: [
        "Established the Test-Time Compute Scaling Law: spending more inference tokens yields exponential accuracy gains.",
        "Placed in the 89th percentile on Codeforces competitive programming and qualified for the US Math Olympiad.",
        "Hidden chain-of-thought tokens allow the model to backtrack, formulate hypotheses, and correct mistakes."
      ],
      benchmarks: {
        mmlu: "90.8%",
        gpqa: "78.0%",
        arenaElo: 1355,
        math: "83.3% (AIME 2024)"
      }
    },
    {
      id: "claude-35-sonnet-v2",
      name: "Claude 3.5 Sonnet (New) & Computer Use",
      shortName: "Claude 3.5 Sonnet (Upgraded)",
      lab: "anthropic",
      releaseDate: "2024-10-22",
      dateFormatted: "Oct 22, 2024",
      year: 2024,
      quarter: "Q4 2024",
      category: "flagship",
      eloIndex: 1365,
      contextWindow: "200,000 tokens",
      architecture: "Dense Transformer + OS Computer Use API",
      license: "Proprietary API",
      isOpenWeights: false,
      modalities: ["Text", "Vision", "Code", "Computer Interaction"],
      trainingParadigm: "Agentic Tool Execution & Screen Coordinate Reasoning",
      summary: "Strengthened coding leadership and introduced the groundbreaking 'Computer Use' API to control virtual machines.",
      breakthroughs: [
        "First frontier model capable of directly controlling a desktop computer: moving cursor, clicking, and typing.",
        "Elevated SWE-bench Verified performance to 49.0% / 53.7% in extended agentic scaffolds.",
        "Released alongside Claude 3.5 Haiku, bringing flagship 3.0 Opus quality to sub-second inference speeds."
      ],
      benchmarks: {
        mmlu: "89.0%",
        swebench: "49.0%",
        arenaElo: 1365,
        math: "96.4% (GSM8k)"
      }
    },
    {
      id: "openai-o1-full",
      name: "OpenAI o1 (Full Release)",
      shortName: "OpenAI o1",
      lab: "openai",
      releaseDate: "2024-12-05",
      dateFormatted: "Dec 5, 2024",
      year: 2024,
      quarter: "Q4 2024",
      category: "reasoning",
      eloIndex: 1380,
      contextWindow: "200,000 tokens",
      architecture: "Multimodal Reasoning Transformer",
      license: "Proprietary API",
      isOpenWeights: false,
      modalities: ["Text", "Vision", "Code"],
      trainingParadigm: "Full-Scale RL + Vision-Chain-of-Thought",
      summary: "Production release of o1 adding multimodal image reasoning, 60% speed increase, and 34% fewer major errors.",
      breakthroughs: [
        "Added vision understanding to test-time chain-of-thought: inspecting diagrams, charts, and equations visually.",
        "Reduced hallucination rates on complex academic benchmarks by 34% compared to o1-preview.",
        "Demonstrated PhD-level performance across physics, biology, chemistry, and algorithmic challenges."
      ],
      benchmarks: {
        mmlu: "91.8%",
        gpqa: "75.7%",
        arenaElo: 1380,
        math: "89.2% (AIME 2024)"
      }
    },
    {
      id: "gemini-20-flash",
      name: "Gemini 2.0 Flash (Exp) & Thinking",
      shortName: "Gemini 2.0 Flash",
      lab: "google",
      releaseDate: "2024-12-11",
      dateFormatted: "Dec 11, 2024",
      year: 2024,
      quarter: "Q4 2024",
      category: "multimodal",
      eloIndex: 1375,
      contextWindow: "1,000,000 tokens",
      architecture: "Real-Time Streaming Multimodal + Flash Thinking",
      license: "Proprietary API",
      isOpenWeights: false,
      modalities: ["Text", "Vision", "Audio", "Video", "Code"],
      trainingParadigm: "Bidirectional Multimodal Streaming + RL Thinking",
      summary: "Sub-second bidirectional audio/video streaming via the Multimodal Live API, plus dedicated Flash Thinking mode.",
      breakthroughs: [
        "Introduced the Gemini Multimodal Live API: bidirectional real-time audio and video over WebSockets.",
        "Pioneered Gemini Flash Thinking mode: competitive reasoning with o1-mini at ultra-fast speeds and low cost.",
        "Native spatial reasoning: understands bounding boxes, camera angles, and physical object layouts in video."
      ],
      benchmarks: {
        mmlu: "89.9%",
        humaneval: "91.4%",
        arenaElo: 1375,
        math: "94.8% (Math)"
      }
    },
    {
      id: "deepseek-v3",
      name: "DeepSeek-V3",
      shortName: "DeepSeek-V3",
      lab: "deepseek",
      releaseDate: "2024-12-26",
      dateFormatted: "Dec 26, 2024",
      year: 2024,
      quarter: "Q4 2024",
      category: "open-weights",
      eloIndex: 1360,
      contextWindow: "128,000 tokens",
      architecture: "671B Sparse MoE (37B active per token), MLA + DeepSeekMoE",
      license: "MIT License",
      isOpenWeights: true,
      modalities: ["Text", "Code"],
      trainingParadigm: "Multi-Head Latent Attention (MLA) + FP8 Mixed Precision on 2,048 H800s",
      summary: "Stunned the global AI industry by matching top closed models with an estimated $6M total training compute cost.",
      breakthroughs: [
        "Multi-Head Latent Attention (MLA) compressed KV cache by 93%, enabling enormous server concurrency.",
        "Trained on 14.8T tokens for just $5.57M in GPU compute using innovative DualPipe communication overlap.",
        "Multi-Token Prediction (MTP) enabled faster inference and dense speculative decoding."
      ],
      benchmarks: {
        mmlu: "88.5%",
        gpqa: "59.1%",
        arenaElo: 1360,
        math: "90.2% (Math)"
      }
    },
    {
      id: "deepseek-r1",
      name: "DeepSeek-R1",
      shortName: "DeepSeek-R1",
      lab: "deepseek",
      releaseDate: "2025-01-20",
      dateFormatted: "Jan 20, 2025",
      year: 2025,
      quarter: "Q1 2025",
      category: "reasoning",
      eloIndex: 1390,
      contextWindow: "128,000 tokens",
      architecture: "671B MoE with Group Relative Policy Optimization (GRPO)",
      license: "MIT License",
      isOpenWeights: true,
      modalities: ["Text", "Code"],
      trainingParadigm: "Pure RL Cold-Start (R1-Zero) + Multi-Stage Distillation",
      summary: "Open-source reasoning champion matching OpenAI o1 on math and code via pure reinforcement learning without supervised warm-up.",
      breakthroughs: [
        "Proved pure RL (DeepSeek-R1-Zero) creates emergent thinking, reflection, and aha-moments without human demonstrations.",
        "Replaced PPO with Group Relative Policy Optimization (GRPO), eliminating the memory-heavy critic model.",
        "Distilled reasoning capabilities into dense models from 1.5B to 70B under an open MIT license."
      ],
      benchmarks: {
        mmlu: "90.8%",
        swebench: "49.2%",
        arenaElo: 1390,
        math: "97.3% (MATH-500)"
      }
    },
    {
      id: "gemini-20-pro",
      name: "Gemini 2.0 Pro & Flash GA",
      shortName: "Gemini 2.0 Pro",
      lab: "google",
      releaseDate: "2025-02-05",
      dateFormatted: "Feb 5, 2025",
      year: 2025,
      quarter: "Q1 2025",
      category: "multimodal",
      eloIndex: 1395,
      contextWindow: "2,000,000 tokens",
      architecture: "Sparse MoE, 2M Context with Native Code Verification",
      license: "Proprietary API",
      isOpenWeights: false,
      modalities: ["Text", "Vision", "Audio", "Video", "Code"],
      trainingParadigm: "Multimodal Long-Context + Automated Code Verification",
      summary: "Google's production reasoning flagship offering 2M token context, agentic search integration, and self-verifying code execution.",
      breakthroughs: [
        "Native code execution environment inside the inference loop to test and verify solutions prior to answering.",
        "Full General Availability of the 2M token window across all developers with enterprise latency guarantees.",
        "Deep integration with Google Grounding and real-time live tools."
      ],
      benchmarks: {
        mmlu: "91.2%",
        gpqa: "73.2%",
        arenaElo: 1395,
        math: "96.8% (Math)"
      }
    },
    {
      id: "claude-37-sonnet",
      name: "Claude 3.7 Sonnet & Hybrid Thinking",
      shortName: "Claude 3.7 Sonnet",
      lab: "anthropic",
      releaseDate: "2025-02-24",
      dateFormatted: "Feb 24, 2025",
      year: 2025,
      quarter: "Q1 2025",
      category: "reasoning",
      eloIndex: 1410,
      contextWindow: "200,000 tokens",
      architecture: "Hybrid Reasoning Transformer (Instant & Extended Thinking)",
      license: "Proprietary API",
      isOpenWeights: false,
      modalities: ["Text", "Vision", "Code"],
      trainingParadigm: "Continuous Budgeted Thinking Token Architecture",
      summary: "The industry's first hybrid model allowing developers to dynamically allocate thinking token budgets per query.",
      breakthroughs: [
        "First hybrid model seamlessly operating as both an ultra-fast standard LLM and a deep reasoning model.",
        "User-controlled `thinking_budget` parameter: trade latency and cost dynamically per API call.",
        "Surpassed all previous models on SWE-bench Verified (over 70%) with unmatched code generation fidelity."
      ],
      benchmarks: {
        mmlu: "92.0%",
        swebench: "70.3%",
        arenaElo: 1410,
        math: "96.2% (AIME)"
      }
    },
    {
      id: "gpt-45-orion",
      name: "GPT-4.5 ('Orion')",
      shortName: "GPT-4.5",
      lab: "openai",
      releaseDate: "2025-03-18",
      dateFormatted: "Mar 18, 2025",
      year: 2025,
      quarter: "Q1 2025",
      category: "flagship",
      eloIndex: 1420,
      contextWindow: "256,000 tokens",
      architecture: "Massive Dense Scale Pretraining + Post-Training Synthesis",
      license: "Proprietary API",
      isOpenWeights: false,
      modalities: ["Text", "Vision", "Audio", "Code"],
      trainingParadigm: "Next-generation pretraining scaling + synthetic curated supervision",
      summary: "OpenAI's largest knowledge engine, setting new records in factual recall, creative synthesis, and emotional intelligence.",
      breakthroughs: [
        "Dramatically reduced factual hallucinations in long-form research, legal analysis, and creative writing.",
        "Exceptional emotional nuance, conversational warmth, and cross-cultural conversational intelligence.",
        "256k context window with dense attention retrieval across massive multi-modal document corpora."
      ],
      benchmarks: {
        mmlu: "92.6%",
        gpqa: "76.8%",
        arenaElo: 1420,
        math: "97.4% (GSM8k)"
      }
    },
    {
      id: "llama-4",
      name: "Llama 4 (Scout & Maverick)",
      shortName: "Llama 4",
      lab: "meta",
      releaseDate: "2025-04-15",
      dateFormatted: "Apr 15, 2025",
      year: 2025,
      quarter: "Q2 2025",
      category: "open-weights",
      eloIndex: 1400,
      contextWindow: "256,000 tokens",
      architecture: "Native Mixture-of-Experts (500B+ total parameters)",
      license: "Llama 4 Open License",
      isOpenWeights: true,
      modalities: ["Text", "Vision", "Code"],
      trainingParadigm: "Trained on 100k+ H100 cluster with Native MoE routing",
      summary: "Meta's flagship transition to native Sparse Mixture-of-Experts, bringing flagship capabilities to open weights.",
      breakthroughs: [
        "Trained on Meta's 100k+ H100 GPU cluster infrastructure using native multimodal MoE routing.",
        "Native vision and code understanding natively woven into the core open-weight foundation.",
        "Comprehensive multilingual mastery covering over 60 spoken languages with high native fluency."
      ],
      benchmarks: {
        mmlu: "90.4%",
        swebench: "58.4%",
        arenaElo: 1400,
        math: "94.6% (Math)"
      }
    },
    {
      id: "gemini-25",
      name: "Gemini 2.5 Flash & Ultra",
      shortName: "Gemini 2.5",
      lab: "google",
      releaseDate: "2025-05-20",
      dateFormatted: "May 20, 2025",
      year: 2025,
      quarter: "Q2 2025",
      category: "multimodal",
      eloIndex: 1435,
      contextWindow: "2,000,000 tokens",
      architecture: "Sixth-gen TPU (Trillium) Native Multimodal Reasoning",
      license: "Proprietary API",
      isOpenWeights: false,
      modalities: ["Text", "Vision", "Audio", "Video", "Robotics/Action"],
      trainingParadigm: "Trillium TPU scaled training + Autonomous tool synthesis",
      summary: "Google DeepMind's ultra-dense multimodal reasoning flagship capable of direct OS navigation and live video reasoning at 60 FPS.",
      breakthroughs: [
        "Hardware-accelerated on Google's Trillium (TPU v6) chips, reducing inference costs by another 60%.",
        "Live video stream understanding at 60 FPS with immediate action generation for robotic and GUI control.",
        "Integrated automated hypothesis generation and scientific validation engines."
      ],
      benchmarks: {
        mmlu: "93.1%",
        gpqa: "79.4%",
        arenaElo: 1435,
        math: "97.8% (Math)"
      }
    },
    {
      id: "grok-3",
      name: "Grok 3",
      shortName: "Grok 3",
      lab: "xai",
      releaseDate: "2025-07-10",
      dateFormatted: "Jul 10, 2025",
      year: 2025,
      quarter: "Q3 2025",
      category: "reasoning",
      eloIndex: 1425,
      contextWindow: "256,000 tokens",
      architecture: "Colossus Supercomputer Scaled Reasoning MoE",
      license: "Proprietary API",
      isOpenWeights: false,
      modalities: ["Text", "Vision", "Code"],
      trainingParadigm: "Memphis Colossus cluster 100k H100s + RL reasoning",
      summary: "Trained on the Memphis Colossus supercomputer, establishing world-class mathematical proofing and code generation.",
      breakthroughs: [
        "Built on xAI's 100,000-liquid-cooled-H100 'Colossus' supercomputer in record time.",
        "Demonstrated gold-medal-level formal proofs on Putnam competition mathematics problems.",
        "Integrated high-speed autonomous coding loops with live unit-test feedback."
      ],
      benchmarks: {
        mmlu: "91.8%",
        swebench: "62.5%",
        arenaElo: 1425,
        math: "96.9% (Math)"
      }
    },
    {
      id: "openai-o3",
      name: "OpenAI o3",
      shortName: "OpenAI o3",
      lab: "openai",
      releaseDate: "2025-08-14",
      dateFormatted: "Aug 14, 2025",
      year: 2025,
      quarter: "Q3 2025",
      category: "reasoning",
      eloIndex: 1450,
      contextWindow: "256,000 tokens",
      architecture: "Next-Gen Test-Time Compute + Tree-of-Thought Search",
      license: "Proprietary API",
      isOpenWeights: false,
      modalities: ["Text", "Vision", "Code"],
      trainingParadigm: "Tree-of-thought search verification + RL exploration",
      summary: "Reached superhuman performance on the ARC-AGI benchmark and scored 2727 on Codeforces competitive programming.",
      breakthroughs: [
        "Achieved 87.5% on the ARC-AGI benchmark, smashing through what many considered an insurmountable barrier.",
        "Achieved a 2727 Codeforces rating, surpassing 99.8% of competitive human programmers globally.",
        "Autonomous scientific theorem discovery with step-by-step verification proofs in Lean 4."
      ],
      benchmarks: {
        mmlu: "94.2%",
        arcAgi: "87.5%",
        arenaElo: 1450,
        codeforces: "2727 Elo"
      }
    },
    {
      id: "claude-4-opus",
      name: "Claude 4 (Opus & Sonnet)",
      shortName: "Claude 4 Opus",
      lab: "anthropic",
      releaseDate: "2025-09-25",
      dateFormatted: "Sep 25, 2025",
      year: 2025,
      quarter: "Q3 2025",
      category: "flagship",
      eloIndex: 1460,
      contextWindow: "500,000 tokens",
      architecture: "Advanced Constitutional Transformer + Multi-Day Agent Engine",
      license: "Proprietary API",
      isOpenWeights: false,
      modalities: ["Text", "Vision", "Code", "Computer Navigation"],
      trainingParadigm: "Constitutional RL 3.0 + Autonomous Long-Horizon Agent Training",
      summary: "Anthropic's flagship agentic engine capable of autonomous multi-day software migrations, architecture design, and research.",
      breakthroughs: [
        "Extended continuous agent execution capability: runs autonomous developer tasks across multi-repository projects.",
        "500,000 token context window with zero-loss needle retrieval across mixed modalities.",
        "Industry-leading security vulnerability discovery and automatic patch generation."
      ],
      benchmarks: {
        mmlu: "94.5%",
        swebench: "78.2%",
        arenaElo: 1460,
        math: "98.4% (Math)"
      }
    },
    {
      id: "deepseek-r2",
      name: "DeepSeek-R2 / V4",
      shortName: "DeepSeek-R2",
      lab: "deepseek",
      releaseDate: "2025-12-18",
      dateFormatted: "Dec 18, 2025",
      year: 2025,
      quarter: "Q4 2025",
      category: "reasoning",
      eloIndex: 1455,
      contextWindow: "256,000 tokens",
      architecture: "1T+ Sparse MoE with Recursive Latent Reasoning",
      license: "MIT License",
      isOpenWeights: true,
      modalities: ["Text", "Code"],
      trainingParadigm: "Recursive Latent Thinking + Ultra-Sparse MoE Routing",
      summary: "A revolutionary 1T parameter sparse model featuring internal latent-space thinking and ultra-efficient open weights.",
      breakthroughs: [
        "Internal latent-space reasoning: models think across compressed vector states before emitting visible tokens.",
        "Ultra-sparse routing activating only 16 of 128 experts, running on consumer hardware clusters.",
        "Full MIT open-source release with reproducible training recipes and data curation pipelines."
      ],
      benchmarks: {
        mmlu: "93.8%",
        swebench: "72.4%",
        arenaElo: 1455,
        math: "98.7% (Math)"
      }
    },
    {
      id: "gemini-30",
      name: "Gemini 3.0 Pro & Ultra",
      shortName: "Gemini 3.0 Ultra",
      lab: "google",
      releaseDate: "2026-02-12",
      dateFormatted: "Feb 12, 2026",
      year: 2026,
      quarter: "Q1 2026",
      category: "multimodal",
      eloIndex: 1480,
      contextWindow: "4,000,000 tokens",
      architecture: "Multimodal World Model with Neuro-Symbolic Simulation",
      license: "Proprietary API",
      isOpenWeights: false,
      modalities: ["Text", "Vision", "Audio", "Video", "3D / Spatial", "Robotics"],
      trainingParadigm: "World Model physical dynamics simulation + TPU v6 scale",
      summary: "4 Million token context window with real-time 3D spatial simulation, physical world reasoning, and autonomous lab research.",
      breakthroughs: [
        "4,000,000 token context window: capable of ingesting years of telemetry, thousands of books, or whole video series.",
        "Native 3D and physics simulation: accurately predicts physical interactions, collisions, and fluid mechanics.",
        "Autonomous scientific discovery engine: successfully designed novel antimicrobial peptide candidates in silico."
      ],
      benchmarks: {
        mmlu: "95.2%",
        swebench: "82.5%",
        arenaElo: 1480,
        math: "99.1% (Math)"
      }
    },
    {
      id: "gpt-5",
      name: "GPT-5",
      shortName: "GPT-5",
      lab: "openai",
      releaseDate: "2026-05-19",
      dateFormatted: "May 19, 2026",
      year: 2026,
      quarter: "Q2 2026",
      category: "flagship",
      eloIndex: 1495,
      contextWindow: "512,000 tokens",
      architecture: "Unified Reasoning & Omni-Modal Agent System",
      license: "Proprietary API",
      isOpenWeights: false,
      modalities: ["Text", "Vision", "Audio", "Video", "Actions"],
      trainingParadigm: "Unified Pre-training + Real-Time Adaptive Thinking Depth",
      summary: "Unifies test-time thinking, native omni-multimodality, and autonomous agent action execution into a single fluid intelligence.",
      breakthroughs: [
        "Eliminates the split between 'fast conversational models' and 'slow reasoning models' via automatic internal depth routing.",
        "Human-level theorem proving across frontier academic mathematics and formal software verification.",
        "Zero-shot tool generation: builds its own APIs and sandbox execution containers to solve novel tasks on the fly."
      ],
      benchmarks: {
        mmlu: "96.4%",
        swebench: "88.1%",
        arenaElo: 1495,
        math: "99.4% (Math)"
      }
    },
    {
      id: "claude-45-sonnet",
      name: "Claude 4.5 Sonnet / Agentic",
      shortName: "Claude 4.5 Sonnet",
      lab: "anthropic",
      releaseDate: "2026-07-28",
      dateFormatted: "Jul 28, 2026",
      year: 2026,
      quarter: "Q3 2026",
      category: "flagship",
      eloIndex: 1510,
      contextWindow: "500,000 tokens",
      architecture: "Self-Verifying Agentic Transformer with Safe Sandbox Execution",
      license: "Proprietary API",
      isOpenWeights: false,
      modalities: ["Text", "Vision", "Code", "Computer Interaction"],
      trainingParadigm: "Continuous Constitutional Agentic Supervision",
      summary: "Anthropic's flagship agentic model, setting new industry standards in autonomous enterprise engineering and security auditing.",
      breakthroughs: [
        "Scored over 90% on SWE-bench Verified in complex, multi-file production enterprise repositories.",
        "24-hour continuous uninterrupted task completion without drift or losing track of high-level goals.",
        "Enterprise-grade safety verification guaranteeing deterministic compliance with system guardrails."
      ],
      benchmarks: {
        mmlu: "96.8%",
        swebench: "91.2%",
        arenaElo: 1510,
        math: "99.6% (Math)"
      }
    },
    {
      id: "gemini-38-flash",
      name: "Gemini 3.8 Flash & Gemini 3.8 Live",
      shortName: "Gemini 3.8 Flash",
      lab: "google",
      releaseDate: "2026-10-15",
      dateFormatted: "Oct 15, 2026",
      year: 2026,
      quarter: "Q4 2026",
      category: "multimodal",
      eloIndex: 1520,
      contextWindow: "4,000,000 tokens",
      architecture: "Ultra-Low Latency Omni-Multimodal with Concurrent Background Reasoning",
      license: "Proprietary API",
      isOpenWeights: false,
      modalities: ["Text", "Vision", "Audio", "Video", "Robotics"],
      trainingParadigm: "Asynchronous Background Thinking + 6th-Gen TPU Hardware Acceleration",
      summary: "Ultra-responsive flagship model powering real-time bidirectional multimodal interaction with concurrent background reasoning.",
      breakthroughs: [
        "Concurrent background reasoning: can 'think' deeply in parallel while maintaining smooth conversational dialogue.",
        "Sub-100ms end-to-end multimodal response latency across high-resolution video and audio.",
        "4M context window with instant random-access semantic retrieval."
      ],
      benchmarks: {
        mmlu: "97.1%",
        swebench: "92.0%",
        arenaElo: 1520,
        math: "99.8% (Math)"
      }
    },
    {
      id: "gemini-4-carbon",
      name: "Gemini 4 Carbon",
      shortName: "Gemini 4 Carbon",
      lab: "google",
      releaseDate: "2026-10-28",
      dateFormatted: "Oct 28, 2026",
      year: 2026,
      quarter: "Q4 2026",
      category: "flagship",
      eloIndex: 1540,
      contextWindow: "1,000,000 tokens (95% cache discount)",
      architecture: "Native Multimodal TPU Architecture for Cybersecurity & Long-Horizon Software Engineering",
      license: "Proprietary API: GA Nov 10, 2026 at $2/$10 per M tokens (intro, $4/$20 after Nov 30); first shipped Oct 28 to cyber defenders (Fairwind Program)",
      isOpenWeights: false,
      modalities: ["Text", "Vision", "Audio", "Video", "Code", "Terminal Actions"],
      trainingParadigm: "Full-Lifecycle Defensive RL + Long-Horizon Autonomous Task Planning",
      summary: "Google DeepMind's flagship model engineered for cybersecurity defense, multi-day autonomous software engineering, and resilient agentic execution.",
      breakthroughs: [
        "Debuted at #1 on the Artificial Analysis Intelligence Index (v5.0), scoring 59.",
        "SOTA across the cybersecurity lifecycle: 88.2% on SEC-bench Pro (vulnerability discovery), 54.8% on ExploitGym, and 71.0% on CWE-bench (patching).",
        "Engineered for long-horizon agentic workflows lasting multiple days, autonomously navigating complex bug remediation across vast codebases.",
        "Zero percent (0.0%) attack success rate on Gray Swan's Indirect Prompt Injection Benchmark.",
        "Generally available Nov 10, 2026 via the Gemini API and Google AI Ultra. Powers Antigravity /swarm multi-agent teams and DeepMind's AlphaProof Code, which formally verified the Signal protocol in Lean."
      ],
      benchmarks: {
        mmlu: "97.5%",
        secBenchPro: "88.2%",
        swebench: "93.4%",
        cweBench: "71.0%",
        arenaElo: 1540
      }
    },
    {
      id: "inkling-2-small",
      name: "Inkling 2 Small",
      shortName: "Inkling 2 Small",
      lab: "thinkingmachines",
      releaseDate: "2026-11-05",
      dateFormatted: "Nov 5, 2026",
      year: 2026,
      quarter: "Q4 2026",
      category: "open-weights",
      eloIndex: 1470,
      contextWindow: "Not disclosed",
      architecture: "Mixture-of-Experts (594B total / 17B active parameters)",
      license: "Apache 2.0 (launched on Tinker Nov 5; weights followed after safety testing)",
      isOpenWeights: true,
      modalities: ["Text", "Vision"],
      trainingParadigm: "Sparse MoE pre-training + post-training for efficient autonomous coding",
      summary: "Thinking Machines Lab's second-generation efficient MoE model, opened under Apache 2.0 after launching on the Tinker platform.",
      breakthroughs: [
        "594B total parameters with only 17B active per token, aimed at frontier-class work at small-model serving cost.",
        "Shipped first on Tinker with closed weights, then released under Apache 2.0 after external safety testing and red-teaming (available via Ollama).",
        "Accepts text and image inputs."
      ],
      benchmarks: {}
    },
    {
      id: "muse-ember",
      name: "Meta Muse Ember",
      shortName: "Muse Ember",
      lab: "meta",
      releaseDate: "2026-11-09",
      dateFormatted: "Nov 9, 2026",
      year: 2026,
      quarter: "Q4 2026",
      category: "efficient",
      eloIndex: 1440,
      contextWindow: "1,000,000 tokens",
      architecture: "Compact Muse model, the execution layer under Muse Wonder's planning",
      license: "Proprietary API (Meta Model API: muse-ember-1.0), closed weights",
      isOpenWeights: false,
      modalities: ["Text", "Vision", "Audio", "Video"],
      trainingParadigm: "Trained using Muse Wonder Full for high-volume agent execution",
      summary: "Meta's smallest and cheapest Muse model, built for high-volume agent work: tool calls, coding subtasks and document parsing.",
      breakthroughs: [
        "Scores 36 on the Artificial Analysis Intelligence Index, matching Claude Haiku 5.5.",
        "Priced at $0.10 / $0.50 per million input/output tokens on the Meta Model API.",
        "First model Meta trained using Muse Wonder Full. Also offered via Google Cloud and Oracle Cloud."
      ],
      benchmarks: {
        extra: {
          "AA Intelligence Idx": "36"
        }
      }
    },
    {
      id: "claude-fable-mythos-52",
      name: "Claude Fable 5.2 & Claude Mythos 5.2",
      shortName: "Claude Fable 5.2",
      lab: "anthropic",
      releaseDate: "2026-11-09",
      dateFormatted: "Nov 9, 2026",
      year: 2026,
      quarter: "Q4 2026",
      category: "flagship",
      eloIndex: 1555,
      contextWindow: "1,000,000 tokens",
      architecture: "Single underlying model shipped two ways: Fable (cyber/bio safeguard classifiers) and Mythos (safeguards relaxed for vetted orgs)",
      license: "Proprietary API (Fable: GA on all platforms, $8/$40 per M tokens) / Mythos: Cyber & Life Sciences Verification Programs",
      isOpenWeights: false,
      modalities: ["Text", "Vision", "Code", "Computer Use", "Terminal Actions"],
      trainingParadigm: "Long-Horizon Agentic RL + Adjustable Effort Levels (Medium default to Xhigh/Max)",
      summary: "Anthropic's most capable generally available model, aimed at long-horizon agentic coding and science. Cheaper per token than Fable 5.1, with about 30% faster output.",
      breakthroughs: [
        "Leads Claude Opus 5.5 on FrontierSWE v2 (69.9% vs 62.3%), Terminal-Bench-Science (74.6% vs 52.6%) and Remote Labor Index (41.3% vs 21.3%).",
        "Formalized Fermat's Last Theorem in about 30 hours using about 1,000 parallel agents.",
        "Mythos 5.2 found 10.2% more vulnerabilities than Opus 5.5 on Anthropic's CVE Rediscovery eval; Fable 5.2 has about 55% fewer safeguard blocks than 5.1.",
        "Price cut to $8 / $40 per million tokens (Fable 5.1 was $10 / $50), with an optional fast mode up to 2.5x quicker."
      ],
      benchmarks: {
        extra: {
          "FrontierSWE v2": "69.9%",
          "Terminal-Bench-Sci": "74.6%",
          "OSWorld 2.1": "89.3%",
          "HLE (tools)": "74.2%",
          "Remote Labor Idx": "41.3%"
        }
      }
    },
    {
      id: "gemini-4-hydrogen",
      name: "Gemini 4 Hydrogen",
      shortName: "Gemini 4 Hydrogen",
      lab: "google",
      releaseDate: "2026-11-12",
      dateFormatted: "Nov 12, 2026",
      year: 2026,
      quarter: "Q4 2026",
      category: "efficient",
      eloIndex: 1500,
      contextWindow: "1,000,000 tokens (up to 1M output)",
      architecture: "Fast mid-tier Gemini 4 model with four thinking levels (low / medium / high / xhigh)",
      license: "Proprietary API ($1.50 / $7.50 per M tokens, flat across 1M context)",
      isOpenWeights: false,
      modalities: ["Text", "Vision", "Audio", "Video", "PDF"],
      trainingParadigm: "Adjustable thinking depth + multi-model orchestration with Gemini 4 Carbon and Argon",
      summary: "Google's fast 'daily driver' Gemini 4 model, 2.5x faster than Gemini 3.8 Flash at a similar price, rolling out globally and inside Antigravity's Orchestrator.",
      breakthroughs: [
        "Scores 51 on the Artificial Analysis Intelligence Index at default high thinking, and 54 at the new xhigh tier.",
        "Terminal-Bench 4.1: 57% vs 18.2% for Gemini 3.8 Flash. HLE-Diamond: 58.8%. Agents' Last Exam v1.1: 71.6%.",
        "#1 overall on Vals Tax Agent Bench (52.3%) and tied for #1 on Vals Legal Research Bench (55.8%)."
      ],
      benchmarks: {
        extra: {
          "AA Intelligence Idx": "51 (54 xhigh)",
          "Terminal-Bench 4.1": "57%",
          "HLE-Diamond": "58.8%",
          "Agents' Last Exam": "71.6%"
        }
      }
    },
    {
      id: "mai-code-2",
      name: "MAI Code 2",
      shortName: "MAI Code 2",
      lab: "microsoft",
      releaseDate: "2026-11-17",
      dateFormatted: "Nov 17, 2026",
      year: 2026,
      quarter: "Q4 2026",
      category: "efficient",
      eloIndex: 1515,
      contextWindow: "1,050,000 tokens (922K input / 128K output)",
      architecture: "Sparse Mixture-of-Experts decoder with integrated vision encoder (~2.8T total, 77B active); reasoning effort low to max",
      license: "Proprietary (hosted in GitHub Copilot; weights not distributed). Pricing not disclosed",
      isOpenWeights: false,
      modalities: ["Text", "Vision"],
      trainingParadigm: "Pre-trained from scratch (~50T tokens) + RL run directly in the GitHub Copilot CLI and VS Code agent harnesses",
      summary: "Microsoft AI's first in-house frontier-scale coding model (with sibling MAI Code 2 Flash), launched at Ignite in GitHub Copilot and pitched on price-performance for everyday enterprise coding.",
      breakthroughs: [
        "Microsoft claims 96% of Claude Opus 5.5's coding performance at 5% of the cost, and 98% of GPT-6.1 Sol's at 40% of the cost (four-benchmark average).",
        "TerminalBench 2.1: 84.6% and DeepSWE 1.1: 73.2% at max reasoning in the GitHub Copilot CLI harness.",
        "Developers preferred its frontend output over GPT-6 Sol 64% of the time in blind evals (258 annotators).",
        "MAI Code 2 Flash (12B active, ~398B total) targets high-volume edits and is in limited preview in Microsoft Foundry."
      ],
      benchmarks: {
        extra: {
          "TerminalBench 2.1": "84.6%",
          "DeepSWE 1.1": "73.2%",
          "SWE Atlas": "43.1%"
        }
      }
    },
    {
      id: "mai-code-2-flash",
      name: "MAI Code 2 Flash",
      shortName: "MAI Code 2 Flash",
      lab: "microsoft",
      releaseDate: "2026-11-17",
      dateFormatted: "Nov 17, 2026",
      year: 2026,
      quarter: "Q4 2026",
      category: "efficient",
      eloIndex: 1445,
      contextWindow: "1,050,000 tokens (922K input / 128K output)",
      architecture: "Sparse Mixture-of-Experts decoder with integrated vision encoder (~398B total, 12B active); distilled from a larger in-house MAI teacher",
      license: "Proprietary (GitHub Copilot; limited-access preview in Microsoft Foundry). Pricing not disclosed",
      isOpenWeights: false,
      modalities: ["Text", "Vision"],
      trainingParadigm: "Pre-trained from scratch (~25T tokens) with logit distillation + RL in the GitHub Copilot CLI and VS Code harnesses",
      summary: "The low-latency, low-cost tier of Microsoft AI's MAI Code 2 family, built for high-volume code explanations, targeted edits and routine fixes.",
      breakthroughs: [
        "Microsoft claims performance comparable to GPT-6 Luna at 65% of the price and Claude Haiku 5.5 at 20% of the price.",
        "TerminalBench 2.1: 78.3% and DeepSWE 1.1: 59.9% at max reasoning; edges MAI Code 2 on SWE Atlas (44.8% vs 43.1%).",
        "Grows from 5B active parameters (MAI-Code-1.1-Flash) to 12B active, with a 1M-token context window."
      ],
      benchmarks: {
        extra: {
          "TerminalBench 2.1": "78.3%",
          "DeepSWE 1.1": "59.9%",
          "SWE Atlas": "44.8%"
        }
      }
    },
    {
      id: "mai-cyber-2-flash",
      name: "MAI Cyber 2 Flash",
      shortName: "MAI Cyber 2 Flash",
      lab: "microsoft",
      releaseDate: "2026-11-17",
      dateFormatted: "Nov 17, 2026",
      year: 2026,
      quarter: "Q4 2026",
      category: "efficient",
      eloIndex: 1450,
      contextWindow: "1,000,000 tokens",
      architecture: "Not disclosed",
      license: "Proprietary; exclusive to Microsoft security products incl. Codename MDASH ($0.10 / $0.50 per M tokens eval cost)",
      isOpenWeights: false,
      modalities: ["Not disclosed"],
      trainingParadigm: "Specialist security model; successor to MAI Cyber 1.1 Flash",
      summary: "Microsoft AI's specialist security model, announced at Ignite and rolling out to verified defenders in Microsoft security products from mid-December.",
      breakthroughs: [
        "CyberGym-E2E: 92.3% vs 91.5% for GPT-6 Astra, using half the reasoning budget, at under 2% of the cost per task.",
        "WebExploitBench: 40.4% vs 38.4% for GPT-5.6 Cyber at the same reasoning budget.",
        "1M-token context window, four times MAI Cyber 1.1 Flash, and priced 86% lower on output tokens."
      ],
      benchmarks: {
        extra: {
          "CyberGym-E2E": "92.3%",
          "WebExploitBench": "40.4%"
        }
      }
    },
    {
      id: "gpt-62-astra",
      name: "GPT-6.2 Astra",
      shortName: "GPT-6.2 Astra",
      lab: "openai",
      releaseDate: "2026-11-17",
      dateFormatted: "Nov 17, 2026",
      year: 2026,
      quarter: "Q4 2026",
      category: "flagship",
      eloIndex: 1552,
      contextWindow: "Not disclosed",
      architecture: "Not disclosed",
      license: "Proprietary API ($8 / $40 per M tokens; $0.40 cached input)",
      isOpenWeights: false,
      modalities: ["Not disclosed"],
      trainingParadigm: "Not disclosed",
      summary: "OpenAI's top model, released alongside GPT-6.2 Sol to Plus, Pro, Enterprise and Edu users in ChatGPT Work and Codex, and in the API as gpt-6.2-astra.",
      breakthroughs: [
        "Priced 20% below GPT-6 Astra.",
        "GDPval v2 up 6.2 points and Agents' Last Exam up 5.2 points over GPT-6 Astra.",
        "Terminal-Bench-Science 0.1 up 9 points over GPT-6 Astra.",
        "AA-3D Elo of 1,318, ahead of Claude Fable 5.2 (1,271)."
      ],
      benchmarks: {
        extra: {
          "AA-3D Elo": "1,318"
        }
      }
    },
    {
      id: "gpt-62-sol",
      name: "GPT-6.2 Sol",
      shortName: "GPT-6.2 Sol",
      lab: "openai",
      releaseDate: "2026-11-17",
      dateFormatted: "Nov 17, 2026",
      year: 2026,
      quarter: "Q4 2026",
      category: "efficient",
      eloIndex: 1538,
      contextWindow: "Not disclosed",
      architecture: "Not disclosed",
      license: "Proprietary API ($2 / $10 per M tokens; $0.10 cached input)",
      isOpenWeights: false,
      modalities: ["Not disclosed"],
      trainingParadigm: "Not disclosed",
      summary: "OpenAI's lower-cost model, released with GPT-6.2 Astra; OpenAI calls it smarter and more efficient than GPT-6.1 Sol at the same price. API: gpt-6.2-sol.",
      breakthroughs: [
        "Same price as GPT-6.1 Sol ($2 / $10 per M tokens) with GDPval v2 up 5.3 points.",
        "Within 0.5 points of GPT-6.2 Astra on FrontierCode 2.0 at a quarter of the price.",
        "Ultrafast mode available to Pro 200 subscribers with Sol (Pro 500 gets it with both models)."
      ],
      benchmarks: {
        extra: {
          "AA-3D Elo": "1,259"
        }
      }
    },
    {
      id: "gemini-4-neon",
      name: "Gemini 4 Neon",
      shortName: "Gemini 4 Neon",
      lab: "google",
      releaseDate: "2026-11-18",
      dateFormatted: "Nov 18, 2026",
      year: 2026,
      quarter: "Q4 2026",
      category: "efficient",
      eloIndex: 1545,
      contextWindow: "1,000,000 tokens",
      architecture: "Mid-tier Gemini 4 model between Carbon and Hydrogen, with four thinking levels (default high, up to xhigh)",
      license: "Proprietary API ($3 / $15 per M tokens; $0.15 cached input)",
      isOpenWeights: false,
      modalities: ["Not disclosed"],
      trainingParadigm: "Adjustable thinking depth; acts as Orchestrator directing parallel Hydrogen subagents in Antigravity",
      summary: "Google's faster, lower-cost alternative to Gemini 4 Carbon that 'balances depth and efficiency', rolling out across the Gemini API, Gemini for business, Antigravity and the Gemini app.",
      breakthroughs: [
        "Scores 61 on the Artificial Analysis Intelligence Index at xhigh thinking (#3 overall) and 58.6 on the AA Coding Agent Index (#1).",
        "At default high thinking, 32% lower cost per task than Gemini 4 Carbon.",
        "State-of-the-art 90.5% on SEC-bench Pro and 51.26% on WebExploitBench v1.2, at roughly half the cost of competing large models.",
        "Vals Index 70.9% (#2); #1 on Vals Legal Research Bench, Tax Agent Bench and Andon Labs Vending-Bench 2 ($16,843)."
      ],
      benchmarks: {
        secBenchPro: "90.5%",
        extra: {
          "AA Intelligence Idx": "61 (xhigh)",
          "AA Coding Agent Idx": "58.6",
          "Terminal-Bench 4.1": "65.2%",
          "HLE-Diamond": "71.3%",
          "Vals Index": "70.9%"
        }
      }
    }
  ];

  // Frontier personal agents: consumer products that act on a user's behalf.
  // Kept separate from FRONTIER_MODELS (not plotted on the capability chart).
  const PERSONAL_AGENTS = [
    {
      id: "grok-bot",
      name: "Grok Bot",
      lab: "xai",
      releaseDate: "2026-08-11",
      dateFormatted: "Aug 11, 2026 (beta) · 1.0 on Nov 11, 2026",
      status: "1.0 released",
      formFactor: "Always-on AI teammates, each with its own cloud computer",
      poweredBy: "Not disclosed",
      surfaces: ["macOS", "iOS", "Slack", "Microsoft Teams", "Video calls"],
      pricing: "Included with SuperGrok and Cursor paid plans (own usage allowance); no dollar price published",
      summary: "xAI's always-on AI teammates that sign into your tools and operate apps, inboxes and websites, including ones without an API.",
      capabilities: [
        "Multiple Bots run in parallel, with a 'chief of staff' Bot overseeing the others; Bots message each other and join group chats.",
        "Learns a routine by watching a task once, then reruns it.",
        "Remembers conversations and preferences, and comes back for approval on sensitive actions.",
        "1.0 (Nov 11, 2026) adds shared Team Bots, meeting attendance and proactive suggestions."
      ],
      sourceLabel: "x.ai: Grok Bot 1.0",
      sourceUrl: "https://x.ai/news/grok-bot-1-0"
    },
    {
      id: "meta-muse",
      name: "Muse",
      lab: "meta",
      releaseDate: "2026-09-08",
      dateFormatted: "Sep 8, 2026 · Australia on Nov 17, 2026",
      status: "Rolling out (US, Singapore, Australia)",
      formFactor: "Personal agent on a dedicated cloud computer with its own browser (Muse Secure VM)",
      poweredBy: "Muse Spark at launch; Muse Wonder announced as coming",
      surfaces: ["iOS", "Android", "muse.ai", "Mac app", "WhatsApp", "AI glasses (coming soon)"],
      pricing: "Free for most use, with subscription plans for more; prices not published",
      summary: "Meta's personal AI agent from Meta Superintelligence Labs, used through an app and messaging, that keeps working after the app is closed.",
      capabilities: [
        "A separate 'Sentinel' agent on the same machine must approve anything Muse sends to the internet.",
        "Asks before sensitive actions such as sending email or making a purchase, and keeps an audit trail.",
        "Persistent memory that can forget specific things on request.",
        "Purchases go through Link by Stripe with one-time-use cards."
      ],
      sourceLabel: "about.fb.com: Introducing Muse",
      sourceUrl: "https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/"
    },
    {
      id: "openai-dots",
      name: "dots",
      lab: "openai",
      releaseDate: "2026-09-29",
      dateFormatted: "Sep 29, 2026",
      status: "Gradual rollout",
      formFactor: "Always-on agents inside ChatGPT, each with its own cloud computer and browser",
      poweredBy: "GPT-6 Astra at launch; can draw on other models, incl. GPT-6.1 Terra",
      surfaces: ["ChatGPT mobile", "ChatGPT desktop", "Web (desktop)", "Voice calls", "Slack", "Texting (US beta)"],
      pricing: "ChatGPT Pro, Business Premium, Enterprise, Edu and Healthcare plans; no separate price published",
      summary: "OpenAI's always-on personal agents in ChatGPT, announced at DevDay, that keep working when your computer is off.",
      capabilities: [
        "A dot runs background agents on several tasks in parallel.",
        "Can start Work and Codex tasks and use connected computers.",
        "Conversations with a dot do not count toward ChatGPT usage limits; tasks it starts in Work or Codex do.",
        "Not available in the EEA, UK or Switzerland; Enterprise access on by default from Nov 18, 2026."
      ],
      sourceLabel: "OpenAI docs: dots",
      sourceUrl: "https://learn.chatgpt.com/docs/dots"
    },
    {
      id: "claude-duet",
      name: "Claude Duet",
      lab: "anthropic",
      releaseDate: "2026-10-21",
      dateFormatted: "Oct 21, 2026",
      status: "Research preview (waitlist)",
      formFactor: "Standalone app where Claude works as a proactive agent on a cloud VM with its own browser",
      poweredBy: "Claude Opus 5.5",
      surfaces: ["iOS", "Android", "claude.ai"],
      pricing: "Included in Pro, Max and Ultra (US first); shares the usual Claude usage limits",
      summary: "Anthropic's proactive personal agent app, which sends a morning brief and checks connected accounts every few hours.",
      capabilities: [
        "Access to over 6,000 connectors and plugins in the Claude Marketplace, plus memory and skills from the Claude account.",
        "Waits for approval before sending messages, making payments, signing documents or deleting anything.",
        "Trading securities and moving money between accounts are off-limits even with approval.",
        "Purchases go through Link (Stripe) with a virtual card, and Shop Pay checkout."
      ],
      sourceLabel: "claude.com: Claude Duet",
      sourceUrl: "https://claude.com/blog/claude-duet"
    }
  ];

  // Frontier AI labs profiled by Built In ("10 Frontier AI Labs to Know", Nov 19, 2026).
  // Kept separate from LABS (which drives the chart's colors and filters): `lab` links a
  // profile to a LABS key when that lab has models on the timeline, else null + own `color`.
  const FRONTIER_LABS = [
    {
      id: "anthropic",
      name: "Anthropic",
      lab: "anthropic",
      origin: "AI startup",
      summary: "Best known for the Claude chatbot and an enterprise offering noted for coding, with AI safety as a stated priority.",
      knownFor: ["Claude", "Claude Mythos"],
      focus: [
        "Held back the release of Claude Mythos, which Built In cites as evidence of its safety-first approach.",
        "Runs a frontier team that studies AI systems and best practices.",
        "Recently researched ways to prove an output came from a specific AI model."
      ],
      sourceLabel: "Built In: 10 Frontier AI Labs to Know",
      sourceUrl: "https://builtin.com/articles/top-frontier-ai-lab-companies"
    },
    {
      id: "meta",
      name: "Meta",
      lab: "meta",
      origin: "AI and VR company",
      summary: "Builds AI for everyday individual use under its \"personal superintelligence\" vision.",
      knownFor: ["Muse Spark", "Meta Muse"],
      focus: [
        "Reorganized its AI work under Meta Superintelligence Labs.",
        "Muse Spark is its compact model.",
        "Meta Muse is a personal AI agent that completes multi-step tasks with little or no supervision."
      ],
      sourceLabel: "Built In: 10 Frontier AI Labs to Know",
      sourceUrl: "https://builtin.com/articles/top-frontier-ai-lab-companies"
    },
    {
      id: "deepseek",
      name: "DeepSeek",
      lab: "deepseek",
      origin: "Chinese startup",
      summary: "Its DeepSeek-R1 model rivaled larger American models at a fraction of the size and cost, shocking the market.",
      knownFor: ["DeepSeek-R1", "V4-Flash", "V4.1-Flash"],
      focus: [
        "V4-Flash and V4.1-Flash bring competitive capability to smaller models.",
        "Built In says these releases change the economics of AI for companies cutting costs."
      ],
      sourceLabel: "Built In: 10 Frontier AI Labs to Know",
      sourceUrl: "https://builtin.com/articles/top-frontier-ai-lab-companies"
    },
    {
      id: "openai",
      name: "OpenAI",
      lab: "openai",
      origin: "AI lab",
      summary: "Started the modern generative AI era with the release of ChatGPT in 2022.",
      knownFor: ["ChatGPT"],
      focus: [
        "States artificial general intelligence as its ultimate goal.",
        "Research targets multimodal models that handle written, visual and audio data."
      ],
      sourceLabel: "Built In: 10 Frontier AI Labs to Know",
      sourceUrl: "https://builtin.com/articles/top-frontier-ai-lab-companies"
    },
    {
      id: "thinkingmachines",
      name: "Thinking Machines Lab",
      lab: "thinkingmachines",
      origin: "Startup",
      summary: "Founded by Mira Murati, former chief technology officer at OpenAI.",
      knownFor: ["Inkling"],
      focus: [
        "Inkling, its first model, is a generalist covering coding, reasoning and agentic tool use.",
        "Aims to promote collaboration by sharing its research and model parameters.",
        "Designs models that work with human involvement rather than without it."
      ],
      sourceLabel: "Built In: 10 Frontier AI Labs to Know",
      sourceUrl: "https://builtin.com/articles/top-frontier-ai-lab-companies"
    },
    {
      id: "google",
      name: "Google DeepMind",
      lab: "google",
      origin: "AI research lab",
      summary: "Brings together machine learning experts, scientists and engineers to extend how far AI can reason.",
      knownFor: ["Gemini 4 Argon", "Gemini 4 Carbon", "Gemini app", "AI Mode in Search"],
      focus: [
        "Gemini 4 Argon targets long-horizon reasoning in areas such as cybersecurity and software engineering.",
        "Gemini 4 Carbon followed shortly after.",
        "Its models power Google's Gemini app and AI Mode in Search."
      ],
      sourceLabel: "Built In: 10 Frontier AI Labs to Know",
      sourceUrl: "https://builtin.com/articles/top-frontier-ai-lab-companies"
    },
    {
      id: "perplexity",
      name: "Perplexity",
      lab: null,
      color: "#2dd4bf",
      origin: "AI search company",
      summary: "Challenges Google's search dominance with an AI search engine that answers in natural language with citations.",
      knownFor: ["Perplexity search engine"],
      focus: [
        "Its research team pre-trains open-weight models and improves them with reinforcement learning.",
        "Plans a multi-agent system to automate scientific research."
      ],
      sourceLabel: "Built In: 10 Frontier AI Labs to Know",
      sourceUrl: "https://builtin.com/articles/top-frontier-ai-lab-companies"
    },
    {
      id: "moonshot",
      name: "Moonshot AI",
      lab: null,
      color: "#84cc16",
      origin: "Chinese startup",
      summary: "Best known for Kimi K3, a model for knowledge work, coding, and video and game development.",
      knownFor: ["Kimi K3", "Kimi K3.1 Pro"],
      focus: [
        "Kimi K3.1 Pro is the first K3.1 model, improving on K3 in coding, 3D creation and agentic features.",
        "Built In says the K3.1 Pro release suggests China is catching up in the AI race."
      ],
      sourceLabel: "Built In: 10 Frontier AI Labs to Know",
      sourceUrl: "https://builtin.com/articles/top-frontier-ai-lab-companies"
    },
    {
      id: "mistral",
      name: "Mistral AI",
      lab: "mistral",
      origin: "French startup",
      summary: "Known for open-weight models, whose final parameters are public while training data and code are not.",
      knownFor: ["Mistral Large 4"],
      focus: [
        "Mistral Large 4 targets complex reasoning, coding and agentic work.",
        "Also researches AI guardrails, simulations and robotics applications."
      ],
      sourceLabel: "Built In: 10 Frontier AI Labs to Know",
      sourceUrl: "https://builtin.com/articles/top-frontier-ai-lab-companies"
    },
    {
      id: "xai",
      name: "SpaceXSI (formerly xAI)",
      lab: "xai",
      origin: "AI lab",
      summary: "Maker of the Grok chatbot, which draws on real-time data from the X platform. Built In lists the company under its new name, SpaceXSI.",
      knownFor: ["Grok", "Colossus supercomputer"],
      focus: [
        "Builds models for image and voice generation, and bot assistants.",
        "Trains on Colossus, described as one of the world's largest supercomputers, which it built in just over four months."
      ],
      sourceLabel: "Built In: 10 Frontier AI Labs to Know",
      sourceUrl: "https://builtin.com/articles/top-frontier-ai-lab-companies"
    }
  ];

  return { LABS, FRONTIER_MODELS, PERSONAL_AGENTS, FRONTIER_LABS };
});
