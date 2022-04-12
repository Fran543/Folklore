package hr.algebra.folklore

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Toast
import hr.algebra.folklore.api.UserApiService
import hr.algebra.folklore.api.UserItem
import hr.algebra.folklore.databinding.ActivityLoginBinding

class LoginActivity : AppCompatActivity() {

    private lateinit var binding: ActivityLoginBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.tvSignUp.setOnClickListener {
            startActivity(Intent(this, SignUpActivity::class.java))
        }

        binding.tvGuest.setOnClickListener {
            startActivity(Intent(this, HomeActivity::class.java))
        }

        binding.btnLogIn.setOnClickListener {
            getDummyUser()
        }

    }

    private fun getDummyUser() {

        val apiService = UserApiService()
        val email = binding.etEmail.text.toString()
        val password = binding.etPassword.text.toString()

        apiService.getUser(email, password) {
            Toast.makeText(this,it.toString(),Toast.LENGTH_SHORT).show()
        }
    }

}