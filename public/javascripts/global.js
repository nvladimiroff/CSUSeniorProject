getQuestionSetList();
var token = "";
var session_id = "";

$(document.body).on("click", ".beginSessionForQuestionSet", function() {
    var qs_id = $(this).attr('class').split(" ")[0].split('_')[1];
    $.ajax({
        type: "POST",
        url: "/sessions",
        data: {
            question_set_id: qs_id,
            owner_id: $("#userID").val()
        },
        success: function(data){
            window.location.href = "/session/"+data.id+"/"+data.token+"/"+qs_id;
        }
    });
});

$(document.body).on('click', '.displayQuestionSetRow', function() {
    $('.displayQuestionSetRow').parent().addClass('active');
    $('.displaySettingsRow').parent().removeClass('active');
    $('#questionSetsDiv').slideDown("slow");
    $("#settingsDiv").slideUp("slow");
    getQuestionSetList();
});

$(document.body).on('click', '.displaySettingsRow', function() {
    $('.displaySettingsRow').parent().addClass('active');
    $('.displayQuestionSetRow').parent().removeClass('active');
    $("#questionSetsDiv").slideUp("slow");
    $('#settingsDiv').slideDown("slow");
});

$(document.body).on("click", '.addAnswer', function() {
    var questionId = $(this).attr("class").split(" ")[2];
    displayNewAnswerDialog(questionId);
});

$(document.body).on("click", '.addQuestion', function() {
    var questionSetId = $(this).attr("class").split(" ")[1];
    displayNewQuestionDialog(questionSetId);
});

$(document.body).on('click', '.deleteQuestionSet', function(){
    var qs_id = $(this).attr('class').split(" ")[0].split('_')[1];
    bootbox.confirm("Are you sure?", function(result) {
        if (result) {
            $.ajax({
                type: "DELETE",
                url: "/questionsets/"+qs_id,
                success: function(data){
                    $("#errMsgDiv").css("display", "none");
                    if (data.msg === "success") {
                        getQuestionSetList();
                        $('.bootbox-close-button').click();
                    } else {
                        alert(data.msg);
                    }
                }
            });
        }
    }); 
});

$(document.body).on("click", ".deleteAnswer", function() {
    var answer_id = $(this).attr('class').split(" ")[2];
    var question_id = $(this).attr('class').split(" ")[3];
    bootbox.confirm("Are you sure?", function(result) {
        if (result) {
            $.ajax({
                type: "DELETE",
                url: "/answers/"+answer_id,
                success: function(data){
                    if (data.msg === "success") {
                        $("#answer_li_"+answer_id).remove();
                        var current_answ_count = $("#answ_count_"+question_id).html();
                        $("#answ_count_"+question_id).html(parseInt(current_answ_count) - 1);
                    } else {
                        alert(data.msg);
                    }
                }
            });
        }
    }); 
});

$(document.body).on("click", ".deleteQuestion", function() {
    var question_id = $(this).attr('class').split(" ")[2];
    bootbox.confirm("Are you sure?", function(result) {
        if (result) {
            $.ajax({
                type: "DELETE",
                url: "/questions/"+question_id,
                success: function(data){
                    if (data.msg === "success") {
                        $("#question_li_"+question_id).remove();
                    } else {
                        alert(data.msg);
                    }
                }
            });
        }
    }); 
});

