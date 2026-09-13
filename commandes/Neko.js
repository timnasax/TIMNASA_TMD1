const axios = require('axios');
const { zokou } = require("../framework/zokou");

// --- CONFIGURATION ---
const channelJid = "120363316279146194@newsletter";
const channelLink = "https://whatsapp.com/channel/0029Vb9kKuVCMY0F5rmX2j1u";

// Reusable template for modern context layout
const contextInfo = (title) => ({
    externalAdReply: {
        title: `TIMNASA MD • ${title.toUpperCase()}`,
        body: "Tap here to join our anime community updates!",
        thumbnailUrl: "https://files.catbox.moe/zm113g.jpg",
        sourceUrl: channelLink,
        mediaType: 1,
        showAdAttribution: true
    },
    newsletterJid: channelJid,
    newsletterName: "TIMNASA MD ANIME HUB"
});

// Helper function to handle multi-image anime requests efficiently
async function sendAnimePack(dest, zk, ms, apiUrl, title, reaction) {
    try {
        // Fetch 5 images concurrently using Promise.all (Super Fast)
        const requests = Array.from({ length: 5 }, () => axios.get(apiUrl));
        const responses = await Promise.all(requests);
        const imageUrls = responses.map(res => res.data.url);

        // Send images sequentially to the chat
        for (let i = 0; i < imageUrls.length; i++) {
            await zk.sendMessage(dest, {
                image: { url: imageUrls[i] },
                caption: i === 0 ? `✨ *TIMNASA MD ${title} PACK* ✨\n\n🎁 Enjoy these premium drops!\n🔗 *Join Channel:* ${channelLink}` : "",
                contextInfo: i === 0 ? contextInfo(title) : {}
            }, { quoted: ms });
        }
    } catch (error) {
        console.error(`Error in ${title} command:`, error);
        await zk.sendMessage(dest, { text: `❌ Failed to fetch ${title} images. Please try again later.` }, { quoted: ms });
    }
}

// ---------------- COMMAND: WAIFU ----------------
zokou({ nomCom: "waifu", categorie: "Weeb", reaction: "🖕" }, async (dest, zk, info) => {
    await sendAnimePack(dest, zk, info.ms, 'https://api.waifu.pics/sfw/waifu', "Waifu", "🖕");
});

// ---------------- COMMAND: NEKO ----------------
zokou({ nomCom: "neko", categorie: "Weeb", reaction: "😺" }, async (dest, zk, info) => {
    await sendAnimePack(dest, zk, info.ms, 'https://api.waifu.pics/sfw/neko', "Neko", "😺");
});

// ---------------- COMMAND: SHINOBU ----------------
zokou({ nomCom: "shinobu", categorie: "Weeb", reaction: "🦋" }, async (dest, zk, info) => {
    await sendAnimePack(dest, zk, info.ms, 'https://api.waifu.pics/sfw/shinobu', "Shinobu", "🦋");
});

// ---------------- COMMAND: MEGUMIN ----------------
zokou({ nomCom: "megumin", categorie: "Weeb", reaction: "💥" }, async (dest, zk, info) => {
    await sendAnimePack(dest, zk, info.ms, 'https://api.waifu.pics/sfw/megumin', "Megumin", "💥");
});

// ---------------- COMMAND: COSPLAY ----------------
zokou({ nomCom: "cosplay", categorie: "Weeb", reaction: "🎭" }, async (dest, zk, info) => {
    const { ms, repondre } = info;
    const url = 'https://fantox-cosplay-api.onrender.com/';

    try {
        // Fetch 5 cosplay frames simultaneously
        const requests = Array.from({ length: 5 }, () => axios.get(url, { responseType: 'arraybuffer' }));
        const responses = await Promise.all(requests);

        for (let i = 0; i < responses.length; i++) {
            const imageBuffer = Buffer.from(responses[i].data);
            await zk.sendMessage(dest, {
                image: imageBuffer, // direct stream from memory (no physical disk saving)
                caption: i === 0 ? `🎭 *TIMNASA MD COSPLAY SPECIAL*\n\n🔗 *Channel:* ${channelLink}` : "",
                contextInfo: i === 0 ? contextInfo("Cosplay") : {}
            }, { quoted: ms });
        }
    } catch (e) {
        console.error(e);
        repondre("❌ Error occurred while loading dynamic Cosplay pack.");
    }
});

// ---------------- COMMAND: COUPLEPP ----------------
zokou({ nomCom: "couplepp", categorie: "Weeb", reaction: "💞" }, async (dest, zk, info) => {
    const { ms, repondre } = info;
    // Updated stable endpoint for matching profile pictures
    const api = 'https://api.lolhuman.xyz/api/random/ppcouple?apikey=GataDios'; 

    try {
        await zk.sendMessage(dest, { text: "🔍 *TIMNASA MD is searching matching avatars for you and your partner...*" }, { quoted: ms });
        
        const response = await axios.get(api);
        const { male, female } = response.data.result;

        // Dispatch Male Avatar Card
        await zk.sendMessage(dest, { 
            image: { url: male }, 
            caption: `♂️ *Matching Profile: FOR MALE*`,
            contextInfo: contextInfo("Couple PP")
        }, { quoted: ms });

        // Dispatch Female Avatar Card
        await zk.sendMessage(dest, { 
            image: { url: female }, 
            caption: `♀️ *Matching Profile: FOR FEMALE*` 
        }, { quoted: ms });

    } catch (e) { 
        console.error(e);
        repondre("❌ The relationship database timed out. Try again.");
    }
});
