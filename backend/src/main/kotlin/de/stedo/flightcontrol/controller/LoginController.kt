package de.stedo.flightcontrol.controller

import de.stedo.flightcontrol.entities.AuthData
import de.stedo.flightcontrol.repository.PilotRepository
import de.stedo.flightcontrol.security.JwtUtils
import de.stedo.flightcontrol.security.LoginData
import de.stedo.flightcontrol.service.DatabaseUserDetailsService
import mu.KotlinLogging
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
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
    private val pilotRepository: PilotRepository,
) {
    private val logger = KotlinLogging.logger {}
    @PostMapping
    fun login(@RequestBody loginData: LoginData): ResponseEntity<AuthData> {
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
            val token = jwtUtils.createToken(claims, loginData.username)
            val userId = pilotRepository.findByUsername(loginData.username)!!.id
            val authData = AuthData(
                token,
                loginData.username,
                userId,
                roles = grantedAuthorities
            )
            return ResponseEntity(authData, HttpStatus.OK)
        } catch (e: Exception) {
            throw ResponseStatusException(HttpStatus.BAD_REQUEST, "invalid credentials")
        }
    }
}
