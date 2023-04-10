import defineScreenWidth from "./defineScreenWidth.js";
import defineColor from "./defineColor.js";

function defineProvidersWithOneValue(
  outerValueName,
  outerValue,
  screenWidth,
  providers
) {
  providers.forEach((provider) => {
    provider[outerValueName] = outerValue;
  });
  defineScreenWidth(screenWidth, providers);
  defineColor(providers);
}

export default defineProvidersWithOneValue;
