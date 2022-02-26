var APP_DATA = {
  "scenes": [
    {
      "id": "0-adult_room",
      "name": "Adult Room",
      "description": `Adult male and female <span class='italic-light'>Wolbachia-Aedes</span> mosquitoes 
                      are reared to produce large number of eggs.`,
     "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 2000,
      "initialViewParameters": {
        "yaw": -2.9830454216947473,
        "pitch": 0.049378831107418364,
        "fov": 1.3687812585745385
      },
      "linkHotspots": [],
      "infoHotspots": [
        // {
        //   "yaw": 3.7806552456740863,
        //   "pitch": 0.15,
        //   "type": "text",
        //   "title": "Understanding NEA",
        //   "text": `<p>
        //             Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sapiente fuga iusto voluptate autem ducimus, quas ipsum labore esse ea iure saepe mollitia odio amet molestias accusantium laborum sequi quis temporibus. Maxime, delectus reprehenderit rerum similique incidunt perferendis sequi eius!
        //           </p>
            
        //           <p>
        //             Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sapiente fuga iusto voluptate autem ducimus, quas ipsum labore esse ea iure saepe mollitia odio amet molestias accusantium laborum sequi quis temporibus. Maxime, delectus reprehenderit rerum similique incidunt perferendis sequi eius!
        //           </p>
            
        //           <p>
        //             Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sapiente fuga iusto voluptate autem ducimus, quas ipsum labore esse ea iure saepe mollitia odio amet molestias accusantium laborum sequi quis temporibus. Maxime, delectus reprehenderit rerum similique incidunt perferendis sequi eius!
        //           </p>`
        // },
        {
          "yaw": -0.64006552456740863,
          "pitch": 0.1,
          "type": "video",
          "videoSrc": "video/Life Cycle Short-AR1.m4v",
          "videoThumbnail": "img/video-thumbnail/AR-1.jpg",
          // "title": "Lorem ipsum dolor sit",
          "text": `<p>When submerged in water, <span class="italic">Aedes aegypti</span> mosquito eggs hatch into larvae within one to two days. Over the next four to five days, the larvae develop into pupae, moulting four times in the process. After one to two days in the pupal stage, an adult mosquito emerges. In nature, adults typically survive for two to three weeks.</p>`
        },
        {
          "yaw": 3.7806552456740863,
          "pitch": 0.15,
          "type": "video",
          "videoThumbnail": "img/video-thumbnail/AR-2.jpg",
          "videoSrc": "video/Mating And Egg Laying-AR2.m4v",
          // "title": "Lorem ipsum dolor sit",
          "text": `<p>Egg production is the first step. Male and female <span class="italic">Wolbachia-Aedes</span> mosquitoes are allowed to mate in netted cages. After mating, each female mosquito can lay up to 300 eggs in her lifetime. Each egg is about the size of a full stop.</p>
          <p>In our facility, female <span class="italic">Wolbachia-Aedes</span> mosquitoes lay eggs on strips of moist germination paper placed in ovipots. The egg-containing paper strips are then dried and stored for use in subsequent hatching. <span class="italic">Aedes</span> mosquito eggs can survive in this dry state for several months.</p>`
        },
        {
          "yaw": -0.2106552456740863,
          "pitch": 0.087,
          "type": "video",
          "videoSrc": "video/Nea Wolbachia Mosquitoes Feed V2.m4v",
          // "title": "Lorem ipsum dolor sit",
          "text": `<p>Male mosquitoes do not bite and cannot transmit disease. They feed only on plant juices, such as nectar, to get the sugar they need for energy and survival. In the facility, male mosquitoes are fed with sugar solution.</p>
          <p>Female mosquitoes, on the other hand, need protein from blood to develop their eggs. In nature, females seek out and bite hosts such as humans to obtain blood, and may transmit disease in the process.</p>`
        }
      ]
    },
    {
      "id": "3-larvae_room",
      "name": "Larvae Room",
      "description": `Mosquito eggs are hatched and <span class='italic-light'>Wolbachia-Aedes</span> larvae are reared 
                      to the pupae stage under controlled environmental conditions.`,
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 2000,
      "initialViewParameters": {
        "yaw": 0,
        "pitch": 0,
        "fov": 1.3687812585745385
      },
      "linkHotspots": [],
      "infoHotspots": [
        {
          "yaw": 3.2106552456740863,
          "pitch": 0.08,
          "type": "video",
          "videoSrc": "video/Nea Wolbachia Multichannel V2.m4v",
          // "title": "Lorem ipsum dolor sit",
          "text": `<p>Our mosquito larvae are fed with fish food. A multi-layer automated feeding system has been developed to automatically deliver a fixed amount of feed into multiple rearing trays simultaneously.</p>`
        },
        {
          "yaw": -1.1806552456740863,
          "pitch": -0.05,
          "type": "image",
          "imageSrc": "img/hotspot-img/larvaeRoom/Water recycling system.jpg",
          // "title": "Lorem ipsum dolor sit",
          "text": `<p>Rearing larvae requires large volumes of water. To keep our operations environmentally friendly and sustainable, most of the wastewater from rearing is cleaned using a reverse osmosis system and recycled. This recycling system yields a wastewater recovery rate of 50 to 70%.</p>`
        },
        {
          "yaw": 1.4406552456740863,
          "pitch": 0.08,
          "type": "video",
          "videoSrc": "video/High Density Rack-LR3.m4v",
          // "title": "Lorem ipsum dolor sit",
          "text": `<p>Trays of mosquito larvae are stacked in our high-density rearing racks. Besides maximising the use of space, these racks also improve efficiency by allowing for simultaneous water dispensing, speeding up the pre-rearing process by 20 times compared to manual handling of individual trays.</p>
          <p>After six days, pupae are ready to be harvested. The racks also allow for automated and simultaneous harvesting, which is 40 times faster than manual harvesting from individual trays.</p>`
        },
        {
          "yaw": 1.7906552456740863,
          "pitch": 0.1,
          "type": "video",
          "videoThumbnail": "img/video-thumbnail/LR-4.jpg",
          "videoSrc": "video/Larvae Counter-LR4.m4v",
          // "title": "Lorem ipsum dolor sit",
          "text": `<p>After hatching, larvae are placed into rearing trays. We developed an automated larvae counter to accurately dispense a fixed and equal number of larvae into each tray. This is important to ensure optimal and consistent rearing. The larvae counter is 40 times faster than manual counting, and more accurate than methods that use egg weight to estimate mosquito numbers.</p>`
        },       
      ]
    },
    {
      "id": "5-sorter_room",
      "name": "Sorting Room",
      "description": `Male pupae are smaller than female pupae and can be sorted by size. 
                      Sorting is done with very high accuracy, leaving only very few females.`,
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 2000,
      "initialViewParameters": {
        "yaw": 0,
        "pitch": 0,
        "fov": 1.3687812585745385
      },
      "linkHotspots": [],
      "infoHotspots": [
        {
          "yaw": 0.3406552456740863,
          "pitch": 0,
          "type": "video",
          "videoSrc": "video/Nea Wolbachia Faymorlanglass V2.m4v",
          // "title": "Lorem ipsum dolor sit",
          "text": `<p>Project <span class="italic">Wolbachia</span> involves the release of non-biting male <span class="italic">Wolbachia-Aedes</span> mosquitoes. Sorting of males from females can be done by size at the pupal stage, as male mosquito pupae are smaller than females.</p>
          <p>Pupae are passed through the Fay-Morlan glass plate separator. The space between the glass plates is adjusted to yield separate layers of male and female pupae based on body size.</p>`
        },
        {
          "yaw": -4.3406552456740863,
          "pitch": 0.06,
          "type": "video",
          "videoSrc": "video/Nea Wolbachia Automatedpupae V2.m4v",
          // "title": "Lorem ipsum dolor sit",
          "text": `<p>The male-female pupae sorter, developed in-house, automates the sorting of male and female <span class="italic">Wolbachia-Aedes</span> pupae. This sorter is 10 to 20 times faster than the manual Fay-Morlan method.</p>`
        },
        {
          "yaw": -3.5406552456740863,
          "pitch": -0.05,
          "type": "video",
          "videoSrc": "video/Nea Wolbachia X Raytreatment V2.m4v",
          // "title": "Lorem ipsum dolor sit",
          "text": `<p>Our stringent quality control checks ensure that sorting is done with high accuracy. However, as sorting is not 100% accurate, a very small number of female pupae remain among the males and will eventually be released. While the risk of increased biting or disease transmission is negligible, releases of small numbers of fertile female <span class="italic">Wolbachia-Aedes</span> mosquitoes may result in the establishment of <span class="italic">Wolbachia</span> in the urban <span class="italic">Aedes aegypti</span> mosquito population. This would reduce the effectiveness of the <span class="italic">Wolbachia-Aedes</span> suppression strategy, which relies on incompatible matings between <span class="italic">Wolbachia</span>-carrying males and urban non-<span class="italic">Wolbachia</span>-carrying females.</p>
                  <p>To ensure that residual <span class="italic">Wolbachia-Aedes</span> females do not reproduce in the field, we sterilise them by treating the sorted pupae with a low dose of X-rays. This step preserves the effectiveness of the <span class="italic">Wolbachia-Aedes</span> suppression strategy.</p>`
        },
        // {
        //   "yaw": 0.4406552456740863,
        //   "pitch": 0,
        //   "type": "image",
        //   "imageSrc": "img/hotspot-img/sorterRoom/sorter.jpg",
        //   "title": "Lorem ipsum dolor sit",
        //   "text": `<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero laborum numquam dignissimos excepturi modi incidunt alias dolores accusantium reprehenderit aperiam?</p>
        //   <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero laborum numquam dignissimos excepturi modi incidunt alias dolores accusantium reprehenderit aperiam?</p>
        //   <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero laborum numquam dignissimos excepturi modi incidunt alias dolores accusantium reprehenderit aperiam?</p>`
        // }
      ]
    },
    {
      "id": "1-emergence_room",
      "name": "Emergence Room",
      "description": `Irradiated pupae are packed into containers and allowed to emerge 
                      into adult <span class='italic-light'>Wolbachia-Aedes</span> mosquitoes for release in the field.`,
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 2000,
      "initialViewParameters": {
        "yaw": 0,
        "pitch": 0,
        "fov": 1.3687812585745385
      },
      "linkHotspots": [],
      "infoHotspots": [
        // {
        //   "yaw": 2.0406552456740863,
        //   "pitch": 0,
        //   "type": "image",
        //   "imageSrc": "img/hotspot-img/emergenceRoom/5 Mosquito Emergence.jpg",
        //   "title": "Lorem ipsum dolor sit",
        //   "text": `<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero laborum numquam dignissimos excepturi modi incidunt alias dolores accusantium reprehenderit aperiam?</p>
        //   <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero laborum numquam dignissimos excepturi modi incidunt alias dolores accusantium reprehenderit aperiam?</p>
        //   <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero laborum numquam dignissimos excepturi modi incidunt alias dolores accusantium reprehenderit aperiam?</p>`
        // },
        // {
        //   "yaw": 3.1406552456740863,
        //   "pitch": 0,
        //   "type": "image",
        //   "imageSrc": "img/hotspot-img/emergenceRoom/Screenshot 2021-02-17 11.56.40.jpg",
        //   "title": "Lorem ipsum dolor sit",
        //   "text": `<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero laborum numquam dignissimos excepturi modi incidunt alias dolores accusantium reprehenderit aperiam?</p>
        //   <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero laborum numquam dignissimos excepturi modi incidunt alias dolores accusantium reprehenderit aperiam?</p>
        //   <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero laborum numquam dignissimos excepturi modi incidunt alias dolores accusantium reprehenderit aperiam?</p>`
        // },
        {
          "yaw": -3.7960052456740863,
          "pitch": 0.24,
          "type": "video",
          "videoSrc": "video/Nea Wolbachia Packingpupae V2.m4v",
          // "title": "Lorem ipsum dolor sit",
          "text": `<p>Pupae are next packed into our release devices, known as mosquito launchers. A pupae counting and dispensing module accurately dispenses the desired number of male <span class="italic">Wolbachia-Aedes</span> pupae into each mosquito launcher. Pupae emerge as adult males after one to two days.</p>`
        }
      ]
    },
    {
      "id": "4-quality_control_room",
      "name": "Quality Control Room",
      "description": `Regular laboratory testing is conducted to ensure that the male 
                      <span class='italic-light'>Wolbachia-Aedes</span> mosquitoes we release continue to carry <span class='italic-light'>Wolbachia<span>.`,
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 2000,
      "initialViewParameters": {
        "yaw": 0,
        "pitch": 0,
        "fov": 1.3687812585745385
      },
      "linkHotspots": [],
      "infoHotspots": [
        {
          "yaw": -0.9206552456740863,
          "pitch": 0.04,
          "type": "video",
          "videoSrc": "video/Real Time Pcr-QCR1.m4v",
          // "title": "Lorem ipsum dolor sit",
          "text": `<p>Regular quality control checks are carried out to make sure that the released male mosquitoes continue to carry <span class="italic">Wolbachia</span> bacteria. A laboratory technique called Polymerase Chain Reaction (PCR) is used to make many copies of a gene sequence unique to <span class="italic">Wolbachia</span>. If the <span class="italic">Wolbachia</span> is present in male mosquitoes, the technique will produce many copies of the DNA carrying the gene sequence. This amplification lets us confirm the presence of <span class="italic">Wolbachia</span> in our mosquitoes.</p>`
        },
        {
          "yaw": 4.5606552456740863,
          "pitch": 0.16,
          "type": "multi",
          "multiSrc": ["img/hotspot-img/qualityControlRoom/Intro Image.jpg","img/hotspot-img/qualityControlRoom/aedes.jpg", "img/hotspot-img/qualityControlRoom/culex.jpg", "img/hotspot-img/qualityControlRoom/anopheles.jpg", "img/hotspot-img/qualityControlRoom/male and female-QCR-MultiImage1.jpg"],
          // "title1": "Lorem1 ipsum dolor sit",
          // "title2": "Lorem2 ipsum dolor sit",
          "text1": `<p>Mosquitoes collected from Gravitraps in the community are sent to our facility for identification. <span class="italic">Aedes</span>, <span class="italic">Culex</span>, and <span class="italic">Anopheles</span> mosquitoes are the three most common mosquito genera (groups) in Singapore.</p>
          <p>Click the buttons below the image or swipe left for more information on the common mosquitoes in Singapore.</p>
          `,
          "text2": `<p class="italic-bold">Aedes</p>
          <p>The two most common <span class="italic">Aedes</span> species in Singapore are <span class="italic">Aedes aegypti</span> and <span class="italic">Aedes albopictus</span>. The two species look similar, with black and white stripes on their bodies and legs. They can be differentiated by their scale patterns. <span class="italic">Aedes aegypti</span> has two white bands on its thorax (back) in the shape of a lyre, whereas <span class="italic">Aedes albopictus</span> has one white central band. Both species bite primarily during the day, but can also bite at night in well-lit areas. Both species can transmit dengue, although <span class="italic">Aedes albopictus</span> does so less efficiently than <span class="italic">Aedes aegypti</span>. Typical breeding habitats include artificial or natural water containers/bodies such as flower pots, clogged roof gutters, and household water storage containers. <span class="italic">Aedes albopictus</span> also breeds in areas with a lot of greenery, in natural habitats such as tree holes and dry leaves.</p>`,
          "text3": `<p class="italic-bold">Culex</p>
          <p>The most common <span class="italic">Culex</span> species in urban Singapore is <span class="italic">Culex quinquefasciatus</span>, a golden-brown mosquito with a dark proboscis. <span class="italic">Culex quinquefasciatus</span> bites during the night and is a vector of Japanese encephalitis and filariasis (not endemic in Singapore). Typical breeding habitats include blocked drains.</p>`,
          "text4": `<p class="italic-bold">Anopheles</p>
          <p>The most common <span class="italic">Anopheles</span> species in Singapore is <span class="italic">Anopheles sinensis</span>, a light brown mosquito with pale and dark scales on its legs, proboscis and wings. It bites during the night and is a vector of malaria (not endemic in Singapore). Typical breeding habitats include sunlit brackish pools with algae.</p>`,
          "text5": `<p>Using a microscope or magnifying glass, there are three ways to tell male mosquitoes apart from females:</p>
          <p>
          - Males are smaller than females<br>
          - Compared to males, females have a more needle-like proboscis, which they use for biting<br>
          - Males have bushy, hairy antennae, while the antennae of females are a lot less hairy</p>`
        },
      ]
    },
    {
      "id": "2-field",
      "name": "Field Release",
      "description": `Male <span class='italic-light'>Wolbachia-Aedes aegypti</span> mosquitoes are released into the 
                      community to suppress the urban dengue mosquito populations.`,
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 2000,
      "initialViewParameters": {
        "yaw": 0,
        "pitch": 0,
        "fov": 1.3687812585745385
      },
      "linkHotspots": [],
      "infoHotspots": [
        {
          "yaw": -0.6406552456740863,
          "pitch": -0.67,
          "type": "video",
          "videoSrc": "video/Mosquito Launcher-FR1.m4v",
          "videoThumbnail": "img/video-thumbnail/FR-1.jpg",
          // "title": "Lorem ipsum dolor sit",
          "text": `<p>Male <span class="italic">Wolbachia-Aedes</span> mosquitoes are released using the in-house-developed mosquito launcher – a lightweight and portable device that allows field officers to carry and release more mosquitoes in a single trip.</p>
          <p>When the released male <span class="italic">Wolbachia-Aedes</span> mosquitoes mate with urban female <span class="italic">Aedes aegypti</span> mosquitoes that do not carry <span class="italic">Wolbachia</span>, the resulting eggs do not hatch. Continued releases will suppress the urban <span class="italic">Aedes aegypti</span> mosquito population, and hence lower the risk of dengue transmission.</p>`
        },
        {
          "yaw": 3.1806552456740863,
          "pitch": -0.28,
          "type": "video",
          "videoSrc": "video/Gravitrap-FR2.m4v",
          // "title": "Lorem ipsum dolor sit",
          "text": `<p>The Gravitrap was developed by NEA to capture female mosquitoes looking for a place to lay their eggs. Deployed islandwide, Gravitraps yield valuable data on mosquito populations across Singapore, and provide spatial intelligence on problematic areas. In Project <span class="italic">Wolbachia</span> study sites, Gravitraps are also used to determine if releases of male <span class="italic">Wolbachia-Aedes</span> mosquitoes are effective at suppressing dengue mosquito populations.</p>`
        },
        
      ]
    }
    
  ],
  "name": "Project Title",
  "settings": {
    "mouseViewMode": "drag",
    "autorotateEnabled": true,
    "fullscreenButton": true,
    "viewControlButtons": false
  }
};
