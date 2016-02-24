getQuestionSetList();

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

$(document.body).on('click', '#deleteQuestionSet', function(){
    var qs_id = $(this).attr('class').split('_')[1];
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

$(document.body).on('click', '#editQuestionSet', function(){
    var qs_id = $(this).attr('class').split('_')[1];
    var qsInfoHtml = $('#qsInfoId_'+qs_id).html();
    var splitHtml = qsInfoHtml.split('-'),
        name = splitHtml[0],
        description = splitHtml[1];
    //$("#errMsgDiv").css("display", "none");
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
            //var questionSets = jQuery.parseJSON(response);
            var questionSets = response;
            html += '<ul class="task-list">';
            $.each( questionSets, function( key, obj ) {
                html += '<li>';
                html += '<div class="task-title">'+
                            '<span class="task-title-sp" id="qsInfoId_'+obj.id+'"> '+obj.name+' - '+obj.description+'</span>';
                if (obj.status) {
                    html += '<span class="label label-sm label-success">Active</span>';
                } else {
                    html += '<span class="label label-sm label-danger">In-Active</span>';
                }
                html += '</div>';
                html += '<div class="task-config">'+
                            '<div class="task-config-btn btn-group">'+
                                '<a class="btn btn-sm default" href="javascript:;" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">'+
                                    '<i class="fa fa-cog"></i>'+
                                    '<i class="fa fa-angle-down"></i>'+
                                '</a>'+
                                '<ul class="dropdown-menu pull-right">'+
                                    '<li>'+
                                        '<a href="#" class="beginSession_'+obj.id+'" id="beginSessionForQuestionSet">'+
                                            '<i class="glyphicon glyphicon-share"></i> Start Session </a>'+
                                    '</li>'+
                                    '<li>'+
                                        '<a href="#" class="viewQSetQ_'+obj.id+'" id="viewQuestionSetQuestions">'+
                                            '<i class="glyphicon glyphicon-edit"></i> View/Edit Questions </a>'+
                                    '</li>'+
                                    '<li>'+
                                        '<a href="#" class="editQSet_'+obj.id+'" id="editQuestionSet">'+
                                            '<i class="fa fa-pencil"></i> Edit </a>'+
                                    '</li>'+
                                    '<li>'+
                                        '<a href="#" class="deleteQSet_'+obj.id+'" id="deleteQuestionSet">'+
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

$(document.body).on('click', '#viewQuestionSetQuestions', function() {
    var qs_id = $(this).attr('class').split('_')[1];
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
                                                '<i class="glyphicon glyphicon-question-sign"></i> '+questions.length+'</div>'+
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
                                    '<ul>';
            $.each( questions, function( index, question ) {
                html += '<li class="mt-list-item">'+
                            '<div class="list-todo-icon bg-white">'+
                                '<i class="glyphicon glyphicon-question-sign"></i>'+
                            '</div>'+
                            '<div class="list-todo-item dark">'+
                                '<a class="list-toggle-container" data-toggle="collapse" href="#task-1" aria-expanded="false">'+
                                    '<div class="list-toggle done uppercase">'+
                                        '<div class="list-toggle-title bold">'+question.name+'</div>'+
                                        '<div class="badge badge-default pull-right bold">'+question.Answers.length+'</div>'+
                                    '</div>'+
                                '</a>'+
                                '<div class="task-list panel-collapse collapse" id="task-1"><ul>';
                $.each( question.Answers, function( key, answer ) {
                    html += '<li class="task-list-item done"><div class="task-status">';
                    if (answer.is_valid) {
                        html += '<span style="color:green"><i class="glyphicon glyphicon-ok-circle"></i></span>';
                    } else {
                        html += '<span style="color:red"><i class="glyphicon glyphicon-remove-circle"></i></span>';
                    }
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
                                '<div class="col-xs-12">'+
                                    '<a class="task-add addAnswer '+question.id+'" href="#">'+
                                        '<i class="fa fa-plus"></i>'+
                                    '</a>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div></div></li>';
            });
            html += '</ul></div></div></div></div>';
            bootbox.dialog({
                title: "Question Set: "+ qs_id,
                message: html,
                buttons: {
                    success: {
                        label: "Save",
                        className: "btn-success",
                        callback: function () {
                            var myform = document.getElementById("questionSetFormData_"+qs_id);
                            var fd = new FormData(myform);
                            $.ajax({
                                type: "PUT",
                                url: "/questions",
                                data: fd,
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
        }
    });
});