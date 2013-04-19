/*global Meteor, Template, Session, EJSON, Visitors: true */
Visitors = new Meteor.Collection("visitors");

if (Meteor.isClient) {
	Template.visits.empty = function () {
		var any = Visitors.findOne({});
		return any ? false : true;
	};

	Template.visits.visitors = function () {
		return Visitors.find({}, {sort: { name: 1}});
	};

	Template.visits.events({
		"submit form": function(event, template) {
			event.preventDefault();
			var name = template.find("input").value;
			var existing = Visitors.findOne({name: name});
			if (existing) {
				Visitors.update(existing._id, {$inc: {visits: 1}});
			} else {
				Visitors.insert({name: name, visits: 1});
			}
		}
	});
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    //Visitors.remove({});
  });
}
