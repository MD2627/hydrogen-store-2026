// NOTE: https://shopify.dev/docs/api/storefront/latest/queries/cart
export const CART_QUERY_FRAGMENT = `#graphql
  fragment Money on MoneyV2 {
    currencyCode
    amount
  }
  fragment CartLine on CartLine {
    id
    quantity
    attributes {
      key
      value
    }
    cost {
      totalAmount {
        ...Money
      }
      amountPerQuantity {
        ...Money
      }
      compareAtAmountPerQuantity {
        ...Money
      }
    }
    merchandise {
      ... on ProductVariant {
        id
        availableForSale
        compareAtPrice {
          ...Money
        }
        price {
          ...Money
        }
        requiresShipping
        title
        image {
          id
          url
          altText
          width
          height

        }
        product {
          handle
          title
          id
          vendor
        }
        selectedOptions {
          name
          value
        }
      }
    }
  }
  fragment CartLineComponent on ComponentizableCartLine {
    id
    quantity
    attributes {
      key
      value
    }
    cost {
      totalAmount {
        ...Money
      }
      amountPerQuantity {
        ...Money
      }
      compareAtAmountPerQuantity {
        ...Money
      }
    }
    merchandise {
      ... on ProductVariant {
        id
        availableForSale
        compareAtPrice {
          ...Money
        }
        price {
          ...Money
        }
        requiresShipping
        title
        image {
          id
          url
          altText
          width
          height
        }
        product {
          handle
          title
          id
          vendor
        }
        selectedOptions {
          name
          value
        }
      }
    }
  }
  fragment CartApiQuery on Cart {
    updatedAt
    id
    appliedGiftCards {
      id
      lastCharacters
      amountUsed {
        ...Money
      }
    }
    checkoutUrl
    totalQuantity
    buyerIdentity {
      countryCode
      customer {
        id
        email
        firstName
        lastName
        displayName
      }
      email
      phone
    }
    lines(first: $numCartLines) {
      nodes {
        ... on CartLine {
          ...CartLine
        }
        ... on ComponentizableCartLine {
          ...CartLineComponent
        }
      }
    }
    cost {
      subtotalAmount {
        ...Money
      }
      totalAmount {
        ...Money
      }
      totalDutyAmount {
        ...Money
      }
      totalTaxAmount {
        ...Money
      }
    }
    note
    attributes {
      key
      value
    }
    discountCodes {
      code
      applicable
    }
  }
`;

const MENU_FRAGMENT = `#graphql
  fragment MenuItem on MenuItem {
    id
    resourceId
    tags
    title
    type
    url
  }
  fragment GrandChildMenuItem on MenuItem {
    ...MenuItem
    resource {
      ... on Collection {
        image {
          url
          altText
          width
          height
        }
      }
      ... on Product {
        featuredImage {
            url
            altText
            width
            height
        }
      }
    }
  }
  fragment ChildMenuItem on MenuItem {
    ...MenuItem
    items {
      ...GrandChildMenuItem
    }
    resource {
      ... on Collection {
        image {
          url
          altText
          width
          height
        }
      }
      ... on Product {
        featuredImage {
            url
            altText
            width
            height
        }
      }
    }
  }
  fragment ParentMenuItem on MenuItem {
    ...MenuItem
    items {
      ...ChildMenuItem
    }
  }
  fragment Menu on Menu {
    id
    items {
      ...ParentMenuItem
    }
  }
`;

export const HEADER_QUERY = `#graphql
  fragment Shop on Shop {
    id
    name
    description
    primaryDomain {
      url
    }
    brand {
      logo {
        image {
          url
        }
      }
      squareLogo {
        image {
          url
        }
      }
      shortDescription
    }
  }
  query Header(
    $country: CountryCode
    $headerMenuHandle: String!
    $leftMenuHandle: String!
    $rightMenuHandle: String!
    $language: LanguageCode
  ) @inContext(language: $language, country: $country) {
    shop {
      ...Shop
    }
    menu(handle: $headerMenuHandle) {
      ...Menu
    }
    leftMenu: menu(handle: $leftMenuHandle) {
      ...Menu
    }
    rightMenu: menu(handle: $rightMenuHandle) {
      ...Menu
    }
  }
  ${MENU_FRAGMENT}
`;

export const FOOTER_QUERY = `#graphql
  query Footer(
    $country: CountryCode
    $footerMenuHandle: String!
    $quickLinksHandle: String!
    $aboutUsHandle: String!
    $clientCareHandle: String!
    $socialLinksHandle: String!
    $legalLinksHandle: String!
    $language: LanguageCode
  ) @inContext(language: $language, country: $country) {
    menu(handle: $footerMenuHandle) {
      ...Menu
    }
    quickLinks: menu(handle: $quickLinksHandle) {
      ...Menu
    }
    aboutUs: menu(handle: $aboutUsHandle) {
      ...Menu
    }
    clientCare: menu(handle: $clientCareHandle) {
      ...Menu
    }
    socialLinks: menu(handle: $socialLinksHandle) {
      ...Menu
    }
    legalLinks: menu(handle: $legalLinksHandle) {
      ...Menu
    }
  }
  ${MENU_FRAGMENT}
`;
