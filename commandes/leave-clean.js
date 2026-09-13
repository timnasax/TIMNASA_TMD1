const { zokou } = require("../framework/zokou");

zokou({
    nomCom: "leaveclean",
    categorie: "Admin",
    reaction: "🧹"
}, async (dest, zk, commandeOptions) => {
    const { ms, repondre, superUser } = commandeOptions;

    // Security Check: Only the bot owner/creator can execute this massive cleanup
    if (!superUser) {
        return repondre("❌ This command is strictly reserved for the Bot Owner.");
    }

    try {
        await repondre("🔄 *Timnasa Bot is analyzing your groups and channels... Please wait.*");

        // Fetch all active chats from the bot's store/memory
        const totalChats = await zk.groupFetchAllParticipating();
        const groups = Object.values(totalChats);
        
        let leftGroupsCount = 0;
        let unfollowedChannelsCount = 0;
        const botNumber = zk.user.id.split(":")[0] + "@s.whatsapp.net";

        // === 1. CLEANING GROUPS ===
        for (const group of groups) {
            const participants = group.participants;
            
            // Find the bot's role inside this specific group
            const botInGroup = participants.find(p => p.id === botNumber);

            if (botInGroup) {
                // Check if the bot is NOT an admin (admin can be 'admin' or 'superadmin')
                if (!botInGroup.admin) {
                    await zk.groupLeave(group.id);
                    leftGroupsCount++;
                    // Small delay to prevent spamming/triggering WhatsApp security bans
                    await new Promise(resolve => setTimeout(resolve, 2000));
                }
            }
        }

        // === 2. CLEANING CHANNELS (NEWSLETTERS) ===
        // Note: Newsletter fetching relies on Baileys sub-client synchronization.
        if (zk.newsletterNewsletterQuery) {
            try {
                const channels = await zk.newsletterNewsletterQuery({ 
                    includeSubscribed: true 
                });

                if (channels && channels.length > 0) {
                    for (const channel of channels) {
                        // Check if the bot's role is NOT admin/owner in the channel
                        if (channel.viewer_metadata?.role !== "ADMIN" && channel.viewer_metadata?.role !== "OWNER") {
                            await zk.newsletterAction(channel.id, "unfollow");
                            unfollowedChannelsCount++;
                            await new Promise(resolve => setTimeout(resolve, 2000));
                        }
                    }
                }
            } catch (err) {
                console.log("Newsletter fetch error or not supported on this session: ", err);
            }
        }

        // === 3. FINAL SUMMARY REPORT ===
        let report = `*✨ TIMNASA CLEANUP COMPLETED ✨*\n\n`;
        report += `*🚪 Groups Left:* \`${leftGroupsCount}\` (Where you were not admin)\n`;
        report += `*📢 Channels Unfollowed:* \`${unfollowedChannelsCount}\` (Where you were not admin)\n\n`;
        report += `*⚡ System status:* Clean and optimized!`;

        await zk.sendMessage(dest, { text: report }, { quoted: ms });

    } catch (error) {
        console.error("Error running leaveclean command: ", error);
        repondre("⚠️ An unexpected error occurred while executing the cleanup routine.");
    }
});
