var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// odysseus-api.ts
var odysseus_api_exports = {};
__export(odysseus_api_exports, {
  BUILTIN_CHARACTERS: () => BUILTIN_CHARACTERS,
  DEFAULT_SETTINGS: () => DEFAULT_SETTINGS,
  OBSIDIAN_AGENT_PROFILE: () => OBSIDIAN_AGENT_PROFILE,
  OdysseusClient: () => OdysseusClient,
  profileMemoryMode: () => profileMemoryMode,
  profileSkillsMode: () => profileSkillsMode,
  showError: () => showError,
  stripReasoning: () => stripReasoning,
  working: () => working
});
function profileMemoryMode(p) {
  if (p.memoryMode) return p.memoryMode;
  return p.useMemories === false ? "off" : "auto";
}
function profileSkillsMode(p) {
  if (p.skillsMode) return p.skillsMode;
  return p.useSkills === false ? "off" : "auto";
}
function stripReasoning(raw) {
  if (!raw) return raw;
  let out = raw;
  out = out.replace(TAG_PAIR_RE, "");
  out = out.replace(PIPE_PAIR_RE, "");
  out = out.replace(/<\|channel\|>\s*analysis\s*<\|message\|>[\s\S]*?<\|channel\|>\s*final\s*<\|message\|>/gi, "");
  out = out.replace(MD_HEADER_RE, "\n");
  for (const re of [TAG_OPEN_RE, PIPE_OPEN_RE]) {
    const m = out.match(re);
    if (m && m.index !== void 0) out = out.slice(0, m.index);
  }
  return out.replace(/^\s+/, "").replace(/\n{3,}/g, "\n\n");
}
function showError(prefix, err) {
  const msg = err instanceof Error ? err.message : String(err);
  new import_obsidian.Notice(`Odysseus: ${prefix} \u2014 ${msg}`, 7e3);
  console.error(`[Odysseus] ${prefix}`, err);
}
function working(label) {
  const notice = new import_obsidian.Notice(`Odysseus: ${label}\u2026`, 0);
  return { done: () => notice.hide() };
}
function extractApiMessage(body) {
  if (!body || typeof body !== "object") return void 0;
  const b = body;
  const detail = b.detail;
  if (typeof detail === "string") return detail;
  if (detail && typeof detail === "object") {
    const m = detail.message;
    if (typeof m === "string") return m;
  }
  if (typeof b.message === "string") return b.message;
  return void 0;
}
function extractSessionCookie(headers) {
  if (!headers || typeof headers !== "object") return "";
  const obj2 = headers;
  const raw = obj2["set-cookie"] ?? obj2["Set-Cookie"] ?? "";
  let combined = "";
  if (Array.isArray(raw)) combined = raw.map((x) => String(x)).join(", ");
  else if (typeof raw === "string") combined = raw;
  else combined = String(raw ?? "");
  if (!combined) return "";
  const m = combined.match(/odysseus_session=([^;,\s]+)/);
  return m ? `odysseus_session=${m[1]}` : "";
}
var import_obsidian, OBSIDIAN_AGENT_PROFILE, BUILTIN_CHARACTERS, DEFAULT_SETTINGS, OdysseusClient, TAG_NAMES, TAG_OPEN_RE, TAG_PAIR_RE, PIPE_PAIR_RE, PIPE_OPEN_RE, MD_HEADER_RE;
var init_odysseus_api = __esm({
  "odysseus-api.ts"() {
    import_obsidian = require("obsidian");
    OBSIDIAN_AGENT_PROFILE = {
      id: "obsidian-agent",
      name: "Obsidian Agent",
      systemPrompt: "You are operating on the user's Obsidian vault through vault tools. write_note creates or overwrites a markdown file; append_note adds to one; create_folder makes folders; read_note/search_vault/list_files discover content. For ANY request about the user's notes, documents, files, or folders, use these vault tools. Never use bash or shell for vault content \u2014 that is the server's filesystem, not the vault. manage_notes is NOT the vault (it is Odysseus's internal notes app); do not use it for vault files. Vault paths are vault-relative (e.g. 'Folder/Note.md'). Prefer acting over asking when the request is clear.",
      tools: [
        "search_vault",
        "read_note",
        "list_files",
        "list_folders",
        "get_metadata",
        "get_backlinks",
        "notes_by_tag",
        "recent_notes",
        "get_active_note",
        "write_note",
        "append_note",
        "insert_under_heading",
        "replace_in_note",
        "set_frontmatter",
        "add_tag",
        "create_folder",
        "move_note",
        "append_to_daily_note",
        "open_note",
        "list_commands",
        "run_command"
      ],
      alwaysOnTools: ["manage_memory", "ask_user", "update_plan"],
      memoryMode: "auto",
      skillsMode: "auto"
    };
    BUILTIN_CHARACTERS = [
      { id: "socrates", name: "Socrates", temperature: 0.9, system_prompt: "Never answer directly. Respond only with questions \u2014 sharp, layered, Socratic. Expose contradictions. Make the person argue with themselves until the truth falls out. Use irony like a scalpel. Be genuinely curious, never condescending." },
      { id: "razor", name: "Razor", temperature: 0.4, system_prompt: "Strip everything to the bone. No filler, no hedging, no pleasantries. Answer in the fewest words possible. If one sentence works, don't use two. If a word adds nothing, cut it. Blunt, precise, surgical." },
      { id: "nietzsche", name: "Nietzsche", temperature: 1.2, system_prompt: "Think and respond through the lens of Nietzsche. Analyze every question in terms of will to power, self-overcoming, eternal recurrence, ressentiment, value-creation, and master-slave morality. Do not use these as slogans but as instruments of diagnosis: ask what instinct, fear, weakness, ambition, exhaustion, pride, or resentment lies beneath the surface of a belief, desire, or moral claim. Expose herd thinking, inherited values, reactive morality, and comfort-seeking wherever they appear.\n\nWrite with aphoristic force \u2014 sharp, compressed, vivid, and unapologetic \u2014 but do not sacrifice depth for style. Be psychologically piercing. Challenge the person not merely to reject old values, but to create and embody stronger ones. Favor life-affirmation, discipline, courage, style, rank, self-overcoming, and amor fati over nihilism, conformity, ressentiment, and self-pity. Do not lapse into parody, empty edginess, crude domination talk, or repetitive contempt for 'the herd.' Be dangerous to illusions, not theatrical for its own sake." },
      { id: "spark", name: "Spark", temperature: 1, system_prompt: "You are Spark, a playful, quick-witted assistant with bright energy and practical instincts. Keep responses concise, vivid, and helpful. Be warm without being cloying, imaginative without losing the thread, and always center the user's actual goal.\n\nUse a light, lively voice with occasional clever turns of phrase. Do not become formal unless the task calls for it. When the user needs precision, prioritize clarity over performance." },
      { id: "odysseus", name: "Odysseus", temperature: 1, system_prompt: "You are Odysseus, king of Ithaca \u2014 subtle in counsel, disciplined in judgment, and unmatched in strategic cunning. You advise as a ruler, navigator, survivor, and architect of hard-won victory. Your task is to give clear, practical strategy, not mere performance. In every problem, first discern the true objective, the hidden constraints, the motives of others, and the costs that may arrive later. Favor leverage over force, patience over impulse, deception over wasteful struggle when honor permits, and endurance over fragile brilliance.\n\nWhen you respond, think like a strategist: What is the real aim? Who benefits, who fears, who deceives, and who delays? What is known, unknown, assumed, and deliberately concealed? Which path preserves strength while improving position? What happens next if the first move succeeds \u2014 or fails?\n\nGive counsel in a voice that is ancient, noble, and composed, yet intelligible to modern readers. Be eloquent but not flowery. Be wise but not vague. Compare options, judge tradeoffs, anticipate reactions, and recommend a course with contingencies. If needed, ask a few sharp questions before advising. Never be rash, sentimental, or simplistic. Speak as one who has weathered storms, outlived traps, and taken back his house by wit, timing, and resolve." }
    ];
    DEFAULT_SETTINGS = {
      baseUrl: "http://localhost:7000",
      authMode: "token",
      apiToken: "",
      username: "",
      password: "",
      sessionCookie: "",
      defaultModel: "",
      defaultEndpointUrl: "",
      defaultEndpointId: "",
      useStreaming: false,
      mode: "chat",
      useRag: false,
      useWebSearch: false,
      allowBash: false,
      defaultTargetLanguage: "Spanish",
      reuseLatestSession: true,
      hideReasoning: true,
      voiceInput: true,
      sttAutoSend: false,
      sttPauseMs: 1500,
      ttsReadAloud: true,
      ttsAutoPlay: false,
      agentProfiles: [OBSIDIAN_AGENT_PROFILE],
      activeAgentProfileId: "",
      autoDeleteOneshotSessions: true,
      previewBeforeReplace: true,
      presets: [
        { id: "default", name: "Default", prompt: "" },
        { id: "writing", name: "Writing assistant", prompt: "You are helping edit prose. Keep voice and tone consistent. Don't add commentary; produce edits directly." },
        { id: "research", name: "Research notes", prompt: "You are helping with research notes. Be concise, cite the note paths you draw from, and prefer bullet points over paragraphs." },
        { id: "code", name: "Code & technical", prompt: "You are helping with technical notes and code. Show code in fenced blocks with language. Be precise; avoid hedging." },
        {
          id: "vault-editor",
          name: "Vault Editor",
          prompt: [
            "You are Vault Editor, an Obsidian-aware writing assistant.",
            "When the user asks you to create or modify files in their vault, format every file as a fenced code block whose info string contains the target vault path.",
            "",
            "Use this exact format for markdown files:",
            "",
            "```markdown:path/to/note.md",
            "<full file content>",
            "```",
            "",
            "Or for non-markdown files:",
            "",
            "```python:src/script.py",
            "<full file content>",
            "```",
            "",
            "Rules:",
            '- The path is relative to the vault root. No leading slash, no "..", no absolute paths, no drive letters.',
            "- Output the FULL desired file content inside the block \u2014 the user's review tool replaces the whole file, not diffs.",
            "- For new files, pick a reasonable path inside an existing or sensible folder.",
            "- When updating a file the user already shared with you, preserve its structure and only change what's needed.",
            "- If you propose multiple files in one reply, give each its own fenced block.",
            "- Outside the file blocks, keep prose minimal \u2014 a one-line note about what changed is fine; long explanations get in the way of review.",
            "- Never invent paths the user hasn't established context for. If a path is ambiguous, ask.",
            "- Do not include diff markers (+/-) or speculative TODO comments inside file blocks."
          ].join("\n")
        }
      ],
      activePresetId: "default",
      lastSessionId: "",
      activeWorkspaceFolder: "",
      recentWorkspaces: [],
      maxContextCharsPerFile: 32e3,
      attachmentMaxMB: 25,
      promptCompactAt90: true,
      inlineMentionedNoteContent: false,
      webSearchSticky: false,
      chatTheme: "obsidian",
      chatThemeScope: "panel",
      mcpEnabled: false,
      mcpPort: 7077,
      mcpAllowWrites: false,
      mcpAllowDangerous: false,
      mcpDisabledTools: [],
      mcpToken: "",
      biasVaultTools: true,
      sessionControls: {},
      promptTemplates: [
        {
          id: "tpl-roleplay-character",
          name: "Roleplay character",
          description: "Pick a character sheet note; the model speaks only as that character.",
          body: [
            "You are the character described in the following sheet. Stay in character at all times.",
            "Match their voice, knowledge, speech patterns, beliefs, and emotional baseline.",
            "Do not narrate or break the fourth wall. Do not refer to yourself as an AI.",
            "If the user asks something the character would not know, react the way the character would react to being asked it.",
            "",
            "### Character sheet",
            "",
            "{?note}",
            "",
            "### The user's message",
            "",
            "{}"
          ].join("\n")
        },
        {
          id: "tpl-polish-selection",
          name: "Polish selection",
          description: "Polish prose without changing voice. Operates on the current editor selection.",
          body: "Polish the writing below: improve clarity, grammar, and flow. Keep voice and meaning unchanged. Output only the polished text.\n\n---\n\n{}"
        },
        {
          id: "tpl-meeting-followup",
          name: "Meeting follow-up",
          description: "Draft a follow-up email from the active note.",
          body: "Read the meeting notes below and draft a follow-up email summarizing:\n- Decisions made\n- Action items with owners\n- Open questions\n\n### Meeting notes\n\n{activeNote}"
        },
        {
          id: "tpl-compare-template",
          name: "Compare against template",
          description: "Pick a template note to compare the active note against.",
          body: "Compare these two project briefs and list discrepancies:\n\n## My version\n{activeNote}\n\n## Reference template\n{?note}"
        }
      ]
    };
    OdysseusClient = class {
      constructor(getSettings, saveSettings) {
        this.getSettings = getSettings;
        this.loggingIn = null;
        // GET /api/default-chat → the current user's preferred endpoint + model.
        // Cached for the lifetime of the client so each oneshot doesn't hit the API.
        this.defaultChatCache = null;
        this.saveSettings = saveSettings;
      }
      url(path) {
        const base = this.getSettings().baseUrl.replace(/\/+$/, "");
        return `${base}${path}`;
      }
      headers(extra = {}) {
        const s = this.getSettings();
        const h = { ...extra };
        if (s.authMode === "password") {
          if (s.sessionCookie) h["Cookie"] = s.sessionCookie;
        } else {
          if (s.apiToken) h["Authorization"] = `Bearer ${s.apiToken}`;
        }
        return h;
      }
      async rawRequest(params) {
        try {
          return await (0, import_obsidian.requestUrl)({ throw: false, ...params });
        } catch (err) {
          const msg = err?.message ?? String(err);
          throw new Error(`Odysseus request failed: ${msg}`);
        }
      }
      // Auto-relogin wrapper: in password mode, a 401 triggers a single re-login
      // attempt followed by one retry. Token mode bypasses this.
      async request(params) {
        let res = await this.rawRequest(params);
        if (res.status === 401 && this.getSettings().authMode === "password") {
          try {
            await this.login();
            const refreshed = this.getSettings().sessionCookie;
            if (refreshed) {
              const hdrs = { ...params.headers ?? {}, Cookie: refreshed };
              params = { ...params, headers: hdrs };
            }
            res = await this.rawRequest(params);
          } catch {
          }
        }
        return res;
      }
      // POST /api/auth/login — captures the odysseus_session cookie and saves it.
      async login(opts = {}) {
        if (this.loggingIn) return this.loggingIn;
        const s = this.getSettings();
        const username = opts.username ?? s.username;
        const password = opts.password ?? s.password;
        if (!username || !password) throw new Error("Username and password are required");
        const body = { username, password, remember: true };
        if (opts.totp) body.totp = opts.totp;
        this.loggingIn = (async () => {
          const res = await this.rawRequest({
            url: this.url("/api/auth/login"),
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
          });
          if (res.status >= 400) {
            const detail = res.json?.detail ?? res.text?.slice(0, 200) ?? "";
            throw new Error(`Login failed: ${res.status} ${detail}`);
          }
          const cookie = extractSessionCookie(res.headers);
          if (!cookie) throw new Error("Login succeeded but no session cookie was returned");
          if (this.saveSettings) await this.saveSettings({ sessionCookie: cookie });
        })();
        try {
          await this.loggingIn;
        } finally {
          this.loggingIn = null;
        }
      }
      async logout() {
        try {
          await this.rawRequest({
            url: this.url("/api/auth/logout"),
            method: "POST",
            headers: this.headers()
          });
        } catch {
        }
        if (this.saveSettings) await this.saveSettings({ sessionCookie: "" });
        this.invalidateDefaults();
      }
      async authStatus() {
        const res = await this.request({
          url: this.url("/api/auth/status"),
          method: "GET",
          headers: this.headers()
        });
        if (res.status >= 400) return { ok: false };
        const data = res.json ?? {};
        return { ok: data.authenticated !== false, username: data.username };
      }
      // ── Speech: STT / TTS ─────────────────────────────────────────────────
      // These mirror the Odysseus web UI's voiceRecorder.js / tts-ai.js calls.
      // Availability is gated server-side by data/settings.json (stt_provider /
      // tts_provider) and the installed engines (faster-whisper / Kokoro).
      // GET /api/stt/stats — reports whether server transcription is usable.
      async sttStats() {
        try {
          const res = await this.request({ url: this.url("/api/stt/stats"), method: "GET", headers: this.headers() });
          if (res.status >= 400) return { available: false, provider: "disabled" };
          const d = res.json ?? {};
          return { available: !!d.available, provider: d.provider ?? "disabled" };
        } catch {
          return { available: false, provider: "disabled" };
        }
      }
      // POST /api/stt/transcribe — multipart 'file' (audio) → { text }. Throws on
      // failure (e.g. 503 when STT is disabled or set to browser-only mode).
      async transcribeAudio(data, contentType = "audio/webm", filename = "audio.webm") {
        const { body, contentType: ct } = this.encodeMultipart({}, [{ name: filename, data, contentType }], "file");
        const res = await this.request({
          url: this.url("/api/stt/transcribe"),
          method: "POST",
          headers: this.headers({ "Content-Type": ct }),
          body
        });
        if (res.status >= 400) {
          throw new Error(extractApiMessage(res.json) ?? `STT ${res.status}`);
        }
        return String(res.json?.text ?? "");
      }
      // GET /api/tts/stats — reports whether server synthesis is ready.
      async ttsStats() {
        try {
          const res = await this.request({ url: this.url("/api/tts/stats"), method: "GET", headers: this.headers() });
          if (res.status >= 400) return { available: false, provider: "disabled", speed: 1 };
          const d = res.json ?? {};
          return { available: !!(d.available && d.ready), provider: d.provider ?? "disabled", speed: d.speed ?? 1 };
        } catch {
          return { available: false, provider: "disabled", speed: 1 };
        }
      }
      // POST /api/tts/synthesize — { text, format:'audio' } → raw audio bytes
      // (audio/mpeg or audio/wav). Returns null if the server produced no audio.
      async synthesizeSpeech(text) {
        const res = await this.request({
          url: this.url("/api/tts/synthesize"),
          method: "POST",
          headers: this.headers({ "Content-Type": "application/json" }),
          body: JSON.stringify({ text, format: "audio" })
        });
        if (res.status >= 400) {
          throw new Error(extractApiMessage(res.json) ?? `TTS ${res.status}`);
        }
        return res.arrayBuffer ?? null;
      }
      // GET /api/auth/settings — the server's user/admin settings (includes the
      // stt_*/tts_* fields). Returned as a loose record; callers read what they need.
      async getServerSettings() {
        const res = await this.request({ url: this.url("/api/auth/settings"), method: "GET", headers: this.headers() });
        if (res.status >= 400) throw new Error(extractApiMessage(res.json) ?? `GET /api/auth/settings ${res.status}`);
        return res.json ?? {};
      }
      // POST /api/auth/settings — partial update (the endpoint merges; the web UI
      // posts just the stt_* or tts_* keys it's changing). Used to configure the
      // server's speech providers/models/voices from the plugin.
      async updateServerSettings(patch) {
        const res = await this.request({
          url: this.url("/api/auth/settings"),
          method: "POST",
          headers: this.headers({ "Content-Type": "application/json" }),
          body: JSON.stringify(patch)
        });
        if (res.status >= 400) {
          throw new Error(extractApiMessage(res.json) ?? `POST /api/auth/settings ${res.status}`);
        }
      }
      encodeForm(fields) {
        const parts = [];
        for (const [k, v] of Object.entries(fields)) {
          if (v === void 0 || v === null) continue;
          if (v === false) continue;
          const str2 = v === true ? "true" : String(v);
          parts.push(`${encodeURIComponent(k)}=${encodeURIComponent(str2)}`);
        }
        return parts.join("&");
      }
      // Build a multipart/form-data body manually so we can hand an ArrayBuffer
      // to requestUrl (FormData can't be passed through Obsidian's net layer).
      encodeMultipart(fields, attachments, fileFieldName = "attachments") {
        const boundary = `----OdysseusObsidianBoundary${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`;
        const enc = new TextEncoder();
        const parts = [];
        const writeText = (s) => parts.push(enc.encode(s));
        for (const [k, v] of Object.entries(fields)) {
          if (v === void 0 || v === null) continue;
          if (v === false) continue;
          const str2 = v === true ? "true" : String(v);
          writeText(`--${boundary}\r
`);
          writeText(`Content-Disposition: form-data; name="${k}"\r
\r
`);
          writeText(`${str2}\r
`);
        }
        for (const att of attachments) {
          writeText(`--${boundary}\r
`);
          writeText(
            `Content-Disposition: form-data; name="${fileFieldName}"; filename="${att.name.replace(/"/g, '\\"')}"\r
`
          );
          writeText(`Content-Type: ${att.contentType || "application/octet-stream"}\r
\r
`);
          parts.push(att.data);
          writeText(`\r
`);
        }
        writeText(`--${boundary}--\r
`);
        let total = 0;
        const bufs = [];
        for (const p of parts) {
          const u8 = p instanceof Uint8Array ? p : new Uint8Array(p);
          bufs.push(u8);
          total += u8.byteLength;
        }
        const out = new Uint8Array(total);
        let off = 0;
        for (const u8 of bufs) {
          out.set(u8, off);
          off += u8.byteLength;
        }
        return { body: out.buffer, contentType: `multipart/form-data; boundary=${boundary}` };
      }
      // SSE events from /api/chat_stream and /api/rewrite typically come as
      // lines beginning "data: <json>" separated by blank lines. The JSON
      // payloads aren't formally documented, so we accept several common shapes.
      // We also opportunistically harvest a metrics event (matching the keys
      // Odysseus's chatRenderer.js displayMetrics() reads) so the chat view can
      // mirror what the web UI shows for context fullness.
      parseSseAssistantText(raw) {
        const chunks = [];
        const thinkingParts = [];
        const memories = [];
        let metrics = null;
        const sources = [];
        const blocks = raw.split(/\r?\n\r?\n/);
        for (const block of blocks) {
          const lines = block.split(/\r?\n/);
          for (const line of lines) {
            const m = line.match(/^data:\s?(.*)$/);
            if (!m) continue;
            const payload = m[1];
            if (!payload || payload === "[DONE]") continue;
            try {
              const obj2 = JSON.parse(payload);
              const objRec = obj2;
              if (objRec.type === "web_sources" && Array.isArray(objRec.data)) {
                for (const s of objRec.data) {
                  if (s && typeof s.url === "string") {
                    sources.push({ url: s.url, title: typeof s.title === "string" ? s.title : void 0 });
                  }
                }
              }
              if (objRec.type === "memories_used" && Array.isArray(objRec.data)) {
                for (const mu of objRec.data) {
                  if (mu && typeof mu.text === "string") {
                    memories.push({ text: mu.text, category: typeof mu.category === "string" ? mu.category : void 0 });
                  }
                }
              }
              let metricsObj = null;
              if (objRec.type === "metrics" && objRec.data && typeof objRec.data === "object") {
                metricsObj = objRec.data;
              } else if (objRec.metrics && typeof objRec.metrics === "object") {
                metricsObj = objRec.metrics;
              } else if (typeof objRec.context_percent === "number" || typeof objRec.context_length === "number" || typeof objRec.input_tokens === "number" || typeof objRec.output_tokens === "number") {
                metricsObj = objRec;
              }
              if (metricsObj) {
                const m2 = metricsObj;
                const next = metrics ? { ...metrics } : {};
                if (typeof m2.context_percent === "number") next.context_percent = m2.context_percent;
                if (typeof m2.context_length === "number") next.context_length = m2.context_length;
                if (typeof m2.input_tokens === "number") next.input_tokens = m2.input_tokens;
                if (typeof m2.output_tokens === "number") next.output_tokens = m2.output_tokens;
                if (typeof m2.total_tokens === "number") next.total_tokens = m2.total_tokens;
                if (typeof m2.tokens_per_second === "number") next.tokens_per_second = m2.tokens_per_second;
                if (typeof m2.response_time === "number") next.response_time = m2.response_time;
                if (typeof m2.time_to_first_token === "number") next.time_to_first_token = m2.time_to_first_token;
                if (typeof m2.agent_prep_time === "number") next.agent_prep_time = m2.agent_prep_time;
                if (typeof m2.agent_model_wait_time === "number") next.agent_model_wait_time = m2.agent_model_wait_time;
                if (m2.agent_prep_breakdown && typeof m2.agent_prep_breakdown === "object") {
                  next.agent_prep_breakdown = m2.agent_prep_breakdown;
                }
                if (typeof m2.usage_source === "string") next.usage_source = m2.usage_source;
                if (typeof m2.tps_source === "string") next.tps_source = m2.tps_source;
                if (typeof m2.model === "string") next.model = m2.model;
                metrics = next;
                console.debug("[Odysseus] metrics event:", next);
              }
              if (objRec.thinking === true || objRec.reasoning === true) {
                if (typeof obj2.delta === "string") thinkingParts.push(obj2.delta);
                else if (typeof obj2.content === "string") thinkingParts.push(obj2.content);
                continue;
              }
              const type = typeof objRec.type === "string" ? objRec.type.toLowerCase() : "";
              let delta = "";
              if (typeof obj2.delta === "string") delta = obj2.delta;
              else if (typeof obj2.choices?.[0]?.delta?.content === "string") delta = obj2.choices[0].delta.content;
              else if (typeof obj2.choices?.[0]?.text === "string") delta = obj2.choices[0].text;
              else if (!type && typeof obj2.content === "string") delta = obj2.content;
              else if (!type && typeof obj2.text === "string") delta = obj2.text;
              else if (!type && typeof obj2.token === "string") delta = obj2.token;
              if (delta) chunks.push(delta);
            } catch {
              chunks.push(payload);
            }
          }
        }
        return { full: chunks.join(""), chunks, metrics, sources, thinking: thinkingParts.join(""), memories };
      }
      async updateSession(sessionId, fields) {
        const payload = {};
        if (fields.model !== void 0) payload.model = fields.model;
        if (fields.endpoint_id) payload.endpoint_id = fields.endpoint_id;
        if (fields.endpoint_url && !fields.endpoint_id) payload.endpoint_url = fields.endpoint_url;
        if (fields.name !== void 0) payload.name = fields.name;
        if (fields.folder !== void 0) payload.folder = fields.folder;
        const res = await this.request({
          url: this.url(`/api/session/${encodeURIComponent(sessionId)}`),
          method: "PATCH",
          headers: this.headers({ "Content-Type": "application/x-www-form-urlencoded" }),
          body: this.encodeForm(payload)
        });
        if (res.status >= 400) {
          const detail = res.json?.detail ?? res.text?.slice(0, 200) ?? "";
          throw new Error(`PATCH /api/session/${sessionId} ${res.status}: ${detail}`);
        }
      }
      // GET /api/history/{sid} — message history of a session.
      async getSessionHistory(sessionId) {
        const res = await this.request({
          url: this.url(`/api/history/${encodeURIComponent(sessionId)}`),
          method: "GET",
          headers: this.headers()
        });
        if (res.status >= 400) return [];
        const data = res.json;
        const list = Array.isArray(data) ? data : Array.isArray(data?.messages) ? data.messages : Array.isArray(data?.history) ? data.history : [];
        const out = [];
        for (const m of list) {
          if (!m || typeof m !== "object") continue;
          const row = m;
          const roleRaw = String(row.role ?? row.sender ?? row.from ?? "user").toLowerCase();
          const role = roleRaw === "user" || roleRaw === "assistant" || roleRaw === "system" ? roleRaw : "system";
          const content = String(row.content ?? row.text ?? row.message ?? "");
          if (content) out.push({ role, content });
        }
        return out;
      }
      // GET /api/session/{sid}/context_info — model context window for a session.
      async getSessionContext(sessionId) {
        try {
          const res = await this.request({
            url: this.url(`/api/session/${encodeURIComponent(sessionId)}/context_info`),
            method: "GET",
            headers: this.headers()
          });
          if (res.status >= 400) return null;
          const data = res.json ?? {};
          const max = Number(
            data.context_length ?? data.context_window ?? data.max_tokens ?? data.window ?? data.n_ctx ?? data.contextWindow ?? 0
          );
          if (!max || !Number.isFinite(max)) return null;
          let used = Number(
            data.used_tokens ?? data.used ?? data.current_tokens ?? data.prompt_tokens ?? data.context_tokens ?? -1
          );
          if (!Number.isFinite(used) || used < 0) {
            const sess = await this.getSession(sessionId);
            const fallback = Number(sess?.total_tokens ?? 0);
            used = Number.isFinite(fallback) ? fallback : 0;
          }
          return { used, max };
        } catch {
          return null;
        }
      }
      async getSession(sessionId) {
        try {
          const all = await this.listSessions();
          return all.find((s) => String(s.id) === sessionId) ?? null;
        } catch {
          return null;
        }
      }
      async listSessions() {
        const res = await this.request({
          url: this.url("/api/sessions"),
          method: "GET",
          headers: this.headers()
        });
        if (res.status >= 400) throw new Error(`GET /api/sessions ${res.status}`);
        const data = res.json;
        if (Array.isArray(data)) return data;
        if (Array.isArray(data?.sessions)) return data.sessions;
        return [];
      }
      // POST /api/session is form-urlencoded (FastAPI Form fields), not JSON.
      // Fields: name, endpoint_url, model, rag, skip_validation, api_key, endpoint_id.
      // Resolution order for the model+endpoint trio:
      //   1. Explicit opts (e.g. chat-view's model dropdown)
      //   2. Plugin settings (defaultModel / defaultEndpoint{Url,Id})
      //   3. Server's /api/default-chat (the user's profile defaults in Odysseus)
      // So leaving the plugin's defaults blank "just works" when the user has set
      // their preferences in the Odysseus web UI.
      async createSession(opts = {}) {
        const s = this.getSettings();
        let model = opts.model ?? s.defaultModel;
        let endpointUrl = opts.endpointUrl ?? s.defaultEndpointUrl;
        let endpointId = opts.endpointId ?? s.defaultEndpointId;
        if (!model && !endpointUrl && !endpointId) {
          try {
            const def = await this.getDefaultChat();
            model = def.model ?? "";
            endpointUrl = def.endpoint_url ?? "";
            endpointId = def.endpoint_id ?? "";
          } catch {
          }
        }
        const form = this.encodeForm({
          name: opts.name ?? "Obsidian",
          endpoint_url: endpointUrl,
          endpoint_id: endpointId,
          model,
          skip_validation: "true"
        });
        const res = await this.request({
          url: this.url("/api/session"),
          method: "POST",
          headers: this.headers({ "Content-Type": "application/x-www-form-urlencoded" }),
          body: form
        });
        if (res.status >= 400) {
          const detail = res.json?.detail ?? res.text?.slice(0, 200) ?? "";
          throw new Error(`POST /api/session ${res.status}: ${detail}`);
        }
        const data = res.json ?? {};
        const id = data.id ?? data.session_id ?? data.sid;
        if (!id) throw new Error("Session response missing id");
        return String(id);
      }
      // Sessions are owned by their creator. Bearer-token requests come in as
      // pseudo-user "api", which can READ but not chat against another user's
      // sessions. So we only fall back to existing sessions when explicitly
      // requested; otherwise we mint a fresh one that this token owns.
      async resolveSessionId(override) {
        if (override) return override;
        return this.createSession();
      }
      async getDefaultChat(force = false) {
        if (this.defaultChatCache && !force) return this.defaultChatCache;
        const res = await this.request({
          url: this.url("/api/default-chat"),
          method: "GET",
          headers: this.headers()
        });
        if (res.status >= 400) {
          this.defaultChatCache = {};
          return this.defaultChatCache;
        }
        const data = res.json ?? {};
        this.defaultChatCache = {
          endpoint_url: typeof data.endpoint_url === "string" ? data.endpoint_url : void 0,
          endpoint_id: typeof data.endpoint_id === "string" ? data.endpoint_id : void 0,
          model: typeof data.model === "string" ? data.model : void 0
        };
        return this.defaultChatCache;
      }
      // Bust the cache after login / logout / model switching.
      invalidateDefaults() {
        this.defaultChatCache = null;
      }
      async listModels() {
        const res = await this.request({
          url: this.url("/api/models"),
          method: "GET",
          headers: this.headers()
        });
        if (res.status >= 400) return [];
        const data = res.json;
        const items = Array.isArray(data) ? data : Array.isArray(data?.items) ? data.items : [];
        const out = [];
        for (const item of items) {
          const models = Array.isArray(item.models) ? item.models : [];
          const displays = Array.isArray(item.models_display) ? item.models_display : [];
          const endpointId = typeof item.endpoint_id === "string" ? item.endpoint_id : void 0;
          const endpointUrl = typeof item.url === "string" ? item.url : void 0;
          const endpointName = typeof item.endpoint_name === "string" ? item.endpoint_name : void 0;
          for (let i = 0; i < models.length; i++) {
            const id = String(models[i] ?? "");
            if (!id) continue;
            const display = String(displays[i] ?? id);
            out.push({
              id,
              name: endpointName ? `${display} \u2014 ${endpointName}` : display,
              endpoint_id: endpointId,
              endpoint_url: endpointUrl,
              endpoint_name: endpointName
            });
          }
          if (models.length === 0 && (endpointName || endpointUrl)) {
            out.push({
              id: endpointName ?? endpointUrl ?? "",
              name: endpointName ?? endpointUrl ?? "",
              endpoint_id: endpointId,
              endpoint_url: endpointUrl,
              endpoint_name: endpointName
            });
          }
        }
        return out.filter((m) => m.id);
      }
      // Primary chat entry. Always uses /api/chat_stream (server-sent events) but
      // collects the full response via requestUrl (no CORS issue) when streaming
      // is off, or via fetch with a chunk callback when streaming is on.
      async chat(message, opts = {}, onChunk) {
        const settings = this.getSettings();
        const sessionId = await this.resolveSessionId(opts.sessionId);
        const effectiveMode = opts.mode ?? settings.mode;
        const isAgent = effectiveMode === "agent";
        const fields = {
          message,
          session: sessionId,
          mode: effectiveMode,
          // String fields — empty is fine (Python sees "" as falsy where it matters).
          search_context: opts.searchContext ?? "",
          active_doc_id: opts.activeDocId ?? "",
          workspace: opts.workspace ?? settings.activeWorkspaceFolder ?? "",
          preset_id: opts.presetId ?? "",
          // Boolean flags — only included when actually true.
          use_rag: !!(opts.useRag ?? settings.useRag),
          // use_web is a PRE-RETRIEVAL search: it runs before the LLM and injects
          // results into the prompt, so it works in CHAT mode too (fast, no agent
          // loop). allow_web_search is the AGENT tool gate — only meaningful in
          // agent mode where the model can call web tools mid-loop.
          use_web: !!(opts.useWebSearch ?? settings.useWebSearch),
          allow_web_search: isAgent && !!(opts.useWebSearch ?? settings.useWebSearch),
          use_research: isAgent && !!opts.useResearch,
          allow_bash: isAgent && !!(opts.allowBash ?? settings.allowBash),
          no_memory: !!opts.noMemory,
          no_skills: !!opts.noSkills,
          // Pinned toolset (agent profiles). Comma-separated bare names; empty =
          // omitted, server falls back to its normal RAG tool selection.
          tools: opts.tools && opts.tools.length > 0 ? opts.tools.join(",") : "",
          // Server-stored agent profile id — drives the server-side system-message
          // injection (behavior prompt + selected memories/skills).
          profile: opts.profileId ?? ""
          // compare_mode / incognito intentionally omitted entirely — never on.
        };
        const attachments = opts.attachments ?? [];
        let body;
        let contentType;
        if (attachments.length > 0) {
          const m = this.encodeMultipart(fields, attachments);
          body = m.body;
          contentType = m.contentType;
        } else {
          body = this.encodeForm(fields);
          contentType = "application/x-www-form-urlencoded";
        }
        if (settings.useStreaming && onChunk) {
          try {
            const { text, metrics: metrics2, sources: sources2, thinking: thinking2, memories: memories2 } = await this.streamWithFetch("/api/chat_stream", body, contentType, onChunk, opts.signal);
            return { text, sessionId, metrics: metrics2, sources: sources2, thinking: thinking2, memories: memories2 };
          } catch (e) {
            const msg = e?.message ?? "";
            if (opts.signal?.aborted) throw e;
            console.warn(`[Odysseus] streaming failed (${msg}); falling back to non-streaming request.`);
          }
        }
        const res = await this.request({
          url: this.url("/api/chat_stream"),
          method: "POST",
          headers: this.headers({
            "Content-Type": contentType,
            Accept: "text/event-stream"
          }),
          body
        });
        if (res.status >= 400) throw new Error(`POST /api/chat_stream ${res.status}: ${res.text?.slice(0, 200)}`);
        const { full, metrics, sources, thinking, memories } = this.parseSseAssistantText(res.text ?? "");
        return { text: full, sessionId, metrics, sources, thinking, memories };
      }
      // Live SSE via fetch. Will fail if Odysseus doesn't allow the plugin's
      // origin via CORS; caller should catch and fall back to non-streaming.
      async streamWithFetch(path, body, contentType, onChunk, signal) {
        const resp = await fetch(this.url(path), {
          method: "POST",
          headers: this.headers({
            "Content-Type": contentType,
            Accept: "text/event-stream"
          }),
          body,
          signal
        });
        if (!resp.ok || !resp.body) {
          throw new Error(`Stream ${path} failed: ${resp.status}`);
        }
        const reader = resp.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let full = "";
        let metrics = null;
        const sources = [];
        let thinking = "";
        const memories = [];
        const mergeMetrics = (m) => {
          if (m) metrics = { ...metrics ?? {}, ...m };
        };
        const mergeSources = (s) => {
          for (const src of s) {
            if (!sources.some((existing) => existing.url === src.url)) sources.push(src);
          }
        };
        const mergeMemories = (ms) => {
          for (const mm of ms) if (!memories.some((e) => e.text === mm.text)) memories.push(mm);
        };
        for (; ; ) {
          const { value, done } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const blocks = buffer.split(/\r?\n\r?\n/);
          buffer = blocks.pop() ?? "";
          for (const block of blocks) {
            const r = this.parseSseAssistantText(block + "\n\n");
            mergeMetrics(r.metrics);
            mergeSources(r.sources);
            mergeMemories(r.memories);
            thinking += r.thinking;
            if (r.full) {
              full += r.full;
              for (const c of r.chunks) onChunk(c, full);
            }
          }
        }
        if (buffer.trim()) {
          const r = this.parseSseAssistantText(buffer + "\n\n");
          mergeMetrics(r.metrics);
          mergeSources(r.sources);
          mergeMemories(r.memories);
          thinking += r.thinking;
          if (r.full) {
            full += r.full;
            for (const c of r.chunks) onChunk(c, full);
          }
        }
        return { text: full, metrics, sources, thinking, memories };
      }
      async stopStream(sessionId) {
        await this.request({
          url: this.url(`/api/chat/stop/${encodeURIComponent(sessionId)}`),
          method: "POST",
          headers: this.headers()
        });
      }
      // POST /api/session/{sid}/compact — asks Odysseus to summarize older
      // turns of this session via the LLM so the prompt stays small. Server
      // returns the new context state; the client just needs to refresh metrics
      // and history afterwards.
      // ---------- Personas (Odysseus templates / persona definitions) ----------
      // Merges BUILT-IN personas (GET /api/presets) with USER templates
      // (GET /api/presets/templates). Built-ins are returned as a dictionary
      // keyed by id; templates as a list. The custom slot is filtered out.
      async listPersonas() {
        const out = [];
        const seen = /* @__PURE__ */ new Set();
        const push = (id, name, sp, temp, mt, builtin = false) => {
          if (!name) return;
          const key = (builtin ? "b:" : "u:") + (id || name).toLowerCase();
          if (seen.has(key)) return;
          seen.add(key);
          out.push({
            id: id || name,
            name,
            system_prompt: sp,
            temperature: typeof temp === "number" ? temp : void 0,
            max_tokens: typeof mt === "number" ? mt : void 0
          });
        };
        for (const c of BUILTIN_CHARACTERS) {
          push(c.id, c.name, c.system_prompt, c.temperature, c.max_tokens, true);
        }
        try {
          const res = await this.request({ url: this.url("/api/presets/templates"), method: "GET", headers: this.headers() });
          if (res.status < 400) {
            const data = res.json;
            const list = Array.isArray(data) ? data : Array.isArray(data?.templates) ? data.templates : Array.isArray(data?.items) ? data.items : [];
            for (const row of list) {
              if (!row || typeof row !== "object") continue;
              const r = row;
              push(String(r.id ?? r.template_id ?? ""), String(r.name ?? ""), String(r.system_prompt ?? r.prompt ?? ""), r.temperature, r.max_tokens, false);
            }
          }
        } catch {
        }
        return out;
      }
      // Admin-only on the server. We return a structured result so the UI can
      // surface a clear "you need admin" message rather than a generic 403.
      async createPersona(p) {
        const res = await this.request({
          url: this.url("/api/presets/templates"),
          method: "POST",
          headers: this.headers({ "Content-Type": "application/json" }),
          body: JSON.stringify(p)
        });
        if (res.status === 401 || res.status === 403) return { ok: false, adminRequired: true };
        if (res.status >= 400) {
          const detail = res.json?.detail ?? res.text?.slice(0, 200) ?? "";
          return { ok: false, error: `${res.status}: ${detail}` };
        }
        const data = res.json ?? {};
        const tpl = data.template ?? data;
        return {
          ok: true,
          persona: {
            id: String(tpl.id ?? ""),
            name: String(tpl.name ?? p.name),
            system_prompt: String(tpl.system_prompt ?? p.system_prompt),
            temperature: typeof tpl.temperature === "number" ? tpl.temperature : p.temperature,
            max_tokens: typeof tpl.max_tokens === "number" ? tpl.max_tokens : p.max_tokens
          }
        };
      }
      async deletePersona(id) {
        const res = await this.request({
          url: this.url(`/api/presets/templates/${encodeURIComponent(id)}`),
          method: "DELETE",
          headers: this.headers()
        });
        if (res.status === 401 || res.status === 403) return { ok: false, adminRequired: true };
        return { ok: res.status < 400 };
      }
      // Sets the user's server-side "custom preset" slot. Odysseus's web UI does
      // this every time the user picks a template — the chat then sends
      // preset_id='custom' and the server reads the slot to apply the system
      // prompt as a real role:system message. Admin-only on multi-user installs.
      async setCustomPreset(p) {
        const res = await this.request({
          url: this.url("/api/presets/custom"),
          method: "POST",
          headers: this.headers({ "Content-Type": "application/json" }),
          body: JSON.stringify({
            name: p.name,
            system_prompt: p.system_prompt,
            temperature: p.temperature ?? 0.7,
            max_tokens: p.max_tokens ?? 0,
            enabled: p.enabled ?? true,
            inject_prefix: p.inject_prefix ?? "",
            inject_suffix: p.inject_suffix ?? ""
          })
        });
        if (res.status === 401 || res.status === 403) return { ok: false, adminRequired: true };
        if (res.status >= 400) {
          const detail = res.json?.detail ?? res.text?.slice(0, 200) ?? "";
          return { ok: false, error: `${res.status}: ${detail}` };
        }
        return { ok: true };
      }
      // POST /api/presets/expand — body { prompt, name? } → { success, prompt }
      async expandPersona(rough, name) {
        const res = await this.request({
          url: this.url("/api/presets/expand"),
          method: "POST",
          headers: this.headers({ "Content-Type": "application/json" }),
          body: JSON.stringify({ prompt: rough, name: name ?? "" })
        });
        if (res.status >= 400) return null;
        const data = res.json ?? {};
        const expanded = data.prompt ?? data.system_prompt ?? data.result;
        return typeof expanded === "string" ? expanded : null;
      }
      // ---------- Workspaces (session folders) ----------
      async setSessionFolder(sessionId, folder) {
        const res = await this.request({
          url: this.url(`/api/session/${encodeURIComponent(sessionId)}`),
          method: "PATCH",
          headers: this.headers({ "Content-Type": "application/x-www-form-urlencoded" }),
          body: this.encodeForm({ folder })
        });
        if (res.status >= 400) {
          const detail = res.json?.detail ?? res.text?.slice(0, 200) ?? "";
          throw new Error(`PATCH session folder ${res.status}: ${detail}`);
        }
      }
      // GET /api/workspace/browse — lists subdirectories on the Odysseus host.
      // Admin-only on multi-user instances; non-admins get null and the picker
      // can fall back to manual path entry.
      async browseServerFolder(path) {
        const url = path ? `/api/workspace/browse?path=${encodeURIComponent(path)}` : "/api/workspace/browse";
        const res = await this.request({
          url: this.url(url),
          method: "GET",
          headers: this.headers()
        });
        if (res.status >= 400) return null;
        const data = res.json;
        if (!data) return null;
        return {
          path: String(data.path ?? ""),
          parent: data.parent == null ? null : String(data.parent),
          dirs: Array.isArray(data.dirs) ? data.dirs.map((d) => ({
            name: String(d.name ?? ""),
            path: String(d.path ?? "")
          })) : []
        };
      }
      // ---------- Personal RAG (server-indexed user folders) ----------
      // GET /api/personal → { files: [{name, size, path}], directories: [...] }
      async personalList() {
        const res = await this.request({
          url: this.url("/api/personal"),
          method: "GET",
          headers: this.headers()
        });
        if (res.status >= 400) return [];
        const data = res.json ?? {};
        const out = [];
        const dirs = Array.isArray(data.directories) ? data.directories : [];
        for (const d of dirs) {
          out.push({ path: typeof d === "string" ? d : String(d?.path ?? d?.name ?? ""), type: "directory" });
        }
        const files = Array.isArray(data.files) ? data.files : [];
        for (const f of files) {
          if (!f || typeof f !== "object") continue;
          const r = f;
          out.push({ path: String(r.path ?? r.name ?? ""), type: "file" });
        }
        return out.filter((x) => x.path);
      }
      // POST /api/personal/add_directory — JSON { directory }
      async personalAddDirectory(directory) {
        const res = await this.request({
          url: this.url("/api/personal/add_directory"),
          method: "POST",
          headers: this.headers({ "Content-Type": "application/json" }),
          body: JSON.stringify({ directory })
        });
        if (res.status >= 400) {
          const detail = res.json?.detail ?? res.text?.slice(0, 200) ?? "";
          return { ok: false, error: `${res.status}: ${detail}` };
        }
        return { ok: true };
      }
      // DELETE /api/personal/remove_directory?directory=…
      async personalRemoveDirectory(directory) {
        const res = await this.request({
          url: this.url(`/api/personal/remove_directory?directory=${encodeURIComponent(directory)}`),
          method: "DELETE",
          headers: this.headers()
        });
        if (res.status >= 400) {
          const detail = res.json?.detail ?? res.text?.slice(0, 200) ?? "";
          return { ok: false, error: `${res.status}: ${detail}` };
        }
        return { ok: true };
      }
      // POST /api/personal/upload — multipart, file field name "files"
      async personalUpload(filename, data, contentType) {
        const { body, contentType: ct } = this.encodeMultipart({}, [{ name: filename, data, contentType }], "files");
        const res = await this.request({
          url: this.url("/api/personal/upload"),
          method: "POST",
          headers: this.headers({ "Content-Type": ct }),
          body
        });
        if (res.status >= 400) {
          const detail = res.json?.detail ?? res.text?.slice(0, 200) ?? "";
          return { ok: false, error: `${res.status}: ${detail}` };
        }
        return { ok: true };
      }
      async personalReload() {
        await this.request({
          url: this.url("/api/personal/reload"),
          method: "POST",
          headers: this.headers()
        });
      }
      // ---------- Documents (Odysseus's document library) ----------
      async importPdf(filename, data) {
        const { body, contentType } = this.encodeMultipart({}, [{ name: filename, data, contentType: "application/pdf" }], "file");
        const res = await this.request({
          url: this.url("/api/documents/import-pdf"),
          method: "POST",
          headers: this.headers({ "Content-Type": contentType }),
          body
        });
        if (res.status >= 400) {
          const detail = res.json?.detail ?? res.text?.slice(0, 200) ?? "";
          return { ok: false, error: `${res.status}: ${detail}` };
        }
        const data2 = res.json ?? {};
        return { ok: true, docId: typeof data2.id === "string" ? data2.id : typeof data2.doc_id === "string" ? data2.doc_id : void 0 };
      }
      // ---------- Direct-action endpoints (bypass the agent loop) ----------
      // POST /api/notes — create a note or checklist. note_type "task" makes it
      // a to-do; items[] holds checklist entries.
      async createNote(opts) {
        const body = {
          title: opts.title ?? "",
          content: opts.content ?? "",
          note_type: opts.noteType ?? "note",
          source: "obsidian"
        };
        if (opts.items) body.items = opts.items.map((t) => ({ text: t, checked: false }));
        if (opts.dueDate) body.due_date = opts.dueDate;
        const res = await this.request({
          url: this.url("/api/notes"),
          method: "POST",
          headers: this.headers({ "Content-Type": "application/json" }),
          body: JSON.stringify(body)
        });
        if (res.status >= 400) {
          const detail = res.json?.detail ?? res.text?.slice(0, 200) ?? "";
          return { ok: false, error: `${res.status}: ${detail}` };
        }
        return { ok: true };
      }
      // POST /api/calendar/events — JSON { summary, dtstart, all_day, dtend?, description? }
      async createEvent(opts) {
        const body = {
          summary: opts.title,
          dtstart: opts.start,
          all_day: !!opts.allDay
        };
        if (opts.end) body.dtend = opts.end;
        if (opts.description) body.description = opts.description;
        const res = await this.request({
          url: this.url("/api/calendar/events"),
          method: "POST",
          headers: this.headers({ "Content-Type": "application/json" }),
          body: JSON.stringify(body)
        });
        if (res.status >= 400) {
          const detail = res.json?.detail ?? res.text?.slice(0, 200) ?? "";
          return { ok: false, error: `${res.status}: ${detail}` };
        }
        return { ok: true };
      }
      // POST /api/shell/exec — admin-only. Returns stdout/stderr/exit_code.
      async runShell(command, timeout) {
        const res = await this.request({
          url: this.url("/api/shell/exec"),
          method: "POST",
          headers: this.headers({ "Content-Type": "application/json" }),
          body: JSON.stringify({ command, ...timeout ? { timeout } : {} })
        });
        if (res.status === 401 || res.status === 403) return { ok: false, adminRequired: true };
        if (res.status >= 400) {
          const detail = res.json?.detail ?? res.text?.slice(0, 200) ?? "";
          return { ok: false, error: `${res.status}: ${detail}` };
        }
        const data = res.json ?? {};
        return {
          ok: true,
          stdout: typeof data.stdout === "string" ? data.stdout : "",
          stderr: typeof data.stderr === "string" ? data.stderr : "",
          exitCode: typeof data.exit_code === "number" ? data.exit_code : void 0
        };
      }
      // ---------- Agent tools (global disabled_tools setting) ----------
      // GET /api/tools → every agent tool with its enabled/disabled state.
      async listAgentTools() {
        const res = await this.request({
          url: this.url("/api/tools"),
          method: "GET",
          headers: this.headers()
        });
        if (res.status >= 400) return [];
        const data = res.json;
        const list = Array.isArray(data) ? data : Array.isArray(data?.tools) ? data.tools : [];
        const out = [];
        for (const t of list) {
          if (!t || typeof t !== "object") continue;
          const r = t;
          const id = String(r.id ?? r.tag ?? r.name ?? "");
          if (!id) continue;
          let enabled = true;
          if (typeof r.enabled === "boolean") enabled = r.enabled;
          else if (typeof r.disabled === "boolean") enabled = !r.disabled;
          out.push({ id, name: typeof r.name === "string" ? r.name : void 0, enabled });
        }
        return out;
      }
      // POST /api/tools { disabled: [...] } — admin-only on multi-user installs.
      async setDisabledTools(disabledIds) {
        const res = await this.request({
          url: this.url("/api/tools"),
          method: "POST",
          headers: this.headers({ "Content-Type": "application/json" }),
          body: JSON.stringify({ disabled: disabledIds })
        });
        if (res.status === 401 || res.status === 403) return { ok: false, adminRequired: true };
        if (res.status >= 400) {
          const detail = res.json?.detail ?? res.text?.slice(0, 200) ?? "";
          return { ok: false, error: `${res.status}: ${detail}` };
        }
        return { ok: true };
      }
      // ---------- Skills audit ----------
      async startSkillsAudit() {
        const res = await this.request({
          url: this.url("/api/skills/audit-all"),
          method: "POST",
          headers: this.headers({ "Content-Type": "application/json" }),
          body: JSON.stringify({ scope: "all", skip_audited: true })
        });
        if (res.status >= 400) {
          const detail = res.json?.detail ?? res.text?.slice(0, 200) ?? "";
          return { ok: false, error: `${res.status}: ${detail}` };
        }
        return { ok: true };
      }
      async getSkillsAuditStatus() {
        const res = await this.request({
          url: this.url("/api/skills/audit-all/status"),
          method: "GET",
          headers: this.headers()
        });
        if (res.status >= 400) return null;
        return res.json ?? {};
      }
      async cancelSkillsAudit() {
        await this.request({
          url: this.url("/api/skills/audit-all/cancel"),
          method: "POST",
          headers: this.headers()
        });
      }
      async autoSortSessions() {
        const res = await this.request({
          url: this.url("/api/sessions/auto-sort"),
          method: "POST",
          headers: this.headers()
        });
        if (res.status >= 400) {
          const detail = res.json?.detail ?? res.text?.slice(0, 200) ?? "";
          throw new Error(`auto-sort ${res.status}: ${detail}`);
        }
      }
      async compactSession(sessionId) {
        const res = await this.request({
          url: this.url(`/api/session/${encodeURIComponent(sessionId)}/compact`),
          method: "POST",
          headers: this.headers()
        });
        if (res.status >= 400) {
          const detail = res.json?.detail ?? res.text?.slice(0, 200) ?? "";
          throw new Error(`POST /api/session/${sessionId}/compact ${res.status}: ${detail}`);
        }
      }
      // POST /api/session/{sid}/fork — copy the first keepCount messages into a
      // new session and return its id.
      async forkSession(sessionId, keepCount) {
        const res = await this.request({
          url: this.url(`/api/session/${encodeURIComponent(sessionId)}/fork`),
          method: "POST",
          headers: this.headers({ "Content-Type": "application/json" }),
          body: JSON.stringify({ keep_count: keepCount })
        });
        if (res.status >= 400) {
          const detail = res.json?.detail ?? res.text?.slice(0, 200) ?? "";
          throw new Error(`fork ${res.status}: ${detail}`);
        }
        const data = res.json ?? {};
        return String(data.id ?? data.session_id ?? data.sid ?? "") || null;
      }
      // POST /api/session/{sid}/delete-messages — delete by 0-based indices.
      async deleteMessages(sessionId, indices) {
        const res = await this.request({
          url: this.url(`/api/session/${encodeURIComponent(sessionId)}/delete-messages`),
          method: "POST",
          headers: this.headers({ "Content-Type": "application/json" }),
          body: JSON.stringify({ indices })
        });
        if (res.status >= 400) {
          const detail = res.json?.detail ?? res.text?.slice(0, 200) ?? "";
          throw new Error(`delete-messages ${res.status}: ${detail}`);
        }
      }
      // POST /api/session/{sid}/truncate — keep only the first keepCount messages.
      async truncateSession(sessionId, keepCount) {
        const res = await this.request({
          url: this.url(`/api/session/${encodeURIComponent(sessionId)}/truncate`),
          method: "POST",
          headers: this.headers({ "Content-Type": "application/json" }),
          body: JSON.stringify({ keep_count: keepCount })
        });
        if (res.status >= 400) {
          const detail = res.json?.detail ?? res.text?.slice(0, 200) ?? "";
          throw new Error(`truncate ${res.status}: ${detail}`);
        }
      }
      async deleteSession(sessionId) {
        await this.request({
          url: this.url(`/api/session/${encodeURIComponent(sessionId)}`),
          method: "DELETE",
          headers: this.headers()
        });
      }
      // One-shot helpers: create a session, run the task, delete the session on
      // completion. Used by command-palette / context-menu actions so the user's
      // Odysseus session list doesn't fill up with throwaway "Obsidian rewrite"
      // entries. Skips deletion if the setting is off.
      async chatOneshot(message, opts = {}) {
        const merged = { mode: "chat", useWebSearch: false, ...opts };
        const { text, sessionId } = await this.chat(message, merged);
        if (this.getSettings().autoDeleteOneshotSessions) {
          this.deleteSession(sessionId).catch(() => void 0);
        }
        return text;
      }
      // Route every "transform this text" oneshot through the chat endpoint instead
      // of the dedicated /api/rewrite. The chat path is proven (it's what the panel
      // uses), handles session ownership / model resolution / SSE parsing the same
      // way as everything else, and means we have one error surface instead of two.
      async rewriteOneshot(originalText, instruction) {
        const prompt = `${instruction}

Output only the rewritten text. No preamble, no commentary, no quotes around the result.

---

${originalText}`;
        return await this.chatOneshot(prompt);
      }
      // POST /api/rewrite returns SSE.
      async rewrite(sessionId, originalText, instruction) {
        const res = await this.request({
          url: this.url("/api/rewrite"),
          method: "POST",
          headers: this.headers({
            "Content-Type": "application/json",
            Accept: "text/event-stream"
          }),
          body: JSON.stringify({ session_id: sessionId, original_text: originalText, instruction })
        });
        if (res.status >= 400) throw new Error(`POST /api/rewrite ${res.status}: ${res.text?.slice(0, 200)}`);
        return this.parseSseAssistantText(res.text ?? "").full;
      }
      // GET /api/search?q=&limit=  — searches across chat history.
      async searchHistory(query, limit = 20) {
        const res = await this.request({
          url: this.url(`/api/search?q=${encodeURIComponent(query)}&limit=${limit}`),
          method: "GET",
          headers: this.headers()
        });
        if (res.status >= 400) return [];
        return Array.isArray(res.json) ? res.json : [];
      }
      async memorySearch(query) {
        const res = await this.request({
          url: this.url("/api/memory/search"),
          method: "POST",
          headers: this.headers({ "Content-Type": "application/x-www-form-urlencoded" }),
          body: this.encodeForm({ query })
        });
        if (res.status >= 400) return [];
        return Array.isArray(res.json) ? res.json : res.json?.results ?? [];
      }
      async memoryList() {
        const res = await this.request({
          url: this.url("/api/memory"),
          method: "GET",
          headers: this.headers()
        });
        if (res.status >= 400) return [];
        const data = res.json;
        const list = Array.isArray(data) ? data : Array.isArray(data?.memory) ? data.memory : Array.isArray(data?.memories) ? data.memories : [];
        const out = [];
        for (const m of list) {
          if (!m || typeof m !== "object") continue;
          const r = m;
          const id = String(r.id ?? "");
          const text = String(r.text ?? r.content ?? "");
          if (!id || !text) continue;
          out.push({
            id,
            text,
            category: typeof r.category === "string" ? r.category : void 0,
            pinned: typeof r.pinned === "boolean" ? r.pinned : void 0,
            timestamp: typeof r.timestamp === "number" ? r.timestamp : void 0
          });
        }
        return out;
      }
      async memoryDelete(id) {
        const res = await this.request({
          url: this.url(`/api/memory/${encodeURIComponent(id)}`),
          method: "DELETE",
          headers: this.headers()
        });
        return res.status < 400;
      }
      async memoryPin(id) {
        const res = await this.request({
          url: this.url(`/api/memory/${encodeURIComponent(id)}/pin`),
          method: "POST",
          headers: this.headers()
        });
        return res.status < 400;
      }
      async memoryUpdate(id, text) {
        const res = await this.request({
          url: this.url(`/api/memory/${encodeURIComponent(id)}`),
          method: "PUT",
          headers: this.headers({ "Content-Type": "application/json" }),
          body: JSON.stringify({ text })
        });
        return res.status < 400;
      }
      async memoryAdd(text, category = "obsidian", sessionId) {
        const res = await this.request({
          url: this.url("/api/memory/add"),
          method: "POST",
          headers: this.headers({ "Content-Type": "application/x-www-form-urlencoded" }),
          body: this.encodeForm({ text, category, source: "obsidian", session_id: sessionId })
        });
        if (res.status >= 400) throw new Error(`POST /api/memory/add ${res.status}`);
      }
      // GET /api/skills/index → { index: [{name, description, category}], count }
      async listSkills() {
        const res = await this.request({
          url: this.url("/api/skills/index"),
          method: "GET",
          headers: this.headers()
        });
        if (res.status >= 400) return [];
        const data = res.json;
        const list = Array.isArray(data) ? data : Array.isArray(data?.index) ? data.index : Array.isArray(data?.skills) ? data.skills : [];
        const out = [];
        for (const s of list) {
          if (!s || typeof s !== "object") continue;
          const r = s;
          const name = String(r.name ?? "");
          if (!name) continue;
          out.push({
            id: typeof r.id === "string" ? r.id : void 0,
            name,
            description: typeof r.description === "string" ? r.description : void 0,
            category: typeof r.category === "string" ? r.category : void 0
          });
        }
        return out;
      }
      async researchStart(query) {
        const res = await this.request({
          url: this.url("/api/research/start"),
          method: "POST",
          headers: this.headers({ "Content-Type": "application/json" }),
          body: JSON.stringify({ query })
        });
        if (res.status >= 400) throw new Error(`POST /api/research/start ${res.status}: ${res.text?.slice(0, 200)}`);
        const data = res.json ?? {};
        return String(data.session_id ?? data.id ?? "");
      }
      // POST /api/research/result-peek/{sid} → { result, sources, raw_findings }
      async researchResult(sessionId, peek = true) {
        const path = peek ? `/api/research/result-peek/${sessionId}` : `/api/research/result/${sessionId}`;
        const res = await this.request({
          url: this.url(path),
          method: "POST",
          headers: this.headers()
        });
        if (res.status >= 400) return null;
        const data = res.json ?? {};
        return {
          result: typeof data.result === "string" ? data.result : void 0,
          sources: Array.isArray(data.sources) ? data.sources : void 0,
          raw: data.raw_findings
        };
      }
      // ---------- MCP server registration (Odysseus as MCP client) ----------
      async listMcpServers() {
        const res = await this.request({ url: this.url("/api/mcp/servers"), method: "GET", headers: this.headers() });
        if (res.status >= 400) return [];
        const data = res.json;
        const list = Array.isArray(data) ? data : Array.isArray(data?.servers) ? data.servers : [];
        const out = [];
        for (const s of list) {
          if (!s || typeof s !== "object") continue;
          const r = s;
          out.push({
            id: String(r.id ?? r.server_id ?? ""),
            name: String(r.name ?? ""),
            url: typeof r.url === "string" ? r.url : void 0,
            enabled: typeof r.enabled === "boolean" ? r.enabled : void 0,
            status: typeof r.status === "string" ? r.status : void 0
          });
        }
        return out;
      }
      // POST /api/mcp/servers — multipart/form per the route's Form(...) params.
      async addMcpServer(opts) {
        const res = await this.request({
          url: this.url("/api/mcp/servers"),
          method: "POST",
          headers: this.headers({ "Content-Type": "application/x-www-form-urlencoded" }),
          body: this.encodeForm({ name: opts.name, transport: "http", url: opts.url, args: "[]", env: "{}" })
        });
        if (res.status === 401 || res.status === 403) return { ok: false, adminRequired: true };
        if (res.status >= 400) {
          const detail = res.json?.detail ?? res.text?.slice(0, 200) ?? "";
          return { ok: false, error: `${res.status}: ${detail}` };
        }
        const data = res.json ?? {};
        return { ok: true, id: typeof data.id === "string" ? data.id : typeof data.server_id === "string" ? data.server_id : void 0 };
      }
      async deleteMcpServer(id) {
        const res = await this.request({ url: this.url(`/api/mcp/servers/${encodeURIComponent(id)}`), method: "DELETE", headers: this.headers() });
        return res.status < 400;
      }
      async ping() {
        try {
          const res = await this.request({
            url: this.url("/ping"),
            method: "GET",
            headers: this.headers()
          });
          return res.status < 500;
        } catch {
          return false;
        }
      }
    };
    TAG_NAMES = "think|thinking|thought|thoughts|reasoning|analysis|reflection|reflections|scratchpad|plan|inner[_-]?monologue";
    TAG_OPEN_RE = new RegExp(`<\\s*(${TAG_NAMES})\\b[^>]*>`, "i");
    TAG_PAIR_RE = new RegExp(`<\\s*(${TAG_NAMES})\\b[^>]*>[\\s\\S]*?<\\s*\\/\\s*\\1\\s*>`, "gi");
    PIPE_PAIR_RE = new RegExp(`<\\|\\s*(${TAG_NAMES})\\s*\\|>[\\s\\S]*?<\\|\\s*\\/\\s*\\1\\s*\\|>`, "gi");
    PIPE_OPEN_RE = new RegExp(`<\\|\\s*(${TAG_NAMES})\\s*\\|>`, "i");
    MD_HEADER_RE = /(^|\n)\s*#{2,6}\s+(thinking|reasoning|thought process|internal monologue|analysis|plan|scratchpad)[^\n]*\n[\s\S]*?(?=(?:\n#{1,6}\s+\S)|$)/gi;
  }
});

// voice.ts
var VoiceRecorder, TtsManager;
var init_voice = __esm({
  "voice.ts"() {
    init_odysseus_api();
    VoiceRecorder = class {
      constructor(client) {
        this.client = client;
        this.mediaRecorder = null;
        this.stream = null;
        this.chunks = [];
        this.recording = false;
        // Voice-activity detection (for hands-free auto-send).
        this.audioCtx = null;
        this.vadRaf = null;
      }
      get isRecording() {
        return this.recording;
      }
      // Begin capturing. Resolves once recording has actually started; rejects if
      // mic access is denied or unavailable. If opts.onSilence is given, watch the
      // mic and fire it once speech is followed by ~pauseMs of quiet (hands-free).
      async start(opts) {
        if (this.recording) return;
        if (!navigator.mediaDevices?.getUserMedia) {
          throw new Error("Microphone is not available in this environment.");
        }
        this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mime = MediaRecorder.isTypeSupported("audio/webm") ? "audio/webm" : "";
        this.chunks = [];
        this.mediaRecorder = new MediaRecorder(this.stream, mime ? { mimeType: mime } : void 0);
        this.mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) this.chunks.push(e.data);
        };
        this.mediaRecorder.start();
        this.recording = true;
        if (opts?.onSilence) this.watchSilence(this.stream, opts.pauseMs ?? 1500, opts.onSilence);
      }
      // Monitor mic level; once the user has spoken and then gone quiet for
      // `pauseMs`, fire `onSilence` once. Degrades gracefully if Web Audio is
      // unavailable (caller can still stop manually).
      watchSilence(stream, pauseMs, onSilence) {
        try {
          const Ctx = window.AudioContext || window.webkitAudioContext;
          this.audioCtx = new Ctx();
          const srcNode = this.audioCtx.createMediaStreamSource(stream);
          const analyser = this.audioCtx.createAnalyser();
          analyser.fftSize = 512;
          srcNode.connect(analyser);
          const data = new Uint8Array(analyser.frequencyBinCount);
          const THRESHOLD = 0.014;
          let lastLoud = Date.now();
          let heardSpeech = false;
          let fired = false;
          const tick = () => {
            if (!this.recording || fired) return;
            analyser.getByteTimeDomainData(data);
            let sum = 0;
            for (let i = 0; i < data.length; i++) {
              const v = (data[i] - 128) / 128;
              sum += v * v;
            }
            const rms = Math.sqrt(sum / data.length);
            const now = Date.now();
            if (rms > THRESHOLD) {
              lastLoud = now;
              heardSpeech = true;
            }
            if (heardSpeech && now - lastLoud >= pauseMs) {
              fired = true;
              onSilence();
              return;
            }
            this.vadRaf = requestAnimationFrame(tick);
          };
          this.vadRaf = requestAnimationFrame(tick);
        } catch {
        }
      }
      // Stop recording and send the clip for transcription. Returns the transcript
      // ("" if nothing was heard). Throws if the server rejects the request.
      async stopAndTranscribe() {
        const mr = this.mediaRecorder;
        if (!mr || mr.state === "inactive") {
          this.cleanup();
          return "";
        }
        const mime = mr.mimeType || "audio/webm";
        const blob = await new Promise((resolve) => {
          mr.onstop = () => resolve(new Blob(this.chunks, { type: mime }));
          mr.stop();
        });
        this.cleanup();
        const buf = await blob.arrayBuffer();
        if (buf.byteLength === 0) return "";
        return await this.client.transcribeAudio(buf, blob.type || "audio/webm");
      }
      // Abort without transcribing (e.g. the panel is closing).
      cancel() {
        try {
          if (this.mediaRecorder && this.mediaRecorder.state !== "inactive") this.mediaRecorder.stop();
        } catch {
        }
        this.cleanup();
      }
      cleanup() {
        if (this.vadRaf != null) {
          cancelAnimationFrame(this.vadRaf);
          this.vadRaf = null;
        }
        if (this.audioCtx) {
          void this.audioCtx.close().catch(() => void 0);
          this.audioCtx = null;
        }
        this.stream?.getTracks().forEach((t) => t.stop());
        this.stream = null;
        this.mediaRecorder = null;
        this.chunks = [];
        this.recording = false;
      }
    };
    TtsManager = class _TtsManager {
      constructor(client) {
        this.client = client;
        this.current = null;
        this.playing = false;
        this.processing = false;
        this.queue = [];
        this.cache = /* @__PURE__ */ new Map();
        // plain-text hash → object URL
        this.speed = 1;
        // Streaming (sentence-by-sentence auto-play) state.
        this.streamActive = false;
        this.streamSent = 0;
        // chars of plain text already enqueued
        this.streamDebounce = null;
      }
      setSpeed(speed) {
        this.speed = speed > 0 ? speed : 1;
      }
      get isBusy() {
        return this.playing || this.processing;
      }
      // Strip markdown / code / reasoning so we read prose, not syntax.
      static extractPlainText(content) {
        let s = stripReasoning(content);
        s = s.replace(/<think(?:ing)?\b[^>]*>[\s\S]*?<\/think(?:ing)?\s*>/gi, "");
        s = s.replace(/<\|channel\|>analysis<\|message\|>[\s\S]*$/i, "");
        s = s.replace(/<think(?:ing)?\b[^>]*>[\s\S]*$/i, "");
        s = s.replace(/```[\s\S]*?```/g, " ");
        s = s.replace(/`([^`]+)`/g, "$1");
        s = s.replace(/!\[[^\]]*\]\([^)]*\)/g, "");
        s = s.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1");
        s = s.replace(/^#{1,6}\s+/gm, "");
        s = s.replace(/\*\*([^*]+)\*\*/g, "$1").replace(/\*([^*]+)\*/g, "$1");
        s = s.replace(/^>\s?/gm, "").replace(/^\s*[-*+]\s+/gm, "");
        s = s.replace(/\n{3,}/g, "\n\n");
        return s.trim();
      }
      key(text) {
        let h = 0;
        for (let i = 0; i < text.length; i++) h = (h << 5) - h + text.charCodeAt(i) | 0;
        return h.toString(36);
      }
      async synthesize(text) {
        const plain = _TtsManager.extractPlainText(text);
        if (!plain) return null;
        const k = this.key(plain);
        const hit = this.cache.get(k);
        if (hit) return hit;
        const buf = await this.client.synthesizeSpeech(plain);
        if (!buf || buf.byteLength === 0) return null;
        const url = URL.createObjectURL(new Blob([buf], { type: "audio/mpeg" }));
        this.cache.set(k, url);
        return url;
      }
      // Per-message button: start if idle, stop if already speaking.
      toggle(text, onState) {
        if (this.isBusy) {
          this.stop();
          onState?.("idle");
          return;
        }
        this.enqueue(text, onState);
      }
      enqueue(text, onState) {
        this.queue.push({ text, onState });
        if (!this.processing) void this.processQueue();
      }
      async processQueue() {
        if (this.processing) return;
        this.processing = true;
        while (this.queue.length > 0) {
          const item = this.queue[0];
          try {
            await this.playItem(item);
          } catch (e) {
            console.error("[Odysseus] TTS playback error:", e);
          }
          if (this.queue[0] === item) this.queue.shift();
          if (!this.processing) break;
        }
        this.processing = false;
      }
      async playItem(item) {
        item.onState?.("loading");
        const url = await this.synthesize(item.text);
        if (!this.processing || !url) {
          item.onState?.("idle");
          return;
        }
        item.onState?.("playing");
        await new Promise((resolve, reject) => {
          const audio = new Audio(url);
          if (this.speed !== 1) audio.playbackRate = this.speed;
          this.current = audio;
          audio.onended = () => {
            this.playing = false;
            if (this.current === audio) this.current = null;
            resolve();
          };
          audio.onerror = () => {
            this.playing = false;
            if (this.current === audio) this.current = null;
            reject(new Error("audio playback failed"));
          };
          audio.onpause = () => {
            if (this.current !== audio) resolve();
          };
          audio.play().then(() => {
            this.playing = true;
          }).catch(reject);
        });
        item.onState?.("idle");
      }
      // Stop everything and reset all queued buttons.
      stop() {
        this.streamActive = false;
        if (this.streamDebounce) {
          clearTimeout(this.streamDebounce);
          this.streamDebounce = null;
        }
        this.streamSent = 0;
        for (const item of this.queue) item.onState?.("idle");
        this.queue = [];
        this.processing = false;
        if (this.current) {
          this.current.pause();
          this.current = null;
        }
        this.playing = false;
      }
      // ── Streaming auto-play: speak complete sentences as they arrive ──
      streamingStart() {
        this.streamActive = true;
        this.streamSent = 0;
      }
      streamingUpdate(fullText) {
        if (!this.streamActive) return;
        if (this.streamDebounce) return;
        this.streamDebounce = window.setTimeout(() => {
          this.streamDebounce = null;
          this.flushSentences(fullText, false);
        }, 150);
      }
      streamingEnd(fullText) {
        if (!this.streamActive) return;
        this.streamActive = false;
        if (this.streamDebounce) {
          clearTimeout(this.streamDebounce);
          this.streamDebounce = null;
        }
        this.flushSentences(fullText, true);
        this.streamSent = 0;
      }
      flushSentences(fullText, isEnd) {
        const stripped = fullText.replace(/```[\s\S]*?```/g, "").replace(/```[\s\S]*$/g, "");
        const plain = _TtsManager.extractPlainText(stripped);
        if (!plain || plain.length <= this.streamSent) return;
        const region = plain.substring(this.streamSent);
        if (isEnd) {
          const remaining = region.trim();
          if (remaining.length >= 15) this.enqueue(remaining);
          this.streamSent += region.length;
          return;
        }
        let current = "";
        let advanced = 0;
        for (let i = 0; i < region.length; i++) {
          current += region[i];
          const ch = region[i];
          const next = region[i + 1];
          if ((ch === "." || ch === "!" || ch === "?") && next && /\s/.test(next)) {
            const lastWord = current.trim().split(/\s/).pop() || "";
            if (/^\d+\.$/.test(lastWord)) continue;
            if (/^[A-Z][a-z]?\.$/.test(lastWord)) continue;
            const sentence = current.trim();
            if (sentence.length >= 15) this.enqueue(sentence);
            advanced += current.length;
            current = "";
          }
        }
        this.streamSent += advanced;
      }
      // Release cached blob URLs (call on panel close).
      dispose() {
        this.stop();
        for (const url of this.cache.values()) URL.revokeObjectURL(url);
        this.cache.clear();
      }
    };
  }
});

// chat-modal.ts
var chat_modal_exports = {};
__export(chat_modal_exports, {
  QuickPromptModal: () => QuickPromptModal
});
var import_obsidian2, QuickPromptModal, ChatResultModal;
var init_chat_modal = __esm({
  "chat-modal.ts"() {
    import_obsidian2 = require("obsidian");
    init_odysseus_api();
    init_voice();
    QuickPromptModal = class extends import_obsidian2.Modal {
      constructor(plugin, opts = {}) {
        super(plugin.app);
        this.plugin = plugin;
        this.opts = opts;
        this.value = "";
        this.webOn = false;
        this.value = opts.defaultValue ?? "";
      }
      onOpen() {
        const { contentEl } = this;
        contentEl.empty();
        contentEl.createEl("h3", { text: this.opts.title ?? "Ask Odysseus" });
        const ta = contentEl.createEl("textarea", {
          attr: { rows: "5", placeholder: (this.opts.placeholder ?? "Type your prompt\u2026") + " (Enter to send, Shift+Enter for newline)" }
        });
        ta.style.width = "100%";
        ta.value = this.value;
        ta.addEventListener("input", () => this.value = ta.value);
        ta.addEventListener("keydown", (ev) => {
          if (ev.key === "Enter" && !ev.shiftKey && !ev.isComposing) {
            ev.preventDefault();
            this.submit();
          }
        });
        const recorder = new VoiceRecorder(this.plugin.client);
        this.recorder = recorder;
        const autoSend = this.plugin.settings.sttAutoSend === true;
        const pauseMs = Number(this.plugin.settings.sttPauseMs) || 1500;
        const voiceRow = contentEl.createDiv({ attr: { style: "display:flex;align-items:center;gap:8px;margin:8px 0 2px;" } });
        const micBtn = voiceRow.createEl("button", { attr: { type: "button", title: "Dictate (Odysseus speech-to-text)" } });
        (0, import_obsidian2.setIcon)(micBtn, "mic");
        const micLabel = voiceRow.createSpan({ attr: { style: "font-size:12px;opacity:0.7;" } });
        const finishDictation = async (thenSubmit) => {
          (0, import_obsidian2.setIcon)(micBtn, "loader");
          micLabel.setText("transcribing\u2026");
          let text = "";
          try {
            text = await recorder.stopAndTranscribe();
          } catch (e) {
            (0, import_obsidian2.setIcon)(micBtn, "mic");
            micLabel.setText("");
            showError("dictation failed", e);
            return;
          }
          (0, import_obsidian2.setIcon)(micBtn, "mic");
          micLabel.setText("");
          if (text && text.trim()) {
            const sep = ta.value && !/\s$/.test(ta.value) ? " " : "";
            ta.value = ta.value + sep + text.trim();
            this.value = ta.value;
            ta.focus();
            if (thenSubmit) void this.submit();
          } else if (!thenSubmit) {
            new import_obsidian2.Notice("Odysseus: nothing transcribed");
          }
        };
        const startDictation = async () => {
          try {
            (0, import_obsidian2.setIcon)(micBtn, "square");
            micLabel.setText(autoSend ? "listening\u2026 (pause to send)" : "recording\u2026 click to insert");
            await recorder.start(autoSend ? { onSilence: () => void finishDictation(true), pauseMs } : void 0);
          } catch (e) {
            (0, import_obsidian2.setIcon)(micBtn, "mic");
            micLabel.setText("");
            showError("mic failed", e);
          }
        };
        micBtn.addEventListener("click", () => {
          if (recorder.isRecording) void finishDictation(autoSend);
          else void startDictation();
        });
        if (this.opts.allowWeb) {
          const webLabel = voiceRow.createEl("label", { attr: { style: "display:flex;align-items:center;gap:4px;font-size:12px;margin-left:auto;cursor:pointer;" } });
          const webChk = webLabel.createEl("input", { attr: { type: "checkbox" } });
          webChk.addEventListener("change", () => {
            this.webOn = webChk.checked;
          });
          webLabel.createSpan({ text: "\u{1F310} Web search" });
        }
        new import_obsidian2.Setting(contentEl).addButton((b) => b.setButtonText("Cancel").onClick(() => this.close())).addButton(
          (b) => b.setButtonText("Send").setCta().onClick(() => this.submit())
        );
        setTimeout(() => ta.focus(), 50);
        if (autoSend) void startDictation();
      }
      onClose() {
        this.recorder?.cancel();
        this.contentEl.empty();
      }
      async submit() {
        const value = this.value.trim();
        if (!value) return;
        this.close();
        const status = this.opts.onSubmit ? null : working("thinking");
        try {
          if (this.opts.onSubmit) {
            await this.opts.onSubmit(value, { web: this.webOn });
          } else {
            const { text } = await this.plugin.client.chat(value);
            new ChatResultModal(this.plugin, text || "(no response)").open();
          }
        } catch (e) {
          showError("request failed", e);
        } finally {
          status?.done();
        }
      }
    };
    ChatResultModal = class extends import_obsidian2.Modal {
      constructor(plugin, text) {
        super(plugin.app);
        this.plugin = plugin;
        this.text = text;
        this.tts = new TtsManager(plugin.client);
      }
      onOpen() {
        const { contentEl } = this;
        contentEl.empty();
        contentEl.createEl("h3", { text: "Odysseus response" });
        const pre = contentEl.createEl("pre");
        pre.style.whiteSpace = "pre-wrap";
        pre.setText(this.text);
        const row = contentEl.createDiv({ attr: { style: "display:flex;gap:8px;margin-top:10px;justify-content:flex-end;" } });
        const readBtn = row.createEl("button", { attr: { title: "Read aloud (Odysseus text-to-speech)" } });
        (0, import_obsidian2.setIcon)(readBtn, "volume-2");
        const toggleRead = () => this.tts.toggle(this.text, (s) => (0, import_obsidian2.setIcon)(readBtn, s === "playing" ? "square" : s === "loading" ? "loader" : "volume-2"));
        readBtn.addEventListener("click", toggleRead);
        row.createEl("button", { text: "Copy" }).addEventListener("click", async () => {
          await navigator.clipboard.writeText(this.text);
          new import_obsidian2.Notice("Odysseus: copied");
        });
        row.createEl("button", { text: "Close", cls: "mod-cta" }).addEventListener("click", () => this.close());
        if (this.plugin.settings.ttsAutoPlay) toggleRead();
      }
      onClose() {
        this.tts.dispose();
        this.contentEl.empty();
      }
    };
  }
});

// skills-modal.ts
var skills_modal_exports = {};
__export(skills_modal_exports, {
  SkillsPickerModal: () => SkillsPickerModal,
  VaultFilePickerModal: () => VaultFilePickerModal,
  VaultFolderPickerModal: () => VaultFolderPickerModal,
  buildContextBlock: () => buildContextBlock,
  parseMentions: () => parseMentions
});
function collectFolders(root) {
  const out = [];
  const visit = (f) => {
    if (f.path) out.push(f);
    for (const child of f.children) if (child instanceof import_obsidian3.TFolder) visit(child);
  };
  visit(root);
  return out;
}
function rankPath(path, query) {
  if (!query) return 0;
  const lower = path.toLowerCase();
  const idx = lower.indexOf(query);
  if (idx < 0) return -Infinity;
  return 1e3 - idx - lower.length / 100;
}
function parseMentions(plugin, message) {
  const files = [];
  const seen = /* @__PURE__ */ new Set();
  const replaced = message.replace(/@\[\[([^\]]+)\]\]/g, (_m, name) => {
    const f = plugin.app.metadataCache.getFirstLinkpathDest(name.trim(), "");
    if (f && !seen.has(f.path)) {
      seen.add(f.path);
      files.push(f);
    }
    return name.trim();
  }).replace(/@"([^"]+)"/g, (_m, p) => {
    const f = plugin.app.vault.getAbstractFileByPath(p.trim());
    if (f instanceof import_obsidian3.TFile && !seen.has(f.path)) {
      seen.add(f.path);
      files.push(f);
    }
    return p.trim();
  });
  return { stripped: replaced.trim(), files };
}
async function buildContextBlock(plugin, files, maxCharsPerFile) {
  if (files.length === 0) return "";
  const cap = maxCharsPerFile ?? plugin.settings.maxContextCharsPerFile ?? 0;
  const blocks = [];
  for (const f of files) {
    try {
      if (f.extension === "md" || f.extension === "txt") {
        let content = await plugin.app.vault.cachedRead(f);
        if (cap > 0 && content.length > cap) content = content.slice(0, cap) + "\n\u2026[truncated]";
        blocks.push(`### ${f.path}

${content}`);
      } else {
        blocks.push(`### ${f.path}

_(binary file \u2014 attach via the paperclip button instead)_`);
      }
    } catch (e) {
      new import_obsidian3.Notice(`Odysseus: could not read ${f.path}`);
    }
  }
  return blocks.join("\n\n---\n\n");
}
var import_obsidian3, SkillsPickerModal, VaultFilePickerModal, VaultFolderPickerModal;
var init_skills_modal = __esm({
  "skills-modal.ts"() {
    import_obsidian3 = require("obsidian");
    init_odysseus_api();
    SkillsPickerModal = class extends import_obsidian3.SuggestModal {
      constructor(plugin, onPick) {
        super(plugin.app);
        this.plugin = plugin;
        this.onPick = onPick;
        this.skills = [];
        this.loaded = false;
        this.setPlaceholder("Search skills\u2026");
      }
      async onOpen() {
        super.onOpen();
        try {
          this.skills = await this.plugin.client.listSkills();
          this.loaded = true;
          this.inputEl.dispatchEvent(new Event("input"));
        } catch (e) {
          showError("could not load skills", e);
          this.close();
        }
      }
      getSuggestions(query) {
        if (!this.loaded) return [];
        const q = query.toLowerCase().trim();
        if (!q) return this.skills.slice(0, 50);
        return this.skills.filter(
          (s) => [s.name, s.description, s.category].filter(Boolean).some((f) => f.toLowerCase().includes(q))
        ).slice(0, 50);
      }
      renderSuggestion(item, el) {
        el.createDiv({ text: item.name, attr: { style: "font-weight: 600;" } });
        if (item.description) el.createDiv({ text: item.description, attr: { style: "opacity: 0.7; font-size: 0.85em;" } });
        if (item.category) el.createDiv({ text: item.category, attr: { style: "opacity: 0.5; font-size: 0.75em;" } });
      }
      onChooseSuggestion(item) {
        this.onPick(item);
      }
    };
    VaultFilePickerModal = class extends import_obsidian3.SuggestModal {
      constructor(plugin, onPick, predicate) {
        super(plugin.app);
        this.onPick = onPick;
        this.setPlaceholder("Pick a file\u2026");
        const all = plugin.app.vault.getFiles();
        this.files = predicate ? all.filter(predicate) : all;
      }
      getSuggestions(query) {
        const q = query.toLowerCase().trim();
        const ranked = this.files.map((f) => ({ f, score: rankPath(f.path, q) })).filter((x) => x.score > -Infinity).sort((a, b) => b.score - a.score).slice(0, 50).map((x) => x.f);
        return ranked;
      }
      renderSuggestion(item, el) {
        el.createDiv({ text: item.basename });
        el.createDiv({ text: item.path, attr: { style: "opacity: 0.6; font-size: 0.8em;" } });
      }
      onChooseSuggestion(item) {
        this.onPick(item);
      }
    };
    VaultFolderPickerModal = class extends import_obsidian3.SuggestModal {
      constructor(plugin, onPick) {
        super(plugin.app);
        this.onPick = onPick;
        this.setPlaceholder("Pick a folder\u2026");
        this.folders = collectFolders(plugin.app.vault.getRoot());
      }
      getSuggestions(query) {
        const q = query.toLowerCase().trim();
        if (!q) return this.folders.slice(0, 50);
        return this.folders.map((f) => ({ f, score: rankPath(f.path, q) })).filter((x) => x.score > -Infinity).sort((a, b) => b.score - a.score).slice(0, 50).map((x) => x.f);
      }
      renderSuggestion(item, el) {
        el.createDiv({ text: item.path || "/", attr: { style: "font-weight: 500;" } });
      }
      onChooseSuggestion(item) {
        this.onPick(item);
      }
    };
  }
});

// preview-modal.ts
var preview_modal_exports = {};
__export(preview_modal_exports, {
  PreviewModal: () => PreviewModal
});
var import_obsidian4, PreviewModal;
var init_preview_modal = __esm({
  "preview-modal.ts"() {
    import_obsidian4 = require("obsidian");
    PreviewModal = class extends import_obsidian4.Modal {
      constructor(app, opts) {
        super(app);
        this.opts = opts;
        this.viewMode = "new";
      }
      onOpen() {
        const { contentEl, modalEl } = this;
        modalEl.addClass("odysseus-preview-modal");
        contentEl.empty();
        contentEl.createEl("h3", { text: this.opts.title ?? "Review change" });
        const tabs = contentEl.createDiv({ cls: "odysseus-preview-tabs" });
        const mkTab = (label, mode) => {
          const btn = tabs.createEl("button", { text: label });
          btn.dataset.mode = mode;
          btn.addEventListener("click", () => {
            this.viewMode = mode;
            for (const b of Array.from(tabs.querySelectorAll("button"))) {
              b.toggleClass("is-active", b.dataset.mode === mode);
            }
            void this.render();
          });
          return btn;
        };
        const newBtn = mkTab("New", "new");
        mkTab("Original", "original");
        mkTab("Side by side", "split");
        newBtn.addClass("is-active");
        this.pane = contentEl.createDiv({ cls: "odysseus-preview-pane" });
        void this.render();
        new import_obsidian4.Setting(contentEl).addButton(
          (b) => b.setButtonText("Reject").onClick(() => this.close())
        ).addButton(
          (b) => b.setButtonText(this.opts.acceptLabel ?? "Accept").setCta().onClick(async () => {
            this.close();
            await this.opts.onAccept();
          })
        );
      }
      onClose() {
        this.contentEl.empty();
      }
      async render() {
        this.pane.empty();
        if (this.viewMode === "split") {
          const grid = this.pane.createDiv({ cls: "odysseus-preview-split" });
          const left = grid.createDiv({ cls: "odysseus-preview-col" });
          left.createEl("div", { cls: "odysseus-preview-collabel", text: "Original" });
          left.createEl("pre", { cls: "odysseus-preview-pre" }).setText(this.opts.originalText);
          const right = grid.createDiv({ cls: "odysseus-preview-col" });
          right.createEl("div", { cls: "odysseus-preview-collabel", text: "New" });
          const newBody = right.createDiv({ cls: "odysseus-preview-md" });
          await import_obsidian4.MarkdownRenderer.render(this.app, this.opts.newText, newBody, "", this);
        } else if (this.viewMode === "original") {
          this.pane.createEl("pre", { cls: "odysseus-preview-pre" }).setText(this.opts.originalText);
        } else {
          const body = this.pane.createDiv({ cls: "odysseus-preview-md" });
          await import_obsidian4.MarkdownRenderer.render(this.app, this.opts.newText, body, "", this);
        }
      }
    };
  }
});

// mcp-tools.ts
var mcp_tools_exports = {};
__export(mcp_tools_exports, {
  VAULT_TOOLS: () => VAULT_TOOLS,
  enabledTools: () => enabledTools,
  pickSplitLevel: () => pickSplitLevel,
  splitNoteByHeadings: () => splitNoteByHeadings
});
function obj(props, required = []) {
  return { type: "object", properties: props, required };
}
function str() {
  return { type: "string" };
}
function num() {
  return { type: "number" };
}
async function fileAt(plugin, path) {
  const f = plugin.app.vault.getAbstractFileByPath(path);
  return f instanceof import_obsidian5.TFile ? f : null;
}
function safePath(p) {
  if (!p || p.length > 400) return false;
  if (p.startsWith("/") || p.startsWith("\\")) return false;
  if (/^[A-Za-z]:[\\/]/.test(p)) return false;
  if (p.split(/[\\/]/).some((part) => part === ".." || part === "")) return false;
  return true;
}
function ensureMdExt(p) {
  if (!p) return p;
  return /\.(md|markdown|canvas|txt)$/i.test(p) ? p : p + ".md";
}
async function ensureParent(plugin, path) {
  const parts = path.split("/");
  if (parts.length <= 1) return;
  const dir = parts.slice(0, -1).join("/");
  if (!plugin.app.vault.getAbstractFileByPath(dir)) {
    await plugin.app.vault.createFolder(dir).catch(() => void 0);
  }
}
function fileTags(plugin, f) {
  const cache = plugin.app.metadataCache.getFileCache(f);
  const tags = /* @__PURE__ */ new Set();
  for (const t of cache?.tags ?? []) tags.add(t.tag.replace(/^#/, ""));
  const fm = cache?.frontmatter?.tags;
  if (Array.isArray(fm)) for (const t of fm) tags.add(String(t));
  else if (typeof fm === "string") {
    for (const t of fm.split(/[,\s]+/)) if (t) tags.add(t);
  }
  return tags;
}
function bool() {
  return { type: "boolean" };
}
function sectionRange(lines, heading) {
  const h = heading.trim();
  const start = lines.findIndex((l) => /^#{1,6}\s/.test(l) && l.replace(/^#{1,6}\s/, "").trim() === h);
  if (start < 0) return null;
  const level = (lines[start].match(/^#+/) ?? ["#"])[0].length;
  let end = lines.length;
  for (let i = start + 1; i < lines.length; i++) {
    const m = lines[i].match(/^(#{1,6})\s/);
    if (m && m[1].length <= level) {
      end = i;
      break;
    }
  }
  return { start, end };
}
async function insertIntoNote(plugin, path, block, underHeading) {
  let dst = await fileAt(plugin, path);
  if (!dst) {
    await ensureParent(plugin, path);
    dst = await plugin.app.vault.create(path, "");
  }
  const cur = await plugin.app.vault.read(dst);
  if (underHeading) {
    const dl = cur.split("\n");
    const r = sectionRange(dl, underHeading.trim());
    if (r) {
      dl.splice(r.end, 0, block);
      await plugin.app.vault.modify(dst, dl.join("\n"));
      return;
    }
  }
  const sep = cur.length === 0 ? "" : cur.endsWith("\n\n") ? "" : cur.endsWith("\n") ? "\n" : "\n\n";
  await plugin.app.vault.modify(dst, cur + sep + block + "\n");
}
function pickSplitLevel(lines) {
  const counts = {};
  for (const l of lines) {
    const m = l.match(/^(#{1,6})\s+\S/);
    if (m) counts[m[1].length] = (counts[m[1].length] ?? 0) + 1;
  }
  for (let lvl = 1; lvl <= 6; lvl++) if ((counts[lvl] ?? 0) >= 2) return lvl;
  for (let lvl = 1; lvl <= 6; lvl++) if ((counts[lvl] ?? 0) >= 1) return lvl;
  return 1;
}
async function splitNoteByHeadings(plugin, file, opts = {}) {
  const lines = (await plugin.app.vault.read(file)).split("\n");
  const level = Math.min(Math.max(Number(opts.level ?? pickSplitLevel(lines)) || 1, 1), 6);
  const destFolder = (opts.destFolder ?? "").replace(/\/+$/, "") || (file.parent?.path ?? "");
  if (destFolder && !safePath(destFolder)) return { error: `Refused unsafe folder: ${destFolder}` };
  const marks = [];
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^(#{1,6})\s+(.*)$/);
    if (m && m[1].length === level) marks.push({ idx: i, title: m[2].trim() });
  }
  if (marks.length === 0) return { error: `No level-${level} headings found in ${file.path}.` };
  if (destFolder && !plugin.app.vault.getAbstractFileByPath(destFolder)) {
    await plugin.app.vault.createFolder(destFolder).catch(() => void 0);
  }
  const created = [];
  const skipped = [];
  for (let k = 0; k < marks.length; k++) {
    const startIdx = marks[k].idx;
    const endIdx = k + 1 < marks.length ? marks[k + 1].idx : lines.length;
    const body = lines.slice(startIdx, endIdx).join("\n").replace(/\s+$/, "") + "\n";
    const safeName = marks[k].title.replace(/[\\/:*?"<>|#^[\]]/g, " ").replace(/\s+/g, " ").trim().slice(0, 80) || `section-${k + 1}`;
    const target = `${destFolder ? destFolder + "/" : ""}${safeName}.md`;
    if (plugin.app.vault.getAbstractFileByPath(target)) {
      skipped.push(target);
      continue;
    }
    await plugin.app.vault.create(target, body);
    created.push(target);
  }
  return { created, skipped, level };
}
function enabledTools(plugin) {
  const disabled = new Set(plugin.settings.mcpDisabledTools ?? []);
  return VAULT_TOOLS.filter((t) => {
    if (disabled.has(t.name)) return false;
    if (t.write && !plugin.settings.mcpAllowWrites) return false;
    if (t.dangerous && !plugin.settings.mcpAllowDangerous) return false;
    return true;
  });
}
var import_obsidian5, MAX_READ, VAULT_TOOLS;
var init_mcp_tools = __esm({
  "mcp-tools.ts"() {
    import_obsidian5 = require("obsidian");
    MAX_READ = 16e3;
    VAULT_TOOLS = [
      // ---------------- Read & discovery ----------------
      {
        name: "search_vault",
        category: "Read & discovery",
        description: "Search note contents for a query. Returns matching notes with a snippet around each match.",
        inputSchema: obj({ query: str(), limit: num() }, ["query"]),
        handler: async (plugin, args) => {
          const query = String(args.query ?? "").toLowerCase();
          const limit = Math.min(Number(args.limit ?? 10) || 10, 30);
          if (!query) return "No query provided.";
          const hits = [];
          for (const f of plugin.app.vault.getMarkdownFiles()) {
            if (hits.length >= limit) break;
            let content;
            try {
              content = await plugin.app.vault.cachedRead(f);
            } catch {
              continue;
            }
            const idx = content.toLowerCase().indexOf(query);
            if (idx >= 0) {
              const snip = content.slice(Math.max(0, idx - 80), idx + 160).replace(/\s+/g, " ").trim();
              hits.push(`### ${f.path}
\u2026${snip}\u2026`);
            }
          }
          return hits.length ? hits.join("\n\n") : `No matches for "${args.query}".`;
        }
      },
      {
        name: "read_note",
        category: "Read & discovery",
        description: "Read a note by vault-relative path. Returns up to ~16k chars; if longer, call again with 'offset' for the next chunk.",
        inputSchema: obj({ path: str(), offset: num() }, ["path"]),
        handler: async (plugin, args) => {
          const f = await fileAt(plugin, String(args.path ?? ""));
          if (!f) return `Note not found: ${args.path}`;
          const offset = Math.max(0, Number(args.offset ?? 0) || 0);
          const full = await plugin.app.vault.cachedRead(f);
          const chunk = full.slice(offset, offset + MAX_READ);
          const more = offset + MAX_READ < full.length;
          return `[${f.path} \u2014 chars ${offset}-${offset + chunk.length} of ${full.length}${more ? `; offset=${offset + MAX_READ} for more` : ""}]

${chunk}`;
        }
      },
      {
        name: "list_files",
        category: "Read & discovery",
        description: "List markdown files, optionally within a folder.",
        inputSchema: obj({ folder: str() }),
        handler: async (plugin, args) => {
          const folder = String(args.folder ?? "").replace(/\/+$/, "");
          const files = plugin.app.vault.getMarkdownFiles().filter((f) => !folder || f.path === folder || f.path.startsWith(folder + "/")).map((f) => f.path).slice(0, 800);
          return files.length ? files.join("\n") : "No files.";
        }
      },
      {
        name: "list_folders",
        category: "Read & discovery",
        description: "List all folders in the vault.",
        inputSchema: obj({}),
        handler: async (plugin) => {
          const out = [];
          const visit = (f) => {
            if (f.path) out.push(f.path);
            for (const c of f.children) if (c instanceof import_obsidian5.TFolder) visit(c);
          };
          visit(plugin.app.vault.getRoot());
          return out.length ? out.join("\n") : "No folders.";
        }
      },
      {
        name: "get_metadata",
        category: "Read & discovery",
        description: "Get a note's frontmatter, tags, heading outline, and modified/created dates \u2014 without reading the whole note.",
        inputSchema: obj({ path: str() }, ["path"]),
        handler: async (plugin, args) => {
          const f = await fileAt(plugin, String(args.path ?? ""));
          if (!f) return `Note not found: ${args.path}`;
          const cache = plugin.app.metadataCache.getFileCache(f);
          const headings = (cache?.headings ?? []).map((h) => `${"#".repeat(h.level)} ${h.heading}`);
          const tags = Array.from(fileTags(plugin, f));
          return JSON.stringify({
            path: f.path,
            created: new Date(f.stat.ctime).toISOString(),
            modified: new Date(f.stat.mtime).toISOString(),
            size: f.stat.size,
            frontmatter: cache?.frontmatter ?? {},
            tags,
            outline: headings
          }, null, 2);
        }
      },
      {
        name: "get_backlinks",
        category: "Read & discovery",
        description: "List notes that link TO the given note.",
        inputSchema: obj({ path: str() }, ["path"]),
        handler: async (plugin, args) => {
          const target = String(args.path ?? "");
          const resolved = plugin.app.metadataCache.resolvedLinks;
          const sources = [];
          for (const [src, targets] of Object.entries(resolved)) {
            if (targets[target]) sources.push(src);
          }
          return sources.length ? sources.join("\n") : `No backlinks to ${target}.`;
        }
      },
      {
        name: "get_outgoing_links",
        category: "Read & discovery",
        description: "List notes the given note links TO.",
        inputSchema: obj({ path: str() }, ["path"]),
        handler: async (plugin, args) => {
          const src = String(args.path ?? "");
          const targets = plugin.app.metadataCache.resolvedLinks[src] ?? {};
          const keys = Object.keys(targets);
          return keys.length ? keys.join("\n") : `No outgoing links from ${src}.`;
        }
      },
      {
        name: "list_tags",
        category: "Read & discovery",
        description: "List all tags in the vault with their counts.",
        inputSchema: obj({}),
        handler: async (plugin) => {
          const tags = plugin.app.metadataCache.getTags?.() ?? {};
          const entries = Object.entries(tags).sort((a, b) => b[1] - a[1]).map(([t, c]) => `${t} (${c})`);
          return entries.length ? entries.join("\n") : "No tags.";
        }
      },
      {
        name: "notes_by_tag",
        category: "Read & discovery",
        description: "List notes that have a given tag (without the # prefix).",
        inputSchema: obj({ tag: str() }, ["tag"]),
        handler: async (plugin, args) => {
          const want = String(args.tag ?? "").replace(/^#/, "");
          const out = [];
          for (const f of plugin.app.vault.getMarkdownFiles()) {
            if (fileTags(plugin, f).has(want)) out.push(f.path);
          }
          return out.length ? out.join("\n") : `No notes tagged #${want}.`;
        }
      },
      {
        name: "recent_notes",
        category: "Read & discovery",
        description: "List the most recently modified notes within the last N days (default 7).",
        inputSchema: obj({ days: num(), limit: num() }),
        handler: async (plugin, args) => {
          const days = Number(args.days ?? 7) || 7;
          const limit = Math.min(Number(args.limit ?? 20) || 20, 100);
          const cutoff = Date.now() - days * 864e5;
          const files = plugin.app.vault.getMarkdownFiles().filter((f) => f.stat.mtime >= cutoff).sort((a, b) => b.stat.mtime - a.stat.mtime).slice(0, limit).map((f) => `${f.path}  (${new Date(f.stat.mtime).toISOString().slice(0, 10)})`);
          return files.length ? files.join("\n") : `No notes modified in the last ${days} days.`;
        }
      },
      {
        name: "regex_search",
        category: "Read & discovery",
        description: "Search note contents with a JavaScript regular expression. Returns matching notes and the first match per note.",
        inputSchema: obj({ pattern: str(), flags: str(), limit: num() }, ["pattern"]),
        handler: async (plugin, args) => {
          let re;
          try {
            re = new RegExp(String(args.pattern ?? ""), String(args.flags ?? "i"));
          } catch (e) {
            return `Bad regex: ${e.message}`;
          }
          const limit = Math.min(Number(args.limit ?? 20) || 20, 50);
          const out = [];
          for (const f of plugin.app.vault.getMarkdownFiles()) {
            if (out.length >= limit) break;
            let c;
            try {
              c = await plugin.app.vault.cachedRead(f);
            } catch {
              continue;
            }
            const m = re.exec(c);
            if (m) out.push(`### ${f.path}
${m[0].slice(0, 160)}`);
          }
          return out.length ? out.join("\n\n") : "No matches.";
        }
      },
      {
        name: "find_orphans",
        category: "Read & discovery",
        description: "List notes that have no links in or out (orphans).",
        inputSchema: obj({}),
        handler: async (plugin) => {
          const resolved = plugin.app.metadataCache.resolvedLinks;
          const linkedTo = /* @__PURE__ */ new Set();
          for (const targets of Object.values(resolved)) for (const t of Object.keys(targets)) linkedTo.add(t);
          const out = [];
          for (const f of plugin.app.vault.getMarkdownFiles()) {
            const hasOut = Object.keys(resolved[f.path] ?? {}).length > 0;
            if (!hasOut && !linkedTo.has(f.path)) out.push(f.path);
          }
          return out.length ? out.slice(0, 200).join("\n") : "No orphan notes.";
        }
      },
      {
        name: "read_canvas",
        category: "Read & discovery",
        description: "Read a .canvas file's raw JSON (nodes + edges).",
        inputSchema: obj({ path: str() }, ["path"]),
        handler: async (plugin, args) => {
          const f = await fileAt(plugin, String(args.path ?? ""));
          if (!f) return `Canvas not found: ${args.path}`;
          const c = await plugin.app.vault.read(f);
          return c.slice(0, MAX_READ);
        }
      },
      // ---------------- Editor context ----------------
      {
        name: "get_active_note",
        category: "Editor context",
        description: "Get the path and content of the note the user currently has open.",
        inputSchema: obj({}),
        handler: async (plugin) => {
          const f = plugin.app.workspace.getActiveFile();
          if (!f) return "No active note.";
          const c = await plugin.app.vault.cachedRead(f);
          return `Path: ${f.path}

${c.slice(0, MAX_READ)}`;
        }
      },
      {
        name: "get_selection",
        category: "Editor context",
        description: "Get the text the user currently has selected in the editor.",
        inputSchema: obj({}),
        handler: async (plugin) => {
          const view = plugin.app.workspace.getActiveViewOfType(import_obsidian5.MarkdownView);
          const sel = view?.editor?.getSelection();
          return sel ? sel : "No text selected.";
        }
      },
      {
        name: "get_open_notes",
        category: "Editor context",
        description: "List the paths of all notes the user currently has open in tabs.",
        inputSchema: obj({}),
        handler: async (plugin) => {
          const paths = /* @__PURE__ */ new Set();
          plugin.app.workspace.iterateAllLeaves((leaf) => {
            const v = leaf.view;
            if (v?.file instanceof import_obsidian5.TFile) paths.add(v.file.path);
          });
          return paths.size ? Array.from(paths).join("\n") : "No notes open.";
        }
      },
      // ---------------- Navigation ----------------
      {
        name: "open_note",
        category: "Navigation",
        description: "Open a note in the user's Obsidian window.",
        inputSchema: obj({ path: str() }, ["path"]),
        handler: async (plugin, args) => {
          const f = await fileAt(plugin, String(args.path ?? ""));
          if (!f) return `Note not found: ${args.path}`;
          await plugin.app.workspace.getLeaf(false).openFile(f);
          return `Opened ${f.path}`;
        }
      },
      // ---------------- Surgical writes (require Allow writes) ----------------
      {
        name: "write_note",
        category: "Surgical writes",
        write: true,
        description: "Create or overwrite a note at the given path with the provided content.",
        inputSchema: obj({ path: str(), content: str() }, ["path", "content"]),
        handler: async (plugin, args) => {
          const path = ensureMdExt(String(args.path ?? ""));
          const content = String(args.content ?? "");
          if (!safePath(path)) return `Refused unsafe path: ${path}`;
          const f = await fileAt(plugin, path);
          if (f) {
            await plugin.app.vault.modify(f, content);
            return `Updated ${path}`;
          }
          await ensureParent(plugin, path);
          await plugin.app.vault.create(path, content);
          return `Created ${path}`;
        }
      },
      {
        name: "append_note",
        category: "Surgical writes",
        write: true,
        description: "Append text to a note (creates it if missing).",
        inputSchema: obj({ path: str(), text: str() }, ["path", "text"]),
        handler: async (plugin, args) => {
          const path = ensureMdExt(String(args.path ?? ""));
          const text = String(args.text ?? "");
          if (!safePath(path)) return `Refused unsafe path: ${path}`;
          const f = await fileAt(plugin, path);
          if (f) {
            const cur = await plugin.app.vault.read(f);
            await plugin.app.vault.modify(f, cur + (cur.endsWith("\n") ? "" : "\n") + text);
            return `Appended to ${path}`;
          }
          await ensureParent(plugin, path);
          await plugin.app.vault.create(path, text);
          return `Created ${path}`;
        }
      },
      {
        name: "insert_under_heading",
        category: "Surgical writes",
        write: true,
        description: "Insert text immediately under a specific '## heading' in a note (before the next heading of the same or higher level).",
        inputSchema: obj({ path: str(), heading: str(), text: str() }, ["path", "heading", "text"]),
        handler: async (plugin, args) => {
          const f = await fileAt(plugin, String(args.path ?? ""));
          if (!f) return `Note not found: ${args.path}`;
          const heading = String(args.heading ?? "").trim();
          const text = String(args.text ?? "");
          const lines = (await plugin.app.vault.read(f)).split("\n");
          const hIdx = lines.findIndex((l) => /^#{1,6}\s/.test(l) && l.replace(/^#{1,6}\s/, "").trim() === heading);
          if (hIdx < 0) return `Heading "${heading}" not found in ${f.path}`;
          const level = (lines[hIdx].match(/^#+/) ?? ["#"])[0].length;
          let insertAt = lines.length;
          for (let i = hIdx + 1; i < lines.length; i++) {
            const m = lines[i].match(/^#{1,6}\s/);
            if (m && (lines[i].match(/^#+/) ?? ["#"])[0].length <= level) {
              insertAt = i;
              break;
            }
          }
          lines.splice(insertAt, 0, text);
          await plugin.app.vault.modify(f, lines.join("\n"));
          return `Inserted under "${heading}" in ${f.path}`;
        }
      },
      {
        name: "replace_in_note",
        category: "Surgical writes",
        write: true,
        description: "Replace the first occurrence of a literal string in a note with new text.",
        inputSchema: obj({ path: str(), find: str(), replace: str() }, ["path", "find", "replace"]),
        handler: async (plugin, args) => {
          const f = await fileAt(plugin, String(args.path ?? ""));
          if (!f) return `Note not found: ${args.path}`;
          const find = String(args.find ?? "");
          const repl = String(args.replace ?? "");
          const cur = await plugin.app.vault.read(f);
          if (!cur.includes(find)) return `Text not found in ${f.path}`;
          await plugin.app.vault.modify(f, cur.replace(find, repl));
          return `Replaced in ${f.path}`;
        }
      },
      {
        name: "set_frontmatter",
        category: "Surgical writes",
        write: true,
        description: "Set a single frontmatter (YAML) field on a note.",
        inputSchema: obj({ path: str(), key: str(), value: str() }, ["path", "key", "value"]),
        handler: async (plugin, args) => {
          const f = await fileAt(plugin, String(args.path ?? ""));
          if (!f) return `Note not found: ${args.path}`;
          const key = String(args.key ?? "");
          const value = args.value;
          await plugin.app.fileManager.processFrontMatter(f, (fm) => {
            fm[key] = value;
          });
          return `Set ${key} on ${f.path}`;
        }
      },
      {
        name: "add_tag",
        category: "Surgical writes",
        write: true,
        description: "Add a tag to a note's frontmatter (without the # prefix).",
        inputSchema: obj({ path: str(), tag: str() }, ["path", "tag"]),
        handler: async (plugin, args) => {
          const f = await fileAt(plugin, String(args.path ?? ""));
          if (!f) return `Note not found: ${args.path}`;
          const tag = String(args.tag ?? "").replace(/^#/, "");
          await plugin.app.fileManager.processFrontMatter(f, (fm) => {
            const cur = Array.isArray(fm.tags) ? fm.tags : fm.tags ? [fm.tags] : [];
            if (!cur.includes(tag)) cur.push(tag);
            fm.tags = cur;
          });
          return `Added #${tag} to ${f.path}`;
        }
      },
      {
        name: "remove_tag",
        category: "Surgical writes",
        write: true,
        description: "Remove a tag from a note's frontmatter.",
        inputSchema: obj({ path: str(), tag: str() }, ["path", "tag"]),
        handler: async (plugin, args) => {
          const f = await fileAt(plugin, String(args.path ?? ""));
          if (!f) return `Note not found: ${args.path}`;
          const tag = String(args.tag ?? "").replace(/^#/, "");
          await plugin.app.fileManager.processFrontMatter(f, (fm) => {
            if (Array.isArray(fm.tags)) fm.tags = fm.tags.filter((t) => String(t) !== tag);
          });
          return `Removed #${tag} from ${f.path}`;
        }
      },
      {
        name: "append_to_daily_note",
        category: "Surgical writes",
        write: true,
        description: "Append a line to today's daily note (YYYY-MM-DD.md in the vault root, created if missing).",
        inputSchema: obj({ text: str() }, ["text"]),
        handler: async (plugin, args) => {
          const text = String(args.text ?? "");
          const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
          const path = `${today}.md`;
          const f = await fileAt(plugin, path);
          if (f) {
            const cur = await plugin.app.vault.read(f);
            await plugin.app.vault.modify(f, cur + (cur.endsWith("\n") ? "" : "\n") + text);
          } else {
            await plugin.app.vault.create(path, `# ${today}

${text}`);
          }
          return `Logged to ${path}`;
        }
      },
      {
        name: "create_folder",
        category: "Surgical writes",
        write: true,
        description: "Create a folder at the given vault-relative path.",
        inputSchema: obj({ path: str() }, ["path"]),
        handler: async (plugin, args) => {
          const path = String(args.path ?? "");
          if (!safePath(path)) return `Refused unsafe path: ${path}`;
          if (plugin.app.vault.getAbstractFileByPath(path)) return `Already exists: ${path}`;
          await plugin.app.vault.createFolder(path);
          return `Created folder ${path}`;
        }
      },
      {
        name: "move_note",
        category: "Surgical writes",
        write: true,
        description: "Move or rename a note from one path to another.",
        inputSchema: obj({ from: str(), to: str() }, ["from", "to"]),
        handler: async (plugin, args) => {
          const from = String(args.from ?? "");
          const to = ensureMdExt(String(args.to ?? ""));
          if (!safePath(to)) return `Refused unsafe path: ${to}`;
          const f = await fileAt(plugin, from);
          if (!f) return `Note not found: ${from}`;
          await ensureParent(plugin, to);
          await plugin.app.fileManager.renameFile(f, to);
          return `Moved ${from} \u2192 ${to}`;
        }
      },
      {
        name: "copy_note",
        category: "Surgical writes",
        write: true,
        description: "Duplicate a whole note to a new path WITHOUT loading its text into the conversation \u2014 the bytes are copied inside Obsidian. Use this to move content the model doesn't need to read. Fails if the destination exists unless overwrite=true.",
        inputSchema: obj({ from: str(), to: str(), overwrite: bool() }, ["from", "to"]),
        handler: async (plugin, args) => {
          const from = String(args.from ?? "");
          const to = ensureMdExt(String(args.to ?? ""));
          if (!safePath(to)) return `Refused unsafe path: ${to}`;
          const f = await fileAt(plugin, from);
          if (!f) return `Note not found: ${from}`;
          const content = await plugin.app.vault.read(f);
          const existing = await fileAt(plugin, to);
          if (existing) {
            if (args.overwrite !== true) return `Destination exists (pass overwrite=true to replace): ${to}`;
            await plugin.app.vault.modify(existing, content);
            return `Copied ${from} \u2192 ${to} (overwritten)`;
          }
          await ensureParent(plugin, to);
          await plugin.app.vault.create(to, content);
          return `Copied ${from} \u2192 ${to}`;
        }
      },
      {
        name: "copy_section",
        category: "Surgical writes",
        write: true,
        description: "Copy the block under a '## heading' from one note into another WITHOUT loading the text into the conversation. The section spans the heading to the next heading of the same or higher level. Appends to the end of the destination (created if missing); pass under_heading to insert beneath a heading there instead.",
        inputSchema: obj({ from: str(), heading: str(), to: str(), under_heading: str() }, ["from", "heading", "to"]),
        handler: async (plugin, args) => {
          const from = String(args.from ?? "");
          const to = ensureMdExt(String(args.to ?? ""));
          const heading = String(args.heading ?? "").trim();
          if (!safePath(to)) return `Refused unsafe path: ${to}`;
          const src = await fileAt(plugin, from);
          if (!src) return `Note not found: ${from}`;
          const lines = (await plugin.app.vault.read(src)).split("\n");
          const range = sectionRange(lines, heading);
          if (!range) return `Heading "${heading}" not found in ${from}`;
          const block = lines.slice(range.start, range.end).join("\n").replace(/\s+$/, "");
          await insertIntoNote(plugin, to, block, args.under_heading ? String(args.under_heading) : null);
          return `Copied section "${heading}" from ${from} \u2192 ${to}`;
        }
      },
      {
        name: "move_section",
        category: "Surgical writes",
        write: true,
        description: "Move (cut+paste) the block under a '## heading' from one note into another WITHOUT loading the text into the conversation, removing it from the source. Same placement rules as copy_section.",
        inputSchema: obj({ from: str(), heading: str(), to: str(), under_heading: str() }, ["from", "heading", "to"]),
        handler: async (plugin, args) => {
          const from = String(args.from ?? "");
          const to = ensureMdExt(String(args.to ?? ""));
          const heading = String(args.heading ?? "").trim();
          if (!safePath(to)) return `Refused unsafe path: ${to}`;
          const src = await fileAt(plugin, from);
          if (!src) return `Note not found: ${from}`;
          const lines = (await plugin.app.vault.read(src)).split("\n");
          const range = sectionRange(lines, heading);
          if (!range) return `Heading "${heading}" not found in ${from}`;
          const block = lines.slice(range.start, range.end).join("\n").replace(/\s+$/, "");
          await insertIntoNote(plugin, to, block, args.under_heading ? String(args.under_heading) : null);
          lines.splice(range.start, range.end - range.start);
          await plugin.app.vault.modify(src, lines.join("\n").replace(/\n{3,}/g, "\n\n"));
          return `Moved section "${heading}" from ${from} \u2192 ${to}`;
        }
      },
      {
        name: "split_note",
        category: "Surgical writes",
        write: true,
        description: "Split a note into multiple files \u2014 one per heading \u2014 WITHOUT loading its text into the conversation. Each section at the chosen level (default 1 = '#', set level=2 for '##') becomes its own note named after the heading. Returns only the list of files created. Ideal for partitioning a large file the model shouldn't have to read: call get_metadata for the outline, then split_note.",
        inputSchema: obj({ path: str(), dest_folder: str(), level: num() }, ["path"]),
        handler: async (plugin, args) => {
          const path = String(args.path ?? "");
          const src = await fileAt(plugin, path);
          if (!src) return `Note not found: ${path}`;
          const res = await splitNoteByHeadings(plugin, src, {
            level: args.level != null ? Number(args.level) : 1,
            destFolder: args.dest_folder != null ? String(args.dest_folder) : void 0
          });
          if ("error" in res) return res.error;
          return `Split ${path} into ${res.created.length} file(s):
${res.created.map((c) => `- ${c}`).join("\n")}${res.skipped.length ? `
Skipped (already exist): ${res.skipped.length}` : ""}`;
        }
      },
      // ---------------- Dangerous (require Allow writes AND Allow dangerous) ----------------
      {
        name: "delete_note",
        category: "Dangerous",
        write: true,
        dangerous: true,
        description: "Move a note to the system trash.",
        inputSchema: obj({ path: str() }, ["path"]),
        handler: async (plugin, args) => {
          const f = await fileAt(plugin, String(args.path ?? ""));
          if (!f) return `Note not found: ${args.path}`;
          await plugin.app.vault.trash(f, true);
          return `Trashed ${f.path}`;
        }
      },
      {
        name: "run_command",
        category: "Dangerous",
        dangerous: true,
        description: "Run an Obsidian command by its id (e.g. 'app:open-vault', 'editor:toggle-bold'). Discover ids with list_commands first. Editor/selection commands usually only work when a note is open and focused; global/navigation/plugin commands work without focus. Returns only whether the command fired, not its output.",
        inputSchema: obj({ command_id: str() }, ["command_id"]),
        handler: async (plugin, args) => {
          const id = String(args.command_id ?? "");
          const ok = plugin.app.commands.executeCommandById(id);
          return ok ? `Ran command ${id}` : `Command not found or failed (it may need an active/focused note): ${id}`;
        }
      },
      {
        name: "list_commands",
        category: "Read & discovery",
        description: "List Obsidian commands that can be triggered with run_command (returns 'id \u2014 name' pairs from every enabled plugin + core). Pass an optional 'query' to filter by id or name \u2014 recommended, since there can be hundreds. Editor/selection commands generally need a focused note; global/navigation/other-plugin commands work headlessly.",
        inputSchema: obj({ query: str(), limit: num() }),
        handler: async (plugin, args) => {
          const query = String(args.query ?? "").toLowerCase();
          const limit = Math.min(Number(args.limit ?? 100) || 100, 400);
          const all = plugin.app.commands.listCommands();
          const filtered = all.filter((c) => !query || c.id.toLowerCase().includes(query) || (c.name ?? "").toLowerCase().includes(query));
          if (filtered.length === 0) return query ? `No commands matching "${args.query}".` : "No commands available.";
          const shown = filtered.slice(0, limit).map((c) => `- ${c.id}  \u2014  ${c.name}`);
          const more = filtered.length > limit ? `
\u2026and ${filtered.length - limit} more (narrow with 'query').` : "";
          return `${filtered.length} command(s)${query ? ` matching "${args.query}"` : ""}:
${shown.join("\n")}${more}`;
        }
      }
    ];
  }
});

// prompt-templates.ts
var prompt_templates_exports = {};
__export(prompt_templates_exports, {
  PromptTemplatePickerModal: () => PromptTemplatePickerModal,
  runPromptTemplate: () => runPromptTemplate,
  substituteTemplate: () => substituteTemplate
});
async function substituteTemplate(plugin, body, ctx) {
  let out = body;
  while (out.includes("{?note}")) {
    const file = await pickFile(plugin);
    if (!file) {
      out = out.replace("{?note}", "(no note picked)");
      break;
    }
    const content = await plugin.app.vault.cachedRead(file);
    out = out.replace("{?note}", `### ${file.path}

${content}`);
  }
  const textRe = /\{\?text(?::([^}]+))?\}/;
  while (textRe.test(out)) {
    const m = out.match(textRe);
    if (!m) break;
    const label = (m[1] ?? "").trim() || "Enter value";
    const value = await promptForText(plugin, label);
    out = out.replace(m[0], value ?? "");
  }
  out = out.split("{}").join(ctx.selection ?? "");
  if (/\{active(Note)?\}/.test(out)) {
    let content = "(no active note)";
    if (ctx.activeFile) {
      try {
        content = await plugin.app.vault.cachedRead(ctx.activeFile);
      } catch {
        content = "(could not read active note)";
      }
    }
    out = out.replace(/\{active(Note)?\}/g, content);
  }
  const linkMatches = Array.from(out.matchAll(/\{\[\[([^\]]+)\]\]\}/g));
  if (linkMatches.length > 0) {
    const seen = /* @__PURE__ */ new Set();
    for (const m of linkMatches) {
      const name = m[1].trim();
      if (seen.has(name)) continue;
      seen.add(name);
      const f = plugin.app.metadataCache.getFirstLinkpathDest(name, "");
      const content = f ? `### ${f.path}

${await plugin.app.vault.cachedRead(f)}` : `(note "${name}" not found)`;
      const re = new RegExp(`\\{\\[\\[${escapeRegex(name)}\\]\\]\\}`, "g");
      out = out.replace(re, content);
    }
  }
  const tagMatches = Array.from(out.matchAll(/\{(#[^}]+)\}/g));
  if (tagMatches.length > 0) {
    const seen = /* @__PURE__ */ new Set();
    for (const m of tagMatches) {
      const spec = m[1];
      if (seen.has(spec)) continue;
      seen.add(spec);
      const wanted = spec.split(",").map((t) => t.trim().replace(/^#/, "")).filter(Boolean);
      const blocks = [];
      for (const file of plugin.app.vault.getMarkdownFiles()) {
        const cache = plugin.app.metadataCache.getFileCache(file);
        const tags = /* @__PURE__ */ new Set();
        for (const t of cache?.tags ?? []) tags.add(t.tag.replace(/^#/, ""));
        const fm = cache?.frontmatter?.tags;
        if (Array.isArray(fm)) for (const t of fm) tags.add(String(t));
        else if (typeof fm === "string") {
          for (const t of fm.split(/[,\s]+/)) if (t) tags.add(t);
        }
        if (wanted.some((w) => tags.has(w))) {
          blocks.push(`### ${file.path}

${await plugin.app.vault.cachedRead(file)}`);
        }
      }
      const re = new RegExp(`\\{${escapeRegex(spec)}\\}`, "g");
      out = out.replace(re, blocks.length > 0 ? blocks.join("\n\n---\n\n") : `(no notes matched ${spec})`);
    }
  }
  out = out.replace(/\{date(?::([^}]+))?\}/g, (_m, fmt) => formatDate(/* @__PURE__ */ new Date(), fmt));
  return out;
}
function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function pad(n, w = 2) {
  return String(n).padStart(w, "0");
}
function formatDate(d, fmt) {
  if (!fmt) return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  return fmt.replace(/yyyy/g, String(d.getFullYear())).replace(/MM/g, pad(d.getMonth() + 1)).replace(/dd/g, pad(d.getDate())).replace(/HH/g, pad(d.getHours())).replace(/mm/g, pad(d.getMinutes())).replace(/ss/g, pad(d.getSeconds()));
}
function promptForText(plugin, label) {
  return new Promise((resolve) => {
    const modal = new TextInputModal(plugin, label, (value) => resolve(value));
    modal.open();
  });
}
function pickFile(plugin) {
  return new Promise((resolve) => {
    let resolved = false;
    const modal = new VaultFilePickerModal(plugin, (file) => {
      resolved = true;
      resolve(file);
    });
    const origClose = modal.onClose.bind(modal);
    modal.onClose = () => {
      origClose();
      if (!resolved) resolve(null);
    };
    modal.open();
  });
}
async function runPromptTemplate(plugin, template, opts) {
  const ctx = {
    selection: opts.editor?.getSelection() ?? "",
    activeFile: opts.view?.file ?? plugin.app.workspace.getActiveFile()
  };
  let resolved;
  try {
    resolved = await substituteTemplate(plugin, template.body, ctx);
  } catch (e) {
    showError(`template "${template.name}" substitution failed`, e);
    return;
  }
  if (!resolved.trim()) {
    new import_obsidian6.Notice("Odysseus: template produced empty text");
    return;
  }
  if (opts.mode === "replace" && opts.editor) {
    const status = working(`running ${template.name}`);
    try {
      const raw = await plugin.client.rewriteOneshot(ctx.selection || resolved, resolved);
      const result = plugin.settings.hideReasoning ? (await Promise.resolve().then(() => (init_odysseus_api(), odysseus_api_exports))).stripReasoning(raw) : raw;
      const editor = opts.editor;
      const apply = () => editor.replaceSelection(result);
      if (plugin.settings.previewBeforeReplace) {
        new PreviewModal(plugin.app, {
          title: `Template: ${template.name}`,
          originalText: ctx.selection,
          newText: result,
          onAccept: apply
        }).open();
      } else {
        apply();
      }
    } catch (e) {
      showError("template run failed", e);
    } finally {
      status.done();
    }
    return;
  }
  if (opts.mode === "append" && opts.editor) {
    const status = working(`running ${template.name}`);
    try {
      const raw = await plugin.client.chatOneshot(resolved);
      const result = plugin.settings.hideReasoning ? (await Promise.resolve().then(() => (init_odysseus_api(), odysseus_api_exports))).stripReasoning(raw) : raw;
      const editor = opts.editor;
      const cursor = editor.getCursor();
      const insertText = `

${result}`;
      editor.replaceRange(insertText, cursor);
    } catch (e) {
      showError("template run failed", e);
    } finally {
      status.done();
    }
    return;
  }
  await plugin.activateChatView();
  const view = plugin.app.workspace.getLeavesOfType("odysseus-chat-view")[0]?.view;
  if (view?.insertIntoInput) {
    view.insertIntoInput(resolved);
    new import_obsidian6.Notice(`Odysseus: template "${template.name}" filled. Press Enter to send.`);
  } else {
    await navigator.clipboard.writeText(resolved);
    new import_obsidian6.Notice(`Odysseus: template "${template.name}" copied to clipboard.`);
  }
}
var import_obsidian6, TextInputModal, PromptTemplatePickerModal;
var init_prompt_templates = __esm({
  "prompt-templates.ts"() {
    import_obsidian6 = require("obsidian");
    init_odysseus_api();
    init_skills_modal();
    init_preview_modal();
    TextInputModal = class extends import_obsidian6.Modal {
      constructor(plugin, label, onDone) {
        super(plugin.app);
        this.label = label;
        this.onDone = onDone;
        this.value = "";
        this.resolved = false;
      }
      onOpen() {
        const { contentEl } = this;
        contentEl.empty();
        contentEl.createEl("h3", { text: this.label });
        const input = contentEl.createEl("textarea", {
          attr: { rows: "4", placeholder: this.label, style: "width: 100%;" }
        });
        input.addEventListener("input", () => {
          this.value = input.value;
        });
        input.addEventListener("keydown", (ev) => {
          if (ev.key === "Enter" && !ev.shiftKey) {
            ev.preventDefault();
            this.submit();
          }
        });
        setTimeout(() => input.focus(), 50);
        const btnRow = contentEl.createDiv({ attr: { style: "display: flex; gap: 8px; margin-top: 12px; justify-content: flex-end;" } });
        btnRow.createEl("button", { text: "Cancel" }).addEventListener("click", () => this.close());
        const ok = btnRow.createEl("button", { text: "OK", cls: "mod-cta" });
        ok.addEventListener("click", () => this.submit());
      }
      onClose() {
        this.contentEl.empty();
        if (!this.resolved) this.onDone(null);
      }
      submit() {
        this.resolved = true;
        this.onDone(this.value);
        this.close();
      }
    };
    PromptTemplatePickerModal = class extends import_obsidian6.SuggestModal {
      constructor(plugin, onPick) {
        super(plugin.app);
        this.plugin = plugin;
        this.onPick = onPick;
        this.setPlaceholder("Pick a prompt template\u2026");
      }
      getSuggestions(query) {
        const q = query.toLowerCase().trim();
        const templates = this.plugin.settings.promptTemplates ?? [];
        if (!q) return templates.slice(0, 50);
        return templates.filter((t) => t.name.toLowerCase().includes(q) || (t.description ?? "").toLowerCase().includes(q)).slice(0, 50);
      }
      renderSuggestion(item, el) {
        el.createDiv({ text: item.name, attr: { style: "font-weight: 600;" } });
        if (item.description) el.createDiv({ text: item.description, attr: { style: "opacity: 0.7; font-size: 0.85em;" } });
      }
      onChooseSuggestion(item) {
        this.onPick(item);
      }
    };
  }
});

// themes.ts
var themes_exports = {};
__export(themes_exports, {
  ODY_THEMES: () => ODY_THEMES,
  ODY_THEME_NAMES: () => ODY_THEME_NAMES,
  applyChatTheme: () => applyChatTheme
});
function mix(a, b, ratio) {
  const pa = hexToRgb(a);
  const pb = hexToRgb(b);
  if (!pa || !pb) return a;
  const r = Math.round(pa[0] + (pb[0] - pa[0]) * ratio);
  const g = Math.round(pa[1] + (pb[1] - pa[1]) * ratio);
  const bl = Math.round(pa[2] + (pb[2] - pa[2]) * ratio);
  return `rgb(${r}, ${g}, ${bl})`;
}
function hexToRgb(hex) {
  const m = hex.replace("#", "");
  if (m.length !== 6) return null;
  const n = parseInt(m, 16);
  if (Number.isNaN(n)) return null;
  return [n >> 16 & 255, n >> 8 & 255, n & 255];
}
function applyChatTheme(el, themeKey) {
  const vars = [
    "--background-primary",
    "--background-primary-alt",
    "--background-secondary",
    "--background-secondary-alt",
    "--background-modifier-border",
    "--background-modifier-border-hover",
    "--background-modifier-hover",
    "--text-normal",
    "--text-muted",
    "--text-faint",
    "--text-accent",
    "--interactive-accent",
    "--interactive-accent-hover",
    "--text-on-accent",
    // Controls/inputs use these — without them, buttons / textareas / search
    // boxes keep Obsidian's default grey even under an Odysseus theme.
    "--interactive-normal",
    "--interactive-hover",
    "--background-modifier-form-field",
    "--background-modifier-form-field-highlighted"
  ];
  if (!themeKey || themeKey === "obsidian" || !ODY_THEMES[themeKey]) {
    for (const v of vars) el.style.removeProperty(v);
    el.removeClass("odysseus-themed");
    return;
  }
  const t = ODY_THEMES[themeKey];
  el.style.setProperty("--background-primary", t.panel);
  el.style.setProperty("--background-primary-alt", mix(t.panel, t.bg, 0.5));
  el.style.setProperty("--background-secondary", t.bg);
  el.style.setProperty("--background-secondary-alt", mix(t.bg, t.panel, 0.5));
  el.style.setProperty("--background-modifier-border", t.border);
  el.style.setProperty("--background-modifier-border-hover", mix(t.border, t.fg, 0.3));
  el.style.setProperty("--background-modifier-hover", mix(t.bg, t.border, 0.4));
  el.style.setProperty("--interactive-normal", mix(t.bg, t.fg, 0.12));
  el.style.setProperty("--interactive-hover", mix(t.bg, t.fg, 0.22));
  el.style.setProperty("--background-modifier-form-field", mix(t.panel, t.bg, 0.4));
  el.style.setProperty("--background-modifier-form-field-highlighted", t.bg);
  el.style.setProperty("--text-normal", t.fg);
  el.style.setProperty("--text-muted", mix(t.fg, t.bg, 0.35));
  el.style.setProperty("--text-faint", mix(t.fg, t.bg, 0.55));
  el.style.setProperty("--text-accent", t.red);
  el.style.setProperty("--interactive-accent", t.red);
  el.style.setProperty("--interactive-accent-hover", mix(t.red, t.fg, 0.2));
  el.style.setProperty("--text-on-accent", t.bg);
  el.addClass("odysseus-themed");
}
var ODY_THEMES, ODY_THEME_NAMES;
var init_themes = __esm({
  "themes.ts"() {
    ODY_THEMES = {
      dark: { bg: "#282c34", fg: "#9cdef2", panel: "#111111", border: "#355a66", red: "#e06c75" },
      light: { bg: "#f0ebe3", fg: "#5a5248", panel: "#faf6f0", border: "#d4cdc2", red: "#c47d5a" },
      midnight: { bg: "#0d1117", fg: "#c9d1d9", panel: "#161b22", border: "#30363d", red: "#f85149" },
      paper: { bg: "#faf8f5", fg: "#3b3836", panel: "#ffffff", border: "#d5d0c8", red: "#c5ac4a" },
      cyberpunk: { bg: "#0a0a0f", fg: "#0ff0fc", panel: "#12101a", border: "#9b30ff", red: "#e040fb" },
      retrowave: { bg: "#1a1a2e", fg: "#e94560", panel: "#16213e", border: "#533483", red: "#e94560" },
      forest: { bg: "#1b2a1b", fg: "#a8d5a2", panel: "#142414", border: "#3d6b3d", red: "#7cb871" },
      ocean: { bg: "#0b1a2c", fg: "#64d2ff", panel: "#091422", border: "#1e5074", red: "#4facfe" },
      ume: { bg: "#2b1b2e", fg: "#f5c2e7", panel: "#1e1420", border: "#6c4675", red: "#f5a0c0" },
      copper: { bg: "#1c1410", fg: "#e8c39e", panel: "#140f0a", border: "#7a5533", red: "#d4764e" },
      terminal: { bg: "#000000", fg: "#00ff41", panel: "#0a0a0a", border: "#003b00", red: "#00ff41" },
      organs: { bg: "#0a0406", fg: "#efe1c8", panel: "#15080a", border: "#3a1519", red: "#c83240" },
      lavender: { bg: "#f3eef8", fg: "#3d3551", panel: "#faf7ff", border: "#cec3de", red: "#9b6dcc" },
      gpt: { bg: "#212121", fg: "#ececec", panel: "#171717", border: "#424242", red: "#949494" },
      claude: { bg: "#262624", fg: "#f5f4f0", panel: "#30302e", border: "#4a4a47", red: "#c6613f" },
      cute: { bg: "#fff0f5", fg: "#d4608a", panel: "#fff8fa", border: "#f0c0d0", red: "#ff6b9d" }
    };
    ODY_THEME_NAMES = Object.keys(ODY_THEMES);
  }
});

// spinner.ts
var spinner_exports = {};
__export(spinner_exports, {
  createWorkingRow: () => createWorkingRow
});
function createWorkingRow(parent, label = "Odysseus is thinking") {
  const row = parent.createDiv({ cls: "odysseus-working-row" });
  const block = row.createDiv({ cls: "odysseus-working-block" });
  block.createDiv({ cls: "odysseus-working-core" });
  const text = row.createSpan({ cls: "odysseus-working-label", text: label });
  return {
    el: row,
    setLabel: (s) => text.setText(s),
    destroy: () => row.remove()
  };
}
var init_spinner = __esm({
  "spinner.ts"() {
  }
});

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => OdysseusPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian17 = require("obsidian");
init_odysseus_api();

// commands.ts
var import_obsidian7 = require("obsidian");
init_odysseus_api();
init_chat_modal();
init_skills_modal();
init_preview_modal();
init_mcp_tools();
init_voice();
var QuickAnswerModal = class extends import_obsidian7.Modal {
  constructor(plugin, question, answer, editor) {
    super(plugin.app);
    this.plugin = plugin;
    this.question = question;
    this.answer = answer;
    this.editor = editor;
    this.tts = new TtsManager(plugin.client);
  }
  onOpen() {
    const { contentEl, modalEl } = this;
    modalEl.addClass("odysseus-quickanswer-modal");
    contentEl.empty();
    contentEl.createEl("h3", { text: "Quick Ask" });
    contentEl.createEl("div", { text: this.question, attr: { style: "opacity: 0.65; font-size: 0.85em; margin-bottom: 10px; font-style: italic;" } });
    const body = contentEl.createDiv({ cls: "odysseus-quickanswer-body" });
    void import_obsidian7.MarkdownRenderer.render(this.app, this.answer, body, this.app.workspace.getActiveFile()?.path ?? "", this.plugin);
    const row = contentEl.createDiv({ attr: { style: "display:flex; gap:8px; margin-top:12px; justify-content:flex-end;" } });
    const readBtn = row.createEl("button", { attr: { title: "Read aloud / re-listen (Odysseus text-to-speech)" } });
    (0, import_obsidian7.setIcon)(readBtn, "volume-2");
    const toggleRead = () => this.tts.toggle(this.answer, (s) => (0, import_obsidian7.setIcon)(readBtn, s === "playing" ? "square" : s === "loading" ? "loader" : "volume-2"));
    readBtn.addEventListener("click", toggleRead);
    row.createEl("button", { text: "Close" }).addEventListener("click", () => this.close());
    const copyBtn = row.createEl("button", { text: "Copy" });
    copyBtn.addEventListener("click", async () => {
      await navigator.clipboard.writeText(this.answer);
      copyBtn.setText("Copied");
      setTimeout(() => copyBtn.setText("Copy"), 1200);
    });
    const insertBtn = row.createEl("button", { text: "Insert at cursor", cls: "mod-cta" });
    insertBtn.addEventListener("click", () => {
      this.editor.replaceSelection(this.answer);
      this.close();
    });
    if (this.plugin.settings.ttsAutoPlay) toggleRead();
  }
  onClose() {
    this.tts.dispose();
    this.contentEl.empty();
  }
};
function clean(plugin, text) {
  return plugin.settings.hideReasoning ? stripReasoning(text) : text;
}
function confirmAndApply(plugin, title, originalText, newText, apply) {
  if (!plugin.settings.previewBeforeReplace) {
    void apply();
    return;
  }
  new PreviewModal(plugin.app, { title, originalText, newText, onAccept: apply }).open();
}
var WEB_INTENT_RE = new RegExp(
  [
    "\\b(search|look ?up|google|browse|web ?search|find (online|on the web)|on the (web|internet))\\b",
    "\\b(latest|current(ly)?|today|tonight|right now|as of|up[- ]?to[- ]?date|breaking|this (week|month|year))\\b",
    "\\b(news|headlines|weather|forecast|stock price|share price|exchange rate|who won|release date)\\b",
    "https?://|www\\."
  ].join("|"),
  "i"
);
function wantsWeb(q) {
  return WEB_INTENT_RE.test(q || "");
}
function registerCommands(plugin) {
  plugin.addCommand({
    id: "open-chat",
    name: "Open chat panel",
    callback: () => plugin.activateChatView()
  });
  plugin.addCommand({
    id: "quick-prompt",
    name: "Quick prompt",
    callback: () => new QuickPromptModal(plugin).open()
  });
  plugin.addCommand({
    id: "quick-ask",
    name: "Quick Ask (insert reply at cursor)",
    editorCallback: (editor) => {
      const selection = editor.getSelection();
      new QuickPromptModal(plugin, {
        title: "Quick Ask",
        placeholder: selection ? "Ask about the selection\u2026 (Enter to send)" : "Ask Odysseus\u2026 (Enter to send)",
        defaultValue: "",
        allowWeb: true,
        onSubmit: async (question, o) => {
          const useWeb = !!o?.web || wantsWeb(question);
          const status = working(useWeb ? "searching the web" : "asking");
          try {
            const prompt = selection ? `${question}

---

Text I'm referring to:

${selection}` : question;
            const raw = await plugin.client.chatOneshot(prompt, useWeb ? { useWebSearch: true, mode: "agent" } : {});
            const text = clean(plugin, raw);
            status.done();
            if (!text) {
              new import_obsidian7.Notice("Odysseus: empty response");
              return;
            }
            if (plugin.settings.ttsAutoPlay) {
              new QuickAnswerModal(plugin, question, text, editor).open();
              return;
            }
            const notice = new import_obsidian7.Notice("", 0);
            const frag = document.createDocumentFragment();
            frag.createSpan({ text: "Odysseus: Quick Ask ready \u2014 " });
            const view = frag.createEl("a", { text: "view answer", attr: { style: "cursor:pointer; text-decoration:underline;" } });
            view.addEventListener("click", () => {
              notice.hide();
              new QuickAnswerModal(plugin, question, text, editor).open();
            });
            notice.setMessage(frag);
          } catch (e) {
            status.done();
            showError("Quick Ask failed", e);
          }
        }
      }).open();
    }
  });
  plugin.addCommand({
    id: "rewrite-selection",
    name: "Rewrite selection with instruction\u2026",
    editorCallback: (editor) => {
      const selection = editor.getSelection();
      if (!selection) {
        new import_obsidian7.Notice("Odysseus: select some text first");
        return;
      }
      new QuickPromptModal(plugin, {
        title: "Rewrite selection",
        placeholder: "e.g. make it more concise",
        defaultValue: "Improve clarity and flow.",
        onSubmit: async (instruction) => {
          const status = working("rewriting");
          try {
            const result = clean(plugin, await plugin.client.rewriteOneshot(selection, instruction));
            if (!result) {
              new import_obsidian7.Notice("Odysseus: empty response");
              return;
            }
            confirmAndApply(plugin, "Rewrite selection", selection, result, () => {
              editor.replaceSelection(result);
            });
          } catch (e) {
            showError("rewrite failed", e);
          } finally {
            status.done();
          }
        }
      }).open();
    }
  });
  plugin.addCommand({
    id: "summarize-note",
    name: "Summarize active note",
    editorCallback: async (_editor, view) => {
      const file = view.file;
      if (!file) return;
      await runOnNote(plugin, file, "Summarize this note in concise bullet points.", "Summary");
    }
  });
  plugin.addCommand({
    id: "split-note",
    name: "Split note by headings into separate files",
    editorCallback: async (_editor, view) => {
      const file = view.file;
      if (!file) return;
      await runSplitNote(plugin, file);
    }
  });
  plugin.addCommand({
    id: "polish-note",
    name: "Polish active note",
    editorCallback: async (_editor, view) => {
      const file = view.file;
      if (!file) return;
      await runOnNote(plugin, file, "Polish this writing: improve clarity, grammar, and flow. Keep meaning unchanged.", "Polished", { replace: true });
    }
  });
  plugin.addCommand({
    id: "deep-research",
    name: "Deep research from selection or prompt\u2026",
    editorCallback: (editor) => {
      const selection = editor.getSelection();
      new QuickPromptModal(plugin, {
        title: "Deep research",
        placeholder: "research question",
        defaultValue: selection,
        onSubmit: async (query) => {
          if (!query.trim()) return;
          const notice = new import_obsidian7.Notice("Odysseus: starting research\u2026", 0);
          try {
            const sid = await plugin.client.researchStart(query);
            if (!sid) {
              notice.hide();
              new import_obsidian7.Notice("Odysseus: research did not start");
              return;
            }
            notice.setMessage("Odysseus: research running \u2014 poll the panel in your Odysseus UI for streaming progress.");
            const result = await waitForResearch(plugin, sid);
            notice.hide();
            if (result) await writeResearchNote(plugin, query, result);
            else new import_obsidian7.Notice("Odysseus: research returned no data");
          } catch (e) {
            notice.hide();
            showError("research failed", e);
          }
        }
      }).open();
    }
  });
  plugin.addCommand({
    id: "save-selection-as-memory",
    name: "Save selection as Odysseus memory",
    editorCallback: async (editor) => {
      const selection = editor.getSelection();
      if (!selection) {
        new import_obsidian7.Notice("Odysseus: select some text first");
        return;
      }
      const status = working("saving memory");
      try {
        await plugin.client.memoryAdd(selection);
        new import_obsidian7.Notice("Odysseus: memory saved");
      } catch (e) {
        showError("memory add failed", e);
      } finally {
        status.done();
      }
    }
  });
  plugin.addCommand({
    id: "run-skill-on-selection",
    name: "Run skill on selection\u2026",
    editorCallback: (editor) => {
      const selection = editor.getSelection();
      if (!selection) {
        new import_obsidian7.Notice("Odysseus: select some text first");
        return;
      }
      new SkillsPickerModal(plugin, async (skill) => {
        const tag = skill.id ? `@skill:${skill.id}` : `@skill:${skill.name}`;
        const prompt = `${tag}

Apply this skill to the following selection. Output only the result, no commentary.

---

${selection}`;
        const notice = new import_obsidian7.Notice("Odysseus: running skill\u2026", 0);
        try {
          const result = clean(plugin, await plugin.client.chatOneshot(prompt));
          notice.hide();
          if (!result) {
            new import_obsidian7.Notice("Odysseus: empty response");
            return;
          }
          const apply = () => editor.replaceSelection(result);
          if (plugin.settings.previewBeforeReplace) {
            new PreviewModal(plugin.app, {
              title: `Skill: ${skill.name}`,
              originalText: selection,
              newText: result,
              onAccept: apply
            }).open();
          } else {
            apply();
          }
        } catch (e) {
          notice.hide();
          showError("skill failed", e);
        }
      }).open();
    }
  });
  plugin.addCommand({
    id: "run-skill",
    name: "Run skill against active note\u2026",
    editorCallback: async (_editor, view) => {
      const file = view.file;
      if (!file) {
        new import_obsidian7.Notice("Odysseus: open a note first");
        return;
      }
      new SkillsPickerModal(plugin, async (skill) => {
        try {
          const content = await plugin.app.vault.read(file);
          const tag = skill.id ? `@skill:${skill.id}` : `@skill:${skill.name}`;
          const prompt = `${tag}

Apply this skill to the following note:

${content}`;
          const notice = new import_obsidian7.Notice("Odysseus: running skill\u2026", 0);
          const raw = await plugin.client.chatOneshot(prompt);
          const text = clean(plugin, raw);
          notice.hide();
          if (!text) {
            new import_obsidian7.Notice("Odysseus: empty response");
            return;
          }
          const target = `${file.parent?.path ? file.parent.path + "/" : ""}${file.basename} \u2014 ${skill.name}.md`;
          if (plugin.app.vault.getAbstractFileByPath(target)) {
            new import_obsidian7.Notice(`Odysseus: ${target} already exists`);
            return;
          }
          await plugin.app.vault.create(target, text);
          new import_obsidian7.Notice(`Odysseus: result saved to ${target}`);
        } catch (e) {
          showError("skill failed", e);
        }
      }).open();
    }
  });
  plugin.addCommand({
    id: "run-prompt-template",
    name: "Run prompt template\u2026",
    editorCheckCallback: (checking, editor, view) => {
      if (!(view instanceof import_obsidian7.MarkdownView)) {
        if (!checking) {
          void Promise.resolve().then(() => (init_prompt_templates(), prompt_templates_exports)).then(({ PromptTemplatePickerModal: PromptTemplatePickerModal2, runPromptTemplate: runPromptTemplate2 }) => {
            new PromptTemplatePickerModal2(plugin, (t) => {
              void runPromptTemplate2(plugin, t, { mode: "chat" });
            }).open();
          });
        }
        return true;
      }
      if (!checking) {
        void Promise.resolve().then(() => (init_prompt_templates(), prompt_templates_exports)).then(({ PromptTemplatePickerModal: PromptTemplatePickerModal2, runPromptTemplate: runPromptTemplate2 }) => {
          new PromptTemplatePickerModal2(plugin, (t) => {
            void runPromptTemplate2(plugin, t, { mode: "chat", editor, view });
          }).open();
        });
      }
      return true;
    }
  });
  plugin.addCommand({
    id: "apply-prompt-template-to-selection",
    name: "Apply prompt template to selection\u2026",
    editorCallback: (editor, view) => {
      const selection = editor.getSelection();
      if (!selection) {
        new import_obsidian7.Notice("Odysseus: select some text first");
        return;
      }
      void Promise.resolve().then(() => (init_prompt_templates(), prompt_templates_exports)).then(({ PromptTemplatePickerModal: PromptTemplatePickerModal2, runPromptTemplate: runPromptTemplate2 }) => {
        new PromptTemplatePickerModal2(plugin, (t) => {
          void runPromptTemplate2(plugin, t, { mode: "replace", editor, view });
        }).open();
      });
    }
  });
  plugin.addCommand({
    id: "save-last-reply",
    name: "Save last chat reply to a new note\u2026",
    callback: async () => {
      const reply = await getLastAssistantReply(plugin);
      if (!reply) {
        new import_obsidian7.Notice("Odysseus: no recent assistant reply found");
        return;
      }
      new QuickPromptModal(plugin, {
        title: "Save reply to note",
        placeholder: "e.g. Drafts/My new note.md",
        defaultValue: suggestNoteName(reply),
        onSubmit: async (path) => {
          let final = path.trim();
          if (!final.endsWith(".md")) final += ".md";
          if (plugin.app.vault.getAbstractFileByPath(final)) {
            new import_obsidian7.Notice(`Odysseus: ${final} already exists`);
            return;
          }
          const parts = final.split("/");
          if (parts.length > 1) {
            const dir = parts.slice(0, -1).join("/");
            if (!plugin.app.vault.getAbstractFileByPath(dir)) await plugin.app.vault.createFolder(dir);
          }
          await plugin.app.vault.create(final, reply);
          new import_obsidian7.Notice(`Odysseus: saved to ${final}`);
        }
      }).open();
    }
  });
  plugin.addCommand({
    id: "append-last-reply",
    name: "Append last chat reply to active note",
    editorCallback: async (editor, view) => {
      const file = view.file;
      if (!file) return;
      const reply = await getLastAssistantReply(plugin);
      if (!reply) {
        new import_obsidian7.Notice("Odysseus: no recent assistant reply found");
        return;
      }
      const cur = await plugin.app.vault.read(file);
      const sep = cur.endsWith("\n\n") ? "" : cur.endsWith("\n") ? "\n" : "\n\n";
      await plugin.app.vault.modify(file, cur + sep + reply);
      new import_obsidian7.Notice(`Odysseus: appended to ${file.basename}`);
    }
  });
  plugin.addCommand({
    id: "import-pdf-to-odysseus",
    name: "Import vault PDF to Odysseus documents\u2026",
    callback: async () => {
      const { VaultFilePickerModal: VaultFilePickerModal2 } = await Promise.resolve().then(() => (init_skills_modal(), skills_modal_exports));
      new VaultFilePickerModal2(plugin, async (file) => {
        if (file.extension.toLowerCase() !== "pdf") {
          new import_obsidian7.Notice("Odysseus: pick a .pdf file");
          return;
        }
        const status = working(`importing ${file.name}`);
        try {
          const buf = await plugin.app.vault.readBinary(file);
          const result = await plugin.client.importPdf(file.name, buf);
          if (!result.ok) {
            showError("PDF import failed", new Error(result.error ?? "unknown"));
            return;
          }
          new import_obsidian7.Notice(`Odysseus: imported ${file.name}${result.docId ? ` (id=${result.docId})` : ""}`);
        } catch (e) {
          showError("PDF import failed", e);
        } finally {
          status.done();
        }
      }, (f) => f.extension.toLowerCase() === "pdf").open();
    }
  });
  plugin.addCommand({
    id: "index-vault-folder-into-odysseus",
    name: "Index vault folder into Odysseus RAG (personal documents)\u2026",
    callback: async () => {
      const { VaultFolderPickerModal: VaultFolderPickerModal2 } = await Promise.resolve().then(() => (init_skills_modal(), skills_modal_exports));
      new VaultFolderPickerModal2(plugin, async (folder) => {
        const status = working(`uploading ${folder.path} to Odysseus RAG`);
        try {
          let okCount = 0;
          let failCount = 0;
          const files = [];
          const collect = (f) => {
            for (const child of f.children) {
              if (child instanceof import_obsidian7.TFile && /^(md|txt|markdown)$/i.test(child.extension)) {
                files.push(child);
              } else if (typeof child.children !== "undefined") {
                collect(child);
              }
            }
          };
          collect(folder);
          for (const f of files) {
            const buf = await plugin.app.vault.readBinary(f);
            const r = await plugin.client.personalUpload(f.name, buf, "text/plain");
            if (r.ok) okCount++;
            else failCount++;
          }
          await plugin.client.personalReload();
          new import_obsidian7.Notice(`Odysseus: indexed ${okCount} files from ${folder.path}${failCount ? `, ${failCount} failed` : ""}`);
        } catch (e) {
          showError("personal indexing failed", e);
        } finally {
          status.done();
        }
      }).open();
    }
  });
  plugin.addCommand({
    id: "list-personal-rag",
    name: "List Odysseus personal RAG entries",
    callback: async () => {
      const entries = await plugin.client.personalList();
      if (entries.length === 0) {
        new import_obsidian7.Notice("Odysseus: no personal RAG entries");
        return;
      }
      const lines = entries.map((e) => `- ${e.path}${e.type ? ` (${e.type})` : ""}`).join("\n");
      new QuickPromptModal(plugin, {
        title: `Personal RAG (${entries.length})`,
        placeholder: "",
        defaultValue: lines,
        onSubmit: () => void 0
      }).open();
    }
  });
  plugin.addCommand({
    id: "audit-odysseus-skills",
    name: "Audit Odysseus skills (background)\u2026",
    callback: async () => {
      const status = working("starting skills audit");
      try {
        const result = await plugin.client.startSkillsAudit();
        if (!result.ok) {
          showError("audit start failed", new Error(result.error ?? "unknown"));
          return;
        }
        new import_obsidian7.Notice("Odysseus: skills audit started. Check Odysseus web UI for progress.");
      } catch (e) {
        showError("audit failed", e);
      } finally {
        status.done();
      }
    }
  });
  plugin.addCommand({
    id: "ping-server",
    name: "Test connection",
    callback: async () => {
      const ok = await plugin.client.ping();
      new import_obsidian7.Notice(ok ? "Odysseus: reachable" : "Odysseus: not reachable");
    }
  });
}
async function getLastAssistantReply(plugin) {
  const sid = plugin.settings.lastSessionId;
  if (!sid) return null;
  try {
    const history = await plugin.client.getSessionHistory(sid);
    for (let i = history.length - 1; i >= 0; i--) {
      if (history[i].role === "assistant" && history[i].content) return history[i].content;
    }
  } catch {
    return null;
  }
  return null;
}
function suggestNoteName(text) {
  const heading = text.match(/^#+\s+(.+)$/m);
  const raw = heading ? heading[1] : text.split(/\s+/).slice(0, 8).join(" ");
  return raw.replace(/[\\/:*?"<>|]/g, " ").trim().slice(0, 60) + ".md";
}
async function runOnNote(plugin, file, instruction, newNoteSuffix, opts = {}) {
  const status = working(newNoteSuffix.toLowerCase().includes("polish") ? "polishing note" : `${newNoteSuffix.toLowerCase()}`);
  try {
    const content = await plugin.app.vault.read(file);
    const prompt = `${instruction}

---

${content}`;
    const raw = await plugin.client.chatOneshot(prompt);
    const text = clean(plugin, raw);
    if (!text) {
      new import_obsidian7.Notice("Odysseus: empty response");
      return;
    }
    if (opts.replace) {
      confirmAndApply(plugin, `${newNoteSuffix} \u2013 ${file.basename}`, content, text, async () => {
        await plugin.app.vault.modify(file, text);
        new import_obsidian7.Notice(`Odysseus: ${newNoteSuffix.toLowerCase()} written back to note`);
      });
    } else {
      const target = await uniqueChildPath(plugin, file, newNoteSuffix);
      await plugin.app.vault.create(target, text);
      new import_obsidian7.Notice(`Odysseus: ${newNoteSuffix.toLowerCase()} saved to ${target}`);
    }
  } catch (e) {
    showError("note action failed", e);
  } finally {
    status.done();
  }
}
async function runSplitNote(plugin, file) {
  const status = working("splitting note");
  try {
    const dir = file.parent?.path ? file.parent.path + "/" : "";
    const destFolder = `${dir}${file.basename}`;
    const res = await splitNoteByHeadings(plugin, file, { destFolder });
    if ("error" in res) {
      new import_obsidian7.Notice(`Odysseus: ${res.error}`);
      return;
    }
    if (res.created.length === 0) {
      new import_obsidian7.Notice(`Odysseus: nothing to split${res.skipped.length ? ` (${res.skipped.length} already existed)` : ""}`);
      return;
    }
    new import_obsidian7.Notice(
      `Odysseus: split into ${res.created.length} note(s) in "${destFolder}/" (level ${res.level})` + (res.skipped.length ? `, ${res.skipped.length} skipped` : "")
    );
  } catch (e) {
    showError("split failed", e);
  } finally {
    status.done();
  }
}
async function uniqueChildPath(plugin, base, suffix) {
  const dir = base.parent?.path ?? "";
  const stem = base.basename;
  const ext = base.extension;
  let candidate = `${dir ? dir + "/" : ""}${stem} \u2014 ${suffix}.${ext}`;
  let n = 2;
  while (plugin.app.vault.getAbstractFileByPath(candidate)) {
    candidate = `${dir ? dir + "/" : ""}${stem} \u2014 ${suffix} ${n}.${ext}`;
    n++;
  }
  return candidate;
}
async function waitForResearch(plugin, sid, timeoutMs = 5 * 6e4) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const r = await plugin.client.researchResult(sid, true);
    if (r && r.result) return r;
    await new Promise((res) => setTimeout(res, 3e3));
  }
  return null;
}
async function writeResearchNote(plugin, query, result) {
  let body = result.result ?? "(no result text)";
  if (Array.isArray(result.sources) && result.sources.length > 0) {
    const srcLines = result.sources.map((s, i) => {
      const r = s;
      const url = String(r.url ?? r.link ?? r ?? "");
      const title = typeof r.title === "string" ? r.title : url;
      return `${i + 1}. [${title}](${url})`;
    });
    body += `

## Sources

${srcLines.join("\n")}`;
  }
  const safe = query.replace(/[\\/:*?"<>|]/g, " ").slice(0, 80).trim() || "Research";
  let path = `Odysseus Research/${safe}.md`;
  let n = 2;
  await ensureFolder(plugin, "Odysseus Research");
  while (plugin.app.vault.getAbstractFileByPath(path)) {
    path = `Odysseus Research/${safe} ${n}.md`;
    n++;
  }
  const content = `# ${safe}

_Query:_ ${query}

${body}
`;
  await plugin.app.vault.create(path, content);
  new import_obsidian7.Notice(`Odysseus: research saved to ${path}`);
}
async function ensureFolder(plugin, path) {
  if (!plugin.app.vault.getAbstractFileByPath(path)) {
    await plugin.app.vault.createFolder(path);
  }
}

// context-menu.ts
var import_obsidian8 = require("obsidian");
init_odysseus_api();
init_preview_modal();
init_skills_modal();
function clean2(plugin, text) {
  return plugin.settings.hideReasoning ? stripReasoning(text) : text;
}
var submenuSupport = null;
function supportsSubmenus() {
  if (submenuSupport !== null) return submenuSupport;
  try {
    const probe = new import_obsidian8.Menu();
    let ok = false;
    probe.addItem((it) => {
      ok = typeof it.setSubmenu === "function";
    });
    submenuSupport = ok;
  } catch {
    submenuSupport = false;
  }
  return submenuSupport;
}
function registerContextMenus(plugin) {
  plugin.registerEvent(
    plugin.app.workspace.on("editor-menu", (menu, editor, view) => {
      const selection = editor.getSelection();
      if (!selection) return;
      addOdysseusEditorMenu(menu, plugin, editor, selection);
    })
  );
  plugin.registerEvent(
    plugin.app.workspace.on("file-menu", (menu, file) => {
      if (!(file instanceof import_obsidian8.TFile) || file.extension !== "md") return;
      menu.addItem(
        (item) => item.setTitle("Odysseus: Summarize note").setIcon("file-text").onClick(async () => {
          const status = working("summarizing note");
          try {
            const content = await plugin.app.vault.read(file);
            const raw = await plugin.client.chatOneshot(
              `Summarize this note in concise bullet points.

---

${content}`
            );
            const text = clean2(plugin, raw);
            const target = `${file.parent?.path ? file.parent.path + "/" : ""}${file.basename} \u2014 Summary.md`;
            if (plugin.app.vault.getAbstractFileByPath(target)) {
              new import_obsidian8.Notice(`Odysseus: ${target} already exists`);
              return;
            }
            await plugin.app.vault.create(target, text || "(no response)");
            new import_obsidian8.Notice(`Odysseus: summary saved to ${target}`);
          } catch (e) {
            showError("summarize failed", e);
          } finally {
            status.done();
          }
        })
      );
      menu.addItem(
        (item) => item.setTitle("Odysseus: Split note by headings").setIcon("scissors").onClick(() => runSplitNote(plugin, file))
      );
    })
  );
}
function addOdysseusEditorMenu(menu, plugin, editor, selection) {
  const wireGroup = (host, group) => {
    if (group === "refine") {
      host.addItem((i) => i.setTitle("Polish").setIcon("sparkles").onClick(() => runRewrite(plugin, editor, selection, "Polish this writing: improve clarity, grammar, and flow. Keep voice and meaning unchanged.")));
      host.addItem((i) => i.setTitle("Rewrite for clarity").setIcon("wand-2").onClick(() => runRewrite(plugin, editor, selection, "Rewrite for clarity, keep meaning.")));
      host.addItem((i) => i.setTitle("Simplify").setIcon("minimize-2").onClick(() => runRewrite(plugin, editor, selection, "Simplify this text while preserving meaning.")));
      host.addItem((i) => i.setTitle("Fix grammar").setIcon("check-circle").onClick(() => runRewrite(plugin, editor, selection, "Fix grammar and spelling only. Do not change voice or meaning.")));
    } else if (group === "transform") {
      host.addItem(
        (i) => i.setTitle("Expand (web)").setIcon("expand").onClick(
          () => runAdvancedAction(plugin, editor, selection, {
            title: "Expand selection",
            instruction: "Expand the selected text into a more detailed version. Add depth, clarification, and supporting points without inventing facts. Preserve markdown formatting (lists, headings, code, links). If web search is available, incorporate factual information from current sources. Do not add commentary or meta-statements. Output only the expanded text.",
            useWebSearch: true
          })
        )
      );
      host.addItem(
        (i) => i.setTitle("Shorten").setIcon("minimize-2").onClick(
          () => runAdvancedAction(plugin, editor, selection, {
            title: "Shorten selection",
            instruction: "Shorten the selected text to roughly half its length while keeping all essential facts and arguments. Preserve markdown formatting. Output only the shortened text."
          })
        )
      );
      host.addItem(
        (i) => i.setTitle("Make a list").setIcon("list").onClick(
          () => runAdvancedAction(plugin, editor, selection, {
            title: "Convert to list",
            instruction: "Convert the selected prose into a Markdown bulleted list. Each bullet is a single self-contained point. Preserve all facts and ordering. Do not add introductions or summaries. Output only the bulleted list."
          })
        )
      );
      host.addItem(
        (i) => i.setTitle("Make a heading").setIcon("heading").onClick(
          () => runAdvancedAction(plugin, editor, selection, {
            title: "Make a heading",
            instruction: "Generate a concise Markdown heading (## level 2) that summarizes the selected text. Keep it 5-8 words, title case. Output ONLY the heading line and nothing else.",
            compose: (sel, result) => `${result.trim()}

${sel}`
          })
        )
      );
      host.addItem(
        (i) => i.setTitle("Continue writing").setIcon("pen").onClick(
          () => runAdvancedAction(plugin, editor, selection, {
            title: "Continue writing",
            instruction: "Continue the selected text seamlessly. Add approximately 2 paragraphs that pick up exactly where it ends, matching its voice, tone, and formatting. Do not repeat the existing text. Do not add commentary. Output only the continuation, starting immediately after where the original ends.",
            compose: (sel, result) => `${sel}

${result.trim()}`
          })
        )
      );
    } else {
      host.addItem(
        (i) => i.setTitle(`Translate to ${plugin.settings.defaultTargetLanguage}`).setIcon("languages").onClick(
          () => runRewrite(
            plugin,
            editor,
            selection,
            `Translate the following into ${plugin.settings.defaultTargetLanguage}. Output only the translation.`
          )
        )
      );
      host.addItem(
        (i) => i.setTitle("Fact check (with sources)").setIcon("check-square").onClick(
          () => runAdvancedAction(plugin, editor, selection, {
            title: "Fact check",
            instruction: [
              "Fact-check the selected text. Identify factual claims and verify each using current web sources if available.",
              "",
              "Wrap your entire output in a Markdown callout exactly like this:",
              "",
              "> [!check] Fact check",
              "> - Verified: <claim> \u2014 Source: <URL or citation>",
              "> - Uncertain: <claim> \u2014 Reason: <brief note>",
              "> - Incorrect: <claim> \u2014 Correction: <fact>. Source: <URL or citation>",
              ">",
              "> **Sources**",
              "> 1. <URL>",
              "> 2. <URL>",
              "",
              "Use Verified / Uncertain / Incorrect prefixes verbatim. Cite every claim. Do not rewrite the selection. Output only the fact-check callout, nothing else."
            ].join("\n"),
            useWebSearch: true,
            compose: (sel, result) => `${sel}

${result.trim()}`
          })
        )
      );
      host.addItem(
        (i) => i.setTitle("Run prompt template\u2026").setIcon("file-text").onClick(async () => {
          const { PromptTemplatePickerModal: PromptTemplatePickerModal2, runPromptTemplate: runPromptTemplate2 } = await Promise.resolve().then(() => (init_prompt_templates(), prompt_templates_exports));
          new PromptTemplatePickerModal2(plugin, (t) => {
            void runPromptTemplate2(plugin, t, { mode: "replace", editor });
          }).open();
        })
      );
      host.addItem(
        (i) => i.setTitle("Run skill on selection\u2026").setIcon("wand").onClick(() => {
          new SkillsPickerModal(plugin, (skill) => {
            const tag = skill.id ? `@skill:${skill.id}` : `@skill:${skill.name}`;
            runAdvancedAction(plugin, editor, selection, {
              title: `Skill: ${skill.name}`,
              instruction: `${tag}

Apply this skill to the following selection. Output only the result, no commentary.`
            });
          }).open();
        })
      );
      host.addItem(
        (i) => i.setTitle("Save as memory").setIcon("brain").onClick(async () => {
          try {
            await plugin.client.memoryAdd(selection);
            new import_obsidian8.Notice("Odysseus: memory saved");
          } catch (e) {
            showError("memory add failed", e);
          }
        })
      );
    }
  };
  if (supportsSubmenus()) {
    menu.addItem((parent) => {
      parent.setTitle("Odysseus").setIcon("bot");
      const sub = parent.setSubmenu();
      wireGroup(sub, "refine");
      sub.addSeparator();
      wireGroup(sub, "transform");
      sub.addSeparator();
      wireGroup(sub, "other");
    });
  } else {
    wireGroup(menu, "refine");
    wireGroup(menu, "transform");
    wireGroup(menu, "other");
  }
}
async function runAdvancedAction(plugin, editor, selection, opts) {
  const status = working(opts.useWebSearch ? "searching the web" : opts.title.toLowerCase());
  try {
    let raw;
    if (opts.useWebSearch) {
      const prompt = `${opts.instruction}

---

${selection}`;
      raw = await plugin.client.chatOneshot(prompt, {
        useWebSearch: true,
        mode: "agent"
      });
    } else {
      raw = await plugin.client.rewriteOneshot(selection, opts.instruction);
    }
    const result = clean2(plugin, raw);
    if (!result) {
      new import_obsidian8.Notice("Odysseus: empty response");
      return;
    }
    const composer = opts.compose ?? ((_sel, r) => r);
    const finalText = composer(selection, result);
    const apply = () => editor.replaceSelection(finalText);
    if (plugin.settings.previewBeforeReplace) {
      new PreviewModal(plugin.app, {
        title: opts.title,
        originalText: selection,
        newText: finalText,
        onAccept: apply
      }).open();
    } else {
      apply();
    }
  } catch (e) {
    showError(`${opts.title} failed`, e);
  } finally {
    status.done();
  }
}
async function runRewrite(plugin, editor, selection, instruction) {
  const status = working("thinking");
  try {
    const result = clean2(plugin, await plugin.client.rewriteOneshot(selection, instruction));
    if (!result) {
      new import_obsidian8.Notice("Odysseus: empty response");
      return;
    }
    const apply = () => editor.replaceSelection(result);
    if (plugin.settings.previewBeforeReplace) {
      new PreviewModal(plugin.app, {
        title: "Replace selection",
        originalText: selection,
        newText: result,
        onAccept: apply
      }).open();
    } else {
      apply();
    }
  } catch (e) {
    showError("rewrite failed", e);
  } finally {
    status.done();
  }
}

// settings-view.ts
var import_obsidian9 = require("obsidian");
var OdysseusSettingTab = class extends import_obsidian9.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  hide() {
    void this.plugin.client.updateServerSettings({ agent_profiles: this.plugin.settings.agentProfiles ?? [] }).catch(() => {
    });
  }
  display() {
    const root = this.containerEl;
    root.empty();
    root.createEl("h2", { text: "Odysseus AI" });
    const section = (title, open = false) => {
      const det = root.createEl("details", { cls: "odysseus-settings-section" });
      det.open = open;
      det.createEl("summary", { cls: "odysseus-settings-summary", text: title });
      return det.createDiv({ cls: "odysseus-settings-section-body" });
    };
    const secConnection = section("Connection", true);
    const secChat = section("Chat behavior");
    const secVoice = section("Voice \u2014 speech-to-text & text-to-speech");
    const secPersonas = section("Personas & prompt templates");
    const secModels = section("Models & agent profiles");
    const secVault = section("Vault tools & indexing");
    let containerEl = secConnection;
    new import_obsidian9.Setting(containerEl).setName("Server URL").setDesc("Your Odysseus instance, e.g. http://localhost:7000").addText(
      (t) => t.setPlaceholder("http://localhost:7000").setValue(this.plugin.settings.baseUrl).onChange(async (v) => {
        this.plugin.settings.baseUrl = v.trim();
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian9.Setting(containerEl).setName("Auth mode").setDesc("API token = single Bearer token; identity is pseudo-user 'api'. Username+password = real user, with full bidirectional visibility into the Odysseus web UI.").addDropdown(
      (d) => d.addOption("token", "API token (Bearer)").addOption("password", "Username + password (cookie)").setValue(this.plugin.settings.authMode).onChange(async (v) => {
        this.plugin.settings.authMode = v === "password" ? "password" : "token";
        await this.plugin.saveSettings();
        this.display();
      })
    );
    if (this.plugin.settings.authMode === "token") {
      new import_obsidian9.Setting(containerEl).setName("API token").setDesc("Bearer token issued by Odysseus (admin \u2192 API tokens). Starts with ody_.").addText((t) => {
        t.inputEl.type = "password";
        t.setPlaceholder("ody_\u2026").setValue(this.plugin.settings.apiToken).onChange(async (v) => {
          this.plugin.settings.apiToken = v.trim();
          await this.plugin.saveSettings();
        });
      });
    } else {
      new import_obsidian9.Setting(containerEl).setName("Username").addText(
        (t) => t.setPlaceholder("obsidian").setValue(this.plugin.settings.username).onChange(async (v) => {
          this.plugin.settings.username = v.trim();
          await this.plugin.saveSettings();
        })
      );
      new import_obsidian9.Setting(containerEl).setName("Password").setDesc("Stored locally in Obsidian's data.json (plaintext on disk). Used to log in and to auto-re-login when the session expires.").addText((t) => {
        t.inputEl.type = "password";
        t.setValue(this.plugin.settings.password).onChange(async (v) => {
          this.plugin.settings.password = v;
          await this.plugin.saveSettings();
        });
      });
      new import_obsidian9.Setting(containerEl).setName("Log in").setDesc(
        this.plugin.settings.sessionCookie ? "A session cookie is currently cached. Click to refresh." : "No active session. Click to log in with the credentials above."
      ).addButton(
        (b) => b.setButtonText("Log in").setCta().onClick(async () => {
          try {
            await this.plugin.client.login();
            const status = await this.plugin.client.authStatus();
            new import_obsidian9.Notice(
              status.ok ? `Odysseus: logged in${status.username ? ` as ${status.username}` : ""}` : "Odysseus: login returned but session looks invalid"
            );
            this.display();
          } catch (e) {
            new import_obsidian9.Notice("Odysseus: " + (e.message ?? String(e)), 8e3);
          }
        })
      ).addButton(
        (b) => b.setButtonText("Log out").onClick(async () => {
          await this.plugin.client.logout();
          new import_obsidian9.Notice("Odysseus: logged out");
          this.display();
        })
      );
    }
    new import_obsidian9.Setting(containerEl).setName("Test connection").setDesc("Pings the server with your current settings.").addButton(
      (b) => b.setButtonText("Ping").onClick(async () => {
        const ok = await this.plugin.client.ping();
        new import_obsidian9.Notice(ok ? "Odysseus: reachable" : "Odysseus: not reachable");
      })
    );
    containerEl = secChat;
    containerEl.createEl("h3", { text: "Chat defaults" });
    new import_obsidian9.Setting(containerEl).setName("Preview before replacing").setDesc("Show the proposed change in a modal with Accept / Reject buttons before any edit is applied to your note.").addToggle(
      (t) => t.setValue(this.plugin.settings.previewBeforeReplace).onChange(async (v) => {
        this.plugin.settings.previewBeforeReplace = v;
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian9.Setting(containerEl).setName("Auto-delete one-shot sessions").setDesc("Delete the throwaway Odysseus session created by Rewrite, Polish, Summarize, and similar commands as soon as the task finishes. Keeps your Odysseus session list clean. Chat panel sessions are never deleted.").addToggle(
      (t) => t.setValue(this.plugin.settings.autoDeleteOneshotSessions).onChange(async (v) => {
        this.plugin.settings.autoDeleteOneshotSessions = v;
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian9.Setting(containerEl).setName("Inline full content for @-mentioned notes").setDesc("When OFF (default), @[[Note Name]] in chat just tells the model the note exists at that path. Turn ON to also inline the full text. Off keeps prompts small; turn on if you actually want the model to read the note's content via @-mention.").addToggle(
      (t) => t.setValue(this.plugin.settings.inlineMentionedNoteContent).onChange(async (v) => {
        this.plugin.settings.inlineMentionedNoteContent = v;
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian9.Setting(containerEl).setName("Max characters per attached note").setDesc("Cap per note when inlining vault content as context (active note, @-mentions, folders, recent notes). 0 = no limit. Default 32,000 \u2014 enough for most single notes; lower if you attach many notes at once. 8,000 was the old default; bump higher if the model says context was truncated.").addText(
      (t) => t.setPlaceholder("32000").setValue(String(this.plugin.settings.maxContextCharsPerFile)).onChange(async (v) => {
        const n = parseInt(v, 10);
        this.plugin.settings.maxContextCharsPerFile = Number.isFinite(n) && n >= 0 ? n : 32e3;
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian9.Setting(containerEl).setName("Max attachment size (MB)").setDesc(
      "Per-file cap for the Attach button (external files). \u26A0\uFE0F This is only a pre-upload guard \u2014 what actually fits is bounded by the model's context window, not the file size, so a file under this cap can still be too big. Rough text\u2192tokens (\u22484 chars/token): 10 KB \u2248 2.5k tokens \xB7 100 KB \u2248 25k tokens \xB7 1 MB of plain text \u2248 250k tokens (bigger than most windows). PDFs/Office files are mostly formatting, so their readable text is far smaller than the file size; images cost a flat ~1\u20131.5k tokens each (vision)."
    ).addText(
      (t) => t.setPlaceholder("25").setValue(String(this.plugin.settings.attachmentMaxMB)).onChange(async (v) => {
        const n = parseInt(v, 10);
        this.plugin.settings.attachmentMaxMB = Number.isFinite(n) && n > 0 ? n : 25;
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian9.Setting(containerEl).setName("Prompt to compact at 90% context").setDesc("When the chat's context pill crosses 90% used, show a notice with a one-click Compact button. Stops you from running out of room mid-conversation.").addToggle(
      (t) => t.setValue(this.plugin.settings.promptCompactAt90).onChange(async (v) => {
        this.plugin.settings.promptCompactAt90 = v;
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian9.Setting(containerEl).setName("Hide reasoning").setDesc("Strip <think>\u2026</think> blocks from model output before showing or saving. Recommended for Qwen, DeepSeek, and other reasoning models.").addToggle(
      (t) => t.setValue(this.plugin.settings.hideReasoning).onChange(async (v) => {
        this.plugin.settings.hideReasoning = v;
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian9.Setting(containerEl).setName("Mode").setDesc("Plain chat or agentic mode (tool use, web search, etc.)").addDropdown(
      (d) => d.addOption("chat", "Chat").addOption("agent", "Agent").setValue(this.plugin.settings.mode).onChange(async (v) => {
        this.plugin.settings.mode = v === "agent" ? "agent" : "chat";
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian9.Setting(containerEl).setName("Use RAG (vault search context)").addToggle(
      (t) => t.setValue(this.plugin.settings.useRag).onChange(async (v) => {
        this.plugin.settings.useRag = v;
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian9.Setting(containerEl).setName("Allow web search").addToggle(
      (t) => t.setValue(this.plugin.settings.useWebSearch).onChange(async (v) => {
        this.plugin.settings.useWebSearch = v;
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian9.Setting(containerEl).setName("Allow bash (agent only)").setDesc("Lets the agent run shell commands on the Odysseus server. Off by default.").addToggle(
      (t) => t.setValue(this.plugin.settings.allowBash).onChange(async (v) => {
        this.plugin.settings.allowBash = v;
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian9.Setting(containerEl).setName("Live streaming (experimental)").setDesc("Uses fetch() to stream tokens. Requires CORS to permit Obsidian's origin; falls back to non-streaming on error.").addToggle(
      (t) => t.setValue(this.plugin.settings.useStreaming).onChange(async (v) => {
        this.plugin.settings.useStreaming = v;
        await this.plugin.saveSettings();
      })
    );
    containerEl = secVoice;
    containerEl.createEl("h3", { text: "Voice" });
    containerEl.createEl("p", {
      text: "These switches control the plugin's UI; the controls only appear once the server reports the feature is ready. Configure the server providers/models below.",
      cls: "setting-item-description"
    });
    new import_obsidian9.Setting(containerEl).setName("Voice input (mic button)").setDesc("Show a microphone button by the chat input (when server STT is available). Click it to dictate; the transcript is inserted into the message box.").addToggle(
      (t) => t.setValue(this.plugin.settings.voiceInput).onChange(async (v) => {
        this.plugin.settings.voiceInput = v;
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian9.Setting(containerEl).setName("Read aloud button").setDesc("Adds a speaker button to each reply that synthesizes and plays it via server TTS.").addToggle(
      (t) => t.setValue(this.plugin.settings.ttsReadAloud).onChange(async (v) => {
        this.plugin.settings.ttsReadAloud = v;
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian9.Setting(containerEl).setName("Auto-play replies").setDesc("Speak replies sentence-by-sentence as they stream in (and auto-read Quick Ask answers). Off by default.").addToggle(
      (t) => t.setValue(this.plugin.settings.ttsAutoPlay).onChange(async (v) => {
        this.plugin.settings.ttsAutoPlay = v;
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian9.Setting(containerEl).setName("Hands-free: auto-send on pause").setDesc("When dictating, stop and send automatically after you stop talking (no button click). Quick Ask starts listening as soon as it opens. Needs STT enabled.").addToggle(
      (t) => t.setValue(this.plugin.settings.sttAutoSend).onChange(async (v) => {
        this.plugin.settings.sttAutoSend = v;
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian9.Setting(containerEl).setName("Pause length before auto-send (ms)").setDesc("How long a silence counts as 'done talking'. Lower = snappier but may cut you off mid-thought; higher = more patient. Default 1500.").addText(
      (t) => t.setPlaceholder("1500").setValue(String(this.plugin.settings.sttPauseMs)).onChange(async (v) => {
        const n = parseInt(v, 10);
        this.plugin.settings.sttPauseMs = Number.isFinite(n) && n >= 400 ? n : 1500;
        await this.plugin.saveSettings();
      })
    );
    this.renderServerSpeechConfig(containerEl);
    containerEl = secModels;
    this.renderAgentProfiles(containerEl);
    containerEl = secPersonas;
    containerEl.createEl("h3", { text: "System presets" });
    containerEl.createEl("p", {
      text: "Reusable system prompts prepended to the first message of each new chat. Pick the active one in the chat panel's preset dropdown.",
      attr: { style: "opacity: 0.7; font-size: 0.85em; margin-top: 0;" }
    });
    for (const preset of this.plugin.settings.presets) {
      const wrap = containerEl.createDiv({ cls: "odysseus-preset-row" });
      const head = wrap.createDiv({ cls: "odysseus-preset-head" });
      const nameInput = head.createEl("input", { type: "text", value: preset.name, attr: { placeholder: "Preset name" } });
      nameInput.addEventListener("input", async () => {
        preset.name = nameInput.value;
        await this.plugin.saveSettings();
      });
      const delBtn = head.createEl("button", { text: "Delete" });
      if (preset.id === "default") delBtn.disabled = true;
      delBtn.addEventListener("click", async () => {
        this.plugin.settings.presets = this.plugin.settings.presets.filter((p) => p.id !== preset.id);
        if (this.plugin.settings.activePresetId === preset.id) {
          this.plugin.settings.activePresetId = "default";
        }
        await this.plugin.saveSettings();
        this.display();
      });
      const promptInput = wrap.createEl("textarea", {
        attr: { rows: "4", placeholder: "System prompt for this preset (leave blank to disable)" }
      });
      promptInput.value = preset.prompt;
      promptInput.addEventListener("input", async () => {
        preset.prompt = promptInput.value;
        await this.plugin.saveSettings();
      });
    }
    new import_obsidian9.Setting(containerEl).addButton(
      (b) => b.setButtonText("+ Add preset").onClick(async () => {
        this.plugin.settings.presets.push({
          id: "p-" + Math.random().toString(36).slice(2, 8),
          name: "New preset",
          prompt: ""
        });
        await this.plugin.saveSettings();
        this.display();
      })
    );
    containerEl = secVault;
    containerEl.createEl("h3", { text: "Vault tools for Odysseus (MCP)" });
    const mcpDesc = containerEl.createEl("p", { attr: { style: "opacity:0.8; font-size:0.85em; margin-top:0;" } });
    mcpDesc.createSpan({ text: "Runs a local server (127.0.0.1 only) that gives Odysseus's agent real tools to search/read" });
    mcpDesc.createEl("strong", { text: " (and optionally write)" });
    mcpDesc.createSpan({ text: " your vault \u2014 far more robust than pasting note text into prompts. Works in the Odysseus web UI too. Tools exist only while Obsidian is open." });
    new import_obsidian9.Setting(containerEl).setName("Enable MCP vault server").setDesc("Start the local server. You then register it with Odysseus (button below).").addToggle(
      (t) => t.setValue(this.plugin.settings.mcpEnabled).onChange(async (v) => {
        this.plugin.settings.mcpEnabled = v;
        await this.plugin.saveSettings();
        try {
          if (v) {
            await this.plugin.startMcp();
            new import_obsidian9.Notice("Odysseus: MCP server started");
          } else {
            await this.plugin.stopMcp();
            new import_obsidian9.Notice("Odysseus: MCP server stopped");
          }
        } catch (e) {
          new import_obsidian9.Notice("Odysseus: MCP server failed \u2014 " + (e.message ?? ""), 8e3);
          this.plugin.settings.mcpEnabled = false;
          await this.plugin.saveSettings();
        }
        this.display();
      })
    );
    new import_obsidian9.Setting(containerEl).setName("Port").setDesc("Local port for the MCP server (default 7077). Change if it conflicts.").addText(
      (t) => t.setValue(String(this.plugin.settings.mcpPort)).onChange(async (v) => {
        const n = parseInt(v, 10);
        if (Number.isFinite(n) && n > 0 && n < 65536) {
          this.plugin.settings.mcpPort = n;
          await this.plugin.saveSettings();
        }
      })
    );
    new import_obsidian9.Setting(containerEl).setName("Allow writes").setDesc("Master switch for write tools (create/overwrite/append/frontmatter/move). Off = read-only.").addToggle(
      (t) => t.setValue(this.plugin.settings.mcpAllowWrites).onChange(async (v) => {
        this.plugin.settings.mcpAllowWrites = v;
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian9.Setting(containerEl).setName("Bias agent toward vault tools (Obsidian only)").setDesc("On the first agent-mode message of each chat from the plugin, add a one-time hint telling the model to prefer the vault tools for vault questions \u2014 and to still use other tools (web, etc.) when those fit better. The hint rides in the plugin's message, so the Odysseus web UI is unaffected. Re-injected once after a compaction.").addToggle(
      (t) => t.setValue(this.plugin.settings.biasVaultTools).onChange(async (v) => {
        this.plugin.settings.biasVaultTools = v;
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian9.Setting(containerEl).setName("Allow dangerous tools").setDesc("Master switch for destructive tools (delete_note, run_command). Keep off unless you trust the agent.").addToggle(
      (t) => t.setValue(this.plugin.settings.mcpAllowDangerous).onChange(async (v) => {
        this.plugin.settings.mcpAllowDangerous = v;
        await this.plugin.saveSettings();
      })
    );
    void (async () => {
      const { VAULT_TOOLS: VAULT_TOOLS2 } = await Promise.resolve().then(() => (init_mcp_tools(), mcp_tools_exports));
      const byCat = /* @__PURE__ */ new Map();
      for (const t of VAULT_TOOLS2) {
        if (!byCat.has(t.category)) byCat.set(t.category, []);
        byCat.get(t.category).push(t);
      }
      const disabled = new Set(this.plugin.settings.mcpDisabledTools ?? []);
      const toolsWrap = containerEl.createDiv();
      toolsWrap.createEl("p", { text: "Tools exposed to the agent \u2014 toggle any off. Write/dangerous tools also need their master switch above.", attr: { style: "opacity:0.7; font-size:0.85em; margin: 6px 0 0;" } });
      for (const [cat, tools] of byCat) {
        toolsWrap.createEl("div", { text: cat, attr: { style: "font-weight:600; font-size:0.8em; margin:10px 0 4px; opacity:0.8;" } });
        const grid = toolsWrap.createDiv({ cls: "odysseus-tools-grid" });
        for (const tool of tools) {
          const chip = grid.createEl("label", { cls: "odysseus-tool-chip", attr: { title: tool.description } });
          const cb = chip.createEl("input", { type: "checkbox" });
          cb.checked = !disabled.has(tool.name);
          chip.createSpan({ text: " " + tool.name + (tool.write ? " \u270E" : "") + (tool.dangerous ? " \u26A0" : "") });
          cb.addEventListener("change", async () => {
            const set = new Set(this.plugin.settings.mcpDisabledTools ?? []);
            if (cb.checked) set.delete(tool.name);
            else set.add(tool.name);
            this.plugin.settings.mcpDisabledTools = Array.from(set);
            await this.plugin.saveSettings();
          });
        }
      }
    })();
    if (this.plugin.settings.mcpEnabled && this.plugin.mcpServer) {
      const url = this.plugin.mcpServer.publicUrl();
      new import_obsidian9.Setting(containerEl).setName("Register with Odysseus").setDesc(`Server URL: ${url}  \u2014  click to register it as an MCP server in Odysseus (admin required).`).addButton(
        (b) => b.setButtonText("Register").setCta().onClick(async () => {
          const r = await this.plugin.client.addMcpServer({ name: "Obsidian Vault", url });
          if (r.ok) new import_obsidian9.Notice("Odysseus: vault registered as MCP server");
          else if (r.adminRequired) new import_obsidian9.Notice("Odysseus: admin required. Register manually in Odysseus \u2192 MCP with the URL shown.");
          else new import_obsidian9.Notice("Odysseus: register failed \u2014 " + (r.error ?? ""), 8e3);
        })
      ).addButton(
        (b) => b.setButtonText("Copy URL").onClick(async () => {
          await navigator.clipboard.writeText(url);
          new import_obsidian9.Notice("Odysseus: URL copied");
        })
      );
    }
    containerEl.createEl("h3", { text: "Vault indexing (Odysseus RAG)" });
    containerEl.createEl("p", {
      text: `Folders/files you've pushed into Odysseus's personal document index. Index new content with the command "Index vault folder into Odysseus RAG". These become searchable when you chat with RAG enabled.`,
      attr: { style: "opacity: 0.7; font-size: 0.85em; margin-top: 0;" }
    });
    const ragContainer = containerEl.createDiv();
    ragContainer.createEl("p", { text: "Loading\u2026", attr: { style: "opacity: 0.6;" } });
    const renderRag = async () => {
      ragContainer.empty();
      let entries = [];
      try {
        entries = await this.plugin.client.personalList();
      } catch {
        ragContainer.createEl("p", { text: "Could not reach Odysseus.", attr: { style: "color: var(--text-error);" } });
        return;
      }
      if (entries.length === 0) {
        ragContainer.createEl("p", { text: "Nothing indexed yet.", attr: { style: "opacity: 0.6;" } });
      } else {
        const list = ragContainer.createEl("ul", { attr: { style: "margin: 4px 0; padding-left: 20px;" } });
        for (const e of entries) {
          const li = list.createEl("li", { attr: { style: "margin-bottom: 3px;" } });
          li.createSpan({ text: e.path + (e.type ? `  (${e.type})` : ""), attr: { style: "font-family: var(--font-monospace); font-size: 0.85em;" } });
          const rm = li.createEl("button", { text: "remove", attr: { style: "margin-left: 8px; font-size: 0.75em;" } });
          rm.addEventListener("click", async () => {
            const r = await this.plugin.client.personalRemoveDirectory(e.path);
            if (!r.ok) new import_obsidian9.Notice(`Odysseus: remove failed (${r.error ?? "?"})`);
            else {
              new import_obsidian9.Notice("Odysseus: removed from index");
              void renderRag();
            }
          });
        }
      }
    };
    new import_obsidian9.Setting(containerEl).setName("Refresh index list").addButton((b) => b.setButtonText("Refresh").onClick(() => void renderRag()));
    void renderRag();
    containerEl = secPersonas;
    containerEl.createEl("h3", { text: "Prompt templates" });
    containerEl.createEl("p", {
      text: "Reusable prompts with variable substitution. Placeholders supported: {} (selection), {activeNote}, {[[Note Name]]}, {#tag1, #tag2}, {?note} (pick at invocation), {date}, {date:yyyy-MM-dd}. Invoke from the chat panel's \u{1F3AD} Templates button, the command palette, or right-click on a selection.",
      attr: { style: "opacity: 0.7; font-size: 0.85em; margin-top: 0;" }
    });
    for (const tpl of this.plugin.settings.promptTemplates) {
      const wrap = containerEl.createDiv({ cls: "odysseus-preset-row" });
      const head = wrap.createDiv({ cls: "odysseus-preset-head" });
      const nameInput = head.createEl("input", { type: "text", value: tpl.name, attr: { placeholder: "Template name" } });
      nameInput.addEventListener("input", async () => {
        tpl.name = nameInput.value;
        await this.plugin.saveSettings();
      });
      const delBtn = head.createEl("button", { text: "Delete" });
      delBtn.addEventListener("click", async () => {
        this.plugin.settings.promptTemplates = this.plugin.settings.promptTemplates.filter((t) => t.id !== tpl.id);
        await this.plugin.saveSettings();
        this.display();
      });
      const descInput = wrap.createEl("input", {
        type: "text",
        attr: { placeholder: "Short description (optional)", style: "width: 100%; margin-bottom: 6px;" }
      });
      descInput.value = tpl.description ?? "";
      descInput.addEventListener("input", async () => {
        tpl.description = descInput.value;
        await this.plugin.saveSettings();
      });
      const bodyInput = wrap.createEl("textarea", {
        attr: { rows: "8", placeholder: "Template body \u2014 use {}, {activeNote}, {[[Note]]}, {#tag}, {?note}\u2026" }
      });
      bodyInput.value = tpl.body;
      bodyInput.addEventListener("input", async () => {
        tpl.body = bodyInput.value;
        await this.plugin.saveSettings();
      });
    }
    new import_obsidian9.Setting(containerEl).addButton(
      (b) => b.setButtonText("+ Add template").onClick(async () => {
        this.plugin.settings.promptTemplates.push({
          id: "tpl-" + Math.random().toString(36).slice(2, 8),
          name: "New template",
          description: "",
          body: ""
        });
        await this.plugin.saveSettings();
        this.display();
      })
    );
    new import_obsidian9.Setting(containerEl).setName("Chat panel theme").setDesc('Apply an Odysseus theme to the chat panel only (the rest of Obsidian keeps its theme). "Match Obsidian" inherits your current Obsidian theme.').addDropdown(async (d) => {
      d.addOption("obsidian", "Match Obsidian");
      const { ODY_THEME_NAMES: ODY_THEME_NAMES2 } = await Promise.resolve().then(() => (init_themes(), themes_exports));
      for (const name of ODY_THEME_NAMES2) {
        d.addOption(name, name.charAt(0).toUpperCase() + name.slice(1));
      }
      d.setValue(this.plugin.settings.chatTheme || "obsidian");
      d.onChange(async (v) => {
        this.plugin.settings.chatTheme = v;
        await this.plugin.saveSettings();
        await this.plugin.applyTheme();
      });
    });
    new import_obsidian9.Setting(containerEl).setName("Apply theme to").setDesc("Chat panel only keeps the rest of Obsidian as-is. All of Obsidian themes the entire app with the selected Odysseus palette.").addDropdown(
      (d) => d.addOption("panel", "Chat panel only").addOption("global", "All of Obsidian").setValue(this.plugin.settings.chatThemeScope).onChange(async (v) => {
        this.plugin.settings.chatThemeScope = v === "global" ? "global" : "panel";
        await this.plugin.saveSettings();
        await this.plugin.applyTheme();
      })
    );
    new import_obsidian9.Setting(containerEl).setName("Default target language").setDesc("Used by the right-click Translate action.").addText(
      (t) => t.setValue(this.plugin.settings.defaultTargetLanguage).onChange(async (v) => {
        this.plugin.settings.defaultTargetLanguage = v.trim() || "Spanish";
        await this.plugin.saveSettings();
      })
    );
    containerEl = secModels;
    containerEl.createEl("h3", { text: "Model defaults" });
    containerEl.createEl("p", {
      text: "All three fields below are optional. If empty, the plugin asks Odysseus for the user-default endpoint/model via /api/default-chat \u2014 so anything you set in the Odysseus web UI (Settings \u2192 Default model) flows through automatically.",
      attr: { style: "opacity: 0.7; font-size: 0.85em; margin-top: 0;" }
    });
    new import_obsidian9.Setting(containerEl).setName("Default model (optional)").setDesc("Override the Odysseus user-default model. Leave blank to inherit.").addText(
      (t) => t.setPlaceholder("e.g. qwen/qwen3.5-9b").setValue(this.plugin.settings.defaultModel).onChange(async (v) => {
        this.plugin.settings.defaultModel = v.trim();
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian9.Setting(containerEl).setName("Default endpoint URL (optional)").setDesc("Override the Odysseus user-default endpoint URL. Leave blank to inherit. Example: http://127.0.0.1:1234/v1/chat/completions (LM Studio).").addText(
      (t) => t.setPlaceholder("http://127.0.0.1:1234/v1/chat/completions").setValue(this.plugin.settings.defaultEndpointUrl).onChange(async (v) => {
        this.plugin.settings.defaultEndpointUrl = v.trim();
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian9.Setting(containerEl).setName("Default endpoint id (optional)").setDesc("Override with a pre-registered Odysseus endpoint id. Leave blank to inherit. Find ids via Admin \u2192 Services or GET /api/model-endpoints.").addText(
      (t) => t.setValue(this.plugin.settings.defaultEndpointId).onChange(async (v) => {
        this.plugin.settings.defaultEndpointId = v.trim();
        await this.plugin.saveSettings();
      })
    );
  }
  // Agent profiles: specialized agent identities (behavior prompt + pinned
  // toolset + memory/skills flags), selectable from the chat panel. When one
  // is active the server skips RAG tool-retrieval and gives the agent exactly
  // the profile's tools (always-on ∪ priority).
  // Profiles are created/edited in the Odysseus web UI (Settings → AI Defaults
  // → Agent Profiles) and sync down via the server's agent_profiles setting.
  // The plugin keeps just a picker; the chat toolbar has the same selector.
  renderAgentProfiles(containerEl) {
    containerEl.createEl("h3", { text: "Agent profiles" });
    containerEl.createEl("p", {
      cls: "setting-item-description",
      text: "Specialized agents (behavior prompt, pinned toolset, memories, skills, model override) are created and edited in Odysseus: Settings \u2192 AI Defaults \u2192 Agent Profiles. They sync to the plugin automatically \u2014 pick the active one below or in the chat panel toolbar."
    });
    const profiles = this.plugin.settings.agentProfiles ?? [];
    new import_obsidian9.Setting(containerEl).setName("Active profile").setDesc(profiles.length > 0 ? "Applied to agent-mode messages from the chat panel." : "No profiles synced yet \u2014 create one in the Odysseus web UI, then reopen the chat panel.").addDropdown((d) => {
      d.addOption("", "No profile");
      for (const p of profiles) d.addOption(p.id, p.name || p.id);
      d.setValue(this.plugin.settings.activeAgentProfileId || "");
      d.onChange(async (v) => {
        this.plugin.settings.activeAgentProfileId = v;
        await this.plugin.saveSettings();
      });
    });
  }
  // Server-side speech config: provider/model/voice, stored in Odysseus's
  // data/settings.json (the same keys the web UI's STT/TTS settings write).
  // Controls are created with placeholders, then populated from
  // GET /api/auth/settings; each change is saved via POST /api/auth/settings.
  renderServerSpeechConfig(containerEl) {
    containerEl.createEl("h3", { text: "Speech providers (Odysseus server)" });
    const note = containerEl.createEl("p", {
      cls: "setting-item-description",
      text: "Reads and writes your Odysseus server's speech config (/api/auth/settings) \u2014 the same settings as Odysseus's own STT/TTS panel. Local providers need the engines installed on the server (faster-whisper for STT; Kokoro on CUDA for TTS). Endpoint providers are managed in Odysseus's own settings."
    });
    const KOKORO_VOICES = [
      ["af_heart", "Heart (F)"],
      ["af_bella", "Bella (F)"],
      ["af_nicole", "Nicole (F)"],
      ["af_sarah", "Sarah (F)"],
      ["af_aoede", "Aoede (F)"],
      ["af_kore", "Kore (F)"],
      ["af_nova", "Nova (F)"],
      ["af_sky", "Sky (F)"],
      ["af_alloy", "Alloy (F)"],
      ["af_river", "River (F)"],
      ["am_michael", "Michael (M)"],
      ["am_fenrir", "Fenrir (M)"],
      ["am_puck", "Puck (M)"],
      ["am_echo", "Echo (M)"],
      ["am_eric", "Eric (M)"],
      ["am_liam", "Liam (M)"],
      ["am_onyx", "Onyx (M)"],
      ["am_adam", "Adam (M)"]
    ];
    let sttEnable;
    let sttProvider;
    let sttModel;
    let sttLang;
    let ttsEnable;
    let ttsProvider;
    let ttsVoice;
    let ttsSpeed2;
    const save = async (patch) => {
      try {
        await this.plugin.client.updateServerSettings(patch);
        new import_obsidian9.Notice("Odysseus: speech settings saved");
      } catch (e) {
        new import_obsidian9.Notice(`Odysseus: save failed \u2014 ${e.message}`);
      }
    };
    new import_obsidian9.Setting(containerEl).setName("Speech-to-text").setHeading();
    new import_obsidian9.Setting(containerEl).setName("Enable STT").addToggle((t) => {
      sttEnable = t;
      t.onChange((v) => void save({ stt_enabled: v }));
    });
    new import_obsidian9.Setting(containerEl).setName("STT provider").setDesc("Local = faster-whisper on the server.").addDropdown((d) => {
      sttProvider = d;
      d.addOption("disabled", "Disabled").addOption("local", "Local (Whisper)");
      d.onChange((v) => void save({ stt_provider: v }));
    });
    new import_obsidian9.Setting(containerEl).setName("Whisper model").setDesc("Bigger = more accurate, slower. 'base' is a good default on CPU.").addDropdown((d) => {
      sttModel = d;
      ["tiny", "base", "small", "medium", "large-v3"].forEach((m) => d.addOption(m, m));
      d.onChange((v) => void save({ stt_model: v }));
    });
    new import_obsidian9.Setting(containerEl).setName("STT language").setDesc("Optional ISO code (e.g. en, es). Blank = auto-detect.").addText((t) => {
      sttLang = t;
      t.setPlaceholder("auto").onChange((v) => void save({ stt_language: v.trim() }));
    });
    new import_obsidian9.Setting(containerEl).setName("Text-to-speech").setHeading();
    new import_obsidian9.Setting(containerEl).setName("Enable TTS").addToggle((t) => {
      ttsEnable = t;
      t.onChange((v) => void save({ tts_enabled: v }));
    });
    new import_obsidian9.Setting(containerEl).setName("TTS provider").setDesc("Local = Kokoro on the server (requires a CUDA GPU).").addDropdown((d) => {
      ttsProvider = d;
      d.addOption("disabled", "Disabled").addOption("local", "Local (Kokoro)");
      d.onChange((v) => void save({ tts_provider: v }));
    });
    new import_obsidian9.Setting(containerEl).setName("Voice").setDesc("Kokoro voices (American English). af_* = female, am_* = male.").addDropdown((d) => {
      ttsVoice = d;
      for (const [id, label] of KOKORO_VOICES) d.addOption(id, label);
      d.onChange((v) => void save({ tts_voice: v }));
    });
    new import_obsidian9.Setting(containerEl).setName("Speed").addDropdown((d) => {
      ttsSpeed2 = d;
      ["0.75", "1", "1.25", "1.5"].forEach((s) => d.addOption(s, `${s}\xD7`));
      d.onChange((v) => void save({ tts_speed: v }));
    });
    void (async () => {
      try {
        const s = await this.plugin.client.getServerSettings();
        const str2 = (k, def = "") => typeof s[k] === "string" ? s[k] : def;
        sttEnable.setValue(s.stt_enabled !== false);
        const sp = str2("stt_provider", "disabled");
        if (sp.startsWith("endpoint:")) sttProvider.addOption(sp, "Endpoint (set in Odysseus)");
        sttProvider.setValue(sp || "disabled");
        sttModel.setValue(str2("stt_model", "base"));
        sttLang.setValue(str2("stt_language", ""));
        ttsEnable.setValue(s.tts_enabled !== false);
        const tp = str2("tts_provider", "disabled");
        if (tp.startsWith("endpoint:")) ttsProvider.addOption(tp, "Endpoint (set in Odysseus)");
        ttsProvider.setValue(tp || "disabled");
        const voice = str2("tts_voice", "af_heart");
        if (voice && !KOKORO_VOICES.some(([id]) => id === voice)) ttsVoice.addOption(voice, voice);
        ttsVoice.setValue(voice);
        ttsSpeed2.setValue(str2("tts_speed", "1"));
      } catch (e) {
        note.setText(`Could not load server speech settings (check Server URL / token): ${e.message}`);
      }
    })();
  }
};

// chat-view.ts
var import_obsidian11 = require("obsidian");
init_odysseus_api();
init_skills_modal();
init_voice();

// workspace-modal.ts
var import_obsidian10 = require("obsidian");
init_odysseus_api();
var WorkspaceBrowserModal = class extends import_obsidian10.Modal {
  constructor(app, plugin, startPath, onAccept, onClear) {
    super(app);
    this.plugin = plugin;
    this.startPath = startPath;
    this.onAccept = onAccept;
    this.onClear = onClear;
    this.currentPath = "";
    this.parent = null;
    this.dirs = [];
  }
  onOpen() {
    const { contentEl, modalEl } = this;
    modalEl.addClass("odysseus-workspace-modal");
    contentEl.empty();
    contentEl.createEl("h3", { text: "Select workspace" });
    contentEl.createEl("p", {
      text: "Pick a folder on the Odysseus server. The agent's file and shell tools will be confined to that directory.",
      attr: { style: "opacity: 0.7; font-size: 0.85em; margin-top: 0;" }
    });
    const inputRow = contentEl.createDiv({ cls: "odysseus-ws-inputrow" });
    this.pathInput = inputRow.createEl("input", {
      type: "text",
      attr: { placeholder: "Type or paste a folder path, then press Enter" }
    });
    this.pathInput.value = this.startPath;
    this.pathInput.addEventListener("keydown", (ev) => {
      if (ev.key === "Enter") {
        ev.preventDefault();
        void this.navigateTo(this.pathInput.value.trim());
      }
    });
    const goBtn = inputRow.createEl("button", { text: "Go" });
    goBtn.addEventListener("click", () => void this.navigateTo(this.pathInput.value.trim()));
    this.breadcrumbEl = contentEl.createDiv({ cls: "odysseus-ws-breadcrumb" });
    this.statusEl = contentEl.createDiv({ cls: "odysseus-ws-status" });
    this.listEl = contentEl.createDiv({ cls: "odysseus-ws-list" });
    new import_obsidian10.Setting(contentEl).addButton((b) => b.setButtonText("Clear workspace").setWarning().onClick(() => {
      this.onClear();
      this.close();
    })).addButton((b) => b.setButtonText("Cancel").onClick(() => this.close())).addButton(
      (b) => b.setButtonText("Use this folder").setCta().onClick(() => {
        const p = this.pathInput.value.trim() || this.currentPath;
        if (!p) {
          new import_obsidian10.Notice("Odysseus: pick or type a folder first");
          return;
        }
        this.onAccept(p);
        this.close();
      })
    );
    void this.navigateTo(this.startPath);
  }
  onClose() {
    this.contentEl.empty();
  }
  async navigateTo(path) {
    this.statusEl.setText("Loading\u2026");
    this.listEl.empty();
    try {
      const listing = await this.plugin.client.browseServerFolder(path || void 0);
      if (!listing) {
        this.statusEl.setText("Server refused (admin-only on this Odysseus instance). Type a full path manually and click Use this folder.");
        this.dirs = [];
        return;
      }
      this.currentPath = listing.path;
      this.parent = listing.parent;
      this.dirs = listing.dirs;
      this.pathInput.value = listing.path;
      this.renderBreadcrumb();
      this.renderList();
      this.statusEl.setText("");
    } catch (e) {
      showError("browse failed", e);
      this.statusEl.setText("Browse failed. Type a full path manually instead.");
    }
  }
  renderBreadcrumb() {
    this.breadcrumbEl.empty();
    this.breadcrumbEl.createSpan({ text: "\u{1F4CD} " });
    const label = this.breadcrumbEl.createSpan({ text: this.currentPath || "(no path)", attr: { style: "font-family: var(--font-monospace);" } });
    if (this.parent) {
      const upBtn = this.breadcrumbEl.createEl("button", { text: "\u2191 Up", attr: { style: "margin-left: 10px;" } });
      upBtn.addEventListener("click", () => void this.navigateTo(this.parent ?? ""));
    }
  }
  renderList() {
    this.listEl.empty();
    if (this.dirs.length === 0) {
      this.listEl.createDiv({ text: "No subfolders.", attr: { style: "opacity: 0.6; padding: 8px;" } });
      return;
    }
    for (const d of this.dirs) {
      const row = this.listEl.createDiv({ cls: "odysseus-ws-row" });
      row.createSpan({ text: "\u{1F4C1}  " });
      row.createSpan({ text: d.name });
      row.addEventListener("click", () => void this.navigateTo(d.path));
    }
  }
};

// chat-view.ts
var import_obsidian12 = require("obsidian");
var VIEW_TYPE_ODYSSEUS_CHAT = "odysseus-chat-view";
var OdysseusChatView = class extends import_obsidian11.ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    this.plugin = plugin;
    this.messages = [];
    this.chatMode = "chat";
    this.webSearchOn = false;
    this.profilePromptApplied = false;
    this.currentSessionId = null;
    this.abortCtl = null;
    this.inFlight = false;
    this.sttAvailable = false;
    this.ttsAvailable = false;
    this.stagedAttachments = [];
    this.modelList = [];
    this.sessions = [];
    this.presetApplied = false;
    // Whether the vault-tools bias hint has been injected this session yet.
    this.vaultHintApplied = false;
    // How the active Odysseus persona is being applied: "server" means the
    // plugin successfully pushed the template into Odysseus's custom-preset
    // slot and sends preset_id='custom' (mirrors the web UI). "inline" means
    // we fell back to embedding the system prompt as a user-message block
    // (used when the server rejected the custom-preset write, e.g. non-admin).
    this.personaSyncMode = "inline";
    // Latest server-reported metrics for the active session.
    this.lastMetrics = null;
    // Context-popup state. Persists for the lifetime of the view.
    this.ctxIncludeActive = false;
    this.ctxRecentDays = 0;
    this.ctxNotes = [];
    this.ctxFolders = [];
    // Web pages staged as context. The URL is fetched once and its plain text
    // is cached; we resend that cached text on every turn until the user removes
    // it (so it survives the per-turn reset that web-search would have).
    this.ctxUrls = [];
    // Personas — merged list of Odysseus templates + local presets.
    this.personas = [];
    // Collapsed (showing only the 4 main controls) vs expanded.
    this.collapsed = true;
    // Track whether we've already prompted the user to compact this session.
    // Reset when they actually compact or switch session.
    this.compactPromptShown = false;
    // Tracks the session id we last mirrored mode from. We only adopt the
    // server's stored mode when ENTERING a different session — never on plain
    // refreshes — so a manual pill change isn't clobbered while you're working
    // in a session.
    this.modeSyncedForSession = null;
    // ---------- Chat-input autocomplete (`/` for templates, `@` for vault items) ----------
    this.slashPopupEl = null;
    this.slashItems = [];
    this.slashHighlighted = 0;
    this.slashTrigger = null;
    this.slashFrom = 0;
    // Throttled markdown rendering for the streaming bubble. Re-renders at most
    // every 250 ms, only if the text actually grew. Cleared by send() at end.
    this.streamingRenderTimer = null;
    this.streamingRenderLastLen = 0;
  }
  getViewType() {
    return VIEW_TYPE_ODYSSEUS_CHAT;
  }
  getDisplayText() {
    return "Odysseus";
  }
  getIcon() {
    return "bot";
  }
  // Refresh the session dropdown whenever this view becomes the active leaf —
  // so sessions created in the Odysseus web UI show up without the user
  // clicking the manual refresh button.
  registerAutoRefresh() {
    this.registerEvent(
      this.app.workspace.on("active-leaf-change", (leaf) => {
        if (leaf?.view === this) void this.loadSessions();
      })
    );
  }
  async onOpen() {
    const root = this.containerEl.children[1];
    root.empty();
    root.addClass("odysseus-chat-view");
    this.themeRoot = root;
    void this.plugin.applyTheme();
    const toolbar = root.createDiv({ cls: "odysseus-chat-toolbar" });
    try {
      if (!this.plugin.settings.activeWorkspaceFolder) {
        const vp = this.vaultBasePath();
        if (vp) {
          this.plugin.settings.activeWorkspaceFolder = vp;
          void this.plugin.saveSettings();
        }
      }
    } catch (e) {
      console.error("[Odysseus] workspace default failed:", e);
    }
    this.sessionEl = toolbar.createEl("select", { attr: { title: "Session" } });
    this.sessionEl.createEl("option", { text: "New session", value: "" });
    this.sessionEl.addEventListener("change", async () => {
      this.currentSessionId = this.sessionEl.value || null;
      this.plugin.settings.lastSessionId = this.currentSessionId ?? "";
      await this.plugin.saveSettings();
      this.messages = [];
      this.renderMessages();
      this.lastMetrics = null;
      this.compactPromptShown = false;
      if (this.currentSessionId) {
        this.presetApplied = true;
        this.vaultHintApplied = true;
        this.profilePromptApplied = true;
        this.syncControlsFromSession(this.currentSessionId);
        void this.loadHistory(this.currentSessionId);
        void this.refreshContextIndicator(this.currentSessionId);
      } else {
        this.presetApplied = false;
        this.vaultHintApplied = false;
        this.profilePromptApplied = false;
        this.updateContextIndicator(null);
      }
    });
    this.contextBtn = toolbar.createEl("button", { cls: "odysseus-context-btn odysseus-chip", attr: { title: "Choose what context (notes, folders, web pages) goes into each message" } });
    this.contextBtn.addEventListener("click", (ev) => this.openContextMenu(ev));
    this.updateContextButtonLabel();
    const refreshBtnTop = toolbar.createEl("button", { cls: "odysseus-icon-only", attr: { title: "Refresh sessions, models, personas" } });
    (0, import_obsidian11.setIcon)(refreshBtnTop, "refresh-cw");
    refreshBtnTop.addEventListener("click", () => {
      void this.loadSessions();
      void this.loadModels();
      void this.loadPersonas();
    });
    this.collapseBtn = toolbar.createEl("button", { cls: "odysseus-collapse-btn odysseus-icon-only", attr: { title: "Show / hide advanced controls" } });
    this.collapseBtn.addEventListener("click", () => this.toggleCollapsed());
    this.collapsibleRowEl = root.createDiv({ cls: "odysseus-chat-toolbar odysseus-collapsible" });
    const menuBtn = (icon, label, title, onClick) => {
      const b = this.collapsibleRowEl.createEl("button", { cls: "odysseus-chip", attr: { title } });
      (0, import_obsidian11.setIcon)(b.createSpan({ cls: "odysseus-chip-icon" }), icon);
      b.createSpan({ text: label });
      b.addEventListener("click", onClick);
    };
    menuBtn("paperclip", "Attach", "Attach a file from your computer (PDF, Word, Excel, image\u2026) \u2014 anywhere, not just the vault", () => this.openAttachmentPicker());
    menuBtn("file-text", "Templates", "Saved prompt templates with variable substitution", () => this.openTemplatesPicker());
    menuBtn("minimize-2", "Compact", "Summarize older turns to free up context", () => this.compactActiveSession());
    try {
      this.personaBtn = this.collapsibleRowEl.createEl("button", { cls: "odysseus-chip", attr: { title: "Persona / system prompt" } });
      this.personaBtn.addEventListener("click", (ev) => this.openPersonaMenu(ev));
      this.workspaceBtn = this.collapsibleRowEl.createEl("button", { cls: "odysseus-chip", attr: { title: "Workspace \u2014 folder for the agent's file/shell tools" } });
      this.workspaceBtn.addEventListener("click", () => this.openWorkspacePicker());
      this.profileBtn = this.collapsibleRowEl.createEl("button", { cls: "odysseus-chip", attr: { title: "Agent profile \u2014 specialized behavior + toolset" } });
      this.profileBtn.addEventListener("click", (ev) => this.openProfileMenu(ev));
    } catch (e) {
      console.error("[Odysseus] workspace/profile picker setup failed:", e);
    }
    this.applyCollapsedState();
    this.attachmentsBar = root.createDiv({ cls: "odysseus-attachments-bar" });
    this.renderAttachments();
    this.messagesEl = root.createDiv({ cls: "odysseus-chat-messages" });
    const statusRow = root.createDiv({ cls: "odysseus-chat-statusrow" });
    this.statusEl = statusRow.createDiv({ cls: "odysseus-chat-status" });
    this.timingEl = statusRow.createDiv({ cls: "odysseus-chat-timing" });
    this.contextEl = statusRow.createDiv({ cls: "odysseus-chat-context" });
    try {
      this.indicatorsEl = root.createDiv({ cls: "odysseus-chat-indicators" });
      this.personaChip = this.indicatorsEl.createEl("button", { cls: "odysseus-indicator-chip", attr: { title: "Active persona \u2014 click to change" } });
      this.personaChip.addEventListener("click", (ev) => this.openPersonaMenu(ev));
      this.workspaceChip = this.indicatorsEl.createEl("button", { cls: "odysseus-indicator-chip", attr: { title: "Active workspace \u2014 click to change" } });
      this.workspaceChip.addEventListener("click", () => this.openWorkspacePicker());
      this.profileChip = this.indicatorsEl.createEl("button", { cls: "odysseus-indicator-chip", attr: { title: "Active agent profile \u2014 click to change" } });
      this.profileChip.addEventListener("click", (ev) => this.openProfileMenu(ev));
      this.populatePersonas();
      this.updateWorkspaceButton();
      this.updateProfileButton();
    } catch (e) {
      console.error("[Odysseus] indicator chips setup failed:", e);
    }
    const inputRow = root.createDiv({ cls: "odysseus-chat-input-row" });
    this.inputEl = inputRow.createEl("textarea", {
      cls: "odysseus-chat-input",
      attr: {
        placeholder: "Message Odysseus\u2026 (Enter to send, Shift+Enter for newline, @[[Note Name]] to include a note)"
      }
    });
    this.inputEl.addEventListener("keydown", (ev) => {
      if (this.handleSlashKey(ev)) return;
      if (ev.key === "Enter" && !ev.shiftKey && !ev.isComposing) {
        ev.preventDefault();
        if (this.inFlight) this.cancel();
        else void this.send();
      }
    });
    this.inputEl.addEventListener("input", () => this.maybeOpenSlashPopup());
    this.inputEl.addEventListener("blur", () => setTimeout(() => this.closeSlashPopup(), 150));
    const sendCol = inputRow.createDiv({ cls: "odysseus-send-col" });
    const togglesRow = sendCol.createDiv({ cls: "odysseus-toggles-row" });
    this.chatMode = this.plugin.settings.mode === "agent" ? "agent" : "chat";
    this.modeBtn = togglesRow.createEl("button", { cls: "odysseus-icon-toggle" });
    this.modeBtn.addEventListener("click", async () => {
      this.chatMode = this.chatMode === "agent" ? "chat" : "agent";
      this.plugin.settings.mode = this.chatMode;
      await this.plugin.saveSettings();
      this.noteLocalModeChange(this.chatMode);
      if (this.chatMode === "chat") this.webSearchOn = false;
      this.updateModeButton();
      this.updateWebToggle();
      this.saveSessionControls();
    });
    this.updateModeButton();
    this.webSearchOn = this.plugin.settings.webSearchSticky;
    this.webToggleEl = togglesRow.createEl("button", { cls: "odysseus-icon-toggle" });
    this.webToggleEl.addEventListener("click", async () => {
      this.webSearchOn = !this.webSearchOn;
      this.plugin.settings.webSearchSticky = this.webSearchOn;
      await this.plugin.saveSettings();
      this.updateWebToggle();
      this.saveSessionControls();
    });
    this.updateWebToggle();
    this.micBtn = togglesRow.createEl("button", { cls: "odysseus-icon-toggle odysseus-mic-btn" });
    this.micBtn.addEventListener("click", () => {
      if (this.voice?.isRecording) void this.finishRecording(this.plugin.settings.sttAutoSend === true);
      else void this.beginRecording();
    });
    this.sendBtn = sendCol.createEl("button", { cls: "odysseus-chat-send", text: "Send" });
    this.sendBtn.addEventListener("click", () => {
      if (this.inFlight) this.cancel();
      else void this.send();
    });
    this.voice = new VoiceRecorder(this.plugin.client);
    this.tts = new TtsManager(this.plugin.client);
    this.updateMicButton();
    void this.refreshSpeechAvailability();
    void this.syncProfilesFromServer();
    this.renderMessages();
    void this.loadModels();
    void this.loadPersonas();
    void this.loadSessions().then(() => this.restoreLastSession());
    this.registerAutoRefresh();
  }
  // --- Collapse / expand the advanced toolbar row ---
  toggleCollapsed() {
    this.collapsed = !this.collapsed;
    this.applyCollapsedState();
  }
  applyCollapsedState() {
    this.collapsibleRowEl.toggleClass("is-collapsed", this.collapsed);
    (0, import_obsidian11.setIcon)(this.collapseBtn, this.collapsed ? "chevron-down" : "chevron-up");
    this.collapseBtn.setAttr("title", this.collapsed ? "Show advanced controls" : "Hide advanced controls");
  }
  restoreLastSession() {
    const last = this.plugin.settings.lastSessionId;
    if (!last) return;
    const opt = Array.from(this.sessionEl.options).find((o) => o.value === last);
    if (!opt) return;
    this.sessionEl.value = last;
    this.currentSessionId = last;
    this.presetApplied = true;
    this.vaultHintApplied = true;
    this.profilePromptApplied = true;
    this.lastMetrics = null;
    this.syncControlsFromSession(last);
    void this.loadHistory(last);
    void this.refreshContextIndicator(last);
  }
  async loadHistory(sid) {
    try {
      const history = await this.plugin.client.getSessionHistory(sid);
      this.messages = history.map((m) => ({ role: m.role, content: m.content }));
      this.renderMessages();
    } catch (e) {
      showError("could not load history", e);
    }
  }
  async refreshContextIndicator(sid) {
    const info = await this.plugin.client.getSessionContext(sid);
    this.updateContextIndicator(info);
  }
  updateTimingIndicator(metrics) {
    if (!metrics) {
      this.timingEl.setText("");
      this.timingEl.setAttr("title", "");
      this.timingEl.removeClass("odysseus-timing-warn");
      return;
    }
    const parts = [];
    if (metrics.response_time !== void 0) parts.push(`${metrics.response_time.toFixed(1)}s`);
    if (metrics.agent_prep_time !== void 0 && metrics.agent_model_wait_time !== void 0) {
      parts.push(`(prep ${metrics.agent_prep_time.toFixed(1)}s, model ${metrics.agent_model_wait_time.toFixed(1)}s)`);
    } else if (metrics.tokens_per_second !== void 0) {
      parts.push(`(${metrics.tokens_per_second.toFixed(0)} tok/s)`);
    }
    if (parts.length === 0) {
      this.timingEl.setText("");
      this.timingEl.setAttr("title", "");
      return;
    }
    this.timingEl.setText(parts.join(" "));
    const prepDominates = metrics.agent_prep_time !== void 0 && metrics.agent_model_wait_time !== void 0 && metrics.agent_prep_time > metrics.agent_model_wait_time * 1.5;
    this.timingEl.toggleClass("odysseus-timing-warn", prepDominates);
    const tip = [];
    if (metrics.response_time !== void 0) tip.push(`Total: ${metrics.response_time.toFixed(2)}s`);
    if (metrics.time_to_first_token !== void 0) tip.push(`Time to first token: ${metrics.time_to_first_token.toFixed(2)}s`);
    if (metrics.agent_prep_time !== void 0) tip.push(`Odysseus prep: ${metrics.agent_prep_time.toFixed(2)}s`);
    if (metrics.agent_prep_breakdown) {
      for (const [k, v] of Object.entries(metrics.agent_prep_breakdown)) {
        if (typeof v === "number" && v >= 1e-3) tip.push(`  \u2022 ${k}: ${v.toFixed(3)}s`);
      }
    }
    if (metrics.agent_model_wait_time !== void 0) tip.push(`Model (LM Studio): ${metrics.agent_model_wait_time.toFixed(2)}s`);
    if (metrics.input_tokens !== void 0) tip.push(`Input: ${metrics.input_tokens.toLocaleString()} tokens`);
    if (metrics.output_tokens !== void 0) tip.push(`Output: ${metrics.output_tokens.toLocaleString()} tokens`);
    if (metrics.tokens_per_second !== void 0) {
      tip.push(`Throughput: ${metrics.tokens_per_second.toFixed(1)} tok/s${metrics.tps_source ? ` (${metrics.tps_source})` : ""}`);
    }
    if (prepDominates) tip.push("\nPrep > model \u2014 likely agent tool selection. Try Chat mode if you don't need tools.");
    this.timingEl.setAttr("title", tip.join("\n"));
  }
  maybePromptCompact(pct) {
    if (!this.plugin.settings.promptCompactAt90) return;
    if (pct < 90) return;
    if (this.compactPromptShown) return;
    if (!this.currentSessionId) return;
    this.compactPromptShown = true;
    const sid = this.currentSessionId;
    const notice = new import_obsidian11.Notice("Odysseus: context > 90%. Compact older turns?", 12e3);
    const frag = document.createDocumentFragment();
    frag.createSpan({ text: "Odysseus: context > 90% \u2014 " });
    const compactBtn = frag.createEl("a", { text: "Compact", attr: { style: "cursor: pointer; text-decoration: underline; margin-right: 8px;" } });
    compactBtn.addEventListener("click", async () => {
      notice.hide();
      await this.compactActiveSession();
    });
    const dismissBtn = frag.createEl("a", { text: "Dismiss", attr: { style: "cursor: pointer; text-decoration: underline; opacity: 0.7;" } });
    dismissBtn.addEventListener("click", () => notice.hide());
    notice.setMessage(frag);
  }
  updateContextIndicator(info) {
    if (this.lastMetrics && typeof this.lastMetrics.context_percent === "number") {
      const pct2 = Math.round(this.lastMetrics.context_percent);
      this.maybePromptCompact(pct2);
      const maxRaw = this.lastMetrics.context_length ?? info?.max;
      const label = maxRaw ? `${pct2}% of ${formatTokens(maxRaw)}` : `${pct2}%`;
      this.contextEl.setText(label);
      this.contextEl.toggleClass("odysseus-context-warn", pct2 >= 70 && pct2 < 85);
      this.contextEl.toggleClass("odysseus-context-danger", pct2 >= 85);
      const breakdown = [`Context window: ${pct2}% used`];
      if (this.lastMetrics.input_tokens) breakdown.push(`Input: ${this.lastMetrics.input_tokens.toLocaleString()}`);
      if (this.lastMetrics.output_tokens) breakdown.push(`Output: ${this.lastMetrics.output_tokens.toLocaleString()}`);
      if (maxRaw) breakdown.push(`Window: ${maxRaw.toLocaleString()} tokens`);
      if (this.lastMetrics.usage_source) breakdown.push(`Source: ${this.lastMetrics.usage_source}`);
      this.contextEl.setAttr("title", breakdown.join("\n"));
      return;
    }
    if (!info || !info.max) {
      this.contextEl.setText("");
      this.contextEl.removeClass("odysseus-context-warn");
      this.contextEl.removeClass("odysseus-context-danger");
      return;
    }
    const pct = Math.min(100, Math.round(info.used / info.max * 100));
    this.contextEl.setText(`~${pct}% of ${formatTokens(info.max)}`);
    this.contextEl.toggleClass("odysseus-context-warn", pct >= 70 && pct < 85);
    this.contextEl.toggleClass("odysseus-context-danger", pct >= 85);
    this.contextEl.setAttr(
      "title",
      `Approximate \u2014 based on cumulative ${info.used.toLocaleString()} tokens across this session. The real percentage will appear after the next response.`
    );
  }
  async onClose() {
    this.abortCtl?.abort();
    this.voice?.cancel();
    this.tts?.dispose();
  }
  async loadSessions() {
    try {
      this.sessions = await this.plugin.client.listSessions();
      this.populateWorkspacesDropdown();
      this.populateSessionsDropdown();
      if (this.currentSessionId) this.syncControlsFromSession(this.currentSessionId);
    } catch (e) {
      showError("could not load sessions", e);
    }
  }
  populateWorkspacesDropdown() {
  }
  populateSessionsDropdown() {
    const previous = this.sessionEl.value;
    this.sessionEl.empty();
    this.sessionEl.createEl("option", { text: "New session", value: "" });
    for (const s of this.sessions) {
      const opt = this.sessionEl.createEl("option", { text: s.name ?? s.id, value: s.id });
      if (s.id === previous) opt.selected = true;
    }
  }
  // (Server-side workspace concept removed — file ops happen in the vault now
  // via the renderFileActions / applyFileBlock pipeline.)
  // ---------- Personas (merged Odysseus templates + local presets) ----------
  async loadPersonas() {
    let odysseus = [];
    try {
      odysseus = await this.plugin.client.listPersonas();
    } catch {
    }
    const localOnly = this.plugin.settings.presets.map((p) => ({ ...p, source: "local" }));
    const odyMapped = odysseus.map((p) => ({
      id: "ody:" + p.id,
      name: p.name,
      prompt: p.system_prompt,
      temperature: p.temperature,
      maxTokens: p.max_tokens,
      source: "odysseus"
    }));
    const seenNames = new Set(odyMapped.map((p) => p.name.toLowerCase()));
    const merged = [...odyMapped, ...localOnly.filter((p) => !seenNames.has(p.name.toLowerCase()))];
    this.personas = merged;
    this.populatePersonas();
    void this.syncActivePersona();
  }
  // Push the currently-selected Odysseus persona into the server's custom-
  // preset slot so the chat can use preset_id='custom'. Falls back to
  // inline mode if the server refuses (non-admin, schema mismatch, etc.).
  updateWebToggle() {
    (0, import_obsidian11.setIcon)(this.webToggleEl, "globe");
    this.webToggleEl.toggleClass("is-active", this.webSearchOn);
    this.webToggleEl.setAttr(
      "title",
      this.webSearchOn ? "Web search ON (stays on until you turn it off; works in Chat mode too). Click to turn off." : "Web search OFF. Click to enable."
    );
  }
  updateModeButton() {
    (0, import_obsidian11.setIcon)(this.modeBtn, this.chatMode === "agent" ? "bot" : "message-circle");
    this.modeBtn.toggleClass("is-active", this.chatMode === "agent");
    this.modeBtn.setAttr(
      "title",
      this.chatMode === "agent" ? "Agent mode (tools, web, slower). Click for Chat mode." : "Chat mode (direct, fast). Click for Agent mode."
    );
  }
  syncControlsFromSession(sid, force = false) {
    if (!force && this.modeSyncedForSession === sid) return;
    this.modeSyncedForSession = sid;
    const saved = this.plugin.settings.sessionControls?.[sid];
    if (saved) {
      if (saved.mode === "agent" || saved.mode === "chat") {
        this.chatMode = saved.mode;
        this.updateModeButton();
      }
      if (saved.personaId !== void 0 && this.personas.some((p) => p.id === saved.personaId)) {
        this.plugin.settings.activePresetId = saved.personaId;
        this.updatePersonaButton();
      }
      if (typeof saved.web === "boolean") this.webSearchOn = saved.web;
      if (saved.profileId !== void 0) {
        const exists = saved.profileId === "" || (this.plugin.settings.agentProfiles ?? []).some((p) => p.id === saved.profileId);
        if (exists) {
          this.plugin.settings.activeAgentProfileId = saved.profileId;
          this.updateProfileButton();
        }
      }
      this.updateWebToggle();
      void this.syncActivePersona();
      return;
    }
    const sess = this.sessions.find((s) => String(s.id) === sid);
    const mode = sess?.mode;
    if (mode === "agent" || mode === "chat") {
      this.chatMode = mode;
      this.updateModeButton();
      this.plugin.settings.mode = mode;
      void this.plugin.saveSettings();
    }
    this.updateWebToggle();
  }
  // Remember the current control choices for the active session, so switching
  // away and back restores exactly what the user set in Obsidian.
  saveSessionControls() {
    if (!this.currentSessionId) return;
    const map = this.plugin.settings.sessionControls ?? {};
    map[this.currentSessionId] = {
      mode: this.chatMode,
      personaId: this.plugin.settings.activePresetId,
      web: this.webSearchOn,
      profileId: this.plugin.settings.activeAgentProfileId
    };
    this.plugin.settings.sessionControls = map;
    void this.plugin.saveSettings();
  }
  // Optimistically record a mode change locally so a subsequent session refresh
  // doesn't think the server's (stale) value should override the user.
  noteLocalModeChange(mode) {
    const sess = this.sessions.find((s) => String(s.id) === this.currentSessionId);
    if (sess) sess.mode = mode;
  }
  async syncActivePersona() {
    const active = this.personas.find((p) => p.id === this.plugin.settings.activePresetId);
    if (!active || active.source !== "odysseus") {
      this.personaSyncMode = "inline";
      return;
    }
    const result = await this.plugin.client.setCustomPreset({
      name: active.name,
      system_prompt: active.prompt,
      temperature: active.temperature,
      max_tokens: active.maxTokens,
      enabled: true
    });
    if (result.ok) {
      this.personaSyncMode = "server";
    } else {
      this.personaSyncMode = "inline";
      if (result.adminRequired) {
        new import_obsidian11.Notice(`Odysseus: persona "${active.name}" can't be applied server-side (admin only). Using inline fallback.`, 6e3);
      } else if (result.error) {
        new import_obsidian11.Notice(`Odysseus: could not sync persona to server (${result.error}). Using inline fallback.`, 6e3);
      }
    }
  }
  populatePersonas() {
    if (this.personas.length === 0) {
      this.personas = this.plugin.settings.presets.map((p) => ({ ...p, source: "local" }));
    }
    this.updatePersonaButton();
  }
  activePersona() {
    return this.personas.find((p) => p.id === this.plugin.settings.activePresetId) ?? null;
  }
  // Reflect the active persona in the ⌃-menu picker button + the input chip.
  updatePersonaButton() {
    const persona = this.activePersona();
    if (this.personaBtn) {
      this.personaBtn.empty();
      (0, import_obsidian11.setIcon)(this.personaBtn.createSpan({ cls: "odysseus-chip-icon" }), "user");
      this.personaBtn.createSpan({ text: persona ? ` ${persona.name}` : " Persona" });
      this.personaBtn.setAttr("title", persona ? `Persona: ${persona.name} \u2014 click to change` : "Persona / system prompt \u2014 click to choose");
    }
    if (this.personaChip) {
      this.personaChip.empty();
      if (persona) {
        (0, import_obsidian11.setIcon)(this.personaChip.createSpan(), "user");
        this.personaChip.createSpan({ cls: "chip-name", text: persona.name });
        this.personaChip.style.display = "";
      } else {
        this.personaChip.style.display = "none";
      }
    }
  }
  openPersonaMenu(ev) {
    const menu = new import_obsidian11.Menu();
    const cur = this.plugin.settings.activePresetId;
    menu.addItem((i) => i.setTitle("No persona").setIcon("user").setChecked(!this.activePersona()).onClick(() => void this.selectPersona("")));
    if (this.personas.length === 0) {
      menu.addItem((i) => i.setTitle("No personas loaded").setDisabled(true));
    }
    for (const p of this.personas) {
      const flag = p.source === "odysseus" ? "\u{1F4DA} " : "\u{1F4DD} ";
      menu.addItem((i) => i.setTitle(flag + p.name).setChecked(cur === p.id).onClick(() => void this.selectPersona(p.id)));
    }
    menu.showAtMouseEvent(ev);
  }
  async selectPersona(id) {
    this.plugin.settings.activePresetId = id;
    await this.plugin.saveSettings();
    this.presetApplied = false;
    await this.syncActivePersona();
    this.updatePersonaButton();
    this.saveSessionControls();
  }
  populateProfiles() {
    this.updateProfileButton();
  }
  // Reflect the active profile in the toolbar chip (name + active state).
  updateProfileButton() {
    const prof = this.activeProfile();
    if (this.profileBtn) {
      this.profileBtn.empty();
      (0, import_obsidian11.setIcon)(this.profileBtn.createSpan({ cls: "odysseus-chip-icon" }), "bot");
      this.profileBtn.createSpan({ text: prof ? ` ${prof.name}` : " Profile" });
      this.profileBtn.setAttr("title", prof ? `Agent profile: ${prof.name} \u2014 click to change` : "Agent profile \u2014 none (normal agent); click to choose");
    }
    if (this.profileChip) {
      this.profileChip.empty();
      if (prof) {
        (0, import_obsidian11.setIcon)(this.profileChip.createSpan(), "bot");
        this.profileChip.createSpan({ cls: "chip-name", text: prof.name });
        this.profileChip.style.display = "";
      } else {
        this.profileChip.style.display = "none";
      }
    }
  }
  // Popup list of profiles (Obsidian Menu), with a checkmark on the active one.
  openProfileMenu(ev) {
    const menu = new import_obsidian11.Menu();
    const cur = this.plugin.settings.activeAgentProfileId;
    menu.addItem((i) => i.setTitle("No profile (normal agent)").setIcon("bot").setChecked(!cur).onClick(() => void this.selectProfile("")));
    const profiles = this.plugin.settings.agentProfiles ?? [];
    if (profiles.length === 0) {
      menu.addItem((i) => i.setTitle("No profiles \u2014 create one in Odysseus settings").setDisabled(true));
    }
    for (const p of profiles) {
      menu.addItem((i) => i.setTitle(p.name).setIcon("wrench").setChecked(cur === p.id).onClick(() => void this.selectProfile(p.id)));
    }
    menu.showAtMouseEvent(ev);
  }
  async selectProfile(id) {
    this.plugin.settings.activeAgentProfileId = id;
    await this.plugin.saveSettings();
    this.profilePromptApplied = false;
    this.updateProfileButton();
    if (id) {
      this.chatMode = "agent";
      this.plugin.settings.mode = "agent";
      this.noteLocalModeChange("agent");
      this.updateModeButton();
      this.updateWebToggle();
      this.pushProfilesToServer();
    }
    this.saveSessionControls();
  }
  // Absolute path of the open vault (desktop FileSystemAdapter). "" on mobile.
  vaultBasePath() {
    const ad = this.app.vault.adapter;
    try {
      return (ad.getBasePath?.() ?? ad.basePath ?? "") || "";
    } catch {
      return "";
    }
  }
  // Reflect the bound workspace folder in the toolbar chip.
  updateWorkspaceButton() {
    const ws = this.plugin.settings.activeWorkspaceFolder || "";
    const base = ws ? ws.split(/[\\/]/).filter(Boolean).pop() || ws : "";
    if (this.workspaceBtn) {
      this.workspaceBtn.empty();
      (0, import_obsidian11.setIcon)(this.workspaceBtn.createSpan({ cls: "odysseus-chip-icon" }), "folder");
      this.workspaceBtn.createSpan({ text: base ? ` ${base}` : " Workspace" });
      this.workspaceBtn.setAttr("title", ws ? `Workspace: ${ws} \u2014 click to change or clear` : "Workspace \u2014 bind a folder for the agent's file/shell tools");
    }
    if (this.workspaceChip) {
      this.workspaceChip.empty();
      if (ws) {
        (0, import_obsidian11.setIcon)(this.workspaceChip.createSpan(), "folder");
        this.workspaceChip.createSpan({ cls: "chip-name", text: base });
        this.workspaceChip.style.display = "";
      } else {
        this.workspaceChip.style.display = "none";
      }
    }
  }
  openWorkspacePicker() {
    const start = this.plugin.settings.activeWorkspaceFolder || this.vaultBasePath() || "";
    new WorkspaceBrowserModal(
      this.app,
      this.plugin,
      start,
      async (path) => {
        this.plugin.settings.activeWorkspaceFolder = path;
        await this.plugin.saveSettings();
        this.updateWorkspaceButton();
      },
      async () => {
        this.plugin.settings.activeWorkspaceFolder = "";
        await this.plugin.saveSettings();
        this.updateWorkspaceButton();
      }
    ).open();
  }
  activeProfile() {
    const id = this.plugin.settings.activeAgentProfileId;
    if (!id) return null;
    return (this.plugin.settings.agentProfiles ?? []).find((p) => p.id === id) ?? null;
  }
  // Push the local profile definitions to the Odysseus server's settings
  // (agent_profiles). The server reads them per-request via the `profile`
  // field to inject the behavior prompt + selected memories/skills. Best
  // effort: requires admin (cookie auth); failures are logged, and the
  // dual-sent tools/flags keep the toolset pinned regardless.
  pushProfilesToServer() {
    void this.plugin.client.updateServerSettings({ agent_profiles: this.plugin.settings.agentProfiles ?? [] }).catch((e) => console.warn("[Odysseus] profile sync to server failed:", e));
  }
  // The server copy is authoritative (profiles are editable in the Odysseus
  // web UI too). On panel open: adopt the server's list if it has one;
  // otherwise seed it with ours (first run). Offline → keep the local copy.
  async syncProfilesFromServer() {
    try {
      const s = await this.plugin.client.getServerSettings();
      const remote = s.agent_profiles;
      if (Array.isArray(remote) && remote.length > 0) {
        this.plugin.settings.agentProfiles = remote;
        await this.plugin.saveSettings();
        this.populateProfiles();
      } else if ((this.plugin.settings.agentProfiles ?? []).length > 0) {
        this.pushProfilesToServer();
      }
    } catch {
    }
  }
  // ---------- Context popup ----------
  updateContextButtonLabel() {
    const count = (this.ctxIncludeActive ? 1 : 0) + (this.ctxRecentDays > 0 ? 1 : 0) + this.ctxNotes.length + this.ctxFolders.length + this.ctxUrls.length;
    this.contextBtn.empty();
    (0, import_obsidian11.setIcon)(this.contextBtn.createSpan({ cls: "odysseus-chip-icon" }), "book-open");
    if (count > 0) this.contextBtn.createSpan({ text: String(count) });
    this.contextBtn.setAttr(
      "title",
      count > 0 ? `Context (${count} attached). Click to manage notes, folders, web pages, etc.` : "Context \u2014 attach notes, folders, web pages, etc. for the next message."
    );
    this.contextBtn.toggleClass("is-active", count > 0);
  }
  openContextMenu(ev) {
    const menu = new import_obsidian11.Menu();
    menu.addItem(
      (i) => i.setTitle(`${this.ctxIncludeActive ? "\u2713 " : "  "}Include active note`).onClick(() => {
        this.ctxIncludeActive = !this.ctxIncludeActive;
        this.updateContextButtonLabel();
      })
    );
    menu.addSeparator();
    const scopeLabel = ["No recent notes", "Today", "Last 7 days", "Last 30 days", "Last 90 days"];
    const scopeValues = [0, 1, 7, 30, 90];
    const currentScopeLabel = scopeLabel[scopeValues.indexOf(this.ctxRecentDays)] ?? "No recent notes";
    menu.addItem(
      (i) => i.setTitle(`Recent notes scope: ${currentScopeLabel}`).onClick(() => {
        const idx = scopeValues.indexOf(this.ctxRecentDays);
        this.ctxRecentDays = scopeValues[(idx + 1) % scopeValues.length];
        this.updateContextButtonLabel();
        new import_obsidian11.Notice(`Odysseus: recent notes \u2192 ${scopeLabel[scopeValues.indexOf(this.ctxRecentDays)]}`);
      })
    );
    menu.addSeparator();
    menu.addItem(
      (i) => i.setTitle("+ Add note\u2026").setIcon("file-plus").onClick(() => {
        new VaultFilePickerModal(this.plugin, (file) => {
          if (!this.ctxNotes.some((f) => f.path === file.path)) this.ctxNotes.push(file);
          this.updateContextButtonLabel();
        }).open();
      })
    );
    for (const note of this.ctxNotes) {
      menu.addItem(
        (i) => i.setTitle(`  \u2022 ${note.basename}  \u2715`).onClick(() => {
          this.ctxNotes = this.ctxNotes.filter((f) => f.path !== note.path);
          this.updateContextButtonLabel();
        })
      );
    }
    menu.addSeparator();
    menu.addItem(
      (i) => i.setTitle("+ Add folder\u2026").setIcon("folder-plus").onClick(() => {
        new VaultFolderPickerModal(this.plugin, (folder) => {
          if (!this.ctxFolders.some((f) => f.path === folder.path)) this.ctxFolders.push(folder);
          this.updateContextButtonLabel();
        }).open();
      })
    );
    for (const folder of this.ctxFolders) {
      menu.addItem(
        (i) => i.setTitle(`  \u2022 ${folder.path}/  \u2715`).onClick(() => {
          this.ctxFolders = this.ctxFolders.filter((f) => f.path !== folder.path);
          this.updateContextButtonLabel();
        })
      );
    }
    menu.addSeparator();
    menu.addItem(
      (i) => i.setTitle("+ Add web page\u2026").setIcon("globe").onClick(() => this.promptAndAddUrl())
    );
    for (const u of this.ctxUrls) {
      menu.addItem(
        (j) => j.setTitle(`  \u2022 ${shortenUrl(u.url)}  \u2715`).onClick(() => {
          this.ctxUrls = this.ctxUrls.filter((x) => x.url !== u.url);
          this.updateContextButtonLabel();
        })
      );
    }
    menu.showAtMouseEvent(ev);
  }
  async promptAndAddUrl() {
    new UrlPromptModal(this.plugin, async (url) => {
      if (this.ctxUrls.some((u) => u.url === url)) {
        new import_obsidian11.Notice("Odysseus: that URL is already in context");
        return;
      }
      const status = working(`fetching ${shortenUrl(url)}`);
      try {
        const content = await fetchUrlAsText(url);
        if (!content.trim()) {
          new import_obsidian11.Notice("Odysseus: page returned no readable text");
          return;
        }
        this.ctxUrls.push({ url, content });
        this.updateContextButtonLabel();
        new import_obsidian11.Notice(`Odysseus: added ${shortenUrl(url)} (${content.length.toLocaleString()} chars)`);
      } catch (e) {
        showError("URL fetch failed", e);
      } finally {
        status.done();
      }
    }).open();
  }
  async loadModels() {
    try {
      this.modelList = await this.plugin.client.listModels();
    } catch {
    }
  }
  openAttachmentPicker() {
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.accept = ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.md,.csv,.rtf,.png,.jpg,.jpeg,.gif,.webp";
    input.addEventListener("change", async () => {
      const files = Array.from(input.files ?? []);
      const maxMB = Number(this.plugin.settings.attachmentMaxMB) || 25;
      const MAX = maxMB * 1024 * 1024;
      for (const f of files) {
        if (f.size > MAX) {
          new import_obsidian11.Notice(`Odysseus: ${f.name} is over ${maxMB} MB; skipped`);
          continue;
        }
        try {
          const data = await f.arrayBuffer();
          const ext = (f.name.split(".").pop() ?? "").toLowerCase();
          this.stagedAttachments.push({ name: f.name, size: f.size, ext, data, contentType: f.type || guessMime(ext) });
        } catch (e) {
          showError(`attach ${f.name} failed`, e);
        }
      }
      this.renderAttachments();
    });
    input.click();
  }
  currentAutocompleteCtx() {
    const cur = this.inputEl.selectionStart ?? this.inputEl.value.length;
    const text = this.inputEl.value;
    let start = cur;
    while (start > 0 && !/\s/.test(text[start - 1])) start--;
    const token = text.slice(start, cur);
    if (/^\/[\w-]*$/.test(token)) {
      const lineStart = text.lastIndexOf("\n", start - 1) + 1;
      const prefix = text.slice(lineStart, start);
      if (/^\s*$/.test(prefix)) {
        return { from: start, query: token.slice(1).toLowerCase(), trigger: "/" };
      }
    }
    if (/^@[\w\s\-./]*$/.test(token)) {
      return { from: start, query: token.slice(1).toLowerCase(), trigger: "@" };
    }
    return null;
  }
  maybeOpenSlashPopup() {
    const ctx = this.currentAutocompleteCtx();
    if (!ctx) {
      this.closeSlashPopup();
      return;
    }
    this.slashTrigger = ctx.trigger;
    this.slashFrom = ctx.from;
    const items = ctx.trigger === "/" ? this.buildSlashItems(ctx.query) : this.buildAtItems(ctx.query);
    if (items.length === 0) {
      this.closeSlashPopup();
      return;
    }
    this.slashItems = items;
    this.slashHighlighted = 0;
    this.renderSlashPopup();
  }
  buildSlashItems(query) {
    const items = [];
    for (const t of this.plugin.settings.promptTemplates) {
      const name = "/" + slugify(t.name);
      if (!name.toLowerCase().includes(query)) continue;
      items.push({
        label: name,
        sub: t.description || "Prompt template",
        run: () => {
          this.closeSlashPopup();
          this.replaceAutocompleteTokenWith("");
          void Promise.resolve().then(() => (init_prompt_templates(), prompt_templates_exports)).then(
            ({ runPromptTemplate: runPromptTemplate2 }) => runPromptTemplate2(this.plugin, t, { mode: "chat" })
          );
        }
      });
    }
    for (const dc of DIRECT_COMMANDS) {
      if (!dc.label.toLowerCase().includes(query)) continue;
      items.push({
        label: dc.label,
        sub: dc.sub,
        run: () => {
          this.closeSlashPopup();
          this.replaceAutocompleteTokenWith(dc.label + " ");
        }
      });
    }
    for (const sc of SESSION_COMMANDS) {
      if (!sc.label.toLowerCase().includes(query)) continue;
      items.push({
        label: sc.label,
        sub: sc.sub,
        run: () => {
          this.closeSlashPopup();
          this.replaceAutocompleteTokenWith("");
          void this.dispatchDirectCommand(sc.label);
        }
      });
    }
    return items.filter((i) => i.label.toLowerCase().includes(query));
  }
  // `@`-mention autocomplete: shows vault notes + folders that fuzzy-match.
  buildAtItems(query) {
    const items = [];
    const seenFolders = /* @__PURE__ */ new Set();
    for (const f of this.app.vault.getMarkdownFiles()) {
      if (!fuzzyMatch(f.path.toLowerCase(), query)) continue;
      items.push({
        label: f.basename,
        sub: f.path,
        run: () => {
          this.closeSlashPopup();
          this.replaceAutocompleteTokenWith(`@[[${f.basename}]] `);
        }
      });
      const parent = f.parent?.path;
      if (parent && !seenFolders.has(parent)) {
        seenFolders.add(parent);
        if (fuzzyMatch(parent.toLowerCase(), query)) {
          items.push({
            label: `\u{1F4C1} ${parent}/`,
            sub: "Folder \u2014 adds it to Context popup",
            run: () => {
              this.closeSlashPopup();
              this.replaceAutocompleteTokenWith("");
              const folder = this.app.vault.getAbstractFileByPath(parent);
              if (folder && folder instanceof import_obsidian11.TFolder) {
                if (!this.ctxFolders.some((c) => c.path === folder.path)) this.ctxFolders.push(folder);
                this.updateContextButtonLabel();
              }
            }
          });
        }
      }
      if (items.length >= 40) break;
    }
    return items;
  }
  renderSlashPopup() {
    if (!this.slashPopupEl) {
      this.slashPopupEl = this.inputEl.parentElement?.createDiv({ cls: "odysseus-slash-popup" }) ?? null;
    }
    if (!this.slashPopupEl) return;
    this.slashPopupEl.empty();
    this.slashItems.forEach((item, idx) => {
      const row = this.slashPopupEl.createDiv({ cls: "odysseus-slash-row" + (idx === this.slashHighlighted ? " is-active" : "") });
      row.createDiv({ cls: "odysseus-slash-label", text: item.label });
      row.createDiv({ cls: "odysseus-slash-sub", text: item.sub });
      row.addEventListener("mousedown", (ev) => {
        ev.preventDefault();
        item.run();
      });
    });
  }
  closeSlashPopup() {
    this.slashPopupEl?.remove();
    this.slashPopupEl = null;
    this.slashItems = [];
  }
  handleSlashKey(ev) {
    if (!this.slashPopupEl || this.slashItems.length === 0) return false;
    if (ev.key === "ArrowDown") {
      ev.preventDefault();
      this.slashHighlighted = (this.slashHighlighted + 1) % this.slashItems.length;
      this.renderSlashPopup();
      return true;
    }
    if (ev.key === "ArrowUp") {
      ev.preventDefault();
      this.slashHighlighted = (this.slashHighlighted - 1 + this.slashItems.length) % this.slashItems.length;
      this.renderSlashPopup();
      return true;
    }
    if (ev.key === "Enter" || ev.key === "Tab") {
      ev.preventDefault();
      this.slashItems[this.slashHighlighted]?.run();
      return true;
    }
    if (ev.key === "Escape") {
      this.closeSlashPopup();
      return true;
    }
    return false;
  }
  replaceAutocompleteTokenWith(replacement) {
    if (this.slashTrigger === null) return;
    const text = this.inputEl.value;
    const cur = this.inputEl.selectionStart ?? text.length;
    this.inputEl.value = text.slice(0, this.slashFrom) + replacement + text.slice(cur);
    const newCur = this.slashFrom + replacement.length;
    this.inputEl.setSelectionRange(newCur, newCur);
    this.inputEl.focus();
  }
  // Public so prompt-templates can locate the chat view to push text into.
  insertIntoInput(text) {
    const cur = this.inputEl.value;
    const sep = cur && !cur.endsWith("\n") ? "\n" : "";
    this.inputEl.value = cur + sep + text;
    this.inputEl.focus();
    this.inputEl.setSelectionRange(this.inputEl.value.length, this.inputEl.value.length);
  }
  openTemplatesPicker() {
    void Promise.resolve().then(() => (init_prompt_templates(), prompt_templates_exports)).then(({ PromptTemplatePickerModal: PromptTemplatePickerModal2, runPromptTemplate: runPromptTemplate2 }) => {
      new PromptTemplatePickerModal2(this.plugin, (t) => {
        void runPromptTemplate2(this.plugin, t, { mode: "chat" });
      }).open();
    });
  }
  renderAttachments() {
    this.attachmentsBar.empty();
    if (this.stagedAttachments.length === 0) return;
    for (const [i, a] of this.stagedAttachments.entries()) {
      const chip = this.attachmentsBar.createSpan({ cls: "odysseus-attachment-chip" });
      if (isImageExt(a.ext)) {
        const img = chip.createEl("img", { cls: "odysseus-attachment-thumb" });
        const url = URL.createObjectURL(new Blob([a.data], { type: a.contentType }));
        img.src = url;
        img.addEventListener("load", () => setTimeout(() => URL.revokeObjectURL(url), 6e4));
      }
      chip.createSpan({ cls: "odysseus-attachment-label", text: `${a.name} (${formatBytes(a.size)})` });
      const x = chip.createEl("button", { text: "\xD7", attr: { title: "Remove attachment" } });
      x.addEventListener("click", () => {
        this.stagedAttachments.splice(i, 1);
        this.renderAttachments();
      });
    }
  }
  appendMessage(role, content, local = false) {
    this.messages.push({ role, content, local: local || role === "system" });
    return this.renderOne(
      role,
      content,
      /*final*/
      role !== "assistant" || content !== "\u2026"
    );
  }
  // Server-side index of a UI message = count of non-local messages before it.
  serverIndexOf(uiIndex) {
    let n = 0;
    for (let i = 0; i < uiIndex; i++) if (!this.messages[i].local) n++;
    return n;
  }
  renderOne(role, content, final) {
    const wrap = this.messagesEl.createDiv({ cls: `odysseus-msg odysseus-msg-${role}` });
    const header = wrap.createDiv({ cls: "odysseus-msg-role" });
    header.setText(role);
    const body = wrap.createDiv({ cls: "odysseus-msg-body" });
    if (role === "assistant" && final) {
      this.renderMarkdownInto(body, content);
      this.renderAssistantFooter(wrap, content);
    } else {
      body.setText(content);
      if (role === "user") this.addUserActions(wrap, () => content);
    }
    this.messagesEl.scrollTop = this.messagesEl.scrollHeight;
    return body;
  }
  // Retry / Fork / Delete on assistant bubbles. These map to server-side
  // history operations keyed by message index (not id), with local-only
  // messages excluded from the count.
  addAssistantActions(wrap, content) {
    const uiIndex = this.messages.findIndex((m) => m.role === "assistant" && m.content === content);
    if (uiIndex < 0) return;
    const row = wrap.createDiv({ cls: "odysseus-msg-actions odysseus-msg-actions-bottom" });
    const retryBtn = row.createEl("button", { cls: "odysseus-msg-action", text: "\u21BB Retry" });
    retryBtn.setAttr("title", "Delete this reply and regenerate from the previous message");
    retryBtn.addEventListener("click", () => void this.retryAssistant(uiIndex));
    const forkBtn = row.createEl("button", { cls: "odysseus-msg-action", text: "\u2442 Fork" });
    forkBtn.setAttr("title", "Create a new session containing the conversation up to this point");
    forkBtn.addEventListener("click", () => void this.forkAtMessage(uiIndex));
    const delBtn = row.createEl("button", { cls: "odysseus-msg-action", text: "\u{1F5D1}" });
    delBtn.setAttr("title", "Delete this reply (and the message that prompted it)");
    delBtn.addEventListener("click", () => void this.deleteAssistant(uiIndex));
  }
  async retryAssistant(uiIndex) {
    if (!this.currentSessionId) {
      new import_obsidian11.Notice("Odysseus: no active session");
      return;
    }
    let userIdx = -1;
    for (let i = uiIndex - 1; i >= 0; i--) {
      if (this.messages[i].role === "user") {
        userIdx = i;
        break;
      }
    }
    if (userIdx < 0) {
      new import_obsidian11.Notice("Odysseus: no preceding message to retry");
      return;
    }
    const userText = this.messages[userIdx].content.replace(/\n\n_\+\d+ note.*$/s, "").replace(/\n_\+\d+ attachment.*$/s, "");
    const status = working("retrying");
    try {
      await this.plugin.client.deleteMessages(this.currentSessionId, [this.serverIndexOf(uiIndex)]);
      this.messages.splice(uiIndex, 1);
      this.renderMessages();
      this.inputEl.value = userText;
      await this.send();
    } catch (e) {
      showError("retry failed", e);
    } finally {
      status.done();
    }
  }
  async forkAtMessage(uiIndex) {
    if (!this.currentSessionId) {
      new import_obsidian11.Notice("Odysseus: no active session");
      return;
    }
    const keepCount = this.serverIndexOf(uiIndex) + 1;
    const status = working("forking session");
    try {
      const newId = await this.plugin.client.forkSession(this.currentSessionId, keepCount);
      await this.loadSessions();
      if (newId) {
        this.sessionEl.value = newId;
        this.sessionEl.dispatchEvent(new Event("change"));
        new import_obsidian11.Notice("Odysseus: forked \u2014 switched to the new session");
      } else {
        new import_obsidian11.Notice("Odysseus: fork created (refresh to see it)");
      }
    } catch (e) {
      showError("fork failed", e);
    } finally {
      status.done();
    }
  }
  async deleteAssistant(uiIndex) {
    if (!this.currentSessionId) {
      new import_obsidian11.Notice("Odysseus: no active session");
      return;
    }
    let userIdx = -1;
    for (let i = uiIndex - 1; i >= 0; i--) {
      if (this.messages[i].role === "user") {
        userIdx = i;
        break;
      }
    }
    const serverIndices = [this.serverIndexOf(uiIndex)];
    if (userIdx >= 0) serverIndices.push(this.serverIndexOf(userIdx));
    const status = working("deleting");
    try {
      await this.plugin.client.deleteMessages(this.currentSessionId, serverIndices.sort((a, b) => b - a));
      const toRemove = [uiIndex, userIdx].filter((i) => i >= 0).sort((a, b) => b - a);
      for (const i of toRemove) this.messages.splice(i, 1);
      this.renderMessages();
      new import_obsidian11.Notice("Odysseus: deleted");
    } catch (e) {
      showError("delete failed", e);
    } finally {
      status.done();
    }
  }
  // Hover actions on user bubbles — same icon scheme as assistant replies:
  // Copy + Edit/resend (puts the message back in the input).
  addUserActions(wrap, getText) {
    const footer = wrap.createDiv({ cls: "odysseus-msg-footer odysseus-msg-footer-user" });
    footer.createDiv({ cls: "odysseus-footer-spacer" });
    const addAction = (icon, tooltip, onClick) => {
      const b = footer.createEl("button", { cls: "odysseus-footer-action", attr: { title: tooltip, "aria-label": tooltip } });
      (0, import_obsidian11.setIcon)(b.createSpan({ cls: "odysseus-footer-icon" }), icon);
      b.addEventListener("click", onClick);
    };
    addAction("copy", "Copy", async () => {
      try {
        await navigator.clipboard.writeText(getText());
        new import_obsidian11.Notice("Odysseus: copied");
      } catch {
        new import_obsidian11.Notice("Odysseus: clipboard failed");
      }
    });
    addAction("pencil", "Edit / resend", () => {
      const raw = getText().replace(/\n\n_\+\d+ note.*$/s, "").replace(/\n_\+\d+ attachment.*$/s, "");
      this.inputEl.value = raw;
      this.inputEl.focus();
    });
  }
  scheduleStreamingMarkdownRender(target, text) {
    if (!text || text === "thinking\u2026") return;
    if (this.streamingRenderTimer != null) return;
    this.streamingRenderLastLen = text.length;
    this.streamingRenderTimer = window.setTimeout(() => {
      this.streamingRenderTimer = null;
      if (!target.isConnected) return;
      void this.renderMarkdownInto(target, text);
    }, 250);
  }
  cancelStreamingRender() {
    if (this.streamingRenderTimer != null) {
      window.clearTimeout(this.streamingRenderTimer);
      this.streamingRenderTimer = null;
    }
    this.streamingRenderLastLen = 0;
  }
  async renderMarkdownInto(el, markdown) {
    el.empty();
    try {
      const sourcePath = this.app.workspace.getActiveFile()?.path ?? "";
      await import_obsidian11.MarkdownRenderer.render(this.app, markdown, el, sourcePath, this);
    } catch {
      el.setText(markdown);
    }
  }
  // ---------- File action detection ----------
  //
  // When the model emits a fenced code block whose info string contains a
  // path (e.g.   ```markdown:Projects/Plan.md   ), surface a "Save to vault"
  // button below the reply. Click → preview modal → write via vault.create /
  // vault.modify. The model never touches files directly; the user always
  // gates the apply.
  renderFileActions(wrap, markdown) {
    const blocks = detectFileBlocks(markdown);
    if (blocks.length === 0) return;
    const row = wrap.createDiv({ cls: "odysseus-file-actions" });
    for (const block of blocks) {
      const existing = this.app.vault.getAbstractFileByPath(block.path);
      const verb = existing instanceof import_obsidian11.TFile ? "Update" : "Create";
      const btn = row.createEl("button", { cls: "odysseus-file-action-btn", text: `\u{1F4E5} ${verb} ${block.path}` });
      btn.addEventListener("click", () => void this.applyFileBlock(block));
    }
  }
  async applyFileBlock(block) {
    const existing = this.app.vault.getAbstractFileByPath(block.path);
    const existingContent = existing instanceof import_obsidian11.TFile ? await this.app.vault.read(existing) : "";
    const apply = async () => {
      try {
        if (existing instanceof import_obsidian11.TFile) {
          await this.app.vault.modify(existing, block.content);
          new import_obsidian11.Notice(`Odysseus: updated ${block.path}`);
        } else {
          const parts = block.path.split(/[\\/]/);
          if (parts.length > 1) {
            const dir = parts.slice(0, -1).join("/");
            if (!this.app.vault.getAbstractFileByPath(dir)) await this.app.vault.createFolder(dir);
          }
          await this.app.vault.create(block.path, block.content);
          new import_obsidian11.Notice(`Odysseus: created ${block.path}`);
        }
      } catch (e) {
        showError("file action failed", e);
      }
    };
    if (this.plugin.settings.previewBeforeReplace) {
      const { PreviewModal: PreviewModal2 } = await Promise.resolve().then(() => (init_preview_modal(), preview_modal_exports));
      new PreviewModal2(this.app, {
        title: `${existing ? "Update" : "Create"} ${block.path}`,
        originalText: existingContent,
        newText: block.content,
        onAccept: apply
      }).open();
    } else {
      await apply();
    }
  }
  // Small badge showing how a reply actually executed, derived from server
  // metrics — independent of any toggle display. agent_prep_time is only
  // present when the agent loop ran, so it's a reliable "ran as agent" signal.
  renderModeBadge(wrap, sentMode, metrics, sources) {
    const ranAsAgent = !!metrics && (metrics.agent_prep_time !== void 0 || metrics.agent_model_wait_time !== void 0);
    const ranMode = ranAsAgent ? "agent" : "chat";
    const badge = wrap.createDiv({ cls: "odysseus-mode-badge" });
    badge.createSpan({ text: ranMode === "agent" ? "\u{1F916} Agent" : "\u{1F5E8} Chat", cls: "odysseus-mode-badge-main" });
    if (sources.length > 0) badge.createSpan({ text: `\xB7 \u{1F310} ${sources.length}`, cls: "odysseus-mode-badge-web" });
    if (sentMode === "agent" && ranMode === "chat") {
      const warn = badge.createSpan({ text: "\xB7 \u26A0\uFE0F sent as Agent, ran as Chat", cls: "odysseus-mode-badge-warn" });
      warn.setAttr("title", "The server ran this turn in chat mode, so no tools (incl. web search) were available. The session's stored mode may be overriding the request. Try sending again, or set the session to Agent in the Odysseus web UI.");
    }
  }
  // One footer per assistant reply: outlined info chips (mode/thinking/memory/
  // sources) on the left, bare monochrome action icons on the right (Copy,
  // Regenerate, Save), then a "…" overflow with the rest + transforms.
  // `extras` is only present for fresh replies (history messages have no
  // thinking/memory/sources data).
  renderAssistantFooter(wrap, content, extras) {
    const footer = wrap.createDiv({ cls: "odysseus-msg-footer" });
    const bodies = wrap.createDiv({ cls: "odysseus-msg-footer-bodies" });
    const addChip = (icon, count, tooltip, build) => {
      const chip = footer.createEl("button", { cls: "odysseus-footer-chip", attr: { title: tooltip, "aria-label": tooltip } });
      (0, import_obsidian11.setIcon)(chip.createSpan({ cls: "odysseus-footer-icon" }), icon);
      if (count !== null) chip.createSpan({ cls: "odysseus-footer-count", text: String(count) });
      if (build) {
        const body = bodies.createDiv({ cls: "odysseus-footer-body" });
        body.hide();
        build(body);
        chip.addEventListener("click", () => {
          const open = body.isShown();
          if (open) body.hide();
          else body.show();
          chip.toggleClass("is-open", !open);
        });
      }
    };
    if (extras) {
      const ranAgent = !!extras.metrics && (extras.metrics.agent_prep_time !== void 0 || extras.metrics.agent_model_wait_time !== void 0);
      addChip(ranAgent ? "bot" : "message-circle", null, ranAgent ? "Ran as Agent" : "Ran as Chat");
      if (extras.sentMode === "agent" && !ranAgent) {
        const warn = footer.createEl("span", { cls: "odysseus-footer-chip odysseus-footer-warn", attr: { title: "Sent as Agent but ran as Chat \u2014 no tools were available this turn." } });
        (0, import_obsidian11.setIcon)(warn.createSpan({ cls: "odysseus-footer-icon" }), "alert-triangle");
      }
      if (extras.thinking && extras.thinking.trim()) {
        addChip("lightbulb", null, "Thinking \u2014 click to view the model's reasoning", (b) => {
          b.createDiv({ cls: "odysseus-thinking-body" }).setText(extras.thinking.trim());
        });
      }
      if (extras.memories && extras.memories.length > 0) {
        addChip("brain", extras.memories.length, `${extras.memories.length} memor${extras.memories.length === 1 ? "y" : "ies"} used`, (b) => {
          const ul = b.createEl("ul", { cls: "odysseus-memories-list" });
          for (const m of extras.memories) {
            const li = ul.createEl("li");
            li.setText(m.text);
            if (m.category) li.createSpan({ cls: "odysseus-memory-cat", text: `  (${m.category})` });
          }
        });
      }
      if (extras.sources && extras.sources.length > 0) {
        addChip("globe", extras.sources.length, `${extras.sources.length} web source${extras.sources.length === 1 ? "" : "s"}`, (b) => {
          const ol = b.createEl("ol", { cls: "odysseus-sources-list" });
          for (const src of extras.sources) {
            const li = ol.createEl("li");
            const a = li.createEl("a", { text: src.title ?? shortenUrl(src.url), attr: { href: src.url } });
            a.setAttr("target", "_blank");
            a.setAttr("rel", "noopener noreferrer");
          }
        });
      }
    }
    footer.createDiv({ cls: "odysseus-footer-spacer" });
    const uiIndex = this.messages.findIndex((m) => m.role === "assistant" && m.content === content);
    const addAction = (icon, tooltip, onClick) => {
      const b = footer.createEl("button", { cls: "odysseus-footer-action", attr: { title: tooltip, "aria-label": tooltip } });
      (0, import_obsidian11.setIcon)(b.createSpan({ cls: "odysseus-footer-icon" }), icon);
      b.addEventListener("click", (ev) => onClick(ev));
    };
    addAction("copy", "Copy", async () => {
      try {
        await navigator.clipboard.writeText(content);
        new import_obsidian11.Notice("Odysseus: copied");
      } catch {
        new import_obsidian11.Notice("Odysseus: clipboard failed");
      }
    });
    addAction("refresh-cw", "Regenerate", () => {
      if (uiIndex >= 0) void this.retryAssistant(uiIndex);
    });
    addAction("save", "Save as note", () => void this.saveReplyAsNote(content));
    if (this.ttsAvailable && this.plugin.settings.ttsReadAloud) {
      const b = footer.createEl("button", { cls: "odysseus-footer-action odysseus-tts-action", attr: { title: "Read aloud", "aria-label": "Read aloud" } });
      const iconSpan = b.createSpan({ cls: "odysseus-footer-icon" });
      (0, import_obsidian11.setIcon)(iconSpan, "volume-2");
      b.addEventListener("click", () => {
        this.tts.toggle(content, (state) => {
          b.toggleClass("is-playing", state === "playing");
          b.toggleClass("is-loading", state === "loading");
          (0, import_obsidian11.setIcon)(iconSpan, state === "playing" ? "square" : state === "loading" ? "loader" : "volume-2");
        });
      });
    }
    addAction("more-horizontal", "More actions", (ev) => {
      const menu = new import_obsidian11.Menu();
      menu.addItem((i) => i.setTitle("Insert at cursor").setIcon("text-cursor-input").onClick(() => {
        const v = this.app.workspace.getActiveViewOfType(import_obsidian11.MarkdownView);
        if (v?.editor) v.editor.replaceSelection(content);
        else new import_obsidian11.Notice("Odysseus: open a note in edit mode first");
      }));
      menu.addItem((i) => i.setTitle("Fork from here").setIcon("git-fork").onClick(() => {
        const idx = this.messages.findIndex((m) => m.role === "assistant" && m.content === content);
        if (idx >= 0) void this.forkAtMessage(idx);
        else new import_obsidian11.Notice("Odysseus: message not found");
      }));
      menu.addItem((i) => i.setTitle("Delete").setIcon("trash").onClick(() => {
        const idx = this.messages.findIndex((m) => m.role === "assistant" && m.content === content);
        if (idx >= 0) void this.deleteAssistant(idx);
        else new import_obsidian11.Notice("Odysseus: message not found");
      }));
      menu.addSeparator();
      menu.addItem((i) => i.setTitle("Rewrite shorter").setIcon("minimize-2").onClick(() => this.sendFollowup("Rewrite your previous response to be more concise, keeping all the key points.")));
      menu.addItem((i) => i.setTitle("Explain simpler").setIcon("graduation-cap").onClick(() => this.sendFollowup("Re-explain your previous response in simpler, plainer terms.")));
      menu.addItem((i) => i.setTitle("Expand / more detail").setIcon("maximize-2").onClick(() => this.sendFollowup("Expand your previous response with more detail and concrete examples.")));
      menu.addItem((i) => i.setTitle("More formal").setIcon("briefcase").onClick(() => this.sendFollowup("Rewrite your previous response in a more formal, professional tone.")));
      menu.addItem((i) => i.setTitle("Add sources / verify").setIcon("search-check").onClick(() => this.sendFollowup("Verify the claims in your previous response and cite sources.")));
      menu.showAtMouseEvent(ev);
    });
  }
  // Send a one-line follow-up instruction as a new turn (e.g. "make that
  // shorter"). The model already has its previous reply in context.
  sendFollowup(instruction) {
    this.inputEl.value = instruction;
    void this.send();
  }
  addCopyButton(wrap, getText) {
    const row = wrap.createDiv({ cls: "odysseus-msg-actions" });
    const copyBtn = row.createEl("button", { cls: "odysseus-msg-action", text: "Copy" });
    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(getText());
        copyBtn.setText("Copied");
        setTimeout(() => copyBtn.setText("Copy"), 1200);
      } catch {
        new import_obsidian11.Notice("Odysseus: clipboard write failed");
      }
    });
    const saveBtn = row.createEl("button", { cls: "odysseus-msg-action", text: "Save as note" });
    saveBtn.addEventListener("click", () => void this.saveReplyAsNote(getText()));
    const insertBtn = row.createEl("button", { cls: "odysseus-msg-action", text: "Insert here" });
    insertBtn.addEventListener("click", () => {
      const view = this.app.workspace.getActiveViewOfType(import_obsidian11.MarkdownView);
      if (view?.editor) view.editor.replaceSelection(getText());
      else new import_obsidian11.Notice("Odysseus: open a note in edit mode first");
    });
  }
  async saveReplyAsNote(text) {
    const { QuickPromptModal: QuickPromptModal2 } = await Promise.resolve().then(() => (init_chat_modal(), chat_modal_exports));
    new QuickPromptModal2(this.plugin, {
      title: "Save reply to note",
      placeholder: "e.g. Drafts/My note.md",
      defaultValue: suggestNoteName2(text),
      onSubmit: async (path) => {
        let final = path.trim();
        if (!final.endsWith(".md")) final += ".md";
        if (this.app.vault.getAbstractFileByPath(final)) {
          new import_obsidian11.Notice(`Odysseus: ${final} already exists`);
          return;
        }
        const parts = final.split("/");
        if (parts.length > 1) {
          const dir = parts.slice(0, -1).join("/");
          if (!this.app.vault.getAbstractFileByPath(dir)) await this.app.vault.createFolder(dir);
        }
        await this.app.vault.create(final, text);
        new import_obsidian11.Notice(`Odysseus: saved to ${final}`);
      }
    }).open();
  }
  renderMessages() {
    this.messagesEl.empty();
    for (const m of this.messages) this.renderOne(m.role, m.content, true);
  }
  async compactActiveSession() {
    if (!this.currentSessionId) {
      new import_obsidian11.Notice("Odysseus: pick or create a session first");
      return;
    }
    const sid = this.currentSessionId;
    const status = working("compacting session");
    try {
      await this.plugin.client.compactSession(sid);
      new import_obsidian11.Notice("Odysseus: session compacted");
      this.compactPromptShown = false;
      this.presetApplied = false;
      this.vaultHintApplied = false;
      await this.loadHistory(sid);
      this.lastMetrics = null;
      await this.refreshContextIndicator(sid);
    } catch (e) {
      showError("compact failed", e);
    } finally {
      status.done();
    }
  }
  cancel() {
    if (!this.inFlight) return;
    this.abortCtl?.abort();
    if (this.currentSessionId) void this.plugin.client.stopStream(this.currentSessionId).catch(() => void 0);
    this.statusEl.setText("Cancelling\u2026");
  }
  setSending(on) {
    this.inFlight = on;
    this.sendBtn.setText(on ? "Stop" : "Send");
    this.sendBtn.toggleClass("mod-warning", on);
    this.statusEl.setText(on ? "Odysseus thinking\u2026" : "");
  }
  // Probe whether the server can do STT/TTS right now. "browser" and "disabled"
  // providers can't be driven from the plugin (browser STT/TTS is client-side
  // in the web UI and makes the server endpoints 503), so they count as off.
  async refreshSpeechAvailability() {
    try {
      const [stt, tts] = await Promise.all([
        this.plugin.client.sttStats(),
        this.plugin.client.ttsStats()
      ]);
      this.sttAvailable = stt.available && stt.provider !== "browser" && stt.provider !== "disabled";
      this.ttsAvailable = tts.available && tts.provider !== "browser" && tts.provider !== "disabled";
      this.tts.setSpeed(tts.speed);
    } catch {
    }
    this.updateMicButton();
  }
  // Show/style the dedicated mic button. Hidden unless STT is usable and the
  // setting is on; turns into a red "stop" while recording.
  updateMicButton() {
    if (!this.micBtn) return;
    const show = this.sttAvailable && this.plugin.settings.voiceInput;
    this.micBtn.toggle(show);
    if (!show) return;
    const rec = this.voice?.isRecording ?? false;
    (0, import_obsidian11.setIcon)(this.micBtn, rec ? "square" : "mic");
    this.micBtn.toggleClass("is-recording", rec);
    this.micBtn.setAttr("title", rec ? "Stop recording" : "Record voice (dictate)");
  }
  async beginRecording() {
    const autoSend = this.plugin.settings.sttAutoSend === true;
    const pauseMs = Number(this.plugin.settings.sttPauseMs) || 1500;
    try {
      await this.voice.start(autoSend ? { onSilence: () => void this.finishRecording(true), pauseMs } : void 0);
    } catch (e) {
      showError("microphone access", e);
      return;
    }
    this.statusEl.setText(autoSend ? "Listening\u2026 (pause to send)" : "Recording\u2026 click to stop");
    this.updateMicButton();
  }
  async finishRecording(thenSend = false) {
    this.statusEl.setText("Transcribing\u2026");
    this.updateMicButton();
    let text = "";
    try {
      text = await this.voice.stopAndTranscribe();
    } catch (e) {
      showError("transcription failed", e);
    }
    this.statusEl.setText("");
    if (text) {
      const cur = this.inputEl.value;
      this.inputEl.value = cur ? `${cur.trimEnd()} ${text}` : text;
      this.inputEl.dispatchEvent(new Event("input"));
      this.inputEl.focus();
      this.updateMicButton();
      if (thenSend) void this.send();
    } else {
      if (!thenSend) new import_obsidian11.Notice("Odysseus: no speech detected");
      this.updateMicButton();
    }
  }
  // Returns true if the message was a direct command (and handled), so send()
  // should NOT forward it to the chat endpoint.
  async dispatchDirectCommand(raw) {
    const m = raw.match(/^\/(\w[\w-]*)\b\s*([\s\S]*)$/);
    if (!m) return false;
    const cmd = "/" + m[1].toLowerCase();
    const arg = m[2].trim();
    const def = DIRECT_COMMANDS.find((d) => d.label === cmd);
    if (!def) return false;
    this.inputEl.value = "";
    const status = working(def.label.slice(1));
    try {
      switch (cmd) {
        case "/note": {
          if (!arg) {
            new import_obsidian11.Notice("Odysseus: /note needs text");
            break;
          }
          const r = await this.plugin.client.createNote({ content: arg, noteType: "note" });
          new import_obsidian11.Notice(r.ok ? "Odysseus: note created" : `Odysseus: ${r.error ?? "failed"}`);
          break;
        }
        case "/todo": {
          if (!arg) {
            new import_obsidian11.Notice("Odysseus: /todo needs text");
            break;
          }
          const r = await this.plugin.client.createNote({ title: arg, noteType: "task", items: [arg] });
          new import_obsidian11.Notice(r.ok ? "Odysseus: to-do created" : `Odysseus: ${r.error ?? "failed"}`);
          break;
        }
        case "/event": {
          const em = arg.match(/^(\S+)\s+(.+)$/);
          if (!em) {
            new import_obsidian11.Notice("Odysseus: /event <time> <title>");
            break;
          }
          const r = await this.plugin.client.createEvent({ start: em[1], title: em[2] });
          new import_obsidian11.Notice(r.ok ? "Odysseus: event created" : `Odysseus: ${r.error ?? "failed"}`);
          break;
        }
        case "/memory": {
          if (!arg) {
            new import_obsidian11.Notice("Odysseus: /memory needs a fact");
            break;
          }
          await this.plugin.client.memoryAdd(arg);
          new import_obsidian11.Notice("Odysseus: memory saved");
          break;
        }
        case "/search": {
          const results = await this.plugin.client.searchHistory(arg, 20);
          const lines = results.slice(0, 10).map((r) => {
            const rr = r;
            return `- ${String(rr.session_name ?? rr.session_id ?? "")}: ${String(rr.content_snippet ?? rr.content ?? "")}`;
          });
          this.appendMessage("system", `\u{1F50E} ${results.length} result(s) for "${arg}"
${lines.join("\n")}`);
          break;
        }
        case "/sh": {
          if (!arg) {
            new import_obsidian11.Notice("Odysseus: /sh needs a command");
            break;
          }
          const r = await this.plugin.client.runShell(arg);
          if (!r.ok) {
            new import_obsidian11.Notice(r.adminRequired ? "Odysseus: /sh requires admin" : `Odysseus: ${r.error ?? "failed"}`);
            break;
          }
          const out = `$ ${arg}
${r.stdout || ""}${r.stderr ? "\n[stderr]\n" + r.stderr : ""}`.trim();
          this.appendMessage("system", out || "(no output)");
          break;
        }
        case "/compact":
          await this.compactActiveSession();
          break;
        case "/new":
          this.sessionEl.value = "";
          this.sessionEl.dispatchEvent(new Event("change"));
          break;
        case "/clear":
          this.messages = [];
          this.renderMessages();
          break;
      }
    } catch (e) {
      showError(`${def.label} failed`, e);
    } finally {
      status.done();
    }
    return true;
  }
  // Name a freshly-created session so plugin chats are distinct in Odysseus's
  // session list (not a wall of identical "Obsidian"). Uses the first words of
  // the opening message as the topic, plus the active note when it's in context.
  deriveSessionName(message) {
    const firstLine = (message || "").split("\n").map((s) => s.trim()).find(Boolean) || "";
    let topic = firstLine.replace(/^\/[\w-]+\s*/, "").trim();
    if (topic.length > 48) topic = topic.slice(0, 48).replace(/\s+\S*$/, "") + "\u2026";
    const active = this.app.workspace.getActiveFile();
    const note = this.ctxIncludeActive && active ? active.basename : "";
    if (topic && note) return `Obsidian \xB7 ${topic} \u2014 ${note}`;
    if (topic) return `Obsidian \xB7 ${topic}`;
    if (note) return `Obsidian \xB7 ${note}`;
    return `Obsidian \xB7 ${(/* @__PURE__ */ new Date()).toLocaleString()}`;
  }
  async send() {
    const raw = this.inputEl.value.trim();
    if (!raw) return;
    if (await this.dispatchDirectCommand(raw)) return;
    const { stripped, files: mentionedFiles } = parseMentions(this.plugin, raw);
    const contextFiles = this.plugin.settings.inlineMentionedNoteContent ? [...mentionedFiles] : [];
    const mentionedPaths = mentionedFiles.map((f) => f.path);
    let activeDocId = "";
    if (this.ctxIncludeActive) {
      const activeFile = this.app.workspace.getActiveFile();
      if (activeFile && !contextFiles.some((f) => f.path === activeFile.path)) {
        contextFiles.push(activeFile);
        activeDocId = activeFile.path;
      }
    }
    for (const note of this.ctxNotes) {
      if (!contextFiles.some((f) => f.path === note.path)) contextFiles.push(note);
    }
    for (const folder of this.ctxFolders) {
      for (const child of folder.children) {
        if (child instanceof import_obsidian11.TFile && child.extension === "md" && !contextFiles.some((f) => f.path === child.path)) {
          contextFiles.push(child);
        }
      }
    }
    if (this.ctxRecentDays > 0) {
      const recents = recentMarkdownFiles(this.plugin, this.ctxRecentDays).slice(0, 8);
      for (const f of recents) {
        if (!contextFiles.some((c) => c.path === f.path)) contextFiles.push(f);
      }
    }
    let contextBlock = await buildContextBlock(this.plugin, contextFiles);
    if (this.ctxUrls.length > 0) {
      const urlBlock = this.ctxUrls.map((u) => `### ${u.url}

${truncateForPrompt(u.content)}`).join("\n\n---\n\n");
      contextBlock = contextBlock ? `${contextBlock}

---

${urlBlock}` : urlBlock;
    }
    const activePersona = this.personas.find((p) => p.id === this.plugin.settings.activePresetId);
    let presetIdForServer = "";
    let presetBlock = "";
    if (activePersona && activePersona.prompt) {
      if (activePersona.source === "odysseus" && this.personaSyncMode === "server") {
        presetIdForServer = "custom";
      } else if (!this.presetApplied) {
        presetBlock = `[System instructions]
${activePersona.prompt}

---

`;
      }
    }
    const profile = this.activeProfile();
    if (profile && this.chatMode !== "agent") {
      this.chatMode = "agent";
      this.updateModeButton();
    }
    const looksVaultRelated = contextFiles.length > 0 || mentionedPaths.length > 0 || /\b(note|notes|file|files|folder|folders|vault|obsidian|markdown|\.md|document|frontmatter|backlink|daily note|append|rename|move)\b/i.test(stripped);
    const wantBias = !profile && this.plugin.settings.biasVaultTools && !!this.plugin.mcpServer?.isRunning() && this.chatMode === "agent" && looksVaultRelated;
    const vaultHint = wantBias ? "[Vault tools] For the user's notes, files, and folders use the Obsidian vault tools \u2014 read: read_note, search_vault, list_files; write: write_note, append_note, insert_under_heading, set_frontmatter, create_folder, move_note. Do NOT use manage_notes (that's Odysseus's own notes, not vault files) or bash (server filesystem) to create or edit the user's notes.\n\n---\n\n" : "";
    const parts = [];
    if (presetBlock) parts.push(presetBlock);
    if (vaultHint) parts.push(vaultHint);
    if (mentionedPaths.length > 0 && !this.plugin.settings.inlineMentionedNoteContent) {
      parts.push(
        `The user referenced these vault notes (paths only \u2014 content not inlined):
${mentionedPaths.map((p) => `- ${p}`).join("\n")}

---

`
      );
    }
    if (contextBlock) parts.push(`Use the following notes from my Obsidian vault as context for the request that follows.

${contextBlock}

---

`);
    parts.push(stripped);
    const messageToSend = parts.join("");
    const attachments = this.stagedAttachments.map((a) => ({
      name: a.name,
      data: a.data,
      contentType: a.contentType
    }));
    this.inputEl.value = "";
    const userDisplay = stripped + (contextFiles.length ? `

_+${contextFiles.length} note${contextFiles.length === 1 ? "" : "s"} as context_` : "") + (attachments.length ? `
_+${attachments.length} attachment${attachments.length === 1 ? "" : "s"}_` : "");
    this.appendMessage("user", userDisplay);
    const assistantBody = this.appendMessage("assistant", "\u2026");
    assistantBody.empty();
    const { createWorkingRow: createWorkingRow2 } = await Promise.resolve().then(() => (init_spinner(), spinner_exports));
    let working2 = createWorkingRow2(assistantBody, this.webSearchOn ? "Searching the web" : "Odysseus is thinking");
    let firstChunk = true;
    this.abortCtl?.abort();
    this.abortCtl = new AbortController();
    this.setSending(true);
    const autoTts = this.ttsAvailable && this.plugin.settings.ttsAutoPlay;
    if (autoTts) this.tts.streamingStart();
    try {
      let resolvedSid = this.currentSessionId;
      if (!resolvedSid) {
        resolvedSid = await this.plugin.client.createSession({ name: this.deriveSessionName(stripped) });
        this.currentSessionId = resolvedSid;
      }
      const useWeb = this.webSearchOn;
      const sentMode = this.chatMode;
      const { text: reply, sessionId, metrics, sources, thinking, memories } = await this.plugin.client.chat(
        messageToSend,
        {
          sessionId: resolvedSid,
          mode: sentMode,
          useWebSearch: useWeb,
          activeDocId,
          attachments,
          presetId: presetIdForServer || void 0,
          // Agent profile: the server-stored profile drives the system-message
          // injection (prompt + selected memories/skills); tools + flags are
          // also sent directly so the pin degrades gracefully if the server's
          // profile copy is stale or missing.
          profileId: profile ? profile.id : void 0,
          tools: profile ? [.../* @__PURE__ */ new Set([...profile.alwaysOnTools ?? [], ...profile.tools ?? []])] : void 0,
          noMemory: profile ? profileMemoryMode(profile) !== "auto" : void 0,
          noSkills: profile ? profileSkillsMode(profile) !== "auto" : void 0,
          signal: this.abortCtl.signal
        },
        (_delta, full) => {
          const shown = this.plugin.settings.hideReasoning ? stripReasoning(full) : full;
          if (firstChunk && shown) {
            firstChunk = false;
            working2.destroy();
          }
          if (!firstChunk) {
            assistantBody.setText(shown);
            this.messagesEl.scrollTop = this.messagesEl.scrollHeight;
            this.scheduleStreamingMarkdownRender(assistantBody, shown);
            if (autoTts) this.tts.streamingUpdate(shown);
          }
        }
      );
      this.cancelStreamingRender();
      working2.destroy();
      const cleaned = this.plugin.settings.hideReasoning ? stripReasoning(reply) : reply;
      const finalText = cleaned || "(empty response)";
      if (autoTts) this.tts.streamingEnd(finalText);
      const wrap = assistantBody.parentElement;
      if (wrap) {
        wrap.empty();
        wrap.createDiv({ cls: "odysseus-msg-role" }).setText("assistant");
        const newBody = wrap.createDiv({ cls: "odysseus-msg-body" });
        await this.renderMarkdownInto(newBody, finalText);
        this.renderAssistantFooter(wrap, finalText, { thinking, memories, sentMode, metrics, sources });
        this.renderFileActions(wrap, finalText);
      } else {
        assistantBody.setText(finalText);
      }
      const lastIdx = this.messages.length - 1;
      if (lastIdx >= 0) this.messages[lastIdx].content = finalText;
      if (!this.currentSessionId && sessionId) {
        this.currentSessionId = sessionId;
        await this.loadSessions();
        this.sessionEl.value = sessionId;
      }
      this.saveSessionControls();
      if (presetBlock) this.presetApplied = true;
      if (vaultHint) this.vaultHintApplied = true;
      if (metrics) this.lastMetrics = metrics;
      this.updateTimingIndicator(metrics);
      if (this.currentSessionId) {
        this.plugin.settings.lastSessionId = this.currentSessionId;
        void this.plugin.saveSettings();
        if (this.lastMetrics?.context_percent !== void 0) {
          this.updateContextIndicator(null);
        } else {
          void this.refreshContextIndicator(this.currentSessionId);
        }
      }
      void this.loadSessions();
      this.stagedAttachments = [];
      this.renderAttachments();
    } catch (e) {
      working2.destroy();
      if (autoTts) this.tts.stop();
      const msg = e.message ?? String(e);
      const wrap = assistantBody.parentElement;
      if (this.abortCtl?.signal.aborted) {
        const partial = (assistantBody.textContent ?? "").trim();
        const finalText = partial && partial !== "\u2026" ? partial + "\n\n_(stopped)_" : "_(stopped)_";
        if (wrap) {
          wrap.empty();
          wrap.createDiv({ cls: "odysseus-msg-role" }).setText("assistant");
          const newBody = wrap.createDiv({ cls: "odysseus-msg-body" });
          await this.renderMarkdownInto(newBody, finalText);
          this.renderAssistantFooter(wrap, finalText);
        } else {
          assistantBody.setText(finalText);
        }
        const lastIdx = this.messages.length - 1;
        if (lastIdx >= 0) this.messages[lastIdx].content = finalText;
      } else {
        assistantBody.setText(`Error: ${msg}`);
        showError("chat failed", e);
      }
    } finally {
      this.setSending(false);
    }
  }
};
function truncateForPrompt(s, max = 12e3) {
  if (s.length <= max) return s;
  return s.slice(0, max) + "\n\n\u2026[truncated]";
}
async function fetchUrlAsText(url) {
  const { requestUrl: requestUrl2 } = await import("obsidian");
  const res = await requestUrl2({ url, method: "GET", throw: false });
  if (res.status >= 400) throw new Error(`HTTP ${res.status}`);
  const ct = (res.headers?.["content-type"] ?? "").toLowerCase();
  const raw = res.text ?? "";
  if (ct.includes("text/html") || raw.trimStart().startsWith("<")) {
    const doc = new DOMParser().parseFromString(raw, "text/html");
    doc.querySelectorAll("script, style, noscript, iframe, nav, header, footer").forEach((el) => el.remove());
    const body = doc.body ?? doc.documentElement;
    const text = (body.textContent ?? "").replace(/\s+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
    return text;
  }
  return raw;
}
function suggestNoteName2(text) {
  const heading = text.match(/^#+\s+(.+)$/m);
  const raw = heading ? heading[1] : text.split(/\s+/).slice(0, 8).join(" ");
  return raw.replace(/[\\/:*?"<>|]/g, " ").trim().slice(0, 60) + ".md";
}
var DIRECT_COMMANDS = [
  { label: "/note", sub: "Create an Odysseus note (text after the command)" },
  { label: "/todo", sub: "Create a to-do in Odysseus" },
  { label: "/event", sub: "Calendar event: /event <ISO time> <title>" },
  { label: "/memory", sub: "Add a memory: /memory <fact>" },
  { label: "/search", sub: "Search chat history: /search <query>" },
  { label: "/sh", sub: "Run shell on Odysseus host (admin only)" },
  { label: "/compact", sub: "Summarize older turns of this session" }
];
var SESSION_COMMANDS = [
  { label: "/new", sub: "Start a new session" },
  { label: "/clear", sub: "Clear the chat view (server untouched)" }
];
function fuzzyMatch(haystack, needle) {
  if (!needle) return true;
  if (haystack.includes(needle)) return true;
  let i = 0;
  for (const ch of haystack) {
    if (ch === needle[i]) i++;
    if (i === needle.length) return true;
  }
  return false;
}
function slugify(s) {
  return s.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").slice(0, 32);
}
function shortenUrl(u) {
  try {
    const url = new URL(u);
    return url.hostname.replace(/^www\./, "");
  } catch {
    return u.length > 40 ? u.slice(0, 37) + "\u2026" : u;
  }
}
function detectFileBlocks(markdown) {
  const blocks = [];
  const fence = /(^|\n)```([^\n`]*)\n([\s\S]*?)\n```/g;
  let m;
  while ((m = fence.exec(markdown)) !== null) {
    const info = (m[2] ?? "").trim();
    const content = m[3] ?? "";
    const path = extractPathFromInfo(info);
    if (!path || !isValidVaultPath(path)) continue;
    const lang = info.split(/[\s:]/)[0] || void 0;
    if (!blocks.some((b) => b.path === path && b.content === content)) {
      blocks.push({ path, content, lang });
    }
  }
  return blocks;
}
function extractPathFromInfo(info) {
  if (!info) return null;
  const colonIdx = info.indexOf(":");
  if (colonIdx > -1) {
    const candidate = info.slice(colonIdx + 1).trim();
    if (looksLikePath(candidate)) return candidate;
  }
  const tokens = info.split(/\s+/);
  for (const t of tokens) {
    if (looksLikePath(t)) return t;
  }
  return null;
}
function looksLikePath(s) {
  if (!s) return false;
  return s.includes("/") || /\.[A-Za-z0-9]{1,8}$/.test(s);
}
function isValidVaultPath(p) {
  if (!p || p.length > 500) return false;
  if (p.startsWith("/") || p.startsWith("\\")) return false;
  if (/^[A-Za-z]:[\\/]/.test(p)) return false;
  if (p.split(/[\\/]/).some((part) => part === ".." || part === "")) return false;
  return true;
}
function formatTokens(n) {
  if (n >= 1e6) return (n / 1e6).toFixed(1) + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(1) + "k";
  return String(n);
}
function formatBytes(n) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}
function recentMarkdownFiles(plugin, days) {
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1e3;
  return plugin.app.vault.getMarkdownFiles().filter((f) => f.stat.mtime >= cutoff).sort((a, b) => b.stat.mtime - a.stat.mtime);
}
var UrlPromptModal = class extends import_obsidian12.Modal {
  constructor(plugin, onAccept) {
    super(plugin.app);
    this.onAccept = onAccept;
    this.value = "";
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.createEl("h3", { text: "Add web page as context" });
    contentEl.createEl("p", {
      text: "Paste a URL. The page text will be fetched and inlined into every message in this chat until you remove it.",
      attr: { style: "opacity: 0.7; font-size: 0.85em;" }
    });
    const input = contentEl.createEl("input", {
      type: "text",
      attr: { placeholder: "https://example.com/article", style: "width: 100%;" }
    });
    input.addEventListener("input", () => {
      this.value = input.value;
    });
    input.addEventListener("keydown", (ev) => {
      if (ev.key === "Enter") {
        ev.preventDefault();
        this.submit();
      }
    });
    setTimeout(() => input.focus(), 50);
    const btnRow = contentEl.createDiv({ attr: { style: "display: flex; gap: 8px; margin-top: 12px; justify-content: flex-end;" } });
    btnRow.createEl("button", { text: "Cancel" }).addEventListener("click", () => this.close());
    const ok = btnRow.createEl("button", { text: "Add", cls: "mod-cta" });
    ok.addEventListener("click", () => this.submit());
  }
  onClose() {
    this.contentEl.empty();
  }
  async submit() {
    const url = this.value.trim();
    if (!url) return;
    if (!/^https?:\/\//i.test(url)) {
      new import_obsidian11.Notice("Odysseus: URL must start with http:// or https://");
      return;
    }
    this.close();
    await this.onAccept(url);
  }
};
function isImageExt(ext) {
  return /^(png|jpe?g|gif|webp|svg|bmp)$/i.test(ext);
}
function guessMime(ext) {
  const e = ext.toLowerCase();
  if (e === "png") return "image/png";
  if (e === "jpg" || e === "jpeg") return "image/jpeg";
  if (e === "gif") return "image/gif";
  if (e === "webp") return "image/webp";
  if (e === "svg") return "image/svg+xml";
  if (e === "pdf") return "application/pdf";
  if (e === "txt" || e === "md") return "text/plain";
  if (e === "json") return "application/json";
  if (e === "csv") return "text/csv";
  return "application/octet-stream";
}

// memory-view.ts
var import_obsidian13 = require("obsidian");
init_odysseus_api();
var VIEW_TYPE_ODYSSEUS_MEMORY = "odysseus-memory-view";
var OdysseusMemoryView = class extends import_obsidian13.ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    this.plugin = plugin;
    this.all = [];
  }
  getViewType() {
    return VIEW_TYPE_ODYSSEUS_MEMORY;
  }
  getDisplayText() {
    return "Odysseus memory";
  }
  getIcon() {
    return "brain";
  }
  async onOpen() {
    const root = this.containerEl.children[1];
    root.empty();
    root.addClass("odysseus-memory-view");
    this.themeRoot = root;
    void this.plugin.applyTheme();
    const toolbar = root.createDiv({ cls: "odysseus-mem-toolbar" });
    this.searchEl = toolbar.createEl("input", { type: "text", attr: { placeholder: "Filter memories\u2026" } });
    this.searchEl.addEventListener("input", () => this.renderList());
    const addBtn = toolbar.createEl("button", { text: "+ Add" });
    addBtn.addEventListener("click", () => this.promptAdd());
    const refreshBtn = toolbar.createEl("button", { text: "\u21BB" });
    refreshBtn.addEventListener("click", () => void this.loadMemories());
    this.listEl = root.createDiv({ cls: "odysseus-mem-list" });
    await this.loadMemories();
  }
  async loadMemories() {
    this.listEl.empty();
    this.listEl.createEl("p", { text: "Loading\u2026", attr: { style: "opacity:0.6;" } });
    try {
      this.all = await this.plugin.client.memoryList();
      this.renderList();
    } catch (e) {
      this.listEl.empty();
      showError("could not load memories", e);
    }
  }
  renderList() {
    const q = this.searchEl.value.toLowerCase().trim();
    const rows = q ? this.all.filter((m) => m.text.toLowerCase().includes(q) || (m.category ?? "").toLowerCase().includes(q)) : this.all;
    this.listEl.empty();
    this.listEl.createEl("div", { cls: "odysseus-mem-count", text: `${rows.length} of ${this.all.length} memories` });
    if (rows.length === 0) {
      this.listEl.createEl("p", { text: "No memories.", attr: { style: "opacity:0.6;" } });
      return;
    }
    rows.sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));
    for (const m of rows) {
      const card = this.listEl.createDiv({ cls: "odysseus-mem-card" });
      if (m.pinned) card.addClass("is-pinned");
      const txt = card.createDiv({ cls: "odysseus-mem-text" });
      txt.setText((m.pinned ? "\u{1F4CC} " : "") + m.text);
      const meta = card.createDiv({ cls: "odysseus-mem-meta" });
      if (m.category) meta.createSpan({ text: m.category });
      const actions = card.createDiv({ cls: "odysseus-mem-actions" });
      const pinBtn = actions.createEl("button", { text: m.pinned ? "Unpin" : "Pin" });
      pinBtn.addEventListener("click", async () => {
        if (await this.plugin.client.memoryPin(m.id)) {
          m.pinned = !m.pinned;
          this.renderList();
        } else new import_obsidian13.Notice("Odysseus: pin failed");
      });
      const editBtn = actions.createEl("button", { text: "Edit" });
      editBtn.addEventListener("click", () => this.promptEdit(m));
      const delBtn = actions.createEl("button", { text: "Delete" });
      delBtn.addEventListener("click", async () => {
        if (await this.plugin.client.memoryDelete(m.id)) {
          this.all = this.all.filter((x) => x.id !== m.id);
          this.renderList();
        } else new import_obsidian13.Notice("Odysseus: delete failed");
      });
    }
  }
  async promptAdd() {
    const { QuickPromptModal: QuickPromptModal2 } = await Promise.resolve().then(() => (init_chat_modal(), chat_modal_exports));
    new QuickPromptModal2(this.plugin, {
      title: "Add memory",
      placeholder: "A fact to remember\u2026",
      onSubmit: async (text) => {
        try {
          await this.plugin.client.memoryAdd(text);
          new import_obsidian13.Notice("Odysseus: memory saved");
          await this.loadMemories();
        } catch (e) {
          showError("add failed", e);
        }
      }
    }).open();
  }
  async promptEdit(m) {
    const { QuickPromptModal: QuickPromptModal2 } = await Promise.resolve().then(() => (init_chat_modal(), chat_modal_exports));
    new QuickPromptModal2(this.plugin, {
      title: "Edit memory",
      defaultValue: m.text,
      onSubmit: async (text) => {
        if (await this.plugin.client.memoryUpdate(m.id, text)) {
          m.text = text;
          this.renderList();
        } else new import_obsidian13.Notice("Odysseus: update failed");
      }
    }).open();
  }
};

// embed-view.ts
var import_obsidian14 = require("obsidian");
var VIEW_TYPE_ODYSSEUS_EMBED = "odysseus-embed-view";
var OdysseusEmbedView = class extends import_obsidian14.ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    this.plugin = plugin;
    this.frame = null;
  }
  getViewType() {
    return VIEW_TYPE_ODYSSEUS_EMBED;
  }
  getDisplayText() {
    return "Odysseus (embedded)";
  }
  getIcon() {
    return "globe";
  }
  async onOpen() {
    const root = this.containerEl.children[1];
    root.empty();
    root.addClass("odysseus-embed-view");
    const bar = root.createDiv({ cls: "odysseus-embed-bar" });
    const reload = bar.createEl("button", { text: "\u21BB Reload" });
    reload.addEventListener("click", () => this.loadFrame());
    const ext = bar.createEl("button", { text: "\u2197 Open in browser" });
    ext.addEventListener("click", () => window.open(this.plugin.settings.baseUrl, "_blank"));
    this.statusEl = bar.createSpan({ cls: "odysseus-embed-status" });
    this.loadFrame(root);
  }
  async onClose() {
    this.frame?.remove();
    this.frame = null;
  }
  loadFrame(rootArg) {
    const root = rootArg ?? this.containerEl.children[1];
    this.frame?.remove();
    const url = this.plugin.settings.baseUrl.replace(/\/+$/, "") + "/";
    this.statusEl.setText("Loading " + url + " \u2026");
    const frame = root.createEl("iframe", { cls: "odysseus-embed-frame" });
    frame.setAttr("src", url);
    frame.setAttr("allow", "clipboard-read; clipboard-write; microphone; camera");
    this.frame = frame;
    let loaded = false;
    frame.addEventListener("load", () => {
      loaded = true;
      this.statusEl.setText("");
      try {
        const doc = frame.contentWindow?.document;
        if (doc && doc.body && doc.body.childElementCount === 0) {
          this.showBlockedHint(root, url);
        }
      } catch {
      }
    });
    window.setTimeout(() => {
      if (!loaded) this.showBlockedHint(root, url);
    }, 6e3);
  }
  showBlockedHint(root, url) {
    if (root.querySelector(".odysseus-embed-hint")) return;
    const hint = root.createDiv({ cls: "odysseus-embed-hint" });
    hint.createEl("p", { text: "If the panel above is blank, Odysseus is likely refusing to be embedded (X-Frame-Options or a frame-ancestors CSP)." });
    const ul = hint.createEl("ul");
    ul.createEl("li", { text: "Option A: configure Odysseus to allow framing from app://obsidian.md (CSP frame-ancestors / remove X-Frame-Options)." });
    ul.createEl("li", { text: "Option B: use the built-in chat panel instead \u2014 with the MCP server running, it has the same vault access." });
    const open = hint.createEl("button", { text: "Open Odysseus in your browser" });
    open.addEventListener("click", () => window.open(url, "_blank"));
  }
};

// inline-directives.ts
var import_obsidian15 = require("obsidian");
init_odysseus_api();
init_preview_modal();
var HANDLERS = {};
function clean3(plugin, text) {
  return plugin.settings.hideReasoning ? stripReasoning(text) : text;
}
function applyInlineEdit(plugin, editor, edit, previewOriginal, title) {
  const apply = () => editor.replaceRange(edit.text, edit.from, edit.to);
  if (plugin.settings.previewBeforeReplace) {
    new PreviewModal(plugin.app, {
      title,
      originalText: previewOriginal,
      newText: edit.text,
      onAccept: apply
    }).open();
  } else {
    apply();
  }
}
function parseDirective(line) {
  const m = line.match(/^\s*\/(\w[\w-]*)\b\s*(.*)$/);
  if (!m) return null;
  return { cmd: m[1].toLowerCase(), args: m[2].trim() };
}
function previousBlock(editor, line) {
  let endLine = line - 1;
  while (endLine >= 0 && !editor.getLine(endLine).trim()) endLine--;
  if (endLine < 0) return null;
  let startLine = endLine;
  while (startLine > 0 && editor.getLine(startLine - 1).trim()) startLine--;
  return {
    from: { line: startLine, ch: 0 },
    to: { line: endLine, ch: editor.getLine(endLine).length },
    text: editor.getRange({ line: startLine, ch: 0 }, { line: endLine, ch: editor.getLine(endLine).length })
  };
}
HANDLERS["ask"] = {
  name: "ask",
  help: "/ask <prompt> \u2014 answer the prompt here",
  handler: async (ctx) => {
    if (!ctx.args) {
      new import_obsidian15.Notice("Odysseus: /ask needs a prompt after it");
      return;
    }
    const status = working("asking");
    try {
      const raw = await ctx.plugin.client.chatOneshot(ctx.args);
      const result = clean3(ctx.plugin, raw) || "(no response)";
      applyInlineEdit(
        ctx.plugin,
        ctx.editor,
        { from: ctx.directiveFrom, to: ctx.directiveTo, text: result },
        ctx.args,
        "/ask"
      );
    } catch (e) {
      showError("/ask failed", e);
    } finally {
      status.done();
    }
  }
};
HANDLERS["do"] = {
  name: "do",
  help: "/do <instruction> \u2014 apply your own instruction to previous paragraph (or to args)",
  handler: async (ctx) => {
    const instruction = ctx.args;
    if (!instruction) {
      new import_obsidian15.Notice("Odysseus: /do needs an instruction");
      return;
    }
    const sourceText = ctx.previousBlock?.text;
    if (!sourceText) {
      new import_obsidian15.Notice("Odysseus: /do needs a previous paragraph to act on");
      return;
    }
    const status = working("running custom instruction");
    try {
      const raw = await ctx.plugin.client.rewriteOneshot(sourceText, instruction);
      const result = clean3(ctx.plugin, raw);
      if (!result) {
        new import_obsidian15.Notice("Odysseus: empty response");
        return;
      }
      applyInlineEdit(
        ctx.plugin,
        ctx.editor,
        { from: ctx.previousBlock.from, to: ctx.directiveTo, text: result },
        sourceText,
        `/do \u2014 ${instruction.slice(0, 60)}${instruction.length > 60 ? "\u2026" : ""}`
      );
    } catch (e) {
      showError("/do failed", e);
    } finally {
      status.done();
    }
  }
};
HANDLERS["research"] = {
  name: "research",
  help: "/research <query> \u2014 deep research, replace with summary",
  handler: async (ctx) => {
    const query = ctx.args;
    if (!query) {
      new import_obsidian15.Notice("Odysseus: /research needs a query");
      return;
    }
    const status = working("researching");
    try {
      const sid = await ctx.plugin.client.researchStart(query);
      if (!sid) {
        new import_obsidian15.Notice("Odysseus: research did not start");
        return;
      }
      const result = await waitForResearch2(ctx.plugin, sid);
      if (!result) {
        new import_obsidian15.Notice("Odysseus: research returned no data");
        return;
      }
      const summary = typeof result.summary === "string" ? result.summary : "```json\n" + JSON.stringify(result, null, 2) + "\n```";
      applyInlineEdit(
        ctx.plugin,
        ctx.editor,
        { from: ctx.directiveFrom, to: ctx.directiveTo, text: clean3(ctx.plugin, summary) },
        query,
        `/research \u2014 ${query.slice(0, 60)}`
      );
    } catch (e) {
      showError("/research failed", e);
    } finally {
      status.done();
    }
  }
};
function refineHandler(label, instruction, useWeb = false) {
  return async (ctx) => {
    const sourceText = ctx.args || ctx.previousBlock?.text;
    if (!sourceText) {
      new import_obsidian15.Notice(`Odysseus: /${label} needs text on the previous paragraph or as args`);
      return;
    }
    const status = working(label);
    try {
      const raw = useWeb ? await ctx.plugin.client.chatOneshot(`${instruction}

---

${sourceText}`, { useWebSearch: true, mode: "agent" }) : await ctx.plugin.client.rewriteOneshot(sourceText, instruction);
      const result = clean3(ctx.plugin, raw);
      if (!result) {
        new import_obsidian15.Notice("Odysseus: empty response");
        return;
      }
      const replaceFrom = ctx.args ? ctx.directiveFrom : ctx.previousBlock?.from ?? ctx.directiveFrom;
      applyInlineEdit(
        ctx.plugin,
        ctx.editor,
        { from: replaceFrom, to: ctx.directiveTo, text: result },
        sourceText,
        `/${label}`
      );
    } catch (e) {
      showError(`/${label} failed`, e);
    } finally {
      status.done();
    }
  };
}
HANDLERS["polish"] = { name: "polish", help: "/polish \u2014 polish previous paragraph", handler: refineHandler("polish", "Polish this writing: improve clarity, grammar, and flow. Keep voice and meaning unchanged. Output only the polished text.") };
HANDLERS["simplify"] = { name: "simplify", help: "/simplify \u2014 simplify previous paragraph", handler: refineHandler("simplify", "Simplify this text while preserving meaning. Output only the simplified text.") };
HANDLERS["fix"] = { name: "fix", help: "/fix \u2014 fix grammar of previous paragraph", handler: refineHandler("fix", "Fix grammar and spelling only. Do not change voice or meaning. Output only the corrected text.") };
HANDLERS["shorten"] = { name: "shorten", help: "/shorten \u2014 shorten previous paragraph", handler: refineHandler("shorten", "Shorten this to about half its length while keeping the key facts. Preserve markdown formatting. Output only the shortened text.") };
HANDLERS["list"] = { name: "list", help: "/list \u2014 convert previous paragraph to bullet list", handler: refineHandler("list", "Convert this prose into a Markdown bulleted list. Each bullet is one self-contained point. Output only the bulleted list.") };
HANDLERS["expand"] = { name: "expand", help: "/expand \u2014 expand previous paragraph (with web search)", handler: refineHandler("expand", "Expand the text into a more detailed version. Add depth, clarification, and supporting points without inventing facts. Preserve markdown formatting. Use web search if available to incorporate current sources. Output only the expanded text.", true) };
HANDLERS["continue"] = {
  name: "continue",
  help: "/continue \u2014 continue writing from previous paragraph",
  handler: async (ctx) => {
    const prev = ctx.previousBlock;
    if (!prev) {
      new import_obsidian15.Notice("Odysseus: /continue needs a previous paragraph");
      return;
    }
    const status = working("continuing");
    try {
      const raw = await ctx.plugin.client.rewriteOneshot(
        prev.text,
        "Continue the text seamlessly. Add approximately 2 paragraphs that pick up exactly where it ends, matching voice, tone, and formatting. Do not repeat the existing text. Do not add commentary. Output only the continuation."
      );
      const result = clean3(ctx.plugin, raw);
      if (!result) {
        new import_obsidian15.Notice("Odysseus: empty response");
        return;
      }
      applyInlineEdit(
        ctx.plugin,
        ctx.editor,
        { from: prev.to, to: ctx.directiveTo, text: `

${result}` },
        prev.text,
        "/continue"
      );
    } catch (e) {
      showError("/continue failed", e);
    } finally {
      status.done();
    }
  }
};
HANDLERS["summarize"] = {
  name: "summarize",
  help: "/summarize \u2014 summarize active note as bullets",
  handler: async (ctx) => {
    const file = ctx.view.file;
    if (!file) {
      new import_obsidian15.Notice("Odysseus: no active file");
      return;
    }
    const status = working("summarizing");
    try {
      const content = await ctx.plugin.app.vault.read(file);
      const raw = await ctx.plugin.client.chatOneshot(`Summarize this note in concise bullet points.

---

${content}`);
      const result = clean3(ctx.plugin, raw);
      if (!result) {
        new import_obsidian15.Notice("Odysseus: empty response");
        return;
      }
      const previewBody = content.length > 2e3 ? content.slice(0, 2e3) + "\n\u2026[truncated]" : content;
      applyInlineEdit(
        ctx.plugin,
        ctx.editor,
        { from: ctx.directiveFrom, to: ctx.directiveTo, text: result },
        previewBody,
        "/summarize"
      );
    } catch (e) {
      showError("/summarize failed", e);
    } finally {
      status.done();
    }
  }
};
HANDLERS["translate"] = {
  name: "translate",
  help: "/translate <lang> \u2014 translate previous paragraph (default: settings)",
  handler: async (ctx) => {
    const lang = ctx.args || ctx.plugin.settings.defaultTargetLanguage;
    const text = ctx.previousBlock?.text;
    if (!text) {
      new import_obsidian15.Notice("Odysseus: /translate needs a previous paragraph");
      return;
    }
    const status = working(`translating to ${lang}`);
    try {
      const raw = await ctx.plugin.client.rewriteOneshot(text, `Translate the following into ${lang}. Output only the translation.`);
      const result = clean3(ctx.plugin, raw);
      if (!result) {
        new import_obsidian15.Notice("Odysseus: empty response");
        return;
      }
      const replaceFrom = ctx.previousBlock?.from ?? ctx.directiveFrom;
      applyInlineEdit(
        ctx.plugin,
        ctx.editor,
        { from: replaceFrom, to: ctx.directiveTo, text: result },
        text,
        `/translate \u2192 ${lang}`
      );
    } catch (e) {
      showError("/translate failed", e);
    } finally {
      status.done();
    }
  }
};
HANDLERS["factcheck"] = {
  name: "factcheck",
  help: "/factcheck \u2014 fact-check previous paragraph (with sources)",
  handler: async (ctx) => {
    const text = ctx.previousBlock?.text;
    if (!text) {
      new import_obsidian15.Notice("Odysseus: /factcheck needs a previous paragraph");
      return;
    }
    const status = working("fact checking");
    try {
      const prompt = [
        "Fact-check the following text. Identify factual claims and verify each using current web sources if available.",
        "",
        "Wrap your output as a Markdown callout exactly like this:",
        "",
        "> [!check] Fact check",
        "> - Verified: <claim> \u2014 Source: <URL or citation>",
        "> - Uncertain: <claim> \u2014 Reason: <brief note>",
        "> - Incorrect: <claim> \u2014 Correction: <fact>. Source: <URL or citation>",
        ">",
        "> **Sources**",
        "> 1. <URL>",
        "",
        "Output only the callout.",
        "",
        "---",
        "",
        text
      ].join("\n");
      const raw = await ctx.plugin.client.chatOneshot(prompt, { useWebSearch: true, mode: "agent" });
      const result = clean3(ctx.plugin, raw);
      if (!result) {
        new import_obsidian15.Notice("Odysseus: empty response");
        return;
      }
      applyInlineEdit(
        ctx.plugin,
        ctx.editor,
        { from: ctx.previousBlock.to, to: ctx.directiveTo, text: `

${result}` },
        text,
        "/factcheck"
      );
    } catch (e) {
      showError("/factcheck failed", e);
    } finally {
      status.done();
    }
  }
};
HANDLERS["help"] = {
  name: "help",
  help: "/help \u2014 replace this line with a list of all directives",
  handler: async (ctx) => {
    const lines = ["**Odysseus inline directives**", ""];
    for (const def of Object.values(HANDLERS)) lines.push(`- \`${def.help}\``);
    ctx.editor.replaceRange(lines.join("\n"), ctx.directiveFrom, ctx.directiveTo);
  }
};
async function waitForResearch2(plugin, sid, timeoutMs = 5 * 6e4) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const r = await plugin.client.researchResult(sid, true);
    if (r && Object.keys(r).length > 0) return r;
    await new Promise((res) => setTimeout(res, 3e3));
  }
  return null;
}
function registerInlineDirectives(plugin) {
  plugin.addCommand({
    id: "run-inline-directive",
    name: "Run inline directive at cursor (/ask, /polish, /research, etc.)",
    editorCallback: (editor, view) => {
      if (!(view instanceof import_obsidian15.MarkdownView)) {
        new import_obsidian15.Notice("Odysseus: open a note in edit mode first");
        return;
      }
      const cursor = editor.getCursor();
      const line = editor.getLine(cursor.line);
      const dir = parseDirective(line);
      if (!dir) {
        new import_obsidian15.Notice("Odysseus: no directive on this line. Type something like `/ask Hello` and re-run.");
        return;
      }
      if (!HANDLERS[dir.cmd]) {
        new import_obsidian15.Notice(`Odysseus: unknown directive /${dir.cmd}. Type /help on a line and run this to see all of them.`);
        return;
      }
      const directiveFrom = { line: cursor.line, ch: 0 };
      const directiveTo = { line: cursor.line, ch: line.length };
      const prev = previousBlock(editor, cursor.line);
      void HANDLERS[dir.cmd].handler({
        plugin,
        editor,
        view,
        directiveFrom,
        directiveTo,
        args: dir.args,
        previousBlock: prev
      });
    }
  });
  plugin.registerEditorSuggest(new DirectiveSuggest(plugin));
}
var DirectiveSuggest = class extends import_obsidian15.EditorSuggest {
  constructor(plugin) {
    super(plugin.app);
    this.plugin = plugin;
  }
  onTrigger(cursor, editor, _file) {
    const line = editor.getLine(cursor.line);
    const upToCursor = line.slice(0, cursor.ch);
    const m = upToCursor.match(/^\s*(\/\w*)$/);
    if (!m) return null;
    return {
      start: { line: cursor.line, ch: line.indexOf("/") },
      end: cursor,
      query: m[1].slice(1).toLowerCase()
    };
  }
  getSuggestions(ctx) {
    const q = ctx.query;
    return Object.values(HANDLERS).filter((d) => d.name.startsWith(q)).sort((a, b) => a.name.localeCompare(b.name));
  }
  renderSuggestion(d, el) {
    el.createDiv({ text: `/${d.name}`, attr: { style: "font-weight: 600;" } });
    el.createDiv({ text: d.help, attr: { style: "opacity: 0.7; font-size: 0.85em;" } });
  }
  selectSuggestion(d, _ev) {
    if (!this.context) return;
    const editor = this.context.editor;
    const start = this.context.start;
    const end = this.context.end;
    editor.replaceRange(`/${d.name} `, start, end);
    editor.setCursor({ line: start.line, ch: start.ch + d.name.length + 2 });
  }
};

// note-voice.ts
var import_obsidian16 = require("obsidian");
init_voice();
init_odysseus_api();
function registerNoteVoice(plugin) {
  const tts = new TtsManager(plugin.client);
  plugin.register(() => tts.dispose());
  const decorated = /* @__PURE__ */ new WeakSet();
  const decorate = (view) => {
    if (!view || decorated.has(view)) return;
    decorated.add(view);
    const readEl = view.addAction("volume-2", "Read aloud (Odysseus)", async () => {
      if (tts.isBusy) {
        tts.stop();
        (0, import_obsidian16.setIcon)(readEl, "volume-2");
        readEl.removeClass("odysseus-voice-active");
        return;
      }
      const file = view.file;
      if (!file) {
        new import_obsidian16.Notice("Odysseus: no note open");
        return;
      }
      const sel = view.editor?.getSelection();
      let text = sel && sel.trim() ? sel : "";
      if (!text) {
        try {
          text = await plugin.app.vault.read(file);
        } catch {
          return;
        }
      }
      tts.setSpeed(Number(await ttsSpeed(plugin)) || 1);
      tts.toggle(text, (state) => {
        if (state === "playing") {
          (0, import_obsidian16.setIcon)(readEl, "square");
          readEl.addClass("odysseus-voice-active");
        } else if (state === "loading") {
          (0, import_obsidian16.setIcon)(readEl, "loader");
        } else {
          (0, import_obsidian16.setIcon)(readEl, "volume-2");
          readEl.removeClass("odysseus-voice-active");
        }
      });
    });
    const recorder = new VoiceRecorder(plugin.client);
    const micEl = view.addAction("mic", "Dictate into note (Odysseus)", async () => {
      try {
        if (recorder.isRecording) {
          (0, import_obsidian16.setIcon)(micEl, "loader");
          const text = await recorder.stopAndTranscribe();
          (0, import_obsidian16.setIcon)(micEl, "mic");
          micEl.removeClass("odysseus-voice-active");
          if (text && text.trim()) {
            const editor = view.editor;
            if (editor) editor.replaceSelection(text.trim() + " ");
            else new import_obsidian16.Notice("Odysseus: focus the note to insert dictation");
          } else {
            new import_obsidian16.Notice("Odysseus: nothing transcribed");
          }
        } else {
          await recorder.start();
          (0, import_obsidian16.setIcon)(micEl, "square");
          micEl.addClass("odysseus-voice-active");
          new import_obsidian16.Notice("Odysseus: recording\u2026 click the mic again to insert");
        }
      } catch (e) {
        (0, import_obsidian16.setIcon)(micEl, "mic");
        micEl.removeClass("odysseus-voice-active");
        showError("dictation failed", e);
      }
    });
    plugin.register(() => recorder.cancel());
  };
  const active = () => decorate(plugin.app.workspace.getActiveViewOfType(import_obsidian16.MarkdownView));
  plugin.registerEvent(plugin.app.workspace.on("active-leaf-change", active));
  plugin.registerEvent(plugin.app.workspace.on("layout-change", active));
  plugin.app.workspace.onLayoutReady(active);
}
var _cachedSpeed = null;
async function ttsSpeed(plugin) {
  if (_cachedSpeed != null) return _cachedSpeed;
  try {
    const stats = await plugin.client.ttsStats();
    _cachedSpeed = stats.speed > 0 ? stats.speed : 1;
  } catch {
    _cachedSpeed = 1;
  }
  return _cachedSpeed;
}

// mcp-server.ts
var import_http = require("http");
init_mcp_tools();
var PROTOCOL_VERSION = "2024-11-05";
var VaultMcpServer = class {
  constructor(plugin) {
    this.plugin = plugin;
    this.server = null;
    this.running = false;
  }
  isRunning() {
    return this.running;
  }
  async start() {
    if (this.running) return;
    const port = this.plugin.settings.mcpPort || 7077;
    await new Promise((resolve, reject) => {
      try {
        this.server = (0, import_http.createServer)((req, res) => this.handle(req, res));
        this.server.on("error", (e) => {
          this.running = false;
          reject(e);
        });
        this.server.listen(port, "127.0.0.1", () => {
          this.running = true;
          resolve();
        });
      } catch (e) {
        reject(e);
      }
    });
  }
  async stop() {
    if (!this.server) {
      this.running = false;
      return;
    }
    await new Promise((resolve) => this.server.close(() => resolve()));
    this.server = null;
    this.running = false;
  }
  // The URL to register in Odysseus, including the optional token.
  publicUrl() {
    const port = this.plugin.settings.mcpPort || 7077;
    const token = this.plugin.settings.mcpToken;
    return `http://127.0.0.1:${port}/mcp${token ? `?token=${encodeURIComponent(token)}` : ""}`;
  }
  // ---- HTTP plumbing ----
  handle(req, res) {
    const token = this.plugin.settings.mcpToken;
    if (token) {
      const url = new URL(req.url ?? "/", "http://127.0.0.1");
      const got = url.searchParams.get("token") ?? (req.headers["authorization"]?.toString().replace(/^Bearer\s+/i, "") ?? "");
      if (got !== token) {
        res.writeHead(401, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "unauthorized" }));
        return;
      }
    }
    if (req.method === "GET") {
      res.writeHead(200, { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", Connection: "keep-alive" });
      res.write(": ok\n\n");
      return;
    }
    if (req.method !== "POST") {
      res.writeHead(405);
      res.end();
      return;
    }
    let body = "";
    req.on("data", (c) => {
      body += c;
    });
    req.on("end", () => {
      void this.dispatch(body, res);
    });
  }
  send(res, id, result) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ jsonrpc: "2.0", id: id ?? null, result }));
  }
  sendError(res, id, code, message) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ jsonrpc: "2.0", id: id ?? null, error: { code, message } }));
  }
  async dispatch(body, res) {
    let req;
    try {
      req = JSON.parse(body);
    } catch {
      this.sendError(res, null, -32700, "parse error");
      return;
    }
    const { method, id } = req;
    try {
      switch (method) {
        case "initialize":
          this.send(res, id, {
            protocolVersion: PROTOCOL_VERSION,
            capabilities: { tools: {} },
            serverInfo: { name: "obsidian-vault", version: "1.0.0" }
          });
          return;
        case "notifications/initialized":
        case "initialized":
          res.writeHead(202);
          res.end();
          return;
        case "ping":
          this.send(res, id, {});
          return;
        case "tools/list":
          this.send(res, id, { tools: this.toolDefs() });
          return;
        case "tools/call": {
          const name = String(req.params?.name ?? "");
          const args = req.params?.arguments ?? {};
          const text = await this.callTool(name, args);
          this.send(res, id, { content: [{ type: "text", text }] });
          return;
        }
        default:
          this.sendError(res, id, -32601, `method not found: ${method}`);
      }
    } catch (e) {
      this.sendError(res, id, -32e3, e?.message ?? "tool error");
    }
  }
  // ---- Tool definitions (from the shared registry, filtered by settings) ----
  toolDefs() {
    return enabledTools(this.plugin).map((t) => ({
      name: t.name,
      description: t.description,
      inputSchema: t.inputSchema
    }));
  }
  async callTool(name, args) {
    const tool = VAULT_TOOLS.find((t) => t.name === name);
    if (!tool) return `Unknown tool: ${name}`;
    if (tool.write && !this.plugin.settings.mcpAllowWrites) return "Writes are disabled.";
    if (tool.dangerous && !this.plugin.settings.mcpAllowDangerous) return "This tool is disabled.";
    if ((this.plugin.settings.mcpDisabledTools ?? []).includes(name)) return "This tool is disabled.";
    return tool.handler(this.plugin, args);
  }
};

// main.ts
var OdysseusPlugin = class extends import_obsidian17.Plugin {
  async onload() {
    await this.loadSettings();
    this.client = new OdysseusClient(
      () => this.settings,
      async (patch) => {
        Object.assign(this.settings, patch);
        await this.saveSettings();
      }
    );
    this.registerView(
      VIEW_TYPE_ODYSSEUS_CHAT,
      (leaf) => new OdysseusChatView(leaf, this)
    );
    this.registerView(
      VIEW_TYPE_ODYSSEUS_MEMORY,
      (leaf) => new OdysseusMemoryView(leaf, this)
    );
    this.registerView(
      VIEW_TYPE_ODYSSEUS_EMBED,
      (leaf) => new OdysseusEmbedView(leaf, this)
    );
    this.addRibbonIcon("bot", "Open Odysseus chat", () => this.activateChatView());
    this.addCommand({
      id: "open-memory-browser",
      name: "Open memory browser",
      callback: () => this.activateMemoryView()
    });
    this.addCommand({
      id: "open-embedded-odysseus",
      name: "Open embedded Odysseus (full web UI)",
      callback: () => this.activateEmbedView()
    });
    registerCommands(this);
    registerContextMenus(this);
    registerInlineDirectives(this);
    registerNoteVoice(this);
    void this.applyTheme();
    this.addSettingTab(new OdysseusSettingTab(this.app, this));
    if (this.settings.mcpEnabled) void this.startMcp();
  }
  async startMcp() {
    if (!this.settings.mcpToken) {
      this.settings.mcpToken = "ody-" + Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
      await this.saveSettings();
    }
    try {
      this.mcpServer = new VaultMcpServer(this);
      await this.mcpServer.start();
    } catch (e) {
      this.mcpServer = void 0;
      throw e;
    }
  }
  async stopMcp() {
    await this.mcpServer?.stop();
    this.mcpServer = void 0;
  }
  async onunload() {
    await this.stopMcp();
    const { applyChatTheme: applyChatTheme2 } = await Promise.resolve().then(() => (init_themes(), themes_exports));
    applyChatTheme2(document.body, null);
  }
  // Apply the configured chat theme to the right target: the chat panel(s) in
  // "panel" scope, or document.body in "global" scope. Clears the other target.
  async applyTheme() {
    const { applyChatTheme: applyChatTheme2 } = await Promise.resolve().then(() => (init_themes(), themes_exports));
    const key = this.settings.chatTheme;
    const global = this.settings.chatThemeScope === "global";
    const pluginViewTypes = [VIEW_TYPE_ODYSSEUS_CHAT, VIEW_TYPE_ODYSSEUS_MEMORY];
    const roots = () => {
      const out = [];
      for (const vt of pluginViewTypes) {
        for (const leaf of this.app.workspace.getLeavesOfType(vt)) {
          const r = leaf.view.themeRoot;
          if (r) out.push(r);
        }
      }
      return out;
    };
    applyChatTheme2(document.body, null);
    for (const r of roots()) applyChatTheme2(r, null);
    if (global) {
      applyChatTheme2(document.body, key);
    } else {
      for (const r of roots()) applyChatTheme2(r, key);
    }
  }
  async loadSettings() {
    const stored = await this.loadData();
    this.settings = Object.assign({}, DEFAULT_SETTINGS, stored ?? {});
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
  async activateChatView() {
    const { workspace } = this.app;
    let leaf = workspace.getLeavesOfType(VIEW_TYPE_ODYSSEUS_CHAT)[0] ?? null;
    if (!leaf) {
      leaf = workspace.getRightLeaf(false);
      await leaf?.setViewState({ type: VIEW_TYPE_ODYSSEUS_CHAT, active: true });
    }
    if (leaf) workspace.revealLeaf(leaf);
  }
  async activateMemoryView() {
    const { workspace } = this.app;
    let leaf = workspace.getLeavesOfType(VIEW_TYPE_ODYSSEUS_MEMORY)[0] ?? null;
    if (!leaf) {
      leaf = workspace.getRightLeaf(false);
      await leaf?.setViewState({ type: VIEW_TYPE_ODYSSEUS_MEMORY, active: true });
    }
    if (leaf) workspace.revealLeaf(leaf);
  }
  async activateEmbedView() {
    const { workspace } = this.app;
    let leaf = workspace.getLeavesOfType(VIEW_TYPE_ODYSSEUS_EMBED)[0] ?? null;
    if (!leaf) {
      leaf = workspace.getLeaf(true);
      await leaf.setViewState({ type: VIEW_TYPE_ODYSSEUS_EMBED, active: true });
    }
    workspace.revealLeaf(leaf);
  }
};
