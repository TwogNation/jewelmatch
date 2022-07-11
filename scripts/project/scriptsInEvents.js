var postMsg = ''

function postText(value){
	console.log('iFrame sender: ' + value) 
	parent.postMessage(value, "*")
}


const scriptsInEvents = {

		async Egame_Event217_Act7(runtime, localVars)
		{
			postText(runtime.globalVars.postMsg)
		}

};

self.C3.ScriptsInEvents = scriptsInEvents;

