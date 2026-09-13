const cheerio = require('cheerio');
const { zokou } = require("../framework/zokou");
const JavaScriptObfuscator = require("javascript-obfuscator");
const { c, cpp, node, python, java } = require('compile-run');
const { dBinary, eBinary } = require("../framework/binary");
const { default: axios } = require("axios");
const { writeFile } = require("fs/promises");
const { mediafireDl } = require("../framework/dl/Function");


// command for run cc++
zokou({
  nomCom: "run-c++",
  aliases: ["c++", "runc++"],
  categorie: "script"
}, async (dest, zk, commandeOptions) => {
  const { arg: commandArguments, repondre: reply } = commandeOptions;
  try {
    if (!commandArguments) {
      return reply("Quote a valid and short C++ code to compile.");
    }
    let code = commandArguments.join(" ");
    let result = await cpp.runSource(code);
    if (result.error) {
      reply(`Error: ${result.error}`);
    } else {
      reply(`Output:\n${result.stdout}`);
      if (result.stderr) {
        reply(`Error Output:\n${result.stderr}`);
      }
    }
  } catch (err) {
    console.error(err);
    reply("An error occurred while trying to run the code.");
  }
});

// command for run c
zokou({
  nomCom: "run-c",
  aliases: ["runcc", "runc"],
  categorie: "script"
}, async (dest, zk, commandeOptions) => {
  const { arg: commandArguments, repondre: reply } = commandeOptions;
  try {
    if (!commandArguments) {
      return reply("Quote a valid and short C code to compile.");
    }
    let code = commandArguments.join(" ");
    let result = await c.runSource(code);
    if (result.error) {
      reply(`Error: ${result.error}`);
    } else {
      reply(`Output:\n${result.stdout}`);
      if (result.stderr) {
        reply(`Error Output:\n${result.stderr}`);
      }
    }
  } catch (err) {
    console.error(err);
    reply("An error occurred while trying to run the code.");
  }
});

// command for run java
zokou({
  nomCom: "run-java",
  aliases: ["java", "runjava"],
  categorie: "script"
}, async (dest, zk, commandeOptions) => {
  const { arg: commandArguments, repondre: reply } = commandeOptions;
  try {
    if (!commandArguments) {
      return reply("Quote a valid and short java code to compile.");
    }
    let code = commandArguments.join(" ");
    let result = await java.runSource(code);
    if (result.error) {
      reply(`Error: ${result.error}`);
    } else {
      reply(`Output:\n${result.stdout}`);
      if (result.stderr) {
        reply(`Error Output:\n${result.stderr}`);
      }
    }
  } catch (err) {
    console.error(err);
    reply("An error occurred while trying to run the code.");
  }
});

// command for run js
zokou({
  nomCom: "run-js",
  aliases: ["node", "javascript"],
  categorie: "script"
}, async (dest, zk, commandeOptions) => {
  const { arg: commandArguments, repondre: reply } = commandeOptions;
  try {
    if (!commandArguments) {
      return reply("Quote a valid and short javascript code to compile.");
    }
    let code = commandArguments.join(" ");
    let result = await node.runSource(code);
    if (result.error) {
      reply(`Error: ${result.error}`);
    } else {
      reply(`Output:\n${result.stdout}`);
      if (result.stderr) {
        reply(`Error Output:\n${result.stderr}`);
      }
    }
  } catch (err) {
    console.error(err);
    reply("An error occurred while trying to run the code.");
  }
});

// command for run python
zokou({
  nomCom: "run-py",
  aliases: ["python", "runpy"],
  categorie: "script"
}, async (dest, zk, commandeOptions) => {
  const { arg: commandArguments, repondre: reply } = commandeOptions;
  try {
    if (!commandArguments) {
      return reply("Quote a valid and short python code to compile.");
    }
    let code = commandArguments.join(" ");
    let result = await python.runSource(code);
    if (result.error) {
      reply(`Error: ${result.error}`);
    } else {
      reply(`Output:\n${result.stdout}`);
      if (result.stderr) {
        reply(`Error Output:\n${result.stderr}`);
      }
    }
  } catch (err) {
    console.error(err);
    reply("An error occurred while trying to run the code.");
  }
});

