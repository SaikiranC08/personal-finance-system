import {
  createApiError
} from "../../../utils/session";

export async function createFund(
  fundData
) {

  const baseUrl =
    import.meta.env.VITE_API_BASE_URL;

  const accessToken =
    localStorage.getItem("access_token");

  const payload = {

    amountReceived:
      Number(
        fundData.amountReceived
      ),

    ownerName:
      fundData.ownerName,

    givenDate:
      fundData.givenDate,

    status: "ACTIVE",

    ownerType: "OTHER"
  };

  const response = await fetch(

    `${baseUrl}/expense/v1/funds`,

    {
      method: "POST",

      headers: {

        Authorization:
          `Bearer ${accessToken}`,

        "Content-Type":
          "application/json"
      },

      body: JSON.stringify(payload)
    }
  );

  if (!response.ok) {

  const error =
    createApiError(
      "Failed to create fund",
      response
    );

  throw error;
}

  return await response.json();
}
