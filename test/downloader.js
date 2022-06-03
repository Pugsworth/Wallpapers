import { Downloader } from "../downloader.js";
import { expect } from "chai";
import { existsSync, unlink } from "node:fs";


let url = "https://w.wallhaven.cc/full/9m/wallhaven-9mpv81.png";

// TODO: Provide a mock for the fetch function...
describe("Downloader", () => {
    describe("Get filename from url", () => {
        it("Should return 'wallhaven-9mpv81.png'", async () => {
            let dler = new Downloader();
            let filename = await dler.getFilenameFromUrl(url);
            expect(filename).to.equal("wallhaven-9mpv81.png");
        });

        it("Should return 'wallhaven-9mpv81.png' even with query parameters", async () => {
            let dler = new Downloader();
            let filename = await dler.getFilenameFromUrl(url + "?test=test");
            expect(filename).to.equal("wallhaven-9mpv81.png");
        });
    });

    describe("Download the file", () => {
        it("File should not already exist", () => {
            let bFileExists = existsSync("test/wallhaven-9mpv81.png")
            expect(bFileExists).to.be.false;

            // Clean up the file
            if (bFileExists) {
                unlink("test/wallhaven-9mpv81.png");
            }
        });

        it("Should download the file and save it with download(url, directory)", async () => {
            let dler = new Downloader();
            await dler.download(url, "./test/");

            expect(existsSync("./test/wallhaven-9mpv81.png")).to.be.true;
        });

        it("Should download the file and save it with setDirectory(directory) and download(url)", async () => {
            let dler = new Downloader();
            dler.setDirectory("./test/");
            await dler.download(url);

            expect(existsSync("./test/wallhaven-9mpv81.png")).to.be.true;

            // Clean up
            unlink("./test/wallhaven-9mpv81.png", (err) => {
                expect(err).to.be.null;
            });
        });
    });
});



/*
    - Should be able to download a file from a url
    - Should be able to properly fetch the url from the server
        - If not available, create one (how?)
*/