# Wallpapers

A simple program for holding a list of all the wallpapers I enjoy. Rather than containing any copywritten wallpapers, this will contain a list of urls and thumbnails.
Images and metadata will be downloaded.  

Thumbnails are used to keep a small reference to what each wallpaper should be. The main purpose for this is to have some way to find a replacement incase a wallpaper url becomes unavailable.

This program uses a lot of Dependency Injection to make it easier to add new providers and change out the database.

---


## Installation

use ```npm install``` to install dependencies.

---


## Usage

commands:
| command | description |
| --- | --- |
| ```npm start``` | Start the program without arguments. This is equivalant to ```npm run setwallpaper``` |
| ```npm run download thumbs``` | Download all the thumbnails |
| ```npm run download wallpapers``` | Download all the wallpapers |
| ```npm run download metadata``` | Download all the metadata |
| ```npm run download all``` | Download all the wallpapers and thumbnails |
| ```npm run setwallpaper [--config <file>]``` | Set the wallpaper based on a configuration file. Without a config file, this picks a random wallpaper from all possible ones. |

---


## Configuration
The configuration file is a simple json file that contains various information about how to choose a wallpaper.
```json
{
    // Only choose aspect ratios that are close to this. e.g. a 16:9 wallpaper will be chosen for a 16:10 or 16:8. TODO: Elaborate how this is chosen
    "aspectRatios": [],
    // Only choose wallpapers that are at least this many pixels wide and tall.
    "sizeLimit": [1920, 1080],
    // How to apply the wallpaper if it is smaller than the screen.
    "smallFitment": "[fill|contain|stretch|cover]",
    // How to apply the wallpaper if it is larger than the screen.
    "largeFitment": "[fill|contain|stretch|cover]",
    // Only choose wallpapers that are from these providers.
    "providers": []
}
```

#### Fitment Options TODO: Refine
| option | description |
| --- | --- |
| fill | Fill the screen with the wallpaper. |
| contain | Fit the wallpaper to the screen. |
| stretch | Stretch the wallpaper to the screen. |
| cover | Cover the screen with the wallpaper. |

## Functionality

The program has the following functionality:
- Thumbnails will be downloaded and stored in the data/thumbs folder.
- Metadata will be fetched for each url and stored in the data/wallpapers.json file.
    - Metadata won't be overwritten, but will be merged.
- Using a configuration when executed, it will set a wallpaper from what is available.

