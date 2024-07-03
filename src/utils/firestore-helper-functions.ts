

export function batchDocuments(documentIDs: string[], batchSize=10) {
    let start = 0;
    const batches: string[][] = [];

    while (start < documentIDs.length) {
        const batch = documentIDs.slice(start, Math.min(documentIDs.length, start+batchSize));
        batches.push(batch);
        start += batchSize;
    }
    return batches;
}