$(document.body).on('click', '.editQuestionSet', function(){
    var qs_id = $(this).attr('class').split(" ")[0].split('_')[1];
    var qsInfoHtml = $('#qsInfoId_'+qs_id).html();
    var splitHtml = qsInfoHtml.split('-'),
        name = splitHtml[0],
        description = splitHtml[1];
    bootbox.dialog({
        title: "Edit question set",
        message: '<div class="row">  <div class="col-md-12"> ' +
                '<div id="errMsgDiv" class="custom-alerts alert alert-success fade in" style="display:none;">'+
                    '<button type="button" class="close" data-dismiss="alert" aria-hidden="true"></button>'+
                    '<span id="errMsg"></span>'+
                '</div>'+
                '<form id="qs_form" role="form"> ' +
                    '<div class="form-body"> ' +
                        '<div class="form-group form-md-line-input">'+
                            '<input type="text" class="form-control" id="qs_name" value="'+name+'">'+
                            '<label for="qs_name">Name</label>'+
                            '<span class="help-block">OO Programming</span>'+
                        '</div>' +
                        '<div class="form-group form-md-line-input">'+
                            '<input type="text" class="form-control" id="qs_desc" value="'+description+'">'+
                            '<label for="qs_desc">Description</label>'+
                            '<span class="help-block">Tests knowledge of OO Programming</span>'+
                        '</div>' +
                    '</div> ' +
                '</form> '+
                '</div>  </div>',
        buttons: {
            success: {
                label: "Save",
                className: "btn-success",
                callback: function () {
                    $.ajax({
                        type: "PUT",
                        url: "/questionsets",
                        data: {
                            name: $('#qs_name').val(),
                            description: $("#qs_desc").val()
                        },
                        success: function(data){
                            $("#errMsgDiv").css("display", "none");
                            if (data.msg === "success") {
                                getQuestionSetList();
                                $('.bootbox-close-button').click();
                            } else {
                                $('#errMsg').html(data.msg);
                                $("#errMsgDiv").css("display", "block");
                            }
                        }
                    });
                }
            }
        }
    });
});

$(document.body).on('click', '#addNewQS', function(){
    $("#errMsgDiv").css("display", "none");
    bootbox.dialog({
        title: "Create new question set",
        message: '<div class="row">  <div class="col-md-12"> ' +
                '<div id="errMsgDiv" class="custom-alerts alert alert-success fade in" style="display:none;">'+
                    '<button type="button" class="close" data-dismiss="alert" aria-hidden="true"></button>'+
                    '<span id="errMsg"></span>'+
                '</div>'+
                '<form id="qs_form" role="form"> ' +
                    '<div class="form-body"> ' +
                        '<div class="form-group form-md-line-input form-md-floating-label">'+
                            '<input type="text" class="form-control" id="qs_name">'+
                            '<label for="qs_name">Name</label>'+
                            '<span class="help-block">OO Programming</span>'+
                        '</div>' +
                        '<div class="form-group form-md-line-input form-md-floating-label">'+
                            '<input type="text" class="form-control" id="qs_desc">'+
                            '<label for="qs_desc">Description</label>'+
                            '<span class="help-block">Tests knowledge of OO Programming</span>'+
                        '</div>' +
                    '</div> ' +
                '</form> '+
                '</div>  </div>',
        buttons: {
            success: {
                label: "Save",
                className: "btn-success",
                callback: function () {
                    var name = $('#qs_name').val();
                    var descr = $("#qs_desc").val();
                    $.ajax({
                        type: "POST",
                        url: "/questionsets",
                        data: {
                            name: name,
                            description: descr,
                            owner_id: $("#userID").val()
                        },
                        success: function(data){
                            $("#errMsgDiv").css("display", "none");
                            if (data.msg === "success") {
                                getQuestionSetList();
                                $('.bootbox-close-button').click();
                            } else {
                                $('#errMsg').html(data.msg);
                                $("#errMsgDiv").css("display", "block");
                            }
                        }
                    });
                }
            }
        }
    });
});

