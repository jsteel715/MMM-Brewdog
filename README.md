# MMM-Brewdog [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://raw.githubusercontent.com/fewieden/MMM-ip/master/LICENSE)

Simple module for MagicMirror<sup>2</sup> that utilizes the Brewdog API to fetch a random beer


## Example

![](.github/MMM-Brewdog.jpg)

## Dependencies

* An installation of [MagicMirror<sup>2</sup>](https://github.com/MichMich/MagicMirror)
* OPTIONAL: [Voice Control](https://github.com/fewieden/MMM-voice)

## Installation

1. Clone this repo into `~/MagicMirror/modules` directory.
1. Configure your `~/MagicMirror/config/config.js`:

```
{
    module: 'MMM-Brewdog',
    position: 'top_left',
    config: {
        ...
    }
}
```

## Config Options

| **Option** | **Default** | **Description** |
| --- | --- | --- |
| `fontSize` | `9` | Font size in pixels. Only if `voice` is set to `false` |
| `dimmed` | `true` | Boolean for discrete visibility |
| `showFamily` | `'both'` | Network Address family to display `'IPv4'`, `'IPv6'` or `'both'` |
| `showType` | `'both'` | Network interface type to display `'eth0'`, `'wlan0'` or `'both'` |
| `voice` | `false` | Boolean for optional voice commands |
