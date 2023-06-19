import { LitElement, html, css } from 'https://cdn.skypack.dev/lit';

class RatingStars extends LitElement {
  static styles = css`
    * {
      display: inline-block;
    }

    .star {
      cursor: pointer;
      color: gray;
    }

    .star.checked {
      color: gold;
    }

    /* Tooltip basado en https://www.w3schools.com/howto/howto_css_tooltip.asp */
    .tooltip {
      position: relative;
      display: inline-block;
    }
    
    .tooltip .tooltiptext {
      visibility: hidden;
      width: 120px;
      background-color: #555;
      color: #fff;
      text-align: center;
      padding: 5px 0;
      border-radius: 6px;

      position: absolute;
      z-index: 1;
      bottom: 125%;
      left: 50%;
      margin-left: -60px;

      opacity: 0;
      transition: opacity 0.3s;
    }

    .tooltip .tooltiptext::after {
      content: "";
      position: absolute;
      top: 100%;
      left: 50%;
      margin-left: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: #555 transparent transparent transparent;
    }

    .tooltip:hover .tooltiptext {
      visibility: visible;
      opacity: 1;
    }
  `;

  static properties = {
    rating: { type: Number }
  };

  constructor() {
    super();
    this.rating = null;
  }

  getRatingText() {
    return this.rating ? `${this.rating}/5 stars` : 'No rating'
  }

  handleClick(rating) {
    this.rating = rating;
  }

  render() {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      stars.push(html`
        <span
          class="star ${i <= this.rating ? 'checked' : ''}"
          @click=${() => this.handleClick(i)}
        >
          &#9733;
        </span>
      `);
    }

    return html`
      <div class="tooltip">
        ${stars}
        <span class="tooltiptext">${this.getRatingText()}</span> 
      </div>`;
  }
}

class DiscountElement extends LitElement {
  static styles = css`
    * {
      font-weight: bold;
      font-family: Roboto;
    }

    .discount-info {
      display: flex;
      flex-direction: column;
      border-style: solid;
      border-color: grey;
      border-radius: 5px;
      width: 10em;
      align-items: center;
      justify-items: center;
      padding: 1em;
      background-color: azure;
      box-shadow: inset 0 -3em 3em rgba(0,0,0,0.1),
                        0 0  0 2px rgb(255,255,255),
                        0.3em 0.3em 1em rgba(0,0,0,0.3);
    }

    .discount {
      color: red;
      align-self: end;
      padding-bottom: 1rem;
    }

    .original-price {
      text-decoration: line-through;
      margin-right: 8px;
      color: grey;
    }

    .discounted-price {
      margin-right: 8px;
      color: blue;
      font-size: 17px;
    }

    .product-image {
      width: 100px;
      height: auto;
      margin-right: 8px;
    }

    slot {
      font-size: 18px;
      color: black;
    }
  `;

  static properties = {
    discount: { type: Number },
    originalPrice: { type: Number },
    imageUrl: { type: String },
    rating: { type: Number }
  };

  constructor() {
    super()
    this.imageUrl = 'https://www.proclinic-products.com/build/static/default-product.30484205.png'
    this.discount = 0;
  }

  render() {
    const discountedPrice = parseInt(this.originalPrice - (this.originalPrice * (this.discount / 100)), 10);

    return html`
      <div class="discount-info">
        <span class="discount">${this.discount > 0 ? `${this.discount}% OFF` : null}</span>
        <img class="product-image" src="${this.imageUrl}" alt="Product Image"></img>
        <slot></slot>
        <span class="discounted-price">$${discountedPrice}</span>
        <span class="original-price">${this.discount > 0 ? `$${this.originalPrice}` : null}</span>
        <rating-stars rating="${this.rating}"></rating-stars>
      </div>
    `;
  }
}

customElements.define('rating-stars', RatingStars);
customElements.define('discount-element', DiscountElement);