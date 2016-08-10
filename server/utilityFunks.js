let utilityFunks = {};

utilityFunks.extractFileName = (fileNameStr) => {
  let fileNameWithoutExtension;
  let indexOfLastDot = fileNameStr.lastIndexOf('.');
  indexOfLastDot = (indexOfLastDot === -1) ?  fileNameStr.length : indexOfLastDot;
  fileNameWithoutExtension = fileNameStr.slice(0, indexOfLastDot);
  return fileNameWithoutExtension;
};



module.exports = utilityFunks;
