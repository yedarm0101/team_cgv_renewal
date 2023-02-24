/* --------- 포트폴리오 안내 --------- */
let popup = document.querySelector('.popup'),
    popupClose = popup.querySelector('.close'),
    portfolioCookie =  document.querySelector('#portfolio_cookie');

 
    function setCookie(name,value,day){
        let date = new Date();
        date.setDate(date.getDate() + day);
        document.cookie = `${name}=${value};expires=${date.toUTCString()}`;
    }

//쿠키확인하기      
function checkCookie(name){
    let cookieArr = document.cookie.split(';');                   
    let visited = false;

    for(let cookie of cookieArr){
        if(cookie.search(name) > -1){
            visited = true;
            break;
        }
    }
    //팝업창 뜨게할지 안할지
    if(visited){
       popup.classList.add('hidden'); 
       console.log(visited)
    }
}

checkCookie('CGV');

//닫기
popupClose.addEventListener('click',()=>{
    popup.classList.add('hidden');
    
    if(portfolioCookie.checked){
        setCookie('CGV','방문',7);
    } else{
        setCookie('CGV','방문',-1);
    }
});



/* --------- common function --------- */
let linkprevent = document.querySelectorAll(".link");
for(a of linkprevent){
    a.addEventListener("click", e => e.preventDefault());
}


let btn_top = document.querySelector(".btn_top");
window.addEventListener("scroll", ()=>{
    window.pageYOffset > 500 ?
        btn_top.classList.remove("hidden"):
        btn_top.classList.add("hidden");
});

btn_top.addEventListener("click", ()=>{
    window.scrollTo({top:0, behavior:"smooth"});
});

//컬쳐플렉스 title 나타나는 코드

let titleP = document.querySelectorAll('.cultureplex .title p');
let titleH2 = document.querySelector('.cultureplex .title h2');
let titleH3 = document.querySelector('.cultureplex .title h3')
let cultureplex = document.querySelector('.cultureplex');
let cpOffsetTop = cultureplex.offsetTop;

window.addEventListener('scroll',()=>{
    for(p of titleP){
        if(window.pageYOffset > (cpOffsetTop*0.8)){
            p.classList.add('active');
            titleH2.classList.add('active');
            titleH3.classList.add('active');
        } else{
            titleH2.classList.remove('active');
            p.classList.remove('active');
            titleH3.classList.remove('active');
    }
}
})




/* --------- header section --------- */

// 스크롤시 헤더 색 변경
let header = document.querySelector('header');

window.addEventListener('scroll', (e)=>{
    let scrollPG = window.pageYOffset;
    if(scrollPG > 980){
        header.classList.add('active');
    }else{
        header.classList.remove('active');
    }
});
// 서브메뉴 내려오는 것
let submenu_bg = document.querySelector(".submenu_bg");
let reservation = document.querySelector(".reservation") 

let submenu_li = document.querySelectorAll(".mainmenu:not(.reservation");

for(i of submenu_li){
    i.addEventListener('mouseover',()=>{
        submenu_bg.classList.add('active')
    })
    i.addEventListener('mouseout',()=>{
        submenu_bg.classList.remove('active')
    })
}

// 언어메뉴 클릭시 내려오고, 재클릭시 위로 올라가는 것
let language = document.querySelector(".info .language");
let lang = document.querySelector(".info .lang");

language.addEventListener('click',()=>{
    lang.classList.toggle("active");
});


//FAQ문의하기 버튼 open
let btn_FAQ = document.querySelector(".info .question a");
let modal_FAQ = document.querySelector("#modal");

btn_FAQ.addEventListener('click',(e)=>{
    e.preventDefault();
    modal_FAQ.classList.remove("hidden");
})

//FAQ문의하기 버튼 close
let btn_close = document.querySelector(".modal_FAQ .btn_close");

btn_close.addEventListener('click',(e)=>{
    // e.preventDefault();
    modal_FAQ.classList.toggle("hidden");
});


//FAQ모달창 문의 유형 select
let select_wrap = document.querySelector(".select_wrap");
let selectDesign = document.querySelector(".selectReplace");
let selectOrign = document.querySelector("#type_of_inquiry");

let selectList = document.querySelector("#selectReplace");

select_wrap.addEventListener('click',(e)=>{
    e.currentTarget.classList.toggle('active');
});

let selectDesigns = selectDesign.querySelectorAll("li");
for(i of selectDesigns){
   i.addEventListener('click',(e)=>{
    let val = e.target.getAttribute("data-value");
    selectOrign.querySelector(`option[value=${val}]`).selected = true;
   }) 
}


