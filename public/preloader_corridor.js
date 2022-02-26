let corridorUIAssets = ['explore-btn.png', 'explore-btn_onHover.png', 'return_to_home.png', 'return_to_home_onHover.png'];
let corridorBGImg = ['BG_Corridor_New.jpg'];
let corridorCarouselImg = ['adult.jpg', 'emergence.jpg', 'field.jpg', 'larvae.jpg', 'quality-control.jpg', 'sorter.jpg', 'Xray.jpg'];

var UIAssetsArrayStorage = [];
var UIAssetsStorage;
var UIAssetsLoaded = false;

$(document).ready(function(){
    loadUIAssets("common_UI", corridorUIAssets);
    loadUIAssets("BG_img", corridorBGImg);
    loadUIAssets("corridor-carousel-images", corridorCarouselImg);

    function loadUIAssets(path, assetsArray) {
        var runCount = 0;
        $.each(assetsArray, function(i, val) {
            UIAssetsArrayStorage[i] = UIAssetsStorage = new Image();
            UIAssetsStorage.src = "img/" + path + "/" + assetsArray[i];
            UIAssetsStorage.onload = checkStatus();

            function checkStatus() {
                runCount++;
                if (assetsArray.length == runCount) {
                    UIAssetsLoaded = true;
                    setTimeout(function() {
                        // checkOverallStatus();
                    }, 500);

                }
            }
        });
    }
})