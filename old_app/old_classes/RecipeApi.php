<?php
class RecipeApi {
    private $baseUrl = "https://api.edamam.com/search?";
    private $apiKey = "9db1911e987422a7679533cf8a034658";
    private $appId = "88acba0c";
    private $dietQueryStr = "&diet=";
    private $healthQueryStr = "&health=";
    private $calorieQueryStr = "&calories="; // use range: "lte 600", "gte 250", or "gte 250, lte 600"
    
    public $id;
    public $label;
    public $image;
    public $source;
    public $url;
    public $yield; // number of servings
    public $calories;
    public $ingredientLines; // array of ingredients
    public $ingredients; // detailed array of each ingredients
    public $dietLabels; // "balanced", "high-protein", "high-fiber", "low-fat", "low-carb", "low-sodium"
    public $healthLabels; // "vegan", "vegetarian", "paleo", "dairy-free", "gluten-free", "wheat-free", "fat-free" etc
    public $totalDaily; // array of percentages of daily value per serving
    public $totalNutrients; // array of total nutrients per serving
    public $hasMore;
    public $count;
    public $totalPages;
    
    public function getRecipes($queryString, $dietParam, $healthParam, $calorieParam, $from, $to) {
        $searchUrl = $this->buildSearchUrl($queryString, $dietParam, $healthParam, $calorieParam, $from, $to);
        $response = json_decode(file_get_contents($searchUrl));
        return $this->buildRecipes($response);
    }
    
    public function getRecipe($id) {
        $searchUrl = str_replace("#", "%23", $this->getBaseUrl().$this->buildIdQueryString($id));
        $response = json_decode(file_get_contents($searchUrl));
        return $this->buildRecipe($response);
    }
    
    private function buildRecipe($response) {
        $recipe = new RecipeApi();
        $recipe->setId($response[0]->uri);
        $recipe->setLabel($response[0]->label);
        $recipe->setImage($response[0]->image);
        $recipe->setSource($response[0]->source);
        $recipe->setUrl($response[0]->url);
        $recipe->setYield($response[0]->yield);
        $recipe->setCalories(intval($response[0]->calories));
        $recipe->setIngredientLines($response[0]->ingredientLines);
        $recipe->setIngredients($response[0]->ingredients);
        $recipe->setDietLabels($response[0]->dietLabels);
        $recipe->setHealthLabels($response[0]->healthLabels);
        $recipe->setTotalDaily($response[0]->totalDaily);
        $recipe->setTotalNutrients($response[0]->totalNutrients);
        
        $this->buildAdditionalFields($recipe, $response);
        
        return $recipe;
    }
    
    private function buildAdditionalFields(&$recipe, $obj) {
        try {
            $html = file_get_contents($obj[0]->url);
            $parser = RecipeParser::parse($html, $obj[0]->url);
        } catch (Exception $e) {
            $recipe->cook = $parser->time['cook'];
            $recipe->prep = $parser->time['prep'];
            $recipe->total = $parser->time['total'];
            $recipe->description = $parser->description;
            $recipe->instructions = "";
            
            return $recipe;
        }
        try {
            $recipe->instructions = $parser->instructions[0]['list'];
        } catch(Exception $e) {
            $recipe->instructions = "";
        }
        $recipe->cook = $parser->time['cook'];
        $recipe->prep = $parser->time['prep'];
        $recipe->total = $parser->time['total'];
        $recipe->description = $parser->description;
    }
    
    private function buildRecipes($response) {
        $arr = array();
        foreach($response->hits as $obj) {
            $recipe = new RecipeApi();
            $recipe->setId($obj->recipe->uri);
            $recipe->setLabel($obj->recipe->label);
            $recipe->setImage($obj->recipe->image);
            $recipe->setSource($obj->recipe->source);
            $recipe->setUrl($obj->recipe->url);
            $recipe->setYield($obj->recipe->yield);
            $recipe->setCalories(intval($obj->recipe->calories));
            $recipe->setIngredientLines($obj->recipe->ingredientLines);
            $recipe->setIngredients($obj->recipe->ingredients);
            $recipe->setDietLabels($obj->recipe->dietLabels);
            $recipe->setHealthLabels($obj->recipe->healthLabels);
            $recipe->setTotalDaily($obj->recipe->totalDaily);
            $recipe->setTotalNutrients($obj->recipe->totalNutrients);
            $recipe->setHasMore($response->more);
            $recipe->setCount($response->count);
            $recipe->setTotalPages(intval(ceil($response->count/10)));
            
            if ($_SESSION['loggedIn'] == 1) {
                $recipe->userRecipe = UserRecipe::getRecipeForUserById($_SESSION['userId'], $recipe->getId());
            }
            
            $arr[] = $recipe;
        }
        return $arr;
    }
    
