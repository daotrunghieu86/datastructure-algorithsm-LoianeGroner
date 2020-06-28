function djbHasCode(key) {
  const tableKey = this.toStrFn(key);
  let hash = 5381;
  for (let i = 0; i < tableKey.length; i++) {
    hash = hash * 33 + tableKey.charCodeAt(i);
  }
  return hash % 1013;
}

807 - Ygritte;
288 - Jonathan;
962 - Jamie;
619 - Jack;
275 - Jasmine;
877 - Jake;
223 - Nathan;
925 - Athelstan;
502 - Sue;
149 - Aethelwulf;
711 - Sargeras;
