import path from "node:path";
import fs from "node:fs";
import Downloader from "./downloader.js";
import { program } from "commander";
import process from "node:process";


/**
 * Providers
 */

let providerRegistry = {};
const providerDir = path.join(path.dirname("."), "providers");


function registerProvider(providerObj)
{
    let name = providerObj.name.toLowerCase();
    // console.log(`Registering provider: ${name}`);
    providerRegistry[name] = providerObj;
}


// Get list of modules and imports into a registry
async function importProviders()
{
    // list files in ./providers/
    let files = fs.readdirSync(providerDir);
    // console.log(`Found ${files.length} providers`);
    // console.log(files);

    for (let file of files) {
        // Ensure only .mjs files are imported
        if (!file.endsWith(".mjs")) {
            continue;
        }

        // Remove .mjs extension
        let name = file.substring(0, file.length - 4);

        let importPath = "./" + path.join(providerDir, file);
        // console.log(`Importing ${importPath}`);

        // dynamic import each provider
        let provider = await import(importPath)

        // register each provider
        registerProvider(provider);
    }
}




/**
 * Main
 */
async function main()
{
    await importProviders();

    // load wallpapers.json
    const wpDir = path.join(path.dirname("."), "data", "wallpapers.json");
    let wallpaperData = JSON.parse( fs.readFileSync(wpDir) );
    let wallpaperList = wallpaperData.wallpaper_lists;

    for (let i = 0; i < wallpaperList.length; i++) {
        let data = wallpaperList[i];
        let provider = data.provider;

        console.log(`Found provider: ${provider}`);
        console.log(`This list has ${data.urls.length} wallpapers`);
    }

    let provider = "wallhaven";
    let wpURL = wallpaperList[0].urls[0];

    let metadata = await providerRegistry[provider].getMetadata(wpURL);
    let thumbnail = await providerRegistry[provider].getThumbnailURL(wpURL);
    let wallpaper = await providerRegistry[provider].getWallpaperURL(wpURL);

    console.log(`Metadata: ${JSON.stringify(metadata)}`);
    console.log(`Thumbnail: ${thumbnail}`);

    let dler = new Downloader();
    let filename = await dler.getFilenameFromUrl(wallpaper);
    console.log(`Filename: ${filename}`);
    await dler.download(wallpaper, path.join(path.dirname("."), "data", "wallpapers"));
}

/**
 * CLI
 */

program
    .name("wallpaper-downloader")
    .description("Manage and download wallpapers from various providers")
    .version("0.0.0")

program.command("download")
    .description("download one or multiple wallpapers")
    .argument("<provider>", "'all' or provider name")
    .action(async (name, options, command) => {
        console.log(name);

        if (name.toLowerCase() === "all") {
            // download all wallpapers
            console.log("Downloading all wallpapers");
        }

        // throw new Error("Not implemented");
    });

program.command("list")
    .description("list all available providers")
    .action(async () => {
        await importProviders();

        // load wallpapers.json
        const wpDir = path.join(path.dirname("."), "data", "wallpapers.json");
        let wallpaperData = JSON.parse( fs.readFileSync(wpDir) );
        let wallpaperList = wallpaperData.wallpaper_lists;

        // console.dir(wallpaperList)

        // List out all providers
        for (let key in providerRegistry) {
            let provider = providerRegistry[key];

            // Find the provider in the wallpaper list
            let providerData = wallpaperList.find((data) => {
                return data.provider.toLowerCase() == provider.name.toLowerCase();
            });

            let count = 0;

            if (providerData) {
                count = providerData.urls.length;
            }

            console.log(`${provider.name} - ${count}`);
        }
    });

program.parse(process.argv);

// main();