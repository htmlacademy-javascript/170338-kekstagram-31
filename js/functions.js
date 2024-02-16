function validateStringLength(input, maxLength) {
  if(input.length <= maxLength) {
    return true;
  }

  return false;
}

function isPalindrome(input) {
  const lowerCaseInput = input.toLowerCase().replaceAll(' ', '');
  return lowerCaseInput.toLowerCase() === lowerCaseInput.split('').reverse().join('');
}

function extractNumber(input) {
  const numberStr = input.match(/\d/g);
  if(!numberStr) {
    return NaN;
  }

  return Number(numberStr?.join(''));
}
