import {
  createApiError
} from "../../../utils/session";

export async function getReportFunds() {

  const baseUrl =
    import.meta.env.VITE_API_BASE_URL;

  const accessToken =
    localStorage.getItem("access_token");

  const response = await fetch(
    `${baseUrl}/expense/v1/funds`,
    {
      method: "GET",
      headers: {
        Authorization:
          `Bearer ${accessToken}`
      }
    }
  );

  if (!response.ok) {

    throw createApiError(
      "Failed to fetch funds",
      response
    );
  }

  return await response.json();
}
