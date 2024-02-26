// eslint-disable-next-line no-unused-vars
function validateStringLength(input, maxLength) {
  return input.length <= maxLength;
}

// eslint-disable-next-line no-unused-vars
function isPalindrome(input) {
  const lowerCaseInput = input.toLowerCase().replaceAll(' ', '');
  return lowerCaseInput.toLowerCase() === lowerCaseInput.split('').reverse().join('');
}

// eslint-disable-next-line no-unused-vars
function extractNumber(input) {
  const numberStr = input.match(/\d/g);
  if(!numberStr) {
    return NaN;
  }

  return Number(numberStr?.join(''));
}

// eslint-disable-next-line no-unused-vars
function isMeetingWithinWorkHours(startOfWorkDay, endOfWorkDay, startOfMeeting, durationInMinutes) {
  function timeToMinutes(time) {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  const startOfWorkDayInMinutes = timeToMinutes(startOfWorkDay);
  const endOfWorkDayInMinutes = timeToMinutes(endOfWorkDay);
  const startOfMeetingInMinutes = timeToMinutes(startOfMeeting);
  const endOfMeetingInMinutes = startOfMeetingInMinutes + durationInMinutes;

  return startOfMeetingInMinutes >= startOfWorkDayInMinutes && endOfMeetingInMinutes <= endOfWorkDayInMinutes;
}
