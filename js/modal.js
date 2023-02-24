
/* --------------- 순욱 : .modal_ticketing --------------- */
let userselected = {title : "", city : "", town : "", special : "", date : "", schedule : ""},
    printlist = [],
    info_printword =["","",""];
let section_movie = document.querySelector(".section_movie .scrollstyle"),
    section_movie_sortbtn = document.querySelectorAll("input[name='movieTitle_sort']"),
    movietitle_sorted_abc = [...info_movielist].sort((a, b)=>a.title < b.title ? -1 : a.title > b.title ? 1 : 0),
    movietitle_sorted_rate = [...info_movielist].sort((a, b)=>b["ticketrate"] - a["ticketrate"]);
let section_cinema_city = document.querySelector(".group_city"),
    section_cinema_town = document.querySelector(".group_town"),
    section_cinema_special = document.querySelector(".group_special"),
    cinema_city_printlist = [];
let section_date = document.querySelector(".section_date .scrollstyle");
let section_schedule = document.querySelector(".section_schedule .scrollstyle");
let section_ticketinfo = document.querySelector(".section_ticketinginfo"),
    section_ticketinfo_img = section_ticketinfo.querySelector("img"),
    section_ticketinfo_title = section_ticketinfo.querySelector(".print_title"),
    section_ticketinfo_location = section_ticketinfo.querySelector(".print_location"),
    section_ticketinfo_date = section_ticketinfo.querySelector(".print_date"),
    section_ticketinfo_floor = section_ticketinfo.querySelector(".print_floor"),
    section_ticketinfo_time = section_ticketinfo.querySelector(".print_time"),
    section_ticketinfo_party = section_ticketinfo.querySelector(".print_party"),
    section_ticketinfo_seat = section_ticketinfo.querySelector(".print_seat");

function initial_all(){
    userselected = {title : "", city : "", town : "", special : "", date : "", schedule : "" };
    printlist = [];
    event_movie_sort();
    document.querySelector("#movietitle_sorted_rate").checked = true;
    for(t of movietitle_sorted_rate){
        printlist += 
            `<li>
                <input type="radio" name="movieTitle" id="${t.id}">
                <label for="${t.id}" class="grade_${t.grade}" data-src=${t.imgurl}>${t.title}</label>
            </li>`;
    };
    section_movie.innerHTML = printlist;
    event_movie();
    document.querySelector("#cinema_sort_abc").checked = true;
    printlist = [];
    for(i of info_branchlist){
        printlist +=
        `<li>
            <input type="radio" name="cinema_city" id="${i.id}">
            <label for="${i.id}">${i.name}(${i.town.length})</label>
        </li>`;
    };
    section_cinema_city.innerHTML = printlist;
    event_cinema_city();
    section_cinema_town.innerHTML = `<li>지역을 선택해 주세요</li>`
    printlist = [];
    for(i of info_speciallist){
    printlist += 
        `<li>
            <input type="radio" name="cinema_special" id="${i.id}">
            <label for="${i.id}">${i.name}</label>
        </li>`
    }
    section_cinema_special.innerHTML = printlist;
    section_schedule.innerHTML = `<p>영화, 지역, 날짜를 선택해주세요</p>`;
    event_cinema_special();
    initial_info();
};

initial_all()

