import { Meteor } from 'meteor/meteor';
import { LinksCollection } from '/imports/api/links';
import './PeopleInitialization';

function insertLink({ title, url }) {
  LinksCollection.insert({ title, url, createdAt: new Date() });
}

Meteor.startup(() => {
  // If the Links collection is empty, add some data.
  if (LinksCollection.find().count() === 0) {
    insertLink({
      title: 'Do the Tutorial',
      url: 'https://www.meteor.com/tutorials/react/creating-an-app',
    });

    insertLink({
      title: 'Follow the Guide',
      url: 'https://guide.meteor.com',
    });

    insertLink({
      title: 'Read the Docs',
      url: 'https://docs.meteor.com',
    });

    insertLink({
      title: 'Discussions',
      url: 'https://forums.meteor.com',
    });
  }

  // We publish the entire Links collection to all clients.
  // In order to be fetched in real-time to the clients
  Meteor.publish("links", function () {
    return LinksCollection.find();
  });
});
