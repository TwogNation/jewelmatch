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

	async Egame_Event217_Act7(runtime, localVars)
	{
		runtime.globalVars.webSocket.close();
	},

	async Egame_Event231_Act3(runtime, localVars)
	{
		runtime.globalVars.webSocket.send("s:2")
	},

	async Egame_Event232_Act3(runtime, localVars)
	{
		runtime.globalVars.webSocket.send("s:4")
		
	},

	async Emenu_Event4_Act1(runtime, localVars)
	{
		const queryParams = new URLSearchParams(window.location.search)
		const token = queryParams.get('token');
		const gameId = queryParams.get('gameId');
		
		try{
			const webSocket = new WebSocket('wss://arcade.stage.legacyarcade.com/ws', [token,gameId]);
			runtime.globalVars.webSocket = webSocket;
			webSocket.onopen = (event) =>{
				runtime.callFunction('startendless');
			};
		}catch(e){
			const textInstance = runtime.objects.ErrorText.getFirstInstance()
			textInstance.text = "ERROR CONNECTING"
			console.log("error connecting to server", e)
		}
	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

