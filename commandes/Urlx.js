const { zokou } = require("../framework/zokou");
const { downloadContentFromMessage } = require("@whiskeysockets/baileys");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");

zokou({
    nomCom: "url",
    categorie: "Utility",
    reaction: "🌐"
}, async (dest, zk, commandeOptions) => {
    const { ms, repondre, msgRepondu } = commandeOptions;

    // 1. Check if the user replied to a media message
    if (!msgRepondu) {
        return repondre("❌ Please reply to an image, video, audio, or document to convert it into a URL.");
    }

    // 2. Identify the media type
    let mediaType = "";
    let mediaMessage = null;

    if (msgRepondu.imageMessage) { mediaType = "image"; mediaMessage = msgRepondu.imageMessage; }
    else if (msgRepondu.videoMessage) { mediaType = "video"; mediaMessage = msgRepondu.videoMessage; }
    else if (msgRepondu.audioMessage) { mediaType = "audio"; mediaMessage = msgRepondu.audioMessage; }
    else if (msgRepondu.documentMessage) { mediaType = "document"; mediaMessage = msgRepondu.documentMessage; }
    else {
        return repondre("❌ Unsupported format. You can only convert Images, Videos, Audios, or Documents.");
    }

    try {
        await repondre("⏳ *Timnasa Bot is downloading and uploading your file to Catbox... Please wait.*");

        // 3. Download the media using Baileys stream reader
        const stream = await downloadContentFromMessage(mediaMessage, mediaType);
        let buffer = Buffer.from([]);
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk]);
        }

        // 4. Determine file extension based on mimeType
        const mimeType = mediaMessage.mimetype || "";
        let extension = "bin"; // fallback extension
        if (mimeType.includes("/")) {
            extension = mimeType.split("/")[1].split(";")[0]; // extracts 'jpeg', 'mp4', 'mp3', etc.
        }

        // Create temporary file path
        const tempFilePath = path.join(__dirname, `temp_${Date.now()}.${extension}`);
        fs.writeFileSync(tempFilePath, buffer);

        // 5. Prepare data and upload to Catbox API
        const form = new FormData();
        form.append("reqtype", "fileupload");
        form.append("fileToUpload", fs.createReadStream(tempFilePath));

        const response = await axios.post("https://catbox.moe/user/api.php", form, {
            headers: {
                ...form.getHeaders()
            }
        });

        // 6. Delete the temporary local file to save storage space
        fs.unlinkSync(tempFilePath);

        // 7. Process the response and deliver the link
        if (response.data && response.data.startsWith("http")) {
            let successMsg = `*✨ TIMNASA URL CONVERTER ✨*\n\n`;
            successMsg += `*🔗 File URL:* ${response.data.trim()}\n\n`;
            successMsg += `*⚡ Powered by Catbox.moe*`;
            
            await zk.sendMessage(dest, { text: successMsg }, { quoted: ms });
        } else {
            repondre("❌ Catbox API rejected the file upload.");
        }

    } catch (error) {
        console.error("Error converting media to URL: ", error);
        repondre("⚠️ An error occurred while processing and uploading your media.");
    }
});
