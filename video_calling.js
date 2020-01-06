
var user_uid;
var id="";
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

		id=user.uid;
		console.log(user_uid);
		//login_sinch(id);
    login_sinch("38l08HvGr4hUutPUQNe1Sx1cITp2");
    console.log("Logging in");
  } else {
    login_sinch("38l08HvGr4hUutPUQNe1Sx1cITp2");
    // No user is signed in.
    alert("you need to login first");
  }
});

var global_username = '';
console.log(document.getElementById('videoincoming'));

/*** After successful authentication, show user interface ***/

var showUI = function() {
	$('div#call').show();
	$('form#userForm').css('display', 'none');
	$('div#userInfo').css('display', 'inline');
	$('h3#login').css('display', 'none');
	$('video').show();
	$('span#username').text(global_username);
}


/*** If no valid session could be started, show the login interface ***/

var showLoginUI = function() {
	$('form#userForm').css('display', 'inline');
}


//*** Set up sinchClient ***/

sinchClient = new SinchClient({
	applicationKey: '479da4db-738f-48a5-bc68-ca939fec849a',
	capabilities: {calling: true, video: true},
	supportActiveConnection: true,
	//Note: For additional loging, please uncomment the three rows below
	onLogMessage: function(message) {
		console.log(message);
	},
});

sinchClient.startActiveConnection();
console.log(sinchClient);
/*** Name of session, can be anything. ***/
var sessionName = 'sinchSessionVIDEO-' + sinchClient.applicationKey;
function login_sinch(user_uid){

	var signInObj = {};
	// function create_sinch_user(user_uid){
	//
	// 	sinchClient.newUser(signUpObj, function(ticket) {
	// 		//On success, start the client
	// 		sinchClient.start(ticket, function() {
	// 			global_username = signUpObj.username;
	// 			//On success, show the UI
	// 			showUI();
	//
	// 			//Store session & manage in some way (optional)
	// 			localStorage[sessionName] = JSON.stringify(sinchClient.getSession());
	// 		});
	// 	});
	// }
		console.log(user_uid);
		signInObj.username = user_uid;
		signInObj.password = user_uid;

		//Use Sinch SDK to authenticate a user
		sinchClient.start(signInObj, function() {
			global_username = signInObj.username;
			//On success, show the UI
			showUI();

			//Store session & manage in some way (optional)
			localStorage[sessionName] = JSON.stringify(sinchClient.getSession());
		});

}

/*** Check for valid session. NOTE: Deactivated by default to allow multiple browser-tabs with different users. ***/

var sessionObj = JSON.parse(localStorage[sessionName] || '{}');
if(sessionObj.userId) {
	sinchClient.start(sessionObj)
		.then(function() {
			global_username = sessionObj.userId;
			//On success, show the UI
			showUI();
			//Store session & manage in some way (optional)
			localStorage[sessionName] = JSON.stringify(sinchClient.getSession());
		})
		.fail(function() {
			//No valid session, take suitable action, such as prompting for username/password, then start sinchClient again with login object
			showLoginUI();
		});
}
else {
	showLoginUI();
}


/*** Create user and start sinch for that user and save session in localStorage ***/

$('button#createUser').on('click', function(event) {
	event.preventDefault();
	$('button#loginUser').attr('disabled', true);
	$('button#createUser').attr('disabled', true);
	clearError();

	var signUpObj = {};
	user_uid="38l08HvGr4hUutPUQNe1Sx1cITp2";
	signUpObj.username =user_uid;
	signUpObj.password =user_uid;

	//Use Sinch SDK to create a new user
	sinchClient.newUser(signUpObj, function(ticket) {
		//On success, start the client
		sinchClient.start(ticket, function() {
			global_username = signUpObj.username;
			//On success, show the UI
			showUI();

			//Store session & manage in some way (optional)
			localStorage[sessionName] = JSON.stringify(sinchClient.getSession());
		}).fail(handleError);
	}).fail(handleError);
});


/*** Login user and save session in localStorage ***/

