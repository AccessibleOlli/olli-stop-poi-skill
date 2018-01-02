module.exports = (location) => {
  let ollistop = location.toLowerCase();
  if (ollistop === 'mayo gonda') {
    return [44.022351687354, -92.467148454828];
  }
  else if (ollistop === 'peace plaza') {
    return [44.022475156222, -92.464548669579];
  }
  else if (ollistop === 'historic 3rd street' || ollistop === 'restaurant district') {
    return [44.020596506866, -92.464536948532];
  }
  else if (ollistop === 'discovery square') {
    return [44.019369728467, -92.466721277482];
  }
  else if (ollistop === 'mayo guggenheim') {
    return [44.020779972144, -92.467330873686];
  }
  return null;
}