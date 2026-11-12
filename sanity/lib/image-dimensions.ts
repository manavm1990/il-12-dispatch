const IMAGE_REF = /^image-[^-]+-(\d+)x(\d+)-[a-z]+$/;

/** Reads pixel size from a Sanity image asset `_ref` (`image-<id>-<w>x<h>-<ext>`). */
export function imageDimensions(ref: string | undefined) {
  const match = ref ? IMAGE_REF.exec(ref) : null;
  return match ? { width: Number(match[1]), height: Number(match[2]) } : null;
}
