$(document.body).on('click', '.view_recipe', function(){
    $('#modalBodyContent').html('');
    App.blockUI({
        target: '#search_results',
        overlayColor: 'none',
        animate: true
    });
    var htmlId = $(this).attr('id');
    var id = $('#'+htmlId).attr('class').split(' ')[1];
    displayRecipeDetails(id);
});

$(document.body).on('click', '.userViewRecipe', function(){
    var recipeId = $(this).attr('id').split('+')[1];
    displayRecipeDetails(recipeId);
});

$(document.body).on('click', '.remove_grocery', function(){
    var groceryId = $(this).attr('id').split('_')[1];
    removeGrocery(groceryId);
});

$(document.body).on('click', '.remove_recipe', function(){
    var recipeId = $(this).attr('id').split('_')[1];
    removeRecipe(recipeId);
});

$(document.body).on('click', '.display_recipe_portlet', function() {
    $('.display_recipe_portlet').parent().addClass('active');
    $('.display_grocery_portlet').parent().removeClass('active');
    $('#recipeRow').slideDown("slow");
    $("#groceryRow").slideUp("slow");
    getRecipesForUser();
});

$(document.body).on('click', '.display_grocery_portlet', function() {
    $('.display_grocery_portlet').parent().addClass('active');
    $('.display_recipe_portlet').parent().removeClass('active');
    $("#recipeRow").slideUp("slow");
    $('#groceryRow').slideDown("slow");
    getUserGroceryList();
});

$(document.body).on('click', '.addIngredient', function(){
    var htmlId = $(this).attr('id'),
        splitId = htmlId.split("+"),
        recipeId = splitId[1],
        desc = splitId[2],
        qty = splitId[3],
        msrmt = splitId[4],
        name = splitId[5],
        weight = splitId[6];
    if (addIngredientToGroceryList(name, desc, qty, msrmt, weight, recipeId)) {
        $(this).toggle( "explode" );
    }
});

$(document.body).on('click', '.expand', function(){
    $('#search_results').slideUp("slow", function(){});
});

$("#search").click(function() {
    getRecipes();
});

$(document.body).on('click', '.paginate', function(){
    var htmlId = $(this).attr('id'),
        splitId = htmlId.split("_"),
        rangeArr = splitId[1].split("-"),
        from = rangeArr[0],
        to = rangeArr[1];
        
    getRecipes(from, to);
});

$(document.body).on('change', '.updateRating', function(){
    var rating = $(this).val();
    var imageUrl = $(this).attr('id').split(';')[0].split("@")[0];
    var recipeName = $(this).attr('id').split(';')[0].split("@")[1];
    var htmlIdSplit = $(this).attr('id').split('+');
    var recipeId = htmlIdSplit[0].split("~")[1];
    var userRecipeId = $(this).attr('id').split('+');
    if (userRecipeId[1] !== undefined) {
        updateRating(rating, recipeId, userRecipeId[1].split("_")[1]);
    } else {
        updateRating(rating, recipeId, "", recipeName, imageUrl);
    }
});

$("#calorie_range").ionRangeSlider({
    type: "double",
    grid: true,
    from: 0,
    to: 0,
    values: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1200, 1400, 1600, 1800, 2000]
});

function displayHealthTypes() {
    var html = "";
    $.ajax({
        cache: true,
        type: "POST",
        url: "../../api/",
        data: {
            task: 'getAllHealthTypes'
        },
        success: function(response){
            var types = jQuery.parseJSON(response);
            $.each( types, function( key, val ) {
                html += '<div class="md-checkbox">'+
                            '<input type="checkbox" id="healthType_'+val.id+'" class="md-check" value="'+val.name+'">'+
                            '<label for="healthType_'+val.id+'" data-toggle="tooltip" title="'+val.description+'">'+
                              '<span></span>'+
                              '<span class="check"></span>'+
                              '<span class="box"></span> '+val.display_name+
                            '</label>'+
                          '</div>';
            });
            $('#hCheckboxes').html(html);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Error parsing health types");
        }
    });
}

