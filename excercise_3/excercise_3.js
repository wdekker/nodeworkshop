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
		}
	});
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    //Visitors.remove({});
  });
}