// command for debinary
zokou({
  nomCom: "debinary",
  aliases: ["decode", "decodebinary"],
  categorie: "script"
}, async (dest, zk, commandeOptions) => {
  const { arg: args, repondre } = commandeOptions;
  const text = args.join(" ").trim();

  if (!text) {
    return repondre('Please provide a text to decode.');
  }
  const basePath = text.split(/^[\\/!#.]/) || '/';
  const isPathStartsWithCondition = text.slice(basePath.length).trim().split(' ')?.toLowerCase();
  const possibleKeys = ['Please pro', 'decode text to video'];

  if (possibleKeys.includes(isPathStartsWithCondition)) {
    const decodedKey = text.slice(basePath.length + isPathStartsWithCondition.length).trim();
    if (!decodedKey) {
      return repondre('Invalid decoding request.');
    }
    try {
      const decodedData = await dBinary(decodedKey);
      repondre(decodedData);
    } catch (error) {
      repondre('An error occurred while decoding the data.');
    }
  } else {
    repondre('Invalid decoding request.');
  }
});

// command for ebinary
zokou({
  nomCom: "ebinary",
  aliases: ["encode", "encodebinary"],
  categorie: "script"
}, async (dest, zk, commandeOptions) => {
  const { arg: args, repondre } = commandeOptions;
  const text = args.join(" ").trim();

  if (!text) {
    repondre('Please provide a text to encode.');
    return;
  }

  try {
    let encodedResult = await eBinary(text);
    repondre(encodedResult);
  } catch (error) {
    repondre('Error encoding the text to binary.');
  }
});

// command for obfuscate 
zokou({
  nomCom: "obfuscate",
  aliases: ["obfuscate", "obfu"],
  categorie: "script"
}, async (dest, zk, commandeOptions) => {
  const { arg: commandArguments, repondre: reply } = commandeOptions;
  try {
    let codeToObfuscate = commandArguments.join(" ");

    if (!commandArguments) {
      reply("After the command, provide a valid JavaScript code for encryption.");
      return;
    }

    const obfuscatedCode = JavaScriptObfuscator.obfuscate(codeToObfuscate, {
      compact: true,
      controlFlowFlattening: true,
      controlFlowFlatteningThreshold: 0.1,
      numbersToExpressions: true,
      simplify: true,
      stringArrayShuffle: true,
      splitStrings: true,
      stringArrayThreshold: 0.1
    });

    await reply(obfuscatedCode.getObfuscatedCode());
  } catch (error) {
    reply("Something went wrong. Please check if your code is logical and has the correct syntax.");
  }
});

// command for run-carbon
zokou({
  nomCom: "carbon",
  aliases: ["C", "run-carbon"],
  categorie: "script"
}, async (dest, zk, commandeOptions) => {
  const { ms, arg: args, repondre } = commandeOptions;

  try {
    if (!args || args.length === 0) {
      return repondre("Please provide a valid and short Carbon code to compile.");
    }

    let code = args.join(" ");

    try {
      const response = await axios.post('https://carbonara.solopov.dev/api/cook', {
        code: code,
        backgroundColor: '#1F816D',
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status !== 200) {
        return repondre('API failed to fetch a valid response.');
      }

      const imageBuffer = Buffer.from(response.data, 'base64');
      const caption = "> Thank for choosing ᴅᴜʟʟᴀʜ-xᴍᴅ";
      await zk.sendMessage(dest, { image: imageBuffer, caption: caption }, { quoted: ms });
    } catch (error) {
      return repondre("An error occurred while processing your request.\n" + error.message);
    }
  } catch (error) {
    return repondre('An unexpected error occurred: ' + error.message);
  }
});

// command for scrap
zokou({
  nomCom: "scrap",
  aliases: ["get", "find"],
  categorie: "script",
  reaction: '🛄',
}, async (dest, zk, commandeOptions) => {
  const { repondre: sendResponse, arg: args, ms } = commandeOptions;
  const urlInput = args.join(" ");

  if (!/^https?:\/\//.test(urlInput)) {
    return sendResponse("Start the *URL* with http:// or https://");
  }

  try {
    const url = new URL(urlInput);
    const fetchUrl = `${url.origin}${url.pathname}?${url.searchParams.toString()}`;
    const response = await fetch(fetchUrl);

    if (!response.ok) {
      return sendResponse(`Failed to fetch the URL. Status: ${response.status} ${response.statusText}`);
    }

    const contentLength = response.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > 104857600) {
      return sendResponse(`Content-Length exceeds the limit: ${contentLength}`);
    }

    const contentType = response.headers.get('content-type');

    const buffer = Buffer.from(await response.arrayBuffer());

    if (/image\/.*/.test(contentType)) {
      await zk.sendMessage(dest, {
        image: { url: fetchUrl },
        caption: "> Thank you for choosing Timnasa Timothy bot"
      }, { quoted: ms });
    } else if (/video\/.*/.test(contentType)) {
      await zk.sendMessage(dest, {
        video: { url: fetchUrl },
        caption: "> *Thank for choosing Timnasa Timothy bot"
      }, { quoted: ms });
    } else if (/text|json/.test(contentType)) {
      try {
        const json = JSON.parse(buffer);
        sendResponse(JSON.stringify(json, null, 2).slice(0, 10000));
      } catch {
        sendResponse(buffer.toString().slice(0, 10000));
      }
    } else {
      await zk.sendMessage(dest, {
        document: { url: fetchUrl },
        caption: "> *Thank you for choosing Timnasa Timothy"
      }, { quoted: ms });
    }
  } catch (error) {
    sendResponse(`Error fetching data: ${error.message}`);
  }
});

// command for web scraper
zokou({
  nomCom: "web",
  aliases: ["inspectweb", "webinspect", "webscrap"],
  categorie: "script",
  reaction: "🌐"
}, async (dest, zk, commandeOptions) => {
  const { repondre, arg } = commandeOptions;

  if (!arg) {
    return repondre('Provide a valid web link to fetch!');
  }

  if (!arg.includes('https://')) {
    return repondre("That is not a valid link.");
  }

  try {
    const response = await axios.get(arg);
    const html = response.data;
    const $ = cheerio.load(html);

    const mediaFiles = [];
    $('img[src], video[src], audio[src]').each((i, element) => {
      let src = $(element).attr('src');
      if (src) mediaFiles.push(src);
    });

    const cssFiles = [];
    $('link[rel="stylesheet"]').each((i, element) => {
      let href = $(element).attr('href');
      if (href) cssFiles.push(href);
    });

    const jsFiles = [];
    $('script[src]').each((i, element) => {
      let src = $(element).attr('src');
      if (src) jsFiles.push(src);
    });

    await repondre(`**Full HTML Content**:\n\n${html}`);

    if (cssFiles.length > 0) {
      for (const cssFile of cssFiles) {
        try {
          const cssResponse = await axios.get(new URL(cssFile, arg));
          await repondre(`**CSS File Content**:\n\n${cssResponse.data}`);
        } catch { continue; }
      }
    }

    if (jsFiles.length > 0) {
      for (const jsFile of jsFiles) {
        try {
          const jsResponse = await axios.get(new URL(jsFile, arg));
          await repondre(`**JavaScript File Content**:\n\n${jsResponse.data}`);
        } catch { continue; }
      }
    }

    if (mediaFiles.length > 0) {
      await repondre(`**Media Files Found**:\n${mediaFiles.join('\n')}`);
    }

  } catch (error) {
    return repondre(`An error occurred: ${error.message}`);
  }
});
