export function deleteItemFromHash(hashtable: any, keyToRemove: string) {
  return Object.keys(hashtable).reduce((result, key) =>
    key !== keyToRemove ? { ...result, [key]: hashtable[key] } : result, {});
}
