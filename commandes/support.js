const { zokou } = require("../framework/zokou");
const { getAllSudoNumbers, isSudoTableNotEmpty } = require("../bdd/sudo");
const conf = require("../set");

// --- CONFIGURATION ---
const channelJid = "120363316279146194@newsletter";
const channelLink = "https://whatsapp.com/channel/0029Vb9kKuVCMY0F5rmX2j1u";
const groupLink = "https://chat.whatsapp.com/JazGLNBxW5XDVEst3PN4kj?mode=hqrc";

// Modern context layout for ads attribution
const contextInfo = (title) => ({
    externalAdReply: {
        title: `TIMNASA MD • ${title.toUpperCase()}`,
        body: "Official Verified Support & Developer Panel",
        thumbnailUrl: "https://files.catbox.moe/zm113g.jpg", // Weka picha ya bot hapa ikitakiwa
        sourceUrl: channelLink,
        mediaType: 1,
        showAdAttribution: true
    },
    newsletterJid: channelJid,
    newsletterName: "TIMNASA MD OFFICIAL HUB"
});

// ---------------- COMMAND: OWNER & SUDO LIST ----------------
zokou({ nomCom: "owner", aliases: ["creator", "sudo"], categorie: "General", reaction: "👑" }, async (dest, zk, commandeOptions) => {
    const { ms, mybotpic, repondre } = commandeOptions;
    
    try {
        const ownerNumberClean = conf.NUMERO_OWNER.replace(/[^0-9]/g, '');
        const ownerJid = `${ownerNumberClean}@s.whatsapp.net`;
        const hasSudo = await isSudoTableNotEmpty();

        let ownerReport = `*👑 TIMNASA MD CONTROL CENTER 👑*\n\n`;
        ownerReport += `*⚡ HEAD COMMANDER (OWNER):*\n`;
        ownerReport += `• 👑 @${ownerNumberClean}\n\n`;

        let mentionsList = [ownerJid];

        if (hasSudo) {
            ownerReport += `*💼 AUTHORIZED SUDO USERS:*\n`;
            const sudos = await getAllSudoNumbers();
            
            for (const sudo of sudos) {
                if (sudo) {
                    const sudoClean = sudo.replace(/[^0-9]/g, '');
                    ownerReport += `• 💼 @${sudoClean}\n`;
                    mentionsList.push(`${sudoClean}@s.whatsapp.net`);
                }
            }
        } else {
            ownerReport += `_No secondary sudo operators configured._\n`;
        }

        ownerReport += `\n> ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴛɪᴍɴᴀsᴀ-ᴍᴅ`;

        // 1. Send the visual image report with mentions
        await zk.sendMessage(dest, {
            image: { url: mybotpic() },
            caption: ownerReport,
            mentions: mentionsList,
            contextInfo: contextInfo("System Administration")
        }, { quoted: ms });

        // 2. Automatically drop the vCard contact file underneath for easy saving
        const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:${conf.OWNER_NAME}\nORG:TIMNASA CYBER TEAM;\nTEL;type=CELL;type=VOICE;waid=${ownerNumberClean}:+${ownerNumberClean}\nEND:VCARD`;
        await zk.sendMessage(dest, {
            contacts: {
                displayName: conf.OWNER_NAME,
                contacts: [{ vcard }]
            }
        }, { quoted: ms });

    } catch (err) {
        console.error(err);
        repondre("❌ Error fetching owner database infrastructure.");
    }
});

// ---------------- COMMAND: DEVELOPER CORPS ----------------
zokou({ nomCom: "dev", aliases: ["developers"], categorie: "General", reaction: "💻" }, async (dest, zk, commandeOptions) => {
    const { ms, mybotpic, repondre } = commandeOptions;

    const devs = [
        { nom: "᚛TIMNASA᚜", numero: "255784766591" },
        { nom: "Enzo", numero: conf.NUMERO_OWNER.replace(/[^0-9]/g, '') }
    ];

    let devMessage = `*💻 TIMNASA MD OFFICIAL DEVELOPERS HUB *\n`;
    devMessage += `Need custom deployment or assistance? Contact our engineering cell:\n\n`;

    for (const dev of devs) {
        devMessage += `╭───────────────────━┈⊷•\n`;
        devMessage += `│👤│ *Name:* ${dev.nom}\n`;
        devMessage += `│📞│ *Direct Line:* wa.me/${dev.numero}\n`;
        devMessage += `╰───────────────────━┈⊷•\n`;
    }
    devMessage += `\n> 🛸 🚀 Always verify dev identity to protect your credentials.`;

    try {
        const mediaUrl = mybotpic();
        const isVideo = mediaUrl.match(/\.(mp4|gif)$/i);

        // Smart execution - dynamic key switching depending on media extension
        await zk.sendMessage(dest, {
            [isVideo ? 'video' : 'image']: { url: mediaUrl },
            caption: devMessage,
            contextInfo: contextInfo("Core Engineering")
        }, { quoted: ms });

    } catch (e) {
        console.error("Developer command deployment error: ", e);
        // Fallback to text mode if image servers time out
        await zk.sendMessage(dest, { text: devMessage }, { quoted: ms });
    }
});

// ---------------- COMMAND: SUPPORT NETWORKS ----------------
zokou({ nomCom: "support", aliases: ["links", "group"], categorie: "General", reaction: "🛰️" }, async (dest, zk, commandeOptions) => {
    const { ms, repondre, auteurMessage } = commandeOptions;

    const supportDashboard = `*📡 TIMNASA MD ARCHIVE SYSTEMS 📡*

Thank you for deploying and trusting the TIMNASA TMD infrastructure. Connect with our grid via these endpoints:

*📢 METROPOLIS NEWSLETTER CHANNEL*
• ${channelLink}

*💬 ALPHA GLOBAL SUPPORT GROUP*
• ${groupLink}

*🛰️ PLATFORM SPECIFICATIONS*
• *Engine Version:* TIMNASA TMD2 Elite
• *Origin Node:* Tanzania 🇹🇿
• *Security Clearance:* Active

_Make sure to follow our official channels for real-time security patches and updates._`;

    try {
        // Reply in the active chat with the rich interface panel
        await zk.sendMessage(dest, {
            text: supportDashboard,
            contextInfo: contextInfo("Support Matrix")
        }, { quoted: ms });

        // Send a private courtesy reminder message directly to the operator's inbox
        await zk.sendMessage(auteurMessage, { 
            text: `⚠️ *TIMNASA SECURITY NOTICE:* Check your active group chat. Make sure to tap the official links to join our verified groups.` 
        });

    } catch (error) {
        console.error(error);
        repondre("❌ Error accessing public network links.");
    }
});
