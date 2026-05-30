export async function downloadPdfFromResponse(
  response,
  fallbackFileName
) {

  const blob =
    await response.blob();

  const fileName =
    getFileNameFromResponse(
      response
    ) || fallbackFileName;

  const url =
    window.URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();

  window.URL.revokeObjectURL(url);
}

function getFileNameFromResponse(response) {

  const disposition =
    response.headers.get("content-disposition");

  if (!disposition) {
    return "";
  }

  const utfFileName =
    disposition.match(/filename\*=UTF-8''([^;]+)/i);

  if (utfFileName?.[1]) {
    return decodeURIComponent(
      utfFileName[1].replace(/["']/g, "")
    );
  }

  const fileName =
    disposition.match(/filename="?([^"]+)"?/i);

  return fileName?.[1] || "";
}
