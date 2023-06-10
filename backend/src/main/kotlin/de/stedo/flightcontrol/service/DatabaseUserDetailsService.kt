package de.stedo.flightcontrol.service

import de.stedo.flightcontrol.repository.PilotRepository
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.stereotype.Service

@Service
class DatabaseUserDetailsService(
    private val pilotRepository: PilotRepository,
) : UserDetailsService {
    override fun loadUserByUsername(username: String): UserDetails {
        val user = pilotRepository.findByUsername(username)
        return User(
            user.username, user.password, user.roles?.map { GrantedAuthority { "ROLE_$it" } }
        )
    }
}