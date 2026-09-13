import axios from 'axios';

// --- ALL MEDIA DOWNLOADER ---
export const alldlCommand = {
  name: "alldl",
  aliases: ["alldown", "dl", "download"],
  description: "Download media from various social platforms.",
  category: "Download",
  execute: async (client, message, args, chatID) => {
    if (!args || args.length === 0) {
      return await client.sendMessage(chatID, { text: "Please provide a URL to download from." }, { quoted: message });
    }

    const url = args.join(" ");
    try {
      const response = await axios.get(`https://www.noobs-api.rf.gd/dipto/alldl?url=${encodeURIComponent(url)}`);
      const data = response.data;

      if (data.result) {
        const isImage = data.result.endsWith(".jpg") || data.result.endsWith(".png");
        const messagePayload = {
          caption: "*TIMNASA-TXMD BOT*",
          contextInfo: {
            externalAdReply: {
              title: "TIMNASA-TXMD V2 - Media Downloader",
              body: "Fast & Reliable Downloader",
              mediaType: 1,
              thumbnailUrl: data.imageUrl || '',
              sourceUrl: url,
              renderLargerThumbnail: false,
              showAdAttribution: true
            }
          }
        };

        if (isImage) {
          messagePayload.image = { url: data.result };
        } else {
          messagePayload.video = { url: data.result };
        }

        await client.sendMessage(chatID, messagePayload, { quoted: message });
        await client.sendMessage(chatID, { text: "YOUR Download is complete!" }, { quoted: message });
      } else {
        await client.sendMessage(chatID, { text: "No media found or invalid URL provided." }, { quoted: message });
      }
    } catch (error) {
      console.error("Error:", error);
      await client.sendMessage(chatID, { text: "An error occurred while processing the request." }, { quoted: message });
    }
  }
};

// --- GITHUB REPO CLONER ---
export const gitcloneCommand = {
  name: "gitclone",
  description: "Download a GitHub repository as a zip file.",
  category: "Download",
  execute: async (client, message, args, chatID) => {
    const repoURL = args.join(" ");
    if (!repoURL || !repoURL.includes("github.com")) {
      return await client.sendMessage(chatID, { text: "Please provide a valid GitHub link." }, { quoted: message });
    }

    try {
      const regex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i;
      let [, owner, repo] = repoURL.match(regex) || [];
      repo = repo.replace(/.git$/, '');
      const zipURL = `https://api.github.com/repos/${owner}/${repo}/zipball`;

      const head = await axios.head(zipURL);
      const filename = head.headers["content-disposition"].match(/attachment; filename=(.*)/);

      await client.sendMessage(chatID, {
        document: { url: zipURL },
        fileName: `${filename}.zip`,
        mimetype: 'application/zip'
      }, { quoted: message });

      await client.sendMessage(chatID, { text: "Done downloading your GitHub repository as a zip file!" }, { quoted: message });
    } catch (error) {
      console.error("Error:", error);
      await client.sendMessage(chatID, { text: "An error occurred. Please try again." }, { quoted: message });
    }
  }
};

// --- INSTAGRAM DOWNLOADER ---
export const instaCommand = {
  name: 'insta',
  aliases: ['ig', "Instagram", "igdl"],
  description: "Download media from Instagram posts or reels.",
  category: "Download",
  execute: async (client, message, args, chatID) => {
    if (!args || args.length === 0) {
      return await client.sendMessage(chatID, { text: "Please provide an Instagram URL." }, { quoted: message });
    }

    const url = args.join(" ");
    try {
      const response = await axios.get(`https://api.diioffc.web.id/api/download/instagram?url=${encodeURIComponent(url)}`);
      const data = response.data;

      if (data.status && data.result && data.result.length > 0) {
        const media = data.result;
        const isReel = url.includes("/reel/");

        if (isReel && media.url) {
          await client.sendMessage(chatID, {
            video: { url: media.url },
            caption: "TIMNASA-TXMD INSTA DOWNLOADER",
            contextInfo: {
              externalAdReply: {
                title: "Instagram Reel Downloader",
                body: "Powered by TIMNASA-TXMD",
                thumbnailUrl: "https://whatsapp.com/channel/0029VajweHxKQuJP6qnjLM31",
                sourceUrl: url,
                renderLargerThumbnail: true,
                showAdAttribution: true
              }
            }
          }, { quoted: message });
        } else if (media.thumbnail) {
          await client.sendMessage(chatID, {
            image: { url: media.thumbnail },
            caption: "TIMNASA-TXMD INSTA DOWNLOADER",
            contextInfo: {
              externalAdReply: {
                title: "Instagram Post Downloader",
                thumbnailUrl: "https://whatsapp.com/channel/0029VajweHxKQuJP6qnjLM31",
                renderLargerThumbnail: true
              }
            }
          }, { quoted: message });
        }
        await client.sendMessage(chatID, { text: "Done!" }, { quoted: message });
      } else {
        await client.sendMessage(chatID, { text: "No media found." }, { quoted: message });
      }
    } catch (error) {
      await client.sendMessage(chatID, { text: "Error fetching Instagram media." }, { quoted: message });
    }
  }
};

