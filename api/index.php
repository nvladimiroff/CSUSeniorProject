<?php
include_once "../pre.php";

switch($INPUT['task']) {
    case "getRecipes":
        $calories = "gte ".$INPUT['calMin'].', lte '.$INPUT['calMax'];
        if ($INPUT['calMax'] == '0') $calories = null;
        $from = null;
        $to = null;
        if (!empty($INPUT['from'])) $from = $INPUT['from'];
        if (!empty($INPUT['to'])) $to = $INPUT['to'];
        $api = new RecipeApi();
        $q = buildQueryString($INPUT);
        $recipes = $api->getRecipes($q, $INPUT['dietTypes'], $INPUT['healthTypes'], $calories, $from, $to);
        if (count($recipes) > 0) {
            addNewIngredients($INPUT);
        }
        echo json_encode($recipes);
        break;
    case "getRecipe":
        $api = new RecipeApi();
        $recipe = $api->getRecipe($INPUT['id']);
        echo json_encode($recipe);
        break;
    case "getRecipesForUser":
        $arr = UserRecipe::getAllForUser($_user->getId());
        echo json_encode($arr);
        break;
    case "getUserGroceryList":
        echo json_encode(Grocery::getListFor($_user->getId()));
        break;
    case "addIngredientToGroceryList":
        if (Grocery::addGroceryForUser($_user->getId(),$INPUT['name'],$INPUT['description'],$INPUT['quantity'],$INPUT['measurement'],$INPUT['weight'],$INPUT['recipeId'])) echo "success";
        else echo "error";
        break;
    case "updateRating":
        if (!empty($INPUT['userRecipeId'])) {
            if (UserRecipe::updateRecipeByUrId($INPUT['userRecipeId'], $INPUT['rating'])) echo "success";
            else echo "error";
        } else {
            if (UserRecipe::addRecipeForUser($_user->getId(), $INPUT['recipeId'], $INPUT['rating'], $INPUT['recipeName'], $INPUT['image'])) echo "success";
            else echo "error";
        }
        break;
    case "createAccount":
        if (!empty($INPUT['username']) && !empty($INPUT['password']) && !empty($INPUT['firstname']) && !empty($INPUT['lastname'])) {
            if (User::isUsernameExisting($INPUT['username'])) {
                echo 'error';
            } else {
                if (User::createUser($INPUT['firstname'], $INPUT['lastname'], $INPUT['email'], $INPUT['username'], $INPUT['password'])) echo 'success';
                else echo 'error';
            }
        } else echo 'error';
        break;
    case "checkUsername":
        if (User::isUsernameExisting($INPUT['username'])) echo "true";
        else echo "false";
        break;
    case "checkIfIngredientOnList":
        if (Grocery::isIngredientOnGroceryList($_user->getId(), $INPUT['name'], $INPUT['quantity'], $INPUT['measurement'])) echo 'true';
        else echo 'false';
        break;
    case "forgotPassword":
        if (ForgotPassword::logForgottenPassword($INPUT['email'])) echo 'success';
        else echo 'error';
        break;
    case "getAllHealthTypes":
        $type = new HealthType();
        echo json_encode($type->getAll());
        break;
    case "getAllDietTypes":
        $type = new DietType();
        echo json_encode($type->getAll());
        break;
    case "removeGrocery":
        if (Grocery::removeItem($INPUT['id'])) echo 'success';
        else echo 'error';
        break;
    case "removeRecipe":
        if (UserRecipe::removeItem($INPUT['id'])) echo 'success';
        else echo 'error';
        break;
    default:
        echo "Define a task";
        break;
}

function buildQueryString($arr) {
    $query = array();
    if (!isNullOrEmptyString($arr['proteins'])) $query[] = $arr['proteins'];
    if (!isNullOrEmptyString($arr['dairy'])) $query[] = $arr['dairy'];
    if (!isNullOrEmptyString($arr['vegetables'])) $query[] = $arr['vegetables'];
    if (!isNullOrEmptyString($arr['fruits'])) $query[] = $arr['fruits'];
    if (!isNullOrEmptyString($arr['carbs'])) $query[] = $arr['carbs'];
    if (!isNullOrEmptyString($arr['misc'])) $query[] = $arr['misc'];
    if (!isNullOrEmptyString($arr['origins'])) $query[] = $arr['origins'];
    if (!isNullOrEmptyString($arr['spices'])) $query[] = $arr['spices'];
    return implode(',', $query);
}

function addNewIngredients($arr) {
    if (!isNullOrEmptyString($arr['proteins'])) Protein::addNewIngredientIfNeeded($arr['proteins']);
    if (!isNullOrEmptyString($arr['dairy'])) Dairy::addNewIngredientIfNeeded($arr['dairy']);
    if (!isNullOrEmptyString($arr['vegetables'])) Vegetable::addNewIngredientIfNeeded($arr['vegetables']);
    if (!isNullOrEmptyString($arr['fruits'])) Fruit::addNewIngredientIfNeeded($arr['fruits']);
    if (!isNullOrEmptyString($arr['carbs'])) Carbohydrate::addNewIngredientIfNeeded($arr['carbs']);
    if (!isNullOrEmptyString($arr['misc'])) Miscellaneous::addNewIngredientIfNeeded($arr['misc']);
    if (!isNullOrEmptyString($arr['origins'])) Origin::addNewIngredientIfNeeded($arr['origins']);
    if (!isNullOrEmptyString($arr['spices'])) Spice::addNewIngredientIfNeeded($arr['spices']);
}