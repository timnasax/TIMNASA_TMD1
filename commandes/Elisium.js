const { zokou } = require('../framework/zokou');
const { getData } = require('../bdd/elysium2fiche');
const s = require("../set");
const { Pool } = require('pg');

const dbUrl = s.DB;
const proConfig = {
  connectionString: dbUrl,
  ssl: { rejectUnauthorized: false }
};

// Map of Player Data (Pseudos, Names, Images, and DB Row IDs)
const PLAYERS_DATA = {
  'kem': { id: '1', pseudo: 'KAROSU 🥉', jina: 'Kemael', img: 'https://telegra.ph/file/4aac7ca1bb98da8c5a3bc.jpg', cat: 'other' },
  'abdiel': { id: '2', pseudo: 'JONES 🥉', jina: 'Abdiel', img: 'https://telegra.ph/file/c4fb6d4b7e85a5b02fe32.jpg', cat: 'NEOverse' },
  'goldy': { id: '3', pseudo: 'David G. STORM 🥉', jina: 'Goldy', img: 'https://telegra.ph/file/9489041b40152020e3bda.jpg', cat: 'NEOverse' },
  'aether': { id: '4', pseudo: 'ÆTHER 🥉', jina: 'Aether', img: 'https://telegra.ph/file/11c0fdd7da811dc6f5b82.jpg', cat: 'NEOverse' },
  'solomoe': { id: '5', pseudo: 'Scarlet KING 🥉', jina: 'SoloMoe', img: 'https://telegra.ph/file/79bacf19ff0818e4b7ad4.jpg', cat: 'NEOverse' },
  'thanatos': { id: '6', pseudo: 'SWAT 🥉', jina: 'Thanatos', img: 'https://telegra.ph/file/5fa2936d44020e96bcbd1.jpg', cat: 'NEOverse' },
  'damian': { id: '7', pseudo: 'Death MINDER 🥉', jina: 'Damian', img: 'https://telegra.ph/file/63cd5e5aa16fc17702b35.jpg', cat: 'NEOverse' },
  'yûblasq': { id: '8', pseudo: 'Yû BLASQ 🥉', jina: 'Yû', img: 'https://telegra.ph/file/f1def400cf130e8d72408.jpg', cat: 'NEOverse' },
  'lord': { id: '9', pseudo: 'The LOA 🥉', jina: 'Lord', img: 'https://telegra.ph/file/64887cc915c2ac1c92df1.jpg', cat: 'NEOverse' },
  'bads': { id: '10', pseudo: 'Ken McBads 🥉', jina: 'Bads', img: 'https://telegra.ph/file/cdd083779cd742e29d63d.jpg', cat: 'NEOverse' },
  'nash': { id: '11', pseudo: 'Tengen 🥉', jina: 'Nash', img: 'https://telegra.ph/file/b308557f2245f295e2991.jpg', cat: 'NEOverse' }
};

const colonnesMapping = {
  user: "e1", capacité: "e2", ecoins: "e3", sp: "e4", game_pass: "e5",
  exploration: "e6", crafting: "e7", combat: "e8", conduite: "e9",
  moral: "e10", life: "e11", voïd: "e12", sta: "e13", inventaire: "e14"
};

// Dynamic initialization loop for all player profile commands
Object.entries(PLAYERS_DATA).forEach(([commandName, cfg]) => {
  zokou(
    { nomCom: commandName, categorie: cfg.cat },
    async (dest, zk, commandeOptions) => {
      const { ms, repondre, arg, superUser } = commandeOptions;

      try {
        const data = await getData(cfg.id);

        // Display Mode: If no extra arguments are passed
        if (!arg || arg.length === 0) {
          let mesg = `*╔═════ 💠 Ξ𝗟𝗬𝗦𝗜𝗨𝗠_𝟮𝟭𝲲𝟮 ═════╗*\n`;
          mesg += `  *🎮 Pseudo:*  ${cfg.pseudo}\n`;
          mesg += `  *👤 User:*    ${data.e1}\n`;
          mesg += `  *🌐 Capacity:* ${data.e2}\n`;
          mesg += `  *💠 Ξ-Coins:*  ${data.e3} 💠\n`;
          mesg += `  *🌟 SP:*       ${data.e4}\n`;
          mesg += `  *🎮 Pass:*     ${data.e5} *EP*\n`;
          mesg += `*═══════════ 🌐 𝗦𝗞𝗜𝗟𝗟𝗦 🌐 ═══════════*\n`;
          mesg += `  *🌍 Explore:* ${data.e6}  │  *⚙️ Craft:* ${data.e7}\n`;
          mesg += `  *👊 Combat:*  ${data.e8}  │  *🛞 Drive:* ${data.e9}\n`;
          mesg += `*═══════════ 📊 𝗦𝗧𝗔𝗧𝗦 📊 ═══════════*\n`;
          mesg += `  😊: ${data.e10}%   ❤️: ${data.e11}%   💠: ${data.e12}%   🫀: ${data.e13}%\n`;
          mesg += `*═══════════════════════════════════*\n`;
          mesg += `  *🎒 Inventory (7Max):*\n  ▪ ${data.e14 || 'Empty'}\n`;
          mesg += `*╚═════════════════════════════════╝*\n`;
          mesg += `⚡ _TIMNASA-TMD Engine • Synced_`;

          return zk.sendMessage(dest, { image: { url: cfg.img }, caption: mesg }, { quoted: ms });
        }

        // Modification Mode: Admin-only modification rules
        if (!superUser) {
          return repondre('❌ Seul les Membres de la NS ont le droit de modifier cette fiche.');
        }

        if (arg[0] !== 'joueur:') {
          return repondre('❌ Le format du message est incorrect.');
        }

        let joueurInput = arg[1];
        let objectInput = arg[3];
        let signe = arg[4];
        let valeur = arg[5];
        let texte = arg.slice(5).join(' ');

        if (joueurInput !== cfg.jina) {
          return repondre(`❌ Joueur: "${joueurInput}" non reconnu pour cette commande.`);
        }

        const colonneObjet = colonnesMapping[objectInput];
        if (!colonneObjet) {
          return repondre(`❌ Object "${objectInput}" non reconnu.`);
        }

        const pool = new Pool(proConfig);
        const client = await pool.connect();

        if (signe === '+' || signe === '-') {
          const query = `UPDATE elysium2fiche SET ${colonneObjet} = ${data[colonneObjet]} ${signe} ${valeur} WHERE id = ${cfg.id}`;
          await client.query(query);
          
          let solde = `${data[colonneObjet]} ${signe} ${valeur}`;
          await repondre(`✅ *DATA UPDATED*\n👤 *JOUEUR:* ${joueurInput}\n⚙️ *OBJECT:* ${objectInput}\n📊 *VALUE:* ${signe}${valeur}\n*SOLDE:* ${solde}`);
        } else if (signe === '=') {
          const query = `UPDATE elysium2fiche SET ${colonneObjet} = $1 WHERE id = ${cfg.id}`;
          await client.query(query, [texte]);
          
          await repondre(`✅ *DATA SET*\n👤 *JOUEUR:* ${joueurInput}\n⚙️ *OBJECT:* ${objectInput}\n📝 *NEW DATA:* ${texte}`);
        } else {
          repondre(`❌ Signe "${signe}" invalide. Utilisez [+, -, =]`);
        }

        client.release();
      } catch (error) {
        console.error(`Erreur command ${commandName}:`, error);
        repondre('❌ Une interne erreur est survenue lors du traitement.');
      }
    }
  );
});
