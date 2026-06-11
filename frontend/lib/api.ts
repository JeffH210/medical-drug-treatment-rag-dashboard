const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function askModel(query: string) {
    const res = await fetch(`${API_URL}/ask`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ query })
    });

    const data = await res.json();
    return data;
}

export async function searchDrugs(query: string) {
    const res = await fetch(
        `${API_URL}/drug-search?q=${encodeURIComponent(query)}`
    );

    if(!res.ok) {
        throw new Error("Failed to fetch drug names")
    }

    return await res.json();
}