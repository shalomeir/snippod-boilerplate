import logMessages from 'i18nDefault/logMessages';
// https://www.npmjs.com/package/validator
import validator from 'validator';
import { addhttp } from 'utils/transformUrl';

const i18n = logMessages;

const isEmpty = value => value === undefined || value === null || value === '';
const join = (rules) => (value, data) => rules.map(rule => rule(value, data)).filter(error => !!error)[0]; /* first error */

export function email(value) {
  // Let's not start a debate on email regex. This is just for an example app!
  if (!isEmpty(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return i18n.invalidEmail;
  }
}

export function specialCharCheck(value) {
  const regExpWhiteList = /^[\w.+-|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+$/;
  if (!regExpWhiteList.test(value)) {
    return i18n.invalidString;
  }
}

export function required(value) {
  if (isEmpty(value)) {
    return i18n.required;
  }
}

export function minLength(min) {
  return value => {
    if (!isEmpty(value) && value.length < min) {
      return Object.assign(i18n.minLength, { values: { min } });
    }
  };
}

export function maxLength(max) {
  return value => {
    if (!isEmpty(value) && value.length > max) {
      return Object.assign(i18n.maxLength, { values: { max } });
    }
  };
}

export function space(value) {
  const blankPattern = /[\s]/g;
  if (blankPattern.test(value)) {
    return i18n.space;
  }
}

export function integer(value) {
  if (!Number.isInteger(Number(value))) {
    return i18n.integer;
  }
}

export function oneOf(enumeration) {
  return value => {
    if (!~enumeration.indexOf(value)) {
      return Object.assign(i18n.enumeration, { values: { enumerations: enumeration.join(', ') } });
    }
  };
}

export function match(field) {
  return (value, data) => {
    if (data) {
      if (value !== data[field]) {
        return i18n.donotmatch;
      }
    }
  };
}

export function createValidator(rules) {
  return (data = {}) => {
    const errors = {};
    Object.keys(rules).forEach((key) => {
      const rule = join([].concat(rules[key])); // concat enables both functions and arrays of functions
      const error = rule(data[key], data);
      if (error) {
        errors[key] = error;
      }
    });
    return errors;
  };
}

export function isFuncWork(func) {
  try {
    if (func && typeof func === 'function') return true;
  } catch (err) {
    return false;
  }
  return false;
}

export function url(value) {
  if (!value) return i18n.invaludUrl;
  const httpUrl = addhttp(value);
  if (!validator.isURL(httpUrl, { protocols: ['http', 'https'], allow_underscores: true })) {
    return i18n.invalidUrl;
  }
}

export function isUrl(value) {
  if (!validator.isURL(value, { protocols: ['http', 'https'], allow_underscores: true })) {
    return false;
  }
  return true;
}
