const model = {
    authUser: null,
}

model.authenticated = function(user){
    model.authUser = user
}