function displayDietTypes() {
    var html = "";
    $.ajax({
        cache: true,
        type: "POST",
        url: "../../api/",
        data: {
            task: 'getAllDietTypes'
        },
        success: function(response){
            var types = jQuery.parseJSON(response);
            $.each( types, function( key, val ) {
                html += '<div class="md-checkbox">'+
                            '<input type="checkbox" id="dietType_'+val.id+'" class="md-check" value="'+val.name+'">'+
                            '<label for="dietType_'+val.id+'" data-toggle="tooltip" title="'+val.description+'">'+
                              '<span></span>'+
                              '<span class="check"></span>'+
                              '<span class="box"></span> '+val.display_name+
                            '</label>'+
                          '</div>';
            });
            $('#dCheckboxes').html(html);
            $('[data-toggle="tooltip"]').tooltip();
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Error parsing diet types");
        }
    });
}

function getRecipesForUser() {
    var html = "";
    $.ajax({
        cache: true,
        type: "POST",
        url: "../../api/",
        data: {
            task: 'getRecipesForUser'
        },
        success: function(response){
            var recipes = jQuery.parseJSON(response);
            $.each( recipes, function( key, obj ) {
                html += '<div class="item">'+
                            '<div class="item-head">'+
                                '<div class="item-details">'+
                                    '<img class="item-pic" src="'+obj.imageUrl+'">'+
                                    '<a href="#" onclick="return false;" class="item-name primary-link userViewRecipe" id="userViewRecipe+'+obj.recipeId+'">'+obj.recipeName+'</a>'+
                                    '<a href="#" onclick="return false;" class="remove_recipe" id="recipe_'+obj.id+'">'+
                                        '<i class="fa fa-trash-o"></i>'+
                                    '</a>'+
                                '</div>'+
                                '<span class="item-status">';
                html += getRatingBadge(obj.rating);
                html += '</div>'+
                            '<div class="item-body"> </div>'+
                        '</div>';
            });
            $('#userRecipeContent').html(html);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Error parsing user recipes");
        }
    });
}

function getUserGroceryList() {
    var html = "";
    $.ajax({
        cache: true,
        type: "POST",
        url: "../../api/",
        data: {
            task: 'getUserGroceryList'
        },
        success: function(response){
            var groceries = jQuery.parseJSON(response);
            $.each( groceries, function( key, grocery ) {
                html += '<div class="item">'+
                            '<div class="item-head">'+
                                '<div class="item-details">'+
                                    '<span class="item-name primary-link">'+grocery.name+'</span>'+
                                    '<a href="#" onclick="return false;" class="remove_grocery" id="grocery_'+grocery.id+'">'+
                                        '<i class="fa fa-trash-o"></i>'+
                                    '</a>'+
                                '</div>';
                html += '</div>'+
                            '<div class="item-body"> <p class="lead"> '+grocery.description+'</p></div>'+
                        '</div>';
            });
            $('#userGroceryContent').html(html);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Error parsing user recipes");
        }
    });
}

function getRatingBadge(rating) {
    var html = "";
    if (rating == 1) {
        html += '<span class="badge badge-empty badge-danger"></span></span>'; 
    }
    if (rating == 2) {
        html += '<span class="badge badge-empty badge-danger"></span></span>'; 
    }
    if (rating == 3) {
        html += '<span class="badge badge-empty badge-warning"></span></span>'; 
    }
    if (rating == 4) {
        html += '<span class="badge badge-empty badge-primary"></span></span>'; 
    }
    if (rating == 5) {
        html += '<span class="badge badge-empty badge-success"></span></span>'; 
    }
    return html;
}

function getDietTypeSelections() {
    var sList = [];
    $('#dCheckboxes input:checked').each(function () {
        sList.push($(this).val());
    });
    return sList.toString();
}

