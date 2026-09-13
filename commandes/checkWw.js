const { zokou } = require("../framework/zokou");
const { getContentType } = require("@whiskeysockets/baileys");

zokou({
    nomCom: "checkww",
    categorie: "General",
    reaction: "🔍",
    desc: "Checks deep WhatsApp profile details and online status."
}, async (dest, zk, commandeOptions) => {
    const { ms, repondre, arg } = commandeOptions;

    // 1. Target Number Retrieval
    let jid = "";
    if (ms.message.extendedTextMessage && ms.message.extendedTextMessage.contextInfo.mentionedJid) {
        jid = ms.message.extendedTextMessage.contextInfo.mentionedJid[0];
    } else if (ms.message.extendedTextMessage && ms.message.extendedTextMessage.contextInfo.participant) {
        jid = ms.message.extendedTextMessage.contextInfo.participant;
    } else if (arg && arg.length > 0) {
        let number = arg.join("").replace(/[^0-9]/g, "");
        jid = `${number}@s.whatsapp.net`;
    } else {
        return repondre("❌ Please tag a user, reply to their message, or provide a phone number after the command.");
    }

    try {
        repondre("⏳ *TIMNASA-TMD is fetching intelligence data, please wait...*");

        // 2. Fetch Profile Picture
        let profilePic;
        try {
            profilePic = await zk.profilePictureUrl(jid, "image");
        } catch {
            profilePic = "https://wallpapercave.com/wp/wp11244304.jpg"; // Default fallback image if no PP
        }

        // 3. Fetch Status / About Bio
        let statusInfo;
        try {
            statusInfo = await zk.fetchStatus(jid);
        } catch {
            statusInfo = { status: "Not Available (Private)", setAt: null };
        }

        // 4. Fetch Last Seen / Presence Info
        let lastSeenInfo = "Private / Hidden";
        try {
            const presence = await zk.presenceSubscribe(jid);
            if (presence) {
                lastSeenInfo = "Online / Recently Active";
            }
        } catch (e) {
            lastSeenInfo = "Restricted by Privacy Settings";
        }

        // 5. Account/Registration Status Info
        let regType = "Standard WhatsApp User";
        try {
            let bizProfile = await zk.getBusinessProfile(jid);
            if (bizProfile) {
                regType = "Verified Business Account";
            }
        } catch {}

        // Format Bio Update Date
        let bioDate = statusInfo.setAt ? new Date(statusInfo.setAt).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric"
        }) : "Unknown";

        // 6. Construct Information Layout
        let infoMessage = `*╔════ TIMNASA-TMD USER INFO ════╗*\n\n`;
        infoMessage += `*👤 Target:* @${jid.split("@")[0]}\n`;
        infoMessage += `*📝 Bio/About:* _"${statusInfo.status || "No Bio Set"}"_\n`;
        infoMessage += `*📅 Bio Updated On:* ${bioDate}\n`;
        infoMessage += `*⏳ Account Type:* ${regType}\n`;
        infoMessage += `*🟢 Last Seen Status:* ${lastSeenInfo}\n\n`;
        infoMessage += `*╚════════════════════════╝*`;

        // 7. Send Profile Pic + Wrapped Details
        await zk.sendMessage(dest, {
            image: { url: profilePic },
            caption: infoMessage,
            mentions: [jid]
        }, { quoted: ms });

    } catch (error) {
        console.log(error);
        repondre("❌ Failed to pull data for this number. Ensure the number exists on WhatsApp or hasn't completely blocked the bot.");
    }
});
