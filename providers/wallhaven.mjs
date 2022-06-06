import { URL } from "node:url";
import fetch from "node-fetch";
// const fetch = await import("node-fetch");

/* Wallhaven response example:
GET: https://wallhaven.cc/api/v1/w/{id}
{"data":{"id":"e7g7zk","url":"https:\/\/wallhaven.cc\/w\/e7g7zk","short_url":"https:\/\/whvn.cc\/e7g7zk","uploader":{"username":"\u81ea\u7531\u4f7f\u8005","group":"User","avatar":{"200px":"https:\/\/wallhaven.cc\/images\/user\/avatar\/200\/1038192_0bbb5d87474b.png","128px":"https:\/\/wallhaven.cc\/images\/user\/avatar\/128\/1038192_0bbb5d87474b.png","32px":"https:\/\/wallhaven.cc\/images\/user\/avatar\/32\/1038192_0bbb5d87474b.png","20px":"https:\/\/wallhaven.cc\/images\/user\/avatar\/20\/1038192_0bbb5d87474b.png"}},"views":3804,"favorites":69,"source":"","purity":"sfw","category":"general","dimension_x":5120,"dimension_y":2880,"resolution":"5120x2880","ratio":"1.78","file_size":237224,"file_type":"image\/jpeg","created_at":"2022-05-14 04:58:03","colors":["#333399","#999999","#e7d8b1","#cccccc","#ea4c88"],"path":"https:\/\/w.wallhaven.cc\/full\/e7\/wallhaven-e7g7zk.jpg","thumbs":{"large":"https:\/\/th.wallhaven.cc\/lg\/e7\/e7g7zk.jpg","original":"https:\/\/th.wallhaven.cc\/orig\/e7\/e7g7zk.jpg","small":"https:\/\/th.wallhaven.cc\/small\/e7\/e7g7zk.jpg"},"tags":[{"id":64208,"name":"sky blue","alias":"","category_id":36,"category":"Colors","purity":"sfw","created_at":"2017-07-25 22:13:31"},{"id":323,"name":"artwork","alias":"art, Art design, artworks","category_id":2,"category":"Art & Design","purity":"sfw","created_at":"2014-02-11 09:18:43"},{"id":190,"name":"clouds","alias":"cloud, cloudy","category_id":5,"category":"Nature","purity":"sfw","created_at":"2014-02-09 00:52:31"},{"id":740,"name":"Moon","alias":"moonrise, moons","category_id":45,"category":"Space","purity":"sfw","created_at":"2014-03-06 00:16:56"}]}}
*/

export const name = "Wallhaven";


// Need to fetch the id of an image
function getIdFromUrl(url)
{
    let _url = new URL(url);

    // get the id by the last part of the url
    let id = _url.pathname.split("/").pop();

    return id;
}

export function getPrefix(urlString)
{
    return this.name.toLowerCase();
}

export function getIdentifier(urlString)
{
    return urlString;
}

export async function getThumbnailURL(urlString)
{
    let metadata = await getMetadata(urlString);

    return metadata.data.thumbs.small;
}

export async function getWallpaperURL(urlString)
{
    let metadata = await getMetadata(urlString);

    return metadata.data.path;
}

export async function getMetadata(urlString)
{
    let id = getIdFromUrl(urlString);

    let response = await fetch(`https://wallhaven.cc/api/v1/w/${id}`);
    let data = await response.json();

    return data;
}
