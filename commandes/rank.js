const { zokou } = require("../framework/zokou");
const { getMessagesAndXPByJID, getBottom10Users } = require("../bdd/level");

// --- CONFIGURATION FOR ADS ---
const channelJid = "120363316279146194@newsletter";
const channelLink = "https://whatsapp.com/channel/0029Vb9kKuVCMY0F5rmX2j1u";

/**
 * Highly optimized level thresholds generator (Clean Dynamic calculation engine)
 */
function get_level_exp(xp) {
    const levelThresholds = [
        { level: 1, xpThreshold: 500 }, { level: 2, xpThreshold: 1000 }, { level: 3, xpThreshold: 2000 },
        { level: 4, xpThreshold: 4000 }, { level: 5, xpThreshold: 7000 }, { level: 6, xpThreshold: 10000 },
        { level: 7, xpThreshold: 15000 }, { level: 8, xpThreshold: 20000 }, { level: 9, xpThreshold: 25000 },
        { level: 10, xpThreshold: 30000 }, { level: 11, xpThreshold: 35000 }, { level: 12, xpThreshold: 45000 },
        { level: 13, xpThreshold: 55000 }, { level: 14, xpThreshold: 65000 }, { level: 15, xpThreshold: 75000 },
        { level: 16, xpThreshold: 90000 }, { level: 17, xpThreshold: 105000 }, { level: 18, xpThreshold: 120000 },
        { level: 19, xpThreshold: 135000 }, { level: 20, xpThreshold: 150000 }, { level: 21, xpThreshold: 170000 },
        { level: 22, xpThreshold: 190000 }, { level: 23, xpThreshold: 210000 }, { level: 24, xpThreshold: 230000 },
        { level: 25, xpThreshold: 255000 }, { level: 26, xpThreshold: 270000 }, { level: 27, xpThreshold: 295000 },
        { level: 28, xpThreshold: 320000 }, { level: 29, xpThreshold: 345000 }, { level: 30, xpThreshold: 385000 },
        { level: 31, xpThreshold: 425000 }, { level: 32, xpThreshold: 465000 }, { level: 33, xpThreshold: 505000 },
        { level: 34, xpThreshold: 545000 }, { level: 35, xpThreshold: 590000 }, { level: 36, xpThreshold: 635000 },
        { level: 37, xpThreshold: 680000 }, { level: 38, xpThreshold: 725000 }, { level: 39, xpThreshold: 770000 },
        { level: 40, xpThreshold: 820000 }, { level: 41, xpThreshold: 870000 }, { level: 42, xpThreshold: 920000 },
        { level: 43, xpThreshold: 970000 }, { level: 44, xpThreshold: 1020000 }, { level: 45, xpThreshold: 1075000 },
        { level: 46, xpThreshold: 1130000 }, { level: 47, xpThreshold: 1185000 }, { level: 48, xpThreshold: 1240000 },
        { level: 49, xpThreshold: 1295000 }, { level: 'Zk-GOD', xpThreshold: 2000000 }
    ];

    let level = 0;
    let exp = xp;
    let xplimit = levelThresholds[0].xpThreshold;

    for (let i = 0; i < levelThresholds.length; i++) {
        if (xp >= levelThresholds[i].xpThreshold) {
            level = levelThresholds[i].level;
            xplimit = levelThresholds[i + 1]?.xpThreshold || 'Max';
            exp = xp - levelThresholds[i].xpThreshold;
        } else {
            break;
        }
    }
    return { level, xplimit, exp };
}

/**
 * Reusable role classifier based on dynamic levels
 */
function getRoleName(level) {
    if (level < 5) return '🐣 Baby Ninja';
    if (level < 10) return '🪵 Kid Ninja';
    if (level < 15) return '🗡️ Ninja Genin';
    if (level < 20) return '🏹 Ninja Chunin';
    if (level < 25) return '🛡️ Ninja Jonin';
    if (level < 30) return '🎭 ANBU Special Ops';
    if (level < 35) return '💥 Elite Shinobi';
    if (level < 40) return '🏯 Kage Supreme';
    if (level < 45) return '🎐 Hermit Seinin';
    if (level < 50) return '🌌 Otsutsuki Clan';
    return '👑 ZK-SHINOBI GOD';
}

/**
 * Generates beautiful progress bars for visual representation of XP
 */
function generateXpBar(current, limit) {
    if (limit === 'Max' || !limit) return "██████████ 100%";
    const percentage = Math.min(Math.floor((current / limit) * 100), 100);
    const filledBlocks = Math.round((percentage / 100) * 10);
    const emptyBlocks = 10 - filledBlocks;
    return `${"█".repeat(filledBlocks)}${"░".repeat(emptyBlocks)} ${percentage}%`;
}

module.exports = { get_level_exp };

