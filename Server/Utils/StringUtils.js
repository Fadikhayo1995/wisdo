module.exports = {
  getFirstNWords: function (num, value) {
    var wordsCount = 0;
    var newString = '';
    value = value.replace(/\s\s+/g, ' ');

    for (var index = 0; index < value.length; index++){
      if (value[index].match(/[^a-zA-Z0-9,.']/g)) {
        wordsCount++;
      }
      newString += value[index];
      if (num == wordsCount) {
        break;
      }
    }
    return newString.trim();
  },
 
};
