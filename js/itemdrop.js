$(function(){
	$(".dropInput").keyup(function(){
		var drop = parseFloat($("#itemDrop").val());
		var luck = parseInt($("#luck").val());
		var result = 0.0;
		
		luck = luck/10000;
		var sum = drop*luck;
		console.log("sum : "+sum);
		result = drop+sum;
		console.log("result : "+result);
		if(sum<drop){
			$("#dropResult").html(drop+"%");
		}else{
			if(result>=100){
				$("#dropResult").html("100%");
			}else{
				$("#dropResult").html(result+"%");
			}
		}
		
	});
});
