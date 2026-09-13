const { zokou } = require("../framework/zokou");
const yts = require("yt-search");
const axios = require("axios");

zokou({
    nomCom: "solo",
    categorie: "Download",
    reaction: "🎵"
}, async (dest, zk, commandeOptions) => {
    const { ms, arg } = commandeOptions;

    // 1. Angalia kama mtumiaji ameweka jina la wimbo au link
    if (!arg || arg.length === 0) {
        return zk.sendMessage(dest, { text: "❌ Tafadhali weka jina la wimbo au link ya YouTube.\n\nMfano: .play Harmonize Single Again" }, { quoted: ms });
    }

    const searchQuery = arg.join(" ");

    try {
        // Tuma ujumbe wa kuanza kutafuta wimbo
        await zk.sendMessage(dest, { text: `🔍 Inatafuta: *${searchQuery}*...` }, { quoted: ms });

        // 2. Tafuta video kwenye YouTube
        const searchResults = await yts(searchQuery);
        const video = searchResults.videos;

        if (!video) {
            return zk.sendMessage(dest, { text: "❌ Wimbo haujapatikana. Jaribu tena." }, { quoted: ms });
        }

        const videoUrl = video.url;
        const title = video.title;
        const duration = video.timestamp;
        const thumbnail = video.thumbnail;

        // Tuma cover picha na maelezo ya wimbo kwanza
        const infoMessage = `🎵 *YOUTUBE PLAY* 🎵\n\n📝 *Jina:* ${title}\n⏱️ *Muda:* ${duration}\n🔗 *Link:* ${videoUrl}\n\n⏳ *Inapakua MP3 kupitia API...*`;
        await zk.sendMessage(dest, { image: { url: thumbnail }, caption: infoMessage }, { quoted: ms });

        // ==========================================
        // 🛠️ API YA CLINTON (IMEWEKWA SAHIHI HAPA)
        // ==========================================
        // Nimebadilisha '/vimeo' kuwa '/ytmp3' ili ikubali link za YouTube
        const apiUrl = `https://apiz.xhclinton.me/api/downloader/ytmp3?apikey=toxicapis&url=${encodeURIComponent(videoUrl)}`; 

        const response = await axios.get(apiUrl);
        
        // Kuvuta link ya download kutoka kwenye response ya API ya Clinton
        // Mara nyingi API zake data inakaa kwenye response.data.result.download au response.data.url
        const mp3DownloadUrl = response.data.result?.download || response.data.url || response.data.result; 

        // ==========================================

        if (!mp3DownloadUrl) {
            return zk.sendMessage(dest, { text: "❌ Hitilafu: API imeshindwa kurudisha link ya MP3. Huenda API key au Endpoint imebadilika." }, { quoted: ms });
        }

        // 3. Tuma faili la MP3 kwenda kwa mtumiaji kama Audio (sio kama file/document)
        await zk.sendMessage(dest, { 
            audio: { url: mp3DownloadUrl }, 
            mimetype: 'audio/mp4', 
            ptt: false 
        }, { quoted: ms });

    } catch (error) {
        console.error(error);
        await zk.sendMessage(dest, { text: "❌ Amri imeshindwa kufanya kazi. Hakikisha bot yako ina internet na API ya Clinton ipo hewani." }, { quoted: ms });
    }
});
