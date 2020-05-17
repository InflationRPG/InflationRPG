$(function(){
	//딜 계산기 계산
	$("#dmgCalBtn").click(function(){
		var atk = $("#atk").val();
		var damege = parseInt($("#damege").val());
		var cridmg = parseInt($("#cridmg").val());
		var shield = parseInt($("#shield").val());
		var skillMin = [$("#qMin").val(),$("#wMin").val(),$("#eMin").val(),$("#ringMin").val(),$("#armourMin").val()];
		var skillMax = [$("#qMax").val(),$("#wMax").val(),$("#eMax").val(),$("#ringMax").val(),$("#armourMax").val()];
		var skillLevel = [20, 10, 4,1,1];
		var min = ["#qMinResult","#wMinResult","#eMinResult","#ringMinResult","#armourMinResult"];
		var max = ["#qMaxResult","#wMaxResult","#eMaxResult","#ringMaxResult","#armourMaxResult"];
		for(var i=0;i<5;i++){
			//데미지 퍼센트
			var damegeMin = (atk*(skillLevel[i]*parseInt(skillMin[i])))*(1+(damege*0.01));
			var damegeMax = (atk*(skillLevel[i]*parseInt(skillMax[i])))*(1+(damege*0.01));

			//크뎀 퍼센트
			damegeMin = damegeMin * ((100+cridmg)*0.01);
			damegeMax = damegeMax * ((100+cridmg)*0.01);

			//방어력 계산
			damegeMin = damegeMin - (damegeMin*(shield/(shield+100)));
			damegeMax = damegeMax - (damegeMax*(shield/(shield+100)));

			$(min[i]).html(FormattingNumberToKoreanNotation(damegeMin));
            $(max[i]).html(FormattingNumberToKoreanNotation(damegeMax));
		}
	});
	
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
});

/*function numComma(num){
	return num.toLocaleString();
}*/
/*function numFormat(num){
	num = ""+num;
	if(num.indexOf("e+")>0){
		var subNum = num.substring(0,num.indexOf("e+"));
		var indices = num.substring(num.indexOf("e+")+2,num.length);
		console.log(num);
		console.log(subNum);
		console.log(indices);
		var subNumSplit = new Array();
		if(subNum.indexOf(".")>0){
			subNumSplit = subNum.split(".");
			num = subNumSplit[0]+""+subNumSplit[1];
			indices = indices - subNumSplit[1].length;
		}else{
			num = subNum;
		}
		 
		for(var i=0;i<indices;i++){
			num = num+"0";
		}
	}

	var numLength = num.length;
	var numText = "";
	var dan = ["만","억","조","경","해","자","양","구","간","정","재","극"];
	var cnt = 0;
	
	for(var i=numLength,j=0;i>0;i--,j++){
		if(j>0&&j%4==0){
			numText = numText+dan[cnt];
			cnt++;
		}
		numText = numText + num.substring(i-1,i);
	}
	var reverseText = "";
	var zerocnt = 0;
	for(var i=0;i<numText.length;i++){
		reverseText = numText.substring(i,i+1)+reverseText;
	}
	console.log
	for(var i=0;i<dan.length;i++){
		if(reverseText.indexOf("0000"+dan[i])>0){
			var textSplit = reverseText.split("0000"+dan[i]);
			reverseText = textSplit[0]+textSplit[1];
		}	
	}
	
	if(reverseText.indexOf("0000")>0){
		reverseText = reverseText.substring(0,reverseText.length-4);
	}
	return reverseText;
}*/

function FormattingNumberToKoreanNotation(num){

    const unitMarks = ["","만","억","조","경","해","자","양","구","간","정","재","극"];
    var numLength = num.length;
    var cnt = 0;

    const unit = 10000;

    var splitResult = []
    var numText = "";

    for(let i = 0; i < unitMarks.length; ++i)
    {
        let value = (num % Math.pow(10000, i + 1)) / Math.pow(10000, i);    //뒷자리부터 자르기
        value = Math.floor(value);    //0 제거 + 소숫점 제거

        splitResult[i] = value

    }

    splitResult.reverse()

    //최상위 5단위만 출력
    for(let i = 0, j = 0; i < splitResult.length && j < 5; i++)
    {

        if (splitResult[i] == 0)
            continue;
        numText += splitResult[i] + unitMarks[ unitMarks.length - i -1] 
        j++;
    }

    return numText
}
