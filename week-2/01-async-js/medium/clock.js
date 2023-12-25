
const date = new Date("July 21, 1983 13:15:00");
let seconds = date.getSeconds();
let minutes = date.getMinutes();
let hours = date.getHours();


function clock(){
    

    let StringSeconds = '';
    let StringMinutes = '';
    let StringHours = '';
    let AmPm = '';

    seconds += 1;
    if (seconds == 60){
        minutes += 1;
        seconds = 0;
    }

    if(minutes == 60){
        hours += 1;
        minutes = 0;
        seconds = 0;
    }



    if(hours >= 12){
        hours = hours - 12;
        AmPm = ' PM '
    }else{

        AmPm = ' AM '
    }

    
    if(`${seconds}`.length == 1){
        StringSeconds = '0'+   `${seconds}`;
    }else{
        StringSeconds = `${seconds}`;
    }

    if(`${minutes}`.length == 1){
        StringMinutes = '0'+   `${minutes}`;
    }else{
        StringMinutes = `${minutes}`;
    }

    if(`${hours}`.length == 1){
        StringHours = '0'+   `${hours}`;
    }else{
        StringHours = `${hours}`;
    }

    console.log(`${StringHours} : ${StringMinutes} : ${StringSeconds} ${AmPm}`);
    

    if(AmPm == ' PM '){
        hours += 12;
    }

}


setInterval(clock , 1000);

// seconds increases one by one inside the counter
// once it reaches 60 