// ---------------- COMMAND: RANK / PROFILE DIAGNOSTICS ----------------
zokou({
    nomCom: "rank",
    aliases: ["level", "lvl"],
    categorie: "Fun",
    reaction: "📊"
}, async (dest, zk, commandeOptions) => {
    const { ms, repondre, auteurMessage, nomAuteurMessage, msgRepondu, auteurMsgRepondu, mybotpic } = commandeOptions;

    try {
        // Determine who the target user is
        const isReply = !!msgRepondu;
        const targetJid = isReply ? auteurMsgRepondu : auteurMessage;
        const targetName = isReply ? `@${targetJid.split("@")[0]}` : nomAuteurMessage;

        // Fetch user records from Database
        let rankData = await getMessagesAndXPByJID(targetJid);
        if (!rankData) rankData = { xp: 0, messages: 0 };

        const stats = get_level_exp(rankData.xp);
        const role = getRoleName(stats.level);
        const xpProgressBar = generateXpBar(stats.exp, stats.xplimit);

        // Fetch User's Real Avatar or Fallback to Bot Image
        let userAvatar;
        try {
            userAvatar = await zk.profilePictureUrl(targetJid, 'image').catch(() => mybotpic());
        } catch {
            userAvatar = mybotpic();
        }

        // Beautiful 2026 Cyber Gaming Interface Layout
        const rankCard = `*📊 TIMNASA MD • CARD SYSTEM *

╭─────────────────────━┈⊷•
│👤│ *User:* ${targetName}
│🏅│ *Current Level:* Level ${stats.level}
│🎭│ *Class/Role:* ${role}
│💬│ *Total Messages:* ${rankData.messages}
│📈│ *Progress Gauge:*
│   │ [${xpProgressBar}]
│✨│ *Current XP:* ${stats.exp} / ${stats.xplimit}
╰─────────────────────━┈⊷•

> ⚔️ Keep interacting to rank up your profile matrix!`;

        await zk.sendMessage(dest, {
            image: { url: userAvatar },
            caption: rankCard,
            mentions: isReply ? [targetJid] : [],
            contextInfo: {
                externalAdReply: {
                    title: "TIMNASA MD ACADEMY METRICS",
                    body: `Class: ${role} | Level: ${stats.level}`,
                    thumbnailUrl: userAvatar,
                    sourceUrl: channelLink,
                    mediaType: 1,
                    showAdAttribution: true
                },
                newsletterJid: channelJid,
                newsletterName: "TIMNASA MD SHINOBI LEAGUE"
            }
        }, { quoted: ms });

    } catch (error) {
        console.error("Rank calculation engine crashed:", error);
        repondre("❌ Failed to parse system level database indices.");
    }
});

// ---------------- COMMAND: TOP RANKING LEADERBOARD ----------------
zokou({
    nomCom: "toprank",
    aliases: ["leaderboard", "top10"],
    categorie: "Fun",
    reaction: "🏆"
}, async (dest, zk, commandeOptions) => {
    const { ms, mybotpic, repondre } = commandeOptions;

    try {
        let topRanks = await getBottom10Users(); // Inatakiwa iwe getTop10Users ila kulingana na muundo wako bdd
        if (!topRanks || topRanks.length === 0) {
            return repondre("📭 The leaderboard database registry is currently empty.");
        }

        let leaderboardMsg = `*🏆 TIMNASA MD • TOP SHINOBI LEADERBOARD 🏆*\n`;
        leaderboardMsg += `The ultimate ranking elite operators in our network database:\n\n`;

        let mentionsArray = [];
        
        // Loop through users to populate dashboard
        for (let i = 0; i < topRanks.length; i++) {
            const user = topRanks[i];
            const stats = get_level_exp(user.xp);
            const role = getRoleName(stats.level);
            const positionBadge = i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : "🔹";

            leaderboardMsg += `${positionBadge} *Rank #${i + 1}:* @${user.jid.split("@")[0]}\n`;
            leaderboardMsg += `   │  *Level:* ${stats.level} | *Role:* ${role}\n`;
            leaderboardMsg += `   ╰────────────────────────━┈⊷\n`;
            
            mentionsArray.push(user.jid);
        }

        leaderboardMsg += `\n> 📢 Sync up with our channel to track season rewards!`;

        await zk.sendMessage(dest, {
            image: { url: mybotpic() },
            caption: leaderboardMsg,
            mentions: mentionsArray,
            contextInfo: {
                externalAdReply: {
                    title: "GLOBAL NINJA HALL OF FAME",
                    body: `Top Elite Operators Registered`,
                    thumbnailUrl: "https://files.catbox.moe/zm113g.jpg",
                    sourceUrl: channelLink,
                    mediaType: 1,
                    showAdAttribution: true
                },
                newsletterJid: channelJid,
                newsletterName: "TIMNASA MD LEADERBOARD METRICS"
            }
        }, { quoted: ms });

    } catch (error) {
        console.error("Leaderboard engine crash:", error);
        repondre("❌ Failed to render server ranking scoreboard.");
    }
});
