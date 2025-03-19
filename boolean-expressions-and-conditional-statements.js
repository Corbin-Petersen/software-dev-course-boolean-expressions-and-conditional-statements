
const readline = require('readline-sync');
let playerName = readline.question("To begin our adventure, what is your name?: "); 
let welcome = "Welcome " + playerName + "! Lets begin.";
console.log(welcome);
let firstChoice = readline.questionInt(`-----
On the table in front of you, you are offered either a map or a torch. 
Press '1' to take the map, '2' to equip the torch, or '3' if you just want to get on with the adventure!: `);

// choosing what to take with you on the journey.
let hasMap;
let hasTorch;
let hasCompass;
let hasFuel;

if (firstChoice === 1) {
  hasMap = true;
  hasTorch = false;
  console.log(`-----
You carefully pick up the map, fold it, and place it in your bag. 
As you do so, you notice a coupon for a free compass on the back of the map, so you grab that as well.`);
  hasCompass = true;
  hasFuel = false;
} else if (firstChoice === 2) {
  hasMap = false;
  hasTorch = true;
  console.log(`-----
You decide a torch would be more useful, and as you pick it up you see that an attached bottle of lighter fluid fell of the floor, so you make sure to scoop up the bottle as well before leaving.`);
  hasCompass = false;
  hasFuel = true;
} else {
  firstChoice = readline.question(`-----
I see you're in a hurry. As you go though, choose either the map (1) or the torch (2) on your way out: `);
  if (firstChoice === 1) {
    hasMap = true;
    hasTorch = false;
    console.log(`-----
You begrudgingly grab the map and hastily stuff it into your bag... 
not noticing the compass that is supposed to come with the map.`);
    hasCompass = false;
    hasFuel = false;
  } else {
    hasMap = false;
    hasTorch = true;
    console.log(`-----
You decide a torch is better than nothing, so you hastily grab it and toss it into your bag as you dart out the door... 
completely overlooking the bottle of lighter fluid that was supposed to come with to the torch).`);
    hasCompass = false;
    hasFuel = false;
  }
}

// Choosing the path
console.log(`
You step outside and see two paths to get to the other village: 
one is a shortcut through to the dark mountains, 
the other is a winding and twisting road through a dense forrest.`);
let choiceTwo = readline.question(`
Do you travel through the 'mountains' or the 'forrest'?: `);

// STORY ELEMENTS BASED ON CHOICES
let torchWithFuel = `
As you reach the top of the mountain pass, your torch starts to fade in the strong winds. 
Thankfully you have the bottle of spare lighter fluid to keep it burning strong, 
so you douse the torch in fresh fluid and make your way safely down the other side to the village below.`;
let torchNoFuel = `
As you reach the top of the mountain pass, your torch starts to fade in the strong winds. 
Unfortunately in your haste, you forgot the spare lighter fluid, resulting in the torch burning out and leaving you in the dark.`;
let mountainBack = `-----
You decide it would be safer to go back and try the journey another day, this time with extra lighter fluid. 
You slowly make it back in the dark and wish you weren't in such a hurry to begin with.`;
let mountainForward = `-----
As you stubbornly forge ahead down the other side of the mountains, you stumble on a rock and tumble down the mountain, hitting rocks and shrubs as you roll seemingly endlessly...
till your momentum takes you off a cliff and you fall 100 yards into a lake! 
Thankfully you are alive, though now you are soaking wet, covered in cuts and bruises, and you're pretty sure you've got a couple broken ribs. 
You decide to call it quits before you get hurt worse, and you wait for rescue by the lake.`;
let mapWithCompass = `
As you navigate the forrest path's twists and turns, a fog falls and makes it hard to know which way you're facing. 
Fortunately, you remember the compass and pull it out, using it to keep your bearings and safely make your way out the other side of the forrest and to the village.`;
let mapNoCompass = `
As you navigate the forrest path's twists and turns, a fog falls and makes it hard to know which way you're facing. 
After entering what you assume is a clearing in the middle of the forrest (based on the map), you realize that if you move any further into the clearing, you'll lose sight of the path you came from.`;
let forrestForward = `-----
You decide you don't have time to go all the way back to the beginning to get a pesky compass, and you blindly walk into the fog. 
Eventually, you see a path out of the clearing, and assume it is one of three possible paths out, based on the map...
but after several hours of wrong turns the map didn't foresee, and several cutbacks, you realize you're completely lost and can't find your place on the map anymore. 
At this point, you decide to call it quits and wait for rescue once the fog clears.`;
let forrestBack = `-----
You make the choice to be safer than sorry and backtrack your steps to the entrance of the forrest, kicking yourself for not grabbing a compass before you headed out.`;

// DECISION TREE
if (choiceTwo === "mountains" && hasTorch) {
  console.log(`-----
You decide to head into the dark mountains, and light your torch as you climb the path ahead.`);
  if (hasFuel) {
    console.log(torchWithFuel);
  } else {
    console.log(torchNoFuel);
    let mountainChoice = readline.question(`
Do you turn back down the side you've already traveled to come back for the lighter fluid, or do you forge ahead in the dark and hope for the best? 
Choose '1' to go back, or '2' to keep going?: `) 
    if (mountainChoice === 1) {
      console.log(mountainBack);
    } else {
      console.log(mountainForward);
    }
  }
} else if (choiceTwo === "forrest" && !hasMap) {
  console.log(`-----
Unfortunately, you need a map to navigate the forrest, so you'll have to brave the mountain pass with your torch instead.`);
  if (hasFuel) {
    console.log(torchWithFuel);
  } else {
    console.log(torchNoFuel);
    let mountainChoice = readline.question(`-----
Do you turn back down the side you've already traveled to come back for the lighter fluid, or do you forge ahead in the dark and hope for the best? 
Choose '1' to go back, or '2' to keep going?: `) 
    if (mountainChoice === 1) {
      console.log(mountainBack);
    } else {
      console.log(mountainForward);
    }
  }
} else if (choiceTwo === "mountains" && !hasTorch) {
  console.log(`-----
It's way too dark for that road, and you don't have a torch. You'll need to go through the forrest instead.`);
  if (hasCompass) {
    console.log(mapWithCompass);
  } else {
    console.log(mapNoCompass);
    let forrestChoice = readline.question(`-----
Do you try to forge ahead without a compass, or do you trace your steps back out of the forrest and see if a compass is available? 
Choose '1' to go press on and hope for the best, or '2' to play it safe and head back for a compass?: `)
    if (forrestChoice === 1) {
      console.log(forrestForward);
    } else {
      console.log(forrestBack);
    }
  }
} else {
  console.log(`-----
You decide to make your way into the forrest, knowing you'll have to use your map to navigate all the twists and turns.`);
  if (hasCompass) {
    console.log(mapWithCompass);
  } else {
    console.log(mapNoCompass);
    let forrestChoice = readline.question(`
  Do you try to forge ahead without a compass, or do you trace your steps back out of the forrest and see if a compass is available? 
  Choose '1' to go press on and hope for the best, or '2' to play it safe and head back for a compass?: `)
    if (forrestChoice === 1) {
      console.log(forrestForward);
    } else {
      console.log(forrestBack);
    }
  }
}

console.log(`
  ---- THE END ----
  `);
