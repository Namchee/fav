export function getFilename(str: string): string {
  const dot = str.lastIndexOf('.');

  return dot === -1 ? str : str.slice(0, dot);
}

export function blobToFile(
  blob: Blob,
  name: string,
  mime: string,
): File {
  return new File([blob], name, { type: mime });
}

export function fileToImage(src: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);

    img.src = URL.createObjectURL(src);
  });
}
