$(document).ready(function(){
    const player = new Plyr('#intro-player');

    resizeBackground();
    $(window).resize(resizeBackground);

    $('#start-journey').on('click', () => {
        // window.location.href = '/360.html';
        window.location.href = '360.html';
    })


    function resizeBackground() {
        var leftMainContainer_height = $("#left-container").height();
        var leftInnerContainer_height = $("#left-inner-container").height();
        // console.log(leftMainContainer_height + "///" + leftInnerContainer_height);
        // console.log((leftInnerContainer_height / leftMainContainer_height) * 1);
        // $("#version-number").html((leftMainContainer_height /  leftInnerContainer_height) * 1);
    
    
        if( ((leftMainContainer_height /  leftInnerContainer_height) * 1 ) > 1){
            var heightGap = (((leftMainContainer_height /  leftInnerContainer_height) * 1 ) - 2) * -1;
            if(heightGap > 0.95){
                $("#left-container").css("transform", "scale(" + heightGap + ")");
            } else if (heightGap < 0.95){
                $("#left-container").css("transform", "scale(" + 0.95 + ")");
                return;
            }
        } else if (((leftMainContainer_height /  leftInnerContainer_height) * 1 ) < 1){
            var inversedHeightGap = ((leftMainContainer_height /  leftInnerContainer_height) * 0.8);
            if(inversedHeightGap > 0.8){
                $("#left-container").css("transform", "scale(" + ((leftMainContainer_height /  leftInnerContainer_height) * 0.8) + ")");
            } else if(inversedHeightGap < 0.8){
                $("#left-container").css("transform", "scale(" + 0.8 + ")");
            }
        }
      }

})

function getVW(vh){
    let vw = vh / 1.6 * 0.9;
    console.log(vw);
}