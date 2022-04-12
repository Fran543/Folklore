package hr.algebra.folklore

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.EditText
import android.widget.Toast
import hr.algebra.folklore.api.UserApiService
import hr.algebra.folklore.api.UserItem
import hr.algebra.folklore.databinding.ActivitySignUpBinding


class SignUpActivity : AppCompatActivity() {

    private lateinit var binding: ActivitySignUpBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivitySignUpBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.tvLogIn.setOnClickListener {
            startActivity(Intent(this,LoginActivity::class.java))
        }

        binding.btnSignUp.setOnClickListener {
            addDummyUser()
        }

    }

    private fun addDummyUser() {

        val apiService = UserApiService()
        val userInfo = UserItem(
            id = 1,
            email = binding.etEmail.text.toString(),
            username = binding.etUsername.text.toString(),
            password = binding.etPassword.text.toString(),
            passwordConfirm = binding.etPasswordConfirm.text.toString())

        apiService.addUser(userInfo) {
            if (it?.id != null) {
                // it = newly added user parsed as response
                // it?.id = newly added user ID
                Toast.makeText(this,"Unsuccessful sign in", Toast.LENGTH_SHORT).show()
            } else {
                Toast.makeText(this,"Successful sign in", Toast.LENGTH_SHORT).show()
            }
        }
    }
}