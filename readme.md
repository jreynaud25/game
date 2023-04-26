GAME:
- You're a rock trying to get the longest ricochet
- You have 1:30min to score as many point as you can to do so:
    • Bounce with the right angle on the lake to get more speed
        On rock = collision:
            • If angle between 165 - 175 -> speed++++ (point +15)
            • If angle between 155 - 165 -> speed+++ (point +10)
            • If angle between 145 - 155 -> speed++ (point +5)
            • If angle between 145 - 135 -> speed (point +0)
            • If angle between 135 - 125 -> speed- (point -10)
            • If angle between 115 - 105 -> speed-- (point -20)
            • If angle between 105 - -Inifinity -> Game Over
                Consider if speed++ angle should be different
        On rock = air:
            • If front 360° rotation -> (point +20 / rotation)
            • If back 360° rotation -> (point +20 / rotation)
            • If back + fron (60 rotation)
            • If cork rotation (arrow down point +20 / rotation)
            • If 360 + cork (arrow down + arrow left / right +40 / rotation)
        Optionnal, rock = bird collision:
            •
    • Try to make some tricks on the air //optional
    • Try to be help by birds or cloud //optional

Controls:
- Arrow Key
- Scroll

Starting:
- Use your trackpad to send a velocity to the rock
- 