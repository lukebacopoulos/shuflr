
// timeframe can be:
//     short_term (4 weeks)
//     medium_term (6 months) default
//     long_term (1 year)

// item can be either "artists" or "tracks".

export default async function getTopItems(token: string, item: string, timeframe: string) {
    const response = await fetch(`https://api.spotify.com/v1/me/top/${item}?time_range=${timeframe}?limit=50&offset=0`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
    )
    const data = await response.json();
    return data

}