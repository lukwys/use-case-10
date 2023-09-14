const specialCharactersList = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'
const testCases = [
  {
    text: 'abcD!', expected: false, description: 'missing digit'
  },
  {
    text: 'abcD9', expected: false, description: 'missing special char'
  },
  {
    text: 'ABCD9!', expected: false, description: 'missing lower'
  },
  {
    text: 'abcd9!', expected: false, description: 'missing upper'
  },
  {
    text: 'ab Dcd9!', expected: false, description: 'white space found'
  },
  {
    text: 'abcd9sdasUUBFHDE!', expected: false, description: 'input is too loong'
  },
  {
    text: 'aB!9', expected: true, description: 'ok'
  }
]

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

export const testValidate = () => {
  testCases.forEach(testCase => {
    const testResult = validate(testCase.text, 10) === testCase.expected
    if (testResult) {
      console.log(`tested text: ${testCase.text}, test result: ${testResult ? 'Passed' : 'Failed'}, description: ${testCase.description} `)
    }
  })
}



// const testCases = [
//   validate('D$d9' , 6), //true
//   validate('INVALId20023!' , 10), //false
//   validate('vALId20023!' , 15), //true
//   validate('vALId 20023!' , 15), //false
//   validate('vALId 20023!' , 5), //false
//   validate('vALId' , 5), //false
//   validate('vA!8' , 5), //true
//   validate('v A!8' , 5), //false
//   validate('vA!8' , 5), //true
//   validate('vA!8Ʈ\t' , 10), //false
// ]
