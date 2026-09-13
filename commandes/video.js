require("dotenv").config();
const { zokou } = require("../framework/zokou");
const yts = require("yt-search");
const axios = require("axios"); // Axios ni bora zaidi kwa API calls

// --- CONFIGURATION ---
const BaseUrl = process.env.GITHUB_GIT;
const giftedapikey = process.env.BOT_OWNE;
const channelJid = "120363316279146194@newsletter"; // Weka JID yako hapa
const channelLink = "https://whatsapp.com/channel/0029Vb9kKuVCMY0F5rmX2j1u";

function validateConfig() {
    if (!BaseUrl || !giftedapikey) {
        console.warn("⚠️ Warning: Missing BaseUrl or API key in .env");
    }
}
validateConfig();

// Reusable Header
const header = (title) => `╭─────═━┈┈━═──━┈⊷
┇ 『 *${title}* 』
┇ *Bot:* TIMNASA MD
┇ *Owner:* Enzo
╰─────═━┈┈━═──━┈⊷
> ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴛɪᴍɴᴀsᴀ-ᴍᴅ`;

// Newsletter context options
const context = {
    newsletterJid: channelJid,
    newsletterName: "TIMNASA MD UPDATES",
    serverMessageId: 143
};

// ---------------- COMMAND: VIDEO ----------------
zokou({
    nomCom: "video",
    categorie: "Search",
    reaction: '🎥'
}, async (dest, zk, info) => {
    const { ms, repondre, arg } = info;
    const query = arg.join(" ");

    if (!query) return repondre("Please provide a video name or link.");

    try {
        const search = await yts(query);
        const video = search.videos;
        if (!video) return repondre("No video found.");

        const apiUrl = `${BaseUrl}/api/download/ytmp4?url=${encodeURIComponent(video.url)}&apikey=${giftedapikey}`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (data.status === 200 && data.success) {
            // 1. Send Thumbnail with Details
            await zk.sendMessage(dest, {
                image: { url: video.thumbnail },
                caption: header("VIDEO DOWNLOADER") + `\n\n*Title:* ${video.title}\n*Duration:* ${video.timestamp}\n*Link:* ${channelLink}`,
                contextInfo: context
            }, { quoted: ms });

            // 2. Send Video File
            await zk.sendMessage(dest, {
                video: { url: data.result.download_url },
                mimetype: "video/mp4",
                caption: `✅ Successfully downloaded: ${video.title}`
            }, { quoted: ms });

        } else {
            repondre("Failed to fetch download link. Check your API key.");
        }
    } catch (error) {
        console.error("Video Error:", error);
        repondre("An error occurred during video processing.");
    }
});

// ---------------- COMMAND: PLAY/SONG ----------------
const audioCmd = async (dest, zk, info) => {
    const { ms, repondre, arg } = info;
    const query = arg.join(" ");

    if (!query) return repondre("Please provide a song name.");

    try {
        const search = await yts(query);
        const video = search.videos;
        if (!video) return repondre("Song not found.");

        const apiUrl = `${BaseUrl}/api/download/ytmp3?url=${encodeURIComponent(video.url)}&apikey=${giftedapikey}`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (data.status === 200 && data.success) {
            // 1. Send Thumbnail
            await zk.sendMessage(dest, {
                image: { url: video.thumbnail },
                caption: header("AUDIO DOWNLOADER") + `\n\n*Song:* ${video.title}\n*Channel:* ${channelLink}`,
                contextInfo: context
            }, { quoted: ms });

            // 2. Send Audio File
            await zk.sendMessage(dest, {
                audio: { url: data.result.download_url },
                mimetype: "audio/mp4",
                ptt: false
            }, { quoted: ms });

        } else {
            repondre("Could not download audio. API might be down.");
        }
    } catch (error) {
        console.error("Audio Error:", error);
        repondre("Error while fetching audio.");
    }
};

// Assign logic to both 'play' and 'song'
zokou({ nomCom: "play", categorie: "Download", reaction: '🎧' }, audioCmd);
zokou({ nomCom: "song", categorie: "Download", reaction: '🎸' }, audioCmd);
