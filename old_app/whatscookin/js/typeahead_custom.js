var pSearch    = new Bloodhound({
    datumTokenizer      : Bloodhound.tokenizers.obj.whitespace("name"),
    queryTokenizer      : Bloodhound.tokenizers.whitespace,
    remote              : {
        url             : '../../api/typeahead.php?task=protein&q=%QUERY',
        wildcard        : '%QUERY',
        filter: function(list) {
            return $.map(list, function(ingredient) {
                return { name: ingredient };
            });
        }
    }
});
pSearch.initialize();

$('#proteins').tagsinput({
    typeaheadjs: {
        name            : 'pingredients',
        displayKey      : "name",
        valueKey        : "name",
        source          : pSearch.ttAdapter(),
        limit           : 10
    },
    freeInput: true,
    trimValue: true,
    maxTags: 3,
    confirmKeys: [13, 44]
});

var dairySearch    = new Bloodhound({
    datumTokenizer      : Bloodhound.tokenizers.obj.whitespace("name"),
    queryTokenizer      : Bloodhound.tokenizers.whitespace,
    remote              : {
        url             : '../../api/typeahead.php?task=dairy&q=%QUERY',
        wildcard        : '%QUERY',
        filter: function(list) {
            return $.map(list, function(ingredient) {
                return { name: ingredient };
            });
        }
    }
});
dairySearch.initialize();

$('#dairy').tagsinput({
    typeaheadjs: {
        name            : 'dingredients',
        displayKey      : "name",
        valueKey        : "name",
        source          : dairySearch.ttAdapter(),
        limit           : 10
    },
    freeInput: true,
    trimValue: true,
    maxTags: 3,
    confirmKeys: [13, 44]
});

var vegetableSearch    = new Bloodhound({
    datumTokenizer      : Bloodhound.tokenizers.obj.whitespace("name"),
    queryTokenizer      : Bloodhound.tokenizers.whitespace,
    remote              : {
        url             : '../../api/typeahead.php?task=vegetable&q=%QUERY',
        wildcard        : '%QUERY',
        filter: function(list) {
            return $.map(list, function(ingredient) {
                return { name: ingredient };
            });
        }
    }
});
vegetableSearch.initialize();

$('#vegetables').tagsinput({
    typeaheadjs: {
        name            : 'vingredients',
        displayKey      : "name",
        valueKey        : "name",
        source          : vegetableSearch.ttAdapter(),
        limit           : 10
    },
    freeInput: true,
    trimValue: true,
    maxTags: 3,
    confirmKeys: [13, 44]
});

var fruitSearch    = new Bloodhound({
    datumTokenizer      : Bloodhound.tokenizers.obj.whitespace("name"),
    queryTokenizer      : Bloodhound.tokenizers.whitespace,
    remote              : {
        url             : '../../api/typeahead.php?task=fruit&q=%QUERY',
        wildcard        : '%QUERY',
        filter: function(list) {
            return $.map(list, function(ingredient) {
                return { name: ingredient };
            });
        }
    }
});
fruitSearch.initialize();

$('#fruits').tagsinput({
    typeaheadjs: {
        name            : 'fingredients',
        displayKey      : "name",
        valueKey        : "name",
        source          : fruitSearch.ttAdapter(),
        limit           : 10
    },
    freeInput: true,
    trimValue: true,
    maxTags: 3,
    confirmKeys: [13, 44]
});

var carbSearch    = new Bloodhound({
    datumTokenizer      : Bloodhound.tokenizers.obj.whitespace("name"),
    queryTokenizer      : Bloodhound.tokenizers.whitespace,
    remote              : {
        url             : '../../api/typeahead.php?task=carbohydrate&q=%QUERY',
        wildcard        : '%QUERY',
        filter: function(list) {
            return $.map(list, function(ingredient) {
                return { name: ingredient };
            });
        }
    }
});
carbSearch.initialize();

$('#carbohydrates').tagsinput({
    typeaheadjs: {
        name            : 'cingredients',
        displayKey      : "name",
        valueKey        : "name",
        source          : carbSearch.ttAdapter(),
        limit           : 10
    },
    freeInput: true,
    trimValue: true,
    maxTags: 3,
    confirmKeys: [13, 44]
});

var miscSearch    = new Bloodhound({
    datumTokenizer      : Bloodhound.tokenizers.obj.whitespace("name"),
    queryTokenizer      : Bloodhound.tokenizers.whitespace,
    remote              : {
        url             : '../../api/typeahead.php?task=misc&q=%QUERY',
        wildcard        : '%QUERY',
        filter: function(list) {
            return $.map(list, function(ingredient) {
                return { name: ingredient };
            });
        }
    }
});
miscSearch.initialize();

$('#misc').tagsinput({
    typeaheadjs: {
        name            : 'mingredients',
        displayKey      : "name",
        valueKey        : "name",
        source          : miscSearch.ttAdapter(),
        limit           : 10
    },
    freeInput: true,
    trimValue: true,
    maxTags: 3,
    confirmKeys: [13, 44]
});

var originSearch    = new Bloodhound({
    datumTokenizer      : Bloodhound.tokenizers.obj.whitespace("name"),
    queryTokenizer      : Bloodhound.tokenizers.whitespace,
    remote              : {
        url             : '../../api/typeahead.php?task=origin&q=%QUERY',
        wildcard        : '%QUERY',
        filter: function(list) {
            return $.map(list, function(ingredient) {
                return { name: ingredient };
            });
        }
    }
});
originSearch.initialize();

$('#origins').tagsinput({
    typeaheadjs: {
        name            : 'oingredients',
        displayKey      : "name",
        valueKey        : "name",
        source          : originSearch.ttAdapter(),
        limit           : 10
    },
    freeInput: true,
    trimValue: true,
    maxTags: 3,
    confirmKeys: [13, 44]
});

var spiceSearch    = new Bloodhound({
    datumTokenizer      : Bloodhound.tokenizers.obj.whitespace("name"),
    queryTokenizer      : Bloodhound.tokenizers.whitespace,
    remote              : {
        url             : '../../api/typeahead.php?task=spice&q=%QUERY',
        wildcard        : '%QUERY',
        filter: function(list) {
            return $.map(list, function(ingredient) {
                return { name: ingredient };
            });
        }
    }
});
spiceSearch.initialize();

$('#spices').tagsinput({
    typeaheadjs: {
        name            : 'singredients',
        displayKey      : "name",
        valueKey        : "name",
        source          : spiceSearch.ttAdapter(),
        limit           : 10
    },
    freeInput: true,
    trimValue: true,
    maxTags: 3,
    confirmKeys: [13, 44]
});