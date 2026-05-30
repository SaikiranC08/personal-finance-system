import {
  createApiError
} from "../../../utils/session";

export async function getOwnerNames() {

  const baseUrl =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

  const accessToken =
    localStorage.getItem("access_token");

  const response = await fetch(

    `${baseUrl}/expense/v1/funds/ownerName`,

    {
      method: "GET",

      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  );

  if (!response.ok) {

    throw createApiError(
      "Failed to fetch owner names",
      response
    );
  }

  return await response.json();
}
