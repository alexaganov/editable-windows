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