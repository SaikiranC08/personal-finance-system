import {
  createApiError
} from "../../../utils/session";

export async function getFundUtilization() {

  const baseUrl =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

  const accessToken =
    localStorage.getItem("access_token");

  const response = await fetch(
    `${baseUrl}/expense/v1/funds/analytics/utilization`,
    {
      method: "GET",
      headers: {
        Authorization:
          `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      }
    }
  );

  if (!response.ok) {

    throw createApiError(
      "Failed to fetch fund utilization",
      response
    );
  }

  return await response.json();
}
