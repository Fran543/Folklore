package model

data class User(
    var _id: Long?,
    val username: String,
    val password: String,
    val email: String
)