import {fetchFeed} from "../rss";

export async function handlerRSS(cmdName:string, ...args: string[]) {
    const feed = await fetchFeed("https://www.wagslane.dev/index.xml");
    if (!feed) {
        console.error("Failed to fetch feed");
        process.exit(1);
    }
    const feedData = JSON.stringify(feed,null,2);
    console.log(feedData);
}