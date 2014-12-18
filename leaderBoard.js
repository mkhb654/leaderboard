PlayersList = new Mongo.Collection('players');
PlayersList.insert({
  name: "David",
  score: 0
});

if(Meteor.isServer) {
    Meteor.publish('thePlayer', function () {
        var currentUserId = this.userId()
        {
            var currentUserId = this.userId();
            return PlayersList.find({createdBy: currentUserId})

        }
    });
    Meteor.methods({
        'insertPlayerData': function (playerNameVar) {
            var currentUserId = Meteor.user.Id();

            PlayersList.insert({
                name: playerNameVar,
                score: 0,
                createdBy: currentUserId

            });
        },
        'modifyPlayerScore': function (selectedPlayer, scoreValue) {
            PlayersList.update(selectedPlayer, {$inc: {score: scoreValue}});

        }
    });
}


if(Meteor.isClient){
   Template.leaderboard.helpers({
       'player': function () {
           return PlayersList.find()
       },
       'selectedClass': function () {
           var playerId = this._id;
           var selectedPlayer = Session.get('selectedPlayer');
       if(playerId == selectedPlayer) {


           return "selected"


       }
       },
       'showSelectedPlayer': function() {
           var selectedPlayer = Session.get('selectedPlayer');
           return PlayersList.findOne(selectedPlayer)
       }


   })

    Template.MuntazParty.helpers({
        'Muntaz Kaleem Function': function(){
            return "Tonight we are Going For Fun"
        }
    })

    Template.leaderboard.events({
        'click .player': function(){
            var playerId = this ._id;

            Session.set('selectedPlayer' , playerId);

        },
        'click .increment': function(){
        var selectedPlayer = Session.get('selectedPlayer');
       // console.log('selectedPlayer');
        PlayersList.update( selectedPlayer, {$set: {score: 5} });
        },
        'click .decrement': function(){

            var selectedPlayer = Session.get('selectedPlayer')
        }


    });


}
