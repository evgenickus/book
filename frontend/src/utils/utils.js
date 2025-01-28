export const firstLetterUppercase = (name) => {
  const capitalized = name &&
    name.charAt(0).toUpperCase()
    + name.slice(1)
  return capitalized
};