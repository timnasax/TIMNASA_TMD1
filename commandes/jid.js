const { zokou } = require("../framework/zokou"); // Ensure this path correctly points to your framework folder

zokou({
    nomCom: "jid",
    categorie: "General",
    reaction: "🆔"
}, async (dest, zk, commandeOptions) => {
    const { ms, repondre, currentJid } = commandeOptions;

    try {
        // currentJid automatically fetches the ID of the current chat (Group, Channel, or DM)
        if (!currentJid) {
            return repondre("❌ Failed to retrieve the JID for this chat.");
        }

        let message = `*✨ TIMNASA BOT JID FINDER ✨*\n\n`;
        message += `*🆔 JID:* \`${currentJid}\`\n`;

        // Check the type of chat based on the JID suffix
        if (currentJid.endsWith("@g.us")) {
            message += `*🔹 Type:* Group Chat 👥`;
        } else if (currentJid.endsWith("@newsletter")) {
            message += `*🔹 Type:* WhatsApp Channel 📢`;
        } else {
            message += `*🔹 Type:* Private Chat (DM) 👤`;
        }

        await zk.sendMessage(dest, { text: message }, { quoted: ms });

    } catch (error) {
        console.log("Error in JID command: " + error);
        repondre("⚠️ An error occurred while fetching the JID.");
    }
});
