package framework

import android.content.Context
import model.User

fun Context.createUser(_id: Long, email: String, username: String, password: String): User {

    return User(
        _id = _id,
        email = email,
        username = username,
        password = password
    )
}