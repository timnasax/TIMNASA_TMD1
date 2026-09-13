"use strict";

const { zokou } = require("../framework/zokou");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

zokou({
    nomCom: "urln",
    aliases: ["tourl", "upload", "geturl"],
    categorie: "Tools",
    reaction: "🔗"
}, async (dest, zk, commandeOptions) => {
    const { ms, repondre, msgRepondu } = commandeOptions;

    try {
        // Angalia kama mtumiaji amereply ujumbe wenye media
        if (!msgRepondu) {
            return repondre("❌ Tafadhali reply picha au video ili kuigeuza kuwa link/URL!");
        }

        const isImage = msgRepondu.imageMessage;
        const isVideo = msgRepondu.videoMessage;

        if (!isImage && !isVideo) {
            return repondre("❌ Ujumbe ulioreply lazima uwe picha au video fupi!");
        }

        repondre("⏳ *Tafadhali subiri, inapakia media yako mtandaoni...*");

        // Download media kutoka WhatsApp
        const mediaPath = await zk.downloadAndSaveMediaMessage(msgRepondu);

        // Tayarisha FormData kwa ajili ya ku-upload Telegra.ph
        const form = new FormData();
        form.append("file", fs.createReadStream(mediaPath));

        // Tuma media kwenye Telegra.ph API
        const response = await axios.post("https://telegra.ph/upload", form, {
            headers: {
                ...form.getHeaders()
            }
        });

        // Futa faili la muda kwenye server
        if (fs.existsSync(mediaPath)) {
            fs.unlinkSync(mediaPath);
        }

        if (response.data && response.data[0] && response.data[0].src) {
            const fileUrl = "https://telegra.ph" + response.data[0].src;

            const responseMsg = `
╭─────────────➣
│ 🔗 *TIMNASA-TMD URL GENERATOR* 🔗
├───────────────
│ 🌐 *Direct Link:* 
│ ${fileUrl}
│
│ 💡 *Status:* Online & Active
╰─────────────➣
`;

            await zk.sendMessage(dest, { text: responseMsg }, { quoted: ms });
        } else {
            return repondre("❌ Ilishindikana ku-upload picha. Jaribu tena baadae!");
        }

    } catch (error) {
        console.error("URL Command Error:", error);
        repondre("❌ Error: " + error.message);
    }
});
