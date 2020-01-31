const view = {}

const validators = {
    stringRequire(str) {
        if (str.length > 0) {
            return true
        }
        return false
    },
    user(str) {
        function validateUser(user) {
            var re = /^[a-z][a-z0-9_\.]{3,20}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/
            return re.test(user)
        }
        return validateUser(str)
    },
    password(str) {
        if (str.length > 5) {
            return true
        }
        return false
    }
}

view.showComponents = function (name) {
    let app = document.getElementById('app')
    switch (name) {

        case 'welcome': {
            $("#app").html(components.welcome)
            $("#btn-login-popup").click(function () {
                $("#login-popup").css("display", "block")
            })
            $("#btn-register-popup").click(function () {
                $("#register-popup").css("display", "block")
            })

            //Exit moi noi tren man hinh
            let exitLogin = document.getElementById('login-popup');
            let exitRegister = document.getElementById('register-popup');
            window.onclick = function (event) {
                if (event.target == exitLogin) {
                    exitLogin.style.display = "none"
                }
                else if (event.target == exitRegister) {
                    exitRegister.style.display = "none"
                }
            }

            let formLogin = document.getElementById("login-form")
            formLogin.onsubmit = formSubmitHanderLogin
            let formRegister = document.getElementById("register-form")
            formRegister.onsubmit = formSubmitHanderRegister

            $("#btn-play-now").click(function () {
                let loginInfo = {
                    user: "taikhoantestci30@gamebatchu.io",
                    password: "matkhautestci30"
                }
                controller.login(loginInfo)
            })

            function formSubmitHanderRegister(event) {
                event.preventDefault()

                let registerInfo = {
                    displayName: formRegister.displayName.value,
                    user: formRegister.user.value.toLowerCase() + "@gamebatchu.io",
                    password: formRegister.password.value,
                }
                let validateResult = [
                    view.validate(registerInfo.displayName, validators.stringRequire, "display-name-error", "Không hợp lệ"),
                    view.validate(registerInfo.user, validators.user, "user-error", "Không hợp lệ"),
                    view.validate(registerInfo.password, validators.password, "password-error", "Không hợp lệ")
                ]
                if (allPassed(validateResult)) {
                    controller.register(registerInfo)
                }
            }
            function formSubmitHanderLogin(event) {
                event.preventDefault()
                let loginInfo = {
                    user: formLogin.user.value + "@gamebatchu.io",
                    password: formLogin.password.value
                }
                let validateResult = [
                    view.validate(loginInfo.user, validators.user, "user-error", "Không hợp lệ"),
                    view.validate(loginInfo.password, validators.password, "password-error", "Không hợp lệ")
                ]
                if (allPassed(validateResult)) {
                    controller.login(loginInfo)
                }
            }
            break


        }
        case 'game': {
            app.innerHTML = components.nav + components.game
            controller.loadRecord()
            controller.game(1)

            $('#mute-on').hide()
           
            let x =  document.getElementById("audio")
            $('#mute-on').click(function(){
               x.pause()
               $('#mute-off').show()
               $('#mute-on').hide()
              
            })
            $('#mute-off').click(function(){
                x.play()
                $('#mute-off').hide()
                $('#mute-on').show()
               
            })



             

            $('#point').html('<span> Điểm: 0 <i class="far fa-sun"></i></span>')

            $('#user-name').html(`
                <span> Chào: ${model.authUser.displayName}</span>
            `)

            $('#log-out-btn').click(function () {
                firebase.auth().signOut()
            })

            $('#save-btn').click(function () {
                controller.savePoint()
            })
            
            break;
        }
        case 'loading':{
            app.innerHTML = components.loading
        }
       
    }
}



view.setText = function (id, text) {
    $("#" + id).text(text)
}

view.validate = function (value, validator, idErrorTag, messageError) {
    if (validator(value)) {
        view.setText(idErrorTag, "")
        return true
    }
    else {
        view.setText(idErrorTag, messageError)
        return false
    }
}
function allPassed(validateResult) {
    for (let result of validateResult) {
        if (!result) {
            return false
        }
    }
    return true
}


