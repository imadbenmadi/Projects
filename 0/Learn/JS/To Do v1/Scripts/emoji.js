let emoji_block = document.getElementById("emoji");
var selected_emoji = null;

// import { setItemLogo } from './main.js';
export { selected_emoji};

const emojis = [
  '❌', '🏋️‍♂️', '🏃‍♀️', '📅', '🕒', '⏰', '🔔', '📌', '🔑', '📖', '🖊️',
  '🧹', '🛒', '💼', '🗂️', '📋', '🔒', '🗄️', '💡', '🚶‍♂️', '🚴‍♀️',
  '🚀', '🎯', '🎉', '📎', '📊', '📆', '📝', '💪', '🎨', '🎵',
  '📚', '📅', '💻', '✉️', '📨', '🗂️', '📬', '🛠️', '💰', '🗓️',
  '🗑️', '🛏️', '📚', '🍴', '🧘‍♀️', '🧗‍♂️', '🚗', '✅', '🛁', '🚰',
  '🎓', '🧪', '💊', '📅', '🕑', '🕐', '🗳️', '👨‍🍳', '📆', '🎵',
  '🎨', '🎮', '📆', '📋', '🧾', '💡', '🛠️', '🛹', '🏄‍♂️', '🧗‍♀️',
  '🚣‍♂️', '🎲', '🎳', '🎭', '🎤', '📚', '📝', '🎬', '🚴‍♂️', '🖋️',
  '📅', '🎥', '🏸', '🎮', '🎨', '🧘‍♀️', '📝', '📖', '📕', '🎈',
  '🎉', '🥂', '🍾', '🎂', '🎁', '🎊', '🏝️', '🏞️', '🎡', '🛶'
];






function initilise_emojies(){
    return new Promise((resolve , reject)=>{
        emojis.forEach(element => {
            let emoji_item = document.createElement('div');
            emoji_item.className="emoji_item"
            emoji_item.textContent=element;
            emoji_block.appendChild(emoji_item)
            emoji_item.addEventListener("click",selecte)
        });
        document.querySelector(".emoji_item").style.backgroundColor = "red";
        resolve();
    })
}

function selecte(event){
    selected_emoji = event.target.textContent;
    // console.log(selected_emoji);
    // setItemLogo(selected_emoji)
    emoji_block.classList.remove("emoji_show")    
}

export function refresh_selected(){
    selected_emoji = null    
}


initilise_emojies()
