---
layout: post
title:  "How to Setup Touchpad Gestures in your Ubuntu Laptop"
date:   2017-09-24 22:30:00 +0000
updated:   2018-09-10 17:30:00 -0300
lang:   en
thumbnail: macbook_pro-trackpad.jpg
banner: person-using-touchpad.jpg
banner-credits: Photo by Sergey Zolkin on Unsplash
---

If you ever used a MacBook (or if you have a Windows 10 laptop with a compatible touchpad), you know how pleasant and useful can be the trackpad gestures to change desktops, show all open windows and pinch-to-zoom. Beyond the visual effects, these tools are more intuitive than a keyboard shortcut and thus can improve our productivity.

{% include image.html file="2017-09-24-multitouch-gestures-ubuntu-fusuma/mission-control-mac.gif" float=true description="Exposé Gesture on Mac" %}

Unfortunately these gestures are not available by default on the major Linux distributions. But thanks to [Kohei Yamada {% include fa-icon.html id="address-card" %}](https://github.com/iberianpig), who developed the application [Fusuma](https://github.com/iberianpig/fusuma) in [Ruby](https://www.ruby-lang.org/en/) to recognize multitouch input on the trackpad on Linux, shortcuts can be easily configured to different gestures.

The following tutorial, based on the [_README_](https://github.com/iberianpig/fusuma/blob/master/README.md) of the [Fusuma {% include brand-icon.html id="github-alt" %}](https://github.com/iberianpig/fusuma) project, will teach how to setup the environment for **Unity** and **GNOME** in **Ubuntu 16.04** (it also works also work in some others Ubuntu-Based distros, like Elementary OS)

> Fusuma is supposed to work on **Ubuntu 18.04**, although some users are reporting issues with it. I'll soon update the post with further informations and try to give a workaround for that.

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

> The folder path must be all in lower case, as it is case sensitive.

### For Unity:

```ruby
swipe:
  3: 
    left: 
      command: 'xdotool key alt+Right'
    right: 
      command: 'xdotool key alt+Left'
    up: 
      command: 'xdotool key super+w'
    down: 
      command: 'xdotool key Escape'
  4:
    left: 
      command: 'xdotool key ctrl+alt+Right'
    right: 
      command: 'xdotool key ctrl+alt+Left'
    up: 
      command: 'xdotool key ctrl+alt+Down'
    down: 
      command: 'xdotool key ctrl+alt+Up'
pinch:
  in:
    command: 'xdotool key ctrl+plus'
  out:
     command: 'xdotool key ctrl+minus'

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

> If you get a error message about the touchpad input and want to test if fusuma is working before restarting your computer, you can run it as a superuser: ``sudo fusuma``.

---

### For GNOME:

```ruby
swipe:
  3: 
    left: 
      command: 'xdotool key alt+Right'
    right: 
      command: 'xdotool key alt+Left'
    up: 
      command: 'xdotool key super'
    down: 
      command: 'xdotool key super'
  4:
    left: 
      command: 'xdotool key ctrl+alt+Down'
    right: 
      command: 'xdotool key ctrl+alt+Up'
    up: 
      command: 'xdotool key ctrl+alt+Down'
    down: 
      command: 'xdotool key ctrl+alt+Up'
pinch:
  in:
    command: 'xdotool key ctrl+plus'
  out:
     command: 'xdotool key ctrl+minus'

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

> If you get a error message about the touchpad input and want to test if fusuma is working before restarting your computer, you can run it as a superuser: ``sudo fusuma``. 

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
