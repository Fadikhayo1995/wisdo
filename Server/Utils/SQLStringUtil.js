module.exports = {
  nullifyString:  function (value){
    if (value == null || value.trim() == '') return 'NULL';
    return `'${value.replace(/'/g, "''")}'`;
  },
  nullifyBoolean: function (value) {
    if (value == null || value.toString().trim() == '') return 'NULL';
    return value.toString().toLowerCase().trim() == 'true' ? "TRUE" : "FALSE";
  }
};

// ${closedQuestions && closedQuestions.length ? `'${JSON.stringify(closedQuestions).replace(/'/g, "''")}'` : 'NULL'},
