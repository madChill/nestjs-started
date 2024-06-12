/**
 * Time helper to assist on time manipulation
 * 
 * Note: WIP
 */

export class TimeHelper {
  // Convert duration to millisecond
  static duration(value: { year?: number, quarter?: number, month?: number, week?: number, day?: number, hour?: number, minute?: number, second?: number, millisecond?: number }): number {
    const years = value.year || 0,
    quarters = value.quarter || 0,
    months = value.month || 0,
    weeks = value.week || 0,
    days = value.day || 0,
    hours = value.hour || 0,
    minutes = value.minute || 0,
    seconds = value.second || 0,
    milliseconds = value.millisecond || 0;

    // Convert all to ms:
    let _milliseconds = + milliseconds +
        seconds * 1e3 + // 1000
        minutes * 6e4 + // 1000 * 60
        hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors

    const _days = +days + weeks * 7;
    const _months = +months + quarters * 3 + years * 12;
    
    _milliseconds = _milliseconds +
            _days * 864e5 +
            (_months % 12) * 2592e6 +
            toInt(_months / 12) * 31536e6

    return _milliseconds
  }
}


function toInt(argumentForCoercion) {
  const coercedNumber = +argumentForCoercion
  let value = 0

  if (coercedNumber !== 0 && isFinite(coercedNumber)) {
      value = absFloor(coercedNumber);
  }

  return value;
}

function absFloor(number) {
  if (number < 0) {
      // -0 -> 0
      return Math.ceil(number) || 0;
  } else {
      return Math.floor(number);
  }
}