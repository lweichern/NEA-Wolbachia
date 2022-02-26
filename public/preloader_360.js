let staticUIAssets = ['back_to_corridor.png', 'back_to_corridor_onHover.png', 'zoom_in_icon.png', 'zoom_in_icon_hover.png', 'zoom_out_icon.png', 'zoom_out_icon_hover.png', 'unmute_icon.png', 'mute_icon.png', 'fullscreen_icon.png', 'fullscreen_icon_close.png', 'info_icon.png', 'info_icon_hover.png', 'next_room.png','next_room_hover.png', 'closeDark_popUp_btn.png', 'view_icon.png', 'continue_btn.png', 'continue_btn_onHover.png', 'field_return_to_home.png', 'field_return_to_home_onHover.png'];

let hotspotImages = ['adultRoom/Mosquito mating.jpg', 'larvaeRoom/larvae_1.jpg', 'larvaeRoom/larvae_2.jpg', 'larvaeRoom/larvae_3.jpg', 'larvaeRoom/Water recycling system.jpg', 'emergenceRoom/5 Mosquito Emergence.jpg', 'emergenceRoom/Screenshot 2021-02-17 11.56.40.jpg', 'field/7 Field Op 1.jpg', 'field/7 Field Op 2.jpg', 'qualityControlRoom/NYL_5548.jpg', 'xrayRoom/Xray.jpg', 'xrayRoom/xray_bg.jpg', 'qualityControlRoom/aedes.jpg', 'qualityControlRoom/culex.jpg', 'qualityControlRoom/anopheles.jpg', 'qualityControlRoom/male and female-QCR-MultiImage1.jpg', 'qualityControlRoom/Intro Image.jpg'];

let portraitWarningImage = ['mobile-portrait-bg.jpg', 'mobile-portrait-icon.png']

let thumbnailImages = ['AR-1.jpg', 'AR-2.jpg', 'FR-1.jpg', 'LR-4.jpg'];

var UIAssetsArrayStorage = [];
var UIAssetsStorage;
var UIAssetsLoaded = false;

$(document).ready(function(){
    loadUIAssets("common_UI", staticUIAssets);
    loadUIAssets("hotspot-img", hotspotImages);
    loadUIAssets("mobile-portrait", portraitWarningImage);
    loadUIAssets("video-thumbnail", thumbnailImages);
    
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