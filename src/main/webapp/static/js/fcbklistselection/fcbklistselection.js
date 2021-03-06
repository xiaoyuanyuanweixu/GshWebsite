/*
 fcbkListSelection 1.10
 - Jquery version required: 1.2.x, 1.3.x, 1.4.x
 
 Changelog:
 - 1.1: added preselected items
 - 1.0: project started
 */
/* Coded by: emposha <admin@emposha.com> */
/* Copyright: Emposha.com <http://www.emposha.com/> - Distributed under MIT - Keep this message! */
/*
 * elem - ul element id or object
 * width - width of ul
 * height - height of each element
 * row - number of items in row
 */
jQuery.fcbkListSelection = function(elem){
	var clearSelected = function (obj){
		$(".fcbklist_item").each(function(index){
			var currVal = obj.find("[type=hidden]").val();
			var tempVal = $(this).find("[type=hidden]").val();
    		if ($(this).hasClass("itemselected") && currVal!=tempVal) {
    			$(this).parents("li").removeAttr("addedid");
    			$(this).toggleClass("itemselected");
    			$(this).parents("li").toggleClass("liselected");
	            removeValue();
	        }
		});
	}
    //add to selected items function
    var addToSelected = function(obj){
        if (obj.hasClass("itemselected")) {
            obj.parents("li").removeAttr("addedid");
            removeValue();
        }
        else {
            obj.parents("li").attr("addedid", "tester");
            addValue(obj);
        }
    }
    
    //bind onmouseover && click event on item
    var bindEventsOnItems = function(elem){
        $.each(elem.children("li").children(".fcbklist_item"), function(i, obj){
            obj = $(obj);
            var flag = false;
            if(obj.parents("li").hasClass("head")){
            	obj.toggleClass("itemhead");
                obj.parents("li").toggleClass("lihead");
                flag = true;
            }
            if(obj.parents("li").hasClass("subhead")){
                obj.toggleClass("itemsubhead");
                obj.parents("li").toggleClass("lisubhead");
                flag = true;
            }
            if (obj.children("input:hidden[class]").length != 0) {
            	addToSelected(obj);
            	obj.toggleClass("itemselected");
            	obj.toggleClass("itemchecked");
            	obj.parents("li").toggleClass("liselected");
            	obj.parents("li").toggleClass("lichecked");
            	flag = true;
            }
            if (obj.children("input[disabled]").length != 0) {
                obj.toggleClass("itemdisabled");
                obj.parents("li").toggleClass("lidisabled");
                flag = true;
            }
            if(!flag){
            	obj.click(function(){
            		clearSelected(obj);
            		addToSelected(obj);
            		obj.toggleClass("itemselected");
            		obj.parents("li").toggleClass("liselected");
            	});
            	obj.mouseover(function(){
            		obj.addClass("itemover");
            	});
            	obj.mouseout(function(){
            		$(".itemover").removeClass("itemover");
            	});
            }
        });
    }
    //wrap elements with div
    var wrapElements = function(elem){
        elem.children("li").wrapInner('<div class="fcbklist_item"></div>');
    }
    
    var addValue = function(obj, value){
        //create input
        var inputid = elem.attr('id') + "_values";
        if ($("#" + inputid).length == 0) {
            var input = document.createElement('input');
            $(input).attr({
                'type': 'hidden',
                'name': inputid,
                'id': inputid,
                'value': ""
            });
            elem.after(input);
        }
        else {
            var input = $("#" + inputid);
        }
        if (!value) {
            value = obj.find("[type=hidden]").val();
        }
        $(input).val(value);
        return input;
    }
    
    var removeValue = function(){
        var inputid = elem.attr('id') + "_values";
        if ($("#" + inputid).length != 0) {
        	$("#" + inputid).val("");
        }
    }
    
    if (typeof(elem) != 'object') 
        elem = $(elem);
    wrapElements(elem);
    bindEventsOnItems(elem);
}
