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

    // 将选中的数组项添加到文本框中
    $('.array-item').on('click', function() {
        //已经有fontline-line-through样式的，对应的文本框中的值已经添加过了，不需要再添加
        if ($(this).hasClass('fontline-line-through')) {
            return false;
        }
        var value = $(this).text();
        var textInput = $('.list-string');
        var currentVal = textInput.val();

        if (currentVal === "") {
            textInput.val(value);
        } else {
            textInput.val(currentVal + "," + value);
        }

        //将选中的数组项加上删除样式
        $(this).addClass('fontline-line-through');
        // $(this).remove();
    });

// 将文本框中的值添加回数组中
    $('.list-string').click(function() {
        var textInput = $(this);
        var text = textInput.val();
        var clickedIndex = event.target.selectionStart;
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
                    // currentItem.text("");
                    currentItem.removeClass('fontline-line-through');
                    break;
                }
            }



            // var newItem = $('<div class="array-item"></div>');


            // newItem.text(subStr);
            // arrayContainer.append(newItem);
        }

        return ;
        console.log("Clicked character index: " + clickedIndex);



        var textInput = $(this);
        var value = textInput.val();
        var startIndex = textInput[0].selectionStart;
        var endIndex = textInput[0].selectionEnd;

        var subStr = value.substring(0, startIndex);
        var idx = subStr.lastIndexOf(",");
        if (idx !== -1) {
            subStr = subStr.substring(idx + 1);
        }
        subStr += value.substring(endIndex);

        if (subStr !== "") {
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
                        currentItem.text(subItems[1]);
                        inserted = true;
                        break;
                    } else if (subItems[1] === subStr) {
                        currentItem.text(subItems[0]);
                        inserted = true;
                        break;
                    }
                }
            }

            if (!inserted) {
                arrayContainer.append('<div class="array-item">' + subStr + '</div>');
            }
        }
        textInput.val('');
    });

//给jquery添加一个方法，用于清除fontline-line-through样式
    $.fn.removeFontline = function() {
        return $('.array-item').each(function() {
            $(this).removeClass('fontline-line-through');
        });
    }
});