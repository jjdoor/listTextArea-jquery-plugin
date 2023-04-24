# listTextArea-jquery-plugin
通过点击列表项将数据插入到文本框中，并支持在文本框中再次点击以将数据插入回列表中
## 使用方法
### 引入文件
```html
<script src="jquery.js"></script>
<script src="listTextArea-jquery-plugin.js"></script>
<link href="listTextArea-jquery-plugin.css" rel="stylesheet">
```
### HTML
```html
<!--样式必须是list-container，传输的数据写在data-list里-->
<div class="list-container" data-list="12345678,23456789,34567890,45678901">
    <!-- list数据会形成下面的列表 -->
    <!-- <div class="array-item">12345678</div>-->
    <!-- <div class="array-item">23456789</div>-->
    <!-- <div class="array-item">34567890</div>-->
    <!-- <div class="array-item">45678901</div>-->
</div>
<!--样式必须是list-string-->
<textarea type="text" class="list-string" placeholder="点击上面优化器可以添加到此处，点击此处优化器可以删除已添加的。&#10;手动添加多个优化器，请用英文逗号分割。"></textarea>
```
### 通过bower安装
```shell
bower install jjdoor/listTextArea-jquery-plugin --save
```
### yii2框架使用
```php
<?php
//引入文件路径/assets/ListTextAreaAsset.php
namespace app\assets;

use yii\web\AssetBundle;

class ListTextAreaAsset extends AssetBundle {

    public $sourcePath = '@bower/listTextArea-jquery-plugin';
    public $css = [
        'listTextArea-jquery-plugin.css',
    ];
    public $js = [
        'listTextArea-jquery-plugin.js',
    ];
    //依赖
    public $depends = [
        'app\assets\AppAsset',
    ];
}
?>

<?php

//视图文件路径views/site/index.php
use app\assets\ListTextAreaAsset;
ListTextAreaAsset::register($this);

?>
```