/* ------------------ banner ---------------------------------- */
//전역변수
let bannerCurrentIdx = 0;

//슬라이드
let bannerslides = document.querySelector('.poster_container');
let bannerslide = document.querySelectorAll('.poster_container li');
let bannerslideCount = bannerslide.length;
let bannerpreBtn = document.querySelector('.prev'); //이전 버튼
let bannernextBtn = document.querySelector('.next'); //다음 버튼
let bannerslideWidth = 233;
let bannerslideMargin = 33.75;


makeClone();
//슬라이드의 복제 
function makeClone(){
    for(let i = 0; i<bannerslideCount; i++){
        let clonebannerslide = bannerslide[i].cloneNode(true);
        clonebannerslide.classList.add('clone');
        bannerslides.appendChild(clonebannerslide);
    }
    for(let i = bannerslideCount -1; i>=0; i--){
        let clonebannerslide = bannerslide[i].cloneNode(true);
        clonebannerslide.classList.add('clone');
        bannerslides.prepend(clonebannerslide);
    }
    updateWidth();
    setInitialPos();

    setTimeout(function(){
        bannerslides.classList.add('animated');
    })
}
// 슬라이드 가로배치 
function updateWidth(){
    let currentbannerslides = document.querySelectorAll('.poster_container li');
    let newbannerslideCount = currentbannerslides.length;
    let newWidth = (bannerslideWidth + bannerslideMargin)*newbannerslideCount - bannerslideMargin + 'px';
    bannerslides.style.width = newWidth;
};

function setInitialPos(){
    let initialTranslateValue = -(bannerslideWidth + bannerslideMargin)*bannerslideCount;
    
    bannerslides.style.transform = 'translateX('+ initialTranslateValue+'px)';
}

bannernextBtn.addEventListener('click',function(){
    movebannerslide(bannerCurrentIdx + 1);
});
bannerpreBtn.addEventListener('click',function(){
    movebannerslide(bannerCurrentIdx - 1);
});

function movebannerslide(num){
    bannerslides.style.marginLeft = -num * (bannerslideWidth + bannerslideMargin) + 'px';
    bannerCurrentIdx = num;
    console.log(bannerCurrentIdx,bannerslideCount)
    if(bannerCurrentIdx == bannerslideCount){
        setTimeout(function(){

        
        bannerslides.classList.remove('animated');
        bannerslides.style.marginLeft = '0px';
        
        bannerCurrentIdx = 0;
        }, 500);
        setTimeout(function(){
            bannerslides.classList.add('animated');
        }, 600);
    }else if(bannerCurrentIdx == -5){
        setTimeout(function(){

        
        bannerslides.classList.remove('animated');
        bannerslides.style.marginLeft = '0px';
        
        bannerCurrentIdx = 0; 
        }, 500);
        setTimeout(function(){
            bannerslides.classList.add('animated');
        }, 600);

    }
}


//포스터 클릭시 배너의 영상 진행

let play_auto = "autoplay=1&mute=1"

let posterlist = document.querySelectorAll('.poster_container li ');//누를버튼들
let iframes = document.querySelectorAll('.banner_video_container iframe');//재생될 영상
iframes[0].style.display = 'block'; 
iframes[0].setAttribute("src", iframes[0].getAttribute("src")+play_auto)

let btn = document.querySelector("button");
let frame = document.querySelector("iframe");




bannerslide.forEach((item, i)=>{
    item.addEventListener("click", (e)=>{
        let idx = e.currentTarget.getAttribute("data-idx");
        console.log(e.currentTarget);
        e.preventDefault();
        for(i of iframes){
            i.style.display = "none";
            i.setAttribute("src", i.getAttribute("src").replace(play_auto, ""));
        }
        console.log("idx : ", idx);
        console.log("iframes[idx] : ", iframes[idx]);
        iframes[idx].style.display="block";
        iframes[idx].setAttribute("src", iframes[idx].getAttribute("src")+play_auto);
    });
});


let cpWrapper = document.querySelector('.cp_wrapper');
let cpContainer = document.querySelector('.cp_container');
let cpList = document.querySelectorAll('.cp_list');
let cpSlide = document.querySelectorAll('.cp_container > li');
let slideCount = cpSlide.length;
let prevBtn = document.querySelector('.btn_prev');
let nextBtn = document.querySelector('.btn_next');
let pagerBtn = document.querySelectorAll('.cultureplex .pager a');
let currentIdx = 0;
 
/*슬라이드 가로배치*/
cpSlide.forEach((item,idx)=>{
  item.style.left = `${idx*100}%`;
})
 
