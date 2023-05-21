package de.stedo.flightcontrol.security

import io.jsonwebtoken.*
import jakarta.servlet.FilterChain
import jakarta.servlet.ServletException
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter

@Component
class JwtAuthFilter(
    private val jwtUtils: JwtUtils
) : OncePerRequestFilter() {
    @Throws(ServletException::class)
    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {
        val token = getAuthToken(request)
        if (token.isNotBlank()) {
            try {
                val claims: Claims = jwtUtils.extractClaims(token)
                setSecurityContext(claims.subject)
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

    private fun getAuthToken(request: HttpServletRequest): String {
        val authorization: String = request.getHeader("Authorization")
        return authorization.replace("Bearer", "").trim { it <= ' ' }
    }

    private fun setSecurityContext(subject: String) {
        val token = UsernamePasswordAuthenticationToken(subject, "", listOf())
        SecurityContextHolder.getContext().authentication = token
    }
}
