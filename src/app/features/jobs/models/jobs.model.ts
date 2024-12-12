export interface Feed {
    version: string;
    title: string;
    home_page_url: string;
    feed_url: string;
    description: string;
    next_url: string;
    id: string;
    next_id: string;
    items: FeedItem[];
}

export interface FeedItem {
    id: string;
    url: string;
    title: string;
    content_text: string;
    date_modified: string;
    _feed_entry: FeedEntry;
}

export interface FeedEntry {
    uuid: string;
    status: string;
    title: string;
    businessName: string;
    municipal: string;
    sistEndret: string;
}