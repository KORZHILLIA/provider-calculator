function defineColor(providers) {
  const minPrice = Math.min(...providers.map(({ priceToView }) => priceToView));
  for (let provider of providers) {
    if (Number(provider.priceToView) === minPrice) {
      provider.providerVisual.classList.add(`${provider.name}-color`);
    } else {
      provider.providerVisual.classList.remove(`${provider.name}-color`);
    }
  }
}

export default defineColor;
