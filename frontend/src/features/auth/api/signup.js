export async function signup(formData) {
    console.log("API function reached", formData);

    const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:8000";

    const response = await fetch(`${baseUrl}/auth/v1/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    });

    if(response.ok) {
        const data = await response.json();
        console.log("Signup successful", data);

        //storing data in local storage
        localStorage.setItem(
            "access_token",
            data.accessToken
        );

        localStorage.setItem(
            "token",
            data.token
        );

        localStorage.setItem(
            "username",
            formData.userName
        );

    } else {
        throw new Error("Signup failed" + response.statusText);
    }


}
