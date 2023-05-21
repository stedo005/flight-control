package de.stedo.flightcontrol

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Bean
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder

@SpringBootApplication
class FlightControlApplication

fun main(args: Array<String>) {
	runApplication<FlightControlApplication>(*args)
}

@Bean
fun passwordEncoder(): PasswordEncoder {
	return BCryptPasswordEncoder()
}
