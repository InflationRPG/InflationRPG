$(function(){
	//숫자만 입력하게 
	$(document).on("keyup keydown",".repoint",function(e){
		if((e.keyCode<48||e.keyCode>57)&&(e.keyCode<96||e.keyCode>105)&&e.keyCode!=8){
			return false;
		} 
	});
	//값이 없으면 0 
	$(".repoint").focusout(function(){
		var val = $(this).val();
		if(val.length==0){
			$(this).val(0);
		}
	});
	
	$(".repoint").focus(function(){
		var val = $(this).val();
		if(val==0){
			$(this).val('');
		}
	});
	
	//펼치기
	var cnt = 1;
	$("#infoBtn").click(function(){
		$(".setting").slideToggle('slow');
		if(cnt==0){
			cnt = 1;
			$(this).html("펼치기");
		}else{
			cnt = 0;
			$(this).html("접기");
		}
	});
	//환생 상점 계산
	$("#statusBtn").click(function(){
		$("#statusResult").html("");
		$("#divpoint").html("");
		var total = rebirthPointCalculation();
		$("#statusResult").append("총 가격 : "+numComma(total)+"포인트<br>");
		
	});
});


function rebirthPointCalculation(){
	var total = 0;
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
	
	//계산할 항목 반복문
	for(var i=0;i<textList.length;i++){
		var settingArray = setting(i);
		var div = settingArray[0];
		var shopPoint = parseInt(settingArray[1]);
		var addPoint = parseInt(settingArray[2]);
		var level = parseInt(settingArray[3]);
		var min = parseInt(minArray[i]);
		var max = parseInt(maxArray[i]);
		var point = 0;
		var sub = 0;
		if(min==0&&max==0)
			continue;
		var levelStatusValue = levelStatus(i,min,level);
		var totalLevelStatus = 0;
		//초기 가격
		point = initialPoint(min, div, shopPoint, addPoint, level);
		//데미지 단위 10 초기 10 단위가격 10 레벨 20
		//계산
		var lvPoint = 0;
		var divPoint = 0;
		
		for(var j=min;j<max;j++){
			var check = 0;
			//증가 도중 레벨 단위의 나머지가 0일때
			if(j%level==0 && j!=min){
				point = point + levelPoint(level, j);
				console.log(levelPoint(level, j));
				//뎀증, 크뎀, 체력만 증가
				if(levelStatusValue!=0)
					levelStatusValue++;
			}
			//증가 단위
			if(j%div==0 && j!=min){
				point = point + addPoint;
			}
			sub = sub + point;
			
			totalLevelStatus = totalLevelStatus + levelStatusValue;
		}
		total = total + sub;
		//체력 계산
		if(i==5)
			totalLevelStatus = totalLevelStatus * 3000000;
		
		$("#statusResult").append(textList[i]+" : "+numComma(sub)+"포인트<br>");
		$("#divpoint").append(textList[i]+" : "+numComma(totalLevelStatus)+"<br>");
	}
	
	return total;
}

//레벨 단위 능력치 증가
function levelStatus(index,min,level){
	//공속, 이속, 데미지, 크뎀, 스텟포, hp,크확 순서
	var levelStatusArray = [0,0,1,1,0,1,0];
	var levelStatusIndex = levelStatusArray[index];
	//1씩 증가
	for(var i=0;i<parseInt(min/level);i++){
		levelStatusIndex = levelStatusIndex+levelStatusArray[index];
	}
	return levelStatusIndex;
}

//레벨 단위 포인트
function levelPoint(level, now){
	var point = 0
	for(var i=1;i<=parseInt(now/level);i++){
		point = point + ((50*i)*2);
	}
	return point;
}

//min값 초기 포인트 가격
function initialPoint(min, div, shopPoint, addPoint, level){
	//뎀증 초기가격 100, 단위 20, 증가 포인트 20, 레벨 200
	var point = shopPoint;
	
	//초기 증가 가격
	point = point + (parseInt(min/div) * addPoint);
	
	//레벨값 적용
	var maxLength = parseInt(min/level);
	for(var i=1;i<=maxLength;i++){
		point = point + ((50*i)*2);
	}
	return point;
}

//셋팅
function setting(i){
	var settingArray = new Array();
	//공속, 이속, 데미지, 크뎀, 스텟포, hp,크확 순서
	//가격이 올라가는 단위
	var divArray = [1,1,30,30,10,50,1];
	settingArray[0] = divArray[i];
	
	//초기 가격
	var pointArray = [30,30,50,50,100,30,200];
	settingArray[1] = pointArray[i];
	
	//단위마다 올라가는 가격
	var addpointArray = [10,10,20,20,30,10,50];
	settingArray[2] = addpointArray[i];
	
	//특수 레벨
	var levelArray = [0,0,500,500,200,1000,0];
	settingArray[3] = levelArray[i];
	
	return settingArray;
}

function numComma(num){
	return num.toLocaleString();
}