# Web Jeopardy
Web Jeopardy is a web-application that allows users to present a Jeopardy game board.
*At it's current version, Web Jeopardy cannot be played from multiple devices*

## How To Play
1. Go to philip.stachura.me/web-jeopardy/
2. Either load a custom game file (see "Markup") or the use example game
3. Click on the **LOAD** button to confirm your choice
4. Chose from a variety of options to customize you game
5. Press **START GAME** when you are ready to start

## Controls

**Select Question** - single click inside one of the boxes </br>
**Return to Game Board** - double click anywhere

## Markup
Web Jeopardy game files are stored in XML format
An example is provided when the page first loads

### Tags
NOTE: all tags must be closed including the **img** tag
</br>
\<game-board\> - surrounds all relevant game data</br>
    \<points\> - indicate the point value to be displayed for each row of modules</br>
    \<category\> - each set represents one category of column of the game board</br>
        \<name\> - within the name tag is the name for its parent category</br>
        \<module\> - each module represents a box in the game board</br>
            \<img\> - \*\**Optional*: Used to display an image when answer is shown (use *src*, *width*, and *height* attributes as you would in HTML)</br>
            \<answer\> - the answer to the question (it is displayed first)</br>
            \<question\> - the question (in current version never displayed)</br>

### Example
``` xml
<game-board>
  <points>$100</points>
  <points>$200</points>
  <points>$300</points>
  <points>$400</points>
  <category>
    <name>
      Star Trek
    </name>
    <module>
      <answer>
        Created in 2161
      </answer>
      <question>
        What is the United Federation of Planets?
      </question>
    </module>
    <module>
      <answer>
        A messenger to the 22 century in the temporal cold war
      </answer>
      <question>
        Who is Daniels
      </question>
    </module>
    <module>
      <answer>
        The maximum warp speed of the USS Voyager
      </answer>
      <question>
        What is warp 9.975
      </question>
    </module>
    <module>
      <img src="web-jeopardy-logo.png" width="70%"></img>
      <answer>
        This method of propulsion
      </answer>
      <question>
        What is a Warp Field
      </question>
    </module>
  </category>
  <category>
    <name>
      Oxymorons
    </name>
    <module>
      <answer>
        Orbiting the earth
      </answer>
      <question>
        What is the Space Station
      </question>
    </module>
    <module>
      <answer>
        Zombies
      </answer>
      <question>
        What is the living dead
      </question>
    </module>
    <module>
      <answer>
        Planes sometimes do this if they fall out of the sky
      </answer>
      <question>
        What is crash land
      </question>
    </module>
    <module>
      <answer>
        Liquid Oxygen, Liquid Hydrogen, Liquid Nitrogen
      </answer>
      <question>
        What are liquid gases
      </question>
    </module>
  </category>
</game-board>
```