$('button#loginUser').on('click', function(event) {
	event.preventDefault();
	$('button#loginUser').attr('disabled', true);
	$('button#createUser').attr('disabled', true);
	clearError();

	var signInObj = {};
	user_uid="38l08HvGr4hUutPUQNe1Sx1cITp2";
	signInObj.username = user_uid;
	signInObj.password = user_uid;

	//Use Sinch SDK to authenticate a user
	sinchClient.start(signInObj, function() {
		global_username = signInObj.username;
		//On success, show the UI
		showUI();

		//Store session & manage in some way (optional)
		localStorage[sessionName] = JSON.stringify(sinchClient.getSession());
	}).fail(handleError);
});

/*** Create audio elements for progresstone and incoming sound */
// const audioProgress = document.createElement('audio');
// const audioRingTone = document.createElement('audio');
// const videoIncoming = document.getElementById('videoincoming');
// const videoOutgoing = document.getElementById('videooutgoing');

/*** Define listener for managing calls ***/
var callListeners = {
	onCallProgressing: function(call) {
    audioProgress = document.createElement('audio');
    alert("Call Progressing");
    audioRingTone = document.createElement('audio');
    videoOutgoing=document.getElementById('videooutgoing');
    console.log(videoOutgoing);
		audioProgress.src = 'style/ringback.wav';
		audioProgress.loop = true;
		audioProgress.play();
		videoOutgoing.srcObject = call.outgoingStream;

		//Report call stats
		$('div#callLog').append('<div id="stats">Ringing...</div>');
	},
	onCallEstablished: function(call) {
    alert("Established");
    videoIncoming = document.getElementById('videoincoming');
		videoIncoming.srcObject = call.incomingStream;
    audioProgress = document.createElement('audio');
    audioRingTone = document.createElement('audio');
		audioProgress.pause();
		audioRingTone.pause();
		//Report call stats
		var callDetails = call.getDetails();
		$('div#callLog').append('<div id="stats">Answered at: '+(callDetails.establishedTime && new Date(callDetails.establishedTime))+'</div>');
	},
	onCallEnded: function(call) {
    videoOutgoing=document.getElementById('videooutgoing');
    videoIncoming = document.getElementById('videoincoming');
    audioRingTone = document.createElement('audio');
    audioProgress = document.createElement('audio');
		audioProgress.pause();
		audioRingTone.pause();
		videoIncoming.srcObject = null;
		videoOutgoing.srcObject = null;

		$('button').removeClass('incall');
		$('button').removeClass('callwaiting');

		//Report call stats
		var callDetails = call.getDetails();
		$('div#callLog').append('<div id="stats">Ended: '+new Date(callDetails.endedTime)+'</div>');
		$('div#callLog').append('<div id="stats">Duration (s): '+callDetails.duration+'</div>');
		$('div#callLog').append('<div id="stats">End cause: '+call.getEndCause()+'</div>');
		if(call.error) {
			$('div#callLog').append('<div id="stats">Failure message: '+call.error.message+'</div>');
		}
	}
}

/*** Set up callClient and define how to handle incoming calls ***/

var callClient = sinchClient.getCallClient();
callClient.initStream().then(function() { // Directly init streams, in order to force user to accept use of media sources at a time we choose
	$('div.frame').not('#chromeFileWarning').show();
});
var call;

callClient.addEventListener({
  onIncomingCall: function(incomingCall) {
	//Play some groovy tunes

	//Open Modal
  videoOutgoing=document.getElementById('videooutgoing');
  videoIncoming = document.getElementById('videoincoming');
  audioRingTone = document.createElement('audio');
  audioProgress = document.createElement('audio');
	audioRingTone.src = 'style/phone_ring.wav';
	audioRingTone.loop = true;
	audioRingTone.play();
	$("#myModal").modal('show');

	//Print statistics
	$('div#callLog').append('<div id="title">Incoming call from ' + incomingCall.fromId + '</div>');
	$('div#callLog').append('<div id="stats">Ringing...</div>');
	$('button').addClass('incall');

	//Manage the call object
    call = incomingCall;
    call.addEventListener(callListeners);
	$('button').addClass('callwaiting');

	//call.answer(); //Use to test auto answer
	//call.hangup();
  }
});


