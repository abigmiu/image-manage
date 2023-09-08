export function blobToFile(blob: Blob, name?: string) {
    return new File([blob], name || blob.name, {
        type: blob.type
    });
}