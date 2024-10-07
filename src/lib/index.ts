export const convertStylesStringToObject = (stringStyles: string) =>
  typeof stringStyles === "string"
    ? stringStyles.split(";").reduce((acc, style) => {
        const colonPosition = style.indexOf(":");

        if (colonPosition === -1) {
          return acc;
        }

        const camelCaseProperty = style
            .substring(0, colonPosition)
            .trim()
            .replace(/^-ms-/, "ms-")
            .replace(/-./g, (c) => c.substring(1).toUpperCase()),
          value = style.substring(colonPosition + 1).trim();

        return value ? { ...acc, [camelCaseProperty]: value } : acc;
      }, {})
    : {};

export const convertJSONToCSS = (cssObject: Record<string, string>): string => {
  const cssString = Object.entries(cssObject)
    .map(([key, value]) => {
      // Convert camelCase to kebab-case
      const kebabCaseKey = key
        .replace(/([a-z])([A-Z])/g, "$1-$2")
        .toLowerCase();
      return `${kebabCaseKey}: ${value}`;
    })
    .join("; ");

  return cssString + ";"; // Add a semicolon at the end
};
