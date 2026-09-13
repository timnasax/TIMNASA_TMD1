const { zokou } = require('../framework/zokou');
const axios = require('axios');

zokou({
  nomCom: "menu-x",
  categorie: "General",
  reaction: "🔥"
}, async (dest, zk, commandeOptions) => {
  const { ms, sender } = commandeOptions;

  // 1. Chukua Profile Picture ya Mtumiaji
  let userPfp;
  try {
    userPfp = await zk.profilePictureUrl(sender, 'image');
  } catch {
    userPfp = "https://files.catbox.moe/vy870v.jpg";
  }

  // 2. Tuma Audio (Inapakua data kamili ili isiweze kufeli)
  const audioUrl = "https://raw.githubusercontent.com/timnasax/All-updates/refs/heads/main/Audio/Timothy%20Ping.m4a";
  
  try {
    const audioRes = await axios.get(audioUrl, { responseType: 'arraybuffer' });
    const audioBuffer = Buffer.from(audioRes.data);

    // Tuma audio ikiwa na mimetype sahihi ya WhatsApp
    await zk.sendMessage(dest, {
      audio: audioBuffer,
      mimetype: 'audio/mp4', // Au 'audio/ogg; codecs=opus' kama umetumia file la .ogg
      ptt: true
    }, { quoted: ms });
  } catch (error) {
    console.log("Audio failed to send:", error.message);
  }

  // 3. Muundo wa Menu Text
  const menuText = `*═══════════════════*
  *TIMNASA TMD 2026/27*
*═══════════════════*

👋 *Habari:* @${sender.split('@')[0]}
🚀 *Bot Status:* Active

📌 *COMMANDS MENU:*
🔹 *.ping* — Angalia Speed ya Bot
🔹 *.owner* — Mawasiliano ya Owner
🔹 *.play* — Pakua Nyimbo
🔹 *.menu* — Orodha Kuu

*═══════════════════*
> Powered by Timnasa Tmd 2026/27`;

  // 4. Tuma Picha ya Mtumiaji ikiwa na Menyu
  await zk.sendMessage(dest, {
    image: { url: userPfp },
    caption: menuText,
    mentions: [sender]
  }, { quoted: ms });

  // Hatua ya kuthibitisha:
  // Tuma command ya /menu-x. Kama audio bado haichezi, badilisha file hilo kutoka .m4a kuwa la .ogg kwenye GitHub repository yako.
});
