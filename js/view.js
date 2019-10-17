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
        case 'picklevel': {

            app.innerHTML = components.nav + components.picklevel
            let logoutBtn = document.getElementById('log-out-btn')
            logoutBtn.onclick = signOut
            let userName = document.getElementById('user-name')

            nameDisplay(userName, model.authUser)
            $('#level-de').click(function () {
                view.showComponents('play')
            })

            function signOut() {
                firebase.auth().signOut()
            }

        //   break;

        }
        case 'play': {
            app.innerHTML = components.nav + components.play
            $('#home-page-btn').click(function () {
                view.showComponents('picklevel')

            })
            $('#point').html('<span>Diem: 0</span>')
            
            let logoutBtn = document.getElementById('log-out-btn')
            logoutBtn.onclick = signOut


            let userName = document.getElementById('user-name')           
            
            nameDisplay(userName, model.authUser)

            controller.lvg(1)
            // su kien kich chon lever
            $('#lv1').click = showLv(1)
               $('#lv2').click = showLv(2)
             $('#lv3').click = showLv(3)

            // su kien next lever
            let right = document.getElementById('next-btn')
            let messages = ['#lv1', '#lv2', '#lv3']
        
            // ham tra ve ket qua tiep theo  trong mang message
            function next(current, messages) {
                var idx = messages.indexOf(current);
                if (idx === messages.length - 1) {
                  return messages[0];
                }
                return messages[idx + 1];
              }
             

              let idLv = '#lv1'
              
              right.addEventListener('click', () => {
                controller.lvg(messages.indexOf(next(idLv,messages))+1)
                idLv = next(idLv,messages)
                for(let i = 0; i < $('.level-btn').length; i++){
                    let a = document.getElementsByClassName('level-btn')
                    a[i].classList.remove('active')
                }
                $(idLv).addClass('active')
              })

        //ham bat su kien khi click chon lever
            function showLv(lv){
            let idLv = '#lv' + lv
            $(idLv).click(function () {
                
                $('#level-de-active').addClass('active')
                for(let i =0; i < $('.level-btn').length; i++){
                    let a = document.getElementsByClassName('level-btn')
                    a[i].classList.remove('active')
                }
                $(idLv).addClass('active')
                controller.lvg(lv)
            })
        }
        












            function signOut() {
                firebase.auth().signOut()
            }

            break;
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

function nameDisplay(nameHTML, user) {
    if (user) {
        nameHTML.innerHTML = `
        <span> Hello: ${user.displayName}</span>
        `
    } else {
        nameHTML.innerHTML = `
        <span> Hello: Guest</span>
        `
    }
}

