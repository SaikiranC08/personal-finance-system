import {
  createApiError
} from "../../../utils/session";

export async function downloadFundReport(fundId) {

  const baseUrl =
    import.meta.env.VITE_API_BASE_URL;

  const accessToken =
    localStorage.getItem("access_token");

  const response = await fetch(
    `${baseUrl}/expense/v1/reports/fund/${fundId}`,
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
      "Failed to export fund utilization report",
      response
    );
  }

  return response;
}
