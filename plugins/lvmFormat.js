export function lvmToList(lvmText) {
  let formatedList = [];
  let rowList = lvmText.split('\r\n');
  rowList.map(row => {
    let divRow = row.split('\t');
    formatedList.push(Number(divRow[1]))
  });
  return formatedList;
}

export function maxTimeCount(datasetList) {
  let maxLength = 0;
  datasetList.map(dataset => {
    if (dataset.data.length >= maxLength) {
      maxLength = dataset.data.length;
    }
  });
  return maxLength;
}