// dopeAssHelpers.js
const logger = (a, b) => {
  console.log('!x!x!x!x!x!x!!x!x!!x!x!');
  console.log('!x!x!x!x!x!x!!');
  if (b === undefined) {
    console.log(a);
  } else {
    console.log(a, b);
  }
  console.log('!x!x!x!x!x!x!!');
  console.log('!x!x!x!x!x!x!!x!x!!x!x!');
}


module.exports = {
  logger
}

