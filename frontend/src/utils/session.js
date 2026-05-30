export function clearSession() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("userName");
  localStorage.removeItem("userId");
}

export function createApiError(
  fallbackMessage,
  response
) {
  const error =
    new Error(fallbackMessage);

  error.status =
    response?.status;

  return error;
}

export function isUnauthorizedError(error) {
  return error?.status === 401 ||
    error?.status === 403;
}

export function getFriendlyErrorMessage(
  error,
  fallback = "Something went wrong"
) {
  if (isUnauthorizedError(error)) {
    return "Session expired. Please login again.";
  }

  if (!error?.message) {
    return fallback;
  }

  const message =
    String(error.message);

  if (
    message.includes("<html") ||
    message.toLowerCase().includes("exception") ||
    message.toLowerCase().includes("stack")
  ) {
    return fallback;
  }

  return message;
}

export function handleSessionExpired(
  toast
) {
  clearSession();

  if (toast) {
    toast.error(
      "Session expired. Please login again."
    );
  }

  window.setTimeout(() => {
    window.location.assign("/login");
  }, 500);
}
