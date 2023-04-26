(function ($) {
    $.fn.listBuilder = function (options) {
        var defaultOptions = {
            containerClass: 'list-container',
            itemClass: 'array-item',
            listClass: 'list-string',
        };
        var settings = $.extend(defaultOptions, options);

        return this.each(function () {
            var $this = $("."+settings.containerClass);
            var honeybees = $this.data('list');
            var array = honeybees.split(',');
            var arrayHtml = "";

            for (var i = 0; i < array.length; i++) {
                arrayHtml += '<li class="' + settings.itemClass + '">' + array[i] + '</li>';
            }

            $this.html(arrayHtml)
                .on('click', '.' + settings.itemClass, function () {
                    var $item = $(this);

                    if ($item.hasClass('fontline-line-through')) {
                        return false;
                    }

                    var value = $item.text();
                    var $textInput = $('.'+settings.listClass);
                    var currentVal = $textInput.val();

                    if (currentVal === "") {
                        $textInput.val(value);
                    } else {
                        $textInput.val(currentVal + "," + value);
                    }

                    $item.addClass('fontline-line-through');
                });

            $('.'+settings.listClass).on('click', function (event) {
                var $textInput = $('.'+settings.listClass);
                var text = $textInput.val();
                var clickedIndex = event.target.selectionStart;

                if (clickedIndex === text.length) {
                    return;
                }

                var leftIndex = text.lastIndexOf(",", clickedIndex);
                var rightIndex = text.indexOf(",", clickedIndex);

                if (leftIndex === -1) {
                    leftIndex = 0;
                }

                if (rightIndex === -1) {
                    rightIndex = text.length;
                }

                var subStr = text.substring(leftIndex, rightIndex);

                if (subStr === "") {
                    return;
                }

                var $arrayContainer = $('.' + settings.containerClass);
                var $items = $arrayContainer.find('.' + settings.itemClass);
                var inserted = false;

                for (var i = 0; i < $items.length; i++) {
                    var $currentItem = $items.eq(i);
                    var currentItemText = $currentItem.text();

                    if (currentItemText === "") {
                        $currentItem.text(subStr);
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
                    $textInput.val(text.replace(subStr, ""));
                    subStr = subStr.replace(/,/g, "");

                    for (var i = 0; i < $items.length; i++) {
                        var $currentItem = $items.eq(i);
                        var currentItemText = $currentItem.text();

                        if (currentItemText === subStr) {
                            $currentItem.removeClass('fontline-line-through');
                            break;
                        }
                    }
                }

                return;
            });

            var observer = new MutationObserver(function (mutations) {
                var dataList = $this.attr('data-list').split(',');
                var $arrayItems = $this.find('.' + settings.itemClass);
                $arrayItems.remove();

                for (var i = 0; i < dataList.length; i++) {
                    $('<div class="' + settings.itemClass + '"></div>').text(dataList[i]).appendTo($this);
                }
            });

            observer.observe($this[0], { attributes: true });
        });
    };
}(jQuery));