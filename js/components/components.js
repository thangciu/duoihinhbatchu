const components = {}

components.welcome = `
<section class="container">
    <div class="btn-popup">
        <button id="btn-login-popup">Login</button>
        <button id="btn-register-popup">Register</button>
    </div>
    <button id ="btn-play-now" class="btn-play-now">Play now</button>
    <div id="login-popup" class="modal">
        <form id="login-form" class="modal-content animate">
            <div class="imgcontainer">
                <img src="./imgs/avatar.png" alt="Avatar" class="avatar">
            </div>
            <div class="form-content">
                <span onclick="document.getElementById('login-popup').style.display='none'" class="close" title="Close Modal">&times;</span>
                <div class="input-container">
                    <label for="username"><b>Username</b></label>
                    <input placeholder="Tên người dùng" name="user" autocomplete="off" class="user" type="user">
                    <div id="user-error" class="message-error"> </div>
                    <span class="icon1"><i class="fa fa-user" aria-hidden="true"></i></span>

                    <label for="psw"><b>Password</b></label>
                    <input placeholder="Mật khẩu" name="password" class="password" type="password">
                    <div id="password-error" class="message-error"></div>
                    <span class="icon2"><i class="fa fa-unlock" aria-hidden="true"></i></span>
                </div>
                <div id="login-error" class="message-error"></div>
                <div class="form-footer">
                    <button id="btn-login-submit" class="btn-submit" type="submit">Đăng nhập</button>
                </div>
            </div>
        </form>
    </div>

    <div id="register-popup" class="modal">
        <form id="register-form" class="modal-content animate register">
            <div class="imgcontainer">
                <img src="./imgs/avatar.png" alt="Avatar" class="avatar">
            </div>
            <div class="form-content">
                <span onclick="document.getElementById('register-popup').style.display='none'" class="close" title="Close Modal">&times;</span>
                <div class="input-container">
                    <label for="username"><b>Username</b></label>
                    <input placeholder="Tên người dùng" name="user" autocomplete="off" class="user" type="user">
                    <div id="user-error" class="message-error"> </div>
                    <span class="icon3"><i class="fa fa-user" aria-hidden="true"></i></span>
    
                    <label for="display"><b>DisplayName</b></label>
                    <input placeholder="Tên hiển thị" name="displayName" autocomplete="off" class="displayname" type="user">
                    <div id="display-name-error" class="message-error"> </div>
                    <span class="icon4"><i class="far fa-eye" aria-hidden="true"></i></i></span>

                    <label for="password"><b>Password</b></label>
                    <input placeholder="Mật khẩu" name="password" class="password" type="password">
                    <div id="password-error" class="message-error"></div>
                    <span class="icon5"><i class="fa fa-unlock" aria-hidden="true"></i></span>
                    <div id="register-error" class="message-error"></div>
                    <div id="register-success" class="message-success"></div>
                </div>
                <div class="form-footer">
                    <button id="btn-register-submit" class="btn-submit" type="submit">Đăng ký</button>
                </div>
            </div>
        </form>
    </div>
</section>
`

components.nav = `
<audio id="audio" loop>
  <source src="music.mp3" type="audio/mpeg">
</audio>

<nav class="wrapper-main-nav">
    <div class="main-nav">
     <div id = "user-name" class= "user-name">  
     </div>
     
     <div id = "level" class="show-level">
        <span id = "level-text" class='level-text'></span>
    </div>
    <div id = "point" class = "point"></div>
    <button id = "mute-off"><i class="fas fa-volume-mute"></i></button>
    <button id = "mute-on"><i class="fas fa-volume-up"></i></button>
     <div class="log-out">
         <button id = "log-out-btn" class="log-out-btn"><i class="fas fa-sign-out-alt"></i></i>
         </button>
     </div>
     </div>
           
    </nav>
`

components.game = `
<section class="container-main-game">
    <div class="main-game-left">
        <div class="image">
            <img id = "img-data" src="" alt="">
            <div id = "input-answer" class="input-answer"></div>
        </div>
        <button id = 'save-btn' class='save-btn'>Lưu điểm</button>
    </div>

    <div class="rank-record">
        <div id="bxh-content" class="bxh-content">
            <div class="bxh-icon"><i class="fas fa-crown"></i></div>
            <div class="wrapper-champion">
                <div id="name-container" class='name-container'></div>
            </div>
        </div>
    </div>
</section>
`

components.loading = `
 <div class = "loading-container">
 <img src = "./imgs/loading.gif" />
  </div>
`