var chart;

$( window ).load(function() {
    getQuestionAndAnswers();
});

$(function(){
    setInterval(getAnswerReport, 1000);
});

$(document.body).on("click", "#displayAnswer", function(){
    var q_id = $("div .active").attr("q-id");
    $("div .my_"+q_id+"_true").fadeIn("slow");
});

$(document.body).on("click", ".next", function() {
    var pagId = $(".p_active").attr("id"), p_id = pagId.split("_")[1], q_count = pagId.split("_")[2], new_pId = parseInt(p_id)+1;
    if (parseInt(new_pId) >= parseInt(q_count)) {
        endSession();
        return;
    }

    var htmlId = $("div .active").attr("id"),
        q_id = htmlId.split("_")[1],
        newQuestion = parseInt(q_id)+1,
        newHtmlId = "#question_"+newQuestion;

    $("#"+htmlId).removeClass("active");
    $("#"+htmlId).fadeOut("fast");
    $(newHtmlId).fadeIn("slow");
    $(newHtmlId).addClass("active");

    $("#"+pagId).removeClass("active");
    $("#"+pagId).removeClass("p_active");
    $("#pagin_"+new_pId+"_"+q_count).addClass("active");
    $("#pagin_"+new_pId+"_"+q_count).addClass("p_active");

    changeQuestion();
});

function changeQuestion() {
    var q_id = $("div .active").attr("q-id");
    $.ajax({
        type: "PUT",
        url: "/sessions/changequestion",
        data: {
            session_id: $('#sessionID').val(),
            current_question_id: q_id
        },
        success: function(data){
            if (data.msg === "success") {
                console.log("current_question_id: "+ q_id+ "changed");
            } else {
                console.log(data.msg);
            }
        }
    });

    updateCurrentQuestionId();
}

function endSession() {
    $.ajax({
        type: "PUT",
        url: "/sessions/endset",
        data: {
            session_id: $('#sessionID').val()
        },
        success: function(data){
            if (data.msg === "success") {
                window.location.href = "/";
            } else {
                console.log(data.msg);
            }
        }
    });
}

function getAnswerReport() {
    var q_id = $("div .active").attr("q-id");
    $.ajax({
        type: "GET",
        url: "/sessions/responses/"+q_id,
        success: function(data){
            console.log(data);
            if (data.length > 0) {
                chart = AmCharts.makeChart("mychart", {
                    "type": "pie",
                    "theme": "light",
                    "startDuration": 0,

                    "fontFamily": 'Open Sans',

                    "color":    '#888',

                    "dataProvider": data,
                    "valueField": "count",
                    "titleField": "answer",
                    "exportConfig": {
                        menuItems: [{
                            icon: App.getGlobalPluginsPath() + "amcharts/amcharts/images/export.png",
                            format: 'png'
                        }]
                    }
                });
            }
        }
    });
/*
    $('#chart_6').closest('.myDiv').find('.fullscreen').click(function() {
        chart.invalidateSize();
    });
*/
}

function updateCurrentQuestionId() {
    var q_id = $("div .active").attr("q-id");
    $.ajax({
        type: "PUT",
        url: "/sessions",
        data: {
            session_id: $('#sessionID').val(),
            current_question_id: q_id
        },
        success: function(data){
            if (data.msg === "success") {
                console.log("current_question_id: "+ q_id+ "updated");
                if(chart) {
                  chart.clear();
                }
            } else {
                console.log(data.msg);
            }
        }
    });
}

function getQuestionAndAnswers() {
    var qs_id = $("#qs_id").val();
    $.ajax({
        type: "GET",
        url: "/questions/question_set/"+qs_id,
        success: function(questions){
            var html = '';
            html += '<div class="portlet light"> ';
            html += '<div class="portlet-title"> <div class="actions"> <div class="btn-group"> ';
            html += '<a class="btn btn-circle red-sunglo" href="#" onclick="return false;" id="displayAnswer"> <i class="fa fa-plus"></i> Display Answer </a>';
            html += '</div></div></div>';
            html += '<div class="portlet-body">';
            $.each( questions, function( key, question ) {
                var displayVal = "none";
                if (key == 0) { displayVal = "block"; }
                html += '<div class="row">';
                html += '<div id="question_'+parseInt(key+1)+'" q-id="'+question.id+'" class="col-sm-offset-1 col-md-10 q_Set active" style="display:'+displayVal+'">';
                html += '<p class="lead"> <h2> '+question.name+' </h2> </p>';
                if (question.description !== "") {
                    html += '<small> '+question.description+' </small>';
                }
                if (question.img) {
                    html += '<div class="col-sm-12 col-md-6"> <div class="thumbnail">';
                    html += '<img width="300" height="300" src="'+question.img+'" />';
                    html += '</div> </div>';
                }
                html += '<div class="row"> <div id="answers_'+question.id+'" class="col-md-12">';
                html += '<ol>';
                $.each( question.Answers, function( key, answer ) {
                    if (answer.name !== "") {
                        html += '<div class="mt-element-ribbon col-md-6" id="answer_'+answer.id+'">'+
                                    '<div class="ribbon ribbon-left ribbon-vertical-left ribbon-shadow ribbon-border-dash-vert ribbon-color-success uppercase my_'+question.id+'_'+answer.is_valid+'" style="display:none">'+
                                        '<div class="ribbon-sub ribbon-bookmark"></div>'+
                                        '<i class="fa fa-star"></i>'+
                                    '</div>'+
                                    '<p class="ribbon-content"><li> <h3><span>'+answer.name+'</span></h3></li></p>'+
                                '</div>';
                    }
                    if (answer.img) {
                        html += '<div class="col-sm-12 col-md-6"> <div class="thumbnail">';
                        html += '<img width="300" height="300" src="'+answer.img+'" />';
                        html += '</div> </div>';
                    }
                });
                html += '</ol>';
                html += '</div></div>';
                html += '</div></div>';
            });
            html += '<div class="row" id="paginationSection"></div>';
            html += '</div> </div>';
            $("#questionDiv").html(html);

            var tempHtml = '<div class="col-md-10 text-center">';
            tempHtml += '<ul class="pagination pagination-lg">';
            for (var i = 0; i < questions.length; i++) {
                var klass = "";
                if (i == 0) { klass = 'active p_active';}
                tempHtml += '<li class="'+klass+'" id="pagin_'+i+'_'+questions.length+'">'+
                                '<span> '+ parseInt(i + 1) +' </span>'+
                            '</li>';
            }
            tempHtml += '<li>'+
                            '<a href="#" class="next" onclick="return false;">'+
                                '<i class="fa fa-angle-right"></i>'+
                            '</a>'+
                        '</li>';
            tempHtml += '</ul>';
            tempHtml += '</div>';
            $("#paginationSection").html(tempHtml);
            updateCurrentQuestionId();
        }
    });
}
