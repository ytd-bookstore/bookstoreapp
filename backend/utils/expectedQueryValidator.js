function expectedQueryValidator(queries, expectedQueries) {
  var isExist = false;
  Object.keys(queries).forEach((query) => {
    if (!expectedQueries.includes(query)) {
      isExist = true;
    }
  });
  return isExist;
}

module.exports = expectedQueryValidator;
