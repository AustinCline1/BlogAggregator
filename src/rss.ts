import {XMLParser} from "fast-xml-parser";

type RSSFeed = {
    channel: {
        title: string;
        link: string;
        description: string;
        item: RSSItem[];
    };
};

type RSSItem = {
    title: string;
    link: string;
    description: string;
    pubDate: string;
};

export async function fetchFeed(feedURL: string): Promise<RSSFeed | null> {
    try {
        const data = await fetch(feedURL, {
            method: "GET",
            headers: {
                "User-Agent": "gator"
            }
        });
        if(!data.ok) {
            throw new Error(`Failed to fetch feed ${data.status}`);
        }
            const response = await data.text();
            const parser = new XMLParser();
            const parsedData = parser.parse(response);

            if (parsedData.rss.channel === undefined) {
                throw new Error("No channel in RSS feed");
            }
            if (parsedData.rss.channel.title === undefined || parsedData.rss.channel.link === undefined || parsedData.rss.channel.description === undefined) {
                throw new Error("Failed to parse channels");
            }

            const title = parsedData.rss.channel.title;
            const link = parsedData.rss.channel.link;
            const description = parsedData.rss.channel.description;
            const items: any[] = Array.isArray(parsedData.rss.channel.item) ? parsedData.rss.channel.item : [parsedData.rss.channel.item];

            const rssItems: RSSItem[] = [];
            for (const item of items) {
                if (!item.title || !item.link || !item.description || !item.pubDate) {
                    continue;
                }
                rssItems.push({
                    title: item.title,
                    link: item.link,
                    description: item.description,
                    pubDate: item.pubDate
                });
            }
            return {
                channel: {
                    title: title,
                    link: link,
                    description: description,
                    item: rssItems,
                }
            }
    }catch (e) {
        console.error(e);
        return null;
    }
}
