const { zokou } = require('../framework/zokou');

zokou({
  nomCom: "100",
  alias: [
    "ai", "gpt", "bot", "ask", "timnasa", "tmd", "chat", "brain", 
    "intel", "bing", "bard", "gemini", "claude", "roby", "help", 
    "query", "reply", "teacher", "solve", "guru", "smart", "master", 
    "tech", "helper", "answer", "deep", "search", "think", "coder", 
    "fix", "writer", "gen", "pro", "max", "ultra", "super", 
    "hero", "king", "boss", "online", "net", "web", "system", 
    "core", "node", "nexus", "zero", "one", "matrix"
  ],
  categorie: "AI",
  reaction: "💯"
}, async (dest, zk, commandeOptions) => {
  const { ms, arg, repondre, prefixe, nomCom } = commandeOptions;
  
  // Combine all argument words into a single query string
  const q = arg.join(" ");

  // 1. Check if the user provided a prompt
  if (!q) {
    return repondre(`*Syntax Error*\nExample:\n${prefixe}${nomCom} What day is today?`);
  }

  // 2. Encode prompt string for API request
  const txt = encodeURIComponent(q);
  const url = `https://api-faa.my.id/faa/ai-realtime?text=${txt}`;

  try {
    // 3. Show typing indicator (Composing Status)
    await zk.sendPresenceUpdate('composing', dest);

    // 4. Fetch response from the AI API
    const response = await fetch(url);
    const res = await response.json();

    // 5. Verify API output
    if (!res || !res.result) {
      return repondre(`❌ Failed to retrieve a response from the AI.`);
    }

    const aiResult = res.result;

    // 6. Send AI response back to the user
    return zk.sendMessage(
      dest,
      { text: `💯 *TIMNASA AI (${nomCom.toUpperCase()})*:\n\n${aiResult}` },
      { quoted: ms }
    );

  } catch (e) {
    return repondre(`❌ An error occurred.\nError: ${String(e.message || e)}`);
  }
});
