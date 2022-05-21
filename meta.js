console.log('\033[2J');

function newmenu() {
	console.log('\033[2J');
	process.stdout.write(cooliotext)
}
  //Clears "node" bit
  var cooliotext = `\n                                  
 Node █▀█ ▄▀█ █▀▄ █ █▀█ ▀█▀ █▀▀ ▀▄▀ ▀█▀
      █▀▄ █▀█ █▄▀ █ █▄█ ░█░ ██▄ █░█ ░█░ by LarryTLlama\n`
	  
	  process.stdout.write(cooliotext)

//Fancy text

const { Parser } = require('icecast-parser');
const inquirer = require('inquirer');
const notifier = require('node-notifier');
const { exec } = require('node:child_process');
var str = '';
var oldstr = '';
var no = 0;
var notifications = true
var fs = require('fs')
 var overview = '';
var player = require('play-sound')(opts = { player: "../assets/mplayer.exe" })


//Load the data from data.json
const { option, customstations, autoplay } = require('../assets/data.json');



//Anyone else pronounce JSON like Jason? Nope, just me? Okayyyyy *sighs*
var autoplayswitch = autoplay
async function toggleAutoplay() {
	view.log('Yeah sorry, autoplay is a bit weird at the minute. Try pressing "P" to start again.')
	fs.readFile('../assets/data.json', async function read(err, data) {
    if (err) {
        throw err;
    }
    const content = data;
	//console.log(content);
	if(content.autoplay = "ON") {
	content.autoplay = "OFF"
	autoplayswitch = "OFF"
	view.log('Autoplay switched to OFF!')
	} else {
	content.autoplay = "ON"
	autoplayswitch = "ON"
	view.log('Autoplay switched to ON!')
	}
	const jsonData = content
	//console.log(jsonData);
	return fs.writeFileSync("../assets/data.json", jsonData);
});
	
}


//Main menu
async function main() {

inquirer
  .prompt([
    {
      type: 'list',
      name: 'main',
      message: '\nWelcome to Node RadioText\n',
      choices: [
        'Start'//,
		//`Toggle Autoplay (Currently ${autoplayswitch})`,
      ],
    },
  ])
  .then((answers) => {
	  newmenu();
	  if(answers.main === `Toggle Autoplay (Currently ${autoplayswitch})`) {
		 newmenu()
		 toggleAutoplay()
		 return main();
	  } else if(answers.main === "Start") {
		  return start();
	  }
	    
  });
  console.log('Main')
}

async function options() {
var noti = null;
if(notifications = true) {
	noti = 'Turn Notifications Off';
} else {
	noti = 'Turn Notifications On';
}

inquirer
  .prompt([
    {
      type: 'list',
      name: 'options',
      message: '\nNode RadioText Options\n',
      choices: [
        noti,
		'Back to menu',
      ],
    },
  ])
  .then((answers) => {
	  newmenu();
	  //console.log('\n\n\n\n\n\n', JSON.stringify(answers))
	  if(answers.options === 'Turn Notifications Off' || answers.pause === 'Turn Notifications On') {
		notifications = false
		return optionstog()
	  } else if(answers.options === "Back To Menu") {
		return main()
	  } else {
		  //return main();
	  }
	    
  });
  
}





//Start menu (select station)  

function start() {

inquirer
  .prompt([
    {
      type: 'list',
      name: 'start',
      message: '\nRadioText by LarryTLlama\nSelect a station',
      choices: [
        'Capital Dance',
		'Capital FM',
		'Custom Links',
		'Other...',
		'Back',
      ],
    },
  ])
  .then((answers) => {
	  newmenu();
	  if(answers.start === "Capital Dance") {
		  //Run interface but with the Capital Dance link
		  return interface('https://icecast.thisisdax.com/CapitalDanceMP3');
	  } else if(answers.start === "Capital FM") {
		  //Run interface but with Capital link
		  return interface('https://icecast.thisisdax.com/Capital');
	  } else if(answers.start === "Custom Links") {
		  return custom()
	  } else if(answers.start === "Other...") {
		  //Go to input panel
		 return other();
	  } else if(answers.start === 'Back') {
		  main()
	  }
	    
  });
  
}

//Stations put into the data.json file

var cs = customstations
var alljsonlinks = cs.c1 + cs.c2 + cs.c3 + cs.c4 + cs.c5 + cs.c6 + cs.c7 + cs.c8 + cs.c9 + cs.c10

async function custom() {

//If theres no entries put into the data file...

if(alljsonlinks === '') {
	inquirer
  .prompt([
    {
      type: 'list',
      name: 'customnone',
      message: '\nYou haven\'t got any custom links - Put some in data.json! \n',
      choices: [
        'Back to Main Menu',
		//'Options',
      ],
    },
  ])
  .then((answers) => {
	  newmenu();
	return main();
  });
} else {
//Create an array for all the values to be put in
var coolarray = [ cs.c1, cs.c2, cs.c3, cs.c4, cs.c5, cs.c6, cs.c7, cs.c8, cs.c9, cs.c10]

var coolerarray = coolarray.filter(s => s.length > 0);


inquirer
  .prompt([
    {
      type: 'list',
      name: 'custom',
      message: '\nWelcome to Node RadioText\n',
      choices: coolerarray,
    },
  ])
  .then((answers) => {
	  newmenu();
	  return interface(answers.custom);
  });
}
}

