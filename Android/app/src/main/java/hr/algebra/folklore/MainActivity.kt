package hr.algebra.folklore

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import hr.algebra.folklore.databinding.ActivityMainBinding
import androidx.navigation.findNavController

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
        setupListeners()
    }

    private fun setupListeners() {
        //TODO
    }

    /*<action
    android:id="@+id/mainActivity_to_SignUp"
    app:destination="@+id/signUpFragment"/>*/

}