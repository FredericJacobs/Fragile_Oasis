var list = [
	"midp","240x320","blackberry","netfront","nokia","panasonic",
	"portalmmm","sharp","sie-","sonyericsson","symbian",
	"windows ce","benq","mda","mot-","opera mini",
	"philips","pocket pc","sagem","samsung","sda",
	"sgh-","vodafone","xda","palm","iphone",
	"ipod","android","iPad", "ipad"
];

var uagent = navigator.userAgent.toLowerCase(); 
isMobile = false;

for(var d=0;d<list.length;d+=1){
	if(uagent.indexOf(list[d])!=-1) {
		isMobile = true;
	}
}
