$(document).ready(function() {
    // var array = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];
    var honeybees = $('.list-container').data('list');
    //将honeybees字符串，按照,切割为数组
    array = honeybees.split(',');
    var arrayHtml = "";
    for (var i = 0; i < array.length; i++) {
        arrayHtml += '<li class="array-item">' + array[i] + '</li>';
    }
    $('.list-container').html(arrayHtml);

    // 将文本框中的值添加回数组中
    $('.list-string').click(function() {
        var textInput = $(this);
        var text = textInput.val();
        var clickedIndex = event.target.selectionStart;
        //点击最后一个字符不做处理，以便用户点击输入字符
        if (clickedIndex === text.length) {
            return;
        }
        //以clickefIndex为中心点，向左向右找逗号，如果找不到逗号，就是整个字符串
        var leftIndex = text.lastIndexOf(",", clickedIndex);
        var rightIndex = text.indexOf(",", clickedIndex);
        if (leftIndex === -1) {
            leftIndex = 0;
        }
        if (rightIndex === -1) {
            rightIndex = text.length;
        }
        var subStr = text.substring(leftIndex, rightIndex);
        if(subStr === ""){
            return;
        }
        var arrayContainer = $('.list-container');
        var items = arrayContainer.find('.array-item');
        var inserted = false;

        for (var i = 0; i < items.length; i++) {
            var currentItem = items.eq(i);
            var currentItemText = currentItem.text();

            if (currentItemText === "") {
                currentItem.text(subStr);
                inserted = true;
                break;
            } else if (currentItemText.indexOf(',') > -1) {
                var subItems = currentItemText.split(',');
                if (subItems[0] === subStr) {
                    inserted = true;
                    break;
                }
            }
        }

        if (!inserted) {
            //删除文本框中的值
            textInput.val(text.replace(subStr, ""));
            //删除逗号
            subStr = subStr.replace(/,/g, "");
            //在items中找出text和subStr相同的项，去除fontline-line-through样式
            for (var i = 0; i < items.length; i++) {
                var currentItem = items.eq(i);
                var currentItemText = currentItem.text();

                if (currentItemText === subStr) {
                    currentItem.removeClass('fontline-line-through');
                    break;
                }
            }
        }

        return ;
    });
});

//jquery立即执行函数
$(function() {
    $.fn.removeFontline = function() {
        return $('.array-item').each(function() {
            $(this).removeClass('fontline-line-through');
        });
    }
    // 在文档加载完成后执行这里的代码
    //给jquery添加一个方法，用于清除fontline-line-through样式
    $.fn.listTextAreaClear = function() {
        return $('.array-item').each(function() {
            $(this).removeClass('fontline-line-through');
        });
    };

    // 获取 list-container 元素和 array-item 元素
    var $listContainer = $('.list-container');
    var $arrayItems = $listContainer.find('.array-item');
    // 监听 list-container 元素的属性变化
    var observer = new MutationObserver(function(mutations) {
        // 获取新的 data-list 属性值，并使用逗号进行分割
        var dataList = $listContainer.attr('data-list').split(',');

        // 如果数据项数量和元素数量不一致，则重新渲染元素
        // if (dataList.length !== $arrayItems.length) {
        // 先清空所有的 array-item 元素
        $arrayItems.remove();

        // 遍历数据项，创建新的 array-item 元素并添加到容器中
        for (var i = 0; i < dataList.length; i++) {
            $('<div class="array-item"></div>').text(dataList[i]).appendTo($listContainer);
        }

        // 更新 array-item 元素列表
        $arrayItems = $listContainer.find('.array-item');
        // }
    });

    // 开始监听 list-container 元素的属性变化
    observer.observe($listContainer[0], { attributes: true });

    // 监听 array-item 元素的 click 事件
    $listContainer.on('click', '.array-item', function(e) {
        // 获取当前的数据项和下标
        var data = $(e.target).text();
        var index = $(e.target).index();

        // 弹出提示框，显示当前数据项和下标
        // alert('当前数据项为：' + data + '，下标为：' + index);


        //已经有fontline-line-through样式的，对应的文本框中的值已经添加过了，不需要再添加
        if ($(this).hasClass('fontline-line-through')) {
            return false;
        }
        var value = data;
        var textInput = $('.list-string');
        var currentVal = textInput.val();

        if (currentVal === "") {
            textInput.val(value);
        } else {
            textInput.val(currentVal + "," + value);
        }

        //将选中的数组项加上删除样式
        $(this).addClass('fontline-line-through');
    });
});