function getHealthTypeSelections() {
    var sList = [];
    $('#hCheckboxes input:checked').each(function () {
        sList.push($(this).val());
    });
    return sList.toString();
}

function formatCalories(calories) {
    if (parseInt(calories) >= 900) {
        return "<span class='text-danger'>"+parseInt(calories)+"</span>";
    }
    else if (parseInt(calories) < 900 && parseInt(calories) >= 650) {
        return "<span class='text-warning'>"+parseInt(calories)+"</span>";
    } else {
        return "<span class='text-success'>"+parseInt(calories)+"</span>";
    }
}

function initStarRating(){
    $('.rating-input').rating({
        min: 0,
        max: 5,
        step: 1,
        size: 'xs',
        showClear: false
    });
}

function updateRating(rating, recipeId, userRecipeId, recipeName, imageUrl) {
    var id = "";
    if (userRecipeId !== undefined) {
        id = userRecipeId;
    }
    $.ajax({
        cache: true,
        type: "POST",
        url: "../../api/",
        data: {
            task: 'updateRating',
            rating: rating,
            recipeId: recipeId,
            userRecipeId: id,
            recipeName: recipeName,
            image: imageUrl
        },
        success: function(response){
            console.log(response);
        }
    });
}

function displayMessage(message, el) {
    var settings = {
            theme: 'teal',
            sticky: false,
            horizontalEdge: 'top',
            verticalEdge: 'right'
        },
        $button = el;
    
        settings.heading = 'Notice!';
    
        settings.life = 5000;

    $.notific8('zindex', 11500);
    $.notific8($.trim(message), settings);
    
    $button.attr('disabled', 'disabled');
    
    setTimeout(function() {
        $button.removeAttr('disabled');
    }, 1000);
}

