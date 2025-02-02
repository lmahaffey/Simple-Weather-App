
   $(function(){


    var clock = $('#clock'),
        alarm = clock.find('.alarm'),
        ampm = clock.find('.ampm');
    
    
    var digit_to_name = 'zero one two three four five six seven eight nine'.split(' ');
    
    
    var digits = {};
    
    
    var positions = [
        'h1', 'h2', ':', 'm1', 'm2', ':', 's1', 's2'
    ];
    
    
    var digit_holder = clock.find('.digits');
    
    $.each(positions, function(){
    
        if(this == ':'){
            digit_holder.append('<div class="dots">');
        }
        else{
    
            var pos = $('<div>');
    
            for(var i=1; i<8; i++){
                pos.append('<span class="d' + i + '">');
            }
    
        
            digits[this] = pos;
    
    
            digit_holder.append(pos);
        }
    
    });
    
    
    var weekday_names = 'SUN MON TUE WED THU FRI SAT'.split(' '),
        weekday_holder = clock.find('.weekdays');
    
    $.each(weekday_names, function(){
        weekday_holder.append('<span>' + this + '</span>');
    });
    
    var weekdays = clock.find('.weekdays span');
    
    
    (function update_time(){
    
    
        var now = moment().format("hhmmssdA");
    
        digits.h1.attr('class', digit_to_name[now[0]]);
        digits.h2.attr('class', digit_to_name[now[1]]);
        digits.m1.attr('class', digit_to_name[now[2]]);
        digits.m2.attr('class', digit_to_name[now[3]]);
        digits.s1.attr('class', digit_to_name[now[4]]);
        digits.s2.attr('class', digit_to_name[now[5]]);
    
    
    
        var dow = now[6];
        dow--;
    
        if(dow < 0){
            dow = 6;
        }
    
        weekdays.removeClass('active').eq(dow).addClass('active');
    
        ampm.text(now[7]+now[8]);
    
        setTimeout(update_time, 1000);
    
    })();
    
    
    $('a.button').click(function(){
        clock.toggleClass('light dark');
    });
    
    });
    //selector variable
var inputval = document.querySelector('#cityinput')
var btn = document.querySelector('#add');
var city = document.querySelector('#cityoutput')
var descrip = document.querySelector('#description')
var temp = document.querySelector('#temp')
var wind = document.querySelector('#wind')
// Get your own free OWM API key at https://www.openweathermap.org/appid - please do not re-use mine!
const apik = CONFIG.API_KEY

// console.log("API Key:", window.CONFIG.API_KEY);

//kelvin to celcious
function convertion(val){
    return (val - 273).toFixed(2)
}
//fetch
    btn.addEventListener('click', function(){
        fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputval.value+'&appid='+apik)
        .then(res => res.json())
         //.then(data => console.log(data))
        .then(data => {
            var nameval = data['name']
            var descrip = data['weather']['0']['description']
            var tempature = data['main']['temp']
            var wndspd = data['wind']['speed']

            city.innerHTML=`City: ${nameval}`
            temp.innerHTML = `Temperature: ${ convertion(tempature)} C`
            description.innerHTML = `Conditions: ${descrip}`
            wind.innerHTML = `Wind Speed: ${wndspd} km/h`

        })
        .catch(err => alert('You entered Wrong city name'))
    })

