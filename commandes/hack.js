const { zokou } = require("../framework/zokou");

// Delay function to space out the animation frames for realism
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

zokou({
    nomCom: "hack",
    categorie: "Fun",
    reaction: "💻",
    desc: "Executes a simulated hack prank on the targeted user."
}, async (dest, zk, commandeOptions) => {
    const { ms, repondre, arg } = commandeOptions;

    // 1. Retrieve the target user's identity
    let jid = "";
    if (ms.message.extendedTextMessage && ms.message.extendedTextMessage.contextInfo.mentionedJid) {
        jid = ms.message.extendedTextMessage.contextInfo.mentionedJid[0];
    } else if (ms.message.extendedTextMessage && ms.message.extendedTextMessage.contextInfo.participant) {
        jid = ms.message.extendedTextMessage.contextInfo.participant;
    } else if (arg && arg.length > 0) {
        let number = arg.join("").replace(/[^0-9]/g, "");
        jid = `${number}@s.whatsapp.net`;
    } else {
        return repondre("❌ Please tag a user or provide a phone number to 'hack'.");
    }

    const targetUser = `@${jid.split("@")[0]}`;

    try {
        // Send the initial frame and sequentially edit it to simulate live terminal hacking
        let { key } = await zk.sendMessage(dest, { text: `⚠️ *TIMNASA-TMD KERNEL EXPLOIT INITIALIZING...*` }, { quoted: ms });

        await delay(1500);
        await zk.sendMessage(dest, { text: `🌐 *Locating data nodes for:* ${targetUser}...`, edit: key });

        await delay(2000);
        await zk.sendMessage(dest, { text: `💉 *Injecting payload into WhatsApp cloud server...* [20%]`, edit: key });

        await delay(1500);
        await zk.sendMessage(dest, { text: `🔓 *Bypassing End-to-End Encryption layers...* [45%]`, edit: key });

        await delay(2000);
        await zk.sendMessage(dest, { text: `📂 *Cloning data logs (Chats, Media, & Voice Notes)...* [75%]`, edit: key });

        await delay(1500);
        await zk.sendMessage(dest, { text: `🔑 *Extracting session access tokens...* [90%]`, edit: key });

        await delay(2000);
        // Final payload - Displays the prank success message
        let finalReport = `*☠️ TARGET ${targetUser} ACCESSED SUCCESSFULLY! ☠️*\n\n`;
        finalReport += `*💻 Operator:* TIMNASA-TMD CYBER-UNIT\n`;
        finalReport += `*📊 Success Rate:* 100%\n`;
        finalReport += `*⚠️ Status:* All cloned data packets have been encrypted and forwarded to the master server.\n\n`;
        finalReport += `_(Relax! This is just a prank command. No data was actually compromised.)_ 🤫😉`;

        await zk.sendMessage(dest, { text: finalReport, mentions: [jid], edit: key });

    } catch (error) {
        console.log(error);
        repondre("❌ The terminal encountered an error executing the prank simulation.");
    }
});
