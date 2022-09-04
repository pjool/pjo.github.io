//target time (in local time)
const targetHours = 20;
const targetMinutes = 17;

//target time in seconds
const timePerDay = 24 * 60 * 60 * 1000
const targetTime = (targetHours*3600 + targetMinutes*60)*1000;

const timeZones = [
    ["US/Samoa", -39600, -11, "på Samoa"],
    ["US/Hawaii", -36000, -10, "på Hawai"],
    ["Pacific/Marquesas", -34200, -9.5, "på Marquesasøerne"],
    ["US/Alaska", -32400, -9, "i Alaska"],
    ["America/Vancouver", -28800, -8, "i Vancouver"],
    ["US/Arizona", -25200, -7, "i Arizona"],
    ["Mexico/Mexico", -21600, -6, "i Mexico"],
    ["Jamaica", -18000, -5, "på Jamaica"],
    ["America/Caracas", -16200, -4.5, "i Venezuela"],
    ["America/Thule", -14400, -4, "på Thule Air Base"],
    ["Canada/Newfoundland", -12600, -3.5, "i Newfoundland"],
    ["Chile/Chile", -10800, -3, "i Chile"],
    ["Brazil/DeNoronha", -7200, -2, "på Fernando de Noronha"],
    ["Atlantic/Azores", -3600, -1, "på Azorerne"],
    ["Europe/London", 0, 0, "i England"],
    ["Europe/Copenhagen", 3600, 1, "i Danmark"],
    ["Europe/Athens", 7200, 2, "i Grækenland"],
    ["Africa/Nairobi", 10800, 3, "i Kenya"],
    ["Iran", 12600, 3.5, "i Iran"],
    ["Asia/Dubai", 14400, 4, "i Dubai"],
    ["Asia/Kabul", 16200, 4.5, "i Afghanistan"],
    ["Asia/Ashgabat", 18000, 5, "i Turkmenistan"],
    ["Asia/Calcutta", 19800, 5.5, "i Indien"],
    ["Asia/Kathmandu", 20700, 5.75, "i Nepal"],
    ["Asia/Dhaka", 21600, 6, "i Bangladesh"],
    ["Asia/Rangoon", 23400, 6.5, "i Myanmar"],
    ["Asia/Saigon", 25200, 7, "i Vietnam"],
    ["Asia/Singapore", 28800, 8, "i Singapore"],
    ["Asia/Pyongyang", 30600, 8.5, "i Nordkorea"],
    ["Australia/Eucla", 31500, 8.75, "i Eucla"],
    ["Japan", 32400, 9, "i Japan"],
    ["Australia/North", 34200, 9.5, "i Darwin"],
    ["Australia/Sydney", 36000, 10, "i Sydney"],
    ["Australia/Lord_Howe", 37800, 10.5, "på Lord Howe Island"],
    ["Pacific/Norfolk", 39600, 11, "på Norfolkøen"],
    ["Antarctica/South_Pole", 43200, 12, "på Sydpolen"],
    ["Pacific/Chatham", 45900, 12.75, "på Chathamøerne"]
]


function updateTime() {

    function toClockSegment(t) {
        return t.toString().padStart(2, "0");
    }
    
    let localTime = new Date();
    let hours = localTime.getHours();
    let minutes = localTime.getMinutes();
    let seconds = localTime.getSeconds();

    let utcTime = new Date().getTime() % timePerDay; //get UTC time and convert to secodns

    //find next time zone
    let minDiff = Infinity;
    let nextZone = -1;

    for (let i = 0; i < timeZones.length; i++) {
        let zone = timeZones[i];
        let diff = (targetTime - (utcTime + zone[1]*1000) + timePerDay) % timePerDay;
        if (diff < minDiff) {
            minDiff = diff;
            nextZone = i;
        }
    }

    console.log(timeZones[nextZone][0]);

    let diffInSeconds = Math.floor(minDiff / 1000);

    let message;
    if (diffInSeconds <= 60) {
        message = "Nu er det Mad-Mickey tid!";
    }
    else {
        let location = timeZones[nextZone][3];
        //diff = (diffInSeconds - minutes + 60 ) % 60;
        let s = diffInSeconds % 60;
        let m = Math.floor(diffInSeconds / 60)
        let pluralSuffix = (diffInSeconds == 1) ? "" : "ter";
        message = `Der er ${toClockSegment(m)}:${toClockSegment(s)} minut${pluralSuffix} til Mad Mickey ${location}!`;
    }

    // convert to clock



   

    let timeString = toClockSegment(hours) + "." + toClockSegment(minutes) + ":" + toClockSegment(seconds);
    document.getElementById("clock").innerHTML = timeString;
    document.getElementById("diff").innerHTML = message;
}



updateTime()
setInterval(updateTime, 1000)