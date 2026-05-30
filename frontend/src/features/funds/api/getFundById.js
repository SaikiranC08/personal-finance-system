import {
  createApiError
} from "../../../utils/session";

export async function getFundById(
  fundId
) {

  const baseUrl =
    import.meta.env.VITE_API_BASE_URL;

  const accessToken =
    localStorage.getItem(
      "access_token"
    );

  const response = await fetch(

    `${baseUrl}/expense/v1/funds/${fundId}`,

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
      "Failed to fetch fund",
      response
    );
  }

  return await response.json();
}
