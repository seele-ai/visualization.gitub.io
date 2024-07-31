function drawcitybar(){
    //获取选择器的值
    var times = document.getElementById('choose-time')
    var selected_time = times.options[times.selectedIndex].value
    var citys = document.getElementById('choose-city')
    var selected_city = citys.options[citys.selectedIndex].value
    var in_or_outs = document.getElementById('choose-in-or-out')
    var selected_in_or_out = in_or_outs.options[in_or_outs.selectedIndex].value
    
    var data_of_city
        if(selected_time == '08-18'){
            data_of_city = datalist_au_0818
        }else if(selected_time == '09-13'){
            data_of_city = datalist_au_0913
        }else{
            data_of_city = datalist_au_1418
        }
        
        var citylist = []
        citylist.push(datalist_au_0818[0].from)
        for( var i = 0; i < 20; i++){
            citylist.push(datalist_au_0818[i].to)
        }
        citylist.push('Nurmijarvi')

    if (selected_city == 'All'){
        //筛选数据
        var data_the_city = []
        if(selected_in_or_out == 'in'){
            for (var i = 0; i < citylist.length; i++){
                data_the_city.push({'to':'All','from':citylist[i],'time':0})
                for(var j = 0; j < data_of_city.length; j++){
                    if(data_of_city[j].to == citylist[i]){
                        data_the_city[i].time += data_of_city[j].time
                    }

                }
            }
        }else{
            for(var i = 0; i < citylist.length; i++){
                data_the_city.push({'to':citylist[i],'from':'All','time':0})
                for (var j = 0; j <data_of_city.length; j++){    
                    if(data_of_city[j].from == citylist[i]){
                        data_the_city[i].time += data_of_city[j].time
                    }
                }
            }
        }

    }else{
        //筛选数据
        var data_the_city = []
        if(selected_in_or_out == 'in'){
            for(var i = 0; i < data_of_city.length; i++){
                if(data_of_city[i].to == selected_city){
                    data_the_city.push(data_of_city[i])
                }
            }
        }else{
            for(var i = 0; i < data_of_city.length; i++){
                if(data_of_city[i].from == selected_city){
                    data_the_city.push(data_of_city[i])
                }
            }
        }}

            //绘制柱状图
            var w = 1000
            var h = 900
            svg = d3.select('.bar-chart').select('svg');
            svg.attr('class','citysvg')
            .attr('width', w)
            .attr('height',h)

            //比例尺
            var cityscale = d3.scale.ordinal()
            .domain(citylist)
            .rangePoints([0,w],3.5)


            var yscale = d3.scale.log()
            //var yscale = d3.scale.linear()
            .domain([1,d3.max(data_the_city,function(d) {return d.time})])
            .range([h-20,45])
            .nice()
            
            var xAxis = d3.svg.axis().scale(cityscale).orient('bottom')

            svg.select('g.cityaxis').call(xAxis)
            .attr('transform',`translate(0,${h-20})`)

            var yAxis = d3.svg.axis().scale(yscale).orient('left')
            .tickFormat(d3.format(''))
            
            svg.select('g.yaxis').call(yAxis)
            .attr('transform',`translate(45,0)`)

            //柱
            if(selected_in_or_out == 'in'){
                var bars = svg.selectAll('rect.city-bar').data(data_the_city);

                bars.exit().remove();

                bars.enter().append('rect').attr('class','city-bar');

                bars
                .attr('x',function(d){return cityscale(d.from)-15})
                .attr('y',function(d){return yscale(d.time)-10})
                .attr('width',w/citylist.length-10)
                .attr('height',function(d){return h- yscale(d.time)-10})
                .attr('fill','#66ccff')
                .on('mouseover',function(d){
                    d3.select(this)
                    .transition('color')
                    .duration(250)
                    .attr('fill','cyan');

                    var xposition = parseFloat(d3.select(this).attr('x'))+20;
                    var yposition = parseFloat(d3.select(this).attr('y'))-yscale(d.time)+10;

                    d3.select('#showdata')
                    .style('left',xposition+'px')
                    .style('top',yposition+'px')
                    .classed('hidden',false)
                    
                    if(selected_city == 'All'){
                        d3.select('#value_from')
                        .text(`from:${d.to}`)

                        d3.select('#value_to')
                        .text(`to:${d.from}`)
                    }else{

                        d3.select('#value_from')
                        .text(`from:${d.from}`)

                        d3.select('#value_to')
                        .text(`to:${d.to}`)}

                    d3.select('#value_count')
                    .text(`count:${d.time}`)

        })
                .on('mouseout',function(d){
                    d3.select(this)
                    .transition('color')
                    .duration(250)
                    .attr('fill','#66ccff');
                
                    d3.select('#showdata').classed('hidden',true);
                });
            }else{
                var bars = svg.selectAll('rect').data(data_the_city);

                bars.exit().remove();

                bars.enter().append('rect').attr('calss','city-bar');

                bars.attr('x',function(d){return cityscale(d.to)-15})
                .attr('y',function(d){return yscale(d.time)-10})
                .attr('width',w/citylist.length-10)
                .attr('height',function(d){return h-yscale(d.time)-10})
                .attr('fill','#66ccff')
                .on('mouseover',function(d){
                    d3.select(this)
                    .transition('color')
                    .duration(250)
                    .attr('fill','cyan');

                    var xposition = parseFloat(d3.select(this).attr('x'))+20;
                    var yposition = parseFloat(d3.select(this).attr('y'))-yscale(d.time);

                    d3.select('#showdata')
                    .style('left',xposition+'px')
                    .style('top',yposition+'px')
                    .classed('hidden',false)
                    
                    if(selected_city == 'All'){
                        d3.select('#value_from')
                        .text(`from:${d.to}`)

                        d3.select('#value_to')
                        .text(`to:${d.from}`)
                    }else{

                        d3.select('#value_from')
                        .text(`from:${d.from}`)

                        d3.select('#value_to')
                        .text(`to:${d.to}`)}

                    d3.select('#value_count')
                    .text(`count:${d.time}`)

                })
                .on('mouseout',function(d){
                    d3.select(this)
                    .transition('color')
                    .duration(250)
                    .attr('fill','#66ccff');
                
                    d3.select('#showdata').classed('hidden',true);
                })
        }
}