package de.stedo.flightcontrol.security

import io.jsonwebtoken.Claims
import io.jsonwebtoken.ExpiredJwtException
import io.jsonwebtoken.MalformedJwtException
import io.jsonwebtoken.SignatureException
import io.jsonwebtoken.UnsupportedJwtException
import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter

@Component
class JwtAuthFilter(
    private val jwtUtils: JwtUtils
) : OncePerRequestFilter() {

    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {
        val token: String? = getAuthToken(request)
        if (!token.isNullOrBlank()) {
            try {
                val claims = jwtUtils.extractClaims(token)
                setSecurityContext(claims)
                filterChain.doFilter(request, response)
            } catch (e: ExpiredJwtException) {
                response.status = 401
            } catch (e: UnsupportedJwtException) {
                response.status = 401
            } catch (e: MalformedJwtException) {
                response.status = 401
            } catch (e: SignatureException) {
                response.status = 401
            } catch (e: IllegalArgumentException) {
                response.status = 401
            }
        } else {
            filterChain.doFilter(request, response)
        }
    }

    private fun getAuthToken(request: HttpServletRequest): String? {
        val authorization = request.getHeader("Authorization")
        return authorization?.replace("Bearer", "")?.trim { it <= ' ' }
    }

    private fun setSecurityContext(claims: Claims) {
        val subject = claims.subject
        val roles = claims["roles"] as List<*>
        val grantedAuthorities = roles.map { GrantedAuthority { it.toString() } }
        val token = UsernamePasswordAuthenticationToken(subject, "", grantedAuthorities)
        SecurityContextHolder.getContext().authentication = token
    }

}