function answer(){

	//document.getElementById("answer").click();
  videoOutgoing=document.getElementById('videooutgoing');
  videoIncoming = document.getElementById('videoincoming');
  audioRingTone = document.createElement('audio');
  audioProgress = document.createElement('audio');
  console.log("Came here");
  console.log("Answering now");
  call.answer();
  $('button').removeClass('callwaiting');
}


function call(id){
  $("#myModal").modal('show');
  console.log("CLicking call button");
  videoOutgoing=document.getElementById('videooutgoing');
  videoIncoming = document.getElementById('videoincoming');
  audioRingTone = document.createElement('audio');
  audioProgress = document.createElement('audio');
  if(!$(this).hasClass("incall") && !$(this).hasClass("callwaiting")) {
		clearError();

		$('button').addClass('incall');

		$('div#callLog').append('<div id="title">Calling ' +"h9m5EnsIMRaZrdSPPnPMpkkvQ4v2"+'</div>');

		console.log('Placing call to: ' + $('input#callUserName').val());
		//call = callClient.callUser($('input#callUserName').val());

    //call=callClient.callUser(id);
    call = callClient.callUser("h9m5EnsIMRaZrdSPPnPMpkkvQ4v2");

		call.addEventListener(callListeners);

  }
	//document.getElementById("call").click();
}

$('button#answer').click(function(event) {
	event.preventDefault();

	console.log("Button#answer");
	if($(this).hasClass("callwaiting")) {
		clearError();

		try {
			call.answer();
			$('button').removeClass('callwaiting');
		}
		catch(error) {
			handleError(error);
		}
	}
});

/*** Make a new data call ***/

$('button#call').click(function(event) {
	event.preventDefault();
  //alert(string);
  console.log("Bro");
	if(!$(this).hasClass("incall") && !$(this).hasClass("callwaiting")) {
		clearError();

		$('button').addClass('incall');

		$('div#callLog').append('<div id="title">Calling ' + $('input#callUserName').val()+'</div>');

		console.log('Placing call to: ' + $('input#callUserName').val());
		call = callClient.callUser($('input#callUserName').val());

		call.addEventListener(callListeners);
	}
});

/*** Hang up a call ***/
function hangup(){

	document.getElementById('hangup').click();
}
$('button#hangup').click(function(event) {
	event.preventDefault();

	if($(this).hasClass("incall")) {
		clearError();

		console.info('Will request hangup..');

		call && call.hangup();
	}
});

/*** Log out user ***/

$('button#logOut').on('click', function(event) {
	event.preventDefault();
	clearError();

	//Stop the sinchClient
	sinchClient.terminate();
	//Note: sinchClient object is now considered stale. Instantiate new sinchClient to reauthenticate, or reload the page.

	//Remember to destroy / unset the session info you may have stored
	delete localStorage[sessionName];

	//Allow re-login
	$('button#loginUser').attr('disabled', false);
	$('button#createUser').attr('disabled', false);

	//Reload page.
	window.location.reload();
});

function logout(){
	sinchClient.terminate();

	delete localStorage[sessionName];
	window.location.reload();
}

/*** Handle errors, report them and re-enable UI ***/

var handleError = function(error) {
	//Enable buttons
	$('button#createUser').prop('disabled', false);
	$('button#loginUser').prop('disabled', false);

	//Show error
	$('div.error').text(error.message);
	$('div.error').show();
}

/** Always clear errors **/
var clearError = function() {
	$('div.error').hide();
}

/** Chrome check for file - This will warn developers of using file: protocol when testing WebRTC **/
if(location.protocol == 'file:' && navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
	$('div#chromeFileWarning').show();
}

$('button').prop('disabled', false); //Solve Firefox issue, ensure buttons always clickable after load
