export async function refreshAccessToken() {

    const refreshToken =
        localStorage.getItem("token");

    if (!refreshToken) {

        return false;
    }

    const response = await fetch(
        "http://localhost:8000/auth/v1/refreshToken",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                token: refreshToken
            })
        }
    );

    if (!response.ok) {

        return false;
    }

    const data = await response.json();

    localStorage.setItem(
        "access_token",
        data.accessToken
    );

    localStorage.setItem(
        "token",
        data.token
    );

    return true;
}