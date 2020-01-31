const model = {
    authUser: null,
    points: null
}

model.authenticated = function (user) {
    model.authUser = user
}

model.savePoints = function (point) {
    model.points = point
}