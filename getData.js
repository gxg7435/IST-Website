/* This function is called when document is ready
*	All the plugins gets enabled in this function.  
*/
$( function() {
    $("#button2").click(function(){
		validate();
	});
	$( "#datepicker" ).datepicker();
    $( ".tabs" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
    
	$( ".tabs li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
	$( "#resizable" ).resizable({
      handles: "se"
    });
	
	$("#tog").click(function(){
      $("#myform").fadeToggle("slow");
    });
	
	$( "#fname, #lname,#resizable" ).tooltip({
      position: {
    
		my: "center bottom-20",
        at: "center top",
        
		using: function( position, feedback ) {
          $( this ).css( position );
          $( "<div>" )
        
			.addClass( "arrow" )
            .addClass( feedback.vertical )
            
			.addClass( feedback.horizontal )
            .appendTo( this );
        }
      }
    });
	
	display("about",1);
	display("degrees",2);
	
	display("minors",3);
	displayMinor();
	
	displayEmployment();
	displayEmploymentDetails();
	
	$("#selectable").sortable();
	$("#selectable").enableSelection();
	
	$($("#selectable").children()).click(function() 
	{
		populateMinors(this);
	})
	
	.mouseover(function() {
		this.style.backgroundColor="orange";
		 $(this).animate({borderWidth: "10px"});
	})
	
	.mouseout(function() {
		this.style.backgroundColor="white";
		$(this).animate({borderWidth: "5px"});
	})
	
});

/* This function is used to display employment details like employers,
*  careers,various other statistics related to employment.
*/
	function displayEmploymentDetails() {
		var ul = document.getElementById('selectable3');
		var list = ul.getElementsByClassName('ui-state-default');
		
		var ptags1 = ul.getElementsByClassName('ui-descr1');
		var ptags2 = ul.getElementsByClassName('ui-descr2');
		
		var ulEle = document.createElement('ol');
		$(ulEle).attr('id','olEmployers');
		
		var ulEle2 = document.createElement('ol');
		$(ulEle2).attr('id','olEmployers2');
		
		$.getJSON("https://people.rit.edu/~sarics/web_proxy.php?path=employment")
            .done(function (data) {
					
					$("#titleEmploy").append(document.createTextNode(data.introduction.title));
					$("#subtitleEmploy1").append(document.createTextNode(data.introduction.content[0].title));
					$("#subdescrEmploy1").append(document.createTextNode(data.introduction.content[0].description));
					$.each(data.degreeStatistics.statistics,function(index,value){
						ptags1[index].innerHTML=value.value;	
						ptags2[index].innerHTML=value.description;
					})
					$("#subtitleEmploy2").append(document.createTextNode(data.introduction.content[1].title));
					$("#subdescrEmploy2").append(document.createTextNode(data.introduction.content[1].description));
					
					$("#subtitleEmploy3").append(document.createTextNode(data.employers.title));
					$("#subtitleEmploy4").append(document.createTextNode(data.careers.title));
					$.each(data.employers.employerNames,function(index,value){
						var li = document.createElement('li');
						$(li).css({"display":"inline","margin":"10px","color":"orange"});
						
						$(li).append(document.createTextNode(value));
						$(ulEle).append(li);
					})
					
					$.each(data.careers.careerNames,function(index,value){
						var li = document.createElement('li');
						$(li).css({"display":"inline","margin":"10px","color":"orange"});
						
						$(li).append(document.createTextNode(value));
						$(ulEle2).append(li);
					})
					
					$("#subdescrEmploy3").append(ulEle);
					$("#olEmployers").css({"list-style":"none"});
					
					$("#subdescrEmploy4").append(ulEle2);
					$("#olEmployers2").css({"list-style":"none"});
			})
			
			.fail(function () {
                alert('Some problem occured');
            });
	}
	
/*	This function is used to validate the details of the
*   feedback form.
*/
	function validate() {
		
		var fname = $("#fname").val();
		var lname = $("#lname").val();
		
		var question = $("#resizable").val();
		var date = $("#datepicker").val();
		
		if(fname == "") {
			alert("Please enter first name");
		}
		
		else if(lname == "") {
			alert("Please enter last name");
		}
		
		else if(question == "") {
			alert("Please enter a question");
		}
		
		else if(date == "") {
				alert("Please select a date");
		}
		
		else {
			alert("Submitted");
		}
	}
	
/* This function is used to display the data of
*  undergrad degree section
*/
	function displayUndergrad() {
		$.getJSON("https://people.rit.edu/~sarics/web_proxy.php?path=degrees")
            .done(function (data) {
					
					$("#list1").append(document.createTextNode(data.undergraduate[0].title));
					$("#list2").append(document.createTextNode(data.undergraduate[1].title));
					$("#list3").append(document.createTextNode(data.undergraduate[2].title));
			
			})
			
			.fail(function () {
                alert('Some problem occured');
            });
		
	}
	
/* This function is used to display the data of
*  about section
*/
	function displayAbout() {
		
		var newdiv1 = document.createElement("div");
		$.getJSON("https://people.rit.edu/~sarics/web_proxy.php?path=about")
        
		.done(function (data) {
			
			var newdiv2 = document.createElement("div");
			var newdiv3 = document.createElement("div");
			var newdiv4 = document.createElement("div");
					
			$(newdiv1).append(document.createTextNode(data.title));
			$(newdiv1).attr("id","title");
	
        	$(newdiv2).attr("id","dscrp");
			$(newdiv3).attr("id","quote");
			
			$(newdiv4).attr("id","Author");					
			$(newdiv2).append(document.createTextNode(data.description));
			
			$(newdiv3).append(document.createTextNode(data.quote));
			$(newdiv4).append(document.createTextNode(data.quoteAuthor));
					
			$("#about").append(newdiv1);
			$("#about").append(newdiv2);
					
			$("#about").append(newdiv3);
			$("#about").append(newdiv4);
			
		})
		
		.fail(function () {
            alert('some Problem occured');
        });
		
	}
	
/* This function is used to display the data of
*  undergrad minors section
*/	
	function populateMinors(org) {
		$.getJSON("https://people.rit.edu/~sarics/web_proxy.php?path=minors")
		.done(function(data)
		
		{
			
			var pTag = document.createElement('p');
			var pTag2 = document.createElement('p');
			
			$(pTag2).append(document.createTextNode("Description"));
			var textNode;
			
			$.each(data,function(index,value){	
				if($(org).text() == value.title) {
				
					$($('#minorContent1').children()).text("");
					$(pTag).append(document.createTextNode(value.description));					
					$('#minorContent1').append(pTag);
			
				}
			})
			
			$("#minorContent1" ).dialog({
				width:"90%",
				modal: true,
				title:"Description"
			})
			
			$("#minorContent1").css({
				"margin":"30px",
				"padding":"10px"
			});
		})
		
		.fail(function () {
            alert('biffed');
        });
		
	}

/* This function is used to display the title of
*  undergrad minors section
*/	
	function displayMinor() {
		var ul = document.getElementById('selectable');
		var list = ul.getElementsByClassName('ui-state-default');
								
		$.getJSON("https://people.rit.edu/~sarics/web_proxy.php?path=minors")
		.done(function(data)
		
		{
		$.each(data,function(index,value){
			list[index].innerHTML=value.title;				
		})
		})
		
		.fail(function () {
            alert('biffed');
        });
	}
	
/* This is a generic function used to display the data of
*  degrees, about and minors section
*/
	function display(obj,id) {
	
	var val="https://people.rit.edu/~sarics/web_proxy.php?path="+obj;
	$.getJSON(val)
    .done(function (data) {
    
	if(id == 1) {
		
		var newdiv1 = document.createElement("div");
		var newdiv2 = document.createElement("div");
		
		var newdiv3 = document.createElement("div");
		var newdiv4 = document.createElement("div");
					
		$(newdiv1).append(document.createTextNode(data.title));
					
		$(newdiv1).attr("id","title");
		$(newdiv2).attr("id","dscrp");
		$(newdiv3).attr("id","quote");
		$(newdiv4).attr("id","Author");
					
		$(newdiv2).append(document.createTextNode(data.description));
		$(newdiv3).append(document.createTextNode(data.quote));
		$(newdiv4).append(document.createTextNode(data.quoteAuthor));
					
		$("#about").append(newdiv1);
		$("#about").append(newdiv2);
		$("#about").append(newdiv3);
		$("#about").append(newdiv4);
		}
		
		else if(id == 2) {
		$("#list1").append(document.createTextNode(data.undergraduate[0].title));
		$("#list2").append(document.createTextNode(data.undergraduate[1].title));
		$("#list3").append(document.createTextNode(data.undergraduate[2].title));
					
		$("#descrp1").append(document.createTextNode(data.undergraduate[0].description));
		$("#descrp2").append(document.createTextNode(data.undergraduate[1].description));
		$("#descrp3").append(document.createTextNode(data.undergraduate[2].description));
					
		for(j=0;j<data.undergraduate.length;j++){
		for(i=0;i<data.undergraduate[j].concentrations.length;i++) {
			var li = document.createElement("li");
			$(li).append(document.createTextNode(data.undergraduate[j].concentrations[i]));
			if(j == 0) {
			$("#conc1").append(li);
			}
			else if(j == 1) {
			$("#conc2").append(li);
			}		
			else {
			$("#conc3").append(li);
			}
		}
		}
		$("#gradlist1").append(document.createTextNode(data.graduate[0].title));
		$("#gradlist2").append(document.createTextNode(data.graduate[1].title));
		$("#gradlist3").append(document.createTextNode(data.graduate[2].title));
				
		$("#graddescrp1").append(document.createTextNode(data.graduate[0].description));
		$("#graddescrp2").append(document.createTextNode(data.graduate[1].description));
		$("#graddescrp3").append(document.createTextNode(data.graduate[2].description));
				
		for(j=0;j<3;j++){
					
		for(i=0;i<data.graduate[j].concentrations.length;i++) {
					
			var li = document.createElement("li");
			$(li).append(document.createTextNode(data.graduate[j].concentrations[i]));
					
			if(j == 0) {
				$("#gradconc1").append(li);
			}
			else if(j == 1) {
				$("#gradconc2").append(li);
			}
					
			else {
				$("#gradconc3").append(li);
			}
		}
		}
		}
				
        })
        
		.fail(function () {
            alert('Some Problem Occured');
        });
	};
 
/* This function is used to display the data of
*  Employment section
*/
	function displayEmployment() {
		
		$("#clickme").on("click",function() { 
			this.style.backgroundColor="blue";
		});
		
		$('#coop')
		.mouseout(function(event) {
			this.style.backgroundColor="white";
			$(this).animate({borderWidth: "5px"});
		})
		
		.mouseover(function(event) {
			this.style.backgroundColor="orange";
			$(this).animate({borderWidth: "10px"});
		})
		  
		.click(function(event) {
			createWindow();
		});
		  
		$('#professional')
		.mouseout(function(event) {
			this.style.backgroundColor="white";
			$(this).animate({borderWidth: "5px"});
		})
		
		.mouseover(function(event) {
			this.style.backgroundColor="orange";
			$(this).animate({borderWidth: "10px"});
		})
		  
		.click(function(event) {
			createWindow2();
		});
	}  
 
/* This function is used to call the populate method 
*	for fetching the data for co-op section.
*/
	function createWindow() {
		populateData("employment",1);
	}

/* This function is used to call the populate method 
*	for fetching the data for employer information section.
*/
	function createWindow2() {
		populateData("employment",2);
	}

/* This function is used to populate the data tables for
*  for co-op and employer information section.
*/	
	function populateData(what,id) {
	
		var val="https://people.rit.edu/~sarics/web_proxy.php?path="+what;
		$.getJSON(val)
		.done(function (data) {
	
		var arrayOfData;
		var length;
		var trHTML,table;
	
		if(id == 1) {
			arrayOfData = data.coopTable.coopInformation;
		}
	
		else{
			arrayOfData = data.employmentTable.professionalEmploymentInformation;
		}
	
		length = arrayOfData.length; 
	
		for(i=0;i<length;i++) {
			
			if(id == 1) {
				
				trHTML += '<tr class="row"><td id="dataVal">' + (arrayOfData[i].employer).trim()+ '</td><td>' + 
				arrayOfData[i].degree + '</td><td>' + arrayOfData[i].city+ 
				'</td><td">' + arrayOfData[i].term+ '</td></tr>';
			}
	
			else{
				trHTML += '<tr class="row"><td class="dataVal">' + arrayOfData[i].employer+ '</td><td class="dataVal">' + 
				arrayOfData[i].degree + '</td><td class="dataVal">' + arrayOfData[i].city+ 
				'</td><td class="dataVal">' + arrayOfData[i].title+ '</td><td class="dataVal">' + arrayOfData[i].startDate + '</td></tr>';
			}
		
		}
		
		if(id == 1) {
			$('#location').append(trHTML);
		}
	
		else{
			$('#location2').append(trHTML);
		}
    
		if(id == 1) { 
			
			$("#dialog" ).dialog({
			width:"90%",
			modal: true,
			title:"Co-Op Data"
			})
		
			$("#dialog").css({
			"margin":"30px",
			"padding":"10px",
			})
			
			$(".row").css({
			"margin":"20px",
			"padding":"10px",
			"border-bottom": "thick solid black"
			});
		}
	
		else {
			$("#dialog2" ).dialog({
			width:"90%",
			modal: true,
			title:"Employer Data"
			})
			
			$("#dialog2").css({
			"margin":"30px",
			"padding":"10px"
			})
		}
		
		$(".row").css({
			"margin":"20px",
			"padding":"10px",
			"border-bottom": "thick solid black"
		});
	})
	
	.fail(function () {
        alert('Some Problem Occured');
    });
	}