$(function () {
    $('.icon-menu').click(function() { //выбираем класс icon-menu и добавляем метод click с функцией, вызываемой при клике
        $('.menu').animate({ //выбираем класс menu и метод animate
            left: '0%' //теперь при клике по иконке, меню, скрытое за левой границей на 285px, изменит свое положение на 0px и станет видимым
        }, 400); //скорость движения меню в мс

        $('body').animate({ //выбираем тег body и метод animate
            left: '-100%' //чтобы всё содержимое также сдвигалось вправо при открытии меню, установим ему положение 285px
        }, 400); //скорость движения меню в мс
    });


    /* Закрытие меню */
    $('.icon-close').click(function() { //выбираем класс icon-close и метод click
        $('.menu').animate({ //выбираем класс menu и метод animate
            left: '-100%' //при клике на крестик меню вернется назад в свое положение и скроется
        }, 400); //скорость движения меню в мс

        $('body').animate({ //выбираем тег body и метод animate
            left: '0%' //а содержимое страницы снова вернется в положение 0px
        }, 400); //скорость движения меню в мс
    });

    //модальное окно
   
    $('.button-modal').click(function (e) {
        e.preventDefault();
        $('#exampleModal').arcticmodal();
    });
    // форма отправки 

    $('[data-submit]').on('click', function(e){
        e.preventDefault();
        $(this).parent('form').submit();
    })
    $.validator.addMethod(
        "regex",
        function(value, element, regexp) {
            var re = new RegExp(regexp);
            return this.optional(element) || re.test(value);
        },
        "Please check your input."
    );
    function valEl(el){

        el.validate({
            rules:{
                name:{
                    required:true
                },
                email:{
                    required:true,
                    email:true
                },
                tel:{
                    required:true,
                    regex: '^([\+]+)*[0-9\x20\x28\x29\-]{7,20}$'
                },
                text1:{ required:false },
                text2:{ required:false },
                text3:{ required:false },
                text4:{ required:false },
                text5:{ required:false },
                text6:{ required:false },
                text7:{ required:false },
                text8:{ required:false },
                text9:{ required:false },
                text10:{ required:false },
                text11:{ required:false }
            },
            messages:{
                tel:{
                    required:'Поле обязательно для заполнения',
                    regex:'Телефон может содержать цифры и символы + - ()'
                },
                email:{
                    required:'Поле обязательно для заполнения',
                    email:'Неверный формат E-mail'
                },
                name:{
                    required:'Поле обязательно для заполнения'
                },
                text:{
                    required:'Поле обязательно для заполнения'
                }
            },
            submitHandler: function (form) {
                // $('#loader').fadeIn();
                var $form = $(form);
                var $formId = $(form).attr('id');
                switch($formId){
                    case'goToNewPage':
                        $.ajax({
                            type: 'POST',
                            url: $form.attr('action'),
                            data: $form.serialize(),
                        })
                            .always(function (response) {
                                //ссылка на страницу "спасибо" - редирект
                                location.href='https://wayup.in/lm/landing-page-marathon/success';
                                //отправка целей в Я.Метрику и Google Analytics
                                ga('send', 'event', 'masterklass7', 'register');
                                yaCounter27714603.reachGoal('lm17lead');
                            });
                        break;
                    case'popupResult':
                        $.ajax({
                            type: 'POST',
                            url: $form.attr('action'),
                            data: $form.serialize(),
                        })
                            .always(function (response) {
                            setTimeout(function (){
                                    $('#exampleModal').arcticmodal('close');
                                    $('#loader').fadeOut();
                                },800);
                                setTimeout(function (){
                                    $('#overlay').fadeIn(1000);
                                    $('#loader').fadeOut();
                                    $('#overlay').delay(1500).fadeOut(800);
                                    $form.trigger('reset');
                                },1100);
                                $('#overlay').on('click', function(e) {
                                    $('#overlay').fadeOut();
                                });
                           
                            });
                        break;
                }
                return false;
            }
        })
    }

    $('.js-form').each(function() {
        valEl($(this));
    });
    $('[data-scroll]').on('click', function(){
        $('html, body').animate({
            scrollTop: $( $.attr(this, 'data-scroll') ).offset().top
        }, 2000);
        event.preventDefault();
    })

});