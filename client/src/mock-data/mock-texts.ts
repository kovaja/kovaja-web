export interface IText {
  title: string;
  body: string;
}

export const texts: { [section: string]: IText } = {
  aboutMe: {
    title: "Hi, I'm Kuba",
    body: `A Frontend developer, based in Prague. Suspendisse nisl. Nunc auctor. Cras
    pede libero, dapibus nec, pretium sit amet, tempor quis. Duis ante orci,
    molestie vitae vehicula venenatis, tincidunt ac pede. Proin mattis lacinia
    justo. Morbi imperdiet, mauris ac auctor dictum, nisl ligula egestas
    nulla, et sollicitudin sem purus in lacus. Maecenas aliquet accumsan leo.
    Maecenas ipsum velit, consectetuer eu lobortis ut, dictum at dui. Nullam
    rhoncus aliquam metus. Praesent in mauris eu tortor porttitor accumsan.
    Aenean placerat. Mauris dolor felis, sagittis at, luctus sed, aliquam non,
    tellus.`
  },
  underConstruction: {
    title: "Coming Soon",
    body: "I am sorry, but this page is currently under construction."
  }
};