// --- TELEGRAM STICKER DOWNLOADER ---
export const tgsCommand = {
  name: 'tgs',
  aliases: ['tg'],
  description: "Download Telegram sticker pack.",
  category: "download",
  execute: async (client, message, args, chatID) => {
    if (!args || args.length === 0) return;
    const url = args.join(" ");
    try {
      const response = await axios.get(`https://weeb-api.vercel.app/telesticker?url=${encodeURIComponent(url)}`);
      const data = response.data;

      if (data.stickers) {
        for (let sticker of data.stickers) {
          await client.sendMessage(chatID, {
            sticker: { url: sticker },
            packname: 'Timnasa-Txmd',
            author: message.pushName || 'User'
          }, { quoted: message });
        }
      }
    } catch (error) {
      await client.sendMessage(chatID, { text: "Error fetching stickers." }, { quoted: message });
    }
  }
};

// --- APK DOWNLOADER ---
export const apkCommand = {
  name: "apk",
  aliases: ['app'],
  description: "Searches and downloads APK files.",
  category: "Download",
  execute: async (client, message, args, chatID) => {
    if (!args) return;
    const query = args.join(" ");
    try {
      await client.sendMessage(chatID, { text: "🔍 Searching, A moment..." }, { quoted: message });
      const search = await axios.get(`https://bk9.fun/search/apk?q=${encodeURIComponent(query)}`);
      const app = search.data.BK9;

      if (app) {
        const download = await axios.get(`https://bk9.fun/download/apk?id=${app.id}`);
        await client.sendMessage(chatID, {
          document: { url: download.data.BK9.dllink },
          mimetype: 'application/vnd.android.package-archive',
          fileName: `${app.name}.apk`,
          caption: `*TIMNASA-TXMD APP DOWNLOADER*\n\n*Name:* ${app.name}`
        }, { quoted: message });
      }
    } catch (error) {
      await client.sendMessage(chatID, { text: "Error downloading APK." }, { quoted: message });
    }
  }
};

// --- REPO INFO ---
export const repoCommand = {
  name: "repo",
  aliases: ['sc', "script"],
  description: "Fetches GitHub repository details.",
  category: "General",
  execute: async (client, message, args, chatID) => {
    try {
      const res = await axios.get('https://api.github.com/repos/Next5x/Timnasa-Txmd');
      const repo = res.data;
      const text = `*HEY 👋 THIS IS TIMNASA-TXMD.*\n\nI'm a WhatsApp bot created by *©Timoth Timnasa*.\n\n` +
                   `[✨] *STARS*: ${repo.stargazers_count}\n` +
                   `[🧧] *FORKS*: ${repo.forks_count}\n` +
                   `[🗼] *REPO*: ${repo.html_url}\n` +
                   `__________________________________\n*Made With* 🤍`;
      
      await client.sendMessage(chatID, { text }, { quoted: message });
    } catch (error) {
      await client.sendMessage(chatID, { text: "Error fetching repo info." });
    }
  }
};

// --- GENERIC FETCH COMMAND ---
export const fetchCommand = {
  name: "fetch",
  description: "Fetches content from a URL.",
  category: "search",
  execute: async (client, message, args, chatID) => {
    const url = args.join(" ");
    if (!/^https?:\/\//.test(url)) return;
    try {
      const res = await fetch(url);
      const contentType = res.headers.get("content-type");

      if (/image\/.*/.test(contentType)) {
        await client.sendMessage(chatID, { image: { url }, caption: "TIMNASA-TXMD" });
      } else if (/video\/.*/.test(contentType)) {
        await client.sendMessage(chatID, { video: { url }, caption: "TIMNASA-TXMD" });
      } else {
        const text = await res.text();
        await client.sendMessage(chatID, { text: text.slice(0, 1000) });
      }
    } catch (e) {
      await client.sendMessage(chatID, { text: "Fetch error." });
    }
  }
};
