var Observable = require("data/observable").Observable;
var pushPlugin = require("nativescript-push-notifications");

/*function getMessage(counter) {
    if (counter <= 0) {
        return "Hoorraaay! You unlocked the NativeScript clicker achievement!";
    } else {
        return counter + " taps left";
    }
}*/

function createViewModel() {
    var viewModel = new Observable();
   /* viewModel.counter = 42;
    viewModel.message = getMessage(viewModel.counter);

    viewModel.onTap = function() {
        this.counter--;
        this.set("message", getMessage(this.counter));
    }*/

	var settings = {
		// Android settings
		senderID: '439644384056', // Android: Required setting with the sender/project number
		notificationCallbackAndroid: function(message, pushNotificationObject) { // Android: Callback to invoke when a new push is received.
			console.log("Received notification::"+ message);
			alert("Received notification::"+message);
		},

		// iOS settings
		badge: true,
		sound: true,
		alert: true,
		interactiveSettings: {
			actions: [{
				identifier: 'READ_IDENTIFIER',
				title: 'Read',
				activationMode: "foreground",
				destructive: false,
				authenticationRequired: true
			}, {
				identifier: 'CANCEL_IDENTIFIER',
				title: 'Cancel',
				activationMode: "foreground",
				destructive: true,
				authenticationRequired: true
			}],
			categories: [{
				identifier: 'READ_CATEGORY',
				actionsForDefaultContext: ['READ_IDENTIFIER', 'CANCEL_IDENTIFIER'],
				actionsForMinimalContext: ['READ_IDENTIFIER', 'CANCEL_IDENTIFIER']
			}]
		},
		// Callback to invoke, when a push is received on iOS
		notificationCallbackIOS: function(message) {
			console.log("Received notification::"+ JSON.stringify(message));
			alert("Received notification::"+JSON.stringify(message));
		}
	};


	pushPlugin.register(settings,
		// Success callback
		function(token) {
			// if we're on android device we have the onMessageReceived function to subscribe
			// for push notifications
			if(pushPlugin.onMessageReceived) {
				pushPlugin.onMessageReceived(settings.notificationCallbackAndroid);
			} else { //iOS
				// Register the interactive settings
				if (settings.interactiveSettings) {
					pushPlugin.registerUserNotificationSettings(function () {
						console.log('Successfully registered for interactive push.');
					}, function (err) {
						console.log('Error registering for interactive push: ' + JSON.stringify(err));
					});
				}
			}
			alert('Device registered successfully::' + token);
			console.log('Device registered successfully::'+ token);
		},
		// Error Callback
		function(error){
			alert(error.message);
		}
	);

	return viewModel;
}



exports.createViewModel = createViewModel;