function fill_movie(list){
    let movietitle_printlist = [];
    for(t of list){
        movietitle_printlist += 
            `<li>
                <input type="radio" name="movieTitle" id="${t.id}">
                <label for="${t.id}" class="grade_${t.grade}" data-src=${t.imgurl}>${t.title}</label>
            </li>`;
    };
    section_movie.innerHTML = movietitle_printlist;
    event_movie();
};
function event_movie_sort(){
    for(i of section_movie_sortbtn){
        i.addEventListener("click", (e)=>{
            e.currentTarget.getAttribute("id") == "movietitle_sorted_rate" ?
            fill_movie(movietitle_sorted_rate):
            fill_movie(movietitle_sorted_abc);
        });
    };
}
function event_movie(){
    let item_movie = section_movie.querySelectorAll("label");
    for(i of item_movie){
        i.addEventListener("click", (e)=>{
            userselected.title = e.target.getAttribute("for");
            section_ticketinfo_img.setAttribute("src", "img/" + e.target.getAttribute("data-src"));
            section_ticketinfo_title.innerText = e.target.innerText;
        });
    };
};
function event_cinema_city(){
    let item_cinema_city = section_cinema_city.querySelectorAll("label");
    for(i of item_cinema_city){
        i.addEventListener("click", (e)=>{
            userselected.city = e.target.getAttribute("for");
            info_printword[0] = e.target.innerText.slice(0, e.target.innerText.indexOf("("));
            info_printword[1] = "";
            info_printword[2] = "";
            section_ticketinfo_location.innerText = info_printword.join(" ");
            let selectedlist = info_branchlist.find(a=>a.id==e.target.getAttribute("for")).town,
                printlist = [];
            for(j of selectedlist){
                printlist += `<li><input type="radio" name="cinema_town" id="${j.id}"><label for="${j.id}">${j.name}</label></li>`;
            };
            section_cinema_town.innerHTML = printlist;
            event_cinema_town();
        });
    };
};
function event_cinema_town(){
    let item_cinema_town = section_cinema_town.querySelectorAll("label");
    for(i of item_cinema_town){
        i.addEventListener("click", (e)=>{
            userselected.town = e.target.getAttribute("for");
            info_printword[1] = e.target.innerText;
            section_ticketinfo_location.innerText = info_printword.join(" ");
            fill_special();
        })
    }
};
function event_cinema_special(){
    let item_cinema_special = section_cinema_special.querySelectorAll("label");
    for(i of item_cinema_special){
        i.addEventListener("click", (e)=>{
            userselected.special = e.target.getAttribute("for");
            info_printword[2] = e.target.innerText;
            section_ticketinfo_location.innerText = info_printword.join(" ");
        });
    }
};
function event_date(){
    let item_date = section_date.querySelectorAll("label");
    for(i of item_date){
        i.addEventListener("click", (e)=>{
            userselected.date = e.target.getAttribute("for");
            let printdate= e.target.getAttribute("for").slice(4),
                info_printword = `${printdate.slice(0, 4)}-${printdate.slice(4, 6)}-${printdate.slice(6)} (${e.target.innerText.slice(0, 1)})`;
            section_ticketinfo_date.innerText = info_printword;
            fill_schedule();
        });
    }
};
function event_schedule(){
    let item_schedule = section_schedule.querySelectorAll("label");
    for(i of item_schedule){
        i.addEventListener("click", (e)=>{
            let starttime = e.currentTarget.querySelector("span").innerText,
                sumtime = Number(starttime.slice(3)) + info_movielist.find(m=>m.id == userselected.title).runningTime,
                cal_hour = Number(starttime.slice(0, 2)) + Math.floor(sumtime/60),
                cal_min = sumtime % 60 < 10? "0"+sumtime % 60 : sumtime % 60;
            let info_printword = `${starttime} ~ ${cal_hour}:${cal_min}${e.currentTarget.classList.contains("style_red") ? " (조조)": e.currentTarget.classList.contains("style_blue") ? " (심야)": ""}`;
            section_ticketinfo_floor.innerText = e.currentTarget.getAttribute("data-lo");
            section_ticketinfo_time.innerText = info_printword;
        });
    }
};
function fill_special(){
    printlist = [];
    let sortedlist = info_branchlist.find((m)=>m.id == userselected.city).town
        .find((n)=>n.id == userselected.town).schedule;
        for(i of Object.keys(sortedlist)){
            printlist += 
            `<li>
                <input type="radio" name="cinema_special" id="${i}">
                <label for="${i}">${info_speciallist.find((m)=>m.id == i).name}</label>
            </li>`
        };
        section_cinema_special.innerHTML = printlist;
        event_cinema_special();
};
function fill_schedule(){
    printlist = [];
    let sortedlist = info_branchlist.find((m)=>m.id == userselected.city).town.find((n)=>n.id == userselected.town).schedule[userselected.special];
    for(i of sortedlist){
        printlist +=`
            <div class="group_schedule">
                 <p><span>${info_speciallist.find(m=>m.id==userselected.special).name}</span> ${i.location} (총 ${i.seat}석)</p>
                 <ul class="cf">`;
        i.timetable[userselected.title][userselected.date].forEach((j, idx)=>{
            let makeid = `${userselected.title}_${userselected.town}_${userselected.date}_${i.floor}_${idx}`
            printlist += 
            `<li>
                <input type="radio" name="schedule" id="${makeid}">
                <label for="${makeid}" class="${j.time < "10:00" ? "style_red": j.time > "22:00" ? "style_blue": ""}" data-lo="${i.location}">
                    <span class="borderstyle">${j.time}</span><span class="remainseat">${j.remain} 석</span>
                </label>
            </li>`
        })
        printlist += `</ul></div>`
        };
        section_schedule.innerHTML = printlist;
        event_schedule()
    };

