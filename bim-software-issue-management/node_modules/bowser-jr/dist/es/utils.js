function getFirstMatch(regexp, ua) {
  const match = ua.match(regexp);
  return match && match.length > 0 && match[1] || "";
}
function getSecondMatch(regexp, ua) {
  const match = ua.match(regexp);
  return match && match.length > 1 && match[2] || "";
}
export { getSecondMatch as a, getFirstMatch as g };
