package de.stedo.flightcontrol.security

import io.jsonwebtoken.Claims
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import java.time.Duration
import java.time.Instant
import java.util.*

@Component
class JwtUtils(@Value("{jwt.secret}") private val secret: String) {
    fun createToken(claims: Map<String, Any>, subject: String): String {
        return Jwts.builder()
            .setSubject(subject)
            .setIssuedAt(Date.from(Instant.now()))
            .setExpiration(Date.from(Instant.now().plus(Duration.ofHours(2))))
            .addClaims(claims)
            .signWith(SignatureAlgorithm.HS256, secret)
            .compact()
    }

    fun extractClaims(token: String): Claims {
        return Jwts.parser()
            .setSigningKey(secret)
            .parseClaimsJws(token)
            .body
    }
}
