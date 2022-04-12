package hr.algebra.folklore.api

import okhttp3.Cookie
import retrofit2.Call
import retrofit2.http.*
import java.net.HttpCookie


interface UserApi {
    @Headers("Content-Type: application/json")
    @POST("register")
    fun addUser(@Body userData: UserItem): Call<UserItem>

    @Headers("Content-Type: application/json")
    @POST("login")
    fun getUser(@Query("email") email: String, @Query("password")password: String): Call<String>
}