import defineScreenWidth from "./helpers/defineScreenWidth.js";
import defineProviders from "./helpers/defineProviders.js";
import defineProvidersWithOneValue from "./helpers/defineProvidersWithOneValue.js";
import {
  ProviderRegular,
  ProviderWithOptions,
  ProviderScaleway,
} from "./classes/providerClasses.js";

let screenWidth = window.screen.width;

window.addEventListener("resize", () => {
  screenWidth = window.screen.width;
  defineScreenWidth(screenWidth, [backblaze, bunny, scaleway, vultr]);
});

const form = document.querySelector(".form");
const storageVisual = document.querySelector("#storageVisual");
const transferVisual = document.querySelector("#transferVisual");
const [storage, transfer] = [...form.elements];
const { value: outerStorageValue } = storage;
const { value: outerTransferValue } = transfer;

const storageRange = document.querySelector("#storage");
const transferRange = document.querySelector("#transfer");

storageRange.addEventListener("wheel", onStorageMouseWheel);
transferRange.addEventListener("wheel", onTransferMouseWheel);

storageVisual.textContent = `${outerStorageValue} GB`;
transferVisual.textContent = `${outerTransferValue} GB`;

const backblaze = new ProviderRegular({
  name: "backblaze",
  storagePrice: 0.005,
  transferPrice: 0.01,
  minPrice: 7,
});

const vultr = new ProviderRegular({
  name: "vultr",
  storagePrice: 0.01,
  transferPrice: 0.01,
  minPrice: 5,
});

const bunny = new ProviderWithOptions({
  name: "bunny",
  transferPrice: 0.01,
  maxPrice: 10,
  options: [
    {
      optionName: "storage",
      optionValues: [
        { valueName: "HDD", valuePrice: 0.01 },
        { valueName: "SSD", valuePrice: 0.02 },
      ],
    },
  ],
});

const scaleway = new ProviderScaleway({
  name: "scaleway",
  transferPrice: 0.02,
  options: [
    {
      optionName: "storage",
      optionValues: [
        { valueName: "Single", valuePrice: 0.03 },
        { valueName: "Multi", valuePrice: 0.06 },
      ],
    },
  ],
});

defineProviders(outerStorageValue, outerTransferValue, screenWidth, [
  backblaze,
  bunny,
  scaleway,
  vultr,
]);

form.addEventListener("input", formChange);

function formChange({ currentTarget }) {
  const [storage, transfer] = [...currentTarget.elements];
  const { value: outerStorageValue } = storage;
  const { value: outerTransferValue } = transfer;

  storageVisual.textContent = `${outerStorageValue} GB`;
  transferVisual.textContent = `${outerTransferValue} GB`;

  defineProviders(outerStorageValue, outerTransferValue, screenWidth, [
    backblaze,
    bunny,
    scaleway,
    vultr,
  ]);
}

function onStorageMouseWheel(event) {
  event.preventDefault();
  if (event.deltaY > 0) {
    event.currentTarget.valueAsNumber += 10;
  } else {
    event.currentTarget.valueAsNumber -= 10;
  }
  storageVisual.textContent = `${event.currentTarget.valueAsNumber} GB`;

  defineProvidersWithOneValue(
    "outerStorageValue",
    event.currentTarget.valueAsNumber,
    screenWidth,
    [backblaze, bunny, scaleway, vultr]
  );
}

function onTransferMouseWheel(event) {
  event.preventDefault();
  if (event.deltaY > 0) {
    event.currentTarget.valueAsNumber += 10;
  } else {
    event.currentTarget.valueAsNumber -= 10;
  }
  transferVisual.textContent = `${event.currentTarget.valueAsNumber} GB`;

  defineProvidersWithOneValue(
    "outerTransferValue",
    event.currentTarget.valueAsNumber,
    screenWidth,
    [backblaze, bunny, scaleway, vultr]
  );
}