function getQuestionSetList() {
    App.blockUI({
        target: '#questionSetsDiv',
        overlayColor: 'none',
        animate: true
    });
    var html = "";
    $.ajax({
        type: "GET",
        url: "/questionsets/owner/"+ $("#userID").val(),
        success: function(response){
            html += '<ul class="task-list">';
            $.each( response, function( key, questionSet ) {
                html += '<li>';
                html += '<div class="task-title">'+
                            '<span class="task-title-sp" id="qsInfoId_'+questionSet.id+'"> '+questionSet.name+' - '+questionSet.description+'</span>';
                html += '</div>';
                html += '<div class="task-config">'+
                            '<div class="task-config-btn btn-group">'+
                                '<a class="btn btn-sm default" href="javascript:;" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">'+
                                    '<i class="fa fa-cog"></i>'+
                                    '<i class="fa fa-angle-down"></i>'+
                                '</a>'+
                                '<ul class="dropdown-menu pull-right">'+
                                    '<li>';
                if (isActiveSession(questionSet.id)) {
                    html += '<a href="/session/'+session_id+'/'+token+'/'+questionSet.id+'">';
                    html += '<i class="glyphicon glyphicon-share"></i> Resume Session </a>';
                } else {
                    html += '<a href="#" class="beginSession_'+questionSet.id+' beginSessionForQuestionSet">';
                    html += '<i class="glyphicon glyphicon-share"></i> Start Session </a>';
                }
                // TODO add logic to check if no questions on question set to not allow to start session
                html += '</li>'+
                                    '<li>'+
                                        '<a href="#" class="viewQSetQ_'+questionSet.id+' viewQuestionSetQuestions">'+
                                            '<i class="glyphicon glyphicon-edit"></i> View/Edit Questions </a>'+
                                    '</li>'+
                                    '<li>'+
                                        '<a href="#" class="editQSet_'+questionSet.id+' editQuestionSet">'+
                                            '<i class="fa fa-pencil"></i> Edit </a>'+
                                    '</li>'+
                                    '<li>'+
                                        '<a href="#" class="deleteQSet_'+questionSet.id+' deleteQuestionSet">'+
                                            '<i class="fa fa-trash-o"></i> Delete </a>'+
                                    '</li>'+
                                '</ul>'+
                            '</div>'+
                        '</div>';
                html += '</li>';
            });
            html += '</ul>';
            $('#questionSetList').html(html);
            App.unblockUI('#questionSetsDiv');
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            App.unblockUI('#questionSetsDiv');
            alert("Error parsing user question sets");
        }
    });
}

function isActiveSession(qs_id) {
    var isActive = false;
    $.ajax({
        type: "GET",
        async: false,
        url: "/sessions/questionset/"+qs_id,
        success: function(data){
            if (data && data.id) {
                session_id = data.id;
                token = data.token;
                isActive = true;
            }
        }
    });
    return isActive;
}

$(document.body).on('click', '.viewQuestionSetQuestions', function() {
    var qs_id = $(this).attr('class').split(" ")[0].split('_')[1];
    $.ajax({
        type: "GET",
        url: "/questions/question_set/"+ qs_id,
        success: function(response){
            var questions = response;
            var html = "";
            html += '<div class="row">'+
                        '<div class="col-lg-12">'+
                            '<div class="mt-element-list">'+
                                '<div class="mt-list-head list-todo dark">'+
                                    '<div class="list-head-title-container">'+
                                        '<h3 class="list-title">Questions</h3>'+
                                        '<div class="list-head-count">'+
                                            '<div class="list-head-count-item">'+
                                                '<i class="glyphicon glyphicon-question-sign"></i></div>'+
                                        '</div>'+
                                    '</div>'+
                                    '<a href="#" class="addQuestion '+qs_id+'">'+
                                        '<div class="list-count pull-right red-mint">'+
                                            '<i class="fa fa-plus"></i>'+
                                        '</div>'+
                                    '</a>'+
                                '</div>'+
                                '<div class="mt-list-container list-todo">'+
                                    '<div class="list-todo-line"></div>'+
                                    '<ul id="questionlist_'+qs_id+'">';
            $.each( questions, function( index, question ) {
                html += '<li class="mt-list-item" id="question_li_'+question.id+'">'+
                            '<div class="list-todo-icon bg-white">'+
                                '<i class="glyphicon glyphicon-question-sign"></i>'+
                            '</div>'+
                            '<div class="list-todo-item dark">'+
                                '<a class="list-toggle-container" data-toggle="collapse" href="#question_id-'+question.id+'" aria-expanded="false">'+
                                    '<div class="list-toggle done uppercase">'+
                                        '<div class="list-toggle-title bold">'+question.name+'</div>'+
                                        '<div class="badge badge-default pull-right bold"><span id="answ_count_'+question.id+'">'+question.Answers.length+'</span></div>'+
                                    '</div>'+
                                '</a>'+
                                '<div class="task-list panel-collapse collapse" id="question_id-'+question.id+'"><ul id="answerlist_'+question.id+'">';
                $.each( question.Answers, function( key, answer ) {
                    html += '<li class="task-list-item done" id="answer_li_'+answer.id+'"><div class="task-status">';
                    if (answer.is_valid) {
                        html += '<span style="color:green" class="'+question.id+'_answ_correct" id="myId_'+answer.id+'"><i class="glyphicon glyphicon-ok-circle"></i></span>';
                    } else {
                        html += '<span style="color:red" class="'+question.id+'_answ_invalid" id="myId_'+answer.id+'"><i class="glyphicon glyphicon-remove-circle"></i></span>';
                    }
                    html += '<a class="pending deleteAnswer '+answer.id+' '+question.id+'" href="#" title="Delete Answer"><i class="fa fa-trash"></i></a>';
                    html += '</div>'+
                            '<div class="task-content">'+
                                '<h4 class="uppercase bold">'+
                                    '<a href="#">'+answer.name+'</a>'+
                                '</h4>';
                    if (answer.description) {
                        html += '<p>'+answer.description+'</p>';
                    }
                    html += '</div></li>';
                });
                html += '</ul>'+
                        '<div class="task-footer bg-grey">'+
                            '<div class="row">'+
                                '<div class="col-xs-6">'+
                                    '<a class="task-trash deleteQuestion '+question.id+'" href="#" title="Delete Question">'+
                                        '<i class="fa fa-trash"></i>'+
                                    '</a>'+
                                '</div>'+
                                '<div class="col-xs-6">'+
                                    '<a class="task-add addAnswer '+question.id+'" href="#" title="Add answer">'+
                                        '<i class="fa fa-plus"></i>'+
                                    '</a>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div></div></li>';
            });
            html += '</ul></div></div></div></div>';
            bootbox.dialog({
                title: "Question Set ID: "+ qs_id,
                message: html,
                closeButton: true
            });
        }
    });
});

