$(function(){
	
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
	
	$(".repoint").focus(function(){
		var val = $(this).val();
		var value = $(this).attr("value");
		if(val==value){
			$(this).val('');
		}
	});
	
	//딜 계산기 계산
	$(".repoint").focusout(function(){
		var value = $(this).val();
		var defaultValue = $(this).attr("value");
		if(value==""||value==null||value.length==0){
			$(this).val(defaultValue);
		}
	});
	$("#dmgCalBtn").click(function(){
		var atk = $("#atk").val();
		var damege = parseInt($("#damege").val());
		var cridmg = parseInt($("#cridmg").val());
		var shield = parseInt($("#shield").val());
		var skillMin = [$("#qMin").val(),$("#wMin").val(),$("#eMin").val(),$("#ringMin").val(),$("#armourMin").val(),$("#weaponMin").val()];
		var skillMax = [$("#qMax").val(),$("#wMax").val(),$("#eMax").val(),$("#ringMax").val(),$("#armourMax").val(),$("#weaponMax").val()];
		var skillLevel = [$("#qLevel").val(),$("#wLevel").val(),$("#eLevel").val(),$("#ringLevel").val(),$("#armourLevel").val(),$("#weaponLevel").val()];
		var min = ["#qMinResult","#wMinResult","#eMinResult","#ringMinResult","#armourMinResult","#weaponMinResult"];
		var max = ["#qMaxResult","#wMaxResult","#eMaxResult","#ringMaxResult","#armourMaxResult","#weaponMaxResult"];
		for(var i=0;i<6;i++){
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
