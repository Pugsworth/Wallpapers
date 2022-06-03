import { JsonDB } from 'node-json-db';
import { Config } from "node-json-db/dist/lib/JsonDBConfig.js";

export class Database
{
    _db = null;

    // @purpose: Opens the database from a path
    // @param path: {string}
    // @returns {boolean} - true if the database was opened successfully
    async open(path)
    {
        return new Promise((resolve, reject) => {
            try {
                let cfg = new Config(path, false, true, '/');
                this._db = new JsonDB(cfg);
                resolve(true);
            } catch (e) {
                reject(e);
            }
        });
    }

    // @purpose: Saves the database
    // @returns None
    save()
    {
        this._db.save();
    }

    // @purpose: close the database. Alias for save() (some databases may not need to be closed)
    // @returns None
    close()
    {
        this.save();
    }

    // @purpose: Get a value from the database
    // @returns {DatabaseEntry}
    async get(key)
    {
        return new Promise((resolve, reject) => {
            try {
                let value = this._db.getData(key);
                resolve(value);
            } catch (e) {
                reject(e);
            }
        });
    }

    // @purpose: Set a value in the database to the key
    // @param key: {string}
    // @param value: {any|DatabaseEntry}
    // @returns None
    set(key, value)
    {
        this._db.push(key, value);
    }

    // @purpose: Remove a value from the database
    // @param key: {string}
    // @returns None
    delete(key)
    {
        this._db.delete(key);
    }
}


/*
    Usage Example:


    let db = new Database();
    db.open("file.json").catch(console.error);

    // lists: DatabaseEntry[]
    let lists = await db.get("wallpaper_lists");

    for (let list of lists.iter())
    {
        // provider: string
        let provider = await list.get("provider");
        // 
        let urls = await list.get("urls");

        let downloader = new Downloader(provider);
        downloader.downloadAll(urls);
    }

*/