$(document).ready(function(){
	$(".boxsplitter-vertical").draggable({
		axis:"x",
		start: function(event, ui){
				startVal = ui.position.left;
		},
		stop: function(event, ui){
				
				ui.position.left;
				
				var initCol2 = $("#col2").width();
				var initCol1 = $("#col1").width();
				
				$("#col1").width(initCol1 + (ui.position.left - startVal));
				$("#col2").width(initCol2 - (ui.position.left - startVal));
		}
	});
	
	$(".boxsplitter-col1").draggable({
		axis:"y",
		start: function(event, ui){
			startVal = ui.position.top;
		},
		stop: function(event, ui){
			
			ui.position.top;
			
			var initJsCode = $("#jsCode").height();
			var initHtmlCode = $("#htmlCode").height();
			
			$("#htmlCode").height(initHtmlCode + (ui.position.top - startVal));
			$("#jsCode").height(initJsCode - (ui.position.top - startVal));
		}
	});
	
	$(".boxsplitter-col2").draggable({
		axis:"y",
		start: function(event, ui){
			startVal = ui.position.top;
		},
		stop: function(event, ui){
			
			ui.position.top;
			
			var initOutput = $("#output").height();
			var initCssCode = $("#cssCode").height();
			
			$("#output").height(initOutput - (ui.position.top - startVal));
			$("#cssCode").height(initCssCode + (ui.position.top - startVal));
		}
	});


	$("textarea").keydown(function(e) {
	    if(e.keyCode === 9) { // tab was pressed
	        // get caret position/selection
	        var start = this.selectionStart;
	        var end = this.selectionEnd;

	        var $this = $(this);
	        var value = $this.val();

	        // set textarea value to: text before caret + tab + text after caret
	        $this.val(value.substring(0, start)
	                    + "\t"
	                    + value.substring(end));

	        // put caret at right position again (add one for the tab)
	        this.selectionStart = this.selectionEnd = start + 1;

	        // prevent the focus lose
	        e.preventDefault();
	    }
	});
	
    $( "#tabs" ).tabs();
	$("#codeEditor").hide();
	$("#runCode").hide();
	clearTextArea();


	$('[data-toggle="tooltip"]').tooltip(); 

	$("#introLink").click(function(){
	    $("#codeEditor").hide();
	   	$("#runCode").hide();
	    $("#intro").show();

	});

	$("#runCode").on("click", function(e){
		var doc = document.getElementById("outputFrame");

		doc.src = "about:blank";

		if( doc.document ) {
            document.outputFrame.document.body.innerHTML = ""; //Chrome, IE
        }else {
            doc.contentDocument.body.innerHTML = ""; //FireFox
        }

		runCode();
	});

	$(".demoLinkSrc").on("click", function(e){
		$("#intro").hide();
	    $("#codeEditor").show();
	    $("#runCode").show();
		var doc = document.getElementById("outputFrame");
		doc.src = "about:blank";
	});

	function runCode(){

		var html = "<!DOCTYPE html><html lang=\"en\">" +
						"<head>" +
							"<meta charset=\"utf-8\"/>" +
							"<meta http-equiv=\"cache-control\" content=\"max-age=0\" />" +
							"<meta http-equiv=\"cache-control\" content=\"no-cache\" />" +
							"<meta http-equiv=\"expires\" content=\"0\" />" +
							"<meta http-equiv=\"expires\" content=\"Tue, 01 Jan 1980 1:00:00 GMT\" />" +
							"<meta http-equiv=\"pragma\" content=\"no-cache\" />" +
							"<title>Output Page</title>" +
							"<link href=\"bootstrap-3.3.5-dist/css/bootstrap.min.css\" rel=\"stylesheet\">" + 
							"<style>" + $("#cssCodeTextArea").val() + "</style>" +
						"</head>" +
						"<body>" +
							$("#htmlCodeTextArea").val() + 
							"<script>" +
 								  "var iframeBody = document.getElementsByTagName(\"body\")[0];" +
    							  "var jQuery = function (selector) { return parent.jQuery(selector, iframeBody); };"+
    							  "var $ = jQuery;"+
								  $("#jsCodeTextArea").val() + 
							"</script>" +
						"</body>" +
					"</html>";




		var doc = document.getElementById("outputFrame");

		doc.contentWindow.document.write(html);

	}

	$("a.demoLink").on("click", function(){
		$("#demoName").text($(this).text());
		var doc = document.getElementById("outputFrame");
		doc.src = "about:blank";

		clearTextArea();

		$("#htmlCodeTextArea").val(codeSnippets[$(this).attr("data-demo")].html.join('\n'));
		$("#cssCodeTextArea").val(codeSnippets[$(this).attr("data-demo")].css.join('\n'));
		$("#jsCodeTextArea").val(codeSnippets[$(this).attr("data-demo")].js.join('\n'));

	});

	function clearTextArea(){

		$("#htmlCodeTextArea").val("");
		$("#cssCodeTextArea").val("");
		$("#jsCodeTextArea").val("");

	}

	
});