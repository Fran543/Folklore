package hr.algebra.folklore.api

import android.util.Log
import okhttp3.Cookie
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import java.net.HttpCookie

class UserApiService {
    fun addUser(userData: UserItem, onResult: (UserItem?) -> Unit){
        val retrofit = ServiceBuilder.buildService(UserApi::class.java)
        retrofit.addUser(userData).enqueue(
            object : Callback<UserItem> {
                override fun onFailure(call: Call<UserItem>, t: Throwable) {
                    onResult(null)
                }
                override fun onResponse(call: Call<UserItem>, response: Response<UserItem>) {
                    val addedUser = response.body()
                    onResult(addedUser)
                }
            }
        )
    }

    fun getUser(email: String, password: String, onResult: (String?) -> Unit){
        val retrofit = ServiceBuilder.buildService(UserApi::class.java)
        retrofit.getUser(email,password).enqueue(
            object : Callback<String> {
                override fun onFailure(call: Call<String>, t: Throwable) {
                    onResult(null)
                }
                override fun onResponse(call: Call<String>, response: Response<String>) {
                    val cookie = response.headers().get("ETag")
                    Log.d("cookie", cookie.toString())
                    Log.d("response", response.toString())
                    Log.d("responseH", response.headers().toString())
                    Log.d("responseBody", response.body().toString())
                    onResult(null)
                }
            }
        )
    }
}