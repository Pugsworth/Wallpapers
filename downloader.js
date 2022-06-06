// import path
import * as Path from "path";
import fetch from "node-fetch";
import { assert } from "console";
import { createWriteStream } from "fs";

export default class Downloader
{
    cwd = null;

    /**
     * Set the working directory. This is where the downloaded files will be saved for bulk downloading.
     * @param {string} directory 
     */
    setDirectory(directory)
    {
        this.cwd = directory;
    }

    /**
     * @param {string} url
     * @returns {Promise<string>}
     */
    async getFilenameFromUrl(url)
    {
        let filename = "";

        // make HEAD request to get information about the file
        let response = fetch(url, { method: "HEAD" }).then((response) => {
            // Find the filename from the response headers
            let disposition = response.headers.get("Content-Disposition");

            if (disposition)
            {
                let filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                let matches = filenameRegex.exec(disposition);
                if (matches != null && matches[1])
                {
                    let filename = matches[1].replace(/['"]/g, "");
                    return filename;
                }
            }
        });

        // Concurrently get the filename from the url and then wait for the response to finish
        filename = Path.basename(url.split("?")[0]);

        let reportedFilename = await response;

        if (reportedFilename) {
            filename = reportedFilename;
        }

        assert(filename != "", "Filename not found");

        return filename;
    }

    async download(url, directory)
    {
        if (directory === undefined) {
            directory = this.cwd;
        }

        // Get the filename from the url
        let filename = await this.getFilenameFromUrl(url);

        // Create a stream to write the file to
        let file = createWriteStream(Path.join(directory, filename));

        // Make a request to the url
        let response = await fetch(url);

        // Pipe the response to the file
        await response.body.pipe(file);
    }
}