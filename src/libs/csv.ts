export const exportCsv = (
  records: Array<Array<string>>,
  filename: string,
  headers: Array<string> | undefined
) => {
  const header = headers !== undefined ? headers.join(",") + "\r\n" : "";
  const data = records.map((r) => r.join(",")).join("\r\n");
  const bom = new Uint8Array([0xef, 0xbb, 0xbf]);
  const blob = new Blob([header, data, bom], { type: "text/csv" });
  const link = document.createElement("a");
  link.download = filename;
  link.href = (window.URL || window.webkitURL).createObjectURL(blob);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
