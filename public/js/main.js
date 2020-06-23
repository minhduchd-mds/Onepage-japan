const main = {};
(function($){
    "use strict";
    $.fn.exists = function () {
        return this.length > 0;
    };
    main.goToTop = function () {
        const $goToTop = $('#back-to-top');
        $goToTop.on("click", function () {
            $('body,html').animate({scrollTop:0},1000);
            return false;
        });
    };
    main.load = function (){
        $('#loading').delay(100).fadeOut('slow');

    }
    main.counters = function () {
        // $('.timer').countTo();
    };
    main.rightBar = function (){
        $('.right-bar').hide();
        $('.more-details').hide();

        $('#setting').on('click',function (e) {
            $('.hoverlay').show();
            $('.right-bar').css({
                'left':'0',
                'display':'block'
            });
        });
        $('.right-bar-toggle').on('click',function (e) {
            e.preventDefault();
            $('#setting').removeClass('active');
            $('.hoverlay').hide();
            $('.right-bar').css({
                'left':'-270px',
                'display':'none'
            });
        });
        $('.rotate-vs').on('click', function (e) {
            $('.box-item').toggle(200);
        })

        $('#more-details').on('click',function (e) {
            $('.more-details').toggle();
            e.preventDefault();
        });

        $('.title-banner').click(function () {
            $('#menu').toggle(1000);
        });

        $('#dowload-app').click(function () {
            $('#dowload-app-android').toggle();
        });
        $('.close-app').click(function () {
            $('#dowload-app').hide();
        });
        setTimeout(function () {
            $('#dowload-app').show();
        },2000000);
        setTimeout(function () {
            $('#marketingModel').modal('toggle');
        },10000);
    };
    main.search =function(){

        $('#trigger-overlay').click(function () {
            $('#myOverlay').show();
            $('.closebtn').click(function () {
                $('#myOverlay').hide();
            })
        });
        $('.search-mobile').click(function (e) {
            $('#myOverlay').show();
            $('.closebtn').click(function () {
                $('#myOverlay').hide();
            });
            e.preventDefault();
        })
    };
    main.lang = function(){
        // language click
        $("select.country-lang").change(function(){
            const selectedCountry = $(this).children("option:selected").val();
            console.log(selectedCountry)
            if(selectedCountry !== 'en'){
                $.cookie('googtrans', '/ja/'+ selectedCountry);
                console.log(selectedCountry)
            }else if(selectedCountry !== 'ja'){
                // $.removeCookie('googtrans');
            }

        });
        function googleTranslateElementInit() {
            new google.translate.TranslateElement({pageLanguage: 'ja', layout: google.translate.TranslateElement.InlineLayout.SIMPLE}, 'google_translate_element');
        }
    };
    main.navhover = function(){
        $(".dropdown").hover(
            function () {
                $('.dropdown-menu', this).stop(true, true).slideDown("fast");
                $(this).toggleClass('open');
            },
            function () {
                $('.dropdown-menu', this).stop(true, true).slideUp("fast");
                $(this).toggleClass('open');
            }
        );

        $( ".dropdown.fade" ).hover(function() {
            $( this ).fadeOut( 100 );
            $( this ).fadeIn( 500 );
        });
        $(".edit-model-show").on('click', function (e) {
            $(".dropdown-menu").toggle();
        })
    };
    main.action = function(){
        $('#header .setting-mobiles-nav  .btn-group a, #header .setting-desktop-nav #navbarSupportedContent .navbar-nav li a').click(function () {
            $(this).addClass('active').siblings().removeClass('active');
            const toggle = $(this).attr('data-tab');
            $('.app section[aria-labelledby = '+toggle+']').addClass('active').siblings().removeClass('active');
        });
        $('.language-dost a').on('click',function () {
            const language = $(this).attr('data-language-icon');
            $(this).addClass('active').siblings().removeClass('active');
            $('.language-icon .icon-l[data-language-icon = '+language+']').addClass('active').siblings().removeClass('active');
            $('#language h3[data-language-icon = '+language+']').addClass('active').siblings().removeClass('active');
        })
        //
        $('#lettering .lettering-footer .btn-group button').click(function () {
            $(this).addClass('active').siblings().removeClass('active');
            const page = $(this).attr('data-page');
            $('#lettering div[id = '+page+']').addClass('active').siblings().removeClass('active');
        });

    };
    main.sliderC = function () {
        $('iframe.size-238').css('width','238px !important');
        $('body').find('#ModalView').find('.model-view-body .news-modal .news-modal-slider .news-modal-slider-item').find('img').each(function(i){
            const img = $(this).attr('src');
            if(typeof img !== 'undefined' && img !== 'null' && img === 'undefined'){
                $('body').find('#ModalView').find('.model-view-body .news-modal .news-modal-slider .news-modal-slider-item').find('img').addClass('active');
            }else {
                $('body').find('#ModalView').find('.model-view-body .news-modal .news-modal-slider .news-modal-slider-item').find('img').removeClass('active')
            }
        });
    };
    const auidoArray = [];
    const playList = [];
    main.audio = function(){

        const audio = $('.hiragnana').find('.audio').find('audio').attr('data-audio');

        $('.audio-play-auto').each(function () {
            auidoArray.push($(this).attr('data-audio'));
            nameArray.push($(this).attr('id'));
        });

        $('.hiragnana li a').click(function () {

            const active = $(this).attr('data-name');
            const audio = $('.hiragnana').find('.audio').find('audio').attr('data-audio');
            const play = $(this).attr('data-play');
            // lay ra danh sanh  audio
            for(const i in auidoArray){
                const sector = auidoArray[i];
                (function(sec){
                    if(active === sec){
                        $('a[data-name = '+active+']').addClass('play');
                        $('audio[data-audio = '+sec+']').addClass('play-auto'+sec).siblings().removeClass("play-auto" +sec);
                        $('.play-auto'+sec).get(0).play();
                    }
                }(sector))
            }
        });

        $('body').on('click', '.play-width > a', function () {
            const ac = $(this).attr('data-play-id');
            playList.push(ac);

            for(const i in playList){
                const sector = playList[i];
                (function(sec){
                    if(ac === sec){
                        $('a[data-play-id = '+ac+']').addClass('play-a');
                        $('audio[data-contron = '+sec+']').addClass('play'+sec).siblings().removeClass("play" +sec);
                        $('.play'+sec).get(0).play();
                    }
                }(sector));
            }

        });

    };

    main.Mpplay = function(){
        const seleter = $('selete').val();

        let api_key   = '38e8643fb0dc04e8d65b99994d3dafff';
        let id = '';
        let get_list  = 'https://zingmp3.vn/api/playlist/get-list?id=IWZ9Z0AU&type=genre_album&sort=listen&start=0&count=20&ctime=1590388828&sig=17e73baae794a8c22cc0654f33729550b30c0510c7ea0d131bc412457fdd594079fe3c33c22653d80c8443762c6c95a25f98c09d1045e610203d5718b75a7fa3&api_key='+api_key;
        $.ajax({
            url: 'https://zingmp3.vn/api/recommend?id=ZW7O6Z7B&start=0&count=1&ctime=1590384254&sig=fe0e8408c2b0de558afa9dc3047c562f969c13c76f145b9286e12f44d84e6d1b3d6fd393f9a082a18c01db007487ec6fe52e55cfabc8abde5060c4ea29de5a64&api_key=38e8643fb0dc04e8d65b99994d3dafff',
            // contentType: "application/json"
        }).done(function (data){
            const item = data.data.items;
            let song = '';
            $.each(item, function (i, index) {
                const id = index.id;
                song +='<li>' +
                    '<div class="card-music">' +
                '<a class="thumb-40" data-action="play"  onclick="playM(\''+id+'\')">'+
                    '<div class="image lazyload-img loaded" data-action="play">' +
                    '<img src="'+index.thumbnail+'" alt="'+index.title+'"></div>' +
                    '<i class="icon ic-play-circle-outline" data-action="play"></i>' +
                    '<span class="opac" data-action="play"></span>' +
                    '</a>' +
                    '<div class="card-info"><h4 class="title">'+index.title+'</h4><p>'+index.artists_names+'</p></div> ' +
                    '</div> ' +
                    '</li>'
            });
            $('.list-song').html(song);
        });

    };

    main.user = function(){
        //============== Profile ========
        const id = localStorage.getItem('email');
        if(id == null || id === 'undefined'){
            // $('#footer').hide();
            $('#no-api-internet').show();
            $('.show-profile,.user-details').hide();
        }else {
            $('#no-api-internet').hide();
            $('.show-profile,.user-details').show();
        }
        if(id){
            $.ajax({
                url: 'https://tinder-69.appspot.com/api/v1/user/'+id,
                // contentType: "application/json"
            }).done(function (data){
                $('#editprofiel,#footer,.app').show();
                $('#home').hide();

                $('#form-profile').append('<form id="Users" method="get">\n' +
                    '                            <div class="row">\n' +
                    '                                <div class="form-group mx col-md-12">\n' +
                    '                                    <img class="img-avatar img-fluid" alt="">\n' +
                    '                                    <label for="avatar" class="avata-file">Tải lên hình đại diện</label>\n' +
                    '                                    <input type="file" class="form-control mp" accept="image/*" id="avatar" required="">\n' +

                    '                                    <span id="avatar-img"></span>\n' +
                    '                                </div>\n' +
                    '                                <div class="form-group col-md-6">\n' +
                    '                                <label for="fullname">Họ và tên</label>\n' +
                    '                                <h5 class="viewsa" style="display: none;">'+data.username+'</h5>\n' +
                    '                                <input type="text" id="fullname" class="form-control mp" value="'+data.username+'" required="">\n' +
                    '                            </div>\n' +
                    '                                <div class="form-group col-md-6">\n' +
                    '                                <label for="gender">Giới tính </label>\n' +
                    '                                <h5 class="viewsa" style="display: none;">' + data.gender + '</h5>\n' +
                    '                                <select name="" id="gender" class="custom-select" required="">\n' +
                    '                                    <option  value="' + data.gender + '">' + data.gender + '</option>\n' +
                    '                                <option value="Nam">Nam</option>\n' +
                    '                                <option value="Nữ">Nữ</option>\n' +
                    '                            </select>\n' +
                    '                            </div>\n' +
                    '                                <div class="form-group col-md-6">\n' +
                    '                                <label for="birthday">Sinh nhật </label>\n' +
                    '                                <h5 class="viewsa" style="display: none;">'+data.birthday+'</h5>\n' +
                    '                                <input type="text" class="form-control mp" id="birthday" value="'+data.birthday+'" data-toggle="input-mask" data-mask-format="00/00/0000" maxlength="10">\n' +
                    '                            </div>\n' +
                    '                                <div class="form-group col-md-6">\n' +
                    '                                <label for="educationLevel">Trình độ</label>\n' +
                    '                                <h5 class="viewsa" style="display: none;">' + data.educationLevel + '</h5>\n' +
                    '                                <select id="educationLevel" class="custom-select age_from">\n' +
                    '                                    <option  value="' + data.educationLevel + '" class="a">' + data.educationLevel + '</option>' +
                    '                                    <option value="Giáo sư" class="a">Giáo sư</option>\n' +
                    '                                <option value="Tiến sỹ" class="a">Tiến sỹ </option>\n' +
                    '                                <option value="Đại học" class="a">Đại học</option>\n' +
                    '                                <option value="Cao đẳng" class="a">Cao đẳng</option>\n' +
                    '                                <option value="Trung cấp" class="a">Trung cấp</option>\n' +
                    '                                <option value="Học sinh" class="a">Học sinh</option>\n' +
                    '                                <option value="Không học vấn" class="a">Không học vấn</option>\n' +
                    '                            </select>\n' +
                    '                            </div>\n' +
                    '                                <a class="btn btn-outline-primary ml-3  mt-2 animated fadeInRight" id="postprofile" style="display: none;"><span><i class="fa fa-upload"></i>Chỉnh sửa thông tin</span></a>\n' +
                    '                            </div>\n' +
                    '                        </form>');
                $('.profile-title').append(data.username);
                $('#more-details').append(id);
                $('.img-avatar').attr('src',data.avatar);
                sessionStorage.setItem('avatar',data.avatar);
                // check null
                if(data.email ===  'null' || typeof data.username === 'undefined' || $(this).val('')  === 'undefined'){
                    $('.mp,.custom-select,#profile-list-submit').show();
                    $('#postprofile,.viewsa').hide();
                    $('#fullname,#birthday').val('');
                    $('#Users select').val('');
                }else {
                    $('.mp,.custom-select,#profile-list-submit,.avata-file').hide();
                    $('#postprofile,.viewsa').show();
                    $('#postprofile').on('click',function (e) {
                        $('.mp,.custom-select,#profile-list-submit,.avata-file').show();
                        $('#postprofile,.viewsa').hide();
                        e.preventDefault();
                    });
                }
                $('#postprofile').on('click',function (e) {
                    $('.mp,.custom-select,#profile-list-submit').show();
                    $('#postprofile,.viewsa').hide();
                    e.preventDefault();
                });
                $('#editprofiel').on('click',function (e) {
                    const ids =  $(this).data('avatar');
                    const avatar = sessionStorage.getItem('avatar');
                    const fullname = $('#fullname').val();
                    const phone = $('#phone').val();
                    const birthday = $('#birthday').val();
                    const gender = $('#gender option:selected').val();
                    const educationLevel = $('#educationLevel option:selected').val();

                    if($(this).data('avatar') === null){

                    }
                    const user = {
                        "email": id,
                        "username": fullname,
                        "avatar": avatar || ids,
                        "address": "city" + "," + "state" + "," + "county",
                        "phone": phone,
                        "job": "job",
                        "birthday": birthday,
                        "gender": gender,
                        "hobby": "hoppy",
                        "album": "url",
                        "maritalStatus": "maritalStatus",
                        "educationLevel": educationLevel
                    };
                    $.ajax({
                        url: 'https://tinder-69.appspot.com/api/v1/user/',
                        type: 'PUT',
                        data: JSON.stringify(user),
                        // contentType: "application/json",
                        success: function (data) {
                            sessionStorage.removeItem('avatar');
                            window.location.href="index.html";
                        }
                    });
                    e.preventDefault();
                });
                $('#avatar').on('change', function (e) {
                    const files = e.target;
                    const reader = new FileReader();
                    reader.onload = function(){
                        const dataURL = reader.result;
                        let avatars = '';
                        avatars +='<img src=" '+dataURL +' " height="100" width="100" alt="">';
                        sessionStorage.setItem('avatar',dataURL);
                        $('#avatar-img').html(avatars);
                    };
                    reader.readAsDataURL(files.files[0]);
                });
            });
        }else {
            localStorage.removeItem('email');
            sessionStorage.removeItem('avatar');
        }
        //============== From - Contacter ========
        $( "#form-contact").submit(function( event ) {
            $("#ajaxloader").show();
            const formContect = $("#form-contact");
            formContect.hide();

            const name = $('#name').val();
            const email = $('#email').val();
            const text = $('#message').val();

            const messages = {
                "title": 'Theo dõi tin tức ',
                "name": name,
                "email": email,
                "messages": text,
                "date": new Date()
            };
            $.ajax({
                url:'https://api.mlab.com/api/1/databases/matrimony/collections/messages?apiKey=GySvt0pxEYMX3O8Qu9hsQCLZv5r95Jig',
                data:JSON.stringify(messages),
                type:'post',
                contentType: "application/json",
                success:function(response){
                    $("#ajaxloader").hide();
                    formContect.show();
                    formContect.find("input, textarea").val("");
                    $("#formmessage").html(response).show().delay(2000).fadeOut('slow');
                }
            });
            event.preventDefault();
        });
    };
    main.GamePlay = function(){


    }
    $(window).on('load', function(){
        main.load();
    });
    $(document).ready(function () {
        new WOW().init();
        // main.counters();
        main.goToTop();
        main.rightBar();
        main.search();
        main.sliderC();
        main.navhover();
        main.action();
        main.audio();
        main.Mpplay();
        main.lang();
        main.GamePlay();

    });
})(jQuery);
function playM(id) {

    $('#ModalMusic').modal('toggle');
    // $('.modal-content-music').html('<iframe  id="myEmbed"  src=https://zingmp3.vn/embed/song/'+id+'?start=true />');


    $('.modal-content-music').html(' <div class="embed-responsive music-play">\n' +
        '                    <div class="background-music">\n' +
        '                        <div type="button" class="close" data-dismiss="modal" aria-label="Close">\n' +
        '                            <span aria-hidden="true">×</span>\n' +
        '                        </div>\n' +
        // '                        <embed   src=https://zingmp3.vn/embed/song/'+id+'?start=true />\n' +
        '                        <div class="bg-play"></div>\n' +
        '                        <div class="title-music">\n' +
        '                            <h5>Bts  Haru</h5>\n' +
        '                        </div>\n' +
        '                        <div class="description-music">\n' +
        '                            <p>Hmy loc ss</p>\n' +
        '                        </div>\n' +
        '\n' +
        '                        <div class="bg-fast"></div>\n' +
        '                    </div>\n' +
        '                    <div class="mt-3 active-music controls">\n' +
        '                        <div class="d-flex flex-wrap justify-content-center">\n' +
        '                            <div class="prev"><i class="fas fa-step-backward"></i></div>\n' +
        '                            <div class="play"><i class="fas fa-play"></i></div>\n' +
        '                            <div class="next"><i class="fas fa-step-forward"></i></div>\n' +
        '                            <div class="volume">\n' +
        '                                <span></span>\n' +
        '                                <span></span>\n' +
        '                                <span></span>\n' +
        '                                <span></span>\n' +
        '                                <span></span>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                </div>');
}