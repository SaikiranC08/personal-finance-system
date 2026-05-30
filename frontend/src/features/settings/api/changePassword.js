import {
  createApiError
} from "../../../utils/session";

/**
 * Updates the user's password.
 * @param {Object} data
 * @param {string} data.oldPassword
 * @param {string} data.newPassword
 */
export async function changePassword({ oldPassword, newPassword }) {
  const baseUrl =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

  const accessToken =
    localStorage.getItem("access_token");

  const response = await fetch(
    `${baseUrl}/auth/v1/change-password`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        oldPassword,
        newPassword
      })
    }
  );

  if (!response.ok) {
    throw createApiError(
      "Failed to update password",
      response
    );
  }

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return await response.json();
  }

  const text = await response.text();
  return { message: text || "Password updated successfully" };
}