function getRecipes(rangeFrom, rangeTo) {
    App.blockUI({
        target: '#ingredient_form',
        overlayColor: 'none',
        animate: true
    });
    
    var proteins = $('#proteins').val();
    var dairy = $('#dairy').val();
    var vegetables = $('#vegetables').val();
    var fruits = $('#fruits').val();
    var carbs = $('#carbohydrates').val();
    var misc = $('#misc').val();
    var origins = $('#origins').val();
    var spices = $('#spices').val();
    var dietTypes = getDietTypeSelections();
    var healthTypes = getHealthTypeSelections();
    var rawCalRange = $('#calorie_range').val(),
        split_calRange = rawCalRange.split(";"),
        calMin = split_calRange[0],
        calMax = split_calRange[1];
    if (rangeFrom == undefined) {
        var fromRange = "";
    } else { var fromRange = rangeFrom; }
    
    if (rangeTo == undefined) {
        var toRange = "";
    } else { var toRange = rangeTo; }
    
    $.ajax({
        cache: false,
        type: "POST",
        url: "../../api/",
        data: {
            task: 'getRecipes',
            proteins: proteins,
            dairy: dairy,
            vegetables: vegetables,
            fruits: fruits,
            carbs: carbs,
            misc: misc,
            origins: origins,
            spices: spices,
            dietTypes: dietTypes,
            healthTypes: healthTypes,
            calMin: calMin,
            calMax: calMax,
            from: fromRange,
            to: toRange
        },
        success: function(response){
            var recipes = jQuery.parseJSON(response);
            var tmpHtml = "";
            var createdPagination = false;
            if (recipes.length == 0) {
                App.unblockUI('#ingredient_form');
                displayMessage("No results were returned, please refine your search and try again.", $("#notifier"));
                return;
            }
            var html = '<ul>';
            $.each(recipes, function(key, obj) {
                html += '<li class="search-item clearfix">'+
                            '<a href="'+obj.image+'" target="_blank">'+
                                '<img src="'+obj.image+'" />'+
                            '</a>'+
                            '<div class="search-content">'+
                              '<h2 class="search-title">'+
                                '<a href="javascript:;" class="view_recipe '+obj.id+'" id="recipe_id_'+key+'">'+obj.label+'</a>';
                if ($('#isLoggedIn').val() == "true") {
                    html += '<div class="rating-select">';
                    if (obj.userRecipe !== null) {
                        html += '<input class="rating-input updateRating" id="'+obj.image+'@'+obj.label+';rcpId~'+obj.id+'+urId_'+obj.userRecipe.id+'" type="number" value="'+obj.userRecipe.rating+'" />';
                    } else {
                        html += '<input class="rating-input updateRating" id="'+obj.image+'@'+obj.label+';rcpId~'+obj.id+'" type="number" />';
                    }
                    html += '</div>';
                }
                
                html += '</h2><p class="search-desc"> <span class="text-primary">Serving Size: </span> '+obj.yield+''+
                        '<br><span class="text-primary">Calories: </span> '+formatCalories(obj.calories/obj.yield);
                html += '<br><br><div class="row"> <div class="col-md-11 col-sm-offset-1">';
                $.each(obj.healthLabels, function(i, val) {
                    html += '<div class="label label-sm label-primary">'+val+'</div> ';
                });
                html += '</div></div></p></div></li>';
                
                if (obj.totalPages > 1 && createdPagination == false) {
                    var pageLimit = 5;
                    tmpHtml += '<div class="search-pagination">'+
                                '<ul class="pagination">';
                    var from = 0;
                    var to = 10;
                    var klass = "";
                    for (i = 0; i < obj.totalPages; i++) {
                        // dont dipslay more than 6 pages for pagination
                        if (i > pageLimit) {
                            break;
                        }
                        if (fromRange !== "" && toRange !== "") {
                            if (from == fromRange && to == toRange) {
                                klass = "page-active";
                            } else {
                                klass = "";
                            }
                        } else {
                            if (i == 0) {
                                klass = "page-active";
                            } else {
                                klass = "";
                            }
                        }
                        tmpHtml += '<li class="'+klass+'"><a href="#" id="range_'+from+'-'+to+'" class="paginate" onclick="return false;"> '+(i + 1)+' </a></li>';
                        from += 10;
                        to += 10;
                    }
                    tmpHtml += '</ul></div>';
                    createdPagination = true;
                }
            });
            html += "</ul>";
            html += tmpHtml;
            $('.collapse').click();
            $('#search_results').html(html);
            App.unblockUI('#ingredient_form');
            initStarRating();
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            App.unblockUI('#ingredient_form');
            alert("Problem retrieving recipes, please try again or contact System Admin");
        }
    });
}

