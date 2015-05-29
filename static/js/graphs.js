queue()
	.defer(d3.json, "/solarisstats/mpstat")
	.await (makeGraphs);

function makeGraphs(error,mpstatJson) {
	//create a Crossfilter instance
	var mpstat = mpstatJson
	
// 	mpstat.forEach(function(d) {
// 		d["CPU"] = parseInt(d["CPU"]);
// 		d["xcal"] = parseInt(d["xcal"]);
// 		d["intr"] = parseInt(d["intr"]);
// 		d["ithr"] = parseInt(d["ithr"]);
// 		d["csw"] = parseInt(d["csw"]);
// 		d["icsw"] = parseInt(d["icsw"]);
// 	});
	
	var ndx = crossfilter(mpstat);

	//allows for dimensions to be diff cols instead of values of cols	
	function regroup(dim, cols) {
	    var _groupAll = dim.groupAll().reduce(
		function(p, v) { // add
		    cols.forEach(function(c) {
			p[c] += v[c];
		    });
		    return p;
		},
		function(p, v) { // remove
		    cols.forEach(function(c) {
			p[c] -= v[c];
		    });
		    return p;
		},
		function() { // init
		    var p = {};
		    cols.forEach(function(c) {
			p[c] = 0;
		    });
		    return p;
		});
	    return {
		all: function() {
		    // or _.pairs, anything to turn the object into an array
		    return d3.map(_groupAll.value()).entries();
		}
	    };
	}

	//doesn't matter what we index the dimension on
	var rowDim = ndx.dimension(function(d) { return d["CPU"]; });
	var sidewaysGroup = regroup(rowDim, ['xcal', 'intr', 'ithr', 'csw', 'icsw']);

	//var xcalDim = ndx.dimension(function(d) { return d["xcal"]; });
	//var xcalStat = xcalDim.group()
	//var totalxcal = xcalDim.group().reduceSum(function(d) { return d["xcal"]; });

	//define charts
	var cpuRowChart = dc.rowChart('#row-chart');
	var dataTable = dc.dataTable('#table-stats');
	

	//pass parameters for charts
	cpuRowChart
		.height(600)
		.dimension(rowDim)
		.group(sidewaysGroup)
		.elasticX(true)
		.xAxis().ticks(4)
// 	cpuRowChart.onClick = function(){};

	dataTable
		.height(600)
		.dimension(rowDim)
		.group(function(d){})
		.columns([
			function(d) { return d["CPU"]; },
			function(d) { return d["xcal"]; },
			function(d) { return d["intr"]; },
			function(d) { return d["ithr"]; },
			function(d) { return d["csw"]; },
			function(d) { return d["icsw"]; }
		])
		.sortBy(function(d){ return d["CPU"]; })
		.order(d3.ascending);

	dc.renderAll();
		
};
