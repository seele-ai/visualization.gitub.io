function main(){
    //读取学科储存器所用json
    var subject_data
    d3.json('json/subjectlist.json',function(a){
        subject_data = a
        //更新城市选择器
        upgradecitylist()
        //更新学科选择器
        upgradesubjectlist(subject_data)
    });
}

function upgradecity(){
    drawmap();
    drawcitybar();
}

function upgradesubject(){
    drawsubjectbar();
    drawtable();
}

//更新城市选择器
function upgradecitylist(){
    var citylist = ['All']
    citylist.push(datalist_au_0818[0].from)
    for( var i = 0; i < 20; i++){
        citylist.push(datalist_au_0818[i].to)
    }
    citylist.push("Nurmijarvi")
    d3.select("#choose-city").selectAll('option')
    .data(citylist).enter().append('option')

    d3.select('#choose-city').selectAll('option')
    .attr('value',function(d){return d})
    .text(function(d){return d})
}


//更新学科选择器
function upgradesubjectlist(subject_data){
    var times = document.getElementById('choose-time')
    var selected_time = times.options[times.selectedIndex].value
    for (var i = 0; i < subject_data.length; i++ )
        {if(subject_data[i].time == selected_time)
            {
            var subjectlist = subject_data[i].subjects
            d3.select('#choose-subject').selectAll('option')
            .data(subjectlist)
            .attr('value',function(d){return d})
            .text(function(d) {return d})
            }
        };
    upgradecity();
    upgradesubject();
    }


main()