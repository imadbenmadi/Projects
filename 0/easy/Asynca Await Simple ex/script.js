const item1=document.getElementById("one")
const item2=document.getElementById("two")
const item3=document.getElementById("three")
const item4=document.getElementById("four")
const refresh = document.querySelector(".refresh")
const github_logo = document.querySelector("h4 a img");

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    github_logo.src = "github-mark/github-mark.png";
} else {
    github_logo.src = "github-mark/github-mark-white.png";
}


refresh.addEventListener("click",()=>{
    location.reload();
})

// await should be used before a funtion that returns a peromiss
async function showTitles(){
    await new Promise((resolve)=>{
        setTimeout(() => { item1.style.visibility = "visible";resolve() }, 1000);
    });

    await new Promise((resolve,reject)=>{
        setTimeout(() => { item2.style.visibility = "visible" ;resolve()}
        , 1000);
    });

    await new Promise((resolve,reject)=>{
        setTimeout(() => { item3.style.visibility = "visible" ;resolve()}
        , 1000);
    });

    await new Promise((resolve,reject)=>{
        setTimeout(() => { 
            item4.style.visibility = "visible" ;
            refresh.style.visibility="visible" ;
            resolve()}
        , 1000);
    });
}

showTitles()












