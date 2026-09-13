"use strict";

const { zokou, cm } = require("../framework/zokou");
const conf = require("../set");
const moment = require("moment-timezone");
const os = require("os");

// Helper function to format uptime
function formatUptime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${h}h ${m}m ${s}s`;
}

zokou({
    nomCom: "menu",
    aliases: ["help", "list", "m"],
    categorie: "General",
    reaction: "👑"
}, async (dest, zk, commandeOptions) => {
    const { ms, repondre, prefixe, nomAuteurMessage } = commandeOptions;
    const channelJid = "120363406146813524@newsletter";

    try {
        // Date and Time Setup
        const date = moment().tz("Africa/Nairobi").format("DD/MM/YYYY");
        const time = moment().tz("Africa/Nairobi").format("HH:mm:ss");
        const uptime = formatUptime(process.uptime());

        // Updated Image URL
        const menuImg = "https://raw.githubusercontent.com/timnasax/All-updates/refs/heads/main/img_timoth/IMG_3280.jpeg";

        // Bot & System Info
        const isPublic = zk.public ? "PUBLIC" : "PRIVATE";
        const platform = os.platform();
        const ramUsed = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
        const ramTotal = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);

        // Organize commands by category
        const list_menu = {};
        cm.forEach((command) => {
            if (!command.nomCom || command.nomCom.trim() === "") return;
            const category = command.categorie || "Other";
            if (!list_menu[category]) {
                list_menu[category] = [];
            }
            if (!list_menu[category].includes(command.nomCom)) {
                list_menu[category].push(command.nomCom);
            }
        });

        // ═══════════════ MODERN MENU CAPTION ═══════════════
        let menuMsg = `
╭━━━❮ 👑 *TIMNASA-TMD CONTROL PANEL* 👑 ❯━━━╮
┃
┃ 👤 *User:* \`${nomAuteurMessage || "User"}\`
┃ ⚙️ *Prefix:* \`[ ${prefixe} ]\`
┃ 🔓 *Mode:* \`${isPublic}\`
┃ 📊 *RAM:* \`${ramUsed}MB / ${ramTotal}GB\`
┃ 💻 *Platform:* \`${platform}\`
┃ 📅 *Date:* \`${date}\`
┃ ⏰ *Time:* \`${time}\`
┃ ⏳ *Uptime:* \`${uptime}\`
┃ 🎯 *Total Commands:* \`${cm.length}\`
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯

✨ *AVAILABLE COMMAND CATEGORIES* ✨
`;

        // Loop through categories & format commands
        const categories = Object.keys(list_menu).sort();
        for (const cat of categories) {
            menuMsg += `\n╭───────〔 *${cat.toUpperCase()}* 〕───────❖\n`;
            for (const cmd of list_menu[cat]) {
                menuMsg += `│ ⚡ \`${prefixe}${cmd}\`\n`;
            }
            menuMsg += `╰───────────────────────────────❖\n`;
        }

        menuMsg += `
> 💎 *TIMNASA-TMD BOT SYSTEM* 💎
> 💡 *Tip:* Type *${prefixe}<command>* to use any command.`;

        // Send payload
        await zk.sendMessage(dest, {
            image: { url: menuImg },
            caption: menuMsg,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: channelJid,
                    newsletterName: "🔮 𝚃𝙸𝙼𝙽𝙰𝚂𝙰-𝚃𝙼𝙳 𝙰𝚄𝚃𝙾 𝙼𝙴𝙽𝚄 🔮",
                    serverMessageId: 1
                },
                externalAdReply: {
                    title: "👑 𝚃𝙸𝙼𝙽𝙰𝚂𝙰-𝚃𝙼𝙳 𝙾𝙵𝙵𝙸𝙲𝙸𝙰𝙻 𝙼𝙴𝙽𝚄 👑",
                    body: `Total Commands: ${cm.length} | Status: Online`,
                    sourceUrl: "https://whatsapp.com/channel/0029VaF39946H4YhS6u8Yt3q",
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        }, { quoted: ms });

    } catch (error) {
        console.error("Menu Error:", error);
        repondre("❌ Error: " + error.message);
    }
});
