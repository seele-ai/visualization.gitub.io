function drawmap(){
    //绘制地图


    //获取选择器的值
    var times = document.getElementById('choose-time')
    var selected_time = times.options[times.selectedIndex].value
    var citys = document.getElementById('choose-city')
    var selected_city = citys.options[citys.selectedIndex].value
    var in_or_outs = document.getElementById('choose-in-or-out')
    var selected_in_or_out = in_or_outs.options[in_or_outs.selectedIndex].value
    
    //在地图上绘制各城市间的线
    
}