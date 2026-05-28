"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc); 
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });

const baileys_1 = __importStar(require("@whiskeysockets/baileys"));
const logger_1 = __importDefault(require("@whiskeysockets/baileys/lib/Utils/logger"));
const logger = logger_1.default.child({});
logger.level = 'silent';
const pino = require("pino");
const boom_1 = require("@hapi/boom");
const conf = require("./set");
const axios = require("axios");
let fs = require("fs-extra");
let path = require("path");
const FileType = require('file-type');
const { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');
const { verifierEtatJid , recupererActionJid } = require("./data/antilien");
const { atbverifierEtatJid , atbrecupererActionJid } = require("./data/antibot");
let evt = require(__dirname + "/timnasa/timoth");
const {isUserBanned , addUserToBanList , removeUserFromBanList} = require("./data/banUser");
const  {addGroupToBanList,isGroupBanned,removeGroupFromBanList} = require("./data/banGroup");
const {isGroupOnlyAdmin,addGroupToOnlyAdminList,removeGroupFromOnlyAdminList} = require("./data/onlyAdmin");

// FIXED REAGIR FUNCTION
let reagir = async (origineMessage, zk, ms, reaction) => {
   if (reaction) {
       await zk.sendMessage(origineMessage, { react: { text: reaction, key: ms.key } });
   }
}; 

var session = conf.session.replace(/TIMNASA-TMD;;;=>/g,"");
const prefixe = conf.PREFIXE;

async function authentification() {
    try {
        if (!fs.existsSync(__dirname + "/scan/creds.json")) {
            console.log("ℹ️ Uunganishaji unaanza...");
            await fs.writeFileSync(__dirname + "/scan/creds.json", Buffer.from(session, 'base64').toString('utf-8'), "utf8");
        } else if (session != "zokk") {
            await fs.writeFileSync(__dirname + "/scan/creds.json", Buffer.from(session, 'base64').toString('utf-8'), "utf8");
        }
    } catch (e) {
        console.log("❌ Session ID siyo sahihi: " + e);
    }
}

const store = (0, baileys_1.makeInMemoryStore)({
    logger: pino().child({ level: "silent", stream: "store" }),
});

// Vikwazo na vigezo vya Anti-Call na Ujumbe
let lastTextTime = 0;
const messageDelay = 5000;

async function main() {
    await authentification();
    const { version, isLatest } = await (0, baileys_1.fetchLatestBaileysVersion)();
    const { state, saveCreds } = await (0, baileys_1.useMultiFileAuthState)(__dirname + "/scan");
    
    const sockOptions = {
        version,
        logger: pino({ level: "silent" }),
        browser: ["Ubuntu", "Chrome", "20.0.04"], 
        printQRInTerminal: true,
        auth: {
            creds: state.creds,
            keys: (0, baileys_1.makeCacheableSignalKeyStore)(state.keys, logger),
        },
        getMessage: async (key) => {
            if (store) {
                const msg = await store.loadMessage(key.remoteJid, key.id, undefined);
                return msg.message || undefined;
            }
            return { conversation: 'Hitilafu imetokea, rudia tena!' };
        }
    };

    const zk = (0, baileys_1.default)(sockOptions);
    store.bind(zk.ev);

    // KULINDA DHIDI YA SIMU (ANTI-CALL LOGIC)
    zk.ev.on("call", async (callEvent) => {
        if (conf.ANTICALL === "yes") {
            const callId = callEvent[0].id;
            const callerId = callEvent[0].from;
            await zk.rejectCall(callId, callerId);
            
            const sasa = Date.now();
            if (sasa - lastTextTime > messageDelay) {
                await zk.sendMessage(callerId, { 
                    text: "⚠️ *TIMNASA-TMD ANTI-CALL*\n\nSimu haziruhusiwi kwa bot hii. Ukipiga simu tena utafungwa (Blocked) kiotomatiki." 
                });
                lastTextTime = sasa;
            }
        }
    });

    zk.ev.on("creds.update", saveCreds);

    // CONNECTION UPDATE HANDLER
    zk.ev.on("connection.update", async (con) => {
        const { lastDisconnect, connection } = con;
        if (connection === "connecting") {
            console.log("ℹ️ Timnasa Inatafuta Mtandao...");
        } else if (connection === 'open') {
            console.log("✅ Timnasa Imeunganishwa Kikamilifu!");
            
            let idBot = zk.user.id.split(":")[0] + "@s.whatsapp.net";
            let salam = `╔═════════════════════════╗\n║  🤖 TIMNASA-TMD INAWEKA HISTORIA  ║\n╚═════════════════════════╝\n\n⚡ Prefix: [ ${prefixe} ]\n🔒 Mode: ${conf.MODE}\n🛡️ Anti-Call: ${conf.ANTICALL}\n\n_Bot ipo tayari kutekeleza amri zako._`;
            
            await zk.sendMessage(idBot, { text: salam });
        } else if (connection === "close") {
            let reason = new boom_1.Boom(lastDisconnect?.error)?.output.statusCode;
            console.log("❌ Uhusiano umekatika, sababu:", reason);
            if (reason !== baileys_1.DisconnectReason.loggedOut) {
                console.log("🔄 Inajaribu kuwaka upya...");
                main();
            }
        }
    });

    // MESSAGES UPSERT (AMRI NA INTERACTION LOGIC)
    zk.ev.on("messages.upsert", async (m) => {
        const ms = m.messages[0];
        if (!ms.message) return;
        
        const mtype = Object.keys(ms.message)[0];
        const origineMessage = ms.key.remoteJid;
        const idBot = zk.user.id.split(":")[0] + "@s.whatsapp.net";
        
        // Kuchuja maudhui ya ujumbe
        let texte = "";
        if (mtype === "conversation") texte = ms.message.conversation;
        else if (mtype === "extendedTextMessage") texte = ms.message.extendedTextMessage.text;
        else if (mtype === "imageMessage") texte = ms.message.imageMessage.caption;
        else if (mtype === "videoMessage") texte = ms.message.videoMessage.caption;

        // Kuzuia links (Antilien) na Bots (Antibot)
        if (origineMessage.endsWith("@g.us")) {
            const isGroupAdmin = async (jid, user) => {
                const groupMetadata = await zk.groupMetadata(jid);
                const participants = groupMetadata.participants;
                return participants.find(p => p.id === user)?.admin !== null;
            };

            // Antilien Logic
            if (await verifierEtatJid(origineMessage) && texte.includes("chat.whatsapp.com")) {
                const isAdmin = await isGroupAdmin(origineMessage, ms.key.participant);
                if (!isAdmin) {
                    const action = await recupererActionJid(origineMessage);
                    await zk.sendMessage(origineMessage, { delete: ms.key });
                    if (action === "kick") {
                        await zk.groupParticipantsUpdate(origineMessage, [ms.key.participant], "remove");
                    }
                }
            }
        }

        // Hapa ndipo amri zote zilizosajiliwa (Commands) zinaposhughulikiwa
        evt.execute(zk, ms, texte, prefixe, reagir);
    });

    return zk;
}

main();