/*배경이미지 설정 */
let prevImg = document.querySelectorAll('.cp_detail .preview_img');
for(pi of prevImg){
     let img = pi.querySelectorAll('img');
     img.forEach((i,idx)=>{
        i.addEventListener('click',(e)=>{
            let src = e.target.getAttribute('src');
            let indexnum = e.target.getAttribute("data-idx");
            cpList.forEach((item,idx)=>{
                e.target.closest(".cp_list").style.background = `url(${src}) no-repeat 50%/cover`;
                }) 
            let description = e.target.closest(".cp_detail").querySelectorAll('.cp_description li')
            for(desc of description){
                    desc.classList.remove('active');
                }
                description[indexnum].classList.add('active');
             })
     })
 }

 
 function bgImg(idx){
     idx = currentIdx;
     for(i of cpList){
         let src = i.querySelector('.preview_img img').getAttribute('src');
         i.style.background = `url(${src}) no-repeat 50%/cover`;
        }
        let description = document.querySelectorAll(".cp_description");
        for(desc of description){
            let descLi = desc.querySelectorAll('li');
            for(j of descLi){
                j.classList.remove('active');
            }
            descLi[0].classList.add('active');
        }
    }
bgImg();

function moveSlide(idx){
  cpContainer.style.left = `${idx*-100}%`;
  currentIdx = idx;
  activeButton();
}
/*버튼눌렀을때 배경초기화 */
nextBtn.addEventListener('click',(e)=>{
    moveSlide(currentIdx+1);
    setTimeout(bgImg,500);
})
prevBtn.addEventListener('click',()=>{
    moveSlide(currentIdx-1);
    setTimeout(bgImg,500);
})

/*첫번째,마지막에서 버튼 사라지기 */
activeButton();
function activeButton(){
  if(currentIdx == (cpSlide.length - 1)){
    nextBtn.classList.add('disabled');
  } else{
    nextBtn.classList.remove('disabled');
  }
  if(currentIdx == 0){
    prevBtn.classList.add('disabled');
  } else{
    prevBtn.classList.remove('disabled');
  }
  for(pb of pagerBtn){
    pb.classList.remove('active');}
    pagerBtn[currentIdx].classList.add('active')
}

/* 페이저 누르면 해당 슬라이드로 가기*/
 
pagerBtn.forEach((item,idx)=>{
  item.addEventListener('click',(e)=>{
    e.preventDefault();
    moveSlide(idx);
})
})

function autoSlide(){
    timer = setInterval(()=>{
        let nextIdx = (currentIdx + 1)%slideCount;
        moveSlide(nextIdx);
    },5000)
}
autoSlide();

cpWrapper.addEventListener('mouseover', ()=>{
    clearInterval(timer);
})
cpWrapper.addEventListener('mouseout', ()=>{
    autoSlide();
})





//골든에그

let goldenegg = document.querySelectorAll(".poster_golden_egg"),
    egginfo = document.querySelector(".egginfo_wrap"),
    posterWrap = document.querySelector(".banner .controls_wrapper");



for(i of goldenegg){
    i.addEventListener("mouseover", (e)=>{
        let egglocX = e.clientX;
            eggmargin = posterWrap.offsetLeft;
        egginfo.style.left = egglocX - eggmargin - 26 + "px";
        egginfo.classList.add("active");
    });
    i.addEventListener("mouseout", ()=>egginfo.classList.remove("active"));
}

//골든에그 숫자
let randomNumber = document.querySelectorAll('.random_number');

function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
for(n of randomNumber){
n.innerText = `${randomNum(90, 100)}%`;
};

 /* --------- section.modal_ticketing --------- */
let modal_wrap = document.querySelector(".modal_ticketing_wrap"),
    btn_ticket_close = modal_wrap.querySelector(".btn_close");

btn_ticket_close.addEventListener("click", ()=>{
    modal_wrap.classList.add("hidden");
    initial_all();
});

document.querySelector(".reservation").addEventListener("click", (e)=>{
    e.preventDefault();
    random_ad();
    modal_wrap.classList.toggle("hidden");
});
document.querySelector(".btn_Buymovie").addEventListener("click", (e)=>{
    e.preventDefault();
    random_ad();
    modal_wrap.classList.toggle("hidden");
});


/* --------------- section_sideadvertisement --------------- */
let section_side_left = modal_wrap.querySelector(".modal_side_ad.left"),
    section_side_right = modal_wrap.querySelector(".modal_side_ad.right"),
    side_ad_count = 4;

