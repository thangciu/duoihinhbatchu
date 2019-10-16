const controller = {}


controller.initAuth = function () {
    firebase.auth().onAuthStateChanged(authStateChangedHandler)

    function authStateChangedHandler(user) {

        if (user) {
            if(user.email != 'taikhoantestci30@gamebatchu.io'){
                model.authenticated(user)
                view.showComponents('picklevel')
            }else{
               view.showComponents('picklevel')
            }
        } else{
            view.showComponents('welcome')
        }
    }
}

controller.register = async function(registerInfo)
{
    let user = registerInfo.user
    let password = registerInfo.password
    let displayName = registerInfo.displayName
    
    try
    {
        view.setText("register-error", "")
        view.setText("register-success", "")
        await firebase.auth().createUserWithEmailAndPassword(user, password)
        view.setText("register-success", "Bạn đã đăng ký thành công")
        firebase.auth().currentUser.updateProfile({
            displayName: displayName
        })
        
    }
    catch(err)
    {
       view.setText("register-error", "Tên người dùng đã tồn tại hoặc không hợp lệ")
    }
  
}

controller.login = async function(loginInfo)
{
    
    let user = loginInfo.user
    let password = loginInfo.password
    
    
    $("#btn-login-submit").attr("disable", true)
    try
    {
        view.setText("login-error", "")
        let result = await firebase.auth().signInWithEmailAndPassword(user, password)
        if(result.user)
        {
            view.showComponents('picklevel')
        }
    }catch(err)
    {
        
        view.setText("login-error", "Sai mật khẩu hoặc tài khoản không tồn tại!")
        $("#btn-login-submit").attr("disable")
    }
}


controller.lvg = async function(lv){
    let getData =  await firebase.firestore().collection('data').doc('data-ques').get()
    //   $('#lv1').click = getlv(1)
    $('#level-text').html('Level ' + lv)
    $('#level-de-active').addClass('active')
    let idLv = '#lv' + lv
    $(idLv).addClass('active')

        let data = await {
            img: getData.data().de[lv - 1 ].img,
            ans: getData.data().de[lv - 1].ans
        }
        console.log(data.ans)
        console.log(data.img)
        let inpStr = []
        for(let i = 0; i < data.ans.length; i++){
         inpStr += '<input class="answer" type="text" name="answer" maxlength="1">'
         }
    
         $('.input-answer').html( inpStr)
         $('#img-data').attr('src', data.img)

         let ans = data.ans
    let str = ''
    $('#level-text').css('color','white')

    $('#wrong-icon').hide()
    $('#right-icon').hide()

    $(function() {   
        $('.answer').keyup(function () {
            if (this.value.length == this.maxLength) {   
                str += this.value
                console.log(str)
              $(this).next('.answer').focus();
            }
            
            if(str.length == ans.length){
            if(str != ans){
                $('#level').addClass('wrong-answer')
                $('.answer:first-child').focus()
                $('#wrong-icon').show()

                setTimeout(function(){
                    $('#level').removeClass('wrong-answer')
                }, 1000);
                

                let inputs = document.getElementsByClassName('answer')
                for(let input of inputs){
                   input.value = ''
                   str = ''
                }
                $('#level-text').css('color','red')
                $('#wrong-icon').css('color', 'red')

            }else{
                $('#wrong-icon').hide()
                $('#right-icon').show()
                $('#wrong-icon').css('color', 'rgb(56, 250, 56)')
                $('#level-text').css('color','rgb(56, 250, 56)')

                $('#level').addClass('right-answer')
                for(let i = 0; i < $(('.answer')).length; i++){
                    $('.answer')[i].disabled = true
                }
            }
        }
        })
    })
    
}
