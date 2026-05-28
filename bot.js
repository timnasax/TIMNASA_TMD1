const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
app.get('/', (_0x433179, _0x596552) => {
  _0x596552.send("TIMNASA MD IS ALIVE ✅");
});
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
"use strict";
var __createBinding = this && this.__createBinding || (Object.create ? function (_0x398fcf, _0x5e5592, _0x2d701c, _0x2832b8) {
  if (_0x2832b8 === undefined) {
    _0x2832b8 = _0x2d701c;
  }
  var _0x448e13 = Object.getOwnPropertyDescriptor(_0x5e5592, _0x2d701c);
  if (!_0x448e13 || ("get" in _0x448e13 ? !_0x5e5592.__esModule : _0x448e13.writable || _0x448e13.configurable)) {
    _0x448e13 = {
      'enumerable': true,
      'get': function () {
        return _0x5e5592[_0x2d701c];
      }
    };
  }
  Object.defineProperty(_0x398fcf, _0x2832b8, _0x448e13);
} : function (_0x1e3b54, _0x301965, _0x44305a, _0x338e42) {
  if (_0x338e42 === undefined) {
    _0x338e42 = _0x44305a;
  }
  _0x1e3b54[_0x338e42] = _0x301965[_0x44305a];
});
var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (_0x17d7ab, _0x1eaa45) {
  Object.defineProperty(_0x17d7ab, "default", {
    'enumerable': true,
    'value': _0x1eaa45
  });
} : function (_0x1cc420, _0x3efb0b) {
  _0x1cc420["default"] = _0x3efb0b;
});
var __importStar = this && this.__importStar || function (_0x55104d) {
  if (_0x55104d && _0x55104d.__esModule) {
    return _0x55104d;
  }
  var _0x232e7e = {};
  if (_0x55104d != null) {
    for (var _0x152088 in _0x55104d) if (_0x152088 !== "default" && Object.prototype.hasOwnProperty.call(_0x55104d, _0x152088)) {
      __createBinding(_0x232e7e, _0x55104d, _0x152088);
    }
  }
  __setModuleDefault(_0x232e7e, _0x55104d);
  return _0x232e7e;
};
var __importDefault = this && this.__importDefault || function (_0x22b41e) {
  return _0x22b41e && _0x22b41e.__esModule ? _0x22b41e : {
    'default': _0x22b41e
  };
};
Object.defineProperty(exports, "__esModule", {
  'value': true
});
const baileys_1 = __importStar(require("@whiskeysockets/baileys"));
const logger_1 = __importDefault(require("@whiskeysockets/baileys/lib/Utils/logger"));
const logger = logger_1["default"].child({});
logger.level = "silent";
const pino = require("pino");
const boom_1 = require("@hapi/boom");
const conf = require("./set");
const axios = require("axios");
let fs = require("fs-extra");
let path = require("path");
const FileType = require("file-type");
const {
  Sticker,
  createSticker,
  StickerTypes
} = require("wa-sticker-formatter");
const {
  verifierEtatJid,
  recupererActionJid
} = require("./data/antilien");
const {
  atbverifierEtatJid,
  atbrecupererActionJid
} = require("./data/antibot");
const {
  sendMessage,
  getContextInfo
} = require("./timnasa/context");
const {
  containsBadText
} = require("./data/antibad");
const {
  containsBug,
  isAntiBugOn
} = require("./data/antibug");
let evt = require(__dirname + "/timnasa/timoth");
const {
  isUserBanned,
  addUserToBanList,
  removeUserFromBanList
} = require("./data/banUser");
const {
  addGroupToBanList,
  isGroupBanned,
  removeGroupFromBanList
} = require("./data/banGroup");
const {
  isGroupOnlyAdmin,
  addGroupToOnlyAdminList,
  removeGroupFromOnlyAdminList
} = require("./data/onlyAdmin");
let {
  reagir
} = require(__dirname + "/timnasa/app");
var session = conf.session.replace(/TIMNASA-MD;;;=>/g, '');
const prefixe = conf.PREFIXE;
async function authentification() {
  try {
    if (!fs.existsSync(__dirname + "/scan/creds.json")) {
      console.log("connexion en cour ...");
      await fs.writeFileSync(__dirname + "/scan/creds.json", atob(session), "utf8");
    } else if (fs.existsSync(__dirname + "/scan/creds.json") && session != "zokk") {
      await fs.writeFileSync(__dirname + "/scan/creds.json", atob(session), "utf8");
    }
  } catch (_0x3d023d) {
    console.log("Session Invalid " + _0x3d023d);
    return;
  }
}
authentification();
0;
const store = baileys_1.makeInMemoryStore({
  'logger': pino().child({
    'level': "silent",
    'stream': "store"
  })
});
setTimeout(() => {
  authentification();
  async function _0x305a93() {
    0;
    const {
      version: _0x1f4b41,
      isLatest: _0x4ccd90
    } = await baileys_1.fetchLatestBaileysVersion();
    0;
    const {
      state: _0x4812ee,
      saveCreds: _0x37ba00
    } = await baileys_1.useMultiFileAuthState(__dirname + "/scan");
    0;
    const _0x5512a6 = {
      'version': _0x1f4b41,
      'logger': pino({
        'level': "silent"
      }),
      'browser': ["Timnasa-Md", "safari", "1.0.0"],
      'printQRInTerminal': true,
      'fireInitQueries': false,
      'shouldSyncHistoryMessage': true,
      'downloadHistory': true,
      'syncFullHistory': true,
      'generateHighQualityLinkPreview': true,
      'markOnlineOnConnect': false,
      'keepAliveIntervalMs': 0x7530,
      'auth': {
        'creds': _0x4812ee.creds,
        'keys': baileys_1.makeCacheableSignalKeyStore(_0x4812ee.keys, logger)
      },
      'getMessage': async _0x46e04f => {
        if (store) {
          const _0x1738e5 = await store.loadMessage(_0x46e04f.remoteJid, _0x46e04f.id, undefined);
          return _0x1738e5.message || undefined;
        }
        return {
          'conversation': "An Error Occurred, Repeat Command!"
        };
      }
    };
    0;
    const _0x12aaab = baileys_1["default"](_0x5512a6);
    store.bind(_0x12aaab.ev);
    function _0x3a06f5() {
      const _0x3b0a71 = {
        'timeZone': "Africa/Nairobi",
        'year': "numeric",
        'month': "2-digit",
        'day': "2-digit",
        'hour': "2-digit",
        'minute': "2-digit",
        'second': "2-digit",
        'hour12': false
      };
      const _0x3f55f2 = new Intl.DateTimeFormat("en-KE", _0x3b0a71).format(new Date());
      return _0x3f55f2;
    }
    setInterval(async () => {
      if (conf.AUTO_BIO === "yes") {
        const _0x284891 = _0x3a06f5();
        const _0x1f4da3 = "Timnasa_Md is running 🚗\n" + _0x284891;
        await _0x12aaab.updateProfileStatus(_0x1f4da3);
        console.log("Updated Bio: " + _0x1f4da3);
      }
    }, 60000);
    _0x12aaab.ev.on("call", async _0x990f0c => {
      if (conf.ANTI_CALL === "yes") {
        const _0x20e300 = _0x990f0c[0].id;
        const _0x2cc74f = _0x990f0c[0].from;
        await _0x12aaab.rejectCall(_0x20e300, _0x2cc74f);
        const _0x55ee59 = Date.now();
        if (_0x55ee59 - lastTextTime >= messageDelay) {
          await client.sendMessage(_0x2cc74f, {
            'text': conf.ANTI_CALL_TEXT
          });
          lastTextTime = _0x55ee59;
        } else {
          console.log("Message skipped to prevent overflow");
        }
      }
    });
    if (conf.LUCKY_ADM === "yes") {
      console.log("🛡️ Lucky Md Xforce AntiDelete is ACTIVE!");
    }
    _0x12aaab.ev.on("messages.upsert", async _0x35aac5 => {
      if (conf.LUCKY_ADM !== "yes") {
        return;
      }
      const {
        messages: _0x3c9099
      } = _0x35aac5;
      const _0x236770 = _0x3c9099[0];
      if (!_0x236770.message) {
        return;
      }
      const _0x4beb60 = _0x236770.key;
      const _0x29577c = _0x4beb60.remoteJid;
      if (_0x29577c === "status@broadcast") {
        return;
      }
      if (!store.chats[_0x29577c]) {
        store.chats[_0x29577c] = [];
      }
      store.chats[_0x29577c].push(_0x236770);
      if (store.chats[_0x29577c].length > 25) {
        store.chats[_0x29577c].shift();
      }
      if (_0x236770.message?.["protocolMessage"]?.["type"] === 0) {
        const _0x58765b = _0x236770.message.protocolMessage.key;
        const _0x26b0c9 = store.chats[_0x29577c];
        const _0x2f92fa = _0x26b0c9.find(_0x15c206 => _0x15c206.key.id === _0x58765b.id);
        if (!_0x2f92fa) {
          return;
        }
        try {
          const _0x29b79e = _0x236770.key.participant || _0x236770.key.remoteJid;
          const _0x1e2bf3 = _0x2f92fa.key.participant || _0x2f92fa.key.remoteJid;
          const _0x527c6b = _0x29577c.endsWith("@g.us");
          let _0x31eb36 = '';
          if (_0x527c6b) {
            try {
              const _0x2f53ec = await _0x12aaab.groupMetadata(_0x29577c);
              _0x31eb36 = "\n• Group: " + _0x2f53ec.subject;
            } catch (_0x72b60a) {
              console.error("Error fetching group metadata:", _0x72b60a);
              _0x31eb36 = "\n• Group information unavailable.";
            }
          }
          const _0x20e974 = "🫧 *Timnasa Tmd antiDelete* 🫧\n" + ("• Deleted by: @" + _0x29b79e.split('@')[0] + "\n") + ("• Original sender: @" + _0x1e2bf3.split('@')[0] + "\n") + (_0x31eb36 + "\n") + ("• Chat type: " + (_0x527c6b ? "Group" : "Private"));
          const _0x1a1cac = {
            'mentions': [_0x29b79e, _0x1e2bf3]
          };
          if (_0x2f92fa.message.conversation) {
            await sendMessage(_0x12aaab, _0x29577c, _0x236770, {
              'text': _0x20e974 + "\n\n📝 *Deleted Text:*\n" + _0x2f92fa.message.conversation,
              ..._0x1a1cac
            });
          } else {
            if (_0x2f92fa.message.extendedTextMessage) {
              await sendMessage(_0x12aaab, _0x29577c, _0x236770, {
                'text': _0x20e974 + "\n\n📝 *Deleted Text:*\n" + _0x2f92fa.message.extendedTextMessage.text,
                ..._0x1a1cac
              });
            } else {
              if (_0x2f92fa.message.imageMessage) {
                const _0x33e576 = _0x2f92fa.message.imageMessage.caption || '';
                const _0x16ede6 = await _0x12aaab.downloadAndSaveMediaMessage(_0x2f92fa.message.imageMessage);
                await sendMessage(_0x12aaab, _0x29577c, _0x236770, {
                  'image': {
                    'url': _0x16ede6
                  },
                  'caption': _0x20e974 + "\n\n🖼️ *Image Caption:*\n" + _0x33e576,
                  ..._0x1a1cac
                });
              } else {
                if (_0x2f92fa.message.videoMessage) {
                  const _0x4756a8 = _0x2f92fa.message.videoMessage.caption || '';
                  const _0x51f7aa = await _0x12aaab.downloadAndSaveMediaMessage(_0x2f92fa.message.videoMessage);
                  await sendMessage(_0x12aaab, _0x29577c, _0x236770, {
                    'video': {
                      'url': _0x51f7aa
                    },
                    'caption': _0x20e974 + "\n\n🎥 *Video Caption:*\n" + _0x4756a8,
                    ..._0x1a1cac
                  });
                } else {
                  if (_0x2f92fa.message.audioMessage) {
                    const _0x5aa05a = await _0x12aaab.downloadAndSaveMediaMessage(_0x2f92fa.message.audioMessage);
                    await sendMessage(_0x12aaab, _0x29577c, _0x236770, {
                      'audio': {
                        'url': _0x5aa05a
                      },
                      'mimetype': "audio/ogg",
                      'ptt': true,
                      'caption': _0x20e974 + "\n\n🎤 *Voice Message Deleted*",
                      ..._0x1a1cac
                    });
                  } else {
                    if (_0x2f92fa.message.stickerMessage) {
                      const _0x93c126 = await _0x12aaab.downloadAndSaveMediaMessage(_0x2f92fa.message.stickerMessage);
                      await sendMessage(_0x12aaab, _0x29577c, _0x236770, {
                        'sticker': {
                          'url': _0x93c126
                        },
                        'caption': _0x20e974,
                        ..._0x1a1cac
                      });
                    } else {
                      await sendMessage(_0x12aaab, _0x29577c, _0x236770, {
                        'text': _0x20e974 + "\n\n⚠️ *An unsupported message type was deleted.*",
                        ..._0x1a1cac
                      });
                    }
                  }
                }
              }
            }
          }
        } catch (_0x3463aa) {
          console.error("🔥 AntiDelete Error:", _0x3463aa);
        }
      }
    });
    const _0x462055 = _0x3e0576 => new Promise(_0x5af761 => setTimeout(_0x5af761, _0x3e0576));
    let _0x40bb84 = 0;
    const _0x18dde2 = {
      'hello': ['👋', '🙂', '😊', "🙋‍♂️", "🙋‍♀️"],
      'hi': ['👋', '🙂', '😁', "🙋‍♂️", "🙋‍♀️"],
      "good morning": ['🌅', '🌞', '☀️', '🌻', '🌼'],
      "good night": ['🌙', '🌜', '⭐', '🌛', '💫'],
      'bye': ['👋', '😢', "👋🏻", '🥲', "🚶‍♂️", "🚶‍♀️"],
      "see you": ['👋', '😊', "👋🏻", '✌️', "🚶‍♂️"],
      'bro': ["🤜🤛", '👊', '💥', '🥊', '👑'],
      'sister': ['👭', "💁‍♀️", '🌸', '💖', "🙋‍♀️"],
      'buddy': ['🤗', "👯‍♂️", "👯‍♀️", "🤜🤛", '🤝'],
      'niaje': ['👋', '😄', '💥', '🔥', '🕺', '💃'],
      'fredi': ['😎', '💯', '🔥', '🚀', '👑'],
      'ezra': ['🔥', '💥', '👑', '💯', '😎'],
      'thanks': ['🙏', '😊', '💖', '❤️', '💐'],
      "thank you": ['🙏', '😊', '🙌', '💖', '💝'],
      'love': ['❤️', '💖', '💘', '😍', '😘', '💍', '💑'],
      "miss you": ['😢', '💔', '😔', '😭', '💖'],
      'sorry': ['😔', '🙏', '😓', '💔', '🥺'],
      'apologies': ['😔', '💔', '🙏', '😞', "🙇‍♂️", "🙇‍♀️"],
      'congratulations': ['🎉', '🎊', '🏆', '🎁', '👏'],
      "well done": ['👏', '💪', '🎉', "🎖️", '👍'],
      "good job": ['👏', '💯', '👍', '🌟', '🎉'],
      'happy': ['😁', '😊', '🎉', '🎊', '💃', '🕺'],
      'sad': ['😢', '😭', '😞', '💔', '😓'],
      'angry': ['😡', '🤬', '😤', '💢', '😾'],
      'excited': ['🤩', '🎉', '😆', '🤗', '🥳'],
      'surprised': ['😲', '😳', '😯', '😮', '😲'],
      'help': ['🆘', '❓', '🙏', '💡', "👨‍💻", "👩‍💻"],
      'how': ['❓', '🤔', '😕', '😳', '🧐'],
      'what': ['❓', "🤷‍♂️", "🤷‍♀️", '😕', '😲'],
      'where': ['❓', '🌍', "🗺️", "🏙️", '🌎'],
      'party': ['🎉', '🥳', '🍾', '🍻', '🎤', '💃', '🕺'],
      'fun': ['🤣', '😂', '🥳', '🎉', '🎮', '🎲'],
      'hangout': ['🍕', '🍔', '🍻', '🎮', '🍿', '😆'],
      'good': ['👍', '👌', '😊', '💯', '🌟'],
      'awesome': ['🔥', '🚀', '🤩', '👏', '💥'],
      'cool': ['😎', '👌', '🎮', '🎸', '💥'],
      'boring': ['😴', '🥱', '🙄', '😑', '🤐'],
      'tired': ['😴', '🥱', '😌', '💤', '🛌'],
      'bot': ['🤖', '💻', '⚙️', '🧠', '🔧'],
      'robot': ['🤖', '⚙️', '💻', '🔋', '🤓'],
      "cool bot": ['🤖', '😎', '🤘', '💥', '🎮'],
      "love you": ['❤️', '💖', '😘', '💋', '💑'],
      "thank you bot": ['🙏', '🤖', '😊', '💖', '💐'],
      "good night bot": ['🌙', '🌛', '⭐', '💤', '😴'],
      'laughter': ['😂', '🤣', '😆', '😄', '🤪'],
      'crying': ['😢', '😭', '😿', '😓', '💔'],
      'john': ['👑', '🔥', '💥', '😎', '💯'],
      'mike': ['💪', '🏆', '🔥', '💥', '🚀'],
      'lisa': ['💖', '👑', '🌸', '😍', '🌺'],
      'emily': ['💖', '💃', '👑', '🎉', '🎀'],
      'happy': ['😁', '😄', '😊', '🙌', '🎉', '🥳', '💃', '🕺', '🔥'],
      'excited': ['🤩', '🎉', '🥳', '🎊', '😆', '🤗', '💥', '🚀'],
      'love': ['❤️', '💖', '💘', '💝', '😍', '😘', '💍', '💑', '🌹'],
      'grateful': ['🙏', '💐', '🥰', '❤️', '😊'],
      'thankful': ['🙏', '💖', '💐', '🤗', '😇'],
      'sad': ['😢', '😭', '😞', '💔', '😔', '😓', '😖'],
      'angry': ['😡', '😠', '🤬', '💢', '👊', '💥', '⚡'],
      'frustrated': ['😤', '😩', '🤯', '😑', '🌀'],
      'bored': ['😴', '🥱', '🙄', '😑', '😒'],
      'surprised': ['😲', '😳', '😮', '😯', '😲', '🙀'],
      'shocked': ['😱', '😳', '😯', '💥', '🤯'],
      'wow': ['😲', '😱', '🤩', '🤯', '💥', '🚀'],
      'crying': ['😭', '😢', '💔', '😞', '😓'],
      "miss you": ['😭', '💔', '😔', '😢', '❤️'],
      'lonely': ['😔', '😭', '😢', '💔', '🙁'],
      'help': ['🆘', '❓', '🤔', "🙋‍♂️", "🙋‍♀️", '💡'],
      "need assistance": ['🆘', "💁‍♂️", "💁‍♀️", '❓', '🙏'],
      'sorry': ['😔', '🙏', '💔', '😓', '🥺', "🙇‍♂️", "🙇‍♀️"],
      'apology': ['😔', '😞', '🙏', '💔', "🙇‍♂️", "🙇‍♀️"],
      "good job": ['👏', '💯', '🎉', '🌟', '👍', '👏'],
      "well done": ['👏', '🎉', "🎖️", '💪', '🔥', '🏆'],
      "you can do it": ['💪', '🔥', '💯', '🚀', '🌟'],
      'congratulations': ['🎉', '🏆', '🎊', '🎁', '👏', '🍾'],
      'cheers': ['🥂', '🍻', '🍾', '🍷', '🥳', '🎉'],
      'goodbye': ['👋', '😢', '💔', "👋🏻", "🚶‍♂️", "🚶‍♀️"],
      'bye': ['👋', "👋🏻", '🥲', "🚶‍♂️", "🚶‍♀️"],
      "see you": ['👋', "👋🏻", '🤗', '✌️', "🙋‍♂️", "🙋‍♀️"],
      'hello': ['👋', '🙂', '😊', "🙋‍♂️", "🙋‍♀️"],
      'hi': ['👋', '🙂', '😁', "🙋‍♂️", "🙋‍♀️"],
      'party': ['🎉', '🥳', '🎤', '💃', '🕺', '🍻', '🎶'],
      'fun': ['🎮', '🎲', '🤣', '🎉', '🃏'],
      'play': ['🎮', '🏀', '⚽', '🎾', '🎱', '🎲', '🏆'],
      'work': ['💻', "🖥️", '💼', '📅', '📝'],
      'school': ['📚', '🏫', '🎒', "👨‍🏫", "👩‍🏫"],
      'study': ['📖', '📝', '💡', '📚', '🎓'],
      'summer': ['🌞', "🏖️", '🌴', '🍉', '🌻'],
      'winter': ['❄️', '☃️', '🎿', '🔥', '⛄'],
      'autumn': ['🍁', '🍂', '🎃', '🍂', '🍁'],
      'spring': ['🌸', '🌼', '🌷', '🌱', '🌺'],
      'birthday': ['🎂', '🎉', '🎁', '🎈', '🎊'],
      'anniversary': ['💍', '🎉', '🎁', '🎈', '💑'],
      'robot': ['🤖', '⚙️', '🔧', '🤖', '🧠'],
      'bot': ['🤖', '🧠', '⚙️', '💻', "🖥️"],
      'thanks': ['🙏', '💖', '😊', '❤️', '💐'],
      "good luck": ['🍀', '🍀', '💯', '🍀', '🎯'],
      'john': ['👑', '🔥', '💥', '😎', '💯'],
      'mike': ['💪', '🏆', '🔥', '💥', '🚀'],
      'lisa': ['💖', '👑', '🌸', '😍', '🌺'],
      'emily': ['💖', '💃', '👑', '🎉', '🎀'],
      'food': ['🍕', '🍔', '🍟', '🍲', '🍣', '🍩'],
      'drink': ['🍺', '🍷', '🥂', '🍾', '🥤'],
      'coffee': ['☕', '🥤', '🍵', '🥶'],
      'tea': ['🍵', '🫖', '🍂', '🍃'],
      'excited': ['🤩', '🎉', '🥳', '💥', '🚀', '😆', '😜'],
      'nervous': ['😬', '😰', '🤞', '🧠', '👐'],
      'confused': ['🤔', '😕', '🧐', '😵', "🤷‍♂️", "🤷‍♀️"],
      'embarrassed': ['😳', '😳', '🙈', '😳', '😬', '😅'],
      'hopeful': ['🤞', '🌠', '🙏', '🌈', '💫'],
      'shy': ['😊', '😳', '🙈', '🫣', '🫶'],
      'family': ["👨‍👩‍👧‍👦", "👩‍👧", "👩‍👧‍👦", "👨‍👩‍👧", '💏', "👨‍👨‍👧‍👦", "👩‍👩‍👧‍👦"],
      'friends': ["👯‍♂️", "👯‍♀️", '🤗', '🫶', '💫', '🤝'],
      'relationship': ['💑', '❤️', '💍', '🥰', '💏', '💌'],
      'couple': ["👩‍❤️‍👨", "👨‍❤️‍👨", "👩‍❤️‍👩", '💍', '💑', '💏'],
      "best friend": ['🤗', '💖', "👯‍♀️", "👯‍♂️", '🙌'],
      "love you": ['❤️', '😘', '💖', '💘', '💓', '💗'],
      'vacation': ["🏖️", '🌴', '✈️', '🌊', "🛳️", "🏞️", "🏕️"],
      'beach': ["🏖️", '🌊', "🏄‍♀️", '🩴', "🏖️", '🌴', '🦀'],
      "road trip": ['🚗', '🚙', "🛣️", '🌄', '🌟'],
      'mountain': ["🏞️", '⛰️', "🏔️", '🌄', "🏕️", '🌲'],
      'city': ["🏙️", '🌆', '🗽', '🌇', '🚖', "🏙️"],
      'exploration': ['🌍', '🧭', '🌎', '🌍', '🧳', '📍', '⛵'],
      'morning': ['🌅', '☀️', '🌞', '🌄', '🌻', "🕶️"],
      'afternoon': ['🌞', "🌤️", '⛅', '🌻', '🌇'],
      'night': ['🌙', '🌛', '🌜', '⭐', '🌚', '💫'],
      'evening': ['🌙', '🌛', '🌇', '🌓', '💫'],
      'goodnight': ['🌙', '😴', '💤', '🌜', '🛌', '🌛', '✨'],
      'productivity': ['💻', '📊', '📝', '💼', '📅', '📈'],
      'office': ["🖥️", '💼', "🗂️", '📅', "🖋️"],
      'workout': ["🏋️‍♀️", '💪', "🏃‍♂️", "🏃‍♀️", "🤸‍♀️", "🚴‍♀️", "🏋️‍♂️"],
      "study hard": ['📚', '📝', '📖', '💡', '💼'],
      'focus': ['🔍', '🎯', '💻', '🧠', '🤓'],
      'food': ['🍕', '🍔', '🍟', '🍖', '🍖', '🥗', '🍣', '🍲'],
      'drink': ['🍹', '🥤', '🍷', '🍾', '🍸', '🍺', '🥂', '☕'],
      'coffee': ['☕', '🧃', '🍵', '🥤', '🍫'],
      'cake': ['🍰', '🎂', '🍩', '🍪', '🍫', '🧁'],
      "ice cream": ['🍦', '🍧', '🍨', '🍪'],
      'cat': ['🐱', '😺', '🐈', '🐾'],
      'dog': ['🐶', '🐕', '🐩', "🐕‍🦺", '🐾'],
      'bird': ['🐦', '🦉', '🦅', '🐦'],
      'fish': ['🐟', '🐠', '🐡', '🐡', '🐙'],
      'rabbit': ['🐰', '🐇', '🐹', '🐾'],
      'lion': ['🦁', '🐯', '🐅', '🐆'],
      'bear': ['🐻', '🐨', '🐼', "🐻‍❄️"],
      'elephant': ['🐘', '🐘'],
      'sun': ['☀️', '🌞', '🌄', '🌅', '🌞'],
      'rain': ["🌧️", '☔', '🌈', "🌦️", "🌧️"],
      'snow': ['❄️', '⛄', "🌨️", "🌬️", '❄️'],
      'wind': ['💨', "🌬️", "🌪️", "🌬️"],
      'earth': ['🌍', '🌏', '🌎', '🌍', '🌱', '🌳'],
      'phone': ['📱', '☎️', '📞', '📲', '📡'],
      'computer': ['💻', "🖥️", '⌨️', "🖱️", "🖥️"],
      'internet': ['🌐', '💻', '📶', '📡', '🔌'],
      'software': ['💻', "🖥️", "🧑‍💻", "🖱️", '💡'],
      'star': ['⭐', '🌟', '✨', '🌠', '💫'],
      'light': ['💡', '🔦', '✨', '🌟', '🔆'],
      'money': ['💵', '💰', '💸', '💳', '💶'],
      'victory': ['✌️', '🏆', '🎉', "🎖️", '🎊'],
      'gift': ['🎁', '🎀', '🎉', '🎁'],
      'fire': ['🔥', '💥', '🌋', '🔥', '💣'],
      'music': ['🎵', '🎶', '🎧', '🎤', '🎸', '🎹'],
      'sports': ['⚽', '🏀', '🏈', '🎾', "🏋️‍♂️", "🏃‍♀️", '🏆', '🥇'],
      'games': ['🎮', "🕹️", '🎲', '🎯', '🧩'],
      'art': ['🎨', "🖌️", "🖼️", '🎭', "🖍️"],
      'photography': ['📷', '📸', '📸', "🖼️", '🎥'],
      'reading': ['📚', '📖', '📚', '📰'],
      'craft': ['🧵', '🪡', '✂️', '🪢', '🧶'],
      'hello': ['👋', '🙂', '😊'],
      'hey': ['👋', '🙂', '😊'],
      'hi': ['👋', '🙂', '😊'],
      'bye': ['👋', '😢', '👋'],
      'goodbye': ['👋', '😢', "🙋‍♂️"],
      'thanks': ['🙏', '😊', '🌹'],
      "thank you": ['🙏', '😊', '🌸'],
      'welcome': ['😊', '😄', '🌷'],
      'congrats': ['🎉', '👏', '🥳'],
      'congratulations': ['🎉', '👏', '🥳'],
      "good job": ['👏', '👍', '🙌'],
      'great': ['👍', '💪', '😄'],
      'cool': ['😎', '🤙', '🔥'],
      'ok': ['👌', '👍', '✅'],
      'love': ['❤️', '💕', '💖'],
      'like': ['👍', '❤️', '👌'],
      'happy': ['😊', '😁', '🙂'],
      'joy': ['😁', '😆', '😂'],
      'laugh': ['😂', '🤣', '😁'],
      'sad': ['😢', '😭', '☹️'],
      'cry': ['😭', '😢', '😿'],
      'angry': ['😡', '😠', '💢'],
      'mad': ['😠', '😡', '😤'],
      'shocked': ['😲', '😱', '😮'],
      'scared': ['😱', '😨', '😧'],
      'sleep': ['😴', '💤', '😌'],
      'bored': ['😐', '😑', '🙄'],
      'excited': ['🤩', '🥳', '🎉'],
      'party': ['🥳', '🎉', '🍾'],
      'kiss': ['😘', '💋', '😍'],
      'hug': ['🤗', '❤️', '💕'],
      'peace': ['✌️', "🕊️", '✌️'],
      'pizza': ['🍕', '🥖', '🍟'],
      'coffee': ['☕', '🥤', '🍵'],
      'water': ['💧', '💦', '🌊'],
      'wine': ['🍷', '🍸', '🍾'],
      'hello': ['👋', '🙂', '😊', '😃', '😄'],
      'hey': ['👋', '😊', '🙋', '😄', '😁'],
      'hi': ['👋', '😀', '😁', '😃', '🙂'],
      'bye': ['👋', '😢', "🙋‍♂️", '😞', '😔'],
      'goodbye': ['👋', '😢', "🙋‍♀️", '😔', '😭'],
      'thanks': ['🙏', '😊', '🌹', '🤲', '🤗'],
      "thank you": ['🙏', '💐', '🤲', '🥰', '😌'],
      'welcome': ['😊', '😄', '🌸', '🙂', '💖'],
      'congrats': ['🎉', '👏', '🥳', '💐', '🎊'],
      'congratulations': ['🎉', '👏', '🥳', '🎊', '🍾'],
      "good job": ['👏', '👍', '🙌', '💪', '🤩'],
      'great': ['👍', '💪', '😄', '🔥', '✨'],
      'cool': ['😎', '🤙', '🔥', '👌', '🆒'],
      'ok': ['👌', '👍', '✅', '😌', '🤞'],
      'love': ['❤️', '💕', '💖', '💗', '😍'],
      'like': ['👍', '❤️', '👌', '😌', '💓'],
      'happy': ['😊', '😁', '🙂', '😃', '😄'],
      'joy': ['😁', '😆', '😂', '😊', '🤗'],
      'laugh': ['😂', '🤣', '😁', '😹', '😄'],
      'sad': ['😢', '😭', '☹️', '😞', '😔'],
      'cry': ['😭', '😢', '😿', '💧', '😩'],
      'angry': ['😡', '😠', '💢', '😤', '🤬'],
      'mad': ['😠', '😡', '😤', '💢', '😒'],
      'shocked': ['😲', '😱', '😮', '😯', '😧'],
      'scared': ['😱', '😨', '😧', '😰', '😳'],
      'sleep': ['😴', '💤', '😌', '😪', '🛌'],
      'bored': ['😐', '😑', '🙄', '😒', '🤦'],
      'excited': ['🤩', '🥳', '🎉', '😄', '✨'],
      'party': ['🥳', '🎉', '🎊', '🍾', '🎈'],
      'kiss': ['😘', '💋', '😍', '💖', '💏'],
      'hug': ['🤗', '❤️', '💕', '💞', '😊'],
      'peace': ['✌️', "🕊️", '🤞', '💫', '☮️'],
      'pizza': ['🍕', '🥖', '🍟', '🍔', '🍝'],
      'burger': ['🍔', '🍟', '🥓', '🥪', '🌭'],
      'fries': ['🍟', '🍔', '🥤', '🍿', '🧂'],
      'coffee': ['☕', '🥤', '🍵', '🫖', '🥄'],
      'tea': ['🍵', '☕', '🫖', '🥄', '🍪'],
      'cake': ['🍰', '🎂', '🧁', '🍩', '🍫'],
      'donut': ['🍩', '🍪', '🍰', '🧁', '🍫'],
      "ice cream": ['🍦', '🍨', '🍧', '🍧', '🍫'],
      'cookie': ['🍪', '🍩', '🍰', '🧁', '🍫'],
      'chocolate': ['🍫', '🍬', '🍰', '🍦', '🍭'],
      'popcorn': ['🍿', '🥤', '🍫', '🎬', '🍩'],
      'soda': ['🥤', '🍾', '🍹', '🍷', '🍸'],
      'water': ['💧', '💦', '🌊', '🚰', '🥤'],
      'wine': ['🍷', '🍾', '🥂', '🍹', '🍸'],
      'beer': ['🍺', '🍻', '🥂', '🍹', '🍾'],
      'cheers': ['🥂', '🍻', '🍾', '🎉', '🎊'],
      'sun': ['🌞', '☀️', '🌅', '🌄', '🌻'],
      'moon': ['🌜', '🌙', '🌚', '🌝', '🌛'],
      'star': ['🌟', '⭐', '✨', '💫', '🌠'],
      'cloud': ['☁️', "🌥️", "🌤️", '⛅', "🌧️"],
      'rain': ["🌧️", '☔', '💧', '💦', '🌂'],
      'thunder': ['⚡', '⛈️', "🌩️", "🌪️", '⚠️'],
      'fire': ['🔥', '⚡', '🌋', '🔥', '💥'],
      'flower': ['🌸', '🌺', '🌷', '💐', '🌹'],
      'tree': ['🌳', '🌲', '🌴', '🎄', '🌱'],
      'leaves': ['🍃', '🍂', '🍁', '🌿', '🌾'],
      'snow': ['❄️', '⛄', "🌨️", "🌬️", '☃️'],
      'wind': ['💨', "🌬️", '🍃', '⛅', "🌪️"],
      'rainbow': ['🌈', "🌤️", '☀️', '✨', '💧'],
      'ocean': ['🌊', '💦', '🚤', '⛵', "🏄‍♂️"],
      'dog': ['🐶', '🐕', '🐾', '🐩', '🦮'],
      'cat': ['🐱', '😺', '😸', '🐾', '🦁'],
      'lion': ['🦁', '🐯', '🐱', '🐾', '🐅'],
      'tiger': ['🐯', '🐅', '🦁', '🐆', '🐾'],
      'bear': ['🐻', '🐨', '🐼', '🧸', '🐾'],
      'rabbit': ['🐰', '🐇', '🐾', '🐹', '🐭'],
      'panda': ['🐼', '🐻', '🐾', '🐨', '🍃'],
      'monkey': ['🐒', '🐵', '🙊', '🙉', '🙈'],
      'fox': ['🦊', '🐺', '🐾', '🐶', '🦮'],
      'bird': ['🐦', '🐧', '🦅', '🦢', '🦜'],
      'fish': ['🐟', '🐠', '🐡', '🐬', '🐳'],
      'whale': ['🐋', '🐳', '🌊', '🐟', '🐠'],
      'dolphin': ['🐬', '🐟', '🐠', '🐳', '🌊'],
      'unicorn': ['🦄', '✨', '🌈', '🌸', '💫'],
      'bee': ['🐝', '🍯', '🌻', '💐', '🐞'],
      'butterfly': ['🦋', '🌸', '💐', '🌷', '🌼'],
      'phoenix': ['🦅', '🔥', '✨', '🌄', '🔥'],
      'wolf': ['🐺', '🌕', '🐾', '🌲', '🌌'],
      'mouse': ['🐭', '🐁', '🧀', '🐾', '🐀'],
      'cow': ['🐮', '🐄', '🐂', '🌾', '🍀'],
      'pig': ['🐷', '🐽', '🐖', '🐾', '🐗'],
      'horse': ['🐴', '🏇', '🐎', '🌄', "🏞️"],
      'sheep': ['🐑', '🐏', '🌾', '🐾', '🐐'],
      'soccer': ['⚽', '🥅', "🏟️", '🎉', '👏'],
      'basketball': ['🏀', "⛹️‍♂️", '🏆', '🎉', '🥇'],
      'tennis': ['🎾', '🏸', '🥇', '🏅', '💪'],
      'baseball': ['⚾', "🏟️", '🏆', '🎉', '👏'],
      'football': ['🏈', '🎉', "🏟️", '🏆', '🥅'],
      'golf': ['⛳', "🏌️‍♂️", "🏌️‍♀️", '🎉', '🏆'],
      'bowling': ['🎳', '🏅', '🎉', '🏆', '👏'],
      'running': ["🏃‍♂️", "🏃‍♀️", '👟', '🏅', '🔥'],
      'swimming': ["🏊‍♂️", "🏊‍♀️", '🌊', '🏆', '👏'],
      'cycling': ["🚴‍♂️", "🚴‍♀️", '🏅', '🔥', "🏞️"],
      'yoga': ['🧘', '🌸', '💪', '✨', '😌'],
      'dancing': ['💃', '🕺', '🎶', '🥳', '🎉'],
      'singing': ['🎤', '🎶', "🎙️", '🎉', '🎵'],
      'guitar': ['🎸', '🎶', '🎼', '🎵', '🎉'],
      'piano': ['🎹', '🎶', '🎼', '🎵', '🎉'],
      'money': ['💸', '💰', '💵', '💳', '🤑'],
      'fire': ['🔥', '💥', '⚡', '🎇', '✨'],
      'rocket': ['🚀', '🌌', '🛸', "🛰️", '✨'],
      'bomb': ['💣', '🔥', '⚡', '😱', '💥'],
      'computer': ['💻', "🖥️", '📱', '⌨️', "🖱️"],
      'phone': ['📱', '📲', '☎️', '📞', '📳'],
      'camera': ['📷', '📸', '🎥', '📹', "🎞️"],
      'book': ['📚', '📖', '✏️', '📘', '📕'],
      'light': ['💡', '✨', '🔦', '🌟', '🌞'],
      'music': ['🎶', '🎵', '🎼', '🎸', '🎧'],
      'star': ['🌟', '⭐', '✨', '🌠', '💫'],
      'gift': ['🎁', '💝', '🎉', '🎊', '🎈'],
      'car': ['🚗', '🚘', '🚙', '🚕', "🛣️"],
      'train': ['🚆', '🚄', '🚅', '🚞', '🚂'],
      'plane': ['✈️', '🛫', '🛬', "🛩️", '🚁'],
      'boat': ['⛵', "🛥️", '🚤', '🚢', '🌊'],
      'city': ["🏙️", '🌆', '🌇', '🏢', '🌃'],
      'beach': ["🏖️", '🌴', '🌊', '☀️', "🏄‍♂️"],
      'mountain': ["🏔️", '⛰️', '🗻', '🌄', '🌞'],
      'forest': ['🌲', '🌳', '🍃', "🏞️", '🐾'],
      'desert': ["🏜️", '🌵', '🐪', '🌞', "🏖️"],
      'hotel': ['🏨', '🏩', "🛏️", "🛎️", '🏢'],
      'restaurant': ["🍽️", '🍴', '🥂', '🍷', '🍾'],
      'brave': ["🦸‍♂️", "🦸‍♀️", '💪', '🔥', '👊'],
      'shy': ['😳', '☺️', '🙈', '😊', '😌'],
      'surprised': ['😲', '😮', '😧', '😯', '🤯'],
      'bored': ['😐', '😑', '😶', '🙄', '😒'],
      'sleepy': ['😴', '💤', '😪', '😌', '🛌'],
      'determined': ['💪', '🔥', '😤', '👊', '🏆'],
      'birthday': ['🎂', '🎉', '🎈', '🎊', '🍰'],
      'christmas': ['🎄', '🎅', '🤶', '🎁', '⛄'],
      "new year": ['🎉', '🎊', '🎇', '🍾', '✨'],
      'easter': ['🐰', '🐣', '🌷', '🥚', '🌸'],
      'halloween': ['🎃', '👻', "🕸️", "🕷️", '👹'],
      'valentine': ['💘', '❤️', '💌', '💕', '🌹'],
      'wedding': ['💍', '👰', '🤵', '🎩', '💒']
    };
    const _0x88a31b = ['😎', '🔥', '💥', '💯', '✨', '🌟', '🌈', '⚡', '💎', '🌀', '👑', '🎉', '🎊', '🦄', '👽', '🛸', '🚀', '🦋', '💫', '🍀', '🎶', '🎧', '🎸', '🎤', '🏆', '🏅', '🌍', '🌎', '🌏', '🎮', '🎲', '💪', "🏋️", '🥇', '👟', '🏃', '🚴', '🚶', '🏄', '⛷️', "🕶️", '🧳', '🍿', '🍿', '🥂', '🍻', '🍷', '🍸', '🥃', '🍾', '🎯', '⏳', '🎁', '🎈', '🎨', '🌻', '🌸', '🌺', '🌹', '🌼', '🌞', '🌝', '🌜', '🌙', '🌚', '🍀', '🌱', '🍃', '🍂', '🌾', '🐉', '🐍', '🦓', '🦄', '🦋', '🦧', '🦘', '🦨', '🦡', '🐉', '🐅', '🐆', '🐓', '🐢', '🐊', '🐠', '🐟', '🐡', '🦑', '🐙', '🦀', '🐬', '🦕', '🦖', '🐾', '🐕', '🐈', '🐇', '🐾', '🐁', '🐀', "🐿️"];
    const _0x3d4780 = _0x1ad154 => {
      const _0x3f7821 = _0x1ad154.split(/\s+/);
      for (const _0x25cda6 of _0x3f7821) {
        const _0x5e6add = _0x16ff9d(_0x25cda6.toLowerCase());
        if (_0x5e6add) {
          return _0x5e6add;
        }
      }
      return _0x88a31b[Math.floor(Math.random() * _0x88a31b.length)];
    };
    const _0x16ff9d = _0x4b5e8c => {
      const _0x47d5b7 = _0x18dde2[_0x4b5e8c.toLowerCase()];
      if (_0x47d5b7 && _0x47d5b7.length > 0) {
        return _0x47d5b7[Math.floor(Math.random() * _0x47d5b7.length)];
      }
      return null;
    };
    if (conf.AUTO_REACT_STATUS === "yes") {
      console.log("AUTO_REACT_STATUS is enabled. Listening for status updates...");
      _0x12aaab.ev.on("messages.upsert", async _0x10a2b8 => {
        const {
          messages: _0x5acf0e
        } = _0x10a2b8;
        for (const _0x43147e of _0x5acf0e) {
          if (_0x43147e.key && _0x43147e.key.remoteJid === "status@broadcast") {
            console.log("Detected status update from:", _0x43147e.key.remoteJid);
            const _0x54013d = Date.now();
            if (_0x54013d - _0x40bb84 < 5000) {
              console.log("Throttling reactions to prevent overflow.");
              continue;
            }
            const _0x573b94 = _0x12aaab.user && _0x12aaab.user.id ? _0x12aaab.user.id.split(':')[0] + "@s.whatsapp.net" : null;
            if (!_0x573b94) {
              console.log("Bot's user ID not available. Skipping reaction.");
              continue;
            }
            const _0x13c842 = _0x43147e?.["message"]?.["conversation"] || '';
            const _0x2f2a7d = _0x3d4780(_0x13c842) || _0x88a31b[Math.floor(Math.random() * _0x88a31b.length)];
            if (_0x2f2a7d) {
              await _0x12aaab.sendMessage(_0x43147e.key.remoteJid, {
                'react': {
                  'key': _0x43147e.key,
                  'text': _0x2f2a7d
                }
              }, {
                'statusJidList': [_0x43147e.key.participant, _0x573b94]
              });
              _0x40bb84 = Date.now();
              console.log("Successfully reacted with '" + _0x2f2a7d + "' to status update by " + _0x43147e.key.remoteJid);
            }
            await _0x462055(2000);
          }
        }
      });
    }
    if (conf.AUTO_REACT === "yes") {
      console.log("AUTO_REACT is enabled. Listening for regular messages...");
      _0x12aaab.ev.on("messages.upsert", async _0x306df9 => {
        const {
          messages: _0xd63751
        } = _0x306df9;
        for (const _0x25d6b6 of _0xd63751) {
          if (_0x25d6b6.key && _0x25d6b6.key.remoteJid) {
            const _0x4c0dfe = Date.now();
            if (_0x4c0dfe - _0x40bb84 < 5000) {
              console.log("Throttling reactions to prevent overflow.");
              continue;
            }
            const _0x546b6e = _0x25d6b6?.["message"]?.["conversation"] || '';
            const _0x36893b = _0x3d4780(_0x546b6e) || _0x88a31b[Math.floor(Math.random() * _0x88a31b.length)];
            if (_0x36893b) {
              await _0x12aaab.sendMessage(_0x25d6b6.key.remoteJid, {
                'react': {
                  'text': _0x36893b,
                  'key': _0x25d6b6.key
                }
              }).then(() => {
                _0x40bb84 = Date.now();
                console.log("Successfully reacted with '" + _0x36893b + "' to message by " + _0x25d6b6.key.remoteJid);
              })["catch"](_0x5df836 => {
                console.error("Failed to send reaction:", _0x5df836);
              });
            }
            await _0x462055(2000);
          }
        }
      });
    }
    if (conf.ANTI_BAD === "yes") {
      _0x12aaab.ev.on("messages.upsert", async _0x35712c => {
        const {
          messages: _0x4beb58,
          type: _0x3d1135
        } = _0x35712c;
        if (_0x3d1135 !== "notify") {
          return;
        }
        for (const _0x2e9245 of _0x4beb58) {
          try {
            if (!_0x2e9245.message || _0x2e9245.key.fromMe) {
              continue;
            }
            const _0xd0783c = _0x2e9245.key.remoteJid;
            const _0x2222c4 = _0xd0783c.endsWith("@g.us");
            const _0x9dc567 = _0x2e9245.message.conversation || _0x2e9245.message.extendedTextMessage?.["text"] || _0x2e9245.message.imageMessage?.["caption"] || _0x2e9245.message.videoMessage?.["caption"] || '';
            if (containsBadText(_0x9dc567)) {
              await _0x12aaab.sendMessage(_0xd0783c, {
                'text': "🚫 *Inappropriate language detected!*\nYour message has been removed."
              }, {
                'quoted': _0x2e9245
              });
              await _0x12aaab.sendMessage(_0xd0783c, {
                'delete': {
                  'remoteJid': _0xd0783c,
                  'fromMe': false,
                  'id': _0x2e9245.key.id,
                  'participant': _0x2e9245.key.participant || (_0x2222c4 ? _0x2e9245.key.participant : _0xd0783c)
                }
              });
              console.log("⚠️ Deleted bad message from " + _0xd0783c);
            }
          } catch (_0x2cb588) {
            console.error("❌ ANTI_BAD Error:", _0x2cb588);
          }
        }
      });
    } else {
      console.log("ANTI_BAD is off. Enable it in conf settings to activate.");
    }
    if (conf.ANTI_BUG === "yes") {
      _0x12aaab.ev.on("messages.upsert", async _0xe66aa7 => {
        const {
          messages: _0x13a6c3,
          type: _0x314e31
        } = _0xe66aa7;
        if (_0x314e31 !== "notify") {
          return;
        }
        for (const _0x4b5bba of _0x13a6c3) {
          try {
            if (!_0x4b5bba.message || _0x4b5bba.key.fromMe) {
              continue;
            }
            const _0x29f852 = _0x4b5bba.key.remoteJid;
            const _0x20b054 = _0x4b5bba.key.participant || _0x4b5bba.key.remoteJid;
            const _0x6b28ac = JSON.stringify(_0x4b5bba.message);
            const _0xe01e10 = _0x4b5bba.message.conversation || _0x4b5bba.message.extendedTextMessage?.["text"] || '';
            if (isAntiBugOn(_0x29f852) && containsBug(_0x6b28ac)) {
              await _0x12aaab.sendMessage(_0x29f852, {
                'delete': {
                  'remoteJid': _0x4b5bba.key.remoteJid,
                  'fromMe': false,
                  'id': _0x4b5bba.key.id,
                  'participant': _0x4b5bba.key.participant || _0x4b5bba.key.remoteJid
                }
              });
              await _0x12aaab.sendMessage(_0x29f852, {
                'text': "🚫 @" + _0x20b054.split('@')[0] + ", your message was deleted because it contained *bug/crash content* that can harm chats.",
                'mentions': [_0x20b054]
              });
              if (conf.ANTI_BUG_REPORT_TO) {
                await _0x12aaab.sendMessage(conf.ANTI_BUG_REPORT_TO, {
                  'text': "📢 *Anti-Bug Report*\n\n👤 User: @" + _0x20b054.split('@')[0] + "\n💬 Message: " + _0xe01e10 + "\n⚡ Action: Deleted due to bug/crash content.",
                  'mentions': [_0x20b054]
                });
              }
              console.log("🚫 Deleted buggy message from " + _0x20b054 + " in chat " + _0x29f852);
            }
          } catch (_0x346348) {
            console.error("❌ Failed to process anti-bug message:", _0x346348);
          }
        }
      });
    } else {
      console.warn("⚠️ ANTI_BUG is disabled in conf settings.");
    }
    let _0x106c37 = {};
    if (fs.existsSync("./tmd/anti.json")) {
      _0x106c37 = JSON.parse(fs.readFileSync("./tmd/anti.json"));
    } else {
      _0x106c37 = {
        'ANTI_MENTION_GROUP': "off",
        'reportTo': ''
      };
      fs.writeFileSync("./tmd/anti.json", JSON.stringify(_0x106c37, null, 2));
    }
    _0x12aaab.ev.on("messages.upsert", async ({
      messages: _0x46a588
    }) => {
      const _0x32f682 = _0x46a588[0];
      if (!_0x32f682 || !_0x32f682.message || _0x32f682.key.fromMe) {
        return;
      }
      if (_0x106c37.ANTI_MENTION_GROUP === 'on') {
        const _0x57ae25 = _0x32f682.message.extendedTextMessage?.["contextInfo"]?.["mentionedJid"] || [];
        const _0x2f5336 = _0x32f682.key.participant || _0x32f682.key.remoteJid;
        const _0x175f6e = _0x32f682.message.conversation || _0x32f682.message.extendedTextMessage?.["text"] || '';
        for (const _0x44c6c4 of _0x57ae25) {
          if (_0x44c6c4.endsWith("@g.us")) {
            try {
              await _0x12aaab.sendMessage(_0x32f682.key.remoteJid, {
                'delete': _0x32f682.key
              });
              console.log("🚫 Message deleted: Group was mentioned.");
              await _0x12aaab.sendMessage(_0x32f682.key.remoteJid, {
                'text': "🚫 @" + _0x2f5336.split('@')[0] + ", your message was deleted because *mentioning other groups is not allowed here.*",
                'mentions': [_0x2f5336]
              });
              if (_0x106c37.reportTo) {
                await _0x12aaab.sendMessage(_0x106c37.reportTo, {
                  'text': "📢 *Anti-Mention Report*\n\n👤 User: @" + _0x2f5336.split('@')[0] + "\n💬 Message: " + _0x175f6e + "\n⚡ Action: Deleted for mentioning another group.",
                  'mentions': [_0x2f5336]
                });
              }
            } catch (_0x3add21) {
              console.error("❌ Error deleting message:", _0x3add21);
            }
            break;
          }
        }
      }
    });
    async function _0x4fa9a5(_0x338ea8, _0x323cd7) {
      try {
        const _0x20d65c = _0x338ea8.split('@')[0];
        let _0xfb1558 = 1;
        let _0x543dac = _0x323cd7 + " " + _0xfb1558;
        while (Object.values(store.contacts).some(_0x11fa54 => _0x11fa54.name === _0x543dac)) {
          _0xfb1558++;
          _0x543dac = _0x323cd7 + " " + _0xfb1558;
        }
        const _0x414088 = "BEGIN:VCARD\nVERSION:3.0\nFN:" + _0x543dac + "\nTEL;type=CELL;type=VOICE;waid=" + _0x20d65c + ':+' + _0x20d65c + "\nEND:VCARD\n";
        const _0x53c0ba = './' + _0x543dac + ".vcf";
        fs.writeFileSync(_0x53c0ba, _0x414088);
        await _0x12aaab.sendMessage(conf.NUMERO_OWNER + "@s.whatsapp.net", {
          'document': {
            'url': _0x53c0ba
          },
          'mimetype': "text/vcard",
          'fileName': _0x543dac + ".vcf",
          'caption': "Contact saved as " + _0x543dac + ". Please import this vCard to add the number to your contacts.\n\n TIMNASA MD👊"
        });
        console.log("vCard created and sent for: " + _0x543dac + " (" + _0x338ea8 + ')');
        fs.unlinkSync(_0x53c0ba);
        return _0x543dac;
      } catch (_0x1c3e84) {
        console.error("Error creating or sending vCard for " + name + ':', _0x1c3e84.message);
      }
    }
    _0x12aaab.ev.on("messages.upsert", async _0x2228e2 => {
      if (conf.AUTO_SAVE_CONTACTS !== "yes") {
        return;
      }
      const {
        messages: _0x627db
      } = _0x2228e2;
      const _0x535024 = _0x627db[0];
      if (!_0x535024.message) {
        return;
      }
      const _0x2c6914 = _0x535024.key.remoteJid;
      if (_0x2c6914.endsWith("@s.whatsapp.net") && (!store.contacts[_0x2c6914] || !store.contacts[_0x2c6914].name)) {
        const _0xaba519 = await _0x4fa9a5(_0x2c6914, "Timnasa-Md");
        store.contacts[_0x2c6914] = {
          'name': _0xaba519
        };
        await _0x12aaab.sendMessage(_0x2c6914, {
          'text': "Ssup Your name has been saved as \"" + _0xaba519 + "\" in my account.\n\nTIMNASA_MD"
        });
        console.log("Contact " + _0xaba519 + " has been saved and notified.");
      }
    });
    let _0x1d4a42 = "Hello,its Timnasa Md on board. My owner is currently unavailable. Please leave a message, and we will get back to you as soon as possible.";
    let _0xfb4930 = new Set();
    _0x12aaab.ev.on("messages.upsert", async _0x28227d => {
      const {
        messages: _0x5f4364
      } = _0x28227d;
      const _0x4570f1 = _0x5f4364[0];
      if (!_0x4570f1.message) {
        return;
      }
      const _0x2b32eb = _0x4570f1.message.conversation || _0x4570f1.message.extendedTextMessage?.["text"];
      const _0x28ae01 = _0x4570f1.key.remoteJid;
      if (_0x2b32eb && _0x2b32eb.match(/^[^\w\s]/) && _0x4570f1.key.fromMe) {
        const _0x4a5ae9 = _0x2b32eb[0];
        const _0x5c4f9d = _0x2b32eb.slice(1).split(" ")[0];
        const _0xe010bc = _0x2b32eb.slice(_0x4a5ae9.length + _0x5c4f9d.length).trim();
        if (_0x5c4f9d === "setautoreply" && _0xe010bc) {
          _0x1d4a42 = _0xe010bc;
          await _0x12aaab.sendMessage(_0x28ae01, {
            'text': "Auto-reply message has been updated to:\n\"" + _0x1d4a42 + "\""
          });
          return;
        }
      }
      if (conf.AUTO_REPLY === "yes" && !_0xfb4930.has(_0x28ae01) && !_0x4570f1.key.fromMe && !_0x28ae01.includes("@g.us")) {
        await _0x12aaab.sendMessage(_0x28ae01, {
          'text': _0x1d4a42
        });
        const _0x3e6603 = {
          'heya': "audios/hey.wav",
          'hi': "audios/hey.wav",
          'hey': "audios/hey.wav",
          'he': "audios/hey.wav",
          'hello': "audios/hello.wav",
          'mambo': "audios/hey.wav",
          'niaje': "audios/hey.wav",
          'morning': "audios/goodmorning.wav",
          'goodmorning': "audios/goodmorning.wav",
          "wake up": "audios/goodmorning.wav",
          'night': "audios/goodnight.wav",
          'goodnight': "audios/goodnight.wav",
          'sleep': "audios/goodnight.wav",
          'man': "audios/mkuu.wav",
          'owoh': "audios/mkuu.wav",
          'yoo': "audios/mkuu.wav",
          'wazii': "audios/mkuu.wav",
          'bot': "audios/tmd.mp3",
          'timnasa': "audios/timnasa.mp3",
          "timnasa tmd": "audios/timnasa.mp3",
          'Multiple': "audios/multiple.mp3",
          'timnasa': "audios/timnasa.mp3",
          'md': "audios/timnasa.mp3",
          "whatsapp bot": "audios/timnasa.mp3",
          "timoth md": "audios/timoth.mp3",
          'evening': "audios/goodevening.wav",
          'goodevening': "audios/goodevening.wav",
          'darling': "audios/darling.wav",
          'beb': "audios/darling.wav",
          'mpenzi': "audios/darling.wav",
          'afternoon': "audios/goodafternoon.wav",
          'jioni': "audios/goodafternoon.wav",
          'kaka': "audios/kaka.wav",
          'bro': "audios/morio.mp3",
          'ndugu': "audios/kaka.wav",
          'morio': "audios/morio.mp3",
          'mzee': "audios/morio.mp3",
          'kijana': "audios/mkuu.wav",
          'mkuu': "audios/mkuu.wav",
          'ozah': "audios/mkuu.wav",
          'ozaah': "audios/mkuu.wav",
          'oyaah': "audios/mkuu.wav",
          'oyah': "audios/mkuu.wav"
        };
        const _0x3da8ff = _0x1e9960 => {
          const _0x59ce9e = _0x1e9960.split(/\s+/);
          for (const _0x31e4c2 of _0x59ce9e) {
            const _0x362965 = _0x3e6603[_0x31e4c2.toLowerCase()];
            if (_0x362965) {
              return _0x362965;
            }
          }
          return null;
        };
        if (conf.AUDIO_REPLY === "yes") {
          console.log("AUTO_REPLY_AUDIO is enabled. Listening for messages...");
          _0x12aaab.ev.on("messages.upsert", async _0xb8ca20 => {
            try {
              const {
                messages: _0x55cde4
              } = _0xb8ca20;
              for (const _0x1904d7 of _0x55cde4) {
                if (!_0x1904d7.key || !_0x1904d7.key.remoteJid) {
                  continue;
                }
                const _0x28690c = _0x1904d7?.["message"]?.["conversation"] || '';
                const _0x387587 = _0x3da8ff(_0x28690c);
                if (_0x387587) {
                  try {
                    await fs.access(_0x387587);
                    console.log("Replying with audio: " + _0x387587);
                    await _0x12aaab.sendMessage(_0x1904d7.key.remoteJid, {
                      'audio': {
                        'url': _0x387587
                      },
                      'mimetype': "audio/mp4",
                      'ptt': true
                    });
                    console.log("Audio reply sent: " + _0x387587);
                  } catch (_0x7edc28) {
                    console.error("Error sending audio reply: " + _0x7edc28.message);
                  }
                } else {
                  console.log("No matching keyword detected. Skipping message.");
                }
                await new Promise(_0x3de6aa => setTimeout(_0x3de6aa, 3000));
              }
            } catch (_0x5e15d8) {
              console.error("Error in message processing:", _0x5e15d8.message);
            }
          });
        }
        _0xfb4930.add(_0x28ae01);
      }
    });
    _0x12aaab.ev.on("messages.upsert", async _0x361701 => {
      const {
        messages: _0x34888f
      } = _0x361701;
      const _0x2188be = _0x34888f[0];
      if (!_0x2188be.message) {
        return;
      }
      const _0x1afd19 = _0x398f39 => {
        if (!_0x398f39) {
          return _0x398f39;
        }
        if (/:\d+@/gi.test(_0x398f39)) {
          0;
          let _0x119bc8 = baileys_1.jidDecode(_0x398f39) || {};
          return _0x119bc8.user && _0x119bc8.server && _0x119bc8.user + '@' + _0x119bc8.server || _0x398f39;
        } else {
          return _0x398f39;
        }
      };
      0;
      var _0x5352f8 = baileys_1.getContentType(_0x2188be.message);
      var _0x4cd1af = _0x5352f8 == "conversation" ? _0x2188be.message.conversation : _0x5352f8 == "imageMessage" ? _0x2188be.message.imageMessage?.["caption"] : _0x5352f8 == "videoMessage" ? _0x2188be.message.videoMessage?.["caption"] : _0x5352f8 == "extendedTextMessage" ? _0x2188be.message?.["extendedTextMessage"]?.["text"] : _0x5352f8 == "buttonsResponseMessage" ? _0x2188be?.["message"]?.["buttonsResponseMessage"]?.["selectedButtonId"] : _0x5352f8 == "listResponseMessage" ? _0x2188be.message?.["listResponseMessage"]?.["singleSelectReply"]?.["selectedRowId"] : _0x5352f8 == "messageContextInfo" ? _0x2188be?.["message"]?.["buttonsResponseMessage"]?.["selectedButtonId"] || _0x2188be.message?.["listResponseMessage"]?.["singleSelectReply"]?.["selectedRowId"] || _0x2188be.text : '';
      var _0x4330a6 = _0x2188be.key.remoteJid;
      var _0x319cad = _0x1afd19(_0x12aaab.user.id);
      var _0xf46993 = _0x319cad.split('@')[0];
      const _0x393341 = _0x4330a6?.["endsWith"]("@g.us");
      var _0x6c2233 = _0x393341 ? await _0x12aaab.groupMetadata(_0x4330a6) : '';
      var _0x36cff2 = _0x393341 ? _0x6c2233.subject : '';
      var _0x340a21 = _0x2188be.message.extendedTextMessage?.["contextInfo"]?.["quotedMessage"];
      var _0x5ecf95 = _0x1afd19(_0x2188be.message?.["extendedTextMessage"]?.["contextInfo"]?.["participant"]);
      var _0x5d71d6 = _0x393341 ? _0x2188be.key.participant ? _0x2188be.key.participant : _0x2188be.participant : _0x4330a6;
      if (_0x2188be.key.fromMe) {
        _0x5d71d6 = _0x319cad;
      }
      var _0x99f10e = _0x393341 ? _0x2188be.key.participant : '';
      const {
        getAllSudoNumbers: _0x2c2a5d
      } = require("./data/sudo");
      const _0x73ed7f = _0x2188be.pushName;
      const _0x4e69e6 = await _0x2c2a5d();
      const _0x5d42a = [_0xf46993, "255752593977", "255620814108", "255764182801", "255752593977", conf.NUMERO_OWNER].map(_0x2e9158 => _0x2e9158.replace(/[^0-9]/g) + "@s.whatsapp.net");
      const _0x125c24 = _0x5d42a.concat(_0x4e69e6);
      const _0x399982 = _0x125c24.includes(_0x5d71d6);
      var _0x2257ca = ["255752593977", "255620814108", "255764182801", "255752593977"].map(_0x5a2c5b => _0x5a2c5b.replace(/[^0-9]/g) + "@s.whatsapp.net").includes(_0x5d71d6);
      function _0xa82acb(_0x40d039) {
        _0x12aaab.sendMessage(_0x4330a6, {
          'text': _0x40d039
        }, {
          'quoted': _0x2188be
        });
      }
      console.log("\tCONSOLE MESSAGES");
      console.log("=========== NEW CONVERSATION ===========");
      if (_0x393341) {
        console.log("MESSAGE FROM GROUP : " + _0x36cff2);
      }
      console.log("MESSAGE SENT BY : [" + _0x73ed7f + " : " + _0x5d71d6.split("@s.whatsapp.net")[0] + " ]");
      console.log("MESSAGE TYPE : " + _0x5352f8);
      console.log("==================TEXT==================");
      console.log(_0x4cd1af);
      function _0x2a7eff(_0x4cfcac) {
        let _0x4fa873 = [];
        for (_0x361701 of _0x4cfcac) {
          if (_0x361701.admin == null) {
            continue;
          }
          _0x4fa873.push(_0x361701.id);
        }
        return _0x4fa873;
      }
      var _0x4faf58 = conf.ETAT;
      if (_0x4faf58 == 1) {
        await _0x12aaab.sendPresenceUpdate("available", _0x4330a6);
      } else {
        if (_0x4faf58 == 2) {
          await _0x12aaab.sendPresenceUpdate("composing", _0x4330a6);
        } else if (_0x4faf58 == 3) {
          await _0x12aaab.sendPresenceUpdate("recording", _0x4330a6);
        } else {
          await _0x12aaab.sendPresenceUpdate("unavailable", _0x4330a6);
        }
      }
      const _0x2b5e19 = _0x393341 ? await _0x6c2233.participants : '';
      let _0x4eb4d8 = _0x393341 ? _0x2a7eff(_0x2b5e19) : '';
      const _0x6a7d7c = _0x393341 ? _0x4eb4d8.includes(_0x5d71d6) : false;
      var _0x45cf8c = _0x393341 ? _0x4eb4d8.includes(_0x319cad) : false;
      const _0x4bae5e = _0x4cd1af ? _0x4cd1af.trim().split(/ +/).slice(1) : null;
      const _0x52b3a3 = _0x4cd1af ? _0x4cd1af.startsWith(prefixe) : false;
      const _0x57a26f = _0x52b3a3 ? _0x4cd1af.slice(1).trim().split(/ +/).shift().toLowerCase() : false;
      const _0x3e7c0f = conf.URL.split(',');
      function _0x263f24() {
        const _0x4c5bb5 = Math.floor(Math.random() * _0x3e7c0f.length);
        const _0x498846 = _0x3e7c0f[_0x4c5bb5];
        return _0x498846;
      }
      var _0x22553f = {
        'superUser': _0x399982,
        'dev': _0x2257ca,
        'verifGroupe': _0x393341,
        'mbre': _0x2b5e19,
        'membreGroupe': _0x99f10e,
        'verifAdmin': _0x6a7d7c,
        'infosGroupe': _0x6c2233,
        'nomGroupe': _0x36cff2,
        'auteurMessage': _0x5d71d6,
        'nomAuteurMessage': _0x73ed7f,
        'idBot': _0x319cad,
        'verifZokouAdmin': _0x45cf8c,
        'prefixe': prefixe,
        'arg': _0x4bae5e,
        'repondre': _0xa82acb,
        'mtype': _0x5352f8,
        'groupeAdmin': _0x2a7eff,
        'msgRepondu': _0x340a21,
        'auteurMsgRepondu': _0x5ecf95,
        'ms': _0x2188be,
        'mybotpic': _0x263f24
      };
      if (conf.AUTO_READ === "yes") {
        _0x12aaab.ev.on("messages.upsert", async _0x143bda => {
          const {
            messages: _0x2ba2a5
          } = _0x143bda;
          for (const _0x4797cf of _0x2ba2a5) {
            if (!_0x4797cf.key.fromMe) {
              await _0x12aaab.readMessages([_0x4797cf.key]);
            }
          }
        });
      }
      let _0x5cc804 = 0;
      if (!_0x399982 && _0x4330a6 === _0x5d71d6 && conf.CHAT_BOT === "yes") {
        console.log("🤖 Chatbot is active");
        try {
          const _0x3c5021 = Date.now();
          if (_0x3c5021 - _0x5cc804 < 10000) {
            return;
          }
          const _0x15c5bc = await axios.get("https://apis-keith.vercel.app/ai/gpt", {
            'params': {
              'q': _0x4cd1af
            },
            'timeout': 0x2710
          });
          if (_0x15c5bc.data?.["status"] && _0x15c5bc.data?.["result"]) {
            const _0x472ab5 = '_' + _0x15c5bc.data.result + '_';
            await _0x12aaab.sendMessage(_0x4330a6, {
              'text': _0x472ab5,
              'mentions': [_0x5d71d6]
            }, {
              'quoted': _0x2188be
            });
            _0x5cc804 = _0x3c5021;
          }
        } catch (_0x319a78) {
          console.error("Chatbot error:", _0x319a78);
        }
      }
      if (_0x2188be.key && _0x2188be.key.remoteJid === "status@broadcast" && conf.AUTO_STATUS_REPLY === "yes") {
        const _0x2ca735 = _0x2188be.key.participant;
        const _0x118399 = '' + conf.AUTO_STATUS_TEXT;
        await _0x12aaab.sendMessage(_0x2ca735, {
          'text': _0x118399,
          'react': {
            'text': '🤦',
            'key': _0x2188be.key
          }
        }, {
          'quoted': _0x2188be
        });
      }
      if (_0x2188be.key && _0x2188be.key.remoteJid === "status@broadcast" && conf.AUTO_READ_STATUS === "yes") {
        await _0x12aaab.readMessages([_0x2188be.key]);
      }
      if (_0x2188be.key && _0x2188be.key.remoteJid === "status@broadcast" && conf.AUTO_DOWNLOAD_STATUS === "yes") {
        if (_0x2188be.message.extendedTextMessage) {
          var _0x3132e4 = _0x2188be.message.extendedTextMessage.text;
          await _0x12aaab.sendMessage(_0x319cad, {
            'text': _0x3132e4
          }, {
            'quoted': _0x2188be
          });
        } else {
          if (_0x2188be.message.imageMessage) {
            var _0x1aa04e = _0x2188be.message.imageMessage.caption;
            var _0x38de36 = await _0x12aaab.downloadAndSaveMediaMessage(_0x2188be.message.imageMessage);
            await _0x12aaab.sendMessage(_0x319cad, {
              'image': {
                'url': _0x38de36
              },
              'caption': _0x1aa04e
            }, {
              'quoted': _0x2188be
            });
          } else {
            if (_0x2188be.message.videoMessage) {
              var _0x1aa04e = _0x2188be.message.videoMessage.caption;
              var _0x44ad5c = await _0x12aaab.downloadAndSaveMediaMessage(_0x2188be.message.videoMessage);
              await _0x12aaab.sendMessage(_0x319cad, {
                'video': {
                  'url': _0x44ad5c
                },
                'caption': _0x1aa04e
              }, {
                'quoted': _0x2188be
              });
            }
          }
        }
      }
      if (!_0x2257ca && _0x4330a6 == "120363158701337904@g.us") {
        return;
      }
      if (_0x4cd1af && _0x5d71d6.endsWith("s.whatsapp.net")) {
        const {
          ajouterOuMettreAJourUserData: _0x420b4c
        } = require("./data/level");
        try {
          await _0x420b4c(_0x5d71d6);
        } catch (_0x506efc) {
          console.error(_0x506efc);
        }
      }
      try {
        if (_0x2188be.message[_0x5352f8].contextInfo.mentionedJid && (_0x2188be.message[_0x5352f8].contextInfo.mentionedJid.includes(_0x319cad) || _0x2188be.message[_0x5352f8].contextInfo.mentionedJid.includes(conf.NUMERO_OWNER + "@s.whatsapp.net"))) {
          if (_0x4330a6 == "120363158701337904@g.us") {
            return;
          }
          ;
          if (_0x399982) {
            console.log("hummm");
            return;
          }
          let _0x251dde = require("./data/mention");
          let _0x7d43e5 = await _0x251dde.recupererToutesLesValeurs();
          let _0x39ea53 = _0x7d43e5[0];
          if (_0x39ea53.status === "non") {
            console.log("mention pas actifs");
            return;
          }
          let _0x69cd97;
          if (_0x39ea53.type.toLocaleLowerCase() === "image") {
            _0x69cd97 = {
              'image': {
                'url': _0x39ea53.url
              },
              'caption': _0x39ea53.message
            };
          } else {
            if (_0x39ea53.type.toLocaleLowerCase() === "video") {
              _0x69cd97 = {
                'video': {
                  'url': _0x39ea53.url
                },
                'caption': _0x39ea53.message
              };
            } else {
              if (_0x39ea53.type.toLocaleLowerCase() === "sticker") {
                let _0x41fd4a = new Sticker(_0x39ea53.url, {
                  'pack': conf.NOM_OWNER,
                  'type': StickerTypes.FULL,
                  'categories': ['🤩', '🎉'],
                  'id': "12345",
                  'quality': 0x46,
                  'background': "transparent"
                });
                const _0x47ef0a = await _0x41fd4a.toBuffer();
                _0x69cd97 = {
                  'sticker': _0x47ef0a
                };
              } else if (_0x39ea53.type.toLocaleLowerCase() === "audio") {
                _0x69cd97 = {
                  'audio': {
                    'url': _0x39ea53.url
                  },
                  'mimetype': "audio/mp4"
                };
              }
            }
          }
          _0x12aaab.sendMessage(_0x4330a6, _0x69cd97, {
            'quoted': _0x2188be
          });
        }
      } catch (_0x4b944f) {}
      try {
        const _0x3532ba = await verifierEtatJid(_0x4330a6);
        if (_0x4cd1af.includes("https://") && _0x393341 && _0x3532ba) {
          console.log("lien detecté");
          var _0x8abde3 = _0x393341 ? _0x4eb4d8.includes(_0x319cad) : false;
          if (_0x399982 || _0x6a7d7c || !_0x8abde3) {
            console.log("je fais rien");
            return;
          }
          ;
          const _0x139108 = {
            'remoteJid': _0x4330a6,
            'fromMe': false,
            'id': _0x2188be.key.id,
            'participant': _0x5d71d6
          };
          var _0x33d865 = "lien detected, \n";
          var _0x28f3b6 = new Sticker("https://raw.githubusercontent.com/mr-X-force/LUCKY-MD-XFORCE/main/media/remover.gif", {
            'pack': "Freditech",
            'author': conf.OWNER_NAME,
            'type': StickerTypes.FULL,
            'categories': ['🤩', '🎉'],
            'id': "12345",
            'quality': 0x32,
            'background': "#000000"
          });
          await _0x28f3b6.toFile("st1.webp");
          var _0x531491 = await recupererActionJid(_0x4330a6);
          if (_0x531491 === "remove") {
            _0x33d865 += "message deleted \n @" + _0x5d71d6.split('@')[0] + " removed from group.";
            await _0x12aaab.sendMessage(_0x4330a6, {
              'sticker': fs.readFileSync("st1.webp")
            });
            0;
            baileys_1.delay(800);
            await _0x12aaab.sendMessage(_0x4330a6, {
              'text': _0x33d865,
              'mentions': [_0x5d71d6]
            }, {
              'quoted': _0x2188be
            });
            try {
              await _0x12aaab.groupParticipantsUpdate(_0x4330a6, [_0x5d71d6], "remove");
            } catch (_0xd87acd) {
              console.log("antiien ") + _0xd87acd;
            }
            await _0x12aaab.sendMessage(_0x4330a6, {
              'delete': _0x139108
            });
            await fs.unlink("st1.webp");
          } else {
            if (_0x531491 === "delete") {
              _0x33d865 += "message deleted \n @" + _0x5d71d6.split('@')[0] + " avoid sending link.";
              await _0x12aaab.sendMessage(_0x4330a6, {
                'text': _0x33d865,
                'mentions': [_0x5d71d6]
              }, {
                'quoted': _0x2188be
              });
              await _0x12aaab.sendMessage(_0x4330a6, {
                'delete': _0x139108
              });
              await fs.unlink("st1.webp");
            } else {
              if (_0x531491 === "warn") {
                const {
                  getWarnCountByJID: _0xad63dc,
                  ajouterUtilisateurAvecWarnCount: _0x5f2f40
                } = require("./data/warn");
                let _0x3ffd9b = await _0xad63dc(_0x5d71d6);
                let _0x3c5a91 = conf.WARN_COUNT;
                if (_0x3ffd9b >= _0x3c5a91) {
                  var _0x3d6430 = "link detected , you will be remove because of reaching warn-limit";
                  await _0x12aaab.sendMessage(_0x4330a6, {
                    'text': _0x3d6430,
                    'mentions': [_0x5d71d6]
                  }, {
                    'quoted': _0x2188be
                  });
                  await _0x12aaab.groupParticipantsUpdate(_0x4330a6, [_0x5d71d6], "remove");
                  await _0x12aaab.sendMessage(_0x4330a6, {
                    'delete': _0x139108
                  });
                } else {
                  var _0x410247 = _0x3c5a91 - _0x3ffd9b;
                  var _0x543493 = "Link detected , your warn_count was upgrade ;\n rest : " + _0x410247 + " ";
                  await _0x5f2f40(_0x5d71d6);
                  await _0x12aaab.sendMessage(_0x4330a6, {
                    'text': _0x543493,
                    'mentions': [_0x5d71d6]
                  }, {
                    'quoted': _0x2188be
                  });
                  await _0x12aaab.sendMessage(_0x4330a6, {
                    'delete': _0x139108
                  });
                }
              }
            }
          }
        }
      } catch (_0x44b3a9) {
        console.log("data err " + _0x44b3a9);
      }
      try {
        const _0xec7524 = _0x2188be.key?.['id']?.["startsWith"]("BAES") && _0x2188be.key?.['id']?.["length"] === 16;
        const _0x4a4fdc = _0x2188be.key?.['id']?.["startsWith"]("BAE5") && _0x2188be.key?.['id']?.["length"] === 16;
        if (_0xec7524 || _0x4a4fdc) {
          if (_0x5352f8 === "reactionMessage") {
            console.log("Je ne reagis pas au reactions");
            return;
          }
          ;
          const _0xefe2b2 = await atbverifierEtatJid(_0x4330a6);
          if (!_0xefe2b2) {
            return;
          }
          ;
          if (_0x6a7d7c || _0x5d71d6 === _0x319cad) {
            console.log("je fais rien");
            return;
          }
          ;
          const _0x1132a5 = {
            'remoteJid': _0x4330a6,
            'fromMe': false,
            'id': _0x2188be.key.id,
            'participant': _0x5d71d6
          };
          var _0x33d865 = "bot detected, \n";
          var _0x28f3b6 = new Sticker("https://raw.githubusercontent.com/mr-X-force/LUCKY-MD-XFORCE/main/media/remover.gif", {
            'pack': "FredieTech",
            'author': conf.OWNER_NAME,
            'type': StickerTypes.FULL,
            'categories': ['🤩', '🎉'],
            'id': "12345",
            'quality': 0x32,
            'background': "#000000"
          });
          await _0x28f3b6.toFile("st1.webp");
          var _0x531491 = await atbrecupererActionJid(_0x4330a6);
          if (_0x531491 === "remove") {
            _0x33d865 += "message deleted \n @" + _0x5d71d6.split('@')[0] + " removed from group.";
            await _0x12aaab.sendMessage(_0x4330a6, {
              'sticker': fs.readFileSync("st1.webp")
            });
            0;
            baileys_1.delay(800);
            await _0x12aaab.sendMessage(_0x4330a6, {
              'text': _0x33d865,
              'mentions': [_0x5d71d6]
            }, {
              'quoted': _0x2188be
            });
            try {
              await _0x12aaab.groupParticipantsUpdate(_0x4330a6, [_0x5d71d6], "remove");
            } catch (_0x97568a) {
              console.log("antibot ") + _0x97568a;
            }
            await _0x12aaab.sendMessage(_0x4330a6, {
              'delete': _0x1132a5
            });
            await fs.unlink("st1.webp");
          } else {
            if (_0x531491 === "delete") {
              _0x33d865 += "message delete \n @" + _0x5d71d6.split('@')[0] + " Avoid sending link.";
              await _0x12aaab.sendMessage(_0x4330a6, {
                'text': _0x33d865,
                'mentions': [_0x5d71d6]
              }, {
                'quoted': _0x2188be
              });
              await _0x12aaab.sendMessage(_0x4330a6, {
                'delete': _0x1132a5
              });
              await fs.unlink("st1.webp");
            } else {
              if (_0x531491 === "warn") {
                const {
                  getWarnCountByJID: _0x40e747,
                  ajouterUtilisateurAvecWarnCount: _0x1489b2
                } = require("./data/warn");
                let _0x247d0f = await _0x40e747(_0x5d71d6);
                let _0x52343d = conf.WARN_COUNT;
                if (_0x247d0f >= _0x52343d) {
                  var _0x3d6430 = "bot detected ;you will be remove because of reaching warn-limit";
                  await _0x12aaab.sendMessage(_0x4330a6, {
                    'text': _0x3d6430,
                    'mentions': [_0x5d71d6]
                  }, {
                    'quoted': _0x2188be
                  });
                  await _0x12aaab.groupParticipantsUpdate(_0x4330a6, [_0x5d71d6], "remove");
                  await _0x12aaab.sendMessage(_0x4330a6, {
                    'delete': _0x1132a5
                  });
                } else {
                  var _0x410247 = _0x52343d - _0x247d0f;
                  var _0x543493 = "bot detected , your warn_count was upgrade ;\n rest : " + _0x410247 + " ";
                  await _0x1489b2(_0x5d71d6);
                  await _0x12aaab.sendMessage(_0x4330a6, {
                    'text': _0x543493,
                    'mentions': [_0x5d71d6]
                  }, {
                    'quoted': _0x2188be
                  });
                  await _0x12aaab.sendMessage(_0x4330a6, {
                    'delete': _0x1132a5
                  });
                }
              }
            }
          }
        }
      } catch (_0x480e0f) {
        console.log(".... " + _0x480e0f);
      }
      if (_0x52b3a3) {
        const _0x1c6dac = evt.cm.find(_0x41df05 => _0x41df05.nomCom === _0x57a26f);
        if (_0x1c6dac) {
          try {
            if (conf.MODE.toLocaleLowerCase() != "yes" && !_0x399982) {
              return;
            }
            if (!_0x399982 && _0x4330a6 === _0x5d71d6 && conf.PM_PERMIT === "yes") {
              _0xa82acb("You don't have acces to commands here");
              return;
            }
            if (!_0x399982 && _0x393341) {
              let _0x355684 = await isGroupBanned(_0x4330a6);
              if (_0x355684) {
                return;
              }
            }
            if (!_0x6a7d7c && _0x393341) {
              let _0x56f6b5 = await isGroupOnlyAdmin(_0x4330a6);
              if (_0x56f6b5) {
                return;
              }
            }
            if (!_0x399982) {
              let _0x4a5280 = await isUserBanned(_0x5d71d6);
              if (_0x4a5280) {
                _0xa82acb("You are banned from bot commands");
                return;
              }
            }
            reagir(_0x4330a6, _0x12aaab, _0x2188be, _0x1c6dac.reaction);
            _0x1c6dac.fonction(_0x4330a6, _0x12aaab, _0x22553f);
          } catch (_0x5d1f93) {
            console.log("😡😡 " + _0x5d1f93);
            _0x12aaab.sendMessage(_0x4330a6, {
              'text': "😡😡 " + _0x5d1f93
            }, {
              'quoted': _0x2188be
            });
          }
        }
      }
    });
    const {
      recupevents: _0xe6ce43
    } = require("./data/welcome");
    _0x12aaab.ev.on("group-participants.update", async _0xe8eda2 => {
      console.log(_0xe8eda2);
      let _0x62d17;
      try {
        _0x62d17 = await _0x12aaab.profilePictureUrl(_0xe8eda2.id, "image");
      } catch {
        _0x62d17 = "https://files.catbox.moe/7irwqn.jpeg";
      }
      try {
        const _0x1de22d = await _0x12aaab.groupMetadata(_0xe8eda2.id);
        if (_0xe8eda2.action == "add" && (await _0xe6ce43(_0xe8eda2.id, "welcome")) == 'on') {
          let _0x5ca96e = "👋 Hello\n";
          let _0xd2bd54 = _0xe8eda2.participants;
          for (let _0x43fbf4 of _0xd2bd54) {
            _0x5ca96e += " *@" + _0x43fbf4.split('@')[0] + "* Welcome to Our Official Group,";
          }
          _0x5ca96e += "You might want to read the group Description to avoid getting removed...";
          _0x12aaab.sendMessage(_0xe8eda2.id, {
            'image': {
              'url': _0x62d17
            },
            'caption': _0x5ca96e,
            'mentions': _0xd2bd54
          });
        } else {
          if (_0xe8eda2.action == "remove" && (await _0xe6ce43(_0xe8eda2.id, "goodbye")) == 'on') {
            let _0x14e9ad = "one or somes member(s) left group;\n";
            let _0x262275 = _0xe8eda2.participants;
            for (let _0x3f7f57 of _0x262275) {
              _0x14e9ad += '@' + _0x3f7f57.split('@')[0] + "\n";
            }
            _0x12aaab.sendMessage(_0xe8eda2.id, {
              'text': _0x14e9ad,
              'mentions': _0x262275
            });
          } else {
            if (_0xe8eda2.action == "promote" && (await _0xe6ce43(_0xe8eda2.id, "antipromote")) == 'on') {
              if (_0xe8eda2.author == _0x1de22d.owner || _0xe8eda2.author == conf.NUMERO_OWNER + "@s.whatsapp.net" || _0xe8eda2.author == decodeJid(_0x12aaab.user.id) || _0xe8eda2.author == _0xe8eda2.participants[0]) {
                console.log("Cas de superUser je fais rien");
                return;
              }
              ;
              await _0x12aaab.groupParticipantsUpdate(_0xe8eda2.id, [_0xe8eda2.author, _0xe8eda2.participants[0]], "demote");
              _0x12aaab.sendMessage(_0xe8eda2.id, {
                'text': '@' + _0xe8eda2.author.split('@')[0] + " has violated the anti-promotion rule, therefore both " + _0xe8eda2.author.split('@')[0] + " and @" + _0xe8eda2.participants[0].split('@')[0] + " have been removed from administrative rights.",
                'mentions': [_0xe8eda2.author, _0xe8eda2.participants[0]]
              });
            } else {
              if (_0xe8eda2.action == "demote" && (await _0xe6ce43(_0xe8eda2.id, "antidemote")) == 'on') {
                if (_0xe8eda2.author == _0x1de22d.owner || _0xe8eda2.author == conf.NUMERO_OWNER + "@s.whatsapp.net" || _0xe8eda2.author == decodeJid(_0x12aaab.user.id) || _0xe8eda2.author == _0xe8eda2.participants[0]) {
                  console.log("Cas de superUser je fais rien");
                  return;
                }
                ;
                await _0x12aaab.groupParticipantsUpdate(_0xe8eda2.id, [_0xe8eda2.author], "demote");
                await _0x12aaab.groupParticipantsUpdate(_0xe8eda2.id, [_0xe8eda2.participants[0]], "promote");
                _0x12aaab.sendMessage(_0xe8eda2.id, {
                  'text': '@' + _0xe8eda2.author.split('@')[0] + " has violated the anti-demotion rule by removing @" + _0xe8eda2.participants[0].split('@')[0] + ". Consequently, he has been stripped of administrative rights.",
                  'mentions': [_0xe8eda2.author, _0xe8eda2.participants[0]]
                });
              }
            }
          }
        }
      } catch (_0x54807b) {
        console.error(_0x54807b);
      }
    });
    async function _0x415b94() {
      const _0x1a5e50 = require("node-cron");
      const {
        getCron: _0x134271
      } = require("./data/cron");
      let _0xa2f6a6 = await _0x134271();
      console.log(_0xa2f6a6);
      if (_0xa2f6a6.length > 0) {
        for (let _0x5206e8 = 0; _0x5206e8 < _0xa2f6a6.length; _0x5206e8++) {
          if (_0xa2f6a6[_0x5206e8].mute_at != null) {
            let _0x534814 = _0xa2f6a6[_0x5206e8].mute_at.split(':');
            console.log("etablissement d'un automute pour " + _0xa2f6a6[_0x5206e8].group_id + " a " + _0x534814[0] + " H " + _0x534814[1]);
            _0x1a5e50.schedule(_0x534814[1] + " " + _0x534814[0] + " * * *", async () => {
              await _0x12aaab.groupSettingUpdate(_0xa2f6a6[_0x5206e8].group_id, "announcement");
              _0x12aaab.sendMessage(_0xa2f6a6[_0x5206e8].group_id, {
                'image': {
                  'url': "./media/chrono.webp"
                },
                'caption': "Hello, it's time to close the group; sayonara."
              });
            }, {
              'timezone': "Africa/Nairobi"
            });
          }
          if (_0xa2f6a6[_0x5206e8].unmute_at != null) {
            let _0x577615 = _0xa2f6a6[_0x5206e8].unmute_at.split(':');
            console.log("etablissement d'un autounmute pour " + _0x577615[0] + " H " + _0x577615[1] + " ");
            _0x1a5e50.schedule(_0x577615[1] + " " + _0x577615[0] + " * * *", async () => {
              await _0x12aaab.groupSettingUpdate(_0xa2f6a6[_0x5206e8].group_id, "not_announcement");
              _0x12aaab.sendMessage(_0xa2f6a6[_0x5206e8].group_id, {
                'image': {
                  'url': "./media/chrono.webp"
                },
                'caption': "Good morning; It's time to open the group."
              });
            }, {
              'timezone': "Africa/Nairobi"
            });
          }
        }
      } else {
        console.log("Les crons n'ont pas été activés");
      }
      return;
    }
    _0x12aaab.ev.on("contacts.upsert", async _0x149167 => {
      const _0x504ea7 = _0x43aa38 => {
        for (const _0x5934d0 of _0x43aa38) {
          if (store.contacts[_0x5934d0.id]) {
            Object.assign(store.contacts[_0x5934d0.id], _0x5934d0);
          } else {
            store.contacts[_0x5934d0.id] = _0x5934d0;
          }
        }
        return;
      };
      _0x504ea7(_0x149167);
    });
    _0x12aaab.ev.on("connection.update", async _0x1a7fd8 => {
      const {
        lastDisconnect: _0xe696f1,
        connection: _0x509191
      } = _0x1a7fd8;
      if (_0x509191 === "connecting") {
        console.log("ℹ️ Timnasa is connecting...");
      } else {
        if (_0x509191 === "open") {
          await _0x12aaab.groupAcceptInvite("GmKhyg4DonRCMvFVkAHPSL");
          await _0x12aaab.newsletterFollow("120363332512801418@newsletter");
          await _0x12aaab.groupAcceptInvite("JazGLNBxW5XDVEst3PN4kj");
          console.log("🔮 Lucky Xforce Connected to your WhatsApp! 🫧");
          console.log('--');
          0;
          await baileys_1.delay(200);
          console.log("------");
          0;
          await baileys_1.delay(300);
          console.log("------------------/-----");
          console.log("Timnasa Tmd is Online 🕸\n\n");
          console.log("Searching Timnasa Commands...\n");
          fs.readdirSync(__dirname + "/fez").forEach(_0x1143de => {
            if (path.extname(_0x1143de).toLowerCase() == ".js") {
              try {
                require(__dirname + "/fez/" + _0x1143de);
                console.log(_0x1143de + " Installed Successfully✔️");
              } catch (_0x4c85a4) {
                console.log(_0x1143de + " could not be installed due to : " + _0x4c85a4);
              }
              0;
              baileys_1.delay(300);
            }
          });
          0;
          baileys_1.delay(700);
          var _0x182e0e;
          if (conf.MODE.toLocaleLowerCase() === "yes") {
            _0x182e0e = "public";
          } else if (conf.MODE.toLocaleLowerCase() === 'no') {
            _0x182e0e = "private";
          } else {
            _0x182e0e = "undefined";
          }
          console.log("Commands Installation Completed ✅");
          await _0x415b94();
          if (conf.DP.toLowerCase() === "yes") {
            let _0x2d9fbd = " ⁠⁠⁠⁠\n\n   _BOT🦚CONNECTED_\n\n║ Prefix: [ " + prefixe + " ]\n║ Mode: " + _0x182e0e + "\n║ Model: Timnasa_Md\n║ Bot Name: Timnasa-Md-Bot \n║ Owner: " + conf.OWNER_NAME + " \n╚═════ ❖ •✦\n-_-<-<-<-<-<-<-<--<-<-<-<-<-<\n\n*🪀Follow my channel for updates and free hacks🙃*\n \n> " + conf.CHANNEL + "\n\n-_-_-<€<€-<-<-<-<-<-<-<-<-<-<-<\n                \n                 ";
            await _0x12aaab.sendMessage(_0x12aaab.user.id, {
              'text': _0x2d9fbd
            });
          }
        } else {
          if (_0x509191 == "close") {
            let _0x221d01 = new boom_1.Boom(_0xe696f1?.["error"])?.["output"]["statusCode"];
            if (_0x221d01 === baileys_1.DisconnectReason.badSession) {
              console.log("Session id error, rescan again...");
            } else {
              if (_0x221d01 === baileys_1.DisconnectReason.connectionClosed) {
                console.log("!!! connexion fermée, reconnexion en cours ...");
                _0x305a93();
              } else {
                if (_0x221d01 === baileys_1.DisconnectReason.connectionLost) {
                  console.log("connection error 😞 ,,, trying to reconnect... ");
                  _0x305a93();
                } else {
                  if (_0x221d01 === baileys_1.DisconnectReason?.["connectionReplaced"]) {
                    console.log("connexion réplacée ,,, une sesssion est déjà ouverte veuillez la fermer svp !!!");
                  } else {
                    if (_0x221d01 === baileys_1.DisconnectReason.loggedOut) {
                      console.log("vous êtes déconnecté,,, veuillez rescanner le code qr svp");
                    } else {
                      if (_0x221d01 === baileys_1.DisconnectReason.restartRequired) {
                        console.log("redémarrage en cours ▶️");
                        _0x305a93();
                      } else {
                        console.log("redemarrage sur le coup de l'erreur  ", _0x221d01);
                        const {
                          exec: _0x344c1f
                        } = require("child_process");
                        _0x344c1f("pm2 restart all");
                      }
                    }
                  }
                }
              }
            }
            console.log("hum " + _0x509191);
            _0x305a93();
          }
        }
      }
    });
    _0x12aaab.ev.on("creds.update", _0x37ba00);
    _0x12aaab.downloadAndSaveMediaMessage = async (_0x1a031b, _0x1af9cc = '', _0x383b7c = true) => {
      let _0x1fa235 = _0x1a031b.msg ? _0x1a031b.msg : _0x1a031b;
      let _0x45617a = (_0x1a031b.msg || _0x1a031b).mimetype || '';
      let _0x2a5ced = _0x1a031b.mtype ? _0x1a031b.mtype.replace(/Message/gi, '') : _0x45617a.split('/')[0];
      0;
      const _0x3f3670 = await baileys_1.downloadContentFromMessage(_0x1fa235, _0x2a5ced);
      let _0x3e2aaa = Buffer.from([]);
      for await (const _0x5500f2 of _0x3f3670) {
        _0x3e2aaa = Buffer.concat([_0x3e2aaa, _0x5500f2]);
      }
      let _0x28c1be = await FileType.fromBuffer(_0x3e2aaa);
      let _0x3ecb41 = './' + _0x1af9cc + '.' + _0x28c1be.ext;
      await fs.writeFileSync(_0x3ecb41, _0x3e2aaa);
      return _0x3ecb41;
    };
    _0x12aaab.awaitForMessage = async (_0x5be032 = {}) => {
      return new Promise((_0x30ec6b, _0x369cc6) => {
        if (typeof _0x5be032 !== "object") {
          _0x369cc6(new Error("Options must be an object"));
        }
        if (typeof _0x5be032.sender !== "string") {
          _0x369cc6(new Error("Sender must be a string"));
        }
        if (typeof _0x5be032.chatJid !== "string") {
          _0x369cc6(new Error("ChatJid must be a string"));
        }
        if (_0x5be032.timeout && typeof _0x5be032.timeout !== "number") {
          _0x369cc6(new Error("Timeout must be a number"));
        }
        if (_0x5be032.filter && typeof _0x5be032.filter !== "function") {
          _0x369cc6(new Error("Filter must be a function"));
        }
        const _0x1f6259 = _0x5be032?.["timeout"] || undefined;
        const _0x1ffd6b = _0x5be032?.["filter"] || (() => true);
        let _0x1e4b75 = undefined;
        let _0xfdb628 = _0x100654 => {
          let {
            type: _0x43904b,
            messages: _0x575362
          } = _0x100654;
          if (_0x43904b == "notify") {
            for (let _0x2623dc of _0x575362) {
              const _0x8aeec7 = _0x2623dc.key.fromMe;
              const _0x526dfd = _0x2623dc.key.remoteJid;
              const _0x211a0c = _0x526dfd.endsWith("@g.us");
              const _0x327215 = _0x526dfd == "status@broadcast";
              const _0x5c1a6b = _0x8aeec7 ? _0x12aaab.user.id.replace(/:.*@/g, '@') : _0x211a0c || _0x327215 ? _0x2623dc.key.participant.replace(/:.*@/g, '@') : _0x526dfd;
              if (_0x5c1a6b == _0x5be032.sender && _0x526dfd == _0x5be032.chatJid && _0x1ffd6b(_0x2623dc)) {
                _0x12aaab.ev.off("messages.upsert", _0xfdb628);
                clearTimeout(_0x1e4b75);
                _0x30ec6b(_0x2623dc);
              }
            }
          }
        };
        _0x12aaab.ev.on("messages.upsert", _0xfdb628);
        if (_0x1f6259) {
          _0x1e4b75 = setTimeout(() => {
            _0x12aaab.ev.off("messages.upsert", _0xfdb628);
            _0x369cc6(new Error("Timeout"));
          }, _0x1f6259);
        }
      });
    };
    return _0x12aaab;
  }
  let _0x10a4fd = require.resolve(__filename);
  fs.watchFile(_0x10a4fd, () => {
    fs.unwatchFile(_0x10a4fd);
    console.log("mise à jour " + __filename);
    delete require.cache[_0x10a4fd];
    require(_0x10a4fd);
  });
  _0x305a93();
}, 5000);
