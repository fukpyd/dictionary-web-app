export const changeFontStyle = function (event) {
  [...document.getElementsByTagName('body')][0].style.fontFamily =
    event.target.value;
};
