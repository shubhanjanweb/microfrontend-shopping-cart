import singleSpaHtml from "single-spa-html";
import template from "./template.html";
import styles from "./styles.css";


const interpolateTemplate = () => {
  const cssModuleClassNames = Object.keys(styles).join("|");
  const classNamesRegex = new RegExp(cssModuleClassNames, "gi");
  const templateWithClassNames = template.replace(
    classNamesRegex,
    (matched) => styles[matched]
  );
  return templateWithClassNames;
};

const htmlLifecycles = singleSpaHtml({
  template: interpolateTemplate(),
});

export const { bootstrap, unmount, mount } = htmlLifecycles;
