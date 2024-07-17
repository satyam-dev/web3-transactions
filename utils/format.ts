export const trimFromCenter = (str: string, startCount = 6, endCount = 6) => {
  if (startCount < str.length && endCount < str.length) {
    const prefix = str.substring(0, startCount);
    const suffix = str.substring(str.length - 1 - endCount, str.length - 1);
    return `${prefix}...${suffix}`;
  }

  return `${str.substring(0, 6)}...${str.substring(
    str.length - 7,
    str.length - 1
  )}`;
};

export const trimFromEnd = (str: string, endCount = 6) => {
  if (endCount < str.length) {
    const subString = str.substring(0, endCount);
    if (Math.abs(+subString) === 0) return "0.0";
    return subString + "...";
  }
  return str.substring(0, 6);
};
