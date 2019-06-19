export function langTran(title) {
  const hasKey = this.$te(title);
  let translatedTitle = title;
  if (hasKey) {
    translatedTitle = this.$t(title);
  }
  return translatedTitle
}