function random_ad(){
    let side_randomcount = Math.ceil(Math.random()*4);
        section_side_left.setAttribute("src", `img/ad_ticket_side${side_randomcount}_left.png`);
        section_side_right.setAttribute("src", `img/ad_ticket_side${side_randomcount}_right.png`);
};


/* --------- section.event slide --------- */

let event_database = [
    {title : "CGV x TVING 월정기 혜택 [CGV PLUS]", link: "#", imgsrc : "01", date : "2022.12.02~2032.12.02"},
    {title : "[올빼미]골든에그지수 맞히기", link: "#", imgsrc : "02", date : "2022.11.23~2022.12.06"},
    {title : "[CGV VIP] VIP PLAY", link: "#", imgsrc : "03", date : "2022.12.01~2023.02.28"},
    {title : "쉽고 많은 혜택, [CGV VIP 가보자고!]", link: "#", imgsrc : "04", date : "2022.11.17~2022.12.31"},
    {title : "[그래비티][매드맥스]3D IMAX RETURNS", link: "#", imgsrc : "05", date : "2022.11.23~2022.12.13"},
    {title : "[원피스 필름 레드] 필름마크' 자세한 내용 확인하기", link: "#", imgsrc : "06", date : "2022.11.23~2022.12.06"},
    {title : "테스트슬라이드", link: "#", imgsrc : "01", date : "1111.12.23~2222.12.23"},
    {title : "테스트슬라이드", link: "#", imgsrc : "01", date : "2222.11.23~3333.12.13"},
];

let event_databaselength = event_database.length,
    slidewrap = document.querySelector(".slide"),
    event_printlist = "";

for(i of event_database){
    event_printlist +=`
        <li>
            <a href=${i.link} title="'${i.title}' 자세한 내용 확인하기">
                <img src="img/ad_event${i.imgsrc}.jpg" alt="">
                <h3 class="subparagraph bold">${i.title}</h3>
                <p class="subparagraph">${i.date}</p>
            </a>
        </li>`
};

slidewrap.innerHTML = event_printlist;

let slide = [...slidewrap.querySelectorAll("li")];
    slidelength = slide.length,
    slidecount = 0,
    bannercount = Math.ceil(slide.length/3);
    eventindex = 0,
    eventslidebtn = document.querySelectorAll(".event .pager a"),
    slidebtn_prev = document.querySelector(".event .btn_prev");
    slidebtn_next = document.querySelector(".event .btn_next");



slidewrap.style.width = (slidelength-1) * (422+27) + 422 + "px";
if(slidelength < 3){
document.querySelector(".event .pager").classList.add("hidden")
};

function event_moveslide(){
slidecount =  slide.slice(0, (eventindex+1)*3).length - 3;
slidewrap.style.marginLeft = slidecount*-449 + "px";
};

function event_autoslide(){
eventindex = ++eventindex%bannercount;
event_moveslide();
};

slidebtn_prev.addEventListener("click", (e)=>{
e.preventDefault();
eventindex = (--eventindex+bannercount)%bannercount;
event_moveslide();
});

slidebtn_next.addEventListener("click", (e)=>{
e.preventDefault();
eventindex = ++eventindex%bannercount;
event_moveslide();
});

let event_timer = setInterval(event_autoslide, 3000);
    slidewrap.addEventListener("mouseenter", ()=>clearInterval(event_timer));
    slidewrap.addEventListener("mouseleave", ()=>event_timer = setInterval(event_autoslide, 3000));

for(i of eventslidebtn){
    i.addEventListener("mouseenter", ()=>clearInterval(event_timer));
    i.addEventListener("mouseleave", ()=>event_timer = setInterval(event_autoslide, 3000));
}



/* --------- section.noitce --------- */

let noticeul = document.querySelector(".notice ul"),
noticeli = noticeul.querySelectorAll("li"),
noticeindex = 0;


noticeli_clone = noticeli[0].cloneNode(true);
noticeul.appendChild(noticeli_clone);

function notice_moveslide (){
noticeul.style.marginTop = -54 * ++noticeindex + "px";
if(noticeindex >= noticeli.length){
    noticeindex = 0;
    setTimeout(()=>{noticeul.style.transition = "none";}, 1100);
    setTimeout(()=>{noticeul.style.marginTop = "0px";}, 1100);
    setTimeout(()=>{noticeul.style.transition = "margin-top 1s";}, 1200);
}
}

let notice_timer = setInterval(notice_moveslide, 2000);
noticeul.addEventListener("mouseenter", ()=> clearInterval(notice_timer));
noticeul.addEventListener("mouseleave", ()=> notice_timer = setInterval(notice_moveslide, 3000));