//Other Stations (Other links)

function other() {
	inquirer
	.prompt([
	{
    type: 'input',
    name: 'getOther',
    message: '\nRadiotext by LarryTLlama\nPaste (or type) in a stream link!\n',
  },
  ]).then((answers) => {
	  newmenu();
	return interface(answers.input);
  });
}

var paused = true

var thing = null;

async function togglePlay(link) {
	if(thing) {
		var alive = true
	} else {
		var alive = false
	}
	
	if(alive = false) {
	thing = player.play(link, { mplayer: ['−volume', 50 ]}, function(err){
  if (err && !err.killed) throw err
  })
  paused = false;
	} else if(alive = true) {
		if(thing) {
		thing.kill()
		thing = null;
		paused = true;
		}
togglePlay
	
}
}


var audio = '';
var stop = false

var double_esc = 1
function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

var log = '';
var title = null;

var epiktitle = `
 Node                             
 █▀█ ▄▀█ █▀▄ █ █▀█ ▀█▀ █▀▀ ▀▄▀ ▀█▀
 █▀▄ █▀█ █▄▀ █ █▄█ ░█░ ██▄ █░█ ░█░
	                     by LarryTLlama`
						 
						 
function view(link) {
	

		  
	  var blessed = require('blessed')
var contrib = require('blessed-contrib')
var screen = blessed.screen()

var barops = [
	[1, 2, 3, 4],
	[2,1,2,3],
	[3, 2,1,2],
	[4,3,2,1],
	[3,4,3,2],
	[2,3,4,2]
	
];



   var grid = new contrib.grid({rows: 12, cols: 12, screen: screen})

   //grid.set(row, col, rowSpan, colSpan, obj, opts)
   //Position v, position h, height, width
   var log = grid.set(0, 4, 4, 4, contrib.log, {label: 'Console', fg: "green", selectedFg: "green", })
      /*var log = contrib.log(
      { fg: "green"
      , selectedFg: "green"
      , label: 'Server Log'})
   log.log("new log line")*/
   
   var bar = grid.set(0, 8, 4, 4, contrib.bar, {label: 'Audio Graph'
       , barWidth: 4
       , barSpacing: 6
       , xOffset: 4
       , maxHeight: 9})
	       //screen.append(bar) //must append before setting data
		   
		   	
   
		   var setthebar = setInterval(function () {
			   bar.setData(
       { titles: [' ', ' ', ' ', ' ']
       , data: barops[Math.floor(Math.random() * barops.length)]})
	   var box = grid.set(0, 0, 2, 2, blessed.box, {content: `Listening to: ${overview}`, label: 'Now playing'})
	   var box = grid.set(2, 0, 2, 4, blessed.box, {content: `Now playing: ${title}`, label: `Now playing`})
		   screen.render()
		   }, 1000)
    bar.setData(
       { titles: ['One', 'Two', 'Three', 'Four']
       , data: [Math.floor(Math.random() * 11), Math.floor(Math.random() * 11), Math.floor(Math.random() * 11), Math.floor(Math.random() * 11)], length: 4})
   
   var box = grid.set(5, 10, 2, 2, blessed.box, {content: 'Press ESC to go back to the main menu.\nPress P to pause audio', label: 'Actions Panel'})
   
   var box = grid.set(10, 0, 2, 12, blessed.box, {content: `${epiktitle}`, label: 'Title', align: 'center'})
   
    var box = grid.set(5, 0, 2, 2, blessed.box, {content: `AutoPlay is ${autoplay}\n\nPress ENTER to toggle autoplay`, label: 'Settings Panel'})
   
   var box = grid.set(0, 2, 2, 2, blessed.box, {content: `MPlayer is loading... Please wait a minute or two!\nNot working? Press P to play!`, label: 'MPlayer Status'})
   
    view.log = function(str){
	   log.log(str);
   }
   
   var datTune = player.play(link, { mplayer: ['−volume', 50 ]}, function(err){
  if (err && !err.killed) throw err
  view.log('Starting MPlayer...')
})
   
	screen.key(['escape'], function(ch, key) {
		view.log('Escape key pressed. Going back to main menu....')
	   newmenu();
		datTune.kill()
		clearInterval(setthebar)
		return main();
   });
   screen.key(['enter'], async function(ch, key) {
	   return view.log('Gimme a bit, I\'m still working on AutoPlay!')
	   await toggleAutoplay()
	   
		var box = grid.set(5, 0, 2, 2, blessed.box, {content: `AutoPlay is ${autoplayswitch}\n\nPress ENTER to toggle autoplay`, label: 'Settings Panel'})
     
   });
   
   screen.key(['delete'], async function(ch, key) { 
     process.exit(0)
   });
   
   screen.render()
   
   //Logs log logs
  
	
view.log('Loading stream! Please wait a couple seconds!')
	}


