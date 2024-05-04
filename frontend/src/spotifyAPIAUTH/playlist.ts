


interface Playlist {
    href: string;
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
    items: PlaylistItem[];
}

interface PlaylistItem {
    collaborative: boolean;
    description: string;
    external_urls: { spotify: string };
    href: string;
    id: string;
    images: Image[];
    name: string;
    owner: PlaylistOwner;
    primary_color: string | null;
    public: boolean;
    snapshot_id: string;
    tracks: { href: string; total: number };
    type: string;
    uri: string;
}

interface PlaylistOwner {
    display_name: string;
    external_urls: { spotify: string };
    href: string;
    id: string;
    type: string;
    uri: string;
}

interface Image {
    url: string;
    height: number | null;
    width: number | null;
}


export async function fetchUserPlaylist(token: string): Promise<{playlist:Playlist}> {

    // TODO: Call Web API
    try {
    const result = await fetch("https://api.spotify.com/v1/me/playlists", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    const userPlaylist = await result.json()
  
    const firstItemId = userPlaylist.items[0].id;
    console.log("ID of the first item in the playlist:", firstItemId);

    return {playlist:userPlaylist}
}
    catch(errormessage){
        console.error(errormessage)
        return { playlist: { href: "", limit: 0, next: null, offset: 0, previous: null, total: 0, items: [] } };
    }
}
