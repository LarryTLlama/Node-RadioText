This repo is no longer being updated, but the app should still work. See the Installation notes below, and download from the releases page :)
P.S Check out the GetRadio Project repository if you want the same thing, in a more user-friendly way

# Node-RadioText
A windows RadioPlayer coded in NodeJS, and built through the terminal!

![image](https://user-images.githubusercontent.com/79579625/170117700-ea07bf1b-77eb-40dc-8e00-08c6fa117a66.png)


## Features
- Plays RadioStations (Thanks to MPlayer - http://www.mplayerhq.hu/)
- Displays Now-Playing information powered by the MetaData most stations send out
- Fetches station data from https://radio-browser.info so you can play all your favourite stations through our player!
- Notification system (Thanks to the Node-Notifier module)

## Installation:
Head to the Releases Page (https://github.com/LarryTLlama/Node-RadioText/releases). 
Download the installer, and run it OR Download the ZIP Package and install it!


## Using the program
- On start, press enter to go to the Station Select Menu
- Use the arrow keys to navigate up and down the menus
- Press enter
- To add in a new station and save it, go to the assets/data.json folder, and add a streaming link under the customstations section in any slot (you can remove some presets if you wish). Restart Node RadioText and choose the Custom Stations option.
- To not save it, choose the Other option in the Station Select menu, and type in the link. Hit enter once you're done.

## Getting streaming links
You can find a list of streaming links at https://www.radio-browser.info/. (Node Radiotext isn't affliated in any way btw).
Search for your favourite radio station and copy the URL bit.

### Known Bugs:
- High CPU Issues after leaving on for a while
- Issues navigating the Main Menu after exiting to it (from main interface)
- Pause button not working

### Upcoming Features:
- Debug setting
- Working audio graph
