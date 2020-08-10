function hbsHelpers(hbs) {
    return hbs.create({
      helpers: {
        select: (selected, options) => {
            return options.fn(this).replace(
                new RegExp(' value=\"' + selected + '\"'),
                '$& selected="selected"');
        }
      }
    });
  }
  
  module.exports = hbsHelpers;