console.log("TCL: global.localStorage", global.localStorage)
global.window = {}
import 'mock-local-storage'
window.localStorage = global.localStorage