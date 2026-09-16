let letters = "abcdefghijklmnopqrstuvwxyz"

let arrayletters = Array.from(letters);

let letttersContainer = document.querySelector(".letters");

arrayletters.forEach(letter => {

    let span =document.createElement("span");

    let theletter = document.createTextNode(letter);

    span.appendChild(theletter);

    span.className= "letter-box";

    letttersContainer.appendChild(span);
})

// ===========================================================//

let words = {
  animals: [
    "lion", "tiger", "elephant", "giraffe", "monkey", "horse",
    "dog", "cat", "wolf", "rabbit", "dolphin", "shark", "eagle"
  ],
  countries: [
    "egypt", "united states", "united kingdom", "canada", "australia",
    "germany", "france", "italy", "spain", "brazil", "argentina",
    "mexico", "japan", "china", "south korea", "india", "russia",
    "turkey", "saudi arabia", "united arab emirates", "qatar",
    "palestine", "israel", "greece", "switzerland", "netherlands",
    "sweden", "norway", "south africa", "thailand"
  ],
  people: [
    "adel imam", "mohamed salah", "amr diab", "tamer hosny",
    "mohamed henedy", "ahmed helmy", "karim abdel aziz", "ahmed el saka",
    "khaled el sawy", "yousra", "menna shalaby", "sherihan", "sherine",
    "angham", "ruby", "dina el sherbiny", "mina el shalaby",
    "nour el sherif", "omar el sherif", "ahmed ezz", "mohamed ramadan",
    "hassan el radad", "mai ezz el din", "donia samir ghanem",
    "ragaa al gidawe", "khaled el nabawy", "youssef el sherif", "asala",
    "amr youssef", "ahmed mekky", "mohamed saad", "ashraf abdel baki",
    "hany ramzy", "mostafa shaban", "eyad nassar"
  ]
};

let Allkeys = Object.keys(words);

let RandomPropNumber = Math.floor(Math.random() * Allkeys.length);

let RandomPropName = Allkeys[RandomPropNumber];

let RandomPropValue = words[RandomPropName];

let RandomNumber = Math.floor(Math.random() * RandomPropValue.length);

let RandomName = RandomPropValue[RandomNumber];

document.querySelector(".game-info .category span").innerHTML = RandomPropName;

// =================================================================================//

let GuessLettersContainer =document.querySelector(".guess-letters")

let NameRandomArray = Array.from(RandomName);

NameRandomArray.forEach(letter =>{
    
    let emptyspan = document.createElement("span")

    if(letter === " "){
        emptyspan.className="with-space";
    }
    GuessLettersContainer.appendChild(emptyspan);
});

// ===================================================//

let guessspan = document.querySelectorAll('.guess-letters span');

let wrong = 0;

let thedraw = document.querySelector('.hangman-draw');

document.addEventListener("click",(e) =>{

    let thestatus = false;

    if(e.target.className === 'letter-box'){

        e.target.classList.add("clicked");

        let theclickedletter = e.target.innerHTML.toLowerCase();

        let TheChoosenWord = Array.from(RandomName.toLowerCase());

        // console.log(theclickedletter)
        // console.log(TheChoosenWord)
        TheChoosenWord.forEach((wordletter , wordindex)=>{
            if (theclickedletter === wordletter){

                thestatus = true;

                guessspan.forEach((span , spanindex)=>{

                    if(wordindex === spanindex){

                        span.innerHTML=wordletter;
                    }
                })
            }
        });
                    if (thestatus === true) {
            checkWin();
            }

  if(thestatus !==true){

            wrong++;

            thedraw.classList.add(`wrong-${wrong}`)

            // document.getElementById("wrong").play();
            if(wrong === 10 ){

                EndGame();
                letttersContainer.classList.add("finshed");
            }

        }else{

            //  document.getElementById("success").play();
             

        }
    }

});
function EndGame(){

let div = document.createElement("div");

div.innerHTML = `<span class = "game-over-title">Game Over </span><br><span> The Word is <span class = "theword">${RandomName}</span></span><br><button onclick="location.reload()">New Game</button>`;

div.className = "gameover";

document.body.appendChild(div);
}
function checkWin() {
  let allFilled = true;

  guessspan.forEach(span => {
    if (!span.classList.contains('with-space') && span.innerHTML.trim() === "") {
      allFilled = false;
    }
  });

  if (allFilled) {
    WinGame();
    letttersContainer.classList.add("finshed");
  }
}

function WinGame(){
  let div = document.createElement("div");
  div.innerHTML = `<span class = "game-over-title win-title">Congratulations! </span><br><span> The Word is <span class = "theword2">${RandomName}</span></span><br><button class = "btn2" onclick="location.reload()">New Game</button>`;
  div.className = "gameover";
  document.body.appendChild(div);
}

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('service-worker.js');
// }
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js')
      .then(() => console.log('Service Worker registered ✅'))
      .catch((err) => console.log('Service Worker failed ❌', err));
  });
}
// ===============================ظظ

let deferredPrompt;
const installBtn = document.getElementById('installBtn');

// المتصفح بيبعت الحدث ده لو الموقع مؤهل للتثبيت (manifest + service worker صح)
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault(); // امنع النافذة التلقائية من كروم
  deferredPrompt = e; // احتفظ بالحدث عشان نستخدمه لما المستخدم يدوس الزرار
  installBtn.style.display = 'block'; // اظهر الزرار بس لو التثبيت متاح فعلاً
});

installBtn.addEventListener('click', async () => {
  if (!deferredPrompt) return;

  deferredPrompt.prompt(); // اظهر نافذة التثبيت الحقيقية
  const { outcome } = await deferredPrompt.userChoice; // استنى قرار المستخدم

  if (outcome === 'accepted') {
    console.log('المستخدم وافق على التثبيت ✅');
  } else {
    console.log('المستخدم رفض التثبيت ❌');
  }

  deferredPrompt = null;
  installBtn.style.display = 'none'; // اخفي الزرار بعد الاستخدام
});

// لو التطبيق اتثبت بالفعل، اخفي الزرار
window.addEventListener('appinstalled', () => {
  installBtn.style.display = 'none';
  console.log('التطبيق اتثبت بنجاح 🎉');
});
// =======================
const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
if (isIOS) {
  installBtn.style.display = 'block';
  installBtn.textContent = 'اضغط مشاركة ثم "إضافة للشاشة الرئيسية"';
  installBtn.onclick = () => alert('من زر المشاركة (Share) في سفاري، اختر "Add to Home Screen"');
}