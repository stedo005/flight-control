package de.stedo.flightcontrol.security

import de.stedo.flightcontrol.entities.Pilot
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service

@Service
class JwtUserDetailsService : UserDetailsService {
    //private val userService: UserService? = null
    @Throws(UsernameNotFoundException::class)
    override fun loadUserByUsername(username: String): UserDetails {
        return User(
            "ddd",
            "ddd",
            listOf<GrantedAuthority>()
        )
//        userService.findByUsername(username)
//            .map { user -> User(user.getUsername(), user.getPassword(), listOf<GrantedAuthority>()) }
//            .orElseThrow { UsernameNotFoundException("$username not found") }
    }
}