//Main RadioText interface
 async function interface(link) {
	  //Loading bit
	  
	  function load() {
	  process.stdout.moveCursor(0, -1) // up one line
	process.stdout.clearLine(1) // from cursor to end
	  }
	  
	  console.log('Loading view  /')
	  await delay(250)
		load()
		
	  console.log('Loading view  -')
	  await delay(250)
		load()
	
	  console.log('Loading view  \\ ')
	  await delay(250)
		load()
		
	  console.log('Loading view  |')
	  await delay(250)
		load()
		
	  console.log('Loading view  /')
	  await delay(250)
		load()
	  console.log('Loading view  -')
	  await delay(250)
		load()
	  console.log('Loading view  \\ ')
	  //await delay(250)
		//load()
		
		
	  paused = true
	 
	  
	  if(autoplay === "ON") {
	  if(thing === null) {
		  paused = false
	 thing = player.play(link, { mplayer: ['−volume', 50 ]}, function(err){
  if (err && !err.killed) throw err
})
	  }
	  }


	  
	  if(link === 'https://icecast.thisisdax.com/Capital') {
		  overview = 'Capital'
	  } else if(link === 'https://icecast.thisisdax.com/CapitalDanceMP3') {
		  overview = 'Capital Dance'
	  } else {
		  overview = link
	  }
	  
	  

var no = 0;

var oldtitle = null;
var oldertitle = null;
var first = true;

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

//Makes the thing actually work

const radioStation = new Parser({
  autoUpdate: true,
  emptyInterval: 5 * 60,
  errorInterval: 10 * 60,
  keepListen: false,
  metadataInterval: 5,
  notifyOnChangeOnly: false,
  url: link,
});



//console.log('Loading RadioText... Please wait')
radioStation.on('metadata', (metadata) => {
	
	if(paused = false) {
		return;
	}
	title = `${metadata.get('StreamTitle') ?? 'unknown'}`
	
	if(title === oldtitle || title === oldertitle) {
		return;
	}
	if(overview === 'Capital Dance' && title.includes(";StreamUrl=")) {
		title = 'Ad Break';
	}
	if(option.ignoredtext.includes(title)) {
		title = 'Ad Break';
	}
	
	if(title != 'Ad Break') {
	view.log('New song: ' + title)
	}
	//process.stdout.moveCursor(0, -1) // up one line
	//process.stdout.clearLine(1) // from cursor to end
	//console.log("\x1b[32m", "\x1b[5m", title, "\x1b[0m");
	//console.log(metadata)
	oldertitle = oldtitle
	oldtitle = title
	if(notifications = true) {
		if(title === 'Ad Break') {
			return;
		}
	notifier.notify({
	title: `${overview}`, // the title
	message: title, // the message below the title
	icon: ("icon.png"), // optional: the icon
	wait: true
	})
	}
	
	
	//Should stop it refreshing too often, causing some high CPU usage issues I ran into
	delay(5000)
})
	  //SCREEN LAYOUT THINGYMABOB
view(link)

var epiktitle = `
 Node                             
 █▀█ ▄▀█ █▀▄ █ █▀█ ▀█▀ █▀▀ ▀▄▀ ▀█▀
 █▀▄ █▀█ █▄▀ █ █▄█ ░█░ ██▄ █░█ ░█░
	                     by LarryTLlama`
						 
view.log(' Node')
view.log(' █▀█ ▄▀█ █▀▄ █ █▀█ ▀█▀ █▀▀ ▀▄▀ ▀█▀')
view.log(' █▀▄ █▀█ █▄▀ █ █▄█ ░█░ ██▄ █░█ ░█░')
view.log('You\'ll get notifications and a log that appears here!')
//End of screen layout
  }

/**/



//End of Interface

//Pause Menu

async function pause(link) {

inquirer
  .prompt([
    {
      type: 'list',
      name: 'pause',
      message: '\nNode RadioText Paused\n',
      choices: [
        'Resume',
		'Exit',
      ],
    },
  ])
  .then((answers) => {
	    paused = true
	  if(answers.pause === 'Resume') {
		  //Re-runs the radiotext
		  paused = false
		newmenu()
		return interface(link);
	  } else if(answers.pause === 'Exit') {
		  //Back to main menu
		newmenu();
		thing.kill();
		thing = null;
		return main();
		
	  } else {
		  //Hmm yeah I broke some stuff once. Lets forget about that and move on...
		  newmenu();
		   console.log('\nWe couldn\'t get your input - Returning back to the main menu!\n')
			return main();
	  }
	    
  });
  
}
main()

process.on('uncaughtException', err => {
	if(err.code === 'ETIMEDOUT' || err.code === 'ECONNRESET') {
		//Yesss I know its bad practice, but the icecast-parser module throws these errors too often, and I'm lazy :)
		return;
	}
  //console.error('There was an uncaught error', err);
  view.log(`Error! ${err}`);
  //fs.writeFileSync("./error.txt", err.toString);
  //process.exit(1); // mandatory (as per the Node.js docs)
});

//verystarter()