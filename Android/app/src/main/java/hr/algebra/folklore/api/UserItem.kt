package hr.algebra.folklore.api

import com.google.gson.annotations.SerializedName

data class UserItem(
    @SerializedName("idUser") val id: Int?,
    @SerializedName("username") val username: String?,
    @SerializedName("email") val email: String?,
    @SerializedName("password") val password: String?,
    @SerializedName("passwordConfirm") val passwordConfirm: String?
)