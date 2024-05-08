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

	async Egame_Event217_Act8(runtime, localVars)
	{
		window.parent.postMessage("WebSocketClosed", "*");
	},

	async Egame_Event231_Act3(runtime, localVars)
	{
		runtime.globalVars.webSocket.send("s:2")
	},

	async Egame_Event232_Act3(runtime, localVars)
	{
		runtime.globalVars.webSocket.send("s:4")
		
	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

