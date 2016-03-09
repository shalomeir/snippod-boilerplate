export function checkEnter(event) {
  const keyCode = (event.keyCode ? event.keyCode : event.which ? event.which : event.charCode);
  if (keyCode === 13) {
    return true;
  }
  return false;
}
