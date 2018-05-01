---
layout: post
title:  "How to Setup Touchpad Gestures in your Ubuntu Laptop"
date:   2017-09-24 22:30:00 +0000
lang:   en
thumbnail: macbook_pro-trackpad.jpg
---

If you ever used a MacBook (or if you have a Windows 10 laptop with a compatible touchpad), you know how pleasant and useful can be the trackpad gestures to change desktops, show all open windows and pinch-to-zoom. Beyond the visual effects, these tools are more intuitive than a keyboard shortcut and thus can improve our productivity.

{% include image.html file="2017-09-24-multitouch-gestures-ubuntu-fusuma/mission-control-mac.gif" float=true description="Exposé Gesture on Mac" %}

Unfortunately these gestures are not available by default on the major Linux distributions. But thanks to [Kohei Yamada {% include fa-icon.html id="address-card" %}](https://github.com/iberianpig), who developed the application [Fusuma](https://github.com/iberianpig/fusuma) in [Ruby](https://www.ruby-lang.org/en/) to recognize multitouch input on the trackpad on Linux, shortcuts can be easily configured to different gestures.

The following tutorial, based on the [_README_](https://github.com/iberianpig/fusuma/blob/master/README.md) of the [Fusuma {% include brand-icon.html id="github-alt" %}](https://github.com/iberianpig/fusuma) project, will teach how to setup the environment for **Unity** and **GNOME** in Ubuntu 16.04.

## Installing Fusuma

First of all, your user must be a member of the _input_ group, so the application can read the touchpad inputs. If your user isn't a member, or if you don't know what it means, run the following command in the terminal:

```
sudo gpasswd -a $USER input
```

You must logout and login again for the changes to take effect.

Then, you shall install ``libinput-tools`` and ``xdotool``. For that, run the commands:

```
sudo apt-get install libinput-tools
```

```
sudo apt-get install xdotool
```

Now, install the application Fusuma:

```
gem install fusuma
```

## Configuring the Gestures

In your home directory, go to the folder ``~/.config`` and create the folder ``fusuma`` inside of it. Now you must create a file ``config.yml``, in which you will declare the shortcuts and gestures you want. After some tests, I found a group of gesture configurations that best switched for me and had a fluid, yet precise, movements. These are best setup I've found for ``config.yml``:

> The folder path must be all in lower case, as it is case sensitive (thanks Paulo Felipe for pointing it out).

### For Unity:

```ruby
swipe:
  3: 
    left: 
      shortcut: 'alt+Right'
    right: 
      shortcut: 'alt+Left'
    up: 
      shortcut: 'super+w'
    down: 
      shortcut: 'Escape'
  4:
    left: 
      shortcut: 'ctrl+alt+Right'
    right: 
      shortcut: 'ctrl+alt+Left'
    up: 
      shortcut: 'ctrl+alt+Down'
    down: 
      shortcut: 'ctrl+alt+Up'
pinch:
  in:
    shortcut: 'ctrl+plus'
  out:
     shortcut: 'ctrl+minus'

threshold:
  swipe: 0.4
  pinch: 0.4

interval:
  swipe: 0.8
  pinch: 0.1
```

To start the program and test if everything is working, run in terminal the command:

```
fusuma
```

These are the gestures and respective actions:

| Gesture           | Action             |
|-------------------|--------------------|
| 3 Fingers - Left  | Go Next on Browser |
| 3 Fingers - Right | Go Back on Browser |
| 3 Fingers - Up    | Show all Windows   |
| 3 Fingers - Down  | Close Exposé (Esc) |
| 4 Fingers - Left  | Desktop on Right   |
| 4 Fingers - Right | Desktop on Left    |
| 4 Fingers - Up    | Desktop Down       |
| 4 Fingers - Down  | Desktop Up         |

---

### For GNOME:

```ruby
swipe:
  3: 
    left: 
      shortcut: 'alt+Right'
    right: 
      shortcut: 'alt+Left'
    up: 
      shortcut: 'super'
    down: 
      shortcut: 'super'
  4:
    left: 
      shortcut: 'ctrl+alt+Down'
    right: 
      shortcut: 'ctrl+alt+Up'
    up: 
      shortcut: 'ctrl+alt+Down'
    down: 
      shortcut: 'ctrl+alt+Up'
pinch:
  in:
    shortcut: 'ctrl+plus'
  out:
     shortcut: 'ctrl+minus'

threshold:
  swipe: 0.4
  pinch: 0.4

interval:
  swipe: 0.8
  pinch: 0.1
```

To start the program and test if everything is working, run in terminal the command:

```
fusuma
```

These are the gestures and respective actions:

| Gesture           | Action             |
|-------------------|--------------------|
| 3 Fingers - Left  | Go Next on Browser |
| 3 Fingers - Right | Go Back on Browser |
| 3 Fingers - Up    | Show all Windows   |
| 3 Fingers - Down  | Close Exposé (Esc) |
| 4 Fingers - Left  | Next Desktop       |
| 4 Fingers - Right | Previous Desktop   |
| 4 Fingers - Up    | Next Desktop       |
| 4 Fingers - Down  | Previous Desktop   |

If you are using the GNOME desktop and nothing happens, you must ensure the Touchpad events are being received:

```
gsettings set org.gnome.desktop.peripherals.touchpad send-events enabled
```

Logout and login back for the changes to take effect and run Fusuma again.

## Launch Fusuma on Startup

### For Unity:

On the Unity Menu, search for ``Startup Applications``.

{% include image.html file="2017-09-24-multitouch-gestures-ubuntu-fusuma/unity-menu-search.png" description="Unity Search Menu" %}

Open the program and click the button _Add_.

{% include image.html file="2017-09-24-multitouch-gestures-ubuntu-fusuma/startup-add-button.png" description="Startup Applications Preferences" %}

In the field _Name_ write ``Fusuma`` and in the field _Command_ write ``fusuma``.

{% include image.html file="2017-09-24-multitouch-gestures-ubuntu-fusuma/add-fusuma-startup.png" description="Add Startup Program" %}

Now you can restart your computer and Fusuma will run as soon as you login.

---

### For GNOME:

On the GNOME Menu, search for ``Startup Applications``.

{% include image.html file="2017-09-24-multitouch-gestures-ubuntu-fusuma/gnome-menu-search.png" description="GNOME Search Menu" %}

Open the program and click the button _Add_.

{% include image.html file="2017-09-24-multitouch-gestures-ubuntu-fusuma/startup-add-button.png" description="Startup Applications Preferences Window" %}

In the field _Name_ write ``Fusuma`` and in the field _Command_ write ``fusuma``.

{% include image.html file="2017-09-24-multitouch-gestures-ubuntu-fusuma/add-fusuma-startup.png" description="Add Startup Program" %}

Now you can restart your computer and Fusuma will run as soon as you login.
