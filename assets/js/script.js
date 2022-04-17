$(document).ready(function() {
    
    //Get the current time and set it to the header
    currentTime();
    auditTime();

    // task text was clicked
    $(".timeTable").on("click", ".task", function() {
        // get current text of element
        
        var idHour = $(this).attr("id");

        var text = $(this)
        .text()
        .trim();
    
        // replace element with a new textarea
        var textInput = $("<textarea>")
        .addClass("textarea col-8 edit")
        .attr("id", idHour)
        .val(text);
        $(this).replaceWith(textInput);
    
        // auto focus new element
        textInput.trigger("focus");
    });

    $(".timeTable").on("blur", ".edit", function() {
        // get current value of textarea
        var text = $(this).val();

        var idHour = $(this).attr("id");
        
        // recreate element
        var taskP = $("<div>")
        .addClass("col-8 task")
        .attr("id", idHour)
        .text(text);
        
        // replace textarea with new content
        $(this).replaceWith(taskP);
        
        auditTime();
    });

    function currentTime () {
        var timeNow = moment().format('MMMM Do YYYY');
        $("#currentDay").text(timeNow);
    }

    function auditTime () {
        var timeNow = moment().hour(); 
        
        if (timeNow >= 7 && timeNow <= 19) {
            var hourNow = timeNow-7;
            var selectHour = "#hour" + hourNow;
            $(selectHour).addClass("present");
            
            for (let i = 0; i < hourNow; i++) {
                var setPast = "#hour" + i;
                $(setPast).addClass("past");
            }
 
            for (let i = hourNow + 1; i <= 12; i++) {
                var setFuture = "#hour" + i;
                $(setFuture).addClass("future");
            }
        }
    }

    setInterval(function() {
        auditTime();
    }, 60000);
});