function displayNewAnswerDialog(questionId) {
    var answerDialog = bootbox.dialog({
        title: "Create new answer",
        message: '<div class="row">  <div class="col-md-12"> ' +
                '<div id="errMsgDiv" class="custom-alerts alert alert-success fade in" style="display:none;">'+
                    '<button type="button" class="close" data-dismiss="alert" aria-hidden="true"></button>'+
                    '<span id="errMsg"></span>'+
                '</div>'+
                '<form id="new_answ_form" role="form"> ' +
                    '<div class="form-body"> ' +
                        '<div class="form-group form-md-line-input form-md-floating-label">'+
                            '<input type="text" class="form-control" id="answ_name">'+
                            '<label for="answ_name">Answer</label>'+
                            '<span class="help-block">answer to the question</span>'+
                        '</div>' +
                        '<div class="form-group form-md-line-input form-md-floating-label">'+
                            '<input type="text" class="form-control" id="answ_descr">'+
                            '<label for="answ_descr">Description</label>'+
                            '<span class="help-block">Optionally describe the answer</span>'+
                        '</div>' +
                        '<div class="md-checkbox has-success">'+
                            '<input type="checkbox" id="answ_is_valid" class="md-check">'+
                            '<label for="answ_is_valid">'+
                                '<span class="inc"></span>'+
                                '<span class="check"></span>'+
                                '<span class="box"></span> Correct </label>'+
                        '</div>' +
                    '</div> ' +
                '</form> '+
                '</div>  </div>',
        buttons: {
            success: {
                label: "Save",
                className: "btn-success",
                callback: function () {
                    var isChecked = 0;
                    if ($("#answ_is_valid").is(":checked")) {
                        isChecked = 1;
                    }
                    $.ajax({
                        type: "POST",
                        url: "/answers",
                        data: {
                            name: $("#answ_name").val(),
                            description: $("#answ_descr").val(),
                            question_id: questionId,
                            is_valid: isChecked,
                            img_location: $("#answ_img_loc").val()
                        },
                        success: function(answer){
                            if (isChecked) {
                                var element_id = $("."+answer.question_id+"_answ_correct").attr("id");
                                $("#"+element_id).css("color", "red");
                                $("#"+element_id).html('<i class="glyphicon glyphicon-remove-circle"></i>');
                                $("#"+element_id).addClass(answer.question_id+"_answ_invalid");
                                $("#"+element_id).removeClass(answer.question_id+"_answ_correct");
                            }
                            addAnswerHtml(answer);
                        }
                    });
                }
            }
        }
    });
}

