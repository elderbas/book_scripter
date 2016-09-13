let utilityFunks = {};

utilityFunks.extractFileName = (fileNameStr) => {
  let fileNameWithoutExtension;
  let indexOfLastDot = fileNameStr.lastIndexOf('.');
  indexOfLastDot = (indexOfLastDot === -1) ?  fileNameStr.length : indexOfLastDot;
  fileNameWithoutExtension = fileNameStr.slice(0, indexOfLastDot);
  return fileNameWithoutExtension;
};

utilityFunks.validateType = (varName, val, funcValidator, funNameWhichInside) => {
  if (!funcValidator(val) && arguments.length === 4) {
    throw new Error(`${varName} failed type validation as ${val} in ${funNameWhichInside}`)
  }
  if (!funcValidator(val) && arguments.length === 3) {
    return false
  }
}



module.exports = utilityFunks;
