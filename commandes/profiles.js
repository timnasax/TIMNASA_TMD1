const { zokou } = require("../framework/zokou");

// --- CONFIGURATION ---
const channelJid = "120363316279146194@newsletter";
const channelLink = "https://whatsapp.com/channel/0029Vb9kKuVCMY0F5rmX2j1u";

// --- HELPERS ---
const header = (title) => `*👤 TIMNASA MD PROFILE MGMT*\n*Task:* ${title}\n\n`;

// ---------------- COMMAND: PROFILE SYSTEM ----------------
zokou({
  nomCom: "profile",
  aliases: ["setpp", "delpp", "bio"],
  categorie: "Owner",
  reaction: "👤"
}, async (dest, zk, info) => {
  const { ms, arg, repondre, mtype, quoted } = info;
  const command = arg?.toLowerCase();

  // 1. SET PROFILE PICTURE (setprofile)
  if (command === "set" || command === "setprofile") {
    if (!quoted || (mtype !== "imageMessage" && quoted.mtype !== "imageMessage")) {
      return repondre("Please reply to an image to set it as your profile picture.");
    }
    try {
      const media = await quoted.download();
      await zk.updateProfilePicture(zk.user.id, media);
      return repondre("✅ Profile picture updated successfully.");
    } catch (e) {
      return repondre("❌ Error updating profile picture: " + e.message);
    }
  }

  // 2. DELETE PROFILE PICTURE (delete)
  if (command === "del" || command === "delete") {
    try {
      await zk.removeProfilePicture(zk.user.id);
      return repondre("🗑️ Profile picture removed successfully.");
    } catch (e) {
      return repondre("❌ Error removing profile: " + e.message);
    }
  }

  // 3. AUTO-DELETE / TIMER DISPLAY (24h, 6h, etc.)
  // Note: This sets the "About/Status" to a countdown or temporary info
  const timers = ["24", "6", "42", "60", "90", "off", "10years"];
  if (timers.includes(command)) {
    try {
      let statusText = "";
      if (command === "off") {
        statusText = "TIMNASA MD Status: Active";
      } else if (command === "10years") {
        statusText = "Legacy Member: Active for 10 Years";
      } else {
        statusText = `Profile Status Timer Set: ${command} Hours`;
      }

      await zk.updateProfileStatus(statusText);
      return repondre(`⏳ Display Timer updated to: *${command}*.\nYour WhatsApp About has been updated.`);
    } catch (e) {
      return repondre("❌ Error setting timer.");
    }
  }

  // 4. PROFILE HISTORY / INFO
  if (command === "history" || !command) {
    try {
      const userJid = zk.user.id;
      const ppUrl = await zk.profilePictureUrl(userJid, 'image').catch(() => "No URL");
      const status = await zk.fetchStatus(userJid).catch(() => ({ status: "No Status" }));

      const historyMsg = `${header("Display Info")}
*Name:* ${zk.user.name}
*Current Status:* ${status.status}
*Timer Config:* ${arg || "Default"}
*PP Link:* ${ppUrl !== "No URL" ? "Available" : "Empty"}

_Use .profile set (reply image) to update._
_Use .profile 24 to set 24hr display mode._`;

      await zk.sendMessage(dest, {
        image: { url: ppUrl !== "No URL" ? ppUrl : "https://files.catbox.moe/zm113g.jpg" },
        caption: historyMsg,
        contextInfo: {
          newsletterJid: channelJid,
          newsletterName: "TIMNASA MD PROFILE LOGS"
        }
      }, { quoted: ms });
    } catch (e) {
      repondre("Error fetching history: " + e.message);
    }
  }
});
