<?php
include_once "../pre.php";

switch($INPUT['task']) {
    case "protein":
        if (strlen(trim($INPUT['q'])) > 2) {
            $arr = array();
            $obj = new Protein();
            $ingredients = $obj->findSimilar(trim($INPUT['q']));
            foreach($ingredients as $ingredient) {
                $arr[] = $ingredient->getName();
            }
            echo json_encode($arr);
        }
        break;
    case "dairy":
        if (strlen(trim($INPUT['q'])) > 2) {
            $arr = array();
            $obj = new Dairy();
            $ingredients = $obj->findSimilar(trim($INPUT['q']));
            foreach($ingredients as $ingredient) {
                $arr[] = $ingredient->getName();
            }
            echo json_encode($arr);
        }
        break;
    case "vegetable":
        if (strlen(trim($INPUT['q'])) > 2) {
            $arr = array();
            $obj = new Vegetable();
            $ingredients = $obj->findSimilar(trim($INPUT['q']));
            foreach($ingredients as $ingredient) {
                $arr[] = $ingredient->getName();
            }
            echo json_encode($arr);
        }
        break;
    case "fruit":
        if (strlen(trim($INPUT['q'])) > 2) {
            $arr = array();
            $obj = new Fruit();
            $ingredients = $obj->findSimilar(trim($INPUT['q']));
            foreach($ingredients as $ingredient) {
                $arr[] = $ingredient->getName();
            }
            echo json_encode($arr);
        }
        break;
    case "carbohydrate":
        if (strlen(trim($INPUT['q'])) > 2) {
            $arr = array();
            $obj = new Carbohydrate();
            $ingredients = $obj->findSimilar(trim($INPUT['q']));
            foreach($ingredients as $ingredient) {
                $arr[] = $ingredient->getName();
            }
            echo json_encode($arr);
        }
        break;
    case "misc":
        if (strlen(trim($INPUT['q'])) > 2) {
            $arr = array();
            $obj = new Miscellaneous();
            $ingredients = $obj->findSimilar(trim($INPUT['q']));
            foreach($ingredients as $ingredient) {
                $arr[] = $ingredient->getName();
            }
            echo json_encode($arr);
        }
        break;
    case "origin":
        if (strlen(trim($INPUT['q'])) > 2) {
            $arr = array();
            $obj = new Origin();
            $ingredients = $obj->findSimilar(trim($INPUT['q']));
            foreach($ingredients as $ingredient) {
                $arr[] = $ingredient->getName();
            }
            echo json_encode($arr);
        }
        break;
    case "spice":
        if (strlen(trim($INPUT['q'])) > 2) {
            $arr = array();
            $obj = new Spice();
            $ingredients = $obj->findSimilar(trim($INPUT['q']));
            foreach($ingredients as $ingredient) {
                $arr[] = $ingredient->getName();
            }
            echo json_encode($arr);
        }
        break;
    default:
        echo "Define a task";
        break;
}