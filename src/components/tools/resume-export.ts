/**
 * ブラウザ内でプレビュー DOM を画像化し、PNG / PDF として保存するヘルパー。
 */

export type CapturePreviewOptions = {
  /** html2canvas の scale。大きいほど鮮明だが PDF 容量が増える（既定 2） */
  scale?: number;
};

export async function capturePreviewToCanvas(
  el: HTMLElement,
  options?: CapturePreviewOptions,
): Promise<HTMLCanvasElement> {
  const html2canvas = (await import("html2canvas")).default;
  const scale = options?.scale ?? 2;
  return html2canvas(el, {
    scale,
    useCORS: true,
    backgroundColor: "#ffffff",
    logging: false,
  });
}

export function downloadDataUrlPng(dataUrl: string, filename: string): void {
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = filename;
  a.click();
}

export type DownloadPdfOptions = {
  /**
   * JPEG 品質 0〜1。ネットプリント向けに既定をやや抑える（PNG 比で容量大幅削減）
   */
  jpegQuality?: number;
};

/**
 * キャンバスを A4 縦向き PDF に収める。内容が長い場合は複数ページに分割する。
 * 埋め込みは JPEG＋ストリーム圧縮で、セブンイレブンのネットプリント等の容量制限に配慮。
 */
export async function downloadCanvasAsPdf(
  canvas: HTMLCanvasElement,
  filename: string,
  options?: DownloadPdfOptions,
): Promise<void> {
  const { jsPDF } = await import("jspdf");
  const jpegQuality = options?.jpegQuality ?? 0.82;
  const imgData = canvas.toDataURL("image/jpeg", jpegQuality);
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
    compress: true,
  });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft > 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  pdf.save(filename);
}
