function addNoCache(url){
    var timestamp = (new Date()).valueOf();
    if (url.indexOf("?") >= 0) {
        url = url + "&_tsp_=" + timestamp;
    } else {
        url = url + "?_tsp_=" + timestamp;
    }
    return url;
}

/**
 * check checkbox.
 * @param name string of checkbox name
 * @param checked boolean of checked
 */
function checkbox(name, checked) {
    $("input[type=checkbox][name=" + name + "]").each(function() {
        $(this).prop("checked", checked);
    });
}

/**
 * 复选框选中的个数
 * @param name string of checkbox name
 */
function checkedCount(name) {
    var batchChecks = document.getElementsByName(name);
    var count = 0;
    for (var i = 0;i < batchChecks.length; i++) {
        if (batchChecks[i].checked) {
            count++;
        }
    }
    return count;
}
function checkedFormCount(formId, name) {
    return $("#"+formId+" input[name='"+name+"']:checkbox").filter(":checked").length;
}

function getCheckValues(name){
    var param = "";
    $("input[name='"+name+"']:checkbox").filter(":checked").each(function () {
        var name = $(this).attr("name");//获取name属性
        var value=$(this).val();
        if(null!=name && null != value){
            param+="&"+name+"="+value;
        }
    });
    if(param.length>0){
        return param.substr(1);
    }
    else{
        return param;
    }
}
/**
 * 创建分页
 * @param pageSize
 * @param total
 */
function createPage(pageId, tableId, selectedIndex, pageSize, total, pageUrl) {
    $("#"+pageId).pagination({
        pageSize : pageSize,
        total : total,
        maxPageButton:5,
        selectedIndex: selectedIndex,
        onPageClicked: function(pageIndex, limit) {
            var param = getWhere();
            param.page=pageIndex;
            Cookies.set('default_limit', limit);
            param.limit=limit;
            loadGrid(tableId, pageUrl, param);
        }
    });
}
function getFormWhere(formId){
    var param = {};
    $("#"+formId+" input:hidden,#"+formId+" input:text,select").each(function () {
        var name = $(this).attr("name");//获取name属性
        var value=$(this).val();
        if(null!=name && null != value && value !=""){
            //param[name]=value;
            setKey(param, name, value);
        }
    });
    $("#"+formId+"input:radio,#"+formId+" input:checkbox").filter(":checked").each(function () {
        var name = $(this).attr("name");//获取name属性
        var value=$(this).val();
        if(null!=name && null != value){
            //param[name]=value;
            setKey(param, name, value);
        }
    });
    return param;
}
function getFormWhereStr(formId){
    var param = "";
    $("#"+formId+" input:hidden,#"+formId+" input:text,select").each(function () {
        var name = $(this).attr("name");//获取name属性
        var value=$(this).val();
        if(null!=name && null != value){
            param+="&"+name+"="+value;
        }
    });
    $("#"+formId+"input:radio,#"+formId+" input:checkbox").filter(":checked").each(function () {
        var name = $(this).attr("name");//获取name属性
        var value=$(this).val();
        if(null!=name && null != value){
            param+="&"+name+"="+value;
        }
    });
    if(param.length>0){
        return param.substr(1);
    }
    else{
        return param;
    }
}
/**
 * 页面上的input封装成json
 */
function getWhere(){
    var param = {};
    $("input:hidden,input:text,select").each(function () {
        var name = $(this).attr("name");//获取name属性
        var value=$(this).val();
        if(null!=name && null != value && value !=""){
            //param[name]=value;
            setKey(param, name, value);
        }
    });
    $('input:radio,input:checkbox').filter(':checked').each(function () {
        var name = $(this).attr("name");//获取name属性
        var value=$(this).val();
        if(null!=name && null != value){
            //param[name]=value;
            setKey(param, name, value);
        }
    });
    return param;
}
function setKey(obj, key, value){
    if(obj[key]!=undefined){
        obj[key]=obj[key]+","+value;
    }
    else{
        obj[key]=value;
    }
}
/**
 * 页面上的input封装成json
 */
function getWhereStr(){
    var param = "";
    $("input:hidden,input:text,select,textarea").each(function () {
        var name = $(this).attr("name");//获取name属性
        var value=$(this).val();
        if(null!=name && null != value){
            value = encodeURI(encodeURI(value));
            param+="&"+name+"="+value;
        }
    });
    $('input:radio,input:checkbox').filter(':checked').each(function () {
        var name = $(this).attr("name");//获取name属性
        var value=$(this).val();
        if(null!=name && null != value){
            value = encodeURI(encodeURI(value));
            param+="&"+name+"="+value;
        }
    });
    if(param.length>0){
        return param.substr(1);
    }
    else{
        return param;
    }
}
/**
 * 列表加载数据
 * @param id
 * @param url
 * @param data
 */
function loadGrid(id, url, data){
    $("#"+id).html('<div style="padding:10px;"><span class="am-icon-spinner am-icon-spin"></span><i class="ace-icon fa fa-spinner fa-spin orange bigger-125"></i>&nbsp;正在加载中...</div>');
    var limit= Cookies.get('default_limit');
    if(limit){
        data.limit=limit;
    }
    $("#"+id).load(url, data);
}
function setGrid(id){
    var window_height = $(window).innerHeight();
    var page_height = $("#page_"+id).outerHeight();
    var top = $("#ambody_"+id).offset().top;
    var height = window_height-top-page_height-51;
    $("#ambody_"+id).css("height",height);
    var width = $("#amhead_"+id).width();
    var tableHeight = $("#ambody_"+id+" .am-table").height();
    if(height<=tableHeight){
        var os = detectOS();
        if(os=="Mac"){
            $("#amhead_"+id+" .am-table").css("width",width-15);
        }
        else{
            $("#amhead_"+id+" .am-table").css("width",width-17);
        }

    }
    $("#ambody_"+id).scroll(function() {
        var left= $(this).scrollLeft();
        $("#amhead_"+id).animate({marginLeft:-left},{ duration:0 , queue:false });
    });

}

function detectOS() {
    var isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
    if (isMac) return "Mac";
    return "other";
}