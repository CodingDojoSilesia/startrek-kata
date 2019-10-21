# Star Trek _Kata_

The following _Kata_ is strongly inspired by the console game _Apple Star-Trek_ created by Robert J. Bishop in 1977. In game, the player controls the starfleet starship _Enterprice_, which task is destruction of the Klingon's starships. To understand the gameplay better, see the following (video)[https://www.youtube.com/watch?v=e6f9_9kzuzk].

## Description of the problem

The starship _Enterprise_ moves in the galaxy divided into 64 quadrants, placed on 8x8 grid. Each quadrant is divided into 64 sectors, which are placed on 8x8 grid as well. The quadrant _0,0_ is located in the bottom-left corner of the galaxy, whereas the quadrant _7,7_ is placed in the top-right corner (sectors are arranged in the same manner). There is no option to go outside of the galaxy boundaries.

There are 7 Klingon spaceships, 2 starfleet bases and some number of stars randomly placed all over the galaxy. The victory condition is to destroy all of the Klingon starships.

At the beginning, the player has 15 stardates and 600 units of energy (the maximum level of energy).

The player plays by typing commands into the on-board computer. There are 5 commands numbered from 0 to 4. Before the command prompt, the computer should display the status report. The report should consist of the amount of remaining energy, the _Enterprice_ position in the galaxy and the remaining stardates.

### Manoeuvring of _Enterprise_

The command `0` moves _Enterprise_. After typing the command in, the computer should ask the player for the movement coordinates with the prompt `VECTOR ?`. The player needs to determine the number of sectors for horizontal and vertical movement, e.g. `-21,35` means that _Enterprice_ will move by 21 sectors left and 35 up.

Moving the ship uses energy according to the city block distance (between the starting and ending points). Additionaly, moving from one quadrant to another uses one stardate. If there are no remaining startdates and there are Klingon startships outside the current quadrant, then the player will lose.

After movement, if the ship is on the position as any other object, the player will lose by crashing.

Each time, the player enters a quadrant, positions of all objects will randomly change. That means, if the player returns to a previously visited quadrant, the number of Klingon startships, bases and stars will remain the same, but their positions will change.

If _Enterprise_ ends its movement in one of the adjacent sectors of a starfleet base (above, below, left and right sectors), then the amount of energy will be restored to the maximum level.

### Scanning of the galaxy

The command `1` performs the short-range sensor scan of the current quadrants and displays the results. _Enterprise_ is represented by the
symbols: `<*>` , Klingons are represented by: `+++` , starbases
by: `>!<` , and stars by ` * `.

The command `2` performs the long-range sensor scan. It displays a 3x3 grid of nearest quadrants with the _Enterprise_'s quadrant in the
center. The scan is coded in the form: `KBS`, where `K` is the number of Klingons, `B` is the number of starbases, and `S` is the number of stars in the quadrant.

### Battle protocol

Each time, the player maneuvers within a quadrant containing a Klingon, he will be shot and the amount of damage will be indicated. The computer will automatically protect _Enterprise_ with deflection shields. However, the shields use the amount of energy equal to the received damage.

The command `3` turns on the battle mode. The computer displays the amount of remaining energy and asks for the amount of energy the player wants to use to attack the closest Klingon starship (the city block distance is used to determine which Klingon ship will be attacked). By typing `0`, the player will return to the normal commands mode. If a Klingon ship is not destroyed (ie. has more than 0 energy) then it will fire back (according to the same rules as above).

Each shot in the game has a hit probability, which can be calculated by using the following equation: `5 / ({the city block distance value} + 4)`.

### Map of the galaxy

The command `4` displays a map of the galaxy that contains all information from previously executed long-range sensor scans.

## Levels of advancement

Like in the previous taks, this _Kata_ has three levels of advancement:
- _junior_: implementing the commands `0` and `1` without the randomness of the objects positioning,
- _mid_: implementing the commands `2` and `4` and the randomness of the objects positioning,
- _senior_: implementing the command `3` and the battle protocol.

## References

The orginal description of the game: [https://www.applefritter.com/content/star-trek-8k-apple-i-basic](https://www.applefritter.com/content/star-trek-8k-apple-i-basic).
