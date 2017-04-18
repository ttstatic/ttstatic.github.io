 //global suggestion list for #search-input
 var searchSuggestions = [{
         value: "Abc",
         data: ""
     }, {
         value: "def",
         data: ""
     }, {
         value: "ghi",
         data: ""
     }, {
         value: "jkl",
         data: ""
     }, {
         value: "aber",
         data: ""
     }, {
         value: "sdsd",
         data: ""
     }, {
         value: "Glebe NSW 2000",
         data: ""
     }

 ];

 (function() {

     $(document).ready(function() {

             $('#search-input').autocomplete({
             lookup: searchSuggestions,
             onSelect: function(obj) {
                 $("#search-input").val(obj.value);
             }
         });

         $('#search-input-mob').autocomplete({
             lookup: searchSuggestions,
             onSelect: function(obj) {
                 $("#search-input-mob").val(obj.value);
             }
         });

     }); //ready

 })();