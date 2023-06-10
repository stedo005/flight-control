package de.stedo.flightcontrol.controller

import de.stedo.flightcontrol.security.JwtUtils
import de.stedo.flightcontrol.security.LoginData
import de.stedo.flightcontrol.service.DatabaseUserDetailsService
import mu.KotlinLogging
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.server.ResponseStatusException

@RestController
@RequestMapping("/api/auth")
class LoginController(
    private val jwtUtils: JwtUtils,
    private val authenticationManager: AuthenticationManager,
    private val userDetailsService: DatabaseUserDetailsService,
) {
    private val logger = KotlinLogging.logger {}
    @PostMapping
    fun login(@RequestBody loginData: LoginData): ResponseEntity<String> {
        try {
            authenticationManager.authenticate(
                UsernamePasswordAuthenticationToken(
                    loginData.username,
                    loginData.password
                )
            )
            val grantedAuthorities = userDetailsService.loadUserByUsername(loginData.username).authorities.let { it ->
                it.map { it.authority }
            }
            val claims: Map<String, Any> = mapOf("roles" to grantedAuthorities)
            logger.info(grantedAuthorities.toString())
            return ResponseEntity(jwtUtils.createToken(claims, loginData.username), HttpStatus.OK)
        } catch (e: Exception) {
            throw ResponseStatusException(HttpStatus.BAD_REQUEST, "invalid credentials")
        }
    }
}
