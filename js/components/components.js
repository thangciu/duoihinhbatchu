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
                    <input placeholder="Tên người dùng" name="user" class="user" type="user">
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
                    <input placeholder="Tên người dùng" name="user" class="user" type="user">
                    <div id="user-error" class="message-error"> </div>
                    <span class="icon3"><i class="fa fa-user" aria-hidden="true"></i></span>
    
                    <label for="display"><b>DisplayName</b></label>
                    <input placeholder="Tên hiển thị" name="displayName"" class="displayname" type="user">
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

<nav class="wrapper-main-nav">
    <div class="main-nav">
     <div class= "home-page">
         <button  id = "home-page-btn" class = "home-page-btn"> <i class="fa fa-home" aria-hidden="true"></i></button>
     </div> 
     <div id = "user-name" class= "user-name">  </div>
     <div class= "level-game">
         <button id = "level-de-active"class="level-game-btn">DỄ</button>
         <button id = "level-trung-binh-active"class="level-game-btn">TRUNG BÌNH</button>
         <button id = "level-kho-active" class="level-game-btn">KHÓ</button>
     </div>
     <div class="log-out">
         <button id = "log-out-btn" class="log-out-btn"><i class="fas fa-sign-out-alt"></i></i>
         </button>
     </div>
     </div>
           
    </nav>
`
components.picklevel = `

<section class = "container-pick-level">
  <div class="wrapper-pick-level">
         
       <div class = "title-level">
       <span class = "title1">welcome</span>
       <span class = "title2">please choose level</span>
           </div>
     
      <div class = "wrapper-btn">
        <button id = "level-de" class="pick-level-btn" >DỄ</button>
        <button id = "level-trung-binh" class="pick-level-btn" >TRUNG BÌNH</button>
        <button id ="level-kho" class= "pick-level-btn" >KHÓ</button>
        <hr>

      </div>
     
  </div>


</section>
`

components.loading = `
 <div class = "loading-container">
 <img src = "./imgs/loading.gif" />
  </div>
`

components.play =`
<section class="container-main-game">
<div class="wrapper-main-game">
    <div class="main-game-left">
        <div class="left-left">
            <div class="main-game-left-in">
                <div class="image">
                    <img id = "img-data" src="" alt="">
                </div>
                <div class="input-answer">
                    

                </div>
            </div>
        </div>
        <div class="left-right">
            <div id = "level-btn" btn" class="wrapper-level-btn">
                <button id = "lv1"  class="level-btn">1</button>
                <button id = "lv2"  class="level-btn">2</button>
                <button id = "lv3"  class="level-btn">3</button>
            </div>
            <div id = "level" class="show-level">
                <i id ="right-icon" class="fas fa-check"></i>
                <i id = "wrong-icon" class="fas fa-times"></i>
                <span id = "level-text"> LEVEL 1</span>
            </div>
            <div id = "next-btn" class="next-btn">
                <button>NEXT</button>

            </div>
        </div>
    </div>

</div>

</section>
`