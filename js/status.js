$(function(){
	
	//숫자만 입력하게 
	$(".repoint").keyup(function(e){
		//96~105 48~57	
		if((e.keyCode<48||e.keyCode>57)&&(e.keyCode<96||e.keyCode>105)&&e.keyCode!=8){
			return false;
		} 
	});
	
	$(".repoint").keydown(function(e){
		//96~105 48~57	
		if((e.keyCode<48||e.keyCode>57)&&(e.keyCode<96||e.keyCode>105)&&e.keyCode!=8){
			return false;
		}
	});
	
	
	//환생 상점 계산
	$("#statusBtn").click(function(){
		$("#statusResult").html("");
		$("#divpoint").html("");
		
		var subtotal = 0;
		var total = 0;

		if($("#atspeed1").val()>40 || $("#atspeed2").val()>40){
			$("#statusResult").append("공속의 최대 수치를 넘어갔습니다.<br>");
			return false;
		}else if($("#mvspeed1").val()>20||$("#mvspeed2").val()>20){
			$("#statusResult").append("이속의 최대 수치를 넘어갔습니다.<br>");
			return false;
		}else if($("#status1").val()>6297||$("#status2").val()>6297){
			$("#statusResult").append("스텟 포인트의 최대 수치를 넘어갔습니다.<br>");
			return false;
		}else if($("#criper1").val()>100||$("#criper2").val()>100){
			$("#statusResult").append("크리 확률의 최대 수치를 넘어갔습니다.<br>");
			return false;
		}
		
		//공속, 이속, 데미지, 크뎀, 스텟포, hp,크확 순서
		var textList = ["공속","이속","데미지","크뎀","스텟포","체력","크확"];
		//최소값
		var minArray = [$("#atspeed1").val(),$("#mvspeed1").val(),
				   $("#demege1").val(),$("#cridemege1").val(),
				   $("#status1").val(),$("#hp1").val(),
				   $("#criper1").val()];
		
		//최대값
		var maxArray = [$("#atspeed2").val(),$("#mvspeed2").val(),
			   $("#demege2").val(),$("#cridemege2").val(),
			   $("#status2").val(),$("#hp2").val(),
			   $("#criper2").val()];
		
		//가격이 올라가는 단위
		var divArray = [1,1,100,100,200,100,50];
		
		//초기 가격
		var pointArray = [3,3,30,30,30,30,50];
		
		//단위마다 올라가는 가격
		var addpointArray = [0,0,10,10,20,10,30];
	
		for(var i=0; i<7;i++){
			var min = minArray[i];
			var max = maxArray[i];
			var div = divArray[i];
			var point = pointArray[i];
			var addpoint = addpointArray[i];
			
			subtotal = pointCal(min,max,div,point,addpoint);
			
			total = total + subtotal;
			
			if(subtotal != 0){
				$("#statusResult").append(textList[i]+" : "+numComma(subtotal)+"포인트<br>");
			} 
		}

		$("#statusResult").append("총합 : "+numComma(total)+"포인트<br>");
		
		//1 3 8 19 45 110 250 550 1000 3500
		var rebirthPer = $("#rebirthPer").val();
		rebirthPer = 1+(rebirthPer/100);
		var arry = [1,3,8,19,45,110,250,550,1000,3500];
		
		for(var i=0, j=10; i<arry.length;i++, j=j+10){
			$("#divpoint").append(j+"만 환생 : "+numComma(Math.ceil(total/(arry[i]*rebirthPer)))+"번<br>");
		}
	});
	
	
	
	
});

function pointCal(min,max,div,point,addpoint){
	var subtotal = 0;
	var nowPoint = 0;
	//초기 시작 가격
	for(var i=0;i<parseInt(min/div);i++){
		point = point + addpoint;
	}
	
	//계산
	var maxLeng = parseInt((max-min)/div);
	for(var i = 0; i<maxLeng; i++){
		subtotal = subtotal + (point*div);
		point = point + addpoint;
	}
	var mok = parseInt((max-min)%div);
	subtotal = subtotal + (mok * point);
	
	return subtotal;
}

function numComma(num){
	return num.toLocaleString();
}
