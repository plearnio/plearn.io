$(document).ready(function(){

			$('a[href^="#_"]').on('click', function(event) {

			    var target = $(this.getAttribute('href'));

			    if( target.length ) {
			        event.preventDefault();
			        $('html, body').stop().animate({
			            scrollTop: target.offset().top
			        }, 500);
			    }

			});

		var myNavBar = {

		    flagAdd: true,

		    elements: [],

		    init: function (elements) {
		        this.elements = elements;
		    },

		    add : function() {
		        if(this.flagAdd) {
		            for(var i=0; i < this.elements.length; i++) {
									if(document.getElementById(this.elements[i]) != null)
		                document.getElementById(this.elements[i]).className += " fixed-theme";
		            }
		            this.flagAdd = false;
		        }
		    },

		    remove: function() {
		        for(var i=0; i < this.elements.length; i++) {
							if(document.getElementById(this.elements[i]) != null)
		            document.getElementById(this.elements[i]).className =
		                    document.getElementById(this.elements[i]).className.replace( /(?:^|\s)fixed-theme(?!\S)/g , '' );
		        }
		        this.flagAdd = true;
		    }

		};

		myNavBar.init(  [
		    "header",
		    "header-container",
		    "brand"
		]);

		function offSetManager(){

		    var yOffset = 0;
		    var currYOffSet = window.pageYOffset;

		    if(yOffset < currYOffSet) {
		        myNavBar.add();
		    }
		    else if(currYOffSet == yOffset){
		        myNavBar.remove();
		    }

		}

		window.onscroll = function(e) {
		    offSetManager();
		}

		offSetManager();

		$( "#thai" ).hover(
		  function() {
		    $(this).html("กำลังพัฒนา").css("background-color", "white");
		  }, function() {
		    $(this).html(" ไทย <span class='sub'>| English</span>");
		  }
		);

		$( "#eng" ).hover(
		  function() {
		    $(this).html("Change ?").css("background-color", "white");
		  }, function() {
		    $(this).html(" English <span class='sub'>| ไทย</span>");
		  }
		);

		$( "#backEnd" ).hover(
		  function() {
		    $(this).html("MEAN STACK <br> <span class='sub'>MONGODB <br> EXPRESS <br> ANGULARJS <br> NODEJS</span><br>PHP <br> MYSQL").css("background-color", "white");
		  }, function() {
		    $(this).html("WEB BACK-END");
		  }
		);
		
		$( "#frontEnd" ).hover(
		  function() {
		    $(this).html("BASIC<br> <span class='sub'>HTML CSS<br> JAVASCRIPT <br> JQUERY <br> BOOTSTRAP3</span><br>ANGULARJS<br>REACT<br><span class='sub'>(learning)</span>").css("background-color", "white");
		  }, function() {
		    $(this).html("WEB FRONT-END");
		  }
		);

		$( "#graphic" ).hover(
		  function() {
		    $(this).html("PHOTOSHOP<br>AFTER EFFECT<br>SKETCH<br>DRAWING").css("background-color", "white");
		  }, function() {
		    $(this).html("GRAPHIC");
		  }
		);

		$( "#server" ).hover(
		  function() {
		    $(this).html("NGINX<br>APACHE<br>CENTOS7").css("background-color", "white");
		  }, function() {
		    $(this).html("SERVER ADMIN");
		  }
		);

		$( "#mobile" ).hover(
		  function() {
		    $(this).html("ANDRIOD<br>PHONEGAP").css("background-color", "white");
		  }, function() {
		    $(this).html("MOBILE APP");
		  }
		);

		$( "#hardware" ).hover(
		  function() {
		    $(this).html("CIRCUIT<br>DIGITAL<br><span class='sub'>VERILOG</span>").css("background-color", "white");
		  }, function() {
		    $(this).html("HARDWARE");
		  }
		);

		$( "#other" ).hover(
		  function() {
		    $(this).html("HADOOP<br> <span class='sub'>SPARK HIVE FLUME SQOOP ETC</span><br>HPC<br><span class='sub'>MPI OPENMP</span><br>CRAWLING BOT<br><span class='sub'>CHEERIO CURL</span><br>OTHER<br><span class='sub'>C C++ C# XNA JAVA PYTHON NLTK R GIT</span>").css("background-color", "white");
		  }, function() {
		    $(this).html("OTHER EXPERIENCE");
		  }
		);

		});