function displayRecipeDetails(id) {
    $.ajax({
        cache: true,
        type: "POST",
        url: "../../api/",
        data: {
            task: 'getRecipe',
            id: id
        },
        success: function(response){
            var data = jQuery.parseJSON(response);
            var html = "";
            if (parseInt(data.total) > 0) {
                html += '<span href="javascript:;" class="icon-btn" style="cursor: default;">'+
                            '<i class="fa fa-clock-o">'+
                                '<i></i>'+
                            '</i>'+
                            '<div>Cook: '+data.cook+' <em>min</em></div>'+
                        '</span> ';
                html += '<span href="javascript:;" class="icon-btn" style="cursor: default;">'+
                            '<i class="fa fa-clock-o">'+
                                '<i></i>'+
                            '</i>'+
                            '<div>Prep: '+data.prep+' <em>min</em></div>'+
                        '</span> ';
                html += '<span href="javascript:;" class="icon-btn" style="cursor: default;">'+
                            '<i class="fa fa-clock-o">'+
                                '<i></i>'+
                            '</i>'+
                            '<div>Total: '+data.total+' <em>min</em></div>'+
                        '</span> ';
            }
            html += "<h3>Ingredients</h3><p><ul>";
            $.each(data.ingredients, function( i, ingredient ) {
                var ingredientDisplayVal = getIngredient(ingredient.text, data.ingredientLines);
                if (ingredientDisplayVal !== null) {
                    html += '<li>'+ingredientDisplayVal;
                    if ($('#isLoggedIn').val() == "true") {
                        if (!isOnList(ingredient.food, ingredient.measure, ingredient.quantity)) {
                            html += ' <a href="#" onclick="return false;" class="addIngredient fa fa-plus-circle pull-right " id="ingredient+'+id+'+'+ingredient.text+'+'+ingredient.quantity+'+'+ingredient.measure+'+'+ingredient.food+'+'+ingredient.weight+'" data-toggle="tooltip" title="Click to add to Grocery List" style="text-decoration: none"></a>';
                        }
                    }
                    html += '</li>';
                }
            });
            html += "</ul></p>";
            if (data.instructions !== null && data.instructions !== "" && data.instructions.length > 0) {
                html += "<h3>Directions</h3><p class='lead'><ol>";
                $.each(data.instructions, function( i, instruction ) {
                    html += "<li> "+instruction+" </li>";
                });
                html += "</ol></p>";
            } else {
                html += "<p class='uppercase'> Instructions are currently unavailable.</p>";
            }
            
            App.unblockUI('#search_results');
            $('#modalBodyContent').html(html);
            $('#modalBtn').click();
            $('[data-toggle="tooltip"]').tooltip();
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            App.unblockUI('#search_results');
            alert("Error retrieving getRecipe api");
        }
    });
}

function getIngredient(ingredient, ingredientArr) {
    for(i = 0; i < ingredientArr.length; i++) {
        if (ingredientArr[i] === ingredient) {
            return ingredientArr[i];
        }
    }
    return null;
}

function addIngredientToGroceryList(name, desc, qty, msrmt, weight, recipeId) {
    var response = false;
    $.ajax({
        cache: true,
        type: "POST",
        async: false,
        url: "../../api/",
        data: {
            task: 'addIngredientToGroceryList',
            name: name,
            description: desc,
            quantity: qty,
            measurement: msrmt,
            weight: weight,
            recipeId: recipeId
        },
        complete: function(data){
            if (data.responseText == 'success') {
                response = true;
            }
        }
    });
    return response;
}

function isOnList(name, measurement, qty) {
    var response = false;
    $.ajax({
        cache: true,
        type: "POST",
        async: false,
        url: "../../api/",
        data: {
            task: 'checkIfIngredientOnList',
            name: name,
            measurement: measurement,
            quantity: qty
        },
        complete: function(data){
            if (data.responseText === "true") {
                response = true;
            }
        }
    });
    return response;
}

function removeGrocery(groceryId) {
    App.blockUI({
        target: '#groceryPortlet',
        overlayColor: 'none',
        animate: true
    });
    $.ajax({
        cache: true,
        type: "POST",
        async: false,
        url: "../../api/",
        data: {
            task: 'removeGrocery',
            id: groceryId
        },
        complete: function(data){
            if (data.responseText === "success") {
                getUserGroceryList();
                App.unblockUI('#groceryPortlet');
            } else {
                alert("There was an error removing the grocery item from the list.");
                App.unblockUI('#groceryPortlet');
            }
        }
    });
}

function removeRecipe(recipeId) {
    App.blockUI({
        target: '#recipePortlet',
        overlayColor: 'none',
        animate: true
    });
    $.ajax({
        cache: true,
        type: "POST",
        async: false,
        url: "../../api/",
        data: {
            task: 'removeRecipe',
            id: recipeId
        },
        complete: function(data){
            if (data.responseText === "success") {
                getRecipesForUser();
                App.unblockUI('#recipePortlet');
            } else {
                App.unblockUI('#recipePortlet');
                alert("There was an error removing the grocery item from the list.");
            }
        }
    });
}