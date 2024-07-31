function renderBarChart(data, in_or_out) {
   const margin = {top: 60, right: 20, bottom: 80, left: 80},
            width = 600 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

   var in_out_text;
   var in_out_title;

   if(in_or_out === 'in'){
      in_out_text="#in-chart";
      in_out_title="Subject Bar Chart(in)";
   }
   else if(in_or_out === 'out'){
      in_out_text="#out-chart";
      in_out_title="Subject Bar Chart(out)";
   }

      // 创建SVG容器
   d3.select(in_out_text).select("svg").remove();

   var svg = d3.select(in_out_text).append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	   .append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

   var x = d3.scale.ordinal()
            .domain(data.x)
            .rangeBands([0, width], 0.05);

   // 设置y比例尺
   var y = d3.scale.linear()
            .domain([0, d3.max(data.y)])
            .range([height, 0]);

   var tip = d3.tip().attr('class', 'd3-tip').html(function(d) { 
      return "<b>times:" + d + "</b>";
   });

   var xAxisGroup = svg.append("g")
		.attr("class", "x-axis axis");

   var yAxisGroup = svg.append("g")
	.attr("class", "y-axis axis");

   // 添加x轴
   var xAxis = d3.svg.axis()
   .scale(x)
   .orient("bottom");

   // 添加y轴
   var yAxis = d3.svg.axis()
   .scale(y)
   .orient("left");

   // svg.append("g")
   svg.select(".x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis)
      .selectAll("text").call(wrap,5).attr("y",15);
      // .attr("class", "axis-label")
      // .attr("transform", "rotate(-20)")
      // .style("text-anchor", "end");


   // svg.append("g")
   svg.select(".y-axis")
      .call(yAxis)
      .selectAll("text")
      .attr("class", "axis-label");


   // 创建柱状图

   var bar = svg.selectAll(".bar")
   .data(data.y);

   bar.enter()
      .append("rect")
      .attr("class", "bar");

   bar.attr("x", (d, i) => x(data.x[i]))
      .attr("y", d => y(d))
      .attr("width", x.rangeBand())
      .attr("height", d => height - y(d))
      .on('mouseover', tip.show)
		.on('mouseout', tip.hide);
   // Remove
	bar.exit().remove();

	// Invoke tooltip
	bar.call(tip)

   // 添加y轴标签
   svg.append("text")
      .attr("class", "axis-label")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left + 20)
      .attr("x", -height / 2)
      .attr("dy", "-1em")
      .style("text-anchor", "middle");

   // 添加图表标题
   svg.append("text")
      .attr("x", width / 2)
      .attr("y", -margin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .text(in_out_title);
}


function wrap(text, width) {
   text.each(function() {
     var text = d3.select(this),
         words = text.text().split(/\s+/).reverse(),
         word,
         line = [],
         lineNumber = 0,
         lineHeight = 1.1, // ems
         y = text.attr("y"),
         dy = parseFloat(text.attr("dy")),
         tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
     while (word = words.pop()) {
       line.push(word);
       tspan.text(line.join(" "));
       if (tspan.node().getComputedTextLength() > width) {
         line.pop();
         tspan.text(line.join(" "));
         line = [word];
         tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
       }
     }
   });
}


function drawsubjectbar(){
    //获取时间选择器的值
    var times = document.getElementById('choose-time')
    var selected_time = times.options[times.selectedIndex].value

    var in_bar_chart = d3.selectAll('.sub-chart')
    var in_text = in_bar_chart.select('p')
    if (in_text.empty()){
        in_bar_chart.append('p').attr('id','sub_time').text(`Choosing Time: ${selected_time}`);
    }
    else{
        in_text.text(`Choosing Time: ${selected_time}`)
    }
    
    
    //绘制转入专业的柱状图
    //top5_sub["08-18"]['in']
    renderBarChart(top5_sub[selected_time]['in'],'in');

    
    //转出
    renderBarChart(top5_sub[selected_time]['out'],'out');
    
}
