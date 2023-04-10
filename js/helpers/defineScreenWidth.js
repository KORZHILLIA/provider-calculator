function defineScreenWidth(screenWidth, providers) {
  providers.forEach((provider) => {
    provider.screenWidth = screenWidth;
    provider.calcHeight();
  });
}

export default defineScreenWidth;
