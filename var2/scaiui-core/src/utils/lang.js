export function langTran(title) {
  const hasKey = this.$te(title)
  if (hasKey) {
    const translatedTitle = this.$t(title)
    return translatedTitle
  }
  return title
};