    private function buildIdQueryString($id) {
        $query = "r=".$id;
        $query .= "&app_id=".$this->getAppId();
        $query .= "&app_key=".$this->getApiKey();
        
        return $query;
    }
    
    private function buildSearchUrl($ingredients, $dietParam = null, $healthParam = null, $calorieParam = null, $from = null, $to = null) {
        $query = $this->buildQueryString($ingredients, $dietParam, $healthParam, $calorieParam, $from, $to);
        return $this->getBaseUrl().$query;
    }
    
    private function buildQueryString($ingredients, $dietParam = null, $healthParam = null, $calorieParam = null, $from = null, $to = null) {
        $query = "q=".$ingredients;
        if (!isNullOrEmptyString($dietParam)) $query .= $this->getDietQueryStr().$dietParam;
        if (!isNullOrEmptyString($healthParam)) $query .= $this->getHealthQueryStr().$healthParam;
        if (!isNullOrEmptyString($calorieParam)) $query .= $this->getCalorieQueryStr().$calorieParam;
        if (!isNullOrEmptyString($from)) $query .= "&from=".$from;
        if (!isNullOrEmptyString($to)) $query .= "&to=".$to;
        $query .= "&app_id=".$this->getAppId();
        $query .= "&app_key=".$this->getApiKey();
        
        return $query;
    }
    
    public function setId($id) { $this->id = $id; }
    public function getId() { return $this->id; }
    public function setLabel($label) { $this->label = $label; }
    public function getLabel() { return $this->label; }
    public function setImage($image) { $this->image = $image; }
    public function getImage() { return $this->image; }
    public function setSource($source) { $this->source = $source; }
    public function getSource() { return $this->source; }
    public function setUrl($url) { $this->url = $url; }
    public function getUrl() { return $this->url; }
    public function setYield($yield) { $this->yield = $yield; }
    public function getYield() { return $this->yield; }
    public function setCalories($calories) { $this->calories = $calories; }
    public function getCalories() { return $this->calories; }
    public function setIngredientLines($ingredientLines) { $this->ingredientLines = $ingredientLines; }
    public function getIngredientLines() { return $this->ingredientLines; }
    public function setIngredients($ingredients) { $this->ingredients = $ingredients; }
    public function getIngredients() { return $this->ingredients; }
    public function setDietLabels($dietLabels) { $this->dietLabels = $dietLabels; }
    public function getDietLabels() { return $this->dietLabels; }
    public function setHealthLabels($healthLabels) { $this->healthLabels = $healthLabels; }
    public function getHealthLabels() { return $this->healthLabels; }
    public function setTotalDaily($totalDaily) { $this->totalDaily = $totalDaily; }
    public function getTotalDaily() { return $this->totalDaily; }
    public function setTotalNutrients($totalNutrients) { $this->totalNutrients = $totalNutrients; }
    public function getTotalNutrients() { return $this->totalNutrients; }
    public function setHasMore($hasMore) { $this->hasMore = $hasMore; }
    public function hasMore() { return $this->hasMore; }
    public function setCount($count) { $this->count = $count; }
    public function getCount() { return $this->count; }
    public function setTotalPages($pageCount) { $this->totalPages = $pageCount; }
    public function getTotalPages() { return $this->totalPages; }
    
    private function getBaseUrl() {
        return $this->baseUrl;
    }
    
    private function getApiKey() {
        return $this->apiKey;
    }
    
    private function getAppId() {
        return $this->appId;
    }
    
    private function getDietQueryStr() {
        return $this->dietQueryStr;
    }
    
    private function getHealthQueryStr() {
        return $this->healthQueryStr;
    }
    
    private function getCalorieQueryStr() {
        return $this->calorieQueryStr;
    }
}