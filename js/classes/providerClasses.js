export class ProviderRegular {
  screenWidth;
  outerStorageValue;
  outerTransferValue;

  constructor({ name, storagePrice, transferPrice, minPrice, maxPrice }) {
    this.name = name;
    this.storagePrice = storagePrice;
    this.transferPrice = transferPrice;
    this.minPrice = minPrice;
    this.maxPrice = maxPrice;

    this.parentElement = document.querySelector(`.${name}`);
    this.providerVisual = document.createElement("span");
    this.providerVisual.classList.add("provider-visual");
    this.providerVisual.setAttribute("id", name);
    this.priceVisual = document.createElement("span");
    this.priceVisual.classList.add("price-visual");
    this.providerVisual.append(this.priceVisual);
    this.parentElement.append(this.providerVisual);
    this.element = document.querySelector(`#${name}`);
  }

  calcHeight() {
    const bruttoPrice =
      this.outerStorageValue * this.storagePrice +
      this.outerTransferValue * this.transferPrice;

    const finalPrice = this.minPrice
      ? bruttoPrice > this.minPrice
        ? bruttoPrice
        : this.minPrice
      : bruttoPrice > this.maxPrice
      ? this.maxPrice
      : bruttoPrice;
    this.priceToView = finalPrice.toFixed(2);
    if (this.screenWidth >= 768) {
      this.element.style.width = `${this.priceToView}%`;
      this.element.style.height = "20px";
    } else {
      this.element.style.height = `${this.priceToView}%`;
      this.element.style.width = "50px";
    }
    this.priceVisual.textContent = `$${this.priceToView}`;
  }
}

export class ProviderWithOptions extends ProviderRegular {
  constructor({
    name,
    storagePrice,
    transferPrice,
    minPrice,
    maxPrice,
    options,
  }) {
    super({
      name,
      storagePrice,
      transferPrice,
      minPrice,
      maxPrice,
    });

    this.absendPriceKind = this.storagePrice ? "transferPrice" : "storagePrice";
    this.innerForm = document.createElement("form");
    this.innerForm.classList.add("inner-form");
    options.map(({ optionName, optionValues }) => {
      const fieldset = document.createElement("fieldset");
      fieldset.classList.add("fieldset");
      optionValues.map(({ valueName, valuePrice }, idx) => {
        const label = document.createElement("label");
        label.classList.add("label");
        label.append(valueName);
        const radio = document.createElement("input");
        radio.setAttribute("type", "radio");
        radio.setAttribute("name", optionName);
        radio.setAttribute("value", valueName);
        if (!idx) {
          radio.setAttribute("checked", true);
          this[this.absendPriceKind] = valuePrice;
        }
        radio.classList.add("radio");
        label.append(radio);
        fieldset.append(label);
      });
      this.innerForm.append(fieldset);

      const changePrice = ({ currentTarget }) => {
        const elements = [...currentTarget.elements];
        const [checkedRadio] = elements.filter((element) => element.checked);
        const { name, value } = checkedRadio;
        const { optionValues } = options.find(
          ({ optionName }) => optionName === name
        );
        const { valuePrice } = optionValues.find(
          ({ valueName }) => valueName === value
        );
        this.changeInstancePriceKind(name, valuePrice);
      };

      this.innerForm.addEventListener("change", changePrice);
    });
    this.parentElement.prepend(this.innerForm);
  }
  changeInstancePriceKind(key, value) {
    this[`${key}Price`] = value;
    this.calcHeight();
  }
}

export class ProviderScaleway extends ProviderWithOptions {
  constructor({
    name,
    storagePrice,
    transferPrice,
    minPrice,
    maxPrice,
    options,
  }) {
    super({
      name,
      storagePrice,
      transferPrice,
      minPrice,
      maxPrice,
      options,
    });
  }

  calcHeight() {
    const storagePriceFor75GB = 75 * this.storagePrice;
    const transferPriceFor75GB = 75 * this.transferPrice;
    const storagePrice =
      this.outerStorageValue <= 75
        ? 0
        : this.storagePrice * this.outerStorageValue - storagePriceFor75GB;
    const transferPrice =
      this.outerTransferValue <= 75
        ? 0
        : this.transferPrice * this.outerTransferValue - transferPriceFor75GB;
    const totalPrice = storagePrice + transferPrice;
    this.priceToView = totalPrice.toFixed(2);
    if (this.screenWidth >= 768) {
      this.element.style.width = `${this.priceToView}%`;
      this.element.style.height = "20px";
    } else {
      this.element.style.height = `${this.priceToView}%`;
      this.element.style.width = "50px";
    }
    this.priceVisual.textContent = `$${this.priceToView}`;
  }
}
