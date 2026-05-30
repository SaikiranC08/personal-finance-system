export async function downloadExpenseReport({
  startDate,
  endDate
}) {

  const baseUrl =
    import.meta.env.VITE_API_BASE_URL;

  const accessToken =
    localStorage.getItem("access_token");

  const params =
    new URLSearchParams({
      startDate,
      endDate
    });

  const response = await fetch(
    `${baseUrl}/expense/v1/reports/expenses?${params.toString()}`,
    {
      method: "GET",
      headers: {
        Authorization:
          `Bearer ${accessToken}`
      }
    }
  );

  if (!response.ok) {

    throw new Error(
      "Failed to export expense report"
    );
  }

  return response;
}
