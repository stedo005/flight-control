package de.stedo.flightcontrol.security

import mu.KotlinLogging
import org.springframework.http.HttpStatus
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.GrantedAuthority
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/login")
class LoginController(
    private val authenticationManager: AuthenticationManager,
) {
    private val logger = KotlinLogging.logger {}

    @PostMapping
    fun login(@RequestBody loginData: LoginData) {
        logger.info("geloggt")
        try {
            authenticationManager.authenticate(
                UsernamePasswordAuthenticationToken(
                    loginData.username,
                    loginData.password
                )
            )
        } catch (e: Exception) {
            throw IllegalAccessException("bad credentials")
        }
    }
}
