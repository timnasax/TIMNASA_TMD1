"use strict";

const { zokou } = require("../framework/zokou");
const os = require("os");

zokou({
    nomCom: "ping",
    aliases: ["speed", "p"],
    categorie: "General",
    reaction: "⚡"
}, async (dest, zk, commandeOptions) => {
    const { ms, repondre, sender } = commandeOptions;
    const channelJid = "120363406146813524@newsletter";

    try {
        // Piga hesabu ya speed (latency)
        const start = Date.now();
        const end = Date.now();
        const pingTime = end - start;

        // Picha mpya uliyotoa
        const pingImg = "https://raw.githubusercontent.com/timnasax/All-updates/refs/heads/main/img_timoth/IMG_3281.jpeg";

        // Angalia kama Bot ipo Public au Private
        const isPublic = zk.public ? "PUBLIC" : "PRIVATE";

        // Taarifa za Platform na System
        const platform = os.platform(); // e.g., linux, win32
        const ramUsed = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
        const ramTotal = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);

        // Ujumbe wa muonekano wa kisasa (Modern Ping Caption)
        const pingMsg = `
╭─────────────➣
│ ⚡ *TIMNASA-TMD SPEED* ⚡
├───────────────
│ 🚀 *Latency:* \`${pingTime} ms\`
│ 🌐 *Mode:* \`${isPublic}\`
│ 💻 *Platform:* \`${platform}\`
│ 📊 *RAM Usage:* \`${ramUsed}MB / ${ramTotal}GB\`
│ 🤖 *Status:* \`ONLINE 🟢\`
╰─────────────➣
`;

        // Tuma ujumbe wenye picha na taarifa zote
        await zk.sendMessage(dest, {
            image: { url: pingImg },
            caption: pingMsg,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: channelJid,
                    newsletterName: "🔮 𝚃𝙸𝙼𝙽𝙰𝚂𝙰-𝚃𝙼𝙳 𝚂𝙿𝙴𝙴𝙳 🔮",
                    serverMessageId: 1
                },
                externalAdReply: {
                    title: "⚡ 𝚃𝙸𝙼𝙽𝙰𝚂𝙰-𝚃𝙼𝙳 𝙿𝙸𝙽𝙶 ⚡",
                    body: `Response Time: ${pingTime}ms | Mode: ${isPublic}`,
                    sourceUrl: "https://whatsapp.com/channel/0029VaF39946H4YhS6u8Yt3q",
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        }, { quoted: ms });

    } catch (error) {
        console.error("Ping Error:", error);
        repondre("❌ Error: " + error.message);
    }
});
