# audiocanvas
Audio visualizer with some user interactions. Made with Javascript.

This program takes in an audio input and converts the frequency bytes at every moment of the song into visualized circles called "beats". The beats will have varying colors and sizes depending on the value of the individual frequency bytes (higher values result in larger beats). The beats will also echo and resonate for higher values in order to highlight more melodic tones that become present in the song.

Generally speaking, I can tell you frequency bytes around 3-6 will best emulate melodic vocals in a song. Higher byte values will then tend to become more as background/ambient noise that occurs in the song, but do yield some dynamic visuals in audio passages that alternate between high and low impact moments. However, do not let that discourage from pasting on different frequency byte values of higher numbers because there is an ample difference between each individual frequency byte. Frequency byte 2 is designed to represent the most impactful tones in the song (basically the bass). Because of that, I made the bass beats different from every other beat design in order to capture the contrasts between the bass and melody during the song.

# How to use:

  -Select and play an MP3 file from your computer. 
  
  -Mouse click: Paste the current frequency byte on the canvas.
  
  -Left/Right arrows: Change frequency byte.
  
  -Delete: Remove all beats on the canvas.
  
  -Up arrow: Populate the canvas with 30 random frequency beats.

# Caveats:

  -Having a lot of beats (starting at around 50+ or so) on your canvas will result in significant lag and loss of performance. Place large  numbers of beats at your own risk.
  
  -The canvas when generated will equal the size of window AS YOU OPEN THE PAGE. The canvas and its contents will not adjust its size when you zoom in or out. Refresh the page if you wish to change the canvas size.
  
  -Based on how the module I used works, the frequency byte values actually depend on the volume indicated on the media player bar. Because of this, you may experience different beat values when you adjust the volume through there. This may be a good or bad thing since some songs (as I've tested) may need a certain "sweet spot" volume to create brighter effects instead of very concentrated visuals (maximum frequency value cap causes inherently loud songs to produce high frequency values across all bytes). For the most part, keeping the volume around mid-to-max volume on the media player bar should be optimal for a lot of songs.
  
  -There is no "default/demo" audio file because Javascript does not allow scripts to forcefully set an input-based file value due to security reasons.
