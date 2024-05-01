

import { reactive } from 'vue'

interface Artist {
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
}

interface Image {
    height: number;
    url: string;
    width: number;
}

interface Album {
    album_type: string;
    artists: Artist[];
    available_markets: string[];
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    images: Image[];
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
}

interface ExternalIds {
    isrc: string;
}

interface Track {
    album: Album;
    artists: Artist[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: ExternalIds;
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    is_local: boolean;
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
}

interface SearchResult {
    tracks: {
        href: string;
        items: Track[];
        limit: number;
        next: string | null;
        offset: number;
        previous: string | null;
        total: number;
    };
}


export const searchTerm = reactive({


    uri: null as string | null,
})
export async function fetchSerch(token: string, query: string): Promise<{ searchResult: SearchResult }> {
    // TODO: Call Web API
    try {
        // Encode the query to ensure special characters are properly formatted
        const encodedQuery = encodeURIComponent(query);

        const url = `https://api.spotify.com/v1/search?q=${encodedQuery}&type=${'track'}&limit=${1}`;

        // Make the request to Spotify API
        const result = await fetch(url, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        });

        // Check if the response is successful
        if (!result.ok) {
            throw new Error(`HTTP error! Status: ${result.status}`);
        }

        // Parse and return the JSON response

        const searchResult_ = await result.json();

        const trackUri = searchResult_.tracks.items[0].uri

        const trackUri_ = trackUri.split(':')[2]; // Extract the TRACK_ID
        searchTerm.uri = trackUri_


        // console.log("body",searchTerm.uri)
        return { searchResult: searchResult_ }
    } catch (error) {
        console.error("Error fetching search results:", error);
        throw error; // Rethrow the error to handle it in the calling function
    }
}

export async function play(token: string, uri: string): Promise<void> {
    try {


        const url = `https://api.spotify.com/v1/me/player/play`;

        
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                 Authorization: `Bearer ${token}` ,
                 'Content-Type': 'application/json'
                
                },
                body:JSON.stringify({uris:[uri]})
        });

        if(!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);

        }

        console.log("Player started");

    } catch (error) {
        console.error("Error playing track", error)
        throw error
    }
}