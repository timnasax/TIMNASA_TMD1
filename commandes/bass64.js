const { zokou } = require("../framework/zokou");

// 1. AMRI YA KUENCODE (Text to Base64)
zokou({
    nomCom: "b64encode",
    categorie: "Conversion",
    reaction: "🔒"
}, async (dest, zk, commandeOptions) => {
    const { ms, arg } = commandeOptions;

    if (!arg || arg.length === 0) {
        return zk.sendMessage(dest, { text: "Tafadhali weka maandishi unayotaka kuyageuza kuwa Base64.\n\nMfano: .b64encode Mambo vipi!" }, { quoted: ms });
    }

    const textToEncode = arg.join(" ");
    const encodedText = Buffer.from(textToEncode).toString("base64");

    await zk.sendMessage(dest, { text: `*🔒 Base64 Encoded Text:* \n\n\`\`\`${encodedText}\`\`\`` }, { quoted: ms });
});

// 2. AMRI YA DECODE (Base64 to Text)
zokou({
    nomCom: "b64decode",
    categorie: "Conversion",
    reaction: "🔓"
}, async (dest, zk, commandeOptions) => {
    const { ms, arg } = commandeOptions;

    if (!arg || arg.length === 0) {
        return zk.sendMessage(dest, { text: "Tafadhali weka Base64 string unayotaka kuifungua.\n\nMfano: .b64decode TWFtYm8gdmlwaSE=" }, { quoted: ms });
    }

    try {
        const textToDecode = arg.join(" ");
        const decodedText = Buffer.from(textToDecode, "base64").toString("utf-8");

        await zk.sendMessage(dest, { text: `*🔓 Base64 Decoded Text:* \n\n\`\`\`${decodedText}\`\`\`` }, { quoted: ms });
    } catch (error) {
        await zk.sendMessage(dest, { text: "❌ Kuna makosa! Hakikisha text uliyoweka ni Base64 halali." }, { quoted: ms });
    }
});

// 3. AMRI YA DOWNLOAD PICHA/FILE KUTOKA KWENYE BASE64
zokou({
    nomCom: "b64file",
    categorie: "Conversion",
    reaction: "📁"
}, async (dest, zk, commandeOptions) => {
    const { ms, arg } = commandeOptions;

    if (!arg || arg.length === 0) {
        return zk.sendMessage(dest, { text: "Weka Base64 string ya picha au file ili bot ilitengeneze.\n\nMfano: .b64file [base64_string]" }, { quoted: ms });
    }

    try {
        const base64Data = arg.join(" ");
        // Hapa tunatengeneza buffer kutoka kwenye ile string
        const buffer = Buffer.from(base64Data, 'base64');

        // Bot itatuma kama document (unaweza kubadili iwe image kama unajua ni picha tu)
        await zk.sendMessage(dest, { 
            document: buffer, 
            mimetype: 'application/octet-stream', 
            fileName: 'timnasa_file.bin' 
        }, { quoted: ms });

    } catch (error) {
        await zk.sendMessage(dest, { text: "❌ Imeshindwa kubadili hiyo Base64 kuwa file. Angalia string yako vizuri." }, { quoted: ms });
    }
});
