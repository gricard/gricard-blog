---
path: /fixed_macbook_battery_drain
title: Fixed my 2015 MacBook Pro battery problems
date: 2019-04-18T14:24:44
published: true
running_gear_page: false
running_gear_order: 
tags: 
    - tech 
    - macbook 
    - battery 
    - fix
---

**FINALLY!**

I can't tell you how relieved I am to write this. I bought this MacBook Pro 2015 13" on eBay a few months back and the battery life has been *horrible*. By that I mean, if I closed the lid and left it alone, it'd drain about 10% per hour. If I didn't plug it in at night, it'd be totally dead by morning. I thought I bought a dud, even though it showed only 83 cycles in the System Report (meaning it had barely been used). Well, as of yesterday, it's only draining 1-2% overnight now.

It took a while to track down the causes. The main things are some new features Apple has added (which I have no need for). One is Proximity Wake, which essentially keeps bluetooth turned on while alseep to some degree, and wakes your Mac when you get near it with other devices, like your iPhone. Nope. I don't need that. Let's kill it:

```
sudo pmset -a proximitywake 0
```

I then added this to my [new-mac](https://github.com/gricard/new-mac) setup script in [this commit](https://github.com/gricard/new-mac/commit/5e49bb1168cb34badece6114f9016eb706100dcd).

That's one problem taken care of, but I still had power drain occurring. Here's the log output showing it waking up:

```
$ log show --style syslog | grep "Wake reason"
2019-03-20 11:24:12.048950-0400  localhost kernel[0]: (AppleACPIPlatform) AppleACPIPlatformPower Wake reason: RTC (Alarm)
2019-03-20 11:24:12.048952-0400  localhost kernel[0]: (AppleACPIPlatform) AppleACPIPlatformPower Wake reason: RTC (Alarm)
```

I tried a few things I found while googling, but [this fix](# https://forums.macrumors.com/threads/psa-if-your-2015-or-2016-mbp-has-some-battery-drain-while-sleeping-here-is-the-fix.2026702/) seems to have done the trick, but turning on Do Not Disturb while the display is sleeping, as well as turning off the TCP keep alive feature. I was able to automate the setting of these values using PlistBuddy in my new-mac script in [this commit](https://github.com/gricard/new-mac/commit/f29ff15030c70b9a1c5da3aec1d1e0b4056e5caa).

```
MODEL=`ioreg -l | awk '/board-id/{print $4}' | sed 's/[<">]//g'`
sudo /usr/libexec/PlistBuddy -c "Set :IOPlatformPowerProfile:TCPKeepAliveDuringSleep false" /System/Library/Extensions/IOPlatformPluginFamily.kext/Contents/PlugIns/X86PlatformPlugin.kext/Contents/Resources/$MODEL.plist
sudo /usr/libexec/PlistBuddy -c "Set :IOPlatformPowerProfile:DNDWhileDisplaySleeps true" /System/Library/Extensions/IOPlatformPluginFamily.kext/Contents/PlugIns/X86PlatformPlugin.kext/Contents/Resources/$MODEL.plist
```

And that's that. My MacBook Pro's battery lasts as long as it normally should, and I get to keep using this lovely 2015 Mac, the last model before they ruined the keyboards. 😁