const controller = {}
let point = 0

controller.initAuth = async function () {
        view.showComponents('loading')
      
    firebase.auth().onAuthStateChanged(authStateChangedHandler)

    function authStateChangedHandler(user) {

        if (user) {
            model.authenticated(user)
            setTimeout(function(){ 
                view.showComponents('game')
        }, 1000);
        } else {
            view.showComponents('welcome')
        }
    }
}

controller.register = async function (registerInfo) {

    try {
        view.setText("register-error", "")
        view.setText("register-success", "")
        await firebase.auth().createUserWithEmailAndPassword(registerInfo.user, registerInfo.password)
        view.setText("register-success", "Bạn đã đăng ký thành công")
        firebase.auth().currentUser.updateProfile({
            displayName: registerInfo.displayName
        })


    } catch (err) {
        view.setText("register-error", "Tên người dùng đã tồn tại hoặc không hợp lệ")
    }
    setTimeout

}

controller.login = async function (loginInfo) {

    try {
        view.setText("login-error", "")
        let result = await firebase.auth().signInWithEmailAndPassword(loginInfo.user, loginInfo.password)
        if (result.user) {
            view.showComponents('play')
        }
    } catch (err) {
        view.setText("login-error", "Sai mật khẩu hoặc tài khoản không tồn tại!")
    }
}

controller.game = async function (lv) {
    let getData = await firebase.firestore().collection('data').where('type', '==', 'data').get()
    $('#level-text').html('Level ' + lv)
    $('#level-de-active').addClass('active')
    let idLv = '#lv' + lv
    $(idLv).addClass('active')

    let data = getData.docs[0].data()

    len = data['answer'].length
    random = Math.floor(Math.random() * len)
    answer = data['answer'][random].replace(/\s+/g, '')
    image = data['image'][random]
    console.log(answer)
    let inpStr = '<input class="answer focus" type="text" name="answer" autocomplete="off" maxlength="1">'
    for (let i = 1; i < answer.length; i++) {
        inpStr += '<input class="answer" type="text" name="answer" autocomplete="off" maxlength="1">'
    }
    inpStr += '<i id ="right-icon" class="fas fa-check right-answer"></i>' + '<i id = "wrong-icon" class="fas fa-times wrong-answer"></i>'
    $('.input-answer').html(inpStr)
    $('#img-data').attr('src', image)
    $('.focus').focus()
    let result = ''

    $('#level-text').css('color', 'white')
    for (let i = 0; i < $('.answer').length; i++) {
        $('.answer')[i].setAttribute('id', 'a' + i)
    }

    $(function () {
        $('.answer').keyup(function () {
            if (this.value.length == this.maxLength && this.value != 13) {
                $(this).next('.answer').focus()
            } else {
                $(this).prev('.answer').focus()
            }
            let arr = []
            for (let i = 0; i < $('.answer').length; i++) {
                arr[i] = $('.answer')[i].value
            }
            if (arr.length == answer.length && !arr.includes('')) {
                for (let i = 0; i < $('.answer').length; i++) {
                    result += arr[i]
                }
                result = result.toUpperCase()
                if (result != answer) {
                    $('#level').addClass('wrong-answer')
                    $('.answer:first-child').focus()
                    $('#wrong-icon').show()

                    setTimeout(function () {
                        $('#level').removeClass('wrong-answer')
                    }, 1000);

                    let inputs = document.getElementsByClassName('answer')
                    for (let input of inputs) {
                        input.value = ''
                        str = ''
                    }
                    $('#level-text').css('color', 'red')
                    $('#wrong-icon').css('color', 'red')
                    result = ''
                } else {
                    $('#wrong-icon').hide()
                    $('#right-icon').show()
                    $('#wrong-icon').css('color', 'rgb(56, 250, 56)')
                    $('#level-text').css('color', 'rgb(56, 250, 56)')

                    $('#level').addClass('right-answer')
                    for (let i = 0; i < $(('.answer')).length; i++) {
                        $('.answer')[i].disabled = true
                    }
                    point += 10
                    $('#point').html(`
                        <span> Điểm: ${point} <i class="far fa-sun"></i></span>
                    `)
                    controller.game(lv + 1)
                }
            }

        })
        $('#wrong-icon').hide()
        $('#right-icon').hide()
    })
}

controller.savePoint = async function () {
    if (point && model.authUser.email != 'taikhoantestci30@gamebatchu.io') {
        let email = model.authUser.email.split('@')[0]
        try {
            try {
                let getData = await firebase.firestore().collection('data').where('name', '==', email).get()
                let data = getData.docs[0].data()
                if (point > data.point) {
                    await firebase.firestore().collection('data').doc(email)
                    .set({
                        name: email,
                        point: point,
                        type: 'point'
                    })
                }
            } catch {
                await firebase.firestore().collection('data').doc(email)
                    .set({
                        name: email,
                        point: point,
                        type: 'point'
                    })

            }
            view.showComponents('game')

        } catch (err) {
            console.log(err)
        }
        point = 0
    }
}

controller.loadRecord = async function () {
    let getData = await firebase.firestore()
    .collection('data')
    .where('type', '==', 'point')
    .get()

    let points = []
    for (let i = 0; i < getData.docs.length; i++) {
        points.push(getData.docs[i].data())
    }
    points = points.sort(function (a, b) {
        return a.point - b.point
    })
    points.reverse()
    model.savePoints(points)
    if (model.points) {
        let pointContainer = document.getElementById('name-container')
        pointContainer.innerHTML = ''

        for (let i = 0; i < model.points.length; i++) {
            let name = model.points[i].name
            let point = model.points[i].point
            let html = `
                <div class="name">
                    <span class="stt">${i + 1}</span>
                    <span class="name-champion">${name}</span>
                    <span class="point-champion">${point}</span>
               </div>
            `
            pointContainer.innerHTML += html
        }
    }
}