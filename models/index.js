var Sequelize = require('sequelize');

var db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false
});

var Page = db.define('page', {
  title: { type: Sequelize.STRING, allowNull: false },
  urlTitle: {
    type: Sequelize.STRING,
    allowNull: false,
    get: function() {
      return '/wiki/' + this.getDataValue('urlTitle');
    }
  },
  content: { type: Sequelize.TEXT, allowNull: false },
  date: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, validate: { isDate: true } },
  status: { type: Sequelize.ENUM('open', 'closed') },
  tags: {type: Sequelize.ARRAY(Sequelize.STRING)}
  }, {
    classMethods: {
      find: function(arrayOfTags) {
        return Page.findAll( {where: {
          tags: {
            $overlap: arrayOfTags
          }
        }});
      }
    }
  });

  Page.hook('beforeValidate', function(page){
    if (page.title) {
      // Removes all non-alphanumeric characters from title
      // And make whitespace underscore
      page.urlTitle = page.title.replace(/\s+/g, '_').replace(/\W/g, '');
    } else {
      // Generates random 5 letter string
      page.urlTitle = Math.random().toString(36).substring(2, 7);
    }
  });

var User = db.define('user', {
  name: { type: Sequelize.STRING, allowNull: false },
  email: { type: Sequelize.STRING, allowNull: false, isEmail: true }
});

Page.belongsTo(User, { as: 'author' });

module.exports = {
  Page: Page,
  User: User
};
