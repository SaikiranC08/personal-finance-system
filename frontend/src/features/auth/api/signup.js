export async function signup(formData) {
    console.log("API function reached", formData);

    const baseUrl =  `${import.meta.env.VITE_BASE_URL}/auth/v1/signup` || "http://localhost:8000/auth/v1/signup";

    const response = await fetch(baseUrl, {
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

    } else {
        throw new Error("Signup failed" + response.statusText);
    }


}
