import defineOuterValues from "./defineOuterValues.js";
import defineScreenWidth from "./defineScreenWidth.js";
import defineColor from "./defineColor.js";

function defineProviders(
  outerStorageValue,
  outerTransferValue,
  screenWidth,
  providers
) {
  defineOuterValues(outerStorageValue, outerTransferValue, providers);
  defineScreenWidth(screenWidth, providers);
  defineColor(providers);
}

export default defineProviders;
