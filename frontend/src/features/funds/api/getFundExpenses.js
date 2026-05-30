import {
  createApiError
} from "../../../utils/session";

export async function getFundExpenses(
  fundId
) {

  const baseUrl =
    import.meta.env.VITE_API_BASE_URL;

  const accessToken =
    localStorage.getItem(
      "access_token"
    );

  const response = await fetch(

    `${baseUrl}/expense/v1/fund/${fundId}`,

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
      "Failed to fetch expenses",
      response
    );
  }

  return await response.json();
}
