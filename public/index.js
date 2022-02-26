/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

(function() {
  var Marzipano = window.Marzipano;
  var bowser = window.bowser;
  var screenfull = window.screenfull;
  var data = window.APP_DATA;

  // Grab elements from DOM.
  var panoElement = document.querySelector('#pano');
  var sceneNameElement = document.querySelector('#titleBar .sceneName');
  var sceneListElement = document.querySelector('#sceneList');
  var sceneElements = document.querySelectorAll('#sceneList .scene');
  var sceneListToggleElement = document.querySelector('#sceneListToggle');
  // var autorotateToggleElement = document.querySelector('#autorotateToggle');
  var fullscreenToggleElement = document.querySelector('#fullscreen');

  // Detect desktop or mobile mode.
  if (window.matchMedia) {
    var setMode = function() {
      if (mql.matches) {
        document.body.classList.remove('desktop');
        document.body.classList.add('mobile');
      } else {
        document.body.classList.remove('mobile');
        document.body.classList.add('desktop');
      }
    };
    var mql = matchMedia("(max-width: 500px), (max-height: 500px)");
    setMode();
    mql.addListener(setMode);
  } else {
    document.body.classList.add('desktop');
  }

  // Detect whether we are on a touch device.
  document.body.classList.add('no-touch');
  window.addEventListener('touchstart', function() {
    document.body.classList.remove('no-touch');
    document.body.classList.add('touch');
  });

  // Use tooltip fallback mode on IE < 11.
  if (bowser.msie && parseFloat(bowser.version) < 11) {
    document.body.classList.add('tooltip-fallback');
  }

  // Viewer options.
  var viewerOpts = {
    controls: {
      mouseViewMode: data.settings.mouseViewMode
    }
  };

  // Initialize viewer.
  var viewer = new Marzipano.Viewer(panoElement, viewerOpts);

  // Create scenes.
  var scenes = data.scenes.map(function(data) {
    var urlPrefix = "tiles";
    var source = Marzipano.ImageUrlSource.fromString(
      urlPrefix + "/" + data.id + "/{z}/{f}/{y}/{x}.jpg",
      { cubeMapPreviewUrl: urlPrefix + "/" + data.id + "/preview.jpg" });
    var geometry = new Marzipano.CubeGeometry(data.levels);

    var limiter = Marzipano.RectilinearView.limit.traditional(data.faceSize, 100*Math.PI/180, 120*Math.PI/180);
    var view = new Marzipano.RectilinearView(data.initialViewParameters, limiter);

    var scene = viewer.createScene({
      source: source,
      geometry: geometry,
      view: view,
      pinFirstLevel: true
    });

    // Create link hotspots.
    data.linkHotspots.forEach(function(hotspot) {
      var element = createLinkHotspotElement(hotspot);
      scene.hotspotContainer().createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
    });

    // Create info hotspots.
    data.infoHotspots.forEach(function(hotspot) {
      var element = createInfoHotspotElement(hotspot);
      scene.hotspotContainer().createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
    });

    return {
      data: data,
      scene: scene,
      view: view
    };
  });

  // Set up autorotate, if enabled.
  var autorotate = Marzipano.autorotate({
    yawSpeed: 0.03,
    targetPitch: 0,
    targetFov: Math.PI/2
  });

  if (screenfull.enabled && data.settings.fullscreenButton) {
    document.body.classList.add('fullscreen-enabled');
    fullscreenToggleElement.addEventListener('click', function() {
      screenfull.toggle();
    });
    screenfull.on('change', function() {
      if (screenfull.isFullscreen) {
        $('#fullscreen').css('background-image', 'url("img/common_UI/fullscreen_icon_close.png")');
        fullscreenToggleElement.classList.add('enabled');
      } else {
        $('#fullscreen').css('background-image', 'url("img/common_UI/fullscreen_icon.png")')
        fullscreenToggleElement.classList.remove('enabled');
      }
    });
  } else {
    document.body.classList.add('fullscreen-disabled');
  }

  // DOM elements for view controls.
  var viewUpElement = document.querySelector('#up-key');
  var viewDownElement = document.querySelector('#down-key');
  var viewLeftElement = document.querySelector('#left-key');
  var viewRightElement = document.querySelector('#right-key');
  var viewInElement = document.querySelector('#zoom-in');
  var viewOutElement = document.querySelector('#zoom-out');

  // Dynamic parameters for controls.
  var velocity = 0.7;
  var friction = 3;

  var directionV = 0.2;

  // Associate view controls with elements.
  var controls = viewer.controls();
  // controls.registerMethod('upElement',    new Marzipano.ElementPressControlMethod(viewUpElement,     'y', -directionV, friction), true);
  // controls.registerMethod('downElement',  new Marzipano.ElementPressControlMethod(viewDownElement,   'y',  directionV, friction), true);
  // controls.registerMethod('leftElement',  new Marzipano.ElementPressControlMethod(viewLeftElement,   'x', -directionV, friction), true);
  // controls.registerMethod('rightElement', new Marzipano.ElementPressControlMethod(viewRightElement,  'x',  directionV, friction), true);
  controls.registerMethod('inElement',    new Marzipano.ElementPressControlMethod(viewInElement,  'zoom', -velocity, friction), true);
  controls.registerMethod('outElement',   new Marzipano.ElementPressControlMethod(viewOutElement, 'zoom',  velocity, friction), true);

  function sanitize(s) {
    return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;');
  }

  function switchScene(scene) {
    startAutorotate();
    scene.view.setParameters(scene.data.initialViewParameters);
    scene.scene.switchTo();
    // startAutorotate();
    updateSceneName(scene);
    // updateSceneList(scene);
  }

  function updateSceneName(scene) {    
    $('#scene-name').html(scene.data.name);
    $('#scene-description').html(scene.data.description);

    $('#info-popup-title').html(scene.data.name);
    $('#info-popup-details').html(`<p>${scene.data.description}</p>`);
    $('#info-popup-details .italic-light').attr('class', "italic");
    
  }

  function updateSceneList(scene) {
    for (var i = 0; i < sceneElements.length; i++) {
      var el = sceneElements[i];
      if (el.getAttribute('data-id') === scene.data.id) {
        el.classList.add('current');
      } else {
        el.classList.remove('current');
      }
    }
  }

  function updateSceneTarget(){
    // Set handler for scene switch.
    scenes.forEach(function(scene) {
      var el = document.querySelector('#sceneList .scene[data-id="' + scene.data.id + '"]');
      el.addEventListener('click', function() {
        switchScene(scene);
        // On mobile, hide scene list after selecting a scene.
        if (document.body.classList.contains('mobile')) {
          hideSceneList();
        }
      });
    });
  }

  function hideSceneList() {
    sceneListElement.classList.remove('enabled');
    sceneListToggleElement.classList.remove('enabled');
  }

  function toggleSceneList() {
    sceneListElement.classList.toggle('enabled');
    sceneListToggleElement.classList.toggle('enabled');
  }


  function startAutorotate() {
    // if (!autorotateToggleElement.classList.contains('enabled')) {
    //   return;
    // }
    viewer.startMovement(autorotate);
    viewer.setIdleMovement(3000, autorotate);
  }

  function stopAutorotate() {
    viewer.stopMovement();
    viewer.setIdleMovement(Infinity);
  }

  function createLinkHotspotElement(hotspot) {

    // Create wrapper element to hold icon and tooltip.
    var wrapper = document.createElement('div');
    wrapper.classList.add('hotspot');
    wrapper.classList.add('link-hotspot');

    // Create image element.
    var icon = document.createElement('img');
    icon.src = 'img/link.png';
    icon.classList.add('link-hotspot-icon');

    // Set rotation transform.
    var transformProperties = [ '-ms-transform', '-webkit-transform', 'transform' ];
    for (var i = 0; i < transformProperties.length; i++) {
      var property = transformProperties[i];
      icon.style[property] = 'rotate(' + hotspot.rotation + 'rad)';
    }

    // Add click event handler.
    wrapper.addEventListener('click', function() {
      switchScene(findSceneById(hotspot.target));
    });

    // Prevent touch and scroll events from reaching the parent element.
    // This prevents the view control logic from interfering with the hotspot.
    stopTouchAndScrollEventPropagation(wrapper);

    // Create tooltip element.
    var tooltip = document.createElement('div');
    tooltip.classList.add('hotspot-tooltip');
    tooltip.classList.add('link-hotspot-tooltip');
    tooltip.innerHTML = findSceneDataById(hotspot.target).name;

    wrapper.appendChild(icon);
    wrapper.appendChild(tooltip);

    return wrapper;
  }

  function createInfoHotspotElement(hotspot) {

    // Create wrapper element to hold icon and tooltip.
    var wrapper = document.createElement('div');
    wrapper.classList.add('hotspot');
    wrapper.classList.add('info-hotspot');

    var icon = document.createElement('img');
    icon.src = 'img/common_UI/view_icon.png';
    icon.style.cursor = 'pointer';

    // Hover changes
    icon.classList.add('info-icon');

    wrapper.addEventListener('click', function(){
      switch(hotspot.type){
        case 'text':
          textPopupWindow(hotspot);
          break;

        case 'image':
          imagePopupWindow(hotspot);
          break;

        case 'video':
          videoPopupWindow(hotspot);
          break;

        case 'multi':
          multiPopupWindow(hotspot);
          break;

      }
    })

    // Place header and text into wrapper element.
    // wrapper.appendChild(header);
    wrapper.appendChild(icon);

    // Create a modal for the hotspot content to appear on mobile mode.
    var modal = document.createElement('div');
    modal.innerHTML = wrapper.innerHTML;
    modal.classList.add('info-hotspot-modal');
    document.body.appendChild(modal);

    var toggle = function() {
      wrapper.classList.toggle('visible');
      modal.classList.toggle('visible');
    };

    // Prevent touch and scroll events from reaching the parent element.
    // This prevents the view control logic from interfering with the hotspot.
    stopTouchAndScrollEventPropagation(wrapper);

    return wrapper;
  }

  function textPopupWindow(hotspot){
    
    stopAutorotate();

    $('#text-popup-title').html(hotspot.title);
    $('#text-popup-text').html(hotspot.text);

    $('#popup-overlay').fadeIn(500);
    $('#text-popup-container').fadeIn(500);

  }

  function imagePopupWindow(hotspot){
    stopAutorotate();

    let hotspotUrl = hotspot.imageSrc; 

    $('#image-popup-title').html(hotspot.title);
    $('#image-popup-description').html(hotspot.text);
    $('.image-display').attr('src', hotspot.imageSrc);

    if(hotspotUrl == "img/hotspot-img/field/7 Field Op 1.jpg"){
      // Check if mobile or tablet
      if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        $('#image-popup-image').css('width', '55vh');
      }else{
        $('#image-popup-image').css('width', '60vh');
      }      
    }else if(hotspotUrl == "img/hotspot-img/field/7 Field Op 2.jpg"){
      // Check if mobile or tablet
      if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        $('#image-popup-image').css('width', '45vh');
      }else{
        $('#image-popup-image').css('width', '50vh');
      } 
    }else if(hotspotUrl == "img/hotspot-img/larvaeRoom/larvae_1.jpg"){
      // Check if mobile or tablet
      if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        $('#image-popup-image').css('width', '45vh');
      }else{
        $('#image-popup-image').css('width', '55vh');
      } 
    }else{
      $('#image-popup-image').css('width', '60%');
    }

    $('.image-display').on('click', function(){
      $('#fullscreen-container').html(`<img src="${$(this)[0].src}">`)
      $('#fullscreen-container').fadeIn(500);
    });

    $('#fullscreen-container').on('click', function(){
      $('#fullscreen-container').fadeOut(500);
    });

    $('#popup-overlay').fadeIn(500);
    $('#image-popup-container').fadeIn(500);
  }

  function videoPopupWindow(hotspot){
    
    stopAutorotate();

    if(hotspot.videoSrc == 'video/Nea Wolbachia X Raytreatment V2.m4v'){
      $('#video-container').css('width', '60%');
      $('#video-popup-details').css('width', '40%');
    }else{
      $('#video-container').css('width', '70%');
      $('#video-popup-details').css('width', '30%');
    }


    $('#video-container').html(`
        <video playsinline controls crossorigin data-poster="${hotspot.videoThumbnail}" id="player">
          <source src="${hotspot.videoSrc}" type="video/mp4">
        </video>
    `)

    // $('#video-container video').attr('poster', hotspot.videoThumbnail);
    // $('#video-container source').attr('src', hotspot.videoSrc);
    // $('#video-container video').get(0).load();
    $('#video-popup-title').html(hotspot.title);
    $('#video-popup-description').html(hotspot.text);

    // console.log($('#video-container video').attr('poster'));

    $('#popup-overlay').fadeIn(500);
    $('#video-popup-container').fadeIn(500);

    // plyr
    const player = new Plyr("#player");

  }

  var swiperPopup;

  function multiPopupWindow(hotspot){

    stopAutorotate();

    $('.popup-swiper-wrapper').html('');

    $.each(hotspot.multiSrc, (i, val) => {
      $('.popup-swiper-wrapper').append(`<div class="swiper-slide popup-swiper-slide" style="background-image: url('${val}');"></div>`);
    })

    setTimeout(function(){
      if(typeof swiperPopup == 'undefined'){
        console.log('fire!');
        swiperPopup = new Swiper('.popup-swiper', {
          grabCursor: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
        });

        $('#multi-image-popup-container .swiper-pagination').css('text-align', 'center');
        $('.swiper-pagination-bullets').css('right', '0%');
        $('.swiper-pagination-bullets').css('top', '93%');
        
        $('#multi-image-popup-title').html(hotspot.title1);
        $('#multi-image-popup-description').html(hotspot.text1);
      }else{
        console.log(swiperPopup.activeIndex);
        if(swiperPopup.activeIndex == 0){
          $('#multi-image-popup-description').html(hotspot.text1);
          $('#multi-image-popup-title').html(hotspot.title1);
        }else if(swiperPopup.activeIndex == 1){
          $('#multi-image-popup-description').html(hotspot.text2);
          $('#multi-image-popup-title').html(hotspot.title2);
        }else if(swiperPopup.activeIndex == 2){
          $('#multi-image-popup-description').html(hotspot.text3);
          $('#multi-image-popup-title').html(hotspot.title3);
        }else if(swiperPopup.activeIndex == 3){
          $('#multi-image-popup-description').html(hotspot.text4);
          $('#multi-image-popup-title').html(hotspot.title4);
        }else if(swiperPopup.activeIndex == 4){
          $('#multi-image-popup-description').html(hotspot.text5);
          $('#multi-image-popup-title').html(hotspot.title5);
        }
      }
      
      swiperPopup.on('touchEnd', function(){
        setTimeout(function(){
          if(swiperPopup.activeIndex == 0){
            // first slide
            $('#multi-image-popup-description').html(hotspot.text1);
            $('#multi-image-popup-title').html(hotspot.title1);
          }else if(swiperPopup.activeIndex == 1){
            $('#multi-image-popup-description').html(hotspot.text2);
            $('#multi-image-popup-title').html(hotspot.title2);
          }else if(swiperPopup.activeIndex == 2){
            $('#multi-image-popup-description').html(hotspot.text3);
            $('#multi-image-popup-title').html(hotspot.title3);
          }else if(swiperPopup.activeIndex == 3){
            $('#multi-image-popup-description').html(hotspot.text4);
            $('#multi-image-popup-title').html(hotspot.title4);
          }else if(swiperPopup.activeIndex == 4){
            $('#multi-image-popup-description').html(hotspot.text5);
            $('#multi-image-popup-title').html(hotspot.title5);
          }
        }, 50);
      });

      
      
    });

    

    $('#popup-overlay').fadeIn(500);
    $('#multi-image-popup-container').fadeIn(500);
  }

  // Prevent touch and scroll events from reaching the parent element.
  function stopTouchAndScrollEventPropagation(element, eventList) {
    var eventList = [ 'touchstart', 'touchmove', 'touchend', 'touchcancel',
                      'wheel', 'mousewheel' ];
    for (var i = 0; i < eventList.length; i++) {
      element.addEventListener(eventList[i], function(event) {
        event.stopPropagation();
      });
    }
  }

  function findSceneById(id) {
    for (var i = 0; i < scenes.length; i++) {
      if (scenes[i].data.id === id) {
        return scenes[i];
      }
    }
    return null;
  }

  function findSceneDataById(id) {
    for (var i = 0; i < data.scenes.length; i++) {
      if (data.scenes[i].id === id) {
        return data.scenes[i];
      }
    }
    return null;
  }

  // create Audio element for BG music
  let audioElem = document.createElement('audio');
  audioElem.src = 'audio/BG/NEA_360_BG_Audio.mp3';
  audioElem.volume = 0.1;

  function BGMusicPlayPause(){
    if(document.querySelector('#sound').style.backgroundImage.endsWith('img/common_UI/mute_icon.png")')){
      audioElem.pause();
    }else{
      audioElem.play();
    }
  }

  $(document).ready(function(){

    //check if safari is used as a browser (necessary because css property gap is not registered in safari)
    var ua = navigator.userAgent.toLowerCase(); 
    if (ua.indexOf('safari') != -1) { 
      if (ua.indexOf('chrome') > -1) {
        // Chrome
        $('.popup-swiper').css('width', '60%');
        $('#multi-image-popup-details').css('width', '40%');
      } else {
        // Safari
        $('.popup-swiper').css('width', '60%');
        $('#multi-image-popup-details').css('width', '40%');
      }
    }

    // $('.popup-swiper-wrapper').draggable();

    // $('.popup-swiper-wrapper').bind('dragstop', function(){
    //   console.log(swiperPopup.activeIndex);
    // })

    // Check if mobile or tablet
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      $('#info-popup-container').css('height', '80vh');
     }

    $('#sound').on('click', function(){
      if(audioElem.paused){
        // if music paused
        audioElem.play();

        // change background-image of sound icon
        $('#sound').css('background-image', 'url("/img/common_UI/unmute_icon.png")');

      }else{
        // if music playing
        audioElem.pause();

        // change background-image of sound icon
        $('#sound').css('background-image', 'url("img/common_UI/mute_icon.png")');
      }
    });

    // Loop the background-music
    audioElem.addEventListener('ended', function(){
      audioElem.currentTime = 0;
      audioElem.play();
    })

    // Back to corridor notce animation
    $('.back-to-corridor').hover(function(){
      $('#back-to-corridor-notice').css('animation', 'bouncing-effect-in 1s ease-out forwards');
    }, function(){
      $('#back-to-corridor-notice').css('animation', 'bouncing-effect-out 0.8s ease forwards');
    });

    $('.back-to-corridor').on('click', function(){

      // hide popup of xray room when back to corridor
      $('#xray-popup-overlay').hide();
      $('#xray-video-container').hide();
      $('#xray-popup-container').hide();

      $('#xray-player').get(0).pause();

      // change the image of sound icon to unmute when back
      $('#sound').css('background-image', 'url("/img/common_UI/unmute_icon.png")');
      
      $('#corridor-page').show();
      audioElem.pause();
    })

    // close popup function
    $('#popup-overlay').on('click', () => {
      $('#popup-overlay').fadeOut(500);
      $('.popup-windows').fadeOut(500);
      $('video').get(0).pause();
      $('.popup-swiper-wrapper').html('');
      setTimeout(function(){
        startAutorotate();
      }, 1000);
    });

    $('.close-btn').on('click', () => {
      $('#popup-overlay').fadeOut(500);
      $('.popup-windows').fadeOut(500);
      $('video').get(0).pause();
      $('.popup-swiper-wrapper').html('');
      setTimeout(function(){
        startAutorotate();
      }, 1000);
    });

    // info popup function
    $('#info').on('click', () => {
      stopAutorotate();
      $('#popup-overlay').fadeIn(500);
      $('#info-popup-container').fadeIn(500);
    });


    // // plyr
    // const player = new Plyr("#player");

    // $('#video-container').on('click', function() {
    //   if(!$('#player').get(0).paused){
    //     // If video is playing
    //     audioElem.pause();
    //   }else{
    //     // If video is paused
    //     BGMusicPlayPause();
    //   }
    // })

    function chgNextBtnToReturnHome(){
      $('.next-btn').css('background-image', 'url("img/common_UI/field_return_to_home.png")');
      $('.next-btn').hover(function(){
        $('.next-btn').css('background-image', 'url("img/common_UI/field_return_to_home_onHover.png")');
      }, function(){
        $('.next-btn').css('background-image', 'url("img/common_UI/field_return_to_home.png")');
      })
    }

    function chgReturnHomeBtnToNext(){
      $('.next-btn').css('background-image', 'url("img/common_UI/next_room.png")');
      $('.next-btn').hover(function(){
        $('.next-btn').css('background-image', 'url("img/common_UI/next_room_hover.png")');
      }, function(){
        $('.next-btn').css('background-image', 'url("img/common_UI/next_room.png")');
      })
    }

    let room_id;
    let room_num = 0;

    let swiperElem = $('.swiper-slide-corridor');
  
    swiperElem.on('click', function(){

      $('#pano').css('opacity', '1');
      $('#static-bar').css('opacity', '1');

      audioElem.play();

      $('#corridor-page').hide();

      room_id = $(this).attr('id');
      switch(room_id){
          case 'adultRoom':
              room_num = 0;
              chgReturnHomeBtnToNext();
              switchScene(scenes[room_num]);
              break;
          case 'larvaeRoom':
              room_num = 1;
              chgReturnHomeBtnToNext();
              switchScene(scenes[room_num]);
              break;
          case 'sorterRoom':
              room_num = 2;
              chgReturnHomeBtnToNext();
              switchScene(scenes[room_num]);
              break;
          case 'emergenceRoom':
              room_num = 3;
              switchScene(scenes[room_num]);
              chgReturnHomeBtnToNext();
              break;
          case 'qualityControlRoom':
              room_num = 4;
              switchScene(scenes[room_num]);
              chgReturnHomeBtnToNext();
              break;
          case 'field':
              room_num = 5;
              switchScene(scenes[room_num]);
              chgNextBtnToReturnHome();
              break;
      }
      
    })
    
    
    // Next scene
    $('.next-btn').on('click', function(){
      if(room_num == 0){
        switchScene(scenes[1]);
        room_num = 1;
      }else if(room_num == 1){
        switchScene(scenes[2]);
        room_num = 2;
      }else if(room_num == 2){
        switchScene(scenes[3]);
        room_num = 3;
      }else if(room_num == 3){
        // BGMusicPlayPause();
        switchScene(scenes[4]);
        room_num = 4;
      }else if(room_num == 4){
        // switchScene(scenes[4]);
        
        $('.next-btn').css('background-image', 'url("img/common_UI/field_return_to_home_onHover.png")');
        $('.next-btn').hover(function(){
          $('.next-btn').css('background-image', 'url("img/common_UI/field_return_to_home_onHover.png")');
        }, function(){
          $('.next-btn').css('background-image', 'url("img/common_UI/field_return_to_home.png")');
        })
        
        switchScene(scenes[5]);
        
        room_num = 5;
      }else if(room_num == 5){
        window.location.href = "/index.html";
        room_num = 0;
      }
    });

    $('#back-to-home').on('click', function(){
        window.location.href = '/index.html';
    });

    const xray_player = new Plyr('#xray-player');

    // continue button in xray room
    $('#continue-btn').on('click', function(){

      $('.xray-image-display').hide();
      $('#xray-player').show();
      $('#xray-player').get(0).play();
      $('#xray-popup-description').html('Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni mollitia, tempora saepe asperiores blanditiis ullam.');
      $('#continue-btn').hide();
    });

    // Resize corridor page
    resizeBackground();
    $(window).resize(resizeBackground);

    $('#back-to-home').on('click', function() {
        top.window.location.href = 'index.html';
    });
    
    // Add touchRatio to disable drag
    // Swiper for corridor 
    var swiper = new Swiper('.swiper-container-corridor', {
      grabCursor: true,
      pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });

    // swiper.on('progress', function(){
    //   if(swiper.activeIndex == 2){
    //     $('.swiper-slide:last-child').css('justify-content', 'left');
    //   }
    // })

    // $(document).on('click', '.swiper-button-next', function(){
    //   if(swiper.activeIndex == 3){
    //     $('.swiper-slide:last-child').css('justify-content', 'left');
    //   }else{
    //     $('.swiper-slide').css('justify-content', 'center');
    //   }
    // })

    // $(document).on('click', '.swiper-button-prev', function(){
    //   if(swiper.activeIndex == 3){
    //     $('.swiper-slide').css('justify-content', 'left');
    //   }else{
    //     $('.swiper-slide').css('justify-content', 'center');
    //   }
    // })

    function resizeBackground() {
      // $("#pop_up_container").width(($(window).height() / 0.9) * 1.6);

      if ($(window).width() < ($(window).height() / 0.9) * 1.6) {
          $("#item_container").width("100%");
          // $(body).width("100%");
      } else {
          $("#item_container").width(($(window).height() / 0.9) * 1.6);
          // $(body).width(($(window).height() / 0.9) * 1.6);
      }

      // if ($("#item_container").width() + 1 < $(window).height() * 1.778) {
      //     $("#item_container").css("top", ((($(window).width() * -1.778) + 2800) * 0.16) - ($(window).height() - 895) * -0.5);
      // } else {
      //     $("#item_container").css("top", 0);
      // }

      var corridor_leftContainer_height = $("#text-details").height();
      var corridor_rightContainer_height = $("#corridor_sliderContainer").height();
      var corridor_viewportFitPERC_reference = $(window).height();
      var corridor_viewportFitVH_reference = $("#reference_vh").height();
      var corridor_containerViewport_heightGap;


      corridor_containerViewport_heightGap = ((corridor_viewportFitPERC_reference/corridor_viewportFitVH_reference) * 1) ;
      $("#text-container").css("transform","scale( " + corridor_containerViewport_heightGap + " )");
      if(corridor_containerViewport_heightGap == 1){
        $(".swiper-container-corridor").css("transform","translateY(-50%) scale( " + corridor_containerViewport_heightGap + " )");
      } else if(corridor_containerViewport_heightGap < 1){
        $(".swiper-container-corridor").css("transform","translateY(-50%) scale( " + (corridor_containerViewport_heightGap) + " )");
      }

      console.log(corridor_containerViewport_heightGap);
      // $("#version-number").html(corridor_containerViewport_heightGap);
  }
  });

  // Display the initial scene.
  switchScene(scenes[0]);

})();
