export const hasScrollBars = (element) => {
  return {
    "vertical": element.scrollHeight > element.style.height, 
    "horizontal": element.scrollWidth > element.style.width
  };
};

export const scrollToBottom = (element) => {
  element.scrollTo({
    left: 0,
    top: element.scrollHeight - element.clientHeight,
    behavior: 'smooth'
  });
}

export const scrollToRight = (element) => {
  element.scrollTo({
    left: element.scrollWidth - element.clientWidth,
    behavior: 'smooth'
  });
}

export const getArrayWithoutDuplicates = (arr) => {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}