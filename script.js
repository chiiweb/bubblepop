// --- IMAGE LOADING AND PLAYER STATE ---
const playerImage = new Image();
playerImage.src = 'chiikawa.webp';
const playerActionImage = new Image();
playerActionImage.src = 'output-onlinepngtools (12).png';
let isPlayerAction = false; // Flag to switch between normal and action image

// --- PLAYER DRAWING FUNCTION ---
function drawPlayer(){
  ctx.save();
  ctx.translate(player.x, player.y);

  // Determine which image to draw
  const currentImage = isPlayerAction ? playerActionImage : playerImage;

  // Draw the image centered on the player's position
  // Adjust width/height as needed for scale. player.w/player.h are currently 80.
  // We'll scale it slightly to fit the original player size.
  const scale = player.w / currentImage.width;
  const drawWidth = currentImage.width * scale;
  const drawHeight = currentImage.height * scale;

  // Ensure image is loaded before drawing
  if (currentImage.complete) {
    ctx.drawImage(currentImage, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);
  } else {
    // Fallback if image not loaded, draw original player or a placeholder
    ctx.beginPath();
    ctx.arc(0, 0, player.w/2, 0, Math.PI*2);
    ctx.fillStyle = '#A29BFE'; // Fallback color
    ctx.fill();
  }

  // Draw power-up effects if active (around the new image)
  if(state.freezeTime){ 
    ctx.beginPath(); 
    ctx.strokeStyle='#74ffb9'; 
    ctx.lineWidth=3; 
    ctx.arc(0, 0, player.w/2 + 8, 0, Math.PI*2); // Centered on image
    ctx.stroke(); 
  }
  if(state.doublePoints){
    ctx.beginPath(); 
    ctx.strokeStyle='#FFD86B'; 
    ctx.lineWidth=3; 
    ctx.arc(0, 0, player.w/2 + 14, 0, Math.PI*2); // Centered on image
    ctx.stroke();
  }

  ctx.restore();
}

// --- REST OF YOUR GAME SETUP (state, canvas, audio context, etc.) ---
// ... (The rest of your initial variables and setup)
// ...

// --- COLLISION LOGIC (This should be inside your game's main update/loop function) ---

/* * NOTE: This block assumes it is inside a loop (e.g., 'for(let i=items.length-1; i>=0; i--)' 
* where 'it' is the current item being checked.
*/
if(distSq < radiiSum**2){
    if(it.type==='bubble'){ 
        const multiplier = (state.combo + 1) * (state.doublePoints ? 2 : 1);
        const points = it.points * multiplier;
        state.score += points; 
        state.combo++;
        spawnParticles(it.x,it.y,it.color,15); 
        playBeep(800 + state.combo * 100, 0.06,'square',0.12); 
        
        // **FIX 1: Action flag set and reset (150ms flash)**
        isPlayerAction = true;
        setTimeout(() => { isPlayerAction = false; }, 150);
        
        clearTimeout(comboTimer);
        comboTimer = setTimeout(()=>{ state.combo = 0; updateUI(); }, 1500);
        
        // **FIX 2: Corrected Level-Up Check**
        // A simple progression: requires 250 * current level to advance
        const levelGoal = 250 * state.level;
        if(state.score >= levelGoal) nextLevel();
    }
    else if(it.type==='power'){ 
        applyPower(it.subtype); 
        spawnParticles(it.x,it.y,'#FFD700',18);

        // **FIX 1: Action flag set and reset for power-ups**
        isPlayerAction = true;
        setTimeout(() => { isPlayerAction = false; }, 150);
    }
    items.splice(i,1);
    updateUI();
    continue;
}

// --- REST OF YOUR GAME FUNCTIONS (nextLevel, updateUI, applyPower, etc.) ---
// ...