function displayNewQuestionDialog(questionSetId) {
    var questionDialog = bootbox.dialog({
        title: "Create new question",
        message: '<div class="row">  <div class="col-md-12"> ' +
                '<div id="errMsgDiv" class="custom-alerts alert alert-success fade in" style="display:none;">'+
                    '<button type="button" class="close" data-dismiss="alert" aria-hidden="true"></button>'+
                    '<span id="errMsg"></span>'+
                '</div>'+
                '<form id="new_quest_form" role="form"> ' +
                    '<div class="form-body"> ' +
                        '<div class="form-group form-md-line-input form-md-floating-label">'+
                            '<input type="text" class="form-control" id="quest_name">'+
                            '<label for="quest_name">Question</label>'+
                            '<span class="help-block">New Question</span>'+
                        '</div>' +
                        '<div class="form-group form-md-line-input form-md-floating-label">'+
                            '<input type="text" class="form-control" id="quest_descr">'+
                            '<label for="quest_descr">Description</label>'+
                            '<span class="help-block">Optionally describe the question</span>'+
                        '</div>' +
                    '</div> ' +
                '</form> '+
                '</div>  </div>',
        buttons: {
            success: {
                label: "Save",
                className: "btn-success",
                callback: function () {
                    $.ajax({
                        type: "POST",
                        url: "/questions",
                        data: {
                            name: $("#quest_name").val(),
                            description: $("#quest_descr").val(),
                            question_set_id: questionSetId,
                            img_location: $("#quest_img_loc").val()
                        },
                        success: function(question){
                            addQuestionHtml(question);
                        }
                    });
                }
            }
        }
    });
}

function addAnswerHtml(answer) {
    var html = "";
    html += '<li class="task-list-item done" id="answer_li_'+answer.id+'"><div class="task-status">';
    if (answer.is_valid) {
        html += '<span style="color:green" class="'+answer.question_id+'_answ_correct" id="myId_'+answer.id+'"><i class="glyphicon glyphicon-ok-circle"></i></span>';
    } else {
        html += '<span style="color:red" class="'+answer.question_id+'_answ_invalid" id="myId_'+answer.id+'"><i class="glyphicon glyphicon-remove-circle"></i></span>';
    }
    html += '<a class="pending deleteAnswer '+answer.id+' '+answer.question_id+'" href="#"><i class="fa fa-trash"></i></a>';
    html += '</div>'+
            '<div class="task-content">'+
                '<h4 class="uppercase bold">'+
                    '<a href="#">'+answer.name+'</a>'+
                '</h4>';
    if (answer.description) {
        html += '<p>'+answer.description+'</p>';
    }
    html += '</div></li>';
    $("#answerlist_"+answer.question_id).append(html);
    var current_answ_count = $("#answ_count_"+answer.question_id).html();
    $("#answ_count_"+answer.question_id).html(parseInt(current_answ_count) + 1);
}

function addQuestionHtml(question) {
    var html = "";
    html += '<li class="mt-list-item" id="question_li_'+question.id+'">'+
                '<div class="list-todo-icon bg-white">'+
                    '<i class="glyphicon glyphicon-question-sign"></i>'+
                '</div>'+
                '<div class="list-todo-item dark">'+
                    '<a class="list-toggle-container" data-toggle="collapse" href="#question_id-'+question.id+'" aria-expanded="false">'+
                        '<div class="list-toggle done uppercase">'+
                            '<div class="list-toggle-title bold">'+question.name+'</div>'+
                            '<div class="badge badge-default pull-right bold">';
    if (question.Answers) {
        html += '<span id="answ_count_'+question.id+'">'+ question.Answers.length +'</span>';
    } else {
        html += '<span id="answ_count_'+question.id+'">0</span>';
    }
    html += '</div>'+
                '</div>'+
            '</a>'+
            '<div class="task-list panel-collapse collapse" id="question_id-'+question.id+'"><ul id="answerlist_'+question.id+'">';
    html += '</ul>'+
            '<div class="task-footer bg-grey">'+
                '<div class="row">'+
                    '<div class="col-xs-6">'+
                        '<a class="task-trash deleteQuestion '+question.id+'" href="#">'+
                            '<i class="fa fa-trash"></i>'+
                        '</a>'+
                    '</div>'+
                    '<div class="col-xs-6">'+
                        '<a class="task-add addAnswer '+question.id+'" href="#">'+
                            '<i class="fa fa-plus"></i>'+
                        '</a>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div></div></li>';
    $("#questionlist_"+question.question_set_id).append(html);
}
