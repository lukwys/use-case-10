const specialCharactersList = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'

// (?!.*\\s) - Asserts that the string does not contain whitespace characters.
// (?=.*[a-z]) - Asserts that the string contains at least one lowercase letter.
// (?=.*[A-Z]) - Asserts that the string contains at least one uppercase letter.
// (?=.*\\d) - Asserts that the string contains at least one digit.
// (?=.*[specialCharactersList]) - Asserts that the string contains at least one special character from the predefined list.
// .{1,textMaxLength} - Asserts that the string length is within the acceptable range, which is from 1 to maxLength.
export const validate = (text, textMaxLength) => {
  const reqex = new RegExp(`^(?!.*\\s)(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[${specialCharactersList.replace(
      /[-/\\^$*+?.()|[\]{}]/g,
      '\\$&'
    )}]).{1,${textMaxLength}}$`)

  return reqex.test(text)
}

const testCases = [
  validate('D$d9' , 6), //true
  validate('INVALId20023!' , 10), //false
  validate('vALId20023!' , 15), //true
  validate('vALId 20023!' , 15), //false
  validate('vALId 20023!' , 5), //false
  validate('vALId' , 5), //false
  validate('vA!8' , 5), //true
  validate('v A!8' , 5), //false
  validate('vA!8' , 5), //true
  validate('vA!8Ʈ\t' , 10), //false
]