function initial_fill_date(){
    let daylist = ["일", "월", "화", "수", "목", "금", "토"],
        val_today = new Date(),
        dateprintlist = [],
        dateid = `date${val_today.getFullYear()}${val_today.getMonth()+1 < 10 ? "0"+(val_today.getMonth()+1): val_today.getMonth()+1}${val_today.getDate() < 10 ? "0"+val_today.getDate(): val_today.getDate()}`;
    dateprintlist +=
    `<div class="month scrollfix">
        <p>${val_today.getFullYear()}</p>
        <p>${val_today.getMonth()+1 < 10 ? "0" + val_today.getMonth()+1 : val_today.getMonth()+1} 월</p>
    </div>
    <ul>
        <li>
            <input type="radio" name="date" id="${dateid}">
            <label for="${dateid}" class = "${val_today.getDay() == 0? "style_red": val_today.getDay() == 6? "style_blue" : "" }">${daylist[val_today.getDay()]} ${val_today.getDate()}</label>
        </li>`;
    for(i = 1; i<30; i++){
        let calcdate = new Date(
            val_today.getFullYear(),
            val_today.getMonth(),
            val_today.getDate()+i
        );
        let dateid = `date${calcdate.getFullYear()}${calcdate.getMonth()+1 < 10 ? "0"+(calcdate.getMonth()+1): calcdate.getMonth()+1}${calcdate.getDate() < 10 ? "0"+calcdate.getDate(): calcdate.getDate()}`;
        if(dateid.slice(-2)=== "01"){
            dateprintlist += 
            `
            </ul>
                <div class="month scrollfix">
                    <p>${calcdate.getFullYear()}</p>
                    <p>${calcdate.getMonth()+1 < 10 ? "0"+(calcdate.getMonth()+1): calcdate.getMonth()+1} 월</p>
                </div>
            <ul>
                <li>
                <input type="radio" name="date" id="${dateid}">
                <label for="${dateid}" class = "${calcdate.getDay() == 0? "style_red": calcdate.getDay() == 6? "style_blue" : "" }">${daylist[calcdate.getDay()]} ${calcdate.getDate()}</label>
            </li>`
        }else{
            dateprintlist += 
            `<li>
                <input type="radio" name="date" id="${dateid}">
                <label for="${dateid}" class = "${calcdate.getDay() == 0? "style_red": calcdate.getDay() == 6? "style_blue" : "" }">${daylist[calcdate.getDay()]} ${calcdate.getDate()}</label>
            </li>`
        }
    };
    dateprintlist += "</ul>"
    section_date.innerHTML = dateprintlist;
    event_date();
};

initial_fill_date()

function initial_info(){
    section_ticketinfo_img.setAttribute("src", "img/img_modalthumb_none.png");
    section_ticketinfo_title.innerText = "영화를 선택해 주세요";
    section_ticketinfo_location.innerText = "";
    section_ticketinfo_date.innerText = "";
    section_ticketinfo_floor.innerText = "";
    section_ticketinfo_time.innerText = "";
    section_ticketinfo_party.innerText = "";
    section_ticketinfo_seat.innerText = "";
};



