export function getFilenameWithoutExtension(str: string): string {
  const dot = str.lastIndexOf('.');

  return dot === -1 ? str : str.slice(0, dot);
}
