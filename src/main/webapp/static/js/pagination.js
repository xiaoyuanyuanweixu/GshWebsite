/**
 * Created by sibetech on 2015-1-12.
 */
(function($) {
    $.fn.pagination = function(config) {
        if (this.size() != 1)
            $.error('请为这个插件提供一个唯一的编号');

        var c = {
            pageSize : 10,
            pageList:[10,20,30,50,100,500],
            total : 0,
            maxPages : 1,
            realPageCount : 1,
            lastSelectedIndex : 1,
            selectedIndex : 1,
            maxPageButton: 3,
            onPageClicked : null
        };

        var firstBtn, preBtn, nextBtn, lastBtn;

        return this.each(function() {

            var $this = $(this);
            if (config) $.extend(c, config);

            init();
            bindALL();

            function init() {
                $this.find('li').remove();
                c.maxPages = Math.ceil(c.total/c.pageSize);

                if(c.maxPages < 1) return;

                $this.append('<li class="disabled"><a class="first" href="#" title="首页"><i class="fa fa-angle-double-left"></i></a></li>');
                $this.append('<li class="disabled"><a class="pre" href="#" title="上一页"><i class="fa fa-angle-left"></i></a></li>');

                var pageCount = c.maxPages < c.maxPageButton ? c.maxPages : c.maxPageButton;
                //中间页码序号
                var centerIndex = (pageCount+1)/2;
                // var currentIndex = 1;
                $this.append('<li><span class="separator"></span><input type="text" id="selectIndex" name="selectIndex" value="'+c.selectedIndex+'"/>&nbsp;共&nbsp;'+c.maxPages+'&nbsp;页<span class="separator"></span></li>');
                $this.append('<li class="disabled"><a class="next" href="#" title="下一页"><i class="fa fa-angle-right"></i></a></li>');
                $this.append('<li class="disabled"><a class="last" href="#" title="尾页"><i class="fa fa-angle-double-right"></i></a></li>');
                var pageListHtml = "<li><select id='pageSizeItem' class='pageSizeItem'>";
                for(var i=0;i<c.pageList.length; i++){
                    pageListHtml+="<option value='"+c.pageList[i]+"'";
                    if(c.pageSize==c.pageList[i]){
                        pageListHtml+=" selected='selected' ";
                    }
                    pageListHtml+=" >"+ c.pageList[i]+"</option>";
                }
                pageListHtml+="</select></li>";
                $this.append(pageListHtml);
                if(c.selectedIndex>1){
                    $this.find('li a.first').parent().removeClass("disabled");
                    $this.find('li a.pre').parent().removeClass("disabled");
                }else{
                    $this.find('li a.first').parent().addClass("disabled");
                    $this.find('li a.pre').parent().addClass("disabled");
                }

                if(c.selectedIndex == c.maxPages){
                    $this.find('li a.next').parent().addClass("disabled");
                    $this.find('li a.last').parent().addClass("disabled");
                }else{
                    $this.find('li a.next').parent().removeClass("disabled");
                    $this.find('li a.last').parent().removeClass("disabled");
                }
                // $this.find('li:nth-child('+currentIndex+')').addClass('active');

                firstBtn = $this.find('li a.first').parent();
                preBtn = $this.find('li a.pre').parent();
                lastBtn = $this.find('li a.last').parent();
                nextBtn = $this.find('li a.next').parent();
            }

            function onClickPage(selectedIndex) {
                if(c.onPageClicked) {
                    c.onPageClicked.call(this, selectedIndex, c.pageSize);
                }
            }
            function onPageBtnClick($_this) {
                var selectedText = $_this.attr("title");
                var selectedBtn = $this.find('#selectIndex');
                var selectedIndex = parseInt(selectedBtn.val());
                var index = 0;
                if(selectedText == '下一页') {
                    index=selectedIndex+1;
                }
                else if(selectedText == '上一页') {
                    index=selectedIndex-1;
                }
                else if(selectedText == '首页') {
                    index=1;
                }
                else if(selectedText == '尾页') {
                    index= c.maxPages;
                }
                else if(selectedText == 'GO') {
                    var gotopage = $("#gotopage").val();
                    if(gotopage.length<=0){
                        $.alert("请输入页码");
                        $("#gotopage").focus();
                        return;
                    }
                    else{
                        try{
                            if(!isNaN(gotopage)){
                                index = parseInt(gotopage);
                                if(index> c.maxPages){
                                    index = c.maxPages;
                                }
                            }
                            else{
                                $.alert("请输入正确的页码");
                                return;
                            }
                        }catch(e){
                            $.alert("请输入正确的页码");
                            $("#gotopage").focus();
                            return;
                        }

                    }
                }
                else {
                    index = parseInt(selectedText);
                }
                onClickPage(index);
            }

            function bindALL() {
                $this.find("li.page a,li a.first,li a.last,li a.pre,li a.next,li a.goto").each(function() {
                    if($(this).parent().hasClass('disabled')) return;

                    $(this).on('pageClick', function(e) {
                        onPageBtnClick($(this));
                    });
                });

                $this.find("li.page a,li a.first,li a.last,li a.pre,li a.next,li a.goto").click(function(e) {
                    e.preventDefault();
                    if($(this).parent().hasClass('disabled')) return;
                    $(this).trigger('pageClick', e);
                });
                $this.find("#selectIndex").change(function() {
                    var page = parseInt(this.value);
                    if(isNaN(page)){
                        onClickPage(1);
                    }
                    else{
                        onClickPage(page);
                    }
                });
                $this.find("#pageSizeItem").change(function() {
                    var pageSize = this.value;
                    c.pageSize=pageSize;
                    onClickPage(1);
                });

            }
        });
    };
})(jQuery);