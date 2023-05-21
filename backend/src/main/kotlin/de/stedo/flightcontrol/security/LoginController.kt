package de.stedo.flightcontrol.security

import org.springframework.http.HttpStatus
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.server.ResponseStatusException

@RestController
@RequestMapping("/api/login")
class LoginController {
    private val authenticationManager: AuthenticationManager? = null
    private val jwtUtils: JwtUtils? = null
    @PostMapping
    fun login(@RequestBody loginData: LoginData): String {
        return try {
            authenticationManager?.authenticate(
                UsernamePasswordAuthenticationToken(
                    loginData.username,
                    loginData.password
                )
            )
            val claims: Map<String, Any> = HashMap()
            jwtUtils!!.createToken(claims, loginData.username)
        } catch (e: Exception) {
            throw ResponseStatusException(HttpStatus.BAD_REQUEST, "invalid credentials")
        }
    }
}
