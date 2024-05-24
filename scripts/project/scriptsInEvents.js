var postMsg = ''

function postText(value){
	console.log('iFrame sender: ' + value) 
	parent.postMessage(value, "*")
}


const scriptsInEvents = {

	async Egame_Event1_Act3(runtime, localVars)
	{
		runtime.globalVars.webSocket.onMessage = (event) => {
		if (event.data.startsWith('s:')){
			const score_ = event.data.split(':')[1];
			console.log(score_);
			runtime.globalVars.score = score_;
			runtime.callFunction("updateScore")
		}
		}
	},

	async Egame_Event218_Act7(runtime, localVars)
	{
		runtime.globalVars.webSocket.close();
	},

	async Egame_Event218_Act8(runtime, localVars)
	{
		window.parent.postMessage("WebSocketClosed", "*");
	},

	async Egame_Event232_Act3(runtime, localVars)
	{
		runtime.globalVars.webSocket.send("s:2")
	},

	async Egame_Event233_Act3(runtime, localVars)
	{
		runtime.globalVars.webSocket.send("s:4")
		
	},

	async Emenu_Event4_Act1(runtime, localVars)
	{
		const queryParams = new URLSearchParams(window.location.search)
		const token = queryParams.get('token');
		const gameId = queryParams.get('gameId');
		console.log("clicked")
					const textInstance = runtime.objects.ErrorText.getFirstInstance()
					textInstance.text = "PLEASE WAIT..."
					const button = runtime.objects.btn_play.getFirstInstance();
					button.destroy(); 
		// Add a variable to track if the WebSocket is already connected or in the process of connecting
		let isWebSocketConnectingOrConnected = false; 
					
		try {
		    // Check if the WebSocket is already connected or in the process of connecting
		    if (!isWebSocketConnectingOrConnected) {
		        const webSocket = new WebSocket('wss://arcade.stage.legacyarcade.com/ws', [token, gameId]);
		        runtime.globalVars.webSocket = webSocket;
		
		        webSocket.onopen = (event) => {
		            isWebSocketConnectingOrConnected = true;  // Set the flag to true when connection is established
		            runtime.callFunction('startendless');
		        };
		
		        webSocket.onclose = (event) => {
		            isWebSocketConnectingOrConnected = false; // Reset the flag when the connection is closed
		        };
		
		        webSocket.onerror = (event) => {
		            isWebSocketConnectingOrConnected = false; // Reset the flag on error
		        };
		
		        runtime.globalVars.playable = 1;
		    }
		} catch (e) {
		    const textInstance = runtime.objects.ErrorText.getFirstInstance();
		    textInstance.text = "ERROR CONNECTING";
		    console.log("error connecting to server", e);
		}
		
		
		
		
	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

