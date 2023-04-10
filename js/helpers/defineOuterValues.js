function defineOuterValues(outerStorageValue, outerTransferValue, providers) {
  providers.forEach((provider) => {
    provider.outerStorageValue = outerStorageValue;
    provider.outerTransferValue = outerTransferValue;
  });
}

export default defineOuterValues;
