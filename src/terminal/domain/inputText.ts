export function insertTextAtSelection(
  value: string,
  text: string,
  selectionStart: number,
  selectionEnd: number,
) {
  return `${value.slice(0, selectionStart)}${text}${value.slice(selectionEnd)}`;
}
