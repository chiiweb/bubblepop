// Add these lines to load your player images
const playerImage = new Image();
playerImage.src = 'chiikawa.webp'; // Replace with the actual URL or base64 data for Image 1
const playerActionImage = new Image();
playerActionImage.src = 'output-onlinepngtools (12).png'; // Replace with the actual URL or base64 data for Image 2
let isPlayerAction = false; // Flag to switch